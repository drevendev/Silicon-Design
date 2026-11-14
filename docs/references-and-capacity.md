# References, reading model and capacity

Use this procedure when choosing or substantially changing a composition. It is optional depth for the standalone skills, not a prerequisite document bundle. A local correction can reuse suitable inspected references and the existing product contract.

## Find examples that answer the task

Independently look for and visually inspect relevant screens before composing, even when research was not requested. Start with the category/genre **and the concrete task**: an idle/tycoon supply shop, for example, rather than a generic dashboard containing prices. Match platform, input and content pressure where possible. Prefer first-party screenshots, a public working UI or a developer walkthrough. A text search result alone does not establish visual inspection.

Distinguish shipped UI from promotion, concept art and unknown provenance. Do not infer a game's identity, genre or successful usability from an unattributed image. If access is unavailable, record the gap and use available material with that limitation. Stop collecting once the relevant structural decision is supported; no fixed reference count or gallery is required.

Keep a brief source/revision-or-date note: task and viewing conditions, relationship learned, what transfers, what differs here. Inspect grouping, object recognition, primary action proximity, shared versus per-item information, density and repeated use. Transfer these relationships into the consuming product's palette, type, icons and components. A reference does not authorize copying assets, importing a foreign accent or inventing its search, currencies or mechanics. Keep private material local and respect source/asset rights.

## Choose how the content is read

Choose from actual fixed versus growing cardinality, object recognition versus attribute comparison, sorting/filtering needs and repeated input. A small known assortment can support a spatial card grid. A large searchable catalog can support aligned rows. Neither layout is inherently superior, and an identical item count can require different arrangements under different data/input pressure.

Before replacing a useful existing reading model, compare a cheap same-content sketch against it. This is a bounded implementation decision, not several finished variants or a new preference experiment. A local correction need not explore another identity. Name the first useful action and explain why the chosen relationships improve it.

## Work out what fits

Use the current source revision, accepted changes and real content; historical captures cannot silently override newer requirements. Carry explicit arrangement/capacity and supplied growth plans. A bounded set intended to be considered together should fit the base viewport even when the user only supplied its count and task. Distinguish this design target from a standard or a universal prohibition on scrolling.

Subtract navigation, shared header/footer, safe areas, outer padding and task-wide status from available width and height. For a candidate grid with N objects, C columns and gaps gx/gy:

```text
rows = ceil(N / C)
slot width  = (usable width  - (C - 1) * gx) / C
slot height = (usable height - (rows - 1) * gy) / rows
```

These are available slots, not a command to force equal heights. Check the actual longest name, necessary quantities/units, price, input, action and state feedback inside them. Use the product's readable type and usable targets. When content does not fit, reconsider grouping, repeated chrome and secondary detail before shrinking. Do not claim success through clipping, hidden offers, unnecessary pagination or a second scrolling list. Distinct prices/discounts must remain truthful and accessible; common explanations can share one reachable path only when actually common. Preserve functionality, balance, source values and hidden-knowledge rules.

Inspect rendered bounds and real operation at the declared base size. Narrow layouts, short windows and enlarged text may deliberately reflow and scroll. Verify that fallback separately; never preserve a desktop no-scroll target by hiding data or blocking enlargement. Content growth uses supplied plans, not invented requirements.

The original [capacity teaching fixture](../examples/capacity.html) demonstrates two different tasks: nine fixed offers at a declared 1080×800 base viewport and a large searchable/sortable catalog. It is fictional, not a redesign of a private game or evidence of a better generated design. [Verification](../examples/VERIFICATION.md) separates actual checks from untested claims.
