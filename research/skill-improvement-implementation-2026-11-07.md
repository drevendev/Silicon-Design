# Lean skill implementation

Implementation of [#21](https://github.com/drevendev/Silicon-Design/issues/21), 7 November 2026. The five skills retain their names and independent portable folders. The change replaces repeated product-process prose with scoped decisions, implements the operations/v2 findings and aligns the handbook, entry points, templates and checklist.

This record separates authoring/packaging checks from a new comparative generation or audience study. The [specification](skill-improvement-spec-2026-11-07.md) remains the source of R1–R8; the [source ledger](skill-improvement-spec-2026-11-07.sources.json) pins the inputs.

## Context size

Body words use whitespace splitting after YAML frontmatter. Descriptions are measured in characters; neither is model-token billing.

| Entry point | Before | After |
| --- | ---: | ---: |
| direction | 833 | 375 |
| system | 569 | 408 |
| build | 655 | 419 |
| review | 668 | 401 |
| game | 668 | 420 |
| Total body words | 3,393 | 2,023 |
| Total description characters | 974 | 635 |

Entrypoint prose is about **40.4% shorter**, below the 2,200-word planning target. All descriptions are 121–136 characters. No word-count assertion was added to CI.

The only new runtime reference is [interactive checks](../skills/silicon-design-review/references/interactive-checks.md), 492 words. Static review loads the 401-word entry point; a relevant interactive review may read 893 words including that procedure, versus the old 668-word entry point. This is more specialised detail, not a claim that every route becomes cheaper. Other skills have no mandatory local reference or sibling-skill dependency.

## Requirement coverage

| Requirement | Implementation and inspected consequence |
| --- | --- |
| R1 Scope and exploration | [direction](../skills/silicon-design-direction/SKILL.md), [workflow](../docs/workflow.md), [adoption](../docs/adoption.md), both [design](../templates/DESIGN.md) / [review](../templates/REVIEW.md) templates and README routes. Existing-brand corrections default to one direction; alternatives, inventories, sheets, secondary surfaces and documents are conditional. Open exploration retains inexpensive comparable options, a restrained treatment and selected narrow priority. |
| R2 Operational density | [build](../skills/silicon-interface-build/SKILL.md) and [apps](../docs/products/apps.md). Rank real task fields; subtract framing without removing useful summaries, explanations or legends. Visible rows are evidence, not a reason to shrink text/targets. |
| R3 Status meaning | [system](../skills/silicon-design-system/SKILL.md), [colour](../docs/foundations/color.md), apps and checklist. Preserve informative semantic colour with other cues, remeasure the applicable pair and explain unfamiliar codes with reachable detail. Success/partial/unknown examples stay truthful. |
| R4 Interactive boundaries | Build states expected activation, stability, clipping, sticky and recovery outcomes independently. Review conditionally loads its bundled procedure, covering native-input evidence, useful context/focus and deliberate-reflow/variable-height negative controls. |
| R5 Charts | System/build and [typography](../docs/foundations/typography.md) retain source fidelity, visible unit/label relationships, series/period/geography/scale and missing/stacked data. Contradictions are reported, not silently repaired. |
| R6 Landing craft | Build and [websites](../docs/products/websites.md) inspect real headline breaks, comparable groups and action destinations; no invented assets, disclosures or unauthorized copy changes. Static frames do not require downstream sections. |
| R7 Game cues | [game](../skills/silicon-game-ui/SKILL.md) and [games guide](../docs/products/games.md) inspect use-size meaning/selection and scene coherence while preserving exact resources and knowledge rules. No mandatory top strip or glyph. |
| R8 Finishing and evidence | Build/review/game use located corrections and affected rechecks. Operation and character remain separate, winners' comments are read, and relative preference is not acceptance. Source, rendering, input and audience evidence remain distinct. |

The principles/character chapters and checklist were inspected for instructions that could reintroduce a full process. Their exploration, sheets and cross-surface language is now conditional too.

## Retained critical invariants

| Existing obligation | Retained location |
| --- | --- |
| Actual theme inheritance, overlays and quantities, not only a palette list | System measures resolved pairs including transparency; game explicitly measures actual changed pairs. Colour foundation retains the original light-folio evidence. |
| Ordinary/large/non-text contrast distinction and unrounded thresholds | System and colour foundation; 3.09:1 alone is not a failure of a 3:1 threshold. Font-size preference is not treated as a compliance failure. |
| Selected task priority after narrow reflow | Direction/game and exploration records; not a universal above-fold action rule. |
| Last-item undo restores useful task context and connected visible focus | Standalone build, game recovery and review's local interaction procedure; source focus calls are not native evidence. |
| Exact economy, event causality, hidden knowledge and no hover/focus mutation | Game entry point; zero/unknown/not-applicable stay distinct and resource effects follow real events. |
| No invented notes, fields, workflows, persistence or brand evidence | All applicable entry points and conditional templates. Prototype/fiction labels and source-data truth remain explicit. |
| No style blacklist, fabricated beauty/user outcomes or automatic approval ritual | Direction/build/review and public guidance preserve deliberate choices and authorized reversible work. |
| Correct a test adapter without blaming the product | Review entry point and its procedure retain this evidence boundary. |

These are a semantic source audit against the saved pre-edit files and approved specification, not regex tests matching particular prose.

## Scoped scenario walkthrough

The eight specification cases were checked against the revised entry points and consumer documents:

- A label/spacing fix has a one-direction route and no required new document or workflow.
- An existing-brand operator screen can retain meaningful status/legend detail while starting compact.
- Open identity work still compares visible relationships and checks selected narrow priority.
- Interactive table/board review reaches the local procedure; working full-area controls and deliberate item-height variation are not automatic defects.
- A screenshot-only review skips that reference and cannot claim native input/focus/AT results.
- Coded statuses retain meaningful colour, other cues, reachable detail and truthful state examples.
- Fixed chart/landing content preserves values/copy while inspecting units, labels, grouping and action cues.
- A game icon correction does not change economy, knowledge or save contracts or require another flow.

These walkthroughs check instruction coverage and contradictions. Fresh model behaviour is a separate evaluation; the small independent exercise below is not eight new generation runs.

## Independent bounded exercise

The exercise uses copies outside the repository and installed skill folders: one existing-brand button-label correction and one review-only operations board. It receives the relevant portable folders and raw fictional HTML, without this specification, the intended findings or previous conclusions.

Both assignments completed. The parent inspected the returned HTML and reports and checked that reversing the single label replacement reproduces the input bytes, with unchanged script/style and no rendered alternatives or new workflow. The review-only board remained unchanged. Its report located partial Priority activation, Owner clipping, inert filter options, Stage positioning and the sticky corner's lower layer. It correctly treated a whole-button handler and deliberately different card heights as counterexamples to blanket defect rules.

The reviewer distinguished confirmed source wiring from unobserved rendering/input and qualified the prototype-filter interpretation. Browser inventory was empty, so actual activation, focus, scrolling, zoom and assistive technology remain untested. The two tasks shared one fresh evaluator context with no supplied intended findings; this is not eight independent runs or a matched quality, cost or audience benchmark. This small source-based exercise supports the specific scope/evidence behaviour observed, not general superiority.

## Performed checks

- Repository checker: local links, skill metadata, source revisions and 20 declared palette pairs passed.
- Bundled skill-creator validator: all five original folders and five isolated copies passed. Each relative Markdown resource resolves inside its copied folder; optional web depth was not fetched or required.
- The validator's missing PyYAML import was an environment issue. Existing workspace PyYAML 6.0.3 was reused for authoring checks; no dependency was added to the skills.
- Existing checker tests: 12 passed. Existing specimen state tests: 9 passed, including exact material consumption, address validation and undo state.
- Frozen experiment audit: 621 input hashes, 36 generated HTML, 48 captures, 12 reference originals and 465 first-series files passed. Export/corpus identities remain unchanged; the audit did not rewrite results or derived summaries.

The companion [verification data](skill-improvement-implementation-2026-11-07.json) records before/after file identities and checks. Baselines, portable copies and temporary exercise artifacts remain outside the skill package.

No product specimen or runtime implementation changed in this revision. No new full generation trial, native platform/AT audit or audience comparison was performed. Existing trial results remain attached to their tested packages; improved generation quality and cost remain to be measured.
