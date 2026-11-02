# Design the contract between intent and outcome

A product's character includes how safely someone can explore, learn and recover. Use these contracts for a consequential flow. A small label correction does not require implementing a new command system, tutorial or persistence layer.

These are Silicon Design conventions informed by [recorded browser-game practice](../research/platform-practice.md). They extend principles P25–P28; they are not accessibility standards or evidence of improved retention.

## Keep one meaning across surfaces

Name the authoritative source for a value, eligibility rule or knowledge boundary. A compact card, inspector, help page, accessible description and search result can show different detail while agreeing about the same fact. Distinguish exact zero, unknown, unavailable and not applicable.

For undiscovered content, decide which facts are intentionally public. Apply that decision to labels, artwork, tooltips, accessible names, search, notifications and exported presentation. Do not hide a name visually while exposing it through another route. This is a product knowledge rule; it is not a security mechanism for secrets sent to a client.

**Fictional example:** a workshop order costs six tokens in its card and inspector. Before discovery, its recipe stays unnamed in search and the accessible description, while a deliberately public unlock requirement remains available.

**Inspect:** follow one fact through its actual surfaces, then change the underlying state. Check both the permitted reveal and what must remain undisclosed. An absence-only assertion cannot establish that the successful transition works.

## Separate a draft, a preview and a commitment

Explain whether someone is editing a local plan, viewing an estimate, confirming an action or resolving an already required choice. Canceling a pre-action draft should leave committed state intact. Closing a required-choice panel must not silently resolve or discard the choice.

Mark previews as exact, rounded, estimated or unavailable. Confirm against current conditions: an old preview does not guarantee that stock, capacity or permissions remain unchanged. Refusal preserves useful input and explains what changed. Where a product has an atomic operation, failed validation must not leave a partial charge or reward.

**Fictional example:** selecting two parts previews a six-token cost. Selection is editable. If stock changes before confirmation, preserve the selection, explain the shortage and apply no partial purchase. Do not invent undo where the underlying operation has none.

**Inspect:** edit, preview, cancel, resume and confirm; also confirm after the relevant source state changes. Check actual outcomes through the product's existing authority, rather than reproducing its rules in the UI.

## Teach an achievable action

When a guide asks for an action, advance because that action's completion is evidenced by product state. A timer or an unconditional Next button cannot prove learning or action completion. An explanation-only step can have an explicit exit; label its different purpose.

Check that the target and prerequisites exist when the instruction appears. Resume from lasting evidence after interruption, including advanced saves or completed work. A reordered guide must not send someone backward merely because its saved array position changed. Provide deliberate skip/replay behavior where the product supports it.

Choose modal or nonmodal behavior explicitly. A locked sequence needs input containment across supported routes; a coach that allows ongoing work must not claim modal semantics. Preserve accessible instruction, reachable targets and predictable focus on entry and exit.

**Fictional example:** “Create your first order” advances after the order exists. Opening the help card does not complete it. A returning person who already created an order resumes at the next unmet condition.

**Inspect:** complete the actual journey from a fresh state, reload partway through, resume from a completed state, and exercise skip and supported input paths. Automated completion proves the tested journey; human learning remains a separate observation.

## Let expressive feedback follow accepted outcomes

Show an immediate acknowledgment of input, but reserve result claims for accepted outcomes. A decorative animation, audio load or component remount must not spend resources, complete a transaction or determine when the next legal action becomes possible.

If a result is replayed during hydration or rendering, avoid replaying its celebration as a new event. Define what happens when a new action interrupts an old effect. Reduced motion, silence and unavailable audio must preserve the outcome and its semantic explanation.

**Inspect:** repeat the same meaningful actions with normal effects, instant/reduced effects and unavailable audio. Compare the authoritative results, not just screenshots. Check a rejected action and a repeated render as negative controls. This extends P15–P16 rather than requiring a universal animation implementation.

## Complete the recovery journey

State what remains available after failure and what the next action can actually accomplish. Distinguish the current unsaved session, an exact preserved source, a validated backup and a diagnostic report. A copied diagnostic is not restored work. A requested download is not proof that a file was saved.

Preserve the original before a destructive replacement when the product supports recovery. Validate the exact draft that will be applied, and recheck it if it changes. Keep import/copy/download failure usable without erasing the current session. Report only observable transport outcomes.

**Fictional example:** an unreadable journal offers its preserved original and a diagnostic separately. A replacement is reviewed before applying. If the download fails, the original remains available and the interface explains the alternative; it does not display “Backup saved.”

**Inspect:** exercise one actual failure and recovery path, including interruption or denied storage/transport where applicable. Do not add backup infrastructure to a product that has no such scope.

## Review what is visible, usable and understood

A reachable button center does not prove its label is readable. Accessible text does not prove a caption is visibly unclipped. Inspect settled fonts, long translations, overlays, narrow layouts and supported scaling in the actual delivery. Keep geometry checks, painted-pixel inspection, keyboard operation and assistive-technology checks distinct.

For a consequential decision, ask what someone expects before commitment. Automated state agreement cannot establish human comprehension, enjoyment or attachment. Keep the usefulness/access conclusion and the character/care critique separate in the [review report](../templates/REVIEW.md).
