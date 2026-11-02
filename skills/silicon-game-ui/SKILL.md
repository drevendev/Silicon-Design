---
name: silicon-game-ui
description: Design or implement game HUDs, inventory, purchase flows, menus and feedback in the game's runtime context. Use when playfield hierarchy, UI scale, resource truth and game input matter.
---

# Silicon game UI

Fit the interface to the play experience and the game's own visual world. Inspect the game direction, existing UI, gameplay contracts, text catalogs and runtime constraints first.

## Establish the play context

Identify genre, primary loop, target platforms, inputs, resolution, viewing distance, safe areas, UI scaling and supported languages. Choose one representative decision and a difficult state. Keep the playfield and immediate task dominant; disclose less urgent detail in a way the intended input can reach.

Use expressive type and materials for world identity where helpful, with readable body text and quantities. Test actual scripts, long labels and scene backgrounds. Do not assume a static HUD image establishes runtime legibility.

## Preserve game truth

For purchases and crafting, show effect, owned/required amounts, cost and the explicit reason an action is blocked. Preserve exact values or an accessible exact disclosure when compact formatting hides a decision. Distinguish zero, unknown and not applicable.

Respect knowledge and unlock rules in visible text, tooltips and accessible names. A presentation change must not modify economy coefficients, inventory, progression or simulation behavior unless requested. Focus, hover, help expansion and formatting must not mutate gameplay state.

Feedback should correspond to actual events. Handle pending, failed, interrupted and completed actions without misleading resource animations. Provide useful recovery and avoid duplicate purchases caused by ambiguous input.

## Input and access

Check every supported input path: keyboard, controller, pointer or touch. Define focus order and restoration in menus, visible selection, UI scaling and safe-area behavior. Address remapping, alternatives to drag, subtitles and motion/audio controls as applicable to scope. Critical information needs cues independent of sound and color.

Inspect a normal action, insufficient resources, empty/full inventory where relevant, interruptions, large quantities and long translations in the real runtime. Check changing backgrounds and target viewing conditions. Report untested platforms or input methods explicitly.

Deliver the UI and state contracts, a working representative flow, captures where available and actual test coverage. If only a mockup was possible, label it as a mockup and identify the runtime questions it leaves open.

Optional depth: [Silicon Design game guide](https://github.com/drevendev/Silicon-Design/blob/master/docs/products/games.md).
