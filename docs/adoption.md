# Adopt the handbook and skills

## Start small

Select a real product and one representative flow. Keep its existing brand, component library and engineering conventions unless changing them serves the task. Create a product DESIGN.md from the [template](../templates/DESIGN.md), then use the relevant skill by giving an agent its SKILL.md or a local path.

The handbook is a reference, not configuration that must be installed globally. A link in project instructions can point to a pinned revision or a vendored copy. Record the revision you adopted so future changes are deliberate.

## Skill packaging

`skills/<name>/SKILL.md` is the complete operational entry point for each skill. Every skill works by itself; optional online handbook links add depth. Copy the entire chosen folder if supporting resources are added later. Do not copy the repository's AGENTS.md into a product: it governs maintaining this handbook.

For an agent that supports project-local `.agents/skills`, place the chosen folder there. For example, from a project root in PowerShell, with a Silicon-Design checkout next to that project:

```powershell
New-Item -ItemType Directory -Force -Path .agents/skills
Copy-Item -LiteralPath ../Silicon-Design/skills/silicon-design-direction -Destination .agents/skills/ -Recurse
```

Check the destination first if that skill is already present; compare changes before replacing an installed version. Follow the agent's current discovery instructions for other locations. No installer, plugin manifest or commercial integration is supplied in this initial version.

You can also use a skill without installation by explicitly asking an agent to read its local SKILL.md. Whether an agent automatically discovers or invokes it depends on that agent; the files do not guarantee execution.

## Useful project instruction

Adapt this text to the product's instruction file without replacing existing rules:

```text
For interface work, read the project's DESIGN.md and use the relevant
Silicon Design skill installed in this project. Preserve existing identity
and functional requirements. Scale design exploration to the change.
Inspect the rendered result and report actual checks and untested areas.
```

## Keep the feedback

After using the skills, save concrete failures and successful decisions. Propose handbook changes with the task, artifact, observed behavior and expected improvement. A single project's accent color should not become a global rule.
