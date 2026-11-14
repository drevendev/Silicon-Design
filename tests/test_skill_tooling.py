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

    def test_attempt_cannot_be_prepared_inside_source_checkout(self):
        with self.assertRaises(ValueError):
            activation.prepare(ROOT, ROOT / 'must-not-be-created', 'codex')
        self.assertFalse((ROOT / 'must-not-be-created').exists())


if __name__ == '__main__':
    unittest.main()
