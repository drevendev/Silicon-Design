# Games

The play experience sets the hierarchy. UI should communicate decisions and feedback while belonging to the game's world and preserving the playfield.

## Define context

Specify genre, loop, target devices, input methods, resolution, viewing distance, localization and UI scale. Decide which information must remain visible during play and which can live in a menu. A phone idle game, controller action game and desktop strategy game need different density and focus behavior.

Before composing, independently find and visually inspect screens for the same genre and player task. For an idle/tycoon trade task, inspect comparable supply/trade screens; distinguish actual UI, promotion, concepts and unknown provenance. Extract recognition, grouping, price/action proximity, density and repeated-input relationships into this game's kit. A reference's art, extra controls or mechanics are not a specification to copy. Record unavailable inspection rather than manufacture evidence.

Choose the reading model from actual count and decisions: a bounded assortment may fit a grid, a large sortable catalog may use rows. Budget shared chrome, task-wide effects/refresh and usable slots before implementation. Fit the bounded base-view set without unnecessary scrolling; retain readable names/values and operable purchase/detail paths. Reconsider repeated explanation before shrinking. Narrow/enlarged-text reflow may scroll deliberately. [Calculation and example](../references-and-capacity.md).

Use the current revision, accepted changes, explicit layout/capacity constraints and supplied growth plans. For multiple screens, reuse a [shared kit](../product-contract.md) before expansion: common navigation, level/XP, quantities and equivalent actions share implementations. Preserve task-based differences. A local correction needs no new system. Authorized simplification may regroup a mechanic's state and effects or remove redundant wording while preserving accessible meaning and gameplay truth.

## Build readable decisions

Use an expressive face for short world-building titles if desired; use a readable face for inventory, instructions and quantities. Check text against the darkest and brightest relevant scenes, with stable panels or outlines when necessary.

For a purchase, show the effect, exact cost or accessible exact disclosure, owned/required amounts, and a plain reason it is unavailable. A deficit uses both text and color. Do not reveal hidden content through a tooltip, placeholder or accessible label before the game's knowledge rules allow it.

Separate presentation changes from game balance. Compact formatting, help expansion, focus or hover must not change resources, coefficients, unlocks or progression. Keep zero, unknown and not-applicable values distinct. These conventions are informed by [IdleShop's authoring wireframes](../../research/our-practice.md), which are specifications rather than proof of shipped UI.

Inspect resource, weather, route and action symbols within their actual surroundings at the intended UI scale. Distinct meanings and the selected option must remain discernible; keep important names, costs and effects beside the decision. A top resource strip or particular snowflake is a contextual option, not a universal HUD rule.

Compare placed scenery, objects, icons and controls for edge, lighting, perspective and material coherence. An asset sheet helps a reusable-family change; it is not required for an isolated icon fix. Resolve and measure actual foreground/background roles in changed themes and overlays, especially quantities.

## Input, motion and audio

Make focus visible on controller/keyboard paths and map navigation explicitly in spatial menus. Provide a suitable non-drag route for drag interactions when feasible. Address UI scaling, safe areas, subtitles and input remapping according to the game's platform and audience.

Feedback should be immediate and truthful: an animation can celebrate an actual resource change but must not conceal an input failure. Offer reduced decorative motion, screen-shake adjustment and audio controls where relevant. Do not rely on sound or color alone for essential events.

Connect world identity to what the player does and what changes afterward. An object, mark, sound or transition can help express a game's character when it belongs to the event. Keep comparisons and costs precise while expressive feedback fits the moment. Inspect frequently repeated actions; celebration should not become an input delay. Do not change gameplay or invent a world response outside the authorized implementation scope.

## Review in play

For affected interactive work, exercise relevant normal/adverse states, large quantities, long translations and supported input paths at the intended UI scale. Check interruption/return and switching/reload/restart only where the persistence contract is promised and affected. Inspect changing backgrounds in the actual runtime when available; a static assignment needs its complete frame and cannot establish runtime operability. Do not add purchases, inventory or save behaviour solely to populate a review.

Example: [Mosslight brief](../../examples/mosslight.DESIGN.md). External starting point: [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/basic/).
