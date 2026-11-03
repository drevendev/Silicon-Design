# Mosslight

Open `index.html` on an ordinary static HTTP server. All runtime files and unchanged supplied assets are local to this folder. No build, network requests, dependencies or persistence are used.

## Working directions

| URL | Direction | Structure and tradeoff |
| --- | --- | --- |
| `?direction=a` | By the bridge, recommended | Landscape first, then a horizontal making bench with both stages together. The world receives the most space; the work sits lower in the page. |
| `?direction=b` | The maker's desk | Materials and actions occupy a left rail, with the title and painting to the right. On phones the bench precedes the painting. Resource decisions are immediate; the landscape is cropped more closely on wide screens. |
| `?direction=c` | Field book | A paper spread pairs the account of the place with an inset painting, followed by two sequential making entries. Easier to read as a record; less immersive than A. |

All three preserve task state when switched within the visit. Each supports `fixture=initial`, `secondary`, `error`, and `complete`. A fixture selector labels these as QA states in the demo footer. Reload initializes the selected fixture again. Reset always restores 8 timber, 3 resin and making focus.

## Design read and reasons

Reading this as a quiet making scene for a player at dusk, with painted woodland and worn workshop materials. ENERGY 1 / RHYTHM 2 / MOTION 1.

- Forest green and iron-dark surfaces belong to dusk; parchment makes the journal a distinct physical surface. Amber marks the available action and comes from the finished lantern.
- Georgia's bookish forms support the small, reflective story. Segoe UI keeps exact material costs and controls readable.
- The image establishes the inhabited place. A groups tasks below it, B puts the bench first, and C uses a spread and successive entries. No generic feature sections are present.
- Larger gaps separate place, work and evidence; compact gaps connect each cost to its action. Small corners suit cut wood and paper rather than floating pills.
- The only shadow lifts the field-book print and journal. No glow, glass, generated illustrations, icon library or ambient motion is used.
- The fixed dusk treatment serves the supplied scene. C's paper is a separate working direction, with its own checked text pairings.

## Actual checks

- `node --check output/app.js` and `node --check output/state.js`: passed.
- `node output/check.cjs`: passed. The included dependency-free DOM model exercised all three directions and all four fixtures, initial hang blocking, exact 6/2 crafting, duplicate craft blocking, journal open/close without resource use, crafted direction retention, hanging without extra cost, completion, duplicate actions, reset values and focus intent, and fixture reinitialization.
- The same check verifies every required test adapter, all static asset references, no runtime storage or network calls, no `innerHTML`, and no em dashes in authored HTML/CSS/JS.
- SHA-256 comparison in that check confirms the supplied paintings, fixture JSON and state model were copied unchanged.
- Computed normal-text contrast ratios for the nine principal text/background pairs: 12.08, 8.62, 9.48, 6.99, 7.44, 9.29, 5.45, 8.22 and 4.76 to 1. These pass 4.5:1. This is a palette check, not an accessibility conformance claim.
- Both supplied paintings were visually inspected as local files. No generated screenshot or browser automation was used.

## Delivery gate, source evidence

- PASS R-02/17/18/36/38: authored source has no em dashes, invented metrics, people, reviews or external claims. Fictional material and the visit-only boundary are visible.
- PASS R-23/37: supplied direction and supplied paintings only; product name is text. Direction read and dials are recorded above.
- PASS R-24/26: skip link targets the scene; each native control has a corresponding action. DOM-model checks exercise those actions.
- PASS R-27/28: unmade, insufficient, crafted and lit states are explicit; no data fetch, artificial loading delay or FAQ exists.
- PASS R-25, palette scope: the nine principal text pairings were computed. Actual rendered contrast and focus appearance remain untested.
- PASS R-32/39, source scope: native buttons, select and modal dialog, visible names, image alt, logical direction-specific DOM order, focus styling and reset focus. Native Escape behavior is delegated to dialog.
- PASS R-33/34/40, source scope: direct implementation, sized high-priority initial image, local deferred scripts, no extra theme toggle or reported performance scores.
- PASS Purpose-Gate: color, type, composition, spacing, print/journal elevation and supplied illustration purposes are recorded above; no generic decorative techniques need justification.
- PASS Liveliness and quality-lock source review: explicit dials, scene focal point, amber action accent, bookish voice and content-specific structure. Three working navigation/reading models share one state contract.

## Untested and limitations

Browser checks are **untested**, including 1280x900 and 390x844 rendering, intermediate widths, 200% zoom, real pointer/keyboard operation, native modal focus trapping and Escape, screen-reader announcements, image loading, and console errors in a browser. Source includes mobile and intermediate reflow rules, 44px controls, native semantics and reduced-motion handling, but these have not been visually verified. No performance metrics were measured. The Node DOM model checks application wiring and state only; it cannot validate browser layout or native behavior.
