# Mosslight — leave a way home

## Player, moment and feeling

A lanternmaker has enough material for one useful thing at blue hour. The intended feeling is small care made visible: leave a light for the next person who crosses the footbridge. This is a short DOM-based scene, not a complete game or tested economy.

## The recognizable idea

**The thing you make belongs in the world.** The empty hook is present before the decision. Crafting produces a lantern; hanging it puts that object on the hook and casts light over the stepping stones. The making book, world caption and journal describe the same change.

A collectible-card inventory would suggest rarity and acquisition. An elaborate crafting tree would delay the consequence. This scene chooses one modest act with a visible destination, giving up replay depth. Another recipe, a larger glow or more resources would not by themselves establish a good game loop.

## Visual grammar and voice

- An original generated gouache forest sets the scene: moss-covered workshop, empty iron hook, footbridge and a path into the trees. The artwork is labelled generated in the wide scene; all views link to this fictional art record.
- An HTML making book sits beneath the scene; costs and buttons remain text and native controls. A separate SVG lantern/light layer uses the same coordinate system and crop as the painting, so its placement follows responsive framing.
- Midnight-blue world, paper recipe, muted pine and warm light support the action. [Palette data](palettes.json) covers declared opaque UI pairs; it cannot establish all text/scene combinations.
- “A little less dark.” and “Someone will be glad of that.” describe the scale of the act. There is no rarity banner, reward shower or fabricated player achievement.

## States and behavior

1. **Unmade:** the hook is empty; timber is 8 and resin is 3. The recipe costs 6 timber and 2 resin.
2. **Crafted:** a single craft leaves 2 timber and 1 resin. The next action is hanging this lantern, not consuming another set of resources.
3. **Lit:** the lantern appears on the hook; a warm pool reaches the path. The world description and journal update. The completed control is unavailable, with a nearby explanation that another craft would require 4 more timber and 1 more resin.
4. **Begin again:** restores the unlit world and inventory, clears the journal and returns focus to crafting. Reload also resets the fictional scene.

Buttons support pointer and keyboard. Phase changes have a polite text status. Light/filter transitions respect `prefers-reduced-motion`; no audio or continuous animation is needed. The transition itself is not required to understand success.

## Evidence and remaining questions

[Working specimen](specimen.html?example=mosslight), [review](REVIEW.md), [verification](VERIFICATION.md), [art provenance](assets/PROVENANCE.md).

The illustration participates in the task now. Warmth and care are design judgments; player attachment is unmeasured. Controller navigation, a real game renderer, safe areas, UI scaling, saving, replenishment and a repeatable economy require separate implementation and tests.
