#!/usr/bin/env python3
"""Freeze and run bounded skill-routing cases; never infer activation from prose."""
import argparse
import hashlib
import json
import os
import re
import signal
import shutil
import subprocess
import sys
from pathlib import Path


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_corpus(root):
    path = root / 'evals/activation/cases.json'
    corpus = json.loads(path.read_text(encoding='utf-8'))
    known = {p.name for p in (root / 'skills').iterdir() if p.is_dir()}
    seen = set()
    if corpus.get('format') != 'silicon-activation-1' or not corpus.get('cases'):
        raise ValueError('unsupported or empty activation corpus')
    for case in corpus['cases']:
        identity = case['id']
        if not re.fullmatch(r'[a-z0-9-]+', identity) or identity in seen:
            raise ValueError('invalid or duplicate case identity')
        seen.add(identity)
        allowed, required = set(case['allowed']), set(case['required_any'])
        if not allowed <= known or not required <= allowed or not case['prompt'].strip():
            raise ValueError(f'{identity}: unknown skill, invalid expectation or empty prompt')
        if case['mode'] not in ('explicit', 'implicit', 'negative') or case['language'] not in ('en', 'ru'):
            raise ValueError(f'{identity}: invalid mode/language')
        if case['mode'] == 'negative' and (allowed or required):
            raise ValueError(f'{identity}: negative control expects skills')
    return corpus


def read_trace(path):
    events = []
    for line in path.read_text(encoding='utf-8').splitlines():
        if line.strip():
            events.append(json.loads(line))
    return events


def observed_skills(host, events, package_paths):
    """Only successful file-read commands or confirmed Skill/Read tool use count."""
    observed = set()
    completed = False
    if host == 'codex':
        unsupported_tool = False
        for event in events:
            completed |= event.get('type') == 'turn.completed'
            item = event.get('item', {})
            unsupported_tool |= item.get('type') in ('mcp_tool_call', 'tool_call', 'function_call')
            if event.get('type') != 'item.completed' or item.get('type') != 'command_execution' or item.get('exit_code') != 0:
                continue
            command = item.get('command', '').replace('\\', '/').lower()
            if not re.search(r'\b(cat|get-content|type|head|sed|read_text)\b', command):
                continue
            candidates = {next(part for part in match if part).removeprefix('./') for match in
                          re.findall(r'"([^"\n]*skill\.md)"|\'([^\'\n]*skill\.md)\'|([^\s"\'`;]+skill\.md)', command)}
            for name, paths in package_paths.items():
                if any(p.replace('\\', '/').lower().removeprefix('./') in candidates for p in paths):
                    observed.add(name)
        if unsupported_tool:
            completed = False
    else:
        pending = {}
        for event in events:
            completed |= event.get('type') == 'result' and not event.get('is_error', False)
            for block in event.get('message', {}).get('content', []):
                if not isinstance(block, dict):
                    continue
                if block.get('type') == 'tool_use':
                    pending[block['id']] = block
                if block.get('type') != 'tool_result' or block.get('is_error', False):
                    continue
                tool = pending.get(block.get('tool_use_id'), {})
                data = tool.get('input', {})
                if tool.get('name') == 'Skill':
                    name = data.get('skill', '').split(':')[-1]
                    result_text = json.dumps(block.get('content', ''), ensure_ascii=False).replace('\\\\', '/').lower()
                    directories = [p.replace('\\', '/').lower().rsplit('/', 1)[0] for p in package_paths.get(name, []) if re.match(r'^(?:[A-Za-z]:|/)', p)]
                    if name in package_paths and any(directory in result_text for directory in directories):
                        observed.add(name)
                if tool.get('name') == 'Read':
                    path = data.get('file_path', '').replace('\\', '/').lower()
                    for name, paths in package_paths.items():
                        if any(path == p.replace('\\', '/').lower() for p in paths):
                            observed.add(name)
    return observed, completed


def execute(command, workspace, timeout):
    """Stop the owned process on timeout and report tree-cleanup limits."""
    options = {'creationflags': subprocess.CREATE_NEW_PROCESS_GROUP} if os.name == 'nt' else {'start_new_session': True}
    process = subprocess.Popen(command, cwd=workspace, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                               text=True, encoding='utf-8', errors='replace', **options)
    try:
        stdout, stderr = process.communicate(timeout=timeout)
        return stdout, stderr, process.returncode
    except subprocess.TimeoutExpired:
        cleanup_note = ''
        if os.name == 'nt':
            try:
                killed = subprocess.run(['taskkill', '/PID', str(process.pid), '/T', '/F'], capture_output=True, timeout=10)
                if killed.returncode:
                    cleanup_note = 'Process-tree termination unavailable; direct process stopped, descendants unverified.\n'
                    process.kill()
            except (OSError, subprocess.SubprocessError):
                cleanup_note = 'Process-tree termination unavailable; direct process stopped, descendants unverified.\n'
                process.kill()
        else:
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
        try:
            stdout, stderr = process.communicate(timeout=10)
        except subprocess.TimeoutExpired as error:
            stdout, stderr = error.stdout or b'', error.stderr or b''
            stdout = stdout.decode('utf-8', 'replace') if isinstance(stdout, bytes) else stdout
            stderr = stderr.decode('utf-8', 'replace') if isinstance(stderr, bytes) else stderr
            cleanup_note += 'Descendant pipe closure unverified.\n'
        return stdout, stderr + '\nActivation case timed out; no retry.\n' + cleanup_note, None


def score(case, observed, completed, exit_code):
    if exit_code != 0 or not completed:
        return 'unobserved'
    allowed, required = set(case['allowed']), set(case['required_any'])
    return 'passed' if observed <= allowed and (not required or observed & required) else 'failed'


def prepare(root, output, host):
    corpus = load_corpus(root)
    if output.resolve().is_relative_to(root.resolve()):
        raise ValueError('keep native workspaces/traces outside the source checkout')
    if output.exists():
        raise ValueError('output already exists; retain attempts and choose a fresh directory')
    output.mkdir(parents=True)
    hashes = {p.relative_to(root).as_posix(): digest(p) for p in sorted((root / 'skills').rglob('*')) if p.is_file() and '__pycache__' not in p.parts and p.suffix != '.pyc'}
    hashes.update({p.relative_to(root).as_posix(): digest(p) for p in sorted((root / 'evals/activation').rglob('*')) if p.is_file()})
    manifest = {'format': 'silicon-activation-attempt-1', 'host': host, 'corpus': corpus, 'input_sha256': hashes,
                'limits': ['One native process per selected case, default host model/settings, no retries.', 'Other user/system skills may be visible; this is host activation, not an isolated model comparison.', 'Only observed tool/file reads count; unsupported/absent trace evidence is not a passing activation claim.']}
    (output / 'inputs.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    for case in corpus['cases']:
        workspace = output / case['id'] / 'project'
        shutil.copytree(root / 'evals/activation/fixture', workspace)
        packages = workspace / ('.agents' if host == 'codex' else '.claude') / 'skills'
        shutil.copytree(root / 'skills', packages, ignore=shutil.ignore_patterns('__pycache__', '*.pyc'))
        subprocess.run(['git', 'init', '--quiet', str(workspace)], check=True, capture_output=True)
    return manifest


def run(root, output, host, cases, timeout):
    manifest = prepare(root, output, host)
    executable = shutil.which(host)
    results = []
    if executable is None:
        raise ValueError(f'{host} executable unavailable; prepared inputs retained at {output}')
    version = subprocess.run([executable, '--version'], capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=15).stdout.strip()
    for case in manifest['corpus']['cases']:
        if cases and case['id'] not in cases:
            results.append({'id': case['id'], 'status': 'untested'})
            continue
        directory = output / case['id']
        workspace = directory / 'project'
        package_root = workspace / ('.agents' if host == 'codex' else '.claude') / 'skills'
        prompt = case['prompt']
        if case['mode'] == 'explicit':
            prefix = '$' if host == 'codex' else '/'
            prompt = prefix + case['required_any'][0] + ' ' + prompt
        if host == 'codex':
            command = [executable, 'exec', '--ephemeral', '--json', '--color', 'never', '--sandbox', 'workspace-write', '--skip-git-repo-check', '--cd', str(workspace), prompt]
        else:
            command = [executable, '-p', prompt, '--output-format', 'stream-json', '--verbose', '--no-session-persistence', '--strict-mcp-config']
        status, exit_code = 'unobserved', None
        stdout, stderr, exit_code = execute(command, workspace, timeout)
        trace = directory / 'trace.jsonl'
        trace.write_text(stdout, encoding='utf-8')
        (directory / 'stderr.log').write_text(stderr, encoding='utf-8')
        paths = {p.name: [str(p / 'SKILL.md'), (p / 'SKILL.md').relative_to(workspace).as_posix()] for p in package_root.iterdir() if p.is_dir()}
        try:
            observed, completed = observed_skills(host, read_trace(trace), paths)
            status = score(case, observed, completed, exit_code)
        except (ValueError, TypeError, KeyError):
            observed = set()
        results.append({'id': case['id'], 'status': status, 'observed': sorted(observed), 'exit_code': exit_code, 'trace_sha256': digest(trace)})
        report = {'host': host, 'cli_version': version, 'model': 'host default; not asserted from final prose', 'cases': results,
                  'limits': manifest['limits'], 'unrun_cases': [c['id'] for c in manifest['corpus']['cases'] if c['id'] not in {r['id'] for r in results}]}
        (output / 'results.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        print(f'{case["id"]}: {status} {sorted(observed)}', flush=True)
        # Infrastructure/auth failure is not a design result: retain it and stop.
        if exit_code != 0:
            break
    return results


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('action', choices=('validate', 'prepare', 'run'))
    parser.add_argument('--host', choices=('codex', 'claude'), default='codex')
    parser.add_argument('--output', type=Path)
    parser.add_argument('--case', action='append', default=[])
    parser.add_argument('--timeout', type=int, default=90)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    try:
        corpus = load_corpus(root)
        if not set(args.case) <= {c['id'] for c in corpus['cases']}:
            raise ValueError('unknown case')
        if args.action == 'validate':
            print(f'Valid activation corpus: {len(corpus["cases"])} cases')
            return 0
        if args.output is None or not 1 <= args.timeout <= 600:
            raise ValueError('provide a fresh output path and a 1–600 second timeout')
        if args.action == 'prepare':
            prepare(root, args.output.resolve(), args.host)
        else:
            result = run(root, args.output.resolve(), args.host, set(args.case), args.timeout)
            selected = [row for row in result if row['status'] != 'untested']
            return 0 if selected and all(row['status'] == 'passed' for row in selected) else 1
    except (OSError, ValueError, subprocess.SubprocessError) as error:
        parser.exit(2, f'Activation evaluation unavailable: {error}\n')
    return 0


if __name__ == '__main__':
    sys.exit(main())
