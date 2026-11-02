# Games

The play experience sets the hierarchy. UI should communicate decisions and feedback while belonging to the game's world and preserving the playfield.

## Define context

Specify genre, loop, target devices, input methods, resolution, viewing distance, localization and UI scale. Decide which information must remain visible during play and which can live in a menu. A phone idle game, controller action game and desktop strategy game need different density and focus behavior.

## Build readable decisions

Use an expressive face for short world-building titles if desired; use a readable face for inventory, instructions and quantities. Check text against the darkest and brightest relevant scenes, with stable panels or outlines when necessary.

For a purchase, show the effect, exact cost or accessible exact disclosure, owned/required amounts, and a plain reason it is unavailable. A deficit uses both text and color. Do not reveal hidden content through a tooltip, placeholder or accessible label before the game's knowledge rules allow it.

Separate presentation changes from game balance. Compact formatting, help expansion, focus or hover must not change resources, coefficients, unlocks or progression. Keep zero, unknown and not-applicable values distinct. These conventions are informed by [IdleShop's authoring wireframes](../../research/our-practice.md), which are specifications rather than proof of shipped UI.

## Input, motion and audio

Make focus visible on controller/keyboard paths and map navigation explicitly in spatial menus. Provide a suitable non-drag route for drag interactions when feasible. Address UI scaling, safe areas, subtitles and input remapping according to the game's platform and audience.

Feedback should be immediate and truthful: an animation can celebrate an actual resource change but must not conceal an input failure. Offer reduced decorative motion, screen-shake adjustment and audio controls where relevant. Do not rely on sound or color alone for essential events.

## Review in play

Test a normal purchase, insufficient resources, a full or empty inventory, interruptions and resuming play. Check large quantities, translated labels, smallest supported UI scale and all supported input paths. Inspect the HUD over a changing playfield in runtime; a static image cannot establish that it works.

Example: [Mosslight brief](../../examples/mosslight.DESIGN.md). External starting point: [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/basic/).
