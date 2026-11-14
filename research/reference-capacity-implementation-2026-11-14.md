# Reference and capacity implementation — 14 November 2026

Implements the guidance in [#35](https://github.com/drevendev/Silicon-Design/issues/35)
and incorporates the closely related density/capacity work in
[#31](https://github.com/drevendev/Silicon-Design/issues/31) and
[#32](https://github.com/drevendev/Silicon-Design/issues/32).
Base: `75b7ba934f90b8655b8bfe047e6ac3bb1a80a7ed`; all 215 copied source files were
verified against their pinned Git blob hashes before editing.

## Implemented decisions

| Need | Implementation |
| --- | --- |
| Proactive reference inspection | Game, interface and direction entrypoints find and visually inspect comparable task/category or genre screens before composing, without a research request. Provenance, applicable relationships, reuse and unavailable evidence are explicit. |
| Reading model | Task, fixed/growing count, recognition/comparison and sorting needs decide grid/rows. A cheap same-content sketch checks a useful existing model before replacement; no multiple-finished-candidate requirement. |
| Capacity before styling | Subtract chrome/status from usable width/height, fit small fixed sets intended together at base size and verify actual geometry/input. Shrinking, hiding, clipping and unnecessary pagination do not satisfy the target. |
| #31 density | Component width replaces an implicit row preference; actions stay with objects and quantities/costs/units retain hierarchy and usable text/targets. Narrow/enlarged-text scrolling is deliberate, not a base-set workaround. |
| #32 current source/growth | Current revision, accepted changes and supplied capacity/growth remain distinct from historical evidence and speculation. Template context records the chosen reading model and available space rather than loading an entire repository. |
| Lean packaging | Five existing folders remain self-contained with unchanged discovery descriptions. No new mandatory local reference or dependency. Detailed technique is optional handbook depth. |

See [references and capacity](../docs/references-and-capacity.md), revised
workflow/product/layout guidance, DESIGN template and review checklist. The
numerical case is original fictional teaching material; no third-party image,
private product source, experiment ranking or participant record is published.

## Preserved requirement audit

This is a semantic source walkthrough, not tests that match selected phrases.

| Existing invariant | Retained location and meaning |
| --- | --- |
| Scope and truth | Current source, accepted plans versus speculation, fixed-copy/DOM constraints, no invented fields/workflows/assets/testimonials or product outcomes. |
| Palette and actual glyphs | Coherent extension or authorized remap; actual SVG/currentColor/mask/filter backgrounds and crops; unreadable glyphs remain unresolved despite passing swatches. Applicable text/non-text thresholds remain in the unchanged system guidance. |
| Shared product | Authoritative roles/components/states across screens with task-based exceptions; no new kit for a local correction. |
| Simplification | Redundant framing and familiar remove/search representations can change within scope while names/context/targets/safeguards and useful empty/blocked explanations remain. |
| Game contract | Exact resources/costs/effects, zero/unknown/not-applicable, visible/accessibility knowledge boundaries, no presentation-driven economy/progression/simulation changes, truthful feedback and efficient repeated input. |
| Interaction | Actual labels/icons/padding activation, supported input, connected focus/context after close/removal/recovery, sticky/overflow review and promised persistence. The conditional interaction reference is byte-identical. |
| Data and evidence | Units, source fidelity and contradictions; checked/failed/untested versus resolution, source/render/input/zoom/AT distinctions and operation versus character. Relative preference does not establish acceptance. |

## Checks and limits

The accompanying [machine record](reference-capacity-implementation-2026-11-14.json)
contains before/after context size, source/isolated-folder validation, original
contract tests, protected-file accounting and fictional-browser results. Counts
are whitespace words and Unicode characters, not model tokens or billed cost.

| Entrypoint context | Before | After |
| --- | ---: | ---: |
| Five body word counts, summed | 1,912 | 1,837 |
| Body Unicode characters | 15,743 | 15,731 |
| Discovery-description characters | 635 | 635 |
| New mandatory references | 0 | 0 |

All five source folders and five isolated folder copies pass the bundled
validator using an already available PyYAML dependency. Local packaged links
resolve within their copied folders. The repository checker, 12 checker tests,
nine existing state tests and 10 new browser scenarios pass. All 138 existing
benchmark/tool/test/CI files are byte-identical; historical examples and their
captures remain unchanged, with only their index/verification text extended.

The [fixture](../examples/capacity.html) has nine real local offer controls at
1080×800 in EN/RU, without page/main scrolling; names/prices use 16px text and
item/purchase/input targets are at least 44px high in the checked base state.
Rendered cards occupy 340px-wide slots, approximately 197px high; the last
card ends at y=788 within the 800px viewport. A separate 96-item task uses a
searchable/sortable scrolling list. These demonstrate different content tasks,
not competing generated candidates or a preference trial.

The real Chromium test exercises purchase amounts/stock, invalid drafts,
exhaustion, no funds, exact detail, keyboard activation/focus return, retained
catalog drafts, no-results recovery, 390×844 reflow and 200% text enlargement.
The latter is not native browser zoom. [Fixture verification](../examples/VERIFICATION.md)
records commands, retained captures and meaningful untested conditions.

No comparative experiment, fresh model exercise or autonomous-reference-retrieval
forward test was run. This authoring change and its fictional runtime evidence
do not prove better future generations, private-game adoption, human preference,
physical-device/AT operation, compliance or cost parity. #35 and the remaining
product-output criteria in #31/#32 must not be closed as observed audience/model
success merely because their guidance now exists.
