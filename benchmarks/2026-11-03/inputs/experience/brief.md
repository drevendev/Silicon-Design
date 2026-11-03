# Experience — Mosslight

A lanternmaker at dusk makes one lantern and hangs it on the empty iron hook beside the footbridge. Use the supplied unlit and completed paintings without editing them.

Initial inventory 8 timber/3 resin. Make costs exactly 6/2 once, leaving 2/1 and phase crafted. Hang is available only after making, uses no extra resources, moves to lit and shows the completed painting. No duplicate craft or pre-craft hang. Completion explains this bridge already has a lantern. Reset restores 8/3 and focus to making. Insufficient resources block making with an explicit reason.

Secondary surface: a making journal with actual made/hung states, costs/resource consequences and visit-only boundary. Opening/closing during crafted must not consume resources, reset the scene or force completion. Direction switching retains the pending task. No inventory expansion or changed economy.

Required test adapters: make, hang, reset, open-journal (a native summary toggle is allowed), timber, resin, game-status. Expose current phase on the main scene via data-phase="unmade|crafted|lit". Values/feedback must be visible as well as attributes.

Fixtures: initial = 8/3 unmade; secondary = journal open while crafted with 2/1; error = labelled insufficient fixture, 4 timber/1 resin unmade, blocked make; complete = lit painting, 2/1, completion and journal. Returning to the default fixture/reloading restores the fixture contract.
