# Mosslight — fictional crafting game

## Context

A player in a quiet workshop needs to decide whether to craft a lantern. This is a DOM-based teaching specimen with local resource changes; it is not a game runtime, economy model or save system.

## Direction

A dark, tactile workshop: serif title, a geometric lantern silhouette, warm brass-colored emphasis and clear system-sans resource labels. Light suggests the purpose of the craft. The cost and available action remain more prominent than decorative lore.

A saturated loot-card treatment was considered; it would imply rarity and competition that the quiet craft loop does not support. The chosen direction gives up bright collectible signaling. It still needs runtime checks against actual scenes.

## System and behavior

- Surface `#182a25`, raised panel `#233b32`, text `#f2ead4`, supporting text `#c0ccb8`, brass `#e8bb69`.
- Costs show `owned / required` with units. One demonstration craft consumes the fictional resources and reports completion; another attempt shows an explicit missing-resource state. Reset restores the local fixture.
- Keyboard and pointer use native buttons; the resource update has a polite status announcement. The button's unavailable reason stays adjacent when disabled.
- No decorative animation or audio is supplied. The lantern drawing is decorative and hidden from assistive technology.
- The narrow layout stacks art and decision. Do not treat this as proof of controller focus, canvas access, safe areas, UI scale or scene contrast.

## Evidence

[Specimen](specimen.html), [palette data](palettes.json) and [verification](VERIFICATION.md). All quantities are explicitly fictional and reset on page reload.
