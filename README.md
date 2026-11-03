# Silicon Design

### AI can design. Make something worth loving.

AI already makes good interfaces. Too many of them feel interchangeable: familiar layouts, borrowed personalities, polished screens with nothing to get attached to.

**Silicon Design is a set of design principles and agent skills for giving apps, websites and games a character of their own.** We work on what makes a product recognizable and worth caring about: a clear point of view, a voice that fits, thoughtful behavior, and details that reward using it.

Use it with your coding agent to choose a direction, carry it through real interactions, and critique the result. The aim is a product someone would miss when it is gone.

[Live gallery](https://drevendev.github.io/Silicon-Design/) · [Principles](docs/principles.md) · [Character & attachment](docs/character.md) · [Skills](#skills) · [Sources](research/sources.md) · [Парадная](README.ru.md)

**[One street, three working directions](https://drevendev.github.io/Silicon-Design/examples/field-notes-directions.html)** — explore an atlas, compare a contact sheet, or read a continuous journal with the same photograph, observations and field book. See the [applied findings from #8](research/issue-8-application.md).

**Selected gallery direction: Street atlas.** The contact sheet and reading room remain available to compare.

Our first benchmark target is **better and more varied output than Anti Slop**. The [matched-trial protocol](research/benchmark.md) defines how to test that; a comparative win is not established yet.

## What we are fixing

| When AI settles for… | Work on… |
| --- | --- |
| A different logo on the same page | Composition and imagery rooted in this product's subject |
| A fashionable palette doing all the branding | A visual grammar that carries across screens and states |
| “Modern, clean, premium” | A specific feeling, expressed through visible decisions |
| A delightful first visit followed by friction | Useful details, respectful defaults and a good tenth visit |
| An interface that passes every static check | A working product with a character people can recognize |

Removing clichés leaves space. The design work is deciding what belongs in it.

## Use it on a project

1. Choose the feeling and behavior the product should be remembered for using [Character & attachment](docs/character.md), then adapt the [DESIGN.md template](templates/DESIGN.md). For a small fix, preserve the existing direction.
2. Read the relevant foundations: [typography](docs/foundations/typography.md), [color](docs/foundations/color.md), [layout](docs/foundations/layout.md), [interaction](docs/foundations/interaction.md), [accessibility](docs/foundations/accessibility.md).
3. Pick the product context: [websites](docs/products/websites.md), [apps](docs/products/apps.md), [games](docs/products/games.md).
4. Build and review a representative flow using the [review checklist](checklists/design-review.md). Save the result with the [review template](templates/REVIEW.md).

An example instruction for an agent:

> Use silicon-design-direction to give this product a character of its own. Ground the choices in its audience and subject. Carry one recognizable idea through the main task, an empty state and a completed action. Implement that flow with silicon-interface-build, then use silicon-design-review to inspect both usability and character. Show the result and distinguish evidence from judgment.

## Skills

Each folder is a self-contained skill with a `SKILL.md`; no paid service, component library or design tool is required. [Adoption and installation](docs/adoption.md) explains how to use them without replacing project instructions.

| Skill | Use it for | Concrete output |
| --- | --- | --- |
| [silicon-design-direction](skills/silicon-design-direction/SKILL.md) | Establishing or changing identity | Subject inventory, retained same-brief alternatives, DESIGN.md |
| [silicon-design-system](skills/silicon-design-system/SKILL.md) | Typography, tokens and components | Semantic roles, measured pairs, use-size component/asset/state sheet |
| [silicon-interface-build](skills/silicon-interface-build/SKILL.md) | Implementing a site or app | Complete/adverse/ordinary flows, second surface and rendered evidence |
| [silicon-game-ui](skills/silicon-game-ui/SKILL.md) | Game interfaces and feedback | Coherent world/state proof, truthful costs and repeated-input checks |
| [silicon-design-review](skills/silicon-design-review/SKILL.md) | Reviewing implementation | Located findings, expected correction and recapture |

## Three small worlds

**[Open the live gallery](https://drevendev.github.io/Silicon-Design/)** — try all three examples in your browser, with no setup.

The [redesigned examples](examples/README.md) carry different ideas through actual local interactions:

- **Field Notes:** a photographed street becomes a route of observations and a personal field book.
- **Dispatch:** a repair-workshop desk follows a lamp from an address correction to a cleared job, with undo.
- **Mosslight:** a lanternmaker makes and hangs a light; the path through the forest changes.

[See the browser captures](examples/README.md#preview). The [briefs](examples/README.md), [revision review](examples/REVIEW.md) and [performed checks](examples/VERIFICATION.md) explain the decisions and limits. These are fictional prototypes. The [original critique](research/specimen-critique.md) remains part of the record; recognizability and attachment still need audience testing.

## What belongs here

- Principles with observable consequences, rather than a universal visual style.
- [Character, voice and attachment](docs/character.md), including how a product feels after repeated use.
- Foundations with starting values, exceptions and review procedures.
- Reusable workflows and skills that preserve a product's own direction.
- [Anti-generic diagnostics](docs/anti-generic.md), [our practice notes](research/our-practice.md), a [deeper source analysis](research/deep-read.md), and a traceable [source register](research/sources.md).
- Small examples that make decisions inspectable.

This is the initial handbook. The next step is to apply it to a real product and retain the before/after evidence. See the [roadmap](ROADMAP.md).

## Check the repository

With Python 3.11+ and Node.js 20+, without installing dependencies:

```sh
python tools/check.py
python -m unittest discover -s tests -v
node --test tests/specimen-model.test.cjs
```

The handbook check validates local Markdown destinations, skill metadata, source revisions and declared palette pairs. Node tests cover the workshop and crafting state transitions. It does not judge visual quality, crawl external links, or certify accessibility. See [contributing](CONTRIBUTING.md) for manual review expectations.

## License

[MIT](LICENSE) for original material in this repository. Referenced projects, brands, fonts and assets retain their own rights. The initial handbook synthesizes ideas; it does not bundle source code, brand assets, harvested discussions or third-party skills.
