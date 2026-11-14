# Skill activation regression corpus

This bounded routing check is separate from design preference, product adoption and the held comparative study in #23. Twelve original synthetic EN/RU cases cover explicit calls, implicit requests, adjacent requests and no-design controls. The sixth `blind-test` skill is a separate route/control, not a mandatory design stage.

Each case declares a required skill family and permitted set; negative cases permit none. Legitimate helper combinations can be allowed explicitly. Freeze expectations before runs and change descriptions only for retained observed misses.

Validate without model calls:

```sh
python tools/activation.py validate
```

Prepare independent local projects without launching a host:

```sh
python tools/activation.py prepare --host claude --output ../silicon-activation-claude-inputs
```

Run an explicitly requested native check in a fresh output directory:

```sh
python tools/activation.py run --host codex --output ../silicon-activation-codex --timeout 90
```

Use `--host claude` for Claude Code or `--case review-en` for a subset. The runner uses configured host model/settings, separate fixture projects, one process per selected case, no retries and a 90-second default timeout. It does not edit global skill/configuration folders. Output directories cannot be overwritten. Authentication/provider errors and timeouts are `unobserved`, not passing negative controls or skill losses. Infrastructure failure stops calls and retains unrun IDs; no model fallback is performed.

`inputs.json` freezes corpus/package hashes before execution. Selected cases retain JSONL, stderr, exit status, observed skills and trace hashes. Keep raw traces local: native user/system context can appear there. Publish only permitted sanitized receipts. Record actual host/model/settings and catalogue limitations; a default setting does not prove a model completed a turn. Other installed skills may remain visible, so this is not a clean-context provider comparison.

The scorer reads successful Codex command-execution events for exact project skill paths, or confirmed Claude `Skill`/`Read` results with matching package identity. A same-name global package cannot qualify the frozen project package. Assistant prose, file listing, failed reads and incomplete runs do not prove activation. Unit trace fixtures test parser rules, not hosts. An unseen trace format needs inspection and a retained parser regression; unsupported tool events remain unobserved. Regrade saved traces after adapter fixes rather than regenerating a preferred result. Timeout cleanup targets the owned process/tree and reports any platform restriction on descendant cleanup; it does not certify provider-side billing or cancellation.

Codex automatic grading supports simple full-file `cat` and `Get-Content` commands, including bounded `bash/sh -c/-lc` and `pwsh/powershell -Command` wrappers. The exact package path must be a read operand. Echo/printf, comments, listings and grep-only mentions cannot qualify it. Pipelines, compound commands, substitutions, partial reads and unrecognised scripts mentioning `SKILL.md` remain `unobserved`, including on negative controls; inspect their retained traces before extending the adapter. Claude `Skill` results must report the exact project base directory, and POSIX paths are case-sensitive. Positive cases must declare a nonempty required family; explicit calls have exactly one target.

## Performed coverage for 2026.11.14.1

- Codex CLI 0.146.1: native metadata discovery observed for all six project-local packages.
- Codex activation: the first explicit case was attempted once; the provider rejected configured `gpt-6.1-sol` before a model turn completed. It is unobserved; the remaining 11 cases were not launched.
- Claude Code 2.1.259: installed, authentication expired. The owner requested a PR with activation explicitly untested; no Claude model request was launched.
- Personal/global installations, other configurations and new human design acceptance remain untested.

The [implementation record](../../research/skills-tooling-2026-11-14.md) separates deterministic checks, discovery and activation. Sources: [OpenAI skill evals](https://developers.openai.com/blog/eval-skills), [Claude authoring evaluations](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices). This corpus does not authorize an unattended generation batch or resume a blind comparison.
