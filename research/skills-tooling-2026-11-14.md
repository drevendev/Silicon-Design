# Portable skill tooling — release 2026.11.14.1

Implements the source/tooling changes from [#41](https://github.com/drevendev/Silicon-Design/issues/41)–[#45](https://github.com/drevendev/Silicon-Design/issues/45) on base `97f99ab4fb8ab753f1acab9e9363b0a840555a21`, after PR #38 and PR #40. All six packages are checked, including `blind-test`. The five design descriptions and instruction bodies are preserved apart from optional-depth URL identities.

## Changes and acceptance

| Issue | Implemented behavior | Evidence boundary |
| --- | --- | --- |
| #41 | Safe YAML parsing, mapping/field checks, useful errors, quoted/folded scalar support; PyYAML 6.0.3 is a pinned verification dependency | Malformed syntax/tags, valid quoted metadata, parsed length and type regressions are tested. No new installed-skill runtime dependency |
| #42 | Every local Markdown reference stays inside its copied skill; both source and isolated copy are checked in ordinary CI | Repository-valid/package-invalid links, missing/absolute local targets, encoded/reference-style links, fenced examples and working in-package references are covered. Optional network links are not fetched |
| #43 | Separate project/personal Claude Code/Codex paths, invocation, copy layout and discovery guidance | Codex project discovery observed natively for six packages. Personal/global paths and Claude activation remain untested; no global configuration was changed |
| #44 | Frozen 12-case EN/RU routing corpus, independent synthetic workspaces, bounded native runner, trace evidence and conservative grading | Parser/unit and corpus validation are performed. One native Codex attempt failed before a model turn; Claude was not launched. No activation rate, provider comparison or preference claim |
| #45 | Five optional-depth URLs pinned to an immutable handbook commit, release identity/digests and deliberate repinning helper | A real temporary Git-history test advances the handbook while preserving the old package URL; local drift and a forged working-file digest fail verification against the actual pinned Git blob |

The [release manifest](../skills-release.json) pins optional depth at the base commit because those target documents are unchanged. This avoids self-referencing a commit being authored. `python tools/skill_release.py --revision [commit] --version [new-version]` validates the source revision/content before writing the next release. A new handbook commit cannot silently alter an old copied skill's URL. Latest online guidance remains an intentional, labelled choice, not an automatic dependency. The core workflow still works without fetching the handbook.

## Native observations

- **Codex CLI 0.146.1 discovery:** six complete folders were placed in an isolated repository's `.agents/skills`. `codex debug prompt-input` returned all six exact project `SKILL.md` paths. No model turn was needed. Raw context remains local.
- **Codex activation:** the corpus and package hashes were retained before execution. `explicit-review-en` was attempted once through `codex exec --ephemeral --json` with configured settings. The provider rejected configured `gpt-6.1-sol` as unsupported for that CLI/account route. Exit code 1 and failed-turn evidence mean **unobserved**; the remaining 11 cases were not launched. No model substitution or retry occurred.
- **Claude Code 2.1.259:** authentication was expired. The owner explicitly selected opening the PR with activation untested. No model request, login/configuration change or global skill installation was performed.

These are host-specific observations. Installed executables, valid metadata and visible skill listings do not prove implicit activation. Unit trace fixtures qualify the parser rules only. Unsupported tool trace formats, auth/provider failures and incomplete runs cannot pass negative controls. The runner preserves attempts instead of overwriting results.

## Verification

Local verification passed 41 Python tests and nine existing Node state tests, plus the repository/package/release checker, corpus validation, module entrypoint and whitespace checks. All 173 existing benchmark/example/blind-runner files are byte-identical to the base; all six skill bodies/discovery descriptions are preserved except the five optional-depth URLs.

The [machine receipt](skills-tooling-2026-11-14.verification.json) records actual checks and scope. Normal CI installs the development requirement, checks repository/YAML/package/release contracts, runs the Python and existing Node suites, and validates the corpus **without model calls**. Native execution is a separate explicit action documented in the [corpus guide](../evals/activation/README.md).

Historical benchmarks, example implementations and the blind-runner implementation remain unchanged. New synthetic fixtures are task inputs for routing, not candidate designs or evidence of visual quality. Source fixes do not complete Claude/personal-host discovery, cross-model activation, the original internal-product reruns, native device/AT work, billing parity or human design acceptance.

#41/#42/#45 have deterministic implementation coverage. #43/#44 retain the native-host acceptance limits above; do not close them merely because source validation is green. [#23](https://github.com/drevendev/Silicon-Design/issues/23) still owns generation/runtime/preference evidence. No held comparative experiment or user recruitment was started.

## PR #46 review corrections

The [external review of `48f007b`](https://github.com/drevendev/Silicon-Design/pull/46#pullrequestreview-5906901492) demonstrated that echo/grep mentions could pass as Codex skill reads. The adapter now binds paths to read operands within a bounded shell grammar. Ambiguous/partial commands stay unobserved; regressions cover both positive cases and negative controls. The review also tightened Claude directory identity and POSIX case handling. These are parser-fixture checks, not completed native activation.

Two additional verification gaps were fixed: vacuous positive/ill-typed corpus cases are rejected before native execution, and release digests are compared with the declared Git commit as well as the working handbook. CI fetches the history needed for that offline check. The original failed native trace is retained and regraded as unobserved; prompts, fixtures and skill packages used by that attempt remain unchanged. Evaluator documentation changed to describe the supported grammar.

## Sources

Reviewed 14 November 2026: [official Codex skills documentation](https://learn.chatgpt.com/docs/build-skills), [Codex CLI reference](https://learn.chatgpt.com/docs/cli/reference), [Claude Code skills](https://code.claude.com/docs/en/skills), [Claude CLI reference](https://code.claude.com/docs/en/cli-reference), [OpenAI skill evals](https://developers.openai.com/blog/eval-skills), [Anthropic authoring practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices). Installed CLI help was checked before commands. The native installed versions may lag current web documentation; untested host capabilities are not assumed. No vendor documentation, third-party skill body, private corpus or asset is bundled.
