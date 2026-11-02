# A deeper read of the ten source repositories

Review date: **2 November 2026**. The first pass leaned too heavily on repository introductions. This pass inspected selected rules, skills, pattern guidance, brand analyses and a worked architecture exercise at the revisions in [revisions.json](revisions.json). We read design-relevant sections; this is not an audit of every file, a reproduction of research results, or a license to execute instructions embedded in a source skill.

The result is reflected in [24 principles](../docs/principles.md), [Character & attachment](../docs/character.md), the foundations, templates and five local skills. The source observations below are paraphrases. Proposed applications and critique exercises are our synthesis.

## 1. Anti-slop: a positive direction after the filter

Inspected the [core skill](https://github.com/miqdadbadjuber/anti-slop/blob/941b1532f9cc8ffde766bca5921d75257c9e5762/skills/antislop/SKILL.md), especially the craftsmanship criteria, direction rule and liveliness sections; the [UI skill](https://github.com/miqdadbadjuber/anti-slop/blob/941b1532f9cc8ffde766bca5921d75257c9e5762/skills/antislop-ui/SKILL.md), [copywriting](https://github.com/miqdadbadjuber/anti-slop/blob/941b1532f9cc8ffde766bca5921d75257c9e5762/skills/antislop-copywriting/SKILL.md), and [responsive-layout guidance](https://github.com/miqdadbadjuber/anti-slop/blob/941b1532f9cc8ffde766bca5921d75257c9e5762/skills/antislop-layoutmobile/SKILL.md). The small `rules/antislop.md` file is a pointer, not the complete ruleset.

**What was missing:** the source explicitly treats sterile output as an unresolved direction problem. It also asks for intentional variation, a clear focus and an identity-bearing recurring gesture. Its copy guidance discusses matching an author's actual habits, rather than merely scrubbing words.

**Transfer:** describe the product's intensity, compositional pace and movement; demonstrate a recognizable idea across states; calibrate voice from actual examples. Use a narrow layout as a designed composition. These inform P02–P05, P08–P09, P17 and P24.

**Boundary:** do not inherit the source's install/mode workflow, punctuation prohibitions, universal style quotas or inaccurate shorthand for WCAG large text. Accessibility thresholds come from W3C. Its liveliness scale is a useful design aid, not a measure of quality or affection.

## 2. Vibe: personality has a stable voice and a changing tone

Inspected [UX writing](https://github.com/mondaycom/vibe/blob/f39a2f6e2d950adced82e9e975255399ac4f1541/packages/docs/src/pages/foundations/ux-writing-handbook/ux-writing-handbook.mdx), [motion](https://github.com/mondaycom/vibe/blob/f39a2f6e2d950adced82e9e975255399ac4f1541/packages/docs/src/pages/foundations/motion/motion.mdx) and [spacing](https://github.com/mondaycom/vibe/blob/f39a2f6e2d950adced82e9e975255399ac4f1541/packages/docs/src/pages/foundations/spacing/Spacing.mdx).

**Observation:** Vibe distinguishes its enduring manner of speaking from the emotional adjustment required by announcements, errors and payments. Motion has different roles for efficient work and expressive meaning. Spacing expresses relationships as well as consistency.

**Transfer:** specify invitation, success and failure copy together. Choose the shortest useful feedback for repeated actions and reserve expressive movement for an event whose meaning benefits. Use space to connect and separate semantically. These inform P09, P15–P17 and P20.

**Boundary:** monday.com's personality and numeric durations belong to its system. Our products need their own voice and motion behavior. A linear timing curve is not inherently wrong for every use, such as a representation of uniform time.

## 3. Ant Design: certainty, agency and a satisfying process

Inspected [values](https://github.com/ant-design/ant-design/blob/ac2322ada3c1212793144c296d2429d7857576e4/docs/spec/values.en-US.md) and the pattern pages for [contrast](https://github.com/ant-design/ant-design/blob/ac2322ada3c1212793144c296d2429d7857576e4/docs/spec/contrast.en-US.md), [direct manipulation](https://github.com/ant-design/ant-design/blob/ac2322ada3c1212793144c296d2429d7857576e4/docs/spec/direct.en-US.md), [invitations](https://github.com/ant-design/ant-design/blob/ac2322ada3c1212793144c296d2429d7857576e4/docs/spec/invitation.en-US.md), [context preservation](https://github.com/ant-design/ant-design/blob/ac2322ada3c1212793144c296d2429d7857576e4/docs/spec/stay.en-US.md), [lightweight interaction](https://github.com/ant-design/ant-design/blob/ac2322ada3c1212793144c296d2429d7857576e4/docs/spec/lightweight.en-US.md), [repetition](https://github.com/ant-design/ant-design/blob/ac2322ada3c1212793144c296d2429d7857576e4/docs/spec/repetition.en-US.md), [reaction](https://github.com/ant-design/ant-design/blob/ac2322ada3c1212793144c296d2429d7857576e4/docs/spec/reaction.en-US.md), [transitions](https://github.com/ant-design/ant-design/blob/ac2322ada3c1212793144c296d2429d7857576e4/docs/spec/transition.en-US.md) and [motion](https://github.com/ant-design/ant-design/blob/ac2322ada3c1212793144c296d2429d7857576e4/docs/spec/motion.en-US.md).

**Observation:** the values address both outcomes and the experience of working toward them. The pattern guidance connects discoverability, in-context actions, immediate feedback and continuity. Contrast can be achieved by quieting secondary content; consequential decisions sometimes require visual neutrality.

**Transfer:** support discovery before an action, acknowledgement during it, and a legible result afterward. Preserve the person's working context, keep action tools near their objects, and let expertise grow. These inform P06, P08, P13–P16, P19 and P22.

**Boundary:** context preservation does not mean forcing all work into overlays or one page. Hover-reveal needs an appropriate keyboard/touch route. We do not reuse numerical claims about cognition or treat a historical pattern illustration as measured user evidence.

## 4. Primer: care is most visible when the screen is empty

Inspected [content](https://github.com/primer/design/blob/87f799f202ec95df15c99f473c9c0c803da8e6b3/content/foundations/content.mdx), [empty states](https://github.com/primer/design/blob/87f799f202ec95df15c99f473c9c0c803da8e6b3/content/ui-patterns/empty-states.mdx), [onboarding](https://github.com/primer/design/blob/87f799f202ec95df15c99f473c9c0c803da8e6b3/content/ui-patterns/feature-onboarding.mdx) and [progressive disclosure](https://github.com/primer/design/blob/87f799f202ec95df15c99f473c9c0c803da8e6b3/content/ui-patterns/progressive-disclosure.mdx).

**Observation:** the patterns distinguish first use, an ordinarily empty collection and a failure. They place onboarding near relevant work, respect dismissal and discourage derailing the task. Disclosure should retain orientation and have a clear label. The content guidance adjusts humor to the user's emotional situation.

**Transfer:** design the reason for absence, not one universal “nothing here” card. Help people reach the first meaningful result and then get out of the way. These inform P14 and P17–P20.

**Boundary:** this is archived GitHub-specific guidance. Product context determines wording and graphic choices. Its example campaign caps, icons and default phrases are not global rules. A playful first-use illustration does not justify playful failure handling.

## 5. Vibma: structure must carry the design through edits

Inspected [component structure](https://github.com/ufira-ai/Vibma/blob/cdadc728057c04c566b1e1ee8cc9ef1b1b3fe471/schema/guidelines/component-structure.md), [responsive constraints](https://github.com/ufira-ai/Vibma/blob/cdadc728057c04c566b1e1ee8cc9ef1b1b3fe471/schema/guidelines/responsive-designs.md), [token discipline](https://github.com/ufira-ai/Vibma/blob/cdadc728057c04c566b1e1ee8cc9ef1b1b3fe471/schema/guidelines/token-discipline.md) and [workflow](https://github.com/ufira-ai/Vibma/blob/cdadc728057c04c566b1e1ee8cc9ef1b1b3fe471/schema/guidelines/vibma-workflow.md).

**Observation:** unbounded content-sized parents break wrapping and responsive children. Text properties must bind to real nodes; variants must expose meaningful dimensions. Token bindings and read-back checks keep edits coherent. A successful write does not establish a correct design.

**Transfer:** define container constraints and content behavior, build editable instances, model actual state dimensions, and inspect output after mutations. These inform P21 and P24 and the system skill.

**Boundary:** Figma-specific sizing names and API commands are not CSS rules. Tool development has stopped. Preserve the constraint model without making the tool mandatory or prohibiting legitimate one-off optical adjustments.

## 6. OpenDesign: art direction needs an implementation method

Inspected [anti-generic craft guidance](https://github.com/nexu-io/open-design/blob/5a0c47777975ddb91d09c1c16b423a3ef74bf572/craft/anti-ai-slop.md), [editorial hierarchy](https://github.com/nexu-io/open-design/blob/5a0c47777975ddb91d09c1c16b423a3ef74bf572/craft/typography-hierarchy-editorial.md), [animation discipline](https://github.com/nexu-io/open-design/blob/5a0c47777975ddb91d09c1c16b423a3ef74bf572/craft/animation-discipline.md), [frontend design](https://github.com/nexu-io/open-design/blob/5a0c47777975ddb91d09c1c16b423a3ef74bf572/skills/frontend-design/SKILL.md), and the creative-director/design-review catalogue entries.

**Observation:** the craft files make choices about emphatic hierarchy, authored pace, memorable details and motion frequency. The frontend workflow asks for a specific direction followed by real states and visual refinement. Some catalogue entries only describe upstream capabilities and require another bundle to run.

**Transfer:** connect the direction to concrete craft passes, distinguish frequently used feedback from expressive moments, and review the whole composition. These inform P02–P03, P08–P12, P16 and P24.

**Boundary:** neither its hard color bans nor numeric style quotas become our rules. Editorial weight/tracking prescriptions are contextual. We did not independently reproduce its cited motion research or adopt legal/compatibility claims. No uninspected upstream skill is represented as fully reviewed or installed.

## 7. Vibecoded design tells: the replacement default is still a default

Inspected [choosing a look](https://github.com/JCarterJohnson/vibecoded-design-tells/blob/f7c4aefc2c797a66e55b49354a93917ab60d33ac/skill/references/choosing-a-look.md), selected [catalogue entries](https://github.com/JCarterJohnson/vibecoded-design-tells/blob/f7c4aefc2c797a66e55b49354a93917ab60d33ac/skill/references/tells.md), and the [method and results summary](https://github.com/JCarterJohnson/vibecoded-design-tells/blob/f7c4aefc2c797a66e55b49354a93917ab60d33ac/unslop-ai-ui/DATA_AND_GRAPHS.md).

**Observation:** its look-selection method was revised after its own palette/font suggestions became another repeated aesthetic. The catalogue and the historical frequency table answer different questions; their order is not identical. The source documents noisy matches and rejected signals.

**Transfer:** choose from real references and product material, explain substantive differences, and treat a new fashionable skin with the same skepticism as an old one. These inform P03–P04 and P24, and the [critique of our examples](specimen-critique.md).

**Boundary:** we did not rerun the corpus analysis. Vocal online opinion is not a representative usability study or proof of generated authorship. A scanner detects signatures, not whether a user will love a product.

## 8. Awesome DESIGN.md: compare visual systems, not token shopping lists

Compared the overview, type principles, spacing/shape and responsive sections in the analyses of [Nintendo 2001](https://github.com/VoltAgent/awesome-design-md/blob/fcc70284932276d085f01ef9f83edde90b1258cb/design-md/nintendo-2001/DESIGN.md), [Airbnb](https://github.com/VoltAgent/awesome-design-md/blob/fcc70284932276d085f01ef9f83edde90b1258cb/design-md/airbnb/DESIGN.md) and [Linear](https://github.com/VoltAgent/awesome-design-md/blob/fcc70284932276d085f01ef9f83edde90b1258cb/design-md/linear.app/DESIGN.md).

**Observation:** the analyses describe different organizing ideas: hardware-like panel construction, photography-led browsing, and product captures on receding surfaces. Their identity involves material, proportion, content and roles together. They also include inferred details and acknowledged gaps.

**Transfer:** describe a visual grammar that links several decisions, then demonstrate it with product-specific content. These inform P04–P05 and P08–P11. A useful DESIGN.md explains relationships as well as values.

**Boundary:** these are third-party analyses, not official brand specifications. Historical tiny text and reconstructed responsiveness are not standards for a new product. Proprietary fonts, marks, exact skins and claimed conversion effects are not adopted.

## 9. BeautifulRepo: conviction in the opening, evidence underneath

Inspected the [editorial evidence method](https://github.com/drevendev/BeautifulRepo/blob/a692491a7a973032d90545bc6f428ba6b77f706f/guides/editorial-evidence.md), relevant sections of [visual README guidance](https://github.com/drevendev/BeautifulRepo/blob/a692491a7a973032d90545bc6f428ba6b77f706f/guides/readme-visuals.md) and a [playful technical opening](https://github.com/drevendev/BeautifulRepo/blob/a692491a7a973032d90545bc6f428ba6b77f706f/examples/readme-visuals/variants/playful-technical.md).

**Observation:** it separates audience, evidence, reader consequence and voice, and compares different leads while holding facts fixed. Visuals should answer something about the product. An information structure can itself provide the visual system.

**Transfer:** make the opening specific and memorable, then give a real path into the material. Edit voice without inventing impact. These inform P01, P07, P17 and P23 and our revised README.

**Boundary:** the fictional example proves no real CLI output. A compelling promise is not evidence that our design method already works.

## 10. System Design Primer: inspect the constraint before adding machinery

Inspected the [sales-ranking exercise](https://github.com/donnemartin/system-design-primer/blob/ae9bbd7b02d90b9866215de185217d33f39ab733/solutions/system_design/sales_rank/README.md), especially scope/assumptions, view behavior, and the iterative scaling discussion.

**Observation:** the exercise states update frequency and scope before designing, then asks for measurement and bottleneck analysis before adding infrastructure.

**Transfer:** state constraints and freshness expectations; design a bounded slice; investigate the actual problem before adding complexity. These support P01, P21 and P23. The inference for a UI is to make stale, pending and current data distinguishable where it matters.

**Boundary:** this is architecture education. It contributes no visual style rules or evidence about emotional attachment. Its fictional traffic assumptions and code are not imported.

## Principle-to-source map

The IDs refer to the [principles](../docs/principles.md). Several rules already existed; the second pass made their expressive or behavioral consequences more specific.

| Principles | Primary influence in this review | What changed in our guidance |
| --- | --- | --- |
| P01 | BeautifulRepo; System Design Primer | Explicit context, stakes, scope and constraints |
| P02–P03 | Anti-slop; OpenDesign | Emotional intention and a committed direction |
| P04 | Choosing a look; brand analyses | References from the subject, not only other software |
| P05 | Anti-slop; Ant repetition; brand analyses | A recognizable idea across several states |
| P06 | Ant values/direct interaction; OpenDesign | Concentrated invention with familiar operations |
| P07 | Anti-slop; BeautifulRepo | Structure justified by actual content |
| P08–P09 | Ant contrast; Vibe spacing; OpenDesign | Decisive hierarchy and authored pace |
| P10–P11 | Existing typography/color research; brand analyses | Expressive roles and a coherent material language |
| P12 | OpenDesign craft; Vibma | A dedicated pass over small, visible decisions |
| P13–P16 | Ant invitations/direct/stay/reaction/motion; Vibe | Discoverability, context, immediate response and continuity |
| P17 | Vibe writing; Primer content; Anti-slop copy | Stable voice, context-sensitive tone, specific labels |
| P18–P20 | Primer empty states/onboarding; Ant meaning/growth | Completion, returning use, mastery and respectful delight |
| P21 | Vibma; System Design Primer | Content constraints, editable structure and proportionate complexity |
| P22 | Existing accessibility references; Ant contrast | Access, clear consequences and neutral high-stakes choices |
| P23 | BeautifulRepo; Ant reaction; Vibe motion | Evidence, time and truthful pending states |
| P24 | Choosing a look; Anti-slop; OpenDesign | Separate technical fitness from character critique |

The combined model of attachment, the cross-state character exercise, the tenth-visit review and our example critique are Silicon Design recommendations. The sources inform them; they do not establish a guaranteed emotional outcome.
