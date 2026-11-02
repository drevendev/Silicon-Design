# Dispatch — finish the repair properly

## Person, moment and feeling

A repair-workshop operator is closing work orders before delivery or collection. The intended feeling is quiet competence: a repaired object goes back into someone's life, and the operator knows what has actually been completed. All people, objects, addresses and jobs are fictional fixtures.

## The recognizable idea

**A work order travels from the bench to a cleared ticket.** The shelf holds clipped job tags; the main surface carries the object's line drawing, bench note, unresolved decision and route. Finishing work changes that record and the shelf, while keeping the operator in place. Undo is part of the completion state.

A broad analytics dashboard would show more totals and less of the object being repaired. A generic support queue would lose the workshop's practical context. The desk chooses one consequential decision at a time. The physical-ticket composition sacrifices some density; scaling beyond three jobs would require a different shelf and proper filtering.

## Visual grammar and voice

- Compact sans, tabular job numbers, cut ticket corners, dashed routing rules and original technical SVG drawings make a repair record rather than an abstract “case.” Each job has its own drawing.
- Lime identifies the selected ticket; written status and pressed state also identify it. A restrained checked seal describes passed bench work and disappears for the unfinished radio. A cleared stamp appears only after the action succeeds.
- Semantic paper/ink/signal roles are declared in [palette data](palettes.json). Customer handwriting uses Georgia; operational labels remain compact and aligned.
- “The lamp is fixed. The address isn't.” names the actual uncertainty. Errors explain the needed correction. Completion names the outcome and preserves an immediate way back.

## States and behavior

- **017 / address decision:** compare the original label, 18 High Street, with the customer's correction, 18a. Submission without a choice or with the old address explains the issue and retains the selection. Correct release updates the open count, ticket, headline, route and receipt. Focus moves to Undo.
- **018 / collection:** marking collection clears this particular job. It does not silently affect delivery or the waiting radio.
- **019 / waiting:** the missing switch and outstanding final test are stated beside the unavailable release control. The bench stage is not marked complete.
- **Undo:** restores that job, preserves the address choice and returns focus to the decision. Switching jobs retains other local work. Reset restores all three fixtures.

There is no printing, shipping, stock service, customer contact or saved backend state. Reload resets the sample; the page labels this clearly. Native radios and buttons handle the decisions. On narrow screens the three short job selectors sit above the order; secondary owner metadata gives way to the decision content.

## Evidence and remaining questions

[Working specimen](specimen.html?example=dispatch), [review](REVIEW.md), [verification](VERIFICATION.md).

The completion now has a truthful local consequence and a domain-specific expression. Faster work, operator confidence and long-term fondness are hypotheses, not measured outcomes. Real release permissions, concurrent edits, audit records, printing and a large queue remain outside this prototype.
