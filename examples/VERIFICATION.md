# Specimen verification

Checked on **2 November 2026**. Scope: the redesigned fictional HTML/CSS/JavaScript prototypes and their declared palette data. This record separates technical observations from the [character review](REVIEW.md).

## Static and model checks

```sh
python tools/check.py
python -m unittest discover -s tests -v
node --check examples/specimen.js
node --test tests/specimen-model.test.cjs
```

Local results on Windows, Python 3.14.7 and Node.js 24.19.0:

- Repository check passed: local Markdown destinations, required skill metadata, source revision records, declared sRGB pairs and specimen role values.
- **20 declared contrast pairs** passed. The lowest declared ratio was **3.52:1**, for a boundary role with a 3:1 threshold. All declared text pairs met their 4.5:1 thresholds.
- **Nine checker tests** and **seven specimen model tests** passed. The latter cover address validation, independent jobs, blocked/duplicate completion, undo, resource consumption, crafting preconditions and hanging without extra consumption.
- The interaction script passed Node's syntax check. The gallery requires no installed runtime dependencies.

Palette checks cover declared opaque pairs and the inline semantic roles. They do not inspect every raw CSS color, image background, translucent layer, text size or rendered state. Skill metadata checks do not establish skill effectiveness.

## Browser rendering

Browser: Codex in-app Chromium on Windows. Checked CSS viewports: **1280 × 720**, **390 × 844**, **320 × 800** and **768 × 900**. These are emulated sizes, not physical-device coverage.

- All three examples were visually inspected at wide and narrow sizes. The intermediate 768px layout was also inspected.
- DOM page geometry showed no horizontal overflow in those checks. At 768px an oversized Field Notes heading exceeded its story column despite fitting the page; its fluid size was corrected and the column was rechecked.
- Narrow job tags, long dispatch headings, image crops, game resource quantities and the bridge hook remained visible. Mosslight's title was reduced fluidly at the smallest width to leave room beside reset.
- The placed lantern and light use the painting's coordinate system and matching crop. The lit state was inspected at wide and phone widths after its transition settled.
- Service labels were increased to a 10px minimum. Primary prose is larger; actual text enlargement and reader comfort remain separate checks.
- Three unaltered wide viewport screenshots are saved in [previews](README.md#preview). They show a portion of each scrollable page, not a full-page capture. No browser warning/error entries were observed in the local gallery log during the checked session.

The temporary viewport override was reset after inspection.

## Interactions performed in the browser

### Field Notes

- Changed the observation using the route; the image mark and reading panel synchronized.
- Kept all three observations with Enter and saw the distinct completion message. Removed one and observed the count return to two.
- Submitted an empty margin note, saw its inline error and focus move to the textarea. Submitted Cyrillic text and saw that exact text in the saved margin, with the draft retained and invalid state cleared.
- Switched examples and returned: the selected observation and kept count remained.

### Dispatch

- Submitted without an address, then with the original address. Both produced the relevant inline error and left the open count unchanged.
- Released job 017 using the corrected address: open jobs changed from three to two; the job, headline, route and receipt changed; focus moved to Undo.
- Used Undo: the count returned to three and the corrected radio selection remained.
- Selected job 018 and marked collection: its receipt appeared and the count changed independently. Reset restored the three fixtures.
- Selected job 019: release was disabled, its missing-part reason was visible, the checked seal was hidden and its bench stage was not marked complete.

### Mosslight

- Enter on Make changed inventory from 8/3 to 2/1 and focused Hang.
- Enter on Hang placed the lantern, lit the stones, updated the world description and journal, and focused Begin again. Inventory stayed 2/1.
- Begin again restored the unlit phase and 8/3 inventory, hid completion and focused Make.
- The two-step craft/hang interaction was also exercised at phone width.

These are bounded pointer/keyboard and local DOM-state checks. They are not screen-reader announcement tests or exhaustive tab-order coverage. No real shipment, collection, user note storage or game save occurs.

## Not performed

- Audience research, recall tests, attachment measures or real-product before/after task outcomes.
- Screen-reader trials, physical-device/cross-browser coverage, 200% text enlargement or 400% browser zoom.
- Runtime reduced-motion emulation: the CSS disables transitions for that preference, but only its source was checked.
- Controller navigation, a real game renderer, safe areas, UI scaling, persistence or repeatable economy testing.

See the [briefs](README.md) for product-specific tradeoffs and [art provenance](assets/PROVENANCE.md) for the fictional assets.
