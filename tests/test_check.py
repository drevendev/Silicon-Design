import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

SPEC = importlib.util.spec_from_file_location('silicon_check', Path(__file__).resolve().parents[1] / 'tools/check.py')
check = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(check)


class CheckTests(unittest.TestCase):
    def setUp(self):
        test_root = Path(__file__).resolve().parent
        self.directory = tempfile.TemporaryDirectory(prefix='.test-', dir=test_root)
        self.root = Path(self.directory.name)
        if not self.root.resolve().is_relative_to(test_root):
            raise RuntimeError('Temporary test directory escaped its intended root')
        self.addCleanup(self.directory.cleanup)

    def write(self, path, content):
        target = self.root / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding='utf-8')

    def test_known_contrast_extremes(self):
        self.assertAlmostEqual(check.contrast('#ffffff', '#000000'), 21)
        self.assertAlmostEqual(check.contrast('#123456', '#123456'), 1)
        self.assertAlmostEqual(check.contrast('#767676', '#ffffff'), 4.5422249596)
        self.assertLess(check.contrast('#777777', '#ffffff'), 4.5)

    def test_unsupported_color_rejected(self):
        with self.assertRaises(ValueError):
            check.contrast('rgba(0,0,0,.5)', '#ffffff')

    def test_relative_link_and_percent_encoded_path(self):
        self.write('docs/start.md', '[read](../a%20file.md#section)\n[web](https://example.org)')
        self.write('a file.md', '# Section')
        self.assertEqual(check.check_markdown(self.root), [])

    def test_missing_link_reported_but_code_example_ignored(self):
        self.write('README.md', '[broken](missing.md)\n\n```md\n[example](example.md)\n```\n')
        issues = check.check_markdown(self.root)
        self.assertEqual(len(issues), 1)
        self.assertIn('missing.md', issues[0])

    def test_repository_escape_rejected(self):
        self.write('README.md', '[outside](../outside.md)')
        self.assertIn('escapes repository', check.check_markdown(self.root)[0])

    def test_skill_name_matches_folder(self):
        self.write('skills/sample/SKILL.md', '---\nname: sample\ndescription: Review a particular surface.\n---\nBody.\n')
        self.assertEqual(check.check_skills(self.root), [])
        self.write('skills/sample/SKILL.md', '---\nname: other\ndescription: Review a surface.\n---\nBody.\n')
        self.assertTrue(check.check_skills(self.root))

    def test_html_missing_fragment_and_file(self):
        self.write('page.html', '<main id="real"><a href="#real">OK</a><a href="#absent">Bad</a><img src="missing.png" alt=""></main>')
        self.assertEqual(len(check.check_html(self.root)), 2)

    def test_duplicate_source_revision_reported(self):
        record = {'repository': 'owner/repo', 'revision': 'a' * 40, 'reviewed_at': '2026-11-02', 'paths': ['README.md']}
        self.write('research/revisions.json', json.dumps([record, record]))
        self.assertIn('duplicate', check.check_revisions(self.root)[0])

    def test_literal_template_fragment_in_direct_local_script(self):
        self.write('page.html', '<a href="#work">Skip</a><script src="app.js"></script>')
        self.write('app.js', 'const view = `<main id="work">Record</main>`;')
        self.assertEqual(check.check_html(self.root), [])

    def test_unloaded_script_does_not_hide_missing_fragment(self):
        self.write('page.html', '<a href="#work">Skip</a><script src="other.js"></script>')
        self.write('app.js', 'const view = `<main id="work">Record</main>`;')
        self.write('other.js', '// no template')
        self.assertIn('missing fragment #work', check.check_html(self.root)[0])

    def test_script_escape_and_missing_fragment_remain_reported(self):
        self.write('page.html', '<a href="#absent">Skip</a><script src="../outside.js"></script>')
        issues = check.check_html(self.root)
        self.assertEqual(len(issues), 2)
        self.assertTrue(any('escapes repository' in issue for issue in issues))

    def test_palette_failure_and_css_drift(self):
        data = {'format': 'silicon-specimen-palettes-1', 'palettes': [{
            'name': 'sample', 'css_scope': '.sample', 'roles': {'text': '#777777', 'surface': '#ffffff'},
            'pairs': [{'foreground': 'text', 'background': 'surface', 'minimum': 4.5, 'usage': 'body'}]
        }]}
        self.write('examples/palettes.json', json.dumps(data))
        self.write('examples/specimen.html', '<style>.sample { --text: #767676; --surface: #ffffff; }</style>')
        issues, pairs = check.check_palettes(self.root)
        self.assertEqual(len(issues), 2)
        self.assertEqual(len(pairs), 1)
        self.assertTrue(any('below 4.5' in issue for issue in issues))
        self.assertTrue(any('CSS role differs' in issue for issue in issues))


if __name__ == '__main__':
    unittest.main()
