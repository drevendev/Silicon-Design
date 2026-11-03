---
name: silicon-design-review
description: Review a product's design or implemented interface for task clarity, identity, hierarchy, states and access. Use for evidence-based critique, prioritized findings and verification of requested design fixes.
---

# Silicon design review

Review against the product's task, direction and constraints. Inspect its DESIGN.md and actual interface when available. State the reviewed flow, revision, platform, viewport/resolution, theme, language and input methods. A supplied screenshot permits an appearance review only.

## Observe before prescribing

Exercise a representative task and a failure/recovery state. Inspect content order, hierarchy, type readability, semantic color use, density, identity, responsive behavior and state completeness. Test relevant keyboard, focus, scaling and motion behavior directly when the environment permits it.

Treat generic-looking patterns as diagnostic questions. Explain how an interchangeable hero, excessive containers or undifferentiated accents affect this product. A hue, font, component library, gradient or card is not a defect on its own. Preserve deliberate choices that work.

Review operation and character separately. For character, inspect the emotional intention, subject-specific content, composition, image language, voice and behavior together. Follow the recognizable idea beyond the introduction into the task, a difficult state and completion where present. Identify exactly what remains interchangeable; do not accept a generic rationale such as “serif means warmth” as sufficient evidence of identity.

Walk through repeated use. Check whether help, praise, motion or waiting now gets in the way; whether an empty view means completion, first use, no matches or failure; and whether tone respects the situation. A task-specific detail may express care through efficiency or clarity. No mascot, joke, animation or theme change is required.

## Report useful findings

Each finding needs a specific observation and reproduction, user consequence, bounded correction, evidence and confidence. Separate confirmed defects from hypotheses and taste preferences. Prioritize:

- Blocking: prevents a key task, access or truthful feedback.
- Major: materially harms comprehension, efficiency, readability or the recorded identity.
- Polish: smaller coherence or craft issues.

Attach visual findings to a selector/source path or marked screenshot region, with fixture state, viewport and expected visible correction. After a fix, capture that same state and label the result resolved, partial or unresolved. Distinguish geometric fidelity, interpretation of the brief and aesthetic judgment. A vague instruction to make the whole screen less generic is not a reproducible finding.

Do not invent a beauty score, “AI probability” or user research result. Avoid duplicate findings and do not inflate speculative preferences into blockers.

## Fix and verify within scope

For a review-only request, report findings without changing implementation. If fixes are requested or already authorized, apply bounded corrections and repeat the affected checks. Do not demand a fresh approval for each routine reversible fix. Leave broad direction changes outside a narrow repair unless they are required to solve the reported problem.

Record checks as checked, failed, untested or inapplicable, with supporting details. Distinguish palette math from rendered contrast, viewport resize from actual zoom, and visual captures from keyboard or screen-reader tests. If rendering is unavailable, say so and provide the useful source-level findings.

Review retained same-brief alternatives when exploration was in scope. Different products or different palettes alone cannot establish diversity. Inspect the entire artifact, a second meaningful surface and ordinary/repeated/returning work; identify the persistence boundary. Classify necessary versus decorative small text. For a benchmark claim, inspect matched baseline artifacts and human preference/task evidence; leave superiority unproven when those runs are absent.

Deliver the important findings first, link evidence, explain fixes and remaining limits, and give separate scoped conclusions about usefulness/access and character/care. The latter can remain weak while the former passes. Label aesthetic judgments and emotional-effect hypotheses; do not claim user affection, recall or improved retention without real observations. A clean static check does not establish accessibility compliance, successful usability testing or design quality.

Optional depth: [review template](https://github.com/drevendev/Silicon-Design/blob/master/templates/REVIEW.md).
