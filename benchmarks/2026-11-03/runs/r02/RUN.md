# Dispatch prototype

Open `index.html` from an ordinary static HTTP server. No build, dependencies, network requests, backend, or persistence. All runtime files and assets are relative to this folder.

## Three retained directions

- **A, Split bench** (`?direction=a`), recommended. A vertical list keeps the other work orders beside the selected repair record. The address note and action share a compact working column. It supports repeated handovers with clear context; the drawing is deliberately smaller.
- **B, Work sheet** (`?direction=b`). A horizontal object tray leads to a large illustrated sheet. The object is more prominent and the selected order feels self-contained; switching between several jobs takes more visual scanning.
- **C, Register** (`?direction=c`). A comparison register puts the stage and next decision of all three objects first. The selected order opens below, with repair evidence beside the action on wide screens. It supports scanning the whole bench but uses more vertical space before the decision.

All directions share the same state, records, words, drawings, and actions. Switching a direction updates the URL without reinitializing the visit. Bench selection, correction, errors, notes, completed records, and the selected record survive view changes. Reset and reload initialize the selected fixture again.

QA fixture query: `?fixture=initial|secondary|error|complete`, combinable with each direction. The fixture selector is in the explicitly labelled demo wrapper. Secondary opens genuinely empty handovers. Complete opens two derived handover records and explicitly leaves the radio waiting.

## Design decisions

Reading: an operator's handover tool in a workshop-record language. ENERGY 2 / RHYTHM 2 / MOTION 1.

- Warm paper and dark green ink connect the repair record with the supplied object drawings; rust marks the decisive action and repair blockers.
- Georgia gives object names the character of a printed workshop record; Arial keeps controls and small labels economical and legible without downloaded fonts.
- Work-order numbers, ruled dividers, and receipt fields establish a record grammar instead of decorative dashboard metrics.
- Flat panels separate objects and receipts; no glow, background patterns, glass, or floating card system is used.
- Roomier desktop spacing supports comparison; narrow layouts use smaller spacing, stacked actions, and wrapping work-order navigation. Intermediate layouts reduce illustration width and collapse the register's action columns.
- The supplied drawings identify each repaired object. They are not new artwork and remain unchanged.
- A fixed light paper theme keeps drawings and record fields consistent with physical workshop notes. No theme toggle is shipped.
- Motion is limited to pressed feedback and hover states; no looping animation or delayed entrance.

## Actual checks

Commands run from this case workspace:

- `node --check output/app.js`: passed.
- `node --check output/state.js`: passed.
- `node output/check.cjs`: 153 assertions passed. This executes the real application scripts in a Node VM with a minimal document/event adapter. It does not emulate layout, accessibility APIs, or browser input behavior.
- Source search for external URLs, file paths, storage APIs, fetch calls, and em dash text in runtime HTML/JS/CSS: no matches.
- SHA-256 comparisons of the three copied SVGs: unchanged. Byte comparison of `fixture.json`: unchanged.
- Runtime HTML/CSS/JS including supplied state model: approximately 38 KB, excluding fixed assets and the verification script.

Event-simulation evidence:

- Rendered all 12 direction/fixture combinations.
- Release with no address: useful error, 3 open / 0 handovers.
- Original address: correction error, counts unchanged.
- Corrected address: only lamp cleared, 2 open / 1 handover, receipt names 18a High Street.
- Inspect completed lamp record: receipt and undo available; undo restores address stage and corrected choice, then handovers become empty again.
- Turntable: separate drawing and repair note; collection produces Alex's receipt.
- Both ready jobs cleared: 1 open / 2 handovers and radio waiting statement.
- Radio: disabled release and explicit replacement-switch/final-test reason; supplied state model also rejects release.
- Job, direction, and bench/handover switching retain correction and notes.
- Notes containing HTML-like input are escaped in editable fields and receipts.
- Escape closes an inspected record, then returns to the retained bench selection.
- Reset returns the initial fixture to the lamp and 3 / 0 counts.

## Delivery gate evidence and limits

- **PASS, source and state:** native controls, visible labels, focus styling, real action handlers, empty and error states, explicit fictional/visit-only wording, no invented testimonials or metrics, supplied facts retained, all required adapters present.
- **PASS, purpose and liveliness source review:** the three dials and the reasons for color, composition, typography, spacing, record panels, illustrations, and fixed theme are recorded above. All three structural directions are retained.
- **PASS, calculated text contrast:** 13 used color pairs passed 4.5:1, with results printed by `check.cjs`; tested ratios range from 4.81:1 to 11.23:1.
- **UNTESTED, browser gate:** no browser, screenshots, Playwright, CDP, or computer automation was used. Real visual layout at 1280×900 and 390×844, intermediate-width behavior, lower sections, focus order, native radio/textarea interactions, 200% zoom, and browser console behavior require operator inspection. No visual or click-through pass is claimed.
- **Not measured:** Lighthouse, Core Web Vitals, and field performance. Loading text exists in the static shell; records initialize synchronously from local data, so there is no artificial delayed-loading workflow.

`check.cjs` is an optional local verification artifact, not a browser dependency. No screenshots or rejected generated artifacts were produced.
