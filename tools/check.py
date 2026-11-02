#!/usr/bin/env python3
"""Bounded offline checks for Silicon Design's documented data contracts."""

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


def local_destination(root, owner, destination):
    """Resolve a repository link; return None for external or fragment-only links."""
    parsed = urlsplit(destination)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return None
    target = (owner.parent / unquote(parsed.path)).resolve()
    if not target.is_relative_to(root.resolve()):
        raise ValueError(f"link escapes repository: {destination}")
    return target


def check_markdown(root):
    issues = []
    for path in sorted(root.rglob('*.md')):
        source = path.read_text(encoding='utf-8')
        source = re.sub(r'^```[^\n]*\n.*?^```\s*$', '', source, flags=re.M | re.S)
        for match in re.finditer(r'!?\[[^\]\n]*\]\(([^)\n]+)\)', source):
            destination = match.group(1).strip().strip('<>')
            try:
                target = local_destination(root, path, destination)
                if target is not None and not target.exists():
                    issues.append(f'{path.relative_to(root)}: missing {destination}')
            except ValueError as error:
                issues.append(f'{path.relative_to(root)}: {error}')
    return issues


def check_skills(root):
    issues = []
    folders = sorted((root / 'skills').iterdir()) if (root / 'skills').is_dir() else []
    if not folders:
        return ['skills: no skill folders found']
    for folder in folders:
        if not folder.is_dir():
            continue
        path = folder / 'SKILL.md'
        if not path.is_file():
            issues.append(f'{folder.name}: missing SKILL.md')
            continue
        source = path.read_text(encoding='utf-8')
        frontmatter = re.match(r'\A---\n(.*?)\n---\n', source, re.S)
        if not frontmatter:
            issues.append(f'{folder.name}: missing frontmatter')
            continue
        fields = dict(re.findall(r'^(name|description):\s*(.+)$', frontmatter[1], re.M))
        if fields.get('name') != folder.name or not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', folder.name) or len(folder.name) > 64:
            issues.append(f'{folder.name}: invalid or mismatched skill name')
        description = fields.get('description', '').strip()
        if not description or len(description) > 1024:
            issues.append(f'{folder.name}: missing or oversized description')
        if '[TODO:' in source:
            issues.append(f'{folder.name}: unfinished scaffold')
    return issues


def contrast(foreground, background):
    """WCAG relative-luminance ratio for opaque six-digit sRGB hex colors."""
    def luminance(color):
        if not re.fullmatch(r'#[0-9a-fA-F]{6}', color):
            raise ValueError(f'unsupported sRGB color: {color}')
        channels = [int(color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
        linear = [c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4 for c in channels]
        return sum(c * weight for c, weight in zip(linear, (.2126, .7152, .0722)))
    light, dark = sorted((luminance(foreground), luminance(background)), reverse=True)
    return (light + .05) / (dark + .05)


def check_palettes(root):
    data = json.loads((root / 'examples/palettes.json').read_text(encoding='utf-8'))
    if data.get('format') != 'silicon-specimen-palettes-1' or not data.get('palettes'):
        raise ValueError('unsupported or empty palette file')
    source = (root / 'examples/specimen.html').read_text(encoding='utf-8')
    issues, results, names = [], [], set()
    for palette in data['palettes']:
        name, roles = palette['name'], palette['roles']
        if name in names:
            issues.append(f'palette: duplicate {name}')
        names.add(name)
        block = re.search(re.escape(palette['css_scope']) + r'\s*\{([^}]+)\}', source)
        if not block:
            issues.append(f'{name}: missing CSS scope')
            continue
        css_roles = dict(re.findall(r'--([a-z-]+):\s*(#[0-9a-fA-F]{6})\s*;', block[1]))
        for role, value in roles.items():
            contrast(value, value)
            if css_roles.get(role, '').lower() != value.lower():
                issues.append(f'{name}.{role}: CSS role differs from palette data')
        if not palette.get('pairs'):
            issues.append(f'{name}: no declared contrast pairs')
        for pair in palette['pairs']:
            minimum = pair['minimum']
            if minimum not in (3, 4.5, 7):
                raise ValueError(f'{name}: unsupported contrast threshold')
            ratio = contrast(roles[pair['foreground']], roles[pair['background']])
            label = f"{name}: {pair['usage']}"
            results.append((label, ratio, minimum))
            if ratio < minimum:
                issues.append(f'{label}: {ratio:.4f}:1 below {minimum}:1')
    return issues, results


def check_revisions(root):
    records = json.loads((root / 'research/revisions.json').read_text(encoding='utf-8'))
    if not isinstance(records, list) or not records:
        raise ValueError('source revision register must be a nonempty list')
    issues, seen = [], set()
    for record in records:
        repository = record['repository']
        if repository in seen:
            issues.append(f'sources: duplicate repository {repository}')
        seen.add(repository)
        if not re.fullmatch(r'[^/\s]+/[^/\s]+', repository):
            issues.append(f'sources: invalid repository {repository}')
        if not re.fullmatch(r'[0-9a-f]{40}', record['revision']):
            issues.append(f'{repository}: invalid commit revision')
        if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', record['reviewed_at']) or not record.get('paths'):
            issues.append(f'{repository}: missing date or inspected paths')
    return issues


class LocalHTMLLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids = [], set()

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if 'id' in attributes:
            self.ids.add(attributes['id'])
        for key in ('href', 'src'):
            if key in attributes:
                self.links.append(attributes[key])


def check_html(root):
    issues = []
    for path in sorted(root.rglob('*.html')):
        parsed = LocalHTMLLinks()
        parsed.feed(path.read_text(encoding='utf-8'))
        for destination in parsed.links:
            try:
                target = local_destination(root, path, destination)
                if target is not None and not target.exists():
                    issues.append(f'{path.relative_to(root)}: missing {destination}')
                parts = urlsplit(destination)
                if not parts.scheme and not parts.netloc and not parts.path and parts.fragment and unquote(parts.fragment) not in parsed.ids:
                    issues.append(f'{path.relative_to(root)}: missing fragment {destination}')
            except ValueError as error:
                issues.append(f'{path.relative_to(root)}: {error}')
    return issues


def main():
    root = Path(__file__).resolve().parents[1]
    issues = []
    for check in (check_markdown, check_skills, check_revisions, check_html):
        try:
            issues.extend(check(root))
        except (OSError, ValueError, KeyError, TypeError) as error:
            issues.append(f'{check.__name__}: {error}')
    try:
        palette_issues, pairs = check_palettes(root)
        issues.extend(palette_issues)
        print(f'Palette pairs: {len(pairs)}; lowest ratio: {min(ratio for _, ratio, _ in pairs):.2f}:1')
    except (OSError, ValueError, KeyError, TypeError) as error:
        issues.append(f'check_palettes: {error}')
    for issue in issues:
        print(f'ERROR: {issue}')
    if issues:
        return 1
    print('OK: local links, skill metadata, source revisions and declared palette contracts')
    return 0


if __name__ == '__main__':
    sys.exit(main())
