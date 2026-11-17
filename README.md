# Silicon Design

### AI can design. Make something worth loving.

AI already makes good interfaces. Too many of them feel interchangeable: familiar layouts, borrowed personalities, polished screens with nothing to get attached to.

**Silicon Design is a set of design principles and agent skills for giving apps, websites and games a character of their own.** We work on what makes a product recognizable and worth caring about: a clear point of view, a voice that fits, thoughtful behavior, and details that reward using it.

Use it with your coding agent to choose a direction, carry it through real interactions, and critique the result. The aim is a product someone would miss when it is gone.

[Live gallery](https://drevendev.github.io/Silicon-Design/) · [Principles](docs/principles.md) · [Character & attachment](docs/character.md) · [Skills](#skills) · [Sources](research/sources.md) · [Парадная](README.ru.md)

**[One street, three working directions](https://drevendev.github.io/Silicon-Design/examples/field-notes-directions.html)** — explore an atlas, compare a contact sheet, or read a continuous journal with the same photograph, observations and field book. See the [applied findings from #8](research/issue-8-application.md).

**Selected gallery direction: Street atlas.** The contact sheet and reading room remain available to compare.

**[Silicon Design × Anti Slop — live comparison](https://drevendev.github.io/Silicon-Design/benchmarks/2026-11-03/)**: six fresh-context runs on three identical briefs, with all alternatives retained. The [first results](benchmarks/2026-11-03/RESULTS.md) show where Silicon loses and what changed in the principles and all five skills. Our target remains better and more varied output; this trial did not establish a win.

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

**Skill release 2026.11.17.1:** game composition, material and feedback before extra read-outs; stable native targets, physical-copy Inspect and truthful temporal readers. [Specification and all 31 open issues](research/release-2026-11-17.md) · [New offline decision examples](examples/decisions/README.md) · [Later owner evidence](research/game-practice-2026-11-17.md) · [Adoption](docs/adoption.md) · [Release identity](skills-release.json). Earlier [craft corrections and whole-site comparisons](research/release-2026-11-15.md) remain available. This release demonstrates original teaching flows; better generations, measured cost and owner acceptance are separate, unperformed outcomes.

**14 November feedback revision:** the five skills make subtraction, object hierarchy and the final craft correction explicit; exact action totals stay visible and reference inspection must show actual task UI. [Feedback, changes and remaining acceptance](research/feedback-revision-2026-11-14.md) · [Subtraction and craft](docs/subtraction-and-craft.md) · [Product practice](research/product-practice-2026-11-14.md). Technical passes and relative wins remain separate from owner acceptance.

Choose the skill for the actual job from the table below. Preserve an existing direction for a small fix or established-brand screen; no rendered alternatives are needed by default. For open identity work, compare inexpensive same-content compositions and develop the selected one.

Read relevant foundations and product guidance only when they help the decision. Reuse DESIGN.md or [record changed decisions](templates/DESIGN.md) when necessary. Verify the requested frame or affected interactive flow; the [checklist](checklists/design-review.md) and [review template](templates/REVIEW.md) are optional aids, not required output bundles.

An example instruction for an agent:

> Use silicon-interface-build to refine this existing-brand screen. Preserve its identity and functional contract. Produce the requested result, inspect the affected states and report actual checks and meaningful gaps. Do not create alternatives or another workflow merely to demonstrate the process.

## Skills

Each folder is a self-contained skill; copy the entire folder. No paid service, sibling skill or online handbook fetch is required. Review's local interaction reference is loaded only for relevant interactive reviews. [Adoption and installation](docs/adoption.md) explains how to use them without replacing project instructions.

| Skill | Use it for | Concrete output |
| --- | --- | --- |
| [silicon-design-direction](skills/silicon-design-direction/SKILL.md) | New identity or open direction | Selected direction and tradeoff; inexpensive alternatives when exploration is in scope |
| [silicon-design-system](skills/silicon-design-system/SKILL.md) | Typography, tokens, components and data meaning | Changed roles/contracts, resolved pairs and relevant use-size checks |
| [silicon-interface-build](skills/silicon-interface-build/SKILL.md) | Implementing or refining a site/app | Requested frame or affected flow, located corrections and actual verification |
| [silicon-game-ui](skills/silicon-game-ui/SKILL.md) | Game interfaces and feedback | Scoped UI/state contracts, truthful resources and relevant runtime evidence |
| [silicon-design-review](skills/silicon-design-review/SKILL.md) | Reviewing implementation | Located findings, expected correction and recapture |

| [blind-test](skills/blind-test/SKILL.md) | Reproducible blind comparisons and feedback analysis | Explicit evaluation unit, workload, independent sites, draft/Next and separate QA |

## Three small worlds

**[Open the live gallery](https://drevendev.github.io/Silicon-Design/)** — try all three examples in your browser, with no setup.

The [redesigned examples](examples/README.md) carry different ideas through actual local interactions:

- **Field Notes:** a photographed street becomes a route of observations and a personal field book.
- **Dispatch:** a repair-workshop desk follows a lamp from an address correction to a cleared job, with undo.
- **Mosslight:** a lanternmaker makes and hangs a light; the path through the forest changes.

[See the browser captures](examples/README.md#preview). The [briefs](examples/README.md), [revision review](examples/REVIEW.md) and [performed checks](examples/VERIFICATION.md) explain the decisions and limits. These are fictional prototypes. The [original critique](research/specimen-critique.md) remains part of the record; recognizability and attachment still need audience testing.

## What belongs here

- Principles with observable consequences, rather than a universal visual style.
- [Behavioral contracts](docs/behavioral-contracts.md) for facts/knowledge, draft/preview/commit, achievable teaching, accepted feedback and honest recovery; [historical practice](research/platform-practice.md) remains distinct from this release’s checks.
- [Character, voice and attachment](docs/character.md), including how a product feels after repeated use.
- Foundations with starting values, exceptions and review procedures.
- Reusable workflows and skills that preserve a product's own direction.
- [Anti-generic diagnostics](docs/anti-generic.md), [our practice notes](research/our-practice.md), a [deeper source analysis](research/deep-read.md), and a traceable [source register](research/sources.md).
- Small examples that make decisions inspectable.

This is the initial handbook. The next step is to apply it to a real product and retain the before/after evidence. See the [roadmap](ROADMAP.md).

## Check the repository

With Python 3.11+ and Node.js 20+, install the pinned verification dependency in your development environment. Portable instruction skills do not require it; after setup these checks run without network access:

```sh
python -m pip install -r requirements-dev.txt
python tools/check.py
python -m unittest discover -s tests -v
node --test tests/specimen-model.test.cjs tests/field-notes.test.js tests/blind-unit.test.cjs
python tools/activation.py validate
```

The handbook check validates local Markdown destinations, skill metadata, source revisions and declared palette pairs. Node tests cover the workshop and crafting state transitions. It does not judge visual quality, crawl external links, or certify accessibility. See [contributing](CONTRIBUTING.md) for manual review expectations.

## License

[MIT](LICENSE) for original material in this repository. Referenced projects, brands, fonts and assets retain their own rights. The handbook synthesizes ideas; third-party skill bodies and installers are not bundled. The benchmark retains newly generated prototype outputs under both conditions, with pinned input provenance and original shared assets.
