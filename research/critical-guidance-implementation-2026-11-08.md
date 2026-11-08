# Owner-critical guidance implementation — 8 November 2026

This contribution implements the skill/handbook changes requested by public
[#26](https://github.com/drevendev/Silicon-Design/issues/26) and #27–#33 against
`1d0f408016f5761766ab7b0400fd0b03be625b53`. It changes instructions and their
documentation, not a consumer product. No comparative generation/preference
experiment, participant recruitment or fresh model exercise is started.

## Changed decisions

| Requirement | Implementation and boundary |
| --- | --- |
| #27: coherent palette | Direction/system/build/game/review allow an authorized whole-palette change. [Colour guidance](../docs/foundations/color.md) maps surfaces, foregrounds, glyphs and states together; no hue blacklist or palette freeze. |
| #28: real glyph contrast and crops | System/build/game/review trace inherited SVG/mask/filter/image colours onto actual surfaces and inspect bounds. Unreadable cues remain unresolved despite other passing swatches; applicable role thresholds/exceptions remain. This authoring change does not claim a rendered output was fixed. |
| #29: product kit before screen expansion | [Shared contract](../docs/product-contract.md) names the current source, compact roles and authoritative component implementations, consumers and task-based exceptions. Essential rules are in each relevant portable skill. Local corrections need no new kit/framework/sheet. |
| #30: useful structural simplification | Build/game/review and [interaction guidance](../docs/foundations/interaction.md) support removing redundant presentation and changing familiar control representation within scope. The fictional JSX illustration retains the action/target and names the glyph; it is an instructional pattern, not a natively verified fixture. Fixed-copy/DOM limits remain binding. |
| #31: readable compactness | Build/system/game/review, [layout](../docs/foundations/layout.md) and checklist retain bounded widths, grouped actions and meaningful quantity/cost/unit hierarchy without tiny text, compulsory equal heights or hidden content. |
| #32: current source and supplied growth | Skills, [workflow](../docs/workflow.md) and [DESIGN template](../templates/DESIGN.md) carry revision, accepted changes, arrangements/capacity, permitted structural work and supplied plans; speculation stays distinct. |
| #33: later protocol only | [Evaluation contract](../docs/evaluation.md) defines whole-product scope, isolated shared kits, equal total allowances including kit work, permitted structural work, failure handling and partial-result limits. #23 remains on hold; implementation checks do not authorize a comparison. |

## Retained requirements: semantic source audit

This is a walkthrough of decisions and packaging, not keyword tests or a model
behavior score.

| Existing requirement | Retained scope |
| --- | --- |
| Proportional scope | One direction for bounded work; no automatic alternatives, new fields/flows, secondary surfaces, persistence or document bundles; routine authorized repairs need no new approval sequence. |
| Justified exploration | Inexpensive matched-content alternatives and a restrained treatment only for open/requested exploration; selected priority survives narrow reflow; subject specificity and tradeoffs remain. |
| State and exact meaning | Useful input/context, zero/unknown/not-applicable, exact/reachable values, unavailable reasons, truthful events and no invented results/capabilities. |
| Native interaction evidence | Label/icon/padding/keyboard activation, clipping, sticky intersections, connected visible focus and affected close/removal/last-item undo/persistence remain. Stubs and hit-tests do not prove native behavior. The conditional interactive reference is unchanged. |
| Negative controls | Deliberate reflow, reachable truncation detail, full-area working controls and content-driven card height are not automatic defects. |
| Status and charts | Semantic colour plus other cues, nearby code legend/reachable detail, truthful success/partial/unknown; visible units, near labels, period/geography/scale/series, exact inputs and contradiction reporting. |
| Game truth and character | Exact resources/costs, knowledge/unlock rules, no unintended economy/progression/simulation changes, actual feedback, efficient repetition, supported input/scaling/motion/audio, world/material coherence and affected return/persistence. |
| Contrast qualification | Ordinary/qualifying-large text and meaningful non-text cues retain their applicable thresholds and exceptions, compared without rounding. Dark hue alone is not a failure. |
| Evidence and claims | Checked/failed/untested versus resolved/partial/unresolved; source/rendering, resize/zoom, screenshot/AT and operation/character distinctions; relative preference is not acceptance. |
| Portability and context | Five independent folders, unchanged discovery descriptions and conditional local reference; handbook depth remains optional, with no new always-loaded reference or framework requirement. |

## Measurements and actual checks

| Context measure | Before | After |
| --- | ---: | ---: |
| Five entrypoint body words | 2,023 | 1,912 |
| Body characters | 15,731 | 15,748 |
| Discovery description characters | 635 | 635 |
| Existing conditional interaction-reference words | 492 | 492 |
| New always-loaded references | 0 | 0 |

Entrypoint words decrease while character count remains approximately unchanged;
neither measurement is a tokenizer result. All five source folders and five
isolated folder copies pass the bundled skill validator; their local reference
resolves within the copied folder. The existing 12 checker tests and nine state
tests pass. All 166 protected example, benchmark, tool, test and CI files remain
byte-identical; the conditional interaction reference is unchanged.

Repository checks can be reproduced with:

```text
python tools/check.py
python -m unittest discover -s tests -v
node --test tests/specimen-model.test.cjs tests/field-notes.test.js
```

The accompanying [machine record](critical-guidance-implementation-2026-11-08.json)
records before/after entrypoint words and characters, unchanged descriptions,
isolated-folder validation, local reference resolution, authoring checks and
protected-file accounting. Whitespace words and characters are context-size
proxies, not model tokens or billing measurements.

The repository checker validates links, metadata, revisions and declared palette
contracts. Existing checker/state tests exercise unchanged contracts. They do
not demonstrate improved generations or validate the new illustrative JSX as a
working browser fixture. No example, historical benchmark, existing runtime,
test, workflow configuration or dependency is changed.

Native rendering/input/AT, consumer-product adoption, preference and billing
remain unverified for these instruction changes. Observable output acceptance
criteria in #27–#33 must not be checked off merely because their guidance is now
present. The next comparison remains explicitly unstarted and held for separate
authorization. No private comparison data, artifacts or participant details are
added by this contribution.
