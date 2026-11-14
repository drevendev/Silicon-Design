#!/usr/bin/env python3
"""Pin optional online depth without copying the handbook into each skill."""
import argparse
import hashlib
import json
import re
import subprocess
from pathlib import Path

REFERENCE = re.compile(r'https://github\.com/drevendev/Silicon-Design/blob/([^/\s]+)/([^\s)]+)')


def text_hash(source):
    return hashlib.sha256(source.replace('\r\n', '\n').encode('utf-8')).hexdigest()


def pin(root, revision, version):
    """Validate every target before writing any package or release identity."""
    def git(*args):
        return subprocess.check_output(['git', *args], cwd=root, stderr=subprocess.PIPE).decode('utf-8')
    revision = git('rev-parse', '--verify', revision + '^{commit}').strip()
    if not re.fullmatch(r'[0-9a-f]{40}', revision) or not re.fullmatch(r'[0-9A-Za-z][0-9A-Za-z._-]{0,63}', version):
        raise ValueError('invalid revision or version')
    references, writes = [], []
    for entry in sorted((root / 'skills').glob('*/SKILL.md')):
        source = entry.read_text(encoding='utf-8')
        def replace(match):
            document = match[2]
            target = (root / document).resolve()
            if not target.is_relative_to(root.resolve()) or not target.is_file():
                raise ValueError(f'missing or escaping optional depth: {document}')
            original = git('show', revision + ':' + document)
            if text_hash(original) != text_hash(target.read_text(encoding='utf-8')):
                raise ValueError(f'{document}: selected revision does not match working handbook; commit the document first')
            url = f'https://github.com/drevendev/Silicon-Design/blob/{revision}/{document}'
            references.append({'skill': entry.parent.name, 'document': document, 'revision': revision, 'sha256_lf_utf8': text_hash(original), 'url': url})
            return url
        writes.append((entry, REFERENCE.sub(replace, source)))
    if not references:
        raise ValueError('no optional handbook references found')
    manifest = {'format': 'silicon-skill-release-1', 'version': version, 'depth_revision': revision, 'optional_depth': references}
    for path, source in writes:
        path.write_text(source, encoding='utf-8', newline='\n')
    (root / 'skills-release.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    return manifest


def check_release(root):
    manifest = json.loads((root / 'skills-release.json').read_text(encoding='utf-8'))
    issues = []
    if manifest.get('format') != 'silicon-skill-release-1' or not manifest.get('version'):
        return ['skills-release.json: unsupported release identity']
    revision = manifest.get('depth_revision', '')
    if not re.fullmatch(r'[0-9a-f]{40}', revision):
        return ['skills-release.json: depth revision must be an immutable commit']
    found = {(p.parent.name, m[2], m[0]) for p in (root / 'skills').glob('*/SKILL.md') for m in REFERENCE.finditer(p.read_text(encoding='utf-8'))}
    declared = set()
    for row in manifest['optional_depth']:
        key = (row['skill'], row['document'], row['url'])
        if key in declared:
            issues.append('skills-release.json: duplicate reference')
        declared.add(key)
        expected = f'https://github.com/drevendev/Silicon-Design/blob/{revision}/{row["document"]}'
        if row['revision'] != revision or row['url'] != expected:
            issues.append(f'{row["skill"]}: optional depth must use the release revision')
        target = (root / row['document']).resolve()
        if not target.is_relative_to(root.resolve()) or not target.is_file():
            issues.append(f'{row["skill"]}: missing/escaping depth source')
        elif text_hash(target.read_text(encoding='utf-8')) != row['sha256_lf_utf8']:
            issues.append(f'{row["document"]}: handbook changed; deliberately repin optional depth for a new release')
    if not declared or found != declared:
        issues.append('skills-release.json: optional skill links and manifest differ')
    return issues


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--revision', required=True)
    parser.add_argument('--version', required=True)
    args = parser.parse_args()
    try:
        result = pin(Path(__file__).resolve().parents[1], args.revision, args.version)
    except (OSError, ValueError, subprocess.CalledProcessError) as error:
        parser.exit(1, f'Cannot pin release: {error}\n')
    print(f'Pinned {len(result["optional_depth"])} optional references for {result["version"]}')


if __name__ == '__main__':
    main()
