# Field Notes — implemented direction record

This is a fictional, buildless teaching prototype. Audience: someone with a few minutes to notice an ordinary place after closing. Intended emotional effect: slower attention, followed by a small personal record. This intention is a design hypothesis, not a research finding.

## Subject inventory

Supplied: one generated street photograph; blue shutter, worn plaster, doorway chair, water channel and plant; exact authored observations and prompts; three independent keeps; a visit-only margin note. The rituals are choosing a detail, keeping it and returning to the field book. Invented for this implementation: layout, ordinal typography, paper/ink roles, short supporting invitations and field-book composition. No research, location, testimonials or additional features are implied.

## Three retained working alternatives

- **A — Street & margin (recommended).** A large street photograph and its opening occupy one side; the current observation, keep action and three-stop list occupy the other. Reading moves from place to detail to personal record. The field book turns the same split into a photographic cover and a paper interior. Strongest connection between the place and the reader's choices; the tradeoff is that only one observation's full text is shown on the street at once.
- **B — Three small readings.** An editorial opening leads to three sequential strips. All exact observations and their keep actions are visible in reading order, each beside a crop of the same image. Selection is explicitly indicated in the strip index. The book uses a horizontal cover followed by collection and margin columns. Strongest continuous reading and comparison; longer page and repeated image crops are the cost.
- **C — Observation index.** A persistent index carries the opening and three choices; a separate image-and-reading canvas responds to selection. On narrow screens the index becomes a three-part horizontal selector. The book becomes a compact cover and ledger beside the margin. Strongest direct return to a known observation; the hierarchy gives less space to the initial invitation.

A is provisional recommendation for this brief, not a comparative superiority claim. All alternatives remain implemented through the wrapper and query parameters. No direction was discarded. A palette-only variation was rejected as insufficient exploration; differences here include content grouping, reading order, image weight and navigation placement.

## Small system

Georgia is the display and reading voice; Arial/Helvetica supplies operations and metadata, with system fallbacks supporting Cyrillic. Titles use an irregular editorial scale (roughly 32–88px); body reading is 17–20px, operation labels 12–14px, quiet metadata 9–12px. Decision controls have at least 44px height. A photograph supplies the blue action role, plaster paper surfaces, rust prompts and green/grey supporting ink. CSS custom properties are the token source.

The line is the recurring component: observation selectors, keep underlines, book-entry rules and margin edges. A kept state adds a check and explicit removal wording. Selection has weight and shape cues. Empty book explains how to populate it; saved notes retain their own ruled surface. No decorative icons require interpretation. Motion is a short text entrance only and respects reduced motion.

Invitation: “Keep what catches your attention.” Success: “Margin note saved for this visit.” Failure: “Write a margin note before saving.” Repeated keeps reverse cleanly, with true counts and genuine book removal.

## Behavior and input

All directions share one in-memory session. Selection, keeps, unsaved draft and saved note survive direction changes and opening/closing the book. The note editor is inside the field book. Saving trims surrounding whitespace and limits input to 300 characters. Empty submission focuses the editor and preserves any prior saved note. Notes enter the DOM via value/textContent. Every reload starts the requested QA fixture again. No storage, backend or network is used.

Responsive layouts are authored at wide, intermediate and narrow widths, including the supplied 1280×900 and 390×844 targets. Images are allowed to crop rather than distort; narrow content stacks in reading order. Standard buttons, a labelled textarea, visible focus outlines, skip navigation and polite live feedback are provided. Browser rendering, keyboard operation, screen-reader reading and actual text zoom remain untested.

## Palette checks

Measured opaque CSS pairs: A reading 11.14:1, supporting 5.69:1, prompt 5.70:1, action 8.97:1; B reading 9.73:1, prompt 6.59:1, action 7.64:1; C reading 10.30:1, prompt 5.90:1, action 8.66:1. These arithmetic checks do not cover image-overlay text or establish whole-product accessibility.

## Verification criteria and outstanding review

The representative slice is select → keep → open book → remove → empty collection → write/save note → failed empty save → direction change → return to street and book. Source and state checks cover this slice. An operator should render all three directions at the target sizes, inspect lower sections and complete fixtures, and exercise real keyboard focus, textarea editing and text enlargement. No visual capture or browser verification was available, so geometry, crops, overlaid text contrast and aesthetic effect remain unverified.
