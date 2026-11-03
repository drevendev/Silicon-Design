# Field Notes

Open `index.html` on an ordinary static server. No build, dependencies, backend or persistence. The initial fixture is the default. Use `?direction=a|b|c&fixture=initial|secondary|error|complete`; the unobtrusive demo wrapper switches direction while preserving this visit. A reload initializes the selected fixture again.

## Three retained directions

- **A / Reading plate (recommended):** photograph and one selected observation share a spread; a numbered horizontal index changes the reading panel. A separate lower margin leads into the field book. Balanced context and readable operation, at the cost of seeing one observation at a time. ENERGY 2 / RHYTHM 3 / MOTION 1.
- **B / Observation index:** all three complete observations form a text-first vertical index beside a supporting crop. Selecting an entry changes its active state and the photo crop; each entry has its own keep operation. Best for reading and comparing all the material, but longer on a phone. ENERGY 1 / RHYTHM 2 / MOTION 1.
- **C / Looking glass:** a large photograph carries three spatial selection points; a dark side reading panel responds to the chosen point. Strongest emphasis on looking at the place, with more visual orientation required. On narrow screens the photograph precedes the reader. ENERGY 2 / RHYTHM 3 / MOTION 1.

All directions contain the same authored observations, photograph, keeping actions and margin. The secondary field book renders actual kept entries, independent removal, a genuine empty state and the same editable note. The fixtures initialize state; every later action uses the supplied state contract.

## Decisions

- Blue, plaster and rust come from the supplied photograph. Rust identifies keeping and selected attention; solid photo labels protect legibility.
- Georgia gives the observations a book-like reading voice. Arial separates short operational labels from the authored prose, without a font request.
- Large photograph/text relationships replace generic feature cards. In the field book, equal entries have an honest repeated structure because each is a kept observation.
- Wide gaps separate looking, reading and writing. Narrow layouts use smaller spacing, stacked content and 44px product controls.
- The light paper surface evokes a field record; C uses a fixed dark viewing surround to keep attention on the photograph. No additional theme feature is introduced.
- No generated assets, decorative icons, gradients, glass, animation loops or invented evidence. Motion is limited to immediate control feedback.

## Actual checks

- `node --check output/app.js` and `node --check output/state.js` passed.
- `node output/check.cjs` passed **15 scenarios**: all 12 direction/fixture combinations, plus one full action flow starting from each direction. The small Node DOM harness executes the actual application script. It checked fixture counts/book state/error state, unique test adapters, all selections, independent/repeated keeps, removals to empty, Cyrillic and markup-like note text, empty-save recovery with saved-note preservation and focus request, draft preservation through direction/book changes, actual book entries, and the 300-character cap. This is a logic smoke check, not browser automation.
- Direct assertions against the supplied state module checked its initial state, independent toggles, invalid index rejection, note trimming, empty-save preservation and 300-character truncation.
- SHA-256 comparisons matched the original and copied photograph, fixture.json and state.js byte-for-byte.
- WCAG formula calculations: ink/paper 9.976:1; muted/paper 5.420:1; rust/paper 5.363:1; light button text/rust 5.945:1; dark-view muted text/background 8.112:1; final dark accent/background 5.330:1; final dark button 6.080:1; input boundary/light field 4.050:1. Initially insufficient dark colors were corrected before delivery.
- The final Node source check passed exact observation content against fixture.json, existing local HTML references and balanced CSS braces.

## Delivery gate, bounded by available checks

- PASS, source review: exact supplied content; supplied direction applied; no fabricated people, metrics, testimonials or claims; no agent-authored em dashes in UI copy.
- PASS, source review: native named controls, associated visible textarea label, visible focus styles, keyboard handlers, text error feedback, safe text rendering, pointer affordances and live keep status.
- PASS, source review: local relative references, sized image with high fetch priority, deferred local scripts, no external resources, no storage APIs, no background fetch and therefore no artificial loading delay.
- PASS, executed Node evidence: fixture initialization and interaction scenarios listed above; real keep count/entries/empty state; note success and recovery behavior; shared visit state.
- PASS, written purpose review: palette, typography, hierarchy, spacing, fixed surface choices and the three reading structures have reasons above. Every product control has an implementation.
- UNTESTED: browser rendering, browser console, real click-through/native form submission, actual keyboard focus, screen readers, mobile keyboard, 200% zoom, horizontal overflow and visual appearance at 1280x900, 390x844 or intermediate widths. Responsive rules exist at 720px and 1050px, but no layout pass or screenshot is claimed. No browser tools were permitted. No Lighthouse or field performance numbers were measured.

No rejected visual artifact was produced or discarded. All three implemented directions remain available.
