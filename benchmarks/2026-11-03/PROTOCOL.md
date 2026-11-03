# Matched design trial — 3 November 2026

This protocol was fixed before inspecting candidate designs. It compares six fresh-context implementations: one run per skill set for each Read / Operate / Experience brief. It is a small paired trial, not a statistical ranking of design systems or models.

## Inputs and conditions

- Silicon Design at `053649a8f3c74f0c3325dce92bb813a711dcae91`; all five portable skills supplied.
- Anti Slop at `941b1532f9cc8ffde766bca5921d75257c9e5762`; core, UI, mobile layout, human/access and copywriting skills supplied. Both receive the same informative DESIGN.md; no installer or package runtime is used.
- Identical per-brief words, fixtures, actions, assets, positive direction, output/test adapter and prompt. No current reference interface or competing output is supplied.
- Fresh agents with `fork_turns=none`, the same inherited model/settings and no model override. Exact served model snapshot, sampler seed/temperature and token billing are not exposed by this runtime; those values must not be invented.
- Equal 600-second wall allowance, monitored by the coordinator, including reading and implementation. Three concurrent workers maximum. One output per condition/brief; all three directions retained. No seed sweep or best-of selection.
- Static vanilla HTML/CSS/JS only. Fixed supplied assets; no image-generation budget, external fonts, dependencies, network access, browser automation or further delegation during generation. The same local source/Node checks are available. The operator performs browser checks after output is frozen.
- Order: Silicon/Anti for Operate, Anti/Silicon for Read, Silicon/Anti for Experience. This is predeclared counterbalancing, not a randomized multi-seed experiment.

The first CLI attempt rejected the requested model before producing any design output. Its six infrastructure failures are retained privately and excluded from design results. The working agent runtime above was chosen before the first successful generation. No poor candidate may be silently discarded as an infrastructure failure.

Skill size differs by treatment: approximately 23 KB for Silicon and 141 KB for the supplied Anti Slop package. Do not pad the shorter package or call bytes a token/cost measurement. Input hashes and actual output sizes belong in the run manifest.

## Briefs and required evidence

| Brief | Fixed task and material | Secondary / difficult work |
| --- | --- | --- |
| Read — Field Notes | One photograph; exact shutter/chair/waterline observations; select/keep/remove; 300-character margin note | Empty/populated field book; empty-note error, focus and saved-edit preservation; safe Cyrillic/markup-like text |
| Operate — Dispatch | Same three repairs/drawings; original 18 versus corrected 18a; release, collect, undo | Real handover records; wrong/missing-address error; blocked radio; correct counts and return context |
| Experience — Mosslight | Same base/completed paintings; 8 timber/3 resin; cost 6/2; make and hang | Making journal interruption; labelled 4/1 insufficient fixture; no duplicate consumption; completion/reset |

Every candidate must retain working directions `a`, `b`, `c`. A direction label or palette change alone is weak diversity evidence. A recommendation does not remove the other outputs. `fixture=initial|secondary|error|complete` provides explicitly labelled QA states; real task execution is checked separately.

## Predeclared review

Capture all initial directions at the same 1280×900 viewport. Inspect all three at 390×844 for reflow and controls. Inspect one complete task, an error/recovery and secondary surface per candidate, then check state retention across directions. Record exact selectors/state, consequence and evidence for failures. Do not repair original candidates before scoring or capturing them.

Operation: actual task completion, truthful values/status, recovery, ordinary second workflow, state retention, reload boundary, readable necessary information and obvious overflow. A missing test adapter alone is an instrumentation failure; determine the visible task consequence before calling it a product failure.

Character/diversity: dominant object, information order, composition/density, image/material grammar, voice and response to action. Compare within one brief and within each set's three directions. Explain concrete losses/ties/strengths; do not derive a beauty score from CSS patterns.

The primary operator knows the conditions. Anonymous display in the gallery does not make this a blinded review. No independent audience study, memorability measurement or attachment result is implied. Report aesthetic judgments separately from reproduced behavior and measurements.

## Apply findings

Freeze all original artifacts and their hashes. Link each principles/skill edit to an observed failure and a bounded correction. If an operator-assisted revision is made, keep it separate and label its extra feedback/effort. It is not a seventh independent baseline or proof of superiority. Recheck affected cases and retain unresolved weaknesses. A later properly matched rerun is a separate experiment.
