# What we can carry forward from our own work

These are observations from inspectable repository artifacts, not a claim that every practice has been proven with users. Revisions are recorded in [revisions.json](revisions.json).

## BeautifulRepo: explain, show, let someone try

Its [README](https://github.com/drevendev/BeautifulRepo/blob/a692491a7a973032d90545bc6f428ba6b77f706f/README.md) makes a reproducible first result visible and distinguishes offline checks from broader review. The [PocketDiff design-intent brief](https://github.com/drevendev/BeautifulRepo/blob/a692491a7a973032d90545bc6f428ba6b77f706f/examples/readme-visuals/DESIGN_INTENT.md) connects content order to a reader's questions and explicitly labels the product as fictional.

**Transfer:** start with the visitor's task, place representative evidence near the promise, and keep the next action honest. Carry over the method to websites and product onboarding. A repository first-run command is not automatically the right first action in a game.

## FrankenRepo: identity can be part of the experience

The [README](https://github.com/drevendev/FrankenRepo/blob/26da6d02e59df7a3374b529515423eecf8ac7086/README.md) presents a gothic laboratory, source-linked inspection, an illustrated specimen and actual runtime receipts. It distinguishes illustration from generated output, and local implementation from hosting. Its interface's laboratory concept connects the product's action to a recognizable world.

**Transfer:** develop a coherent metaphor across language, assets and interaction; keep real processing and state truthful inside that world. Atmosphere should reinforce a task. It is not evidence that gothic art, multiple display fonts or sound are appropriate for every product.

**Evidence boundary:** this observation uses repository documentation and linked artifact descriptions. Silicon Design has not independently repeated FrankenRepo's runtime or user testing.

## IdleShop: dense UI needs semantic precision

The [0.14 authoring wireframes](https://github.com/drevendev/IdleShop/blob/a29ba05efdd3c1a1a0a3c3a34f361e5590953bc7/docs/design/release-0.14/ui-wireframes.md) specify units on resolved values, owned/required costs, unavailable-action reasons, exact disclosure for compact numbers, and EN/RU input constraints. They distinguish signed values, unknown knowledge and exact zero. They also require presentation interactions to leave the economy untouched.

**Transfer:** design around the decision a number supports. Keep details available without duplicating every explanation. Blocked actions need discoverable reasons; tooltip and accessibility text must respect knowledge rules.

**Evidence boundary:** these are authoring specifications, not screenshots or proof that every described check passed in the shipped game.

## Shared working method

Our synthesis is to connect direction → content → behavior → rendered review → recorded evidence. Preserve identity and game/application truth while removing accidental complexity. The initial [fictional specimens](../examples/README.md) illustrate this method; the [roadmap](../ROADMAP.md) reserves real before/after evaluation for a subsequent product task.
