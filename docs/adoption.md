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

For an agent supporting project-local `.agents/skills`, with a Silicon-Design checkout next to the project:

```powershell
New-Item -ItemType Directory -Force -Path .agents/skills
Copy-Item -LiteralPath ../Silicon-Design/skills/silicon-design-review -Destination .agents/skills/ -Recurse
```

Inspect an existing destination and compare revisions before replacing it. Record the adopted revision so updates remain deliberate. Follow the host's discovery instructions for other locations. No installer or plugin manifest is required. A local path can also be used explicitly; automatic discovery depends on the host.

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
