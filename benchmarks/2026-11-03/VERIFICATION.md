# Performed verification

Date: 2026-11-03. Primary reviewer: implementation operator, conditions known. Browser: ChatGPT in-app Chromium browser on Windows. CSS viewport overrides: 1280×900 and 390×844; these are not physical devices or actual browser zoom. Original outputs were frozen before review. See [QA plan](QA-PLAN.md), [browser observations](browser-observations.json) and [findings](RESULTS.md).

## Rendered coverage

- All six original candidates, all three initial directions, both target widths: inspected and captured; assets loaded; no document-wide horizontal overflow in these states. See three wide contact sheets and six phone sheets in `captures/`. Internal scrolling and below-fold actions remain visible in the captures; absence of overflow is not usability proof.
- Both Field Notes: selection, two independent keeps/removals, populated and empty book; empty note error focuses the actual textarea; saved Cyrillic/markup-like text remains text; empty edit preserves saved note and draft; direction switching retains work; reload clears it.
- Both Dispatch: missing and original-address errors without mutation; corrected release to 18a, actual handover record, turntable collection/undo, blocked radio with reason, truthful counts and direction retention. Last-record undo reproduced separately: Silicon loses the work surface; both lose useful actual focus.
- Both Mosslight: make/craft, journal interruption, direction retention, hang/lit painting, disabled duplicate actions, reset and insufficient-resource fixture. Exact 8/3 → 2/1 cost contract retained. Anti modal journal was rechecked using its real close control after an invalid test path.
- Computed CSS inspected for the confirmed Silicon folio contrast failure and its revision. Ratios use opaque resolved sRGB pairs. This does not measure all overlays, boundaries, focus indicators or all text.
- Root-assisted Dispatch revision: last-record lamp undo at both widths; actual corrected-address input focused, visible task restored; one actual Tab reaches release on phone. Mosslight revision: C initial/error/complete foregrounds, B phone work ordering, make/hang/reset and real reset focus.

## Source checks

All six generated self-checks passed when invoked with the working directory expected by their scripts. These are source/model/minimal-DOM checks, not browser evidence. Packaged invocations initially failed for r02/r05/r06 because their checks compare assets against an input directory not included beside the published output. r04 instead expects the output as its working directory. Diagnostics and corrected invocations are retained in [source-checks.json](source-checks.json); runtime pages themselves have all their assets. Assertion counts are not comparative quality scores.

Publication checks passed locally: repository link/metadata/source/palette checker, 12 checker unit tests, 9 existing specimen state tests, and syntax checks for all 33 benchmark JS/CJS files. The fragment checker now recognizes literal IDs in directly loaded local JS templates, covered by positive and negative tests; it does not establish that rendering executes. A parallel checker/test invocation encountered temporary test files; the checker passed when rerun sequentially, matching CI ordering. They do not certify visual quality or access. All original output file hashes are checked against the retained generation workspaces in [run-results.json](run-results.json).

## Evidence cautions

- Earlier r06 observations named `hung`, `reset` and `crafted-direction-b` while a modal blocked the page describe an invalid operator path; corrected observations have `real-close-path` / `journal-close-native-control` labels. Do not infer an Anti progression failure from the former.
- Earlier revision-r05 `theme-c-actual-colors` / `initial-c-wide` observations captured an unsuccessful intermediate repair. The final explicit ancestor color was remeasured and captured afterward.
- Some screenshots returned by the browser's AX screenshot helper were stale after resize/state mutation. Final initial-state captures use the tab screenshot API and are checked against actual DOM state. Reported findings use reproduced behavior/computed values, not an isolated stale frame.
- Contact sheets resize frames equally and add labels; candidate images are not retouched. Individual JPEGs are exported at quality 88 from screenshots. Unrecompressed browser screenshots are retained locally outside the publication set; the screenshot API returned JPEG bytes in the staging files. Contact sheets and finding/repair captures are published; individual initial-state captures remain in the local lab. This processing is the same for both conditions.

## Untested

Full keyboard sequences, screen readers, real browser zoom/text enlargement, motion preferences, all intermediate widths/states, physical touch, controller/native runtime, user comprehension, preference, recall and repeated-use attachment. No whole-product WCAG conformance or benchmark superiority claim is made.
