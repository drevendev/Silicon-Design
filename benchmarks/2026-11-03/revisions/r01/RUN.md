> Historical baseline handoff copied with the source. For this operator-assisted revision and its actual rechecks, read REVISION.md. The revision is not another matched generation.

# Run handoff

Open `index.html` through an ordinary static HTTP server. No build, dependencies or external resources are required. Relative assets support a GitHub Pages subpath. All generated deliverables are here in `output/`.

Working directions: `?direction=a` (Bench ledger, recommended), `?direction=b` (Object desk), `?direction=c` (Work-order register). A balances the bench index, repair note and address action. B gives the drawing first attention and uses a horizontal shelf. C starts with a stage comparison table and follows with a compact selected slip. B takes more vertical travel; C gives less emphasis to the object. These are retained implementations, not screenshots or a preference-study result. The handover surface and receipts follow each direction's grammar. More direction/system detail is in DESIGN.md.

Fixtures: `?fixture=initial|secondary|error|complete`, combinable with any direction. The wrapper labels and selects the fixture. Reset and reload restore it. Direction changes update the URL without reloading; state remains in memory for this visit.

## Actual checks

- Node v24.19.0 syntax checks passed for app.js, model.js and the supplied state.js.
- `node output/check.cjs` passed 73 source/VM/model assertions. They covered all three direction initializations, missing and original address failures without clearing, corrected release/actual receipt, derived counts, interrupted address and note context, escaped note content, distinct collection, blocked radio, empty/populated handovers, record opening, undo, reset and every QA fixture. The VM uses a small document stub; it does not render or simulate browser input semantics.
- The first VM harness run failed because the stub lacked `window`. The harness alias was corrected; the full assertion suite then passed. This was a test-harness issue, not a reported browser pass.
- Byte-for-byte checks confirmed fixture.json, state.js and all three copied SVG assets match the supplied files. Local script/style references in index.html exist.
- Source rules include narrow layouts at 720px, an intermediate 1050px layout, visible keyboard focus and reduced-motion handling. These were inspected as source, not rendered.
- Palette math was run for seven common foreground/background pairs; ratios are listed below. This covers specified solid pairs, not every computed style, antialiasing or rendered state.

## Palette calculations

| Foreground / background | Ratio |
| --- | ---: |
| #263f3b / #fffef9 | 11.202:1 |
| #596b62 / #f7f5ed | 5.194:1 |
| #fffef9 / #264d40 | 9.376:1 |
| #78571d / #f4e8ca | 5.423:1 |
| #8d332a / #fbece5 | 6.907:1 |
| #635e4c / #eeece4 | 5.486:1 |
| #526055 / #e9e7dc | 5.352:1 |

## Untested and limitations

Browser inspection, screenshots, 1280×900 and 390×844 rendering, keyboard/touch behavior, zoom, screen readers, runtime CSS layout and HTTP/GitHub Pages serving were not exercised; no browser automation was available or used. No screenshots or visual test results are claimed. There was no network, installation, publishing or agent delegation. Operation is supported by source/VM/model evidence; appearance and emotional effects remain design hypotheses pending the separate operator's review.
