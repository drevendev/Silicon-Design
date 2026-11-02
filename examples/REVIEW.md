# Review — character carried into the task

Date: **2 November 2026**. Scope: three fictional browser prototypes. This is a design and implementation review, not a usability study or evidence of increased attachment.

## What changed after the first critique

| Original weakness | Implemented decision | Observable consequence |
| --- | --- | --- |
| Field Notes signalled “editorial” without its own material | One imagined street, three numbered details, an observation route and reader's margin | Selecting a mark changes the reading; kept observations and an editable note form a local field book |
| Dispatch stopped at disclosure in a generic queue | A repair desk with object-specific drawings, bench notes and an address correction | Correct release clears the same job and count; undo restores it without discarding the choice |
| Mosslight's lantern stayed decorative | An empty hook becomes the destination for the craft | Making consumes resources; hanging places a lantern and lights the path; the journal records the act |

The [original critique](../research/specimen-critique.md) is retained against the old revision. The replacement changes content, composition, behavior and completion feedback together. Different palettes and font roles support those decisions.

## Skills applied

- [Direction](../skills/silicon-design-direction/SKILL.md): define attention, quiet competence and small care; compare alternatives that would change the task; record the tradeoffs in each brief.
- [System](../skills/silicon-design-system/SKILL.md): give each product semantic palette and typography roles; keep native controls, focus and truthful states beneath the visual grammar.
- [Interface build](../skills/silicon-interface-build/SKILL.md): implement a complete local flow, error recovery, retained input and completion rather than linking to placeholder pages.
- [Game UI](../skills/silicon-game-ui/SKILL.md): connect costs, inventory, object placement and world response; keep the recipe readable outside the painting.
- [Review](../skills/silicon-design-review/SKILL.md): inspect rendered wide/narrow states, use keyboard actions, correct visible problems and record unperformed checks separately.

## Findings resolved during inspection

- Smaller service labels were raised to a 10px minimum. They remain a compact role; this is a provisional design choice, not an accessibility guarantee.
- The Field Notes display size now scales through the intermediate two-column width; its long second line stays inside the story column at the checked 768px view.
- The game scene height leaves the recipe action visible in the checked wide viewport. Narrow framing retains the hook and path; artwork and light share the same crop.
- Dispatch changes its drawing for each object, changes its headline after completion and does not mark the unfinished radio's bench check complete.
- Undo preserves the address selection. A margin-note validation error keeps the text field available; valid Cyrillic input renders as text.

## Judgment and remaining work

The three specimens now have different ways of paying attention, making progress and finishing. That is the design judgment this revision makes inspectable. It does **not** establish memorability, affection or better task performance.

Before treating any of these as a production direction, test the actual intended audience. Field Notes needs real editorial material and a persistence decision. Dispatch needs a large-queue workflow, permissions and durable audit records. Mosslight needs a repeatable play loop and runtime/controller checks. The compact labels, narrow reading order and platform-dependent font fallback deserve specific observation in those trials.

See [VERIFICATION.md](VERIFICATION.md) for the narrower technical evidence. Passing checks does not close the character review.
