# Specimen verification

Checked on **2 November 2026**. Scope: the initial fictional HTML specimens and declared palette data. This is not product usability or game-runtime testing.

## Static verification

Run `python tools/check.py` from the repository root to validate repository-owned Markdown destinations, required skill metadata, source revision records, declared sRGB contrast pairs and matching specimen CSS role values.

The palette check measures declared opaque color pairs. It does not render text, evaluate every state/background combination, check font rasterization or certify accessibility. The skill check validates packaging metadata, not agent behavior.

Initial local result: the repository check passed, including **18 declared contrast pairs**; the lowest declared ratio was **3.28:1**, for a boundary role with a 3:1 threshold. All declared text pairs met their 4.5:1 thresholds. Nine checker unit tests passed on Python 3.14.7 on Windows. All five skill folders also passed the skill-creator quick validator; its PyYAML dependency was used outside this repository.

## Rendered and interaction verification

Browser: the Codex in-app Chromium surface on Windows, with CSS viewport checks at 1280 × 720, 320 × 800 and 768 × 900. These are emulated dimensions, not physical-device coverage.

- Wide and narrow screenshots were inspected for title wrapping, section order, record stacking and game-panel composition. The 768-width check established geometry only; the available capture did not show that entire viewport reliably.
- DOM geometry showed no page-wide horizontal overflow at 320, 768 or the normal 1280-width view. Initial narrow inspection found a resource quantity wrapping across lines; it was changed to a non-wrapping quantity column and the 320-width DOM was rechecked after reload.
- Enter opened the essay excerpt and the first application's case disclosure. The resulting text was visible in the browser accessibility state.
- Enter activated the local craft: timber changed from 8 to 2 and resin from 3 to 1; the craft control became disabled with an adjacent missing-resource explanation. Focus moved to Reset demo.
- Enter on Reset restored the resource fixture and the craft control, and returned focus to that control. These are local DOM-state checks, not a game simulation or a screen-reader announcement test.

This was a bounded keyboard/disclosure check, not exhaustive tab-order or assistive-technology verification. The browser viewport override was reset after inspection.

## Outside this initial specimen's scope

- Real products, before/after task outcomes and user research.
- Screen-reader testing, real 200% text enlargement or 400% browser zoom unless explicitly added to the performed-check record.
- Game-runtime playfield contrast, safe areas, controller navigation, UI scaling and persistence.
- Cross-browser or real-device coverage and behavioral trials of the five skills.
