# Working in Silicon Design

This repository maintains a design handbook and portable agent skills. Product-specific visual identity belongs in the consuming product's DESIGN.md.

- Read the relevant foundation or product guide before changing it. Keep public handbook prose in English; README.ru.md is a concise Russian entry point.
- Distinguish standards, Silicon Design conventions, provisional starting values and contextual judgment. Do not turn a preference into an accessibility requirement.
- Ground new guidance in an inspectable example, a primary source, or a documented product observation. Record external influences in research/sources.md and research/revisions.json.
- Preserve deliberate brand decisions. Diagnose repeated defaults through their effect on a task; never fail a design solely for using a font, hue, library or layout pattern.
- Keep skills in skills/<name>/SKILL.md self-contained and portable. Their workflow must work without this checkout or a particular commercial tool. Handbook links provide optional depth.
- Match the effort to the task: an isolated correction does not need a fresh identity exercise. Do not require user approval for routine reversible design work already requested.
- Label fictional content and prototypes. Never manufacture customer quotes, outcomes, measurements or successful checks.
- After changes, run `python tools/check.py`; run `python -m unittest discover -s tests -v` when changing tools or their data contract. For specimen changes, inspect the rendered result at narrow and wide widths and update examples/VERIFICATION.md with actual checks and limits.
- Do not claim accessibility compliance from static checks or screenshots. A review reports scope, findings, evidence and untested areas.

Task routing: direction → skills/silicon-design-direction/SKILL.md; tokens and components → skills/silicon-design-system/SKILL.md; site/app implementation → skills/silicon-interface-build/SKILL.md; game UI → skills/silicon-game-ui/SKILL.md; review → skills/silicon-design-review/SKILL.md.
