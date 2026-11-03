# Mosslight — a light left for someone else

A fictional browser scene: make one lantern and hang it by a footbridge. Intended feeling: small, useful care. This is a local web prototype, not a native game or evidence of player attachment.

## World and UI grammar

Subject inventory: timber, resin, empty iron hook, bridge path, making book and recorded craft. Muted painted forest, worn wood, iron and warm light. Against another cozy crafting game, the candidate distinction is leaving a light for a future traveller, without an achievement score. This remains an authored hypothesis.

The scene and cream making book sit together. Large reading type and exact costs carry decisions. The completed painting contains a lantern suspended from the existing hook with local light on the stones. It replaces the unrelated flat SVG. [Provenance](assets/PROVENANCE.md) retains the edit prompt. Slight brush-detail drift remains; this is not a deterministic production sprite pipeline.

The second surface, **Your making journal**, records made/not made, hung/not hung, actual resources and persistence. Open/close it while a crafted lantern waits without consuming resources or losing the action. Help is available without a forced detour.

## Exact contract

- Start: 8 timber, 3 resin. One lantern costs 6 timber, 2 resin.
- Make: consume that cost once; 2 timber/1 resin remain. Hanging becomes available.
- Hang: no extra cost; completed painting, location, caption and journal entry update. Another craft is unavailable because this bridge already has its lantern.
- Begin again: restore fixture and focus making. Gallery switching retains local state; reload resets. No save system is implied.

Tests cover insufficient resources, duplicate craft, hanging preconditions and immutable transitions. Browser checks cover the flow, journal interruption, switching/reset. No forced celebration or animation wait; reduced motion disables the crossfade.

## Tradeoff and evidence

The two-action loop is deliberately small. A larger game needs inventory/navigation/input/scale tests in its runtime. Phone cropping preserves bridge/hook while costs and controls stack beneath. Web captures cannot establish controller or couch-distance legibility.

[Working example](specimen.html?example=mosslight) · [State sheet](STATE-SHEET.md) · [Review](REVIEW.md) · [Verification](VERIFICATION.md).
