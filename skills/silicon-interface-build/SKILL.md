---
name: silicon-interface-build
description: Implement and visually verify a website or application interface using its product direction. Use for real screens and flows, including responsive layouts, states and existing component integration.
---

# Silicon interface build

Carry design intent into working behavior. Inspect the product's DESIGN.md, framework, current UI, components, assets and content before editing. Keep changes within the requested scope. For a small correction, follow the existing direction; for missing direction on a major build, establish a concise provisional direction from the brief.

## Build a representative slice

Identify the person, task, primary information and next action. Use representative content from the product; label fictional fixtures and prototype actions. Do not manufacture testimonials, customer logos, measurements or successful integrations.

Choose structure according to content: prose for reading, rows or tables for comparison, cards for independent objects. A website should make its promise and evidence understandable; an app should expose the work and state that support an action. Preserve reliable component semantics while adapting the visual system.

Implement one complete flow with an adverse state before spreading styling across the product. Include relevant loading, empty, error, unavailable and success feedback. Preserve useful input on recoverable errors and explain unavailable actions. Use semantic controls and persistent labels.

Establish coherent type, color and spacing roles. Use assets for a specific information or identity purpose, with suitable rights and text alternatives. Keep critical content independent of decorative motion and audio.

## Inspect the result

Open the actual implementation in a browser when available. Inspect narrow, intermediate and wide layouts, content extremes and supported themes/languages. Fix overflow, weak hierarchy, awkward wrapping and incomplete states before micro-polish.

Exercise keyboard navigation, focus and a complete task/recovery path. Check relevant contrast pairs, text enlargement and reduced-motion behavior. Distinguish viewport resizing from actual browser zoom and screenshots from input testing. Run project checks appropriate to the change; do not add tests that merely repeat styling choices.

If a browser/runtime is unavailable, perform useful source checks and explicitly report that rendered behavior remains unverified. Do not replace evidence with a claim that the UI looks correct.

Deliver the implemented flow, changed surfaces, rendered evidence where available, checks performed and remaining limits. Continue fixing observed issues within scope until the flow meets its criteria.

Optional depth: [Silicon Design review checklist](https://github.com/drevendev/Silicon-Design/blob/master/checklists/design-review.md).
