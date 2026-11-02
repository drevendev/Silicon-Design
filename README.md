# Silicon Design

Design foundations and agent skills for products with a point of view.

We build apps, websites and games. This handbook helps us give each product an identity, make its purpose clear, and verify that its interface works. Shared standards support different visual languages: a laboratory, a publishing site and an operations tool should feel different.

**Start with one real screen.** Write its audience and task, choose a visual direction, build with representative content, then inspect the result in a browser or game runtime. Record what you actually checked.

[Русский вход](README.ru.md) · [Principles](docs/principles.md) · [Workflow](docs/workflow.md) · [Sources](research/sources.md)

## Use it on a project

1. Adapt the [DESIGN.md template](templates/DESIGN.md) in the product repository. For a small fix, use the existing direction and document only the changed decision.
2. Read the relevant foundations: [typography](docs/foundations/typography.md), [color](docs/foundations/color.md), [layout](docs/foundations/layout.md), [interaction](docs/foundations/interaction.md), [accessibility](docs/foundations/accessibility.md).
3. Pick the product context: [websites](docs/products/websites.md), [apps](docs/products/apps.md), [games](docs/products/games.md).
4. Build and review a representative flow using the [review checklist](checklists/design-review.md). Save the result with the [review template](templates/REVIEW.md).

An example instruction for an agent:

> Use silicon-design-direction to propose a direction for this product. Keep the existing brand constraints. Implement one representative flow with silicon-interface-build, then use silicon-design-review. Show the rendered result and identify checks that remain unperformed.

## Skills

Each folder is a self-contained skill with a `SKILL.md`; no paid service, component library or design tool is required. [Adoption and installation](docs/adoption.md) explains how to use them without replacing project instructions.

| Skill | Use it for | Concrete output |
| --- | --- | --- |
| [silicon-design-direction](skills/silicon-design-direction/SKILL.md) | Establishing or changing a product's identity | A justified direction and project DESIGN.md |
| [silicon-design-system](skills/silicon-design-system/SKILL.md) | Typography, palettes, tokens and components | Semantic roles, tested color pairs, component states |
| [silicon-interface-build](skills/silicon-interface-build/SKILL.md) | Implementing a website or application interface | A rendered, working representative flow |
| [silicon-game-ui](skills/silicon-game-ui/SKILL.md) | HUDs, menus, inventory and game feedback | Readable play-state UI with input and scaling checks |
| [silicon-design-review](skills/silicon-design-review/SKILL.md) | Reviewing an existing design or implementation | Prioritized findings with evidence and bounded fixes |

## See the decisions

Open [the local specimen](examples/specimen.html) in a browser. It contains three **fictional teaching examples**, built with system fonts and original HTML/CSS. The website has an editorial reading rhythm, the app organizes actionable records, and the game foregrounds a crafting decision. Their content and palettes have different jobs.

The [filled briefs](examples/README.md) explain the tradeoffs. These are small specimens, not shipped products or proof that a redesign improved user outcomes. [Verification](examples/VERIFICATION.md) separates performed checks from future testing.

## What belongs here

- Principles with observable consequences, rather than a universal visual style.
- Foundations with starting values, exceptions and review procedures.
- Reusable workflows and skills that preserve a product's own direction.
- [Anti-generic diagnostics](docs/anti-generic.md), [our practice notes](research/our-practice.md), and a traceable [source register](research/sources.md).
- Small examples that make decisions inspectable.

This is the initial handbook. The next step is to apply it to a real product and retain the before/after evidence. See the [roadmap](ROADMAP.md).

## Check the repository

With Python 3.11+ and no runtime dependencies:

```sh
python tools/check.py
python -m unittest discover -s tests -v
```

The check validates local Markdown destinations, skill metadata, source revisions and declared palette pairs. It does not judge visual quality, crawl external links, or certify accessibility. See [contributing](CONTRIBUTING.md) for manual review expectations.

## License

[MIT](LICENSE) for original material in this repository. Referenced projects, brands, fonts and assets retain their own rights. The initial handbook synthesizes ideas; it does not bundle source code, brand assets, harvested discussions or third-party skills.
