import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def module(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / 'tools' / (name + '.py'))
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


release = module('skill_release')
activation = module('activation')


class ReleaseTests(unittest.TestCase):
    def test_old_package_stays_pinned_when_handbook_advances(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'skills/sample').mkdir(parents=True)
            (root / 'docs').mkdir()
            entry = root / 'skills/sample/SKILL.md'
            entry.write_text('[depth](https://github.com/drevendev/Silicon-Design/blob/master/docs/guide.md)\n', encoding='utf-8')
            guide = root / 'docs/guide.md'
            guide.write_text('Version one.\n', encoding='utf-8')
            def git(*args):
                return subprocess.check_output(['git', *args], cwd=root, stderr=subprocess.PIPE).decode().strip()
            git('init', '--quiet')
            git('add', '.')
            git('-c', 'user.name=Synthetic Test', '-c', 'user.email=test@example.invalid', 'commit', '-qm', 'fixture')
            revision = git('rev-parse', 'HEAD')
            release.pin(root, revision, 'test.1')
            original = entry.read_bytes()
            self.assertIn(revision, original.decode())
            self.assertNotIn('/master/', original.decode())
            self.assertEqual(release.check_release(root), [])
            guide.write_text('Version two.\n', encoding='utf-8')
            self.assertEqual(entry.read_bytes(), original)
            self.assertTrue(release.check_release(root))
            # Forging the working-file digest must not certify the old URL.
            manifest_path = root / 'skills-release.json'
            manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
            manifest['optional_depth'][0]['sha256_lf_utf8'] = release.text_hash(guide.read_text(encoding='utf-8'))
            manifest_path.write_text(json.dumps(manifest), encoding='utf-8')
            self.assertTrue(any('differs from the pinned Git source' in issue for issue in release.check_release(root)))
            with self.assertRaises(ValueError):
                release.pin(root, revision, 'test.2')
            self.assertEqual(entry.read_bytes(), original)
            git('add', 'docs/guide.md')
            git('-c', 'user.name=Synthetic Test', '-c', 'user.email=test@example.invalid', 'commit', '-qm', 'advance guide')
            newer = git('rev-parse', 'HEAD')
            release.pin(root, newer, 'test.2')
            self.assertEqual(release.check_release(root), [])
            self.assertIn(newer, entry.read_text(encoding='utf-8'))
            self.assertIn(revision, original.decode())

    def test_checked_in_release_matches_optional_depth(self):
        self.assertEqual(release.check_release(ROOT), [])


class ActivationTests(unittest.TestCase):
    def setUp(self):
        self.paths = {'silicon-design-review': ['skills/silicon-design-review/SKILL.md']}
        self.case = {'allowed': ['silicon-design-review'], 'required_any': ['silicon-design-review']}

    def test_codex_requires_successful_read_not_self_report_or_listing(self):
        events = [
            {'type': 'item.completed', 'item': {'type': 'agent_message', 'text': 'I used silicon-design-review'}},
            {'type': 'item.completed', 'item': {'type': 'command_execution', 'command': 'Get-ChildItem skills/silicon-design-review/SKILL.md', 'exit_code': 0}},
            {'type': 'item.completed', 'item': {'type': 'command_execution', 'command': 'Get-Content skills/silicon-design-review/SKILL.md', 'exit_code': 1}},
            {'type': 'turn.completed'}]
        observed, completed = activation.observed_skills('codex', events, self.paths)
        self.assertEqual(observed, set())
        self.assertEqual(activation.score(self.case, observed, completed, 0), 'failed')
        events.append({'type': 'item.completed', 'item': {'type': 'command_execution', 'command': 'Get-Content skills\\silicon-design-review\\SKILL.md', 'exit_code': 0}})
        observed, completed = activation.observed_skills('codex', events, self.paths)
        self.assertEqual(activation.score(self.case, observed, completed, 0), 'passed')

    def test_codex_echo_grep_and_comment_mentions_are_not_reads(self):
        path = self.paths['silicon-design-review'][0]
        for command in (f'echo cat {path}', f'printf "Get-Content {path}"',
                        f'cat README.md | grep -F {path}', f'cat README.md # cat {path}'):
            with self.subTest(command=command):
                events = [{'type': 'item.completed', 'item': {'type': 'command_execution', 'command': command, 'exit_code': 0}}, {'type': 'turn.completed'}]
                observed, completed = activation.observed_skills('codex', events, self.paths)
                self.assertEqual(observed, set())
                self.assertNotEqual(activation.score(self.case, observed, completed, 0), 'passed')

    def test_codex_ambiguous_and_partial_reads_stay_unobserved(self):
        path = self.paths['silicon-design-review'][0]
        for command in (f'cat {path} | head -n 2', f'echo ready; cat {path}',
                        f'Get-Content -TotalCount 2 {path}', f'head {path}', f'python read_script.py {path}'):
            with self.subTest(command=command):
                events = [{'type': 'item.completed', 'item': {'type': 'command_execution', 'command': command, 'exit_code': 0}}, {'type': 'turn.completed'}]
                observed, completed = activation.observed_skills('codex', events, self.paths)
                self.assertEqual(activation.score(self.case, observed, completed, 0), 'unobserved')
                self.assertEqual(activation.score({'allowed': [], 'required_any': []}, observed, completed, 0), 'unobserved')

    def test_codex_simple_shell_wrappers_preserve_actual_read_operands(self):
        path = self.paths['silicon-design-review'][0]
        for command in (f'cat -- "{path}"', f'bash -lc \'cat "{path}"\'',
                        f'pwsh -NoProfile -Command \'Get-Content -Raw -LiteralPath "{path}" -Encoding utf8\''):
            with self.subTest(command=command):
                events = [{'type': 'item.completed', 'item': {'type': 'command_execution', 'command': command, 'exit_code': 0}}, {'type': 'turn.completed'}]
                observed, completed = activation.observed_skills('codex', events, self.paths)
                self.assertEqual(activation.score(self.case, observed, completed, 0), 'passed')

    def test_posix_skill_paths_are_case_sensitive_for_both_hosts(self):
        path = '/fixture/skills/silicon-design-review/SKILL.md'
        paths = {'silicon-design-review': [path]}
        codex = [{'type': 'item.completed', 'item': {'type': 'command_execution', 'command': 'cat ' + path.lower(), 'exit_code': 0}}, {'type': 'turn.completed'}]
        claude = [{'type': 'assistant', 'message': {'content': [{'type': 'tool_use', 'id': 'read-1', 'name': 'Read', 'input': {'file_path': path.lower()}}]}},
                  {'type': 'user', 'message': {'content': [{'type': 'tool_result', 'tool_use_id': 'read-1', 'content': 'different file'}]}}, {'type': 'result', 'is_error': False}]
        self.assertEqual(activation.observed_skills('codex', codex, paths)[0], set())
        self.assertEqual(activation.observed_skills('claude', claude, paths)[0], set())

    def test_claude_requires_confirmed_tool_result(self):
        self.paths = {'silicon-design-review': ['C:/fixture/.claude/skills/silicon-design-review/SKILL.md']}
        events = [{'type': 'assistant', 'message': {'content': [{'type': 'tool_use', 'id': 'skill-1', 'name': 'Skill', 'input': {'skill': 'silicon-design-review'}}]}}, {'type': 'result', 'is_error': False}]
        observed, completed = activation.observed_skills('claude', events, self.paths)
        self.assertEqual(activation.score(self.case, observed, completed, 0), 'failed')
        events.insert(1, {'type': 'user', 'message': {'content': [{'type': 'tool_result', 'tool_use_id': 'skill-1', 'content': 'Base directory for this skill: C:/fixture/.claude/skills/silicon-design-review'}]}})
        observed, completed = activation.observed_skills('claude', events, self.paths)
        self.assertEqual(activation.score(self.case, observed, completed, 0), 'passed')
        events[1]['message']['content'][0]['is_error'] = True
        self.assertEqual(activation.observed_skills('claude', events, self.paths)[0], set())

    def test_claude_skill_result_requires_exact_project_directory(self):
        directory = 'C:/fixture/.claude/skills/silicon-design-review'
        paths = {'silicon-design-review': [directory + '/SKILL.md']}
        events = [{'type': 'assistant', 'message': {'content': [{'type': 'tool_use', 'id': 'skill-1', 'name': 'Skill', 'input': {'skill': 'silicon-design-review'}}]}},
                  {'type': 'user', 'message': {'content': [{'type': 'tool_result', 'tool_use_id': 'skill-1', 'content': ''}]}}, {'type': 'result', 'is_error': False}]
        result = events[1]['message']['content'][0]
        for reported in (directory + '-old', 'C:/personal/.claude/skills/silicon-design-review'):
            result['content'] = 'Base directory for this skill: ' + reported
            self.assertEqual(activation.observed_skills('claude', events, paths)[0], set())
        result['content'] = [{'type': 'text', 'text': 'Base directory for this skill: ' + directory}]
        self.assertEqual(activation.observed_skills('claude', events, paths)[0], {'silicon-design-review'})

    def test_same_name_global_package_does_not_prove_project_package_read(self):
        paths = {'silicon-design-review': ['C:/fixture/.agents/skills/silicon-design-review/SKILL.md', '.agents/skills/silicon-design-review/SKILL.md']}
        events = [{'type': 'item.completed', 'item': {'type': 'command_execution', 'command': 'Get-Content C:/personal/.agents/skills/silicon-design-review/SKILL.md', 'exit_code': 0}}, {'type': 'turn.completed'}]
        self.assertEqual(activation.observed_skills('codex', events, paths)[0], set())
        events[0]['item']['command'] = 'Get-Content ".agents/skills/silicon-design-review/SKILL.md"'
        self.assertEqual(activation.observed_skills('codex', events, paths)[0], {'silicon-design-review'})

    def test_native_process_timeout_is_retained_without_success(self):
        with tempfile.TemporaryDirectory() as directory:
            stdout, stderr, code = activation.execute([sys.executable, '-c', 'import time; print("started",flush=True); time.sleep(20)'], directory, 0.2)
            self.assertIsNone(code)
            self.assertIn('timed out', stderr)

    def test_failed_or_incomplete_run_is_not_successful_negative_control(self):
        case = {'allowed': [], 'required_any': []}
        self.assertEqual(activation.score(case, set(), True, 0), 'passed')
        self.assertEqual(activation.score(case, set(), False, 0), 'unobserved')
        self.assertEqual(activation.score(case, set(), True, 1), 'unobserved')
        self.assertEqual(activation.score(case, {'silicon-design-review'}, True, 0), 'failed')

    def test_unknown_tool_trace_is_unobserved_not_a_passing_negative(self):
        events = [{'type': 'item.completed', 'item': {'type': 'mcp_tool_call'}}, {'type': 'turn.completed'}]
        observed, completed = activation.observed_skills('codex', events, self.paths)
        self.assertEqual(activation.score({'allowed': [], 'required_any': []}, observed, completed, 0), 'unobserved')

    def test_corpus_and_frozen_project_preparation(self):
        corpus = activation.load_corpus(ROOT)
        self.assertEqual({c['mode'] for c in corpus['cases']}, {'explicit', 'implicit', 'negative'})
        self.assertEqual({c['language'] for c in corpus['cases']}, {'en', 'ru'})
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / 'attempt'
            frozen = activation.prepare(ROOT, output, 'claude')
            self.assertEqual(frozen['corpus'], corpus)
            project = output / corpus['cases'][0]['id'] / 'project'
            self.assertTrue((project / '.claude/skills/silicon-design-review/references/interactive-checks.md').is_file())
            self.assertTrue((project / 'interface.html').is_file())
            self.assertTrue(frozen['input_sha256'])
            self.assertFalse(any('__pycache__' in p or p.endswith('.pyc') for p in frozen['input_sha256']))
            with self.assertRaises(ValueError):
                activation.prepare(ROOT, output, 'claude')

    def test_corpus_rejects_vacuous_positives_and_ill_typed_cases(self):
        valid = activation.load_corpus(ROOT)
        variants = [[], {'format': 'silicon-activation-1', 'cases': ['not an object']}]
        for patch in ({'required_any': []}, {'allowed': 'silicon-design-review'}, {'prompt': 7},
                      {'allowed': ['silicon-design-review', 'silicon-design-review']},
                      {'required_any': [7]}, {'mode': 'explicit', 'required_any': ['silicon-design-review', 'silicon-interface-build'],
                                               'allowed': ['silicon-design-review', 'silicon-interface-build']}):
            case = dict(valid['cases'][0], **patch)
            variants.append(dict(valid, cases=[case]))
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'skills/silicon-design-review').mkdir(parents=True)
            (root / 'skills/silicon-interface-build').mkdir()
            (root / 'evals/activation').mkdir(parents=True)
            for corpus in variants:
                with self.subTest(corpus=corpus):
                    (root / 'evals/activation/cases.json').write_text(json.dumps(corpus), encoding='utf-8')
                    with self.assertRaises(ValueError):
                        activation.load_corpus(root)

    def test_attempt_cannot_be_prepared_inside_source_checkout(self):
        with self.assertRaises(ValueError):
            activation.prepare(ROOT, ROOT / 'must-not-be-created', 'codex')
        self.assertFalse((ROOT / 'must-not-be-created').exists())


if __name__ == '__main__':
    unittest.main()
