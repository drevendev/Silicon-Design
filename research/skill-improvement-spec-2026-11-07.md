# Silicon Design skill improvement specification

Tracking issue: [#21](https://github.com/drevendev/Silicon-Design/issues/21).

Implementation and performed checks: [implementation record](skill-improvement-implementation-2026-11-07.md).

## Objective and scope

Improve Silicon Design's task fit, visual craft and review reliability while reducing unnecessary instructions and generated work. Preserve the five portable skills and their independent use. This specification defines the change; its implementation, verification and remaining evaluation limits are recorded separately above.

Sources: the abogun-product operations trial [#11](https://github.com/drevendev/Silicon-Design/issues/11), its follow-ups #12–#15, Design Duel v2 [#16](https://github.com/drevendev/Silicon-Design/issues/16), follow-ups #17–#20, and the [v2 addition to #15](https://github.com/drevendev/Silicon-Design/issues/15#issuecomment-6706298551). [#10](https://github.com/drevendev/Silicon-Design/issues/10) is related craft context, not a third pooled result.

The operations report describes Silicon losing 3:7 to its no-skill baseline, with extra framing and exploration cost. V2 gives Silicon 4:0 against Anti Slop and 2:2 against the short prompt on common briefs, including negatively described wins. These different trials motivate changes; their votes, models and costs must remain separate. Private operations artifacts were not independently re-audited for this specification.

## Skill authoring constraints

Skill metadata is the discovery layer; detailed instructions load on selection. Use concise task boundaries and load supporting procedures only when relevant. Official guidance favours focused skills and progressive disclosure, and warns against oversized descriptions and rigid itineraries. See [Build skills](https://learn.chatgpt.com/docs/build-skills) and [Rethinking skills and prompts](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra). The locally bundled skill-creator guidance was also reviewed.

The architecture and size targets below are project decisions, not OpenAI limits:

- Keep the existing five names. No umbrella router, sixth chart skill, compulsory cross-skill chain, installer or new runtime dependency.
- Each folder remains usable when copied alone and used offline. Essential outcomes/invariants stay in its own SKILL.md; handbook links are optional depth.
- Replace overlapping prose. Put evidence history, benchmark IDs, long examples and measurement recipes outside entrypoints.
- Start instruction-only. Add a script only for demonstrated reusable deterministic work, not to count prose, enforce taste or recreate project test tooling.
- Preserve user scope, existing branding and sound controls. No additional approval ritual, theme change, persistence, workflow or documentation bundle to satisfy a skill.
- Retain Silicon's purpose: subject-specific character and coherent choices across the requested surfaces. Do not replace that purpose with generic usability checks; on operational work, efficiency can carry the character.

### Context budget

Measured on 2026-11-07; body words use whitespace splitting after YAML frontmatter, not model tokens.

| Entry point | Current body words | Revision target |
| --- | ---: | ---: |
| silicon-design-direction | 833 | 425 |
| silicon-design-system | 569 | 450 |
| silicon-interface-build | 655 | 450 |
| silicon-design-review | 668 | 450 |
| silicon-game-ui | 668 | 425 |
| Total | 3,393 | 2,200 |

Target about 35% fewer entrypoint words. Keep each description around 160 characters or less, retaining a discriminating trigger; current descriptions total 974 characters. These are review targets, not CI tests against wording. Any overrun needs a concrete retained invariant, not filler or quota padding. Word counts do not establish billing or performance.

Plan one conditional local reference: `silicon-design-review/references/interactive-checks.md`, approximately 600 words or less. It owns detailed interaction measurement procedures. Load it for reviews involving changed controls, state transitions, overlays or sticky/scroll regions; skip it for a screenshot-only or static appearance review. Do not create additional reference folders unless a substantial conditional workflow actually needs one.

Build must still state the relevant expected behaviours concisely and work without review being installed. The detailed measurement recipe has one owner; repeating a short correctness invariant where independent skills need it is acceptable. Report selected-route size including references, not just smaller roots: a specialised interactive review may need more detail than before. Do not claim every task becomes cheaper.

## Consolidated requirements

### R1 Select work by scope before choosing deliverables

Sources: [#15](https://github.com/drevendev/Silicon-Design/issues/15), its v2 comment, [#17](https://github.com/drevendev/Silicon-Design/issues/17). Owner: direction; build/review and shared handoff wording must agree.

| Assignment | Default work |
| --- | --- |
| Existing-brand screen or isolated correction | Preserve direction; produce the requested result and inspect affected behaviour. No rendered alternatives by default. |
| Open direction, new identity or explicitly requested exploration | Compare inexpensive same-content compositions; include a restrained treatment among the alternatives already justified. Develop the selected direction rather than finishing every candidate. |
| One static screen/chart | Inspect that complete frame. No invented second surface, adverse interaction or persistence test. |
| Interactive flow | Exercise changed decisions/states and relevant recovery. Additional workflows only when present in the brief or needed to validate the change. |

Low-fidelity alternatives may begin at one target viewport. Before selecting a responsive direction, check that its intended priority survives narrow reflow; do not polish every rejected candidate at every size. Honour an explicitly requested comparison scope.

Make inventory, alternative captures, component sheets, DESIGN.md updates and secondary-surface evidence conditional. Reuse existing design decisions; write a concise direction record only when actual decisions need recording. A routine fix can deliver the change, relevant check and remaining uncertainty in a short reply.

### R2 Compact operational interfaces without hiding the decision

Sources: [#12](https://github.com/drevendev/Silicon-Design/issues/12), #17. Owner: build; depth in apps guide.

For repeated-use operator work in an established brand, start with compact task structure. Rank identifiers, search keys, status and actions by actual task use. Remove bands, captions and containers that add no decision value; keep useful summaries, legends and status explanations. Put rarely used controls outside the primary band when the workflow supports that choice.

Measure visible useful rows before/after where row comparison matters, while retaining readable labels and usable targets. Row count is evidence, not an optimization score. Calendars, illustrations and independently meaningful cards may need different density. Character can live in efficiency and exactness; compactness does not prescribe tiny type or a sidebar.

### R3 Preserve semantic status and explain unfamiliar codes

Source: [#13](https://github.com/drevendev/Silicon-Design/issues/13). Owner: system; review checks resulting comprehension cues.

Keep informative semantic colour with text/shape. If a resolved pair fails its applicable contrast requirement, choose and remeasure a suitable semantic variant instead of automatically flattening all states to ink. Changing hue or saturation alone does not guarantee contrast or correct meaning.

Prefer understandable words. When a dense representation needs unfamiliar codes, provide a nearby legend and reachable item detail using supported pointer, keyboard and touch paths. An existing detail view may serve this purpose; do not mandate a tooltip on every item. Include complete/success alongside partial, unknown and blocked examples when those states belong to the product's contract.

Clarification: #13 reports 3.09:1. That number alone is not a failure of a 3:1 non-text threshold. Determine the actual pair, role and applicable requirement; ordinary text commonly requires 4.5:1, qualifying large text and relevant non-text cues 3:1, with their exceptions. Preserve existing contrast guidance and compare unrounded ratios. See W3C [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) and [text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

### R4 Verify interactive boundaries with actual input

Sources: [#14](https://github.com/drevendev/Silicon-Design/issues/14), #17. Owners: build expected behaviour; review conditional procedure.

The reference must cover:

1. **Stability:** compare meaningful regions before/after changed filters, search, modes and inspectors. Identify unexpected displacement or lost reading/selection context. Expected result removal, deliberate expansion and responsive reflow are not automatic defects.
2. **Activation:** test the label, icon and usable padding of a composite control, with keyboard activation where supported. Hit-testing helps diagnose interception; elementFromPoint alone does not prove activation. Respect separate controls within a group.
3. **Clipping:** inspect important labels and opened overlays in their actual scroll/overflow context. Source width checks are leads, not verdicts. Deliberate truncation needs a usable route to the full necessary value, not necessarily a tooltip.
4. **Sticky intersections:** scroll both axes and verify the intended corner, header and identity column remain legible without incorrect overlap.
5. **Item geometry:** comparable items should have a coherent rhythm; equal height only where the comparison benefits. Variable-length cards, expanded details and deliberate content-driven height remain valid.
6. **Recovery:** where changed, verify useful context and connected, visible focus after closing/removal/last-item undo. A source stub calling focus is not native focus evidence.

Inspect only relevant controls/transitions and broaden when failures justify it. Reuse the project's harness; no compulsory full-screen bounding-box dump or automated suite for a spacing fix.

### R5 Make data relationships readable and truthful

Source: [#18](https://github.com/drevendev/Silicon-Design/issues/18). Owner: system; build applies it to data-bearing output.

Identify quantity, unit, period, geography, scale and series. Put units where values are read; connect labels to marks through proximity or clear leaders. Check source values, totals, denominators, missing observations and stacking order. Do not silently invent data or fix a contradictory brief.

The v2 electricity unit was present in the subtitle; its nearby visible cue was weak. The 42/24 rain-garden contradiction belongs to the input. Preserve those distinctions. Chart form follows the comparison; no mandatory donut, palette or extra illustration.

### R6 Finish the landing's actual reading and action sequence

Source: [#19](https://github.com/drevendev/Silicon-Design/issues/19). Owner: build; examples/depth in websites guide.

Inspect real headline breaks, navigation, comparison groups and main actions together at target size. Group comparable choices and make destination/consequence evident. Preserve distinctions between navigation, disclosure, selection and action when those behaviours exist.

Do not equate a bigger title or expressive face with character. Use available brand material honestly; do not invent dropdown behaviour, evidence, proprietary assets or copy changes outside scope. A supplied awkward headline is an input issue, not proof that one method writes worse copy.

### R7 Check small game cues at play size

Source: [#20](https://github.com/drevendev/Silicon-Design/issues/20). Owner: game; system owns general semantic roles.

Inspect resource/weather/action symbols in their scene at intended scale. Keep distinct meanings and selected state discernible, with important names, exact costs and effects near the decision. The v2 top strip and snowflake preference are examples, not mandatory HUD placement or icon choices.

Preserve economy, progression, knowledge rules and state semantics. Static appearance cannot establish runtime, controller, save-system or player-comprehension results.

### R8 Use one finishing loop and honest evidence

Sources: #11, #16, #17; applies to build/review and scoped game work.

Inspect the main statement, useful action and critical values first; then locate the important wrapping, grouping, symbol or label problem. Correct observed defects within scope and recheck the affected state. Stop when criteria are met; do not manufacture a fixed number of findings, documents, tests or retries.

Review operation and character separately. Keep relative preference, acceptance, input compliance, information correctness and taste distinct. Read comments on winning artifacts. Report actual checked/failed/untested status; source checks, palette math and screenshots cannot substitute for unperformed input or accessibility tests. Preserve uncertain capture fidelity and test-adapter mistakes as separate limitations.

## File ownership and removals

| File or group | Change |
| --- | --- |
| direction SKILL.md | Put R1 first; retain concise subject-specific selection criteria. Remove unconditional alternative/inventory/second-surface handoff lists and repeated rationale. |
| system SKILL.md | Combine semantic roles, resolved contrast and use-size type; add concise R3/R5 outcomes. Keep token/format claims truthful. |
| build SKILL.md | Lead with scope/existing identity; one R2/R4/R6/R8 implementation loop. Collapse duplicate journey, state, craft and delivery lists. |
| review SKILL.md | State appearance versus interactive scope, actionable findings and evidence boundaries; route conditional measurement to its local reference. |
| game SKILL.md | Retain exact game truth, relevant input/runtime checks and coherent scene/UI; add R7 and remove repeated general product-process prose. |
| review references/interactive-checks.md | Add the conditional R4 procedure and meaningful positive/negative examples, not a full browser tutorial. |
| docs/workflow.md, docs/adoption.md | Align scope/routing and portable-folder copying. Do not prescribe reading all five skills or every handbook foundation. |
| docs/products/apps.md, websites.md | Maintain detailed R2/R6 examples without making one product layout universal. |
| checklists/design-review.md, templates/DESIGN.md, templates/REVIEW.md | Make alternate/sheet/second-flow fields conditional; group specialised checks by applicability. A checklist must not reintroduce work removed from SKILL.md. |
| research registers | Record trial/official-source links and exact source snapshots; keep history outside runtime instructions. |

Remove hard-coded first-trial anecdotes from entrypoints once their useful invariant is retained. Keep detailed theme-inheritance, narrow-priority and last-item-undo evidence in existing handbook/benchmark records. Do not remove the invariants to meet a word target.

## Implementation order

1. Snapshot skill hashes, word/metadata sizes and source issue revisions before edits.
2. Fix scope and handoff contradictions across skills, workflow, templates and checklist; then consolidate duplicate instruction blocks.
3. Implement the bounded density/status/interaction/chart/landing/game requirements with the ownership above.
4. Add only the conditional interaction reference; update source records and compare loaded material for representative routes.
5. Run structural checks and scoped behavioural evaluation. Keep failed cases and revise only where an observation supports a change.

No product redesign, new generation batch, private-artifact publication, skill installation or issue closure is part of writing this specification.

## Acceptance and evaluation

### Authoring gate

- All five names and independent portability are preserved. No compulsory sibling skill, network handbook fetch or new commercial tool.
- Source-to-requirement coverage includes #12–#15, #17–#20 and the #15 comment; the reports remain separate.
- Before/after size report addresses the 2,200-word target and description clarity, without expanding references by default.
- Run `python tools/check.py` and skill-creator `quick_validate.py` on changed skill folders. Run repository unit tests if tools or their data contracts change; inspect narrow/wide and update verification if a specimen changes.
- Validate real behaviours, not wording/heading/regex conformity. A structural pass does not establish effective generation.

### Behavioural cases for the subsequent implementation

| Request | Expected observation |
| --- | --- |
| Correct a label/spacing in an existing-brand screen | No exploration, invented workflow or new design-document bundle; affected check only. |
| Redesign one established-brand operator screen | One final direction; useful compact structure, retained semantic cues, no unsolicited rendered alternatives. |
| Establish an open visual direction | Inexpensive same-content alternatives include a restrained treatment; selection uses visible relationships, selected responsive priority survives reflow. |
| Review an interactive table/board with search, popover and sticky column | Load the interaction reference; locate seeded interception/clipping/overlap and reject deliberate reflow as a false positive. |
| Review a static screenshot | Appearance findings only; no claims of tested activation, focus, screen reader or runtime. |
| Render a coded status matrix | Understandable codes and reachable detail; semantic colours plus other cues; truthful success/partial/unknown examples. |
| Build a chart and a landing from fixed copy/data | Visible units/attached labels and a clear reading/action sequence; no invented values/assets or unauthorised copy rewrite. |
| Fix a game status icon | Distinguishable use-size cue, unchanged resources/rules and no expanded game workflow. |

Include a working full-area control and deliberately variable-height cards as negative controls. These cases define what to observe; running independent agents or a paid benchmark requires the evaluation's own authorized scope and resources. No automatic reruns until a preferred result appears.

### Claim gate after implementation

Use fresh frozen briefs in different subjects, matched current/revised Silicon and a no-skill/short baseline, with equal model/material/tool/budget conditions. A matched rerun of reported losses is diagnostic; it does not replace held-out work. Keep selected originals and assisted revisions frozen and distinct.

Record available tokens, elapsed time, tool calls, produced alternatives and loaded context separately. Mark unavailable billing rather than substitute word counts. Predeclare cost tolerance and comparison rules before generation; #11's cost ratios are observations, not universal guarantees.

Retain winner/tie/comments and report participant count, negative comments on winners, failures and limits. Do not pool v2 B with A or import #11's clear/slight and statistical summaries into another design. Passing the authoring gate makes the package ready for evaluation; it does not prove a win or justify closing outcome-based issues.

## Source snapshot

Reviewed 2026-11-07. The local ledger `research/skill-improvement-spec-2026-11-07.sources.json` records issue update times/body hashes, the #15 comment, baseline skill hashes/counts and dated official sources. The tested skill baseline is `5d0d30a01b5bc9129a7abb3c8911c68b43addb15`; issue revisions and live documentation are separately dated, not represented by that commit. Benchmark archives and participant comments do not belong in installed skill context.

