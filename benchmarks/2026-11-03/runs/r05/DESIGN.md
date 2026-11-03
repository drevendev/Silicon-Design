# Mosslight — implemented directions

A player at dusk makes one useful thing and leaves its light for the next traveller. The visual intention is quiet care. That emotional effect is a proposal, not a tested audience outcome.

## Subject inventory

Supplied: the forest workshop and footbridge paintings; the empty iron hook and lit result; timber, resin, make, hang, bridge, making journal; all quantities, fixture states and progression. Both paintings, fixture.json and state.js are copied unchanged. No additional raster assets, evidence or measurements were invented.

Implementation decisions: small iron-like line symbols for inventory and the wordmark, worn green work surfaces, a pale paper journal, serif reading type, a two-step record, and the three compositions below. The icons stay in the interface; no flat lantern is pasted into the painted world.

## Retained alternatives

All three are implemented in index.html and share one DOM and state controller. Query parameters select the initial direction; switching views changes layout without rebuilding or mutating the task.

- **A / Overlook — recommended.** The painting is the dominant object. An invitation sits over the workshop side, leaving the central hook visible. Reading proceeds from scene to a continuous low workbench and then the journal. The scene's actual lit painting is the payoff. Tradeoff: the painting is cropped at narrow sizes and the complete action surface requires vertical scrolling.
- **B / Workbench.** A left work column carries the invitation, exact owned/needed resources and sequential actions. The destination occupies a tall right-hand scene. The journal spans the bottom. This prioritizes repeated operations and comparing available materials with costs. Tradeoff: the tall scene crops more of the workshop at wide sizes. On narrow screens it becomes invitation → compact scene → workbench → journal.
- **C / Field folio.** A paper reading surface with chapter links, a framed frontispiece beside the invitation, and two horizontally read making chapters below. The journal continues the same paper grammar. Tradeoff: the painting has less area; the narrative and accounting receive more attention. On narrow screens the chapters become a single reading column.

The variants change composition, hierarchy, image proportions, reading sequence and navigation model, beyond palette. A provides the closest fit to the supplied world-dominant direction. B trades breadth of scene for immediate work. C trades immersion for a tangible record. No preference or comparative performance claim has been tested.

## Shared system and behavior

Georgia/Times supply title and reading roles. System sans is used for actions, quantities, costs and prototype metadata. Title is 60px in A desktop, 46px in B, and 49px in C; narrow sizes are 42–46px. Exact resources remain visible next to each material and in the open journal ledger. Controls have a 45–46px minimum action height; necessary text stays in document flow. Small uppercase text is reserved for supporting labels.

Deep green ground, slightly lighter work surface, pale warm foreground, muted sage supporting text, warm resin action, and a light paper journal. C maps the same roles onto a pale paper ground and a dark moss action. Boundaries use thin rules, small corner radii and no floating decorative cards. The source of truth is style.css. No external font or dependency is loaded.

An unavailable action has a native disabled state plus visible reason. Initial invitation: the supplied “Six pieces of timber…” copy. Crafted feedback gives the actual 2/1 remainder and available next action. Failure specifies 4/1 available against 6/2 required and offers reset. Completion uses the supplied title and copy, explains that this bridge already has a lantern, and disables duplicate actions. The journal records actual made/hung states, exact costs and zero extra hanging cost.

Make uses the supplied model and moves to crafted once. Hang is enabled only at crafted and uses no materials. Reset restores 8/3 and focuses Make. After making, focus transfers to Hang. Journal interruption retains all state and restores focus to its summary on explicit close. Direction switching preserves phase, inventory, and journal expansion. A fresh load starts the selected fixture. There is no storage or backend.

Motion is limited to short control transitions and anchor scrolling, disabled under reduced motion. No artificial wait, confetti, mandatory help, sound, or delayed progression is used.

## Verification criteria and limits

The representative slice is initial → make → interrupt with journal → switch direction → close → hang → reset. The difficult state is 4/1 insufficient materials, recovered by reset. All fixtures and all three direction bindings have Node source/model/DOM-adapter coverage in check.cjs. This adapter does not lay out, render, synthesize real browser events, or establish accessibility compliance.

Review targets remain 1280×900 and 390×844, the lower journal, pointer and keyboard operation, actual zoom, image crops, rendered contrast, focus visibility and reduced motion. Browser review was unavailable in this run, so there are no captures or visual correction claims. The same icon/quantity/button/painting set in each working view serves as the implemented component and asset specimen. The journal is the second meaningful surface.
