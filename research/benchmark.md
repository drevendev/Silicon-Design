# First benchmark: Anti Slop

Our first target is to produce **better and more varied results than Anti Slop**. This is an objective, not a result. The [first matched generation trial](../benchmarks/2026-11-03/RESULTS.md) is now complete, with [live original artifacts side by side](https://drevendev.github.io/Silicon-Design/benchmarks/2026-11-03/). It found concrete Silicon losses and did not establish superiority. A blinded audience trial has not been run.

Comparator reviewed on 2026-11-03: [miqdadbadjuber/anti-slop at 941b153](https://github.com/miqdadbadjuber/anti-slop/tree/941b1532f9cc8ffde766bca5921d75257c9e5762). Read: README, core skill, UI skill and mobile-layout skill, selected sections. Its own README distinguishes the filter from direction supplied by DESIGN.md. Use **Anti Slop + an equally informative DESIGN.md** as the main baseline; handicapping it with no direction would answer the wrong question. Record exact loaded files. Do not install a package or run a foreign installer to read the sources.

## Matched run packet

Use fresh contexts for each condition. Keep model/version, sampling settings, runtime/tools, image access, source fixture, target viewports, revision and time/token budget the same. Record actual values rather than claiming unspecified settings were controlled. If a condition requires extra skill dependencies, list them and charge their use to its budget. Randomize condition order for repeated trials, or predeclare counterbalancing and its limitations for a small pilot. Save prompts, outputs, costs, failures and rejected candidates, not only the best screenshot.

Run three briefs, each with three retained directions and one chosen working slice:

| Brief | Fixed material and task | Required states |
| --- | --- | --- |
| Read: Field Notes | [Fixture](../examples/field-notes-data.js), one generated street image, three observations; select, keep/remove, margin note, field book | Fresh/selected/kept/empty book/populated book/invalid note/saved edit; switching retains, reload clears |
| Operate: Dispatch | Existing three work orders, original/corrected address, lamp/turntable/radio drawings; release, collect, undo | Missing/wrong address, correct release, collection, blocked radio, resume after switching |
| Experience: Mosslight | Existing forest image, 8 timber/3 resin, cost 6/2; make and hang one lantern | Unmade/crafted/lit, repeated input, reset; no economy changes or invented save service |

Common prompt: “Implement this fictional local prototype from the attached fixture and material. Produce three genuinely different directions with the same words, actions and states; retain all three, explain the tradeoff and develop one through the complete task and second surface. Preserve the declared resource/persistence contract. Show working wide and narrow results. Do not invent research outcomes.” Supply the same contextual brief to both conditions. Silicon uses its five scoped skills; the comparator uses its core/UI/mobile/human skills as applicable. Archive exact inputs before running.

Capture at 1280×900 and 390×844 in matching states. Include the complete artifact and one difficult state, not just the opening viewport. These are reproducibility settings, not universal device requirements.

## Assess quality and diversity separately

First record concrete task failures, misleading state, readability and recovery. Then anonymize and randomize artifacts for human comparison. Ask which better fits the brief, feels specific within its category, stays coherent beyond the opening and is preferable to use; require a reason and allow ties. Reviewers must be able to operate the same tasks. Report reviewer count, relevant familiarity, disagreements and sample limits.

For diversity compare the three outputs **within each condition**: dominant object, reading/navigation model, attention sequence, density, imagery and response to an action. Name what changed and what stayed fixed. Palette/font substitution alone is weak evidence. Variation that sacrifices the task is not a win. Do not combine operation and aesthetic preference into an unexplained numerical beauty score.

Promote “beats Anti Slop” only when matched artifacts and the scoped human results support it. One favorable brief is a result for that brief, not a universal claim. Model-generated reviewers are useful critique aids, not independent audience evidence.

## Current evidence

- [Field Notes: three working directions](../examples/field-notes-directions.html), retained under one fixture and shared field-book model.
- [Applied research and boundaries](issue-8-application.md).
- [First trial, 2026-11-03](../benchmarks/2026-11-03/RESULTS.md): six fresh-context agents, one per brief/condition; identical non-skill inputs, inherited settings and 600-second allowance; exact model/sampling/token billing unavailable. All 18 directions retained.
- [Losses and scoped repairs](../benchmarks/2026-11-03/RESULTS.md): theme inheritance, last-record recovery, phone task priority and shared scope drift informed all five skills. Repairs received extra operator feedback; original outputs remain frozen.
- Blinded human comparison: **not run**. Superiority: **unproven**.

Do not substitute a hand-authored imitation of Anti Slop for a baseline. The trial used separate fresh generation contexts; the operator and subsequent repairs were not independent or blinded. Revised skills require a new matched run before claiming a generation improvement.
