# Adopt the handbook and skills

Use the smallest route that fits the assignment. Keep the product's brand, component library and engineering conventions unless changing them serves the requested work.

## Choose one entry point

| Job | Skill |
| --- | --- |
| New identity or open direction | silicon-design-direction |
| Type, semantic roles, tokens or components | silicon-design-system |
| Implement/refine a website or app | silicon-interface-build |
| Game HUD, menus or feedback | silicon-game-ui |
| Design critique or verification of requested fixes | silicon-design-review |

These are independent tools, not a mandatory sequence. A local correction or established-brand screen needs no rendered alternatives by default. Read handbook foundations only when they help the current decision. Reuse an existing DESIGN.md; create a concise record when real direction decisions need recording.

Each SKILL.md contains the essential workflow and constraints. Online handbook links provide optional depth. Review's local `references/interactive-checks.md` contains a detailed procedure only for relevant interactive reviews; skip it for screenshot-only/static appearance work.

Multi-screen work reuses or establishes one compact product kit before expansion; local edits do not. The essential rule is in each relevant skill. The [shared-contract procedure](product-contract.md) and [later evaluation protocol](evaluation.md) are optional handbook depth, not new always-loaded references. Palette changes must remain coherent; an authorized whole-palette redesign is allowed.

## Copy a portable folder

Copy the entire selected folder, including supporting references. Its essential workflow works offline and does not require another skill, this checkout or a commercial tool. The handbook is reference material, not global configuration; do not copy its maintenance AGENTS.md into the consuming product.

### Host discovery, documented on 14 November 2026

| Host/scope | Destination | Explicit invocation | Performed verification |
| --- | --- | --- | --- |
| Codex project | `.agents/skills/[name]/SKILL.md` | `$silicon-design-review`; `/skills` lists skills | All six project packages discovered by codex-cli 0.146.1; model activation unavailable |
| Codex personal | `~/.agents/skills/[name]/SKILL.md` | Same | Documented, not installed/tested globally |
| Claude Code project | `.claude/skills/[name]/SKILL.md` | `/silicon-design-review` | CLI 2.1.259 present; activation untested because authentication expired |
| Claude Code personal | `~/.claude/skills/[name]/SKILL.md` | Same | Documented, not installed/tested globally |

Sources: [official Codex skills documentation](https://learn.chatgpt.com/docs/build-skills) and [Claude Code skills documentation](https://code.claude.com/docs/en/skills). The same portable folder works in either location. Host policy/session context can affect discovery; a copied folder or visible command does not establish implicit selection.

From the consuming project in PowerShell, with a Silicon-Design checkout next to it:

```powershell
$skillSource = (Resolve-Path '../Silicon-Design/skills/silicon-design-review').Path
$skillDestination = '.agents/skills/silicon-design-review'
if (Test-Path -LiteralPath $skillDestination) { throw 'Compare the installed revision before replacing it.' }
New-Item -ItemType Directory -Force -Path '.agents/skills' | Out-Null
Copy-Item -LiteralPath $skillSource -Destination $skillDestination -Recurse
Test-Path -LiteralPath "$skillDestination/SKILL.md"
Test-Path -LiteralPath "$skillDestination/references/interactive-checks.md"
```

For Claude Code, change the destination to `.claude/skills/silicon-design-review` and the parent to `.claude/skills`. Do not add another skill-name directory underneath that destination. Confirm the final `SKILL.md` and bundled reference paths, then start/restart the host if necessary and check the exact name/path in its list.

For a POSIX project-local Codex copy:

```sh
skill_source=../Silicon-Design/skills/silicon-design-review
skill_destination=.agents/skills/silicon-design-review
if [ -e "$skill_destination" ]; then echo 'Compare the installed revision first.' >&2; exit 1; fi
mkdir -p .agents/skills
cp -R "$skill_source" "$skill_destination"
test -f "$skill_destination/SKILL.md"
test -f "$skill_destination/references/interactive-checks.md"
```

In codex-cli 0.146.1, `codex debug prompt-input` exposes native model-visible metadata without a model turn. Inspect it locally for project skill paths. Do not count a model's final claim as activation evidence; use [routing traces](../evals/activation/README.md).

Record release `2026.11.14.1`, the adopted Git revision and deliberate changes. The [optional-depth manifest](../skills-release.json) records immutable commit URLs and content digests. Preserve these during copying. An intentional switch to latest online guidance must be labelled and its actual resource revision recorded when reproducibility matters. Unavailable online depth cannot block the essential offline workflow.

Claude.ai, Cowork, cloud sessions and API distribution are distinct from local Claude Code folders and are not installation targets verified here. Follow their current account/upload documentation if needed. No installer, plugin manifest, global configuration overwrite or vendor-specific instruction fork is required.

## Useful project instruction

Adapt without replacing project rules:

```text
Use the relevant installed Silicon Design skill for the requested interface
work. Preserve the existing identity and functional contracts. Read only
material needed for the change; scale exploration and evidence to scope.
Inspect the result and report actual checks and meaningful untested areas.
```

For example, ask build to refine an existing-brand screen without alternatives, or direction to compare low-fidelity compositions for an explicitly open identity. The [DESIGN.md](../templates/DESIGN.md) and [review](../templates/REVIEW.md) templates are optional records, not output bundles.

## Keep useful feedback

Record concrete failures, successful decisions and context. Report loaded material and available cost separately; shorter entrypoints do not guarantee every specialised review is cheaper. A local preference should not become a global font, colour or layout ban.
