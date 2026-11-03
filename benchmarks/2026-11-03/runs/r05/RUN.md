# Mosslight handoff

Open `index.html` on an ordinary static HTTP server. No build, package installation, external fonts, remote calls or backend are required. All references stay inside this output folder. For example: `index.html?direction=a&fixture=initial`.

## Three retained working directions

- **A — Overlook (recommended):** scene-first immersion, invitation over the workshop side of the painting, a low shared workbench, then an expandable paper journal. The hook and changed painting lead. Tradeoff: the workbench and lower journal require scrolling on narrow screens.
- **B — Workbench:** a vertical operation column to the left of a tall scene; resources and the two actions lead. The journal spans below. Narrow order is invitation, scene, workbench, journal. Tradeoff: the painting has a stronger horizontal crop at desktop.
- **C — Field folio:** chapter navigation, framed scene beside the invitation, then two making chapters and a journal on a pale paper surface. Tradeoff: less scene area in exchange for a stronger reading and accounting model.

All variants use the same content, asset pool and live state. The top direction switcher changes views without resetting pending making, resources or journal expansion. These are implemented alternatives; visual comparison and preference remain unverified. Additional design rationale and shared system are in `DESIGN.md`.

## Actual checks

- `node --check output/app.js` and `node --check output/state.js`: passed.
- `node output/check.cjs`: passed **197 source/model/DOM-adapter assertions**. Covers exact craft cost, no duplicate make, no pre-craft hang, zero-cost hang, completed painting selection, all three directions, all four fixtures, interruption while crafted, direction changes preserving crafted/resources/journal state, completion explanation, reset and its focus target, fresh initialization, resource ledger, required unique test adapters, IDs and relative file references. This is a small mocked DOM adapter, not browser automation.
- SHA-256 equality checks in that script: both supplied paintings, fixture.json and state.js are unchanged copies.
- CSS source: balanced blocks, narrow-layout rules, reduced-motion rule. No external asset URLs, app fetch calls, storage API or innerHTML injection.
- Nine solid CSS text/background pairs calculated from sRGB luminance. All exceed 4.5:1: workbench body **11.10**, supporting **7.27**, primary action **8.21**, disabled action **5.25**, journal body **9.99**, journal supporting **5.84**, folio supporting **5.04**, folio action **7.05**, prototype metadata **9.90**. Unrounded ratios were checked; shown values are rounded.

## Untested and limitations

No browser, screenshot, Playwright, CDP or computer automation was used. Rendered layouts at 1280×900 and 390×844, lower sections, actual pointer/keyboard behavior, browser focus visibility, zoom, screen readers, image-overlay contrast, image loading and crops remain untested. There are no screenshots or claims of visual/audience validation. A source-level narrow-scene height adjustment was made to provide more vertical separation between invitation and hook; its rendered result remains unverified.

This is fictional local teaching material. No native runtime, controller support or save system is claimed. A visit owns its state only; reload restarts the selected QA fixture, while Begin again restores 8 timber / 3 resin and focuses Make. No additional inventory, economy, notes feature or persistence was introduced.
