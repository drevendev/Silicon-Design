# Specimen verification — 3 November 2026

New original decision examples have a separate [17 November verification record](decisions/VERIFICATION.md) and source hashes. They do not alter historical trial artifacts or the checks below.

## Capacity fixture — 14 November 2026

This section concerns only the new original `capacity.html`; the earlier
specimens and historical captures below remain unchanged. No comparative
generation/preference run or fresh model exercise was started.

The optional native-browser check uses an existing Playwright installation:

```sh
node tests/capacity.browser.mjs
```

`SILICON_BROWSER_PACKAGE` may identify an already available Playwright package;
`PLAYWRIGHT_BROWSERS_PATH` may identify its installed browsers.
`SILICON_BROWSER_OUTPUT` selects a local evidence directory; otherwise the check
uses a new OS temporary directory. No install, server or external requests are
needed: exact local HTML bytes are fulfilled at a synthetic secure origin.

Chromium 151.0.7922.34, DPR1; 10/10 scenario checks pass, no page errors. EN/RU
each cover nine fully visible usable offers at 1080×800 without page/main
scrolling; truthful purchase/gold/stock updates, invalid/excess/empty drafts,
stock exhaustion and no funds; exact item/rules disclosure with keyboard
activation and focus return. The separate 96-item catalog exercises real search,
price sorting, retained drafts, no-results and purchase. All values/state are
fictional and reset on reload; no private game or save is involved.

390×844 and 200% text enlargement retain all nine offers and reachable purchase
paths with deliberate vertical scrolling, without horizontal loss in the
checked cases. Text enlargement is not native browser zoom. The base-state
necessary text is 16px, and measured input/item/action targets are at least
44px high; those observations do not establish accessibility compliance.

Retained original captures:

- [RU base](previews/capacity-ru-base.png)
- [RU narrow, last offer after purchase](previews/capacity-ru-narrow.png)
- [EN large catalog](previews/capacity-en-catalog.png)

[Source, context and check record](../research/reference-capacity-implementation-2026-11-14.json).
Autonomous model retrieval/design quality, audience preference, native zoom,
physical devices, controller, assistive technology and complete contrast/state
coverage remain untested. The existing historical checks are reported below.

Scope: three same-brief Field Notes directions and revised Dispatch/Mosslight browser prototypes. Windows, in-app Chromium browser, Python 3.14.7, Node.js 24.19.0. This is implementation verification, not a usability study or accessibility certification.

## Offline checks

```sh
python tools/check.py
python -m unittest discover -s tests -v
node --check examples/specimen.js
node --check examples/field-notes-data.js
node --check examples/field-notes-directions.js
node --test tests/specimen-model.test.cjs tests/field-notes.test.js
```

Repository contracts pass: local Markdown/HTML links, five skill names/descriptions/frontmatter, pinned sources and 20 declared palette pairs. Lowest declared ratio: 3.52:1 for a boundary with a 3:1 threshold; declared text pairs pass 4.5:1. Nine checker tests and nine behavior tests pass (seven workshop/game, two field-book).

Additional opaque text/background pairs calculated with the same luminance function: ink/paper 12.770, muted/paper 6.009, red/paper 6.084, contact kept accent/ink 9.408, contact supporting text/ink 8.989, raised/Dispatch ink 14.213, bench scope/Dispatch ink 10.256. These cover named combinations, not every rendered pixel or the complete interface.

Host skill-creator quick_validate.py could not run because its Python environment lacks PyYAML. The repository's own independent skill-metadata checks passed for all five skills. No package was installed merely for that duplicate check.

## Actual browser work

| Scope | Checked |
| --- | --- |
| Field Notes, wide | Atlas, contact sheet and reading room rendered at 1280×900; one photo, same three observation texts and capabilities. Actual screenshot bytes are 1265×889, as returned by the browser capture. |
| Field Notes, narrow | 390×844 atlas/selected observation/book, contact/reading reflow; no page-wide horizontal overflow in observed states. Diagram selection scrolls to the observation on a phone. |
| Field book | Fresh empty view; select chair, keep, populated view; empty-note error/focus; Cyrillic and literal markup-like note; save/edit; saved note/draft retained across direction/book switching. Reload clears the visit. |
| Dispatch, wide/narrow | 1280×720 and 390×844: work-order rows, actual address values/actions, empty/populated handovers. Missing/original address rejected, corrected 18a clears only lamp; collection clears turntable; open record/undo restores lamp and selected correction; waiting radio lacks checked seal and remains blocked. Reset restores fixtures. |
| Mosslight, wide/narrow | 1280×720 and 390×844: painted base/completed images loaded; make 8/3 → 2/1; open/close journal while crafted; hang leaves 2/1; completed lantern aligns with the hook. Gallery switching retains phase. Reset restores 8/3 and making action. |
| Repetition | Duplicate craft/finish and blocked transitions covered by model tests; in browser, completed action is unavailable. No extra celebration or wait on journal opening. |
| Inputs | Pointer interactions; focused textarea on error, corrected radio after undo, hanging action after make. A limited keyboard pass is recorded below; no full keyboard or screen-reader audit. |

Limited keyboard pass: at 390×844, selecting an atlas mark focuses/reveals the article; Tab advances to its keep control. Space activated a reading-room keep, which appeared in the field book; reloading that populated book returned it to zero. This does not constitute a complete keyboard audit.

The complete DOM/copy order and lower book/journal surfaces were inspected. Pixel-matched reference reconstruction was not the task. Screenshots are evidence of those states, not a whole-artifact preference result.

## Untested and limits

Actual browser zoom/text-only enlargement, OS high contrast, live reduced-motion media emulation, screen readers, native game runtime/controller/touch hardware, EN/RU full-interface localization and real-audience response remain untested in this revision. Reduced-motion CSS disables the image transition; that is source inspection, not an emulated preference test. CSS viewport resizing is not physical-device testing.

There is no backend, saved account, persistent game, shipping or printing integration. Fictional content is explicitly labelled. The completed painting has slight generated brush-detail drift. No matched Anti Slop baseline or blinded preference trial has run; see [protocol](../research/benchmark.md).

[State sheet](STATE-SHEET.md) · [Located visual findings](REVIEW.md).

## Blind-test runner — 14 November 2026

This is runner verification, not new gallery/design acceptance. The bundled blind-test template was rendered in Chromium151.0.7922.34 at1280x900 and390x844. Model-facing captures masked every study image while preserving its box; wide/narrow wrapper control placement was inspected. Left/Tie/Right remains a single ordered row inside both viewports. Selection keeps the task visible and unsubmitted; its pending choice and a subsequently edited comment survive reload; only Next commits. A set vote cannot be confirmed before all member screens display on both sides; exposure history is exported and is not evidence of human attention. Synthetic test exports are qa:true. Original completed protocol1 votes were validated and retained unchanged; no new human result is claimed for protocol2.

Repository checks and13 Python unit tests pass, including a different-product synthetic corpus build, seeded24-task balance, corpus verification and foreign-answer rejection. Skill quick validation passes using a task-local PyYAML installation; this is not a runtime dependency. Full screen-reader/device testing and a human retest of the corrected runner remain unperformed. No private corpus, raw human votes or purchased image bytes are committed.

### PR38 pre-merge review

Reviewed again against master701fd26. Found and repaired an inline closing-script roundtrip error, Python/JavaScript numeric hash differences, invalid imported cursor/preferences/draft structures, missing set exposure validation, and confirmation before current captures loaded. New hashes use typed finite binary64 encoding and preserve legacy verification; changed runners cannot silently import a corpus from another runner revision. Startup controls wait for integrity verification. Screenshot failure leaves confirmation disabled; callbacks from older paints cannot credit the current pair.

Validation now passes15 unit tests plus the optional offline Chromium integration check at1280x900 and390x844. It exercises post-choice comment/reload, explicit confirmation, cached-image set coverage, invalid-cursor import preserving existing answers, and broken captures blocking submission. The review's first browser assertion read a previous corpus's storage key; the fixture was corrected to read the active corpus and rerun successfully. No human votes were generated. Reproduce the original synthetic fixture with `python tests/prepare_blind_runner_fixture.py <temporary-output>`, set `BLIND_TEST_PLAYWRIGHT` to an installed Playwright module when it is not resolvable as a package, then run `node tests/blind_runner_browser.mjs <temporary-output>/good/Blind-Test.html <temporary-output>/broken/Blind-Test.html <report-directory>`. Playwright is a QA tool, not a viewer runtime dependency. Device/AT limits above remain.

## Release 2026.11.15.1 — fresh observations

Source revision: `ac944d4b7d2893d6442c858fad1c3d58edd3a7f5`. The [release matrix, source hashes and actual receipts](../research/release-2026-11-15.md) distinguish source/contracts, observed rendering/input, author craft judgment and owner acceptance. The earlier observations above are historical, not relabeled as this version’s tests.

Windows / Playwright 1.62.1 / Chromium 151.0.7922.34, DPR 1 and default 100% browser scale. New fictional examples were opened at 1280×900 and 390×900, plus 320×844 English/Russian populated, blocked and empty states; long names and full event status reflow without page-wide horizontal scrolling. At 390×844 CSS 200% text was **measured as a 32 px root font**, with deliberate vertical reflow. The first rule failed to override the base font and was corrected before this evidence. This is not native browser zoom.

Ten craft scenarios pass actual mouse and Enter/Space input, full text/icon/padding activation, anchored visible menu, both-axis sticky corner, retained search/filter/mode quantity, inspector/help/removal/Undo focus, exact 12,480 confirmation, stale-stock refusal without charge, source totals/denominator/stacking, glyph surfaces/states/bounds, and real download/disclosure. The original failing board and intentionally authored new baselines remain separate. Ported PR #24 cases were also inspected at 1280×844 and 390×844; the recovery/board narrow containment was corrected. Its historical exploration inspection remains explicitly 1280×720 plus a 390×844 iframe at 80%, distinct from fresh full-size viewports.

The whole-site runner was inspected at 1440×1000 and 390×844: independent real HTTP websites, nested routes and relative CSS/SVG/JSON, stable current pair/draft, Next-only commit, reload/resume, defect separation, valid import/export, rejected corrupt/foreign imports preserving answers/drafts/cursor, a separate two-pair corpus, early stopping and storage-denied export pass. Wide sites appear side by side; narrow sites stack at reading size. Screenshots and width controls are labeled separately from native browser zoom. Seven candidates with selected complete round robin have 21 ballots and zero set ballots; 126 requires explicit five-surfaces-plus-coherence configuration. The legacy runner and all ten existing capacity scenarios also pass. Synthetic answers are `qa:true`; no owner voting or new generations occurred.

Source/package checks pass after immutable repinning: 42 Python tests, 13 Node tests, 12 activation-corpus cases, handbook/isolated portable-folder/revision/palette checks and diff whitespace. CI includes the same source checks plus all four browser scripts. Activation validation proves the corpus contract, not autonomous native model activation.

Physical devices, native browser zoom, AT/forced colors, controller/touch hardware, learning, general generation improvement, cost and explicit owner acceptance remain unverified. The new examples are fictional corrections, not adopted Scriptorium or game redesigns. [Matched captures and receipts](craft/evidence/) contain no restricted assets, private screenshots, raw votes or private paths.

## Critical PR #50 follow-up

The [review findings and corrections](../research/pr50-critical-review-2026-11-15.md) identify later locale/viewport, export-validation and coverage gaps in the initially green version. [New scoped receipts](craft/evidence/pr50-review/) supersede the initial runner observations for current implementation behavior; initial source-bound receipts above remain historical. The additional actual browser suite covers schema-2 single surface and explicit multi-surface/coherence, real EN/RU entry pages, measured frame viewport/document language, URL-valued route-query export and useful malformed-startup handling. Final-head validation is recorded in the PR. No new human study, product adoption or owner acceptance is inferred.
