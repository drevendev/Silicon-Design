# Specimen verification — 3 November 2026

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
