# Reconciliation of PR #4 and PR #24

Reviewed on 15 November 2026 against merged master `4b8ee8e85f5f31134f9aadd06bd84e39cfd3c624`. Read both PR descriptions, every changed-file entry, issue discussions, inline comments and submitted reviews. This is a content-transfer audit, not an independent design approval or a new experiment.

| Original contribution | Exact source | Transfer finding |
| --- | --- | --- |
| [PR #4](https://github.com/drevendev/Silicon-Design/pull/4), 13 files | `a6aa5413f706bb36e3a3ab578dd0c18eb3c9f023`, base `ee9afa471e0cf8465aefe45715df4392c9ec11d2` | All substantive contracts and provenance corrections are incorporated. Correct the principle count and restore the explicit follow-up links. |
| [PR #24](https://github.com/drevendev/Silicon-Design/pull/24), 35 files | `18fa2c6aa56b9119453ad0874415cb9a62e7d47e`, base `1d0f408016f5761766ab7b0400fd0b03be625b53` | All 35 paths exist; 29 Git blobs are identical. Restore the omitted historical register object; the six differing files preserve the contribution with the corrections and integration described below. |

## PR #4: semantic reconciliation

| Changed source paths | Current destination and decision |
| --- | --- |
| `docs/behavioral-contracts.md`, `docs/principles.md` | All 31 nonblank original behavioral-guide lines and P25–P28 remain. The guide adds attribution; the introduction now correctly counts 28 principles. |
| `README.md`, `ROADMAP.md` | The behavioral guide and practice record remain discoverable. Restore the explicit #1–#3 roadmap links and their future-work boundary; update the PR integration status. |
| `checklists/design-review.md`, `templates/DESIGN.md`, `templates/REVIEW.md` | Consequential-flow prompts retain authoritative facts/knowledge, draft/commit/stale refusal, required choices, achievable teaching/resume, accepted-event feedback and honest recovery/transport. Condensed prompts point to the complete guide instead of duplicating it. Existing control/overlay checks separately retain visible-label and input evidence. |
| `docs/products/games.md`, `docs/adoption.md` | Game truth, feedback independence, product-owned rules/runtime and adoption/migration boundaries survive in the current wording. Exact commitment totals now follow the stronger current visible-value rule. |
| `research/our-practice.md`, `research/platform-practice.md`, `research/revisions.json`, `research/sources.md` | Private source citations remain removed; the removed register record is absent. The complete practice text remains with historical attribution. Current source notes distinguish private observations, fictional examples and actual evidence. |

The historical exact-head approval covered documentation only. It is not carried forward as approval of new runtime work. Follow-ups #1–#3 remain separate and open.

## PR #24: differences from the preserved head

- `board-fixed.html` and `recovery.html` retain their original interactions and add viewport/narrow-layout fixes. They preserve the deliberate variable-height negative control.
- `exploration.html` corrects **both** inaccurate verification-status claims identified by the historical request-changes review. Performed 1280×720 browser and 390×844 iframe-at-80% observations stay distinct from unperformed device, native zoom, assistive-technology and consumer acceptance. Later checks have their own receipts.
- `research/skill-forward-validation-2026-11-07.md` retains its entire original report after a historical-attribution header.
- `research/revisions.json` now also retains the original `forward_validation` object exactly: evaluated skill revision, date, paths, scope and observation-record path. The release-integration entry alone had not preserved that complete metadata.
- `research/sources.md` links the port, its exact head and historical/fresh evidence boundaries through the release and this reconciliation record.

All 22 original evidence files, six unchanged fixtures including the original board, and the machine-readable research observations are byte-identical. No original screenshot or observation is rewritten. The [later source-bound craft checks](../examples/craft/evidence/pr50-review/craft-browser.json) exercise the ported fixtures separately.

No useful original contribution remains exclusive to either head after these corrections. Closing the superseded PRs does not complete #23's matched evaluation or any unperformed product, human, cost, device or assistive-technology acceptance. Their original commits and reviews remain available through GitHub PR records.

## Verification

- The transfer audit checks all 48 original changed-file entries, the 29 exact PR #24 Git blobs, complete original guide/report text, the restored metadata object, all 28 principle IDs, follow-up links and both corrected status statements. Compare canonical Git blobs rather than Windows checkout line endings.
- `python tools/check.py` passes with the pinned PyYAML verification dependency: links, metadata, isolated packages, source revisions and 20 declared palette pairs. The first local invocation lacked that dependency; it was rerun using the existing verification dependency directory.
- `node tests/craft.browser.mjs` passes all 10 grouped observations, including ported board label/icon/padding/Enter/Space activation, menu placement, two-axis sticky paint order, detail/recovery focus and search retention. Runtime files are unchanged from merged master. Local rerun: Windows, Python 3.14.7, Node 24.19.0, Playwright 1.62.1, Chromium 151.0.7922.34, DPR 1 and default 100% browser scale. This is input/geometry coverage, not a fresh human pixel critique, device or assistive-technology trial.
- `git diff --check` passes. This follow-up changes documentation and provenance only; installed skill bodies, optional-depth pins, historical evidence and release assets are unchanged. The follow-up PR's hosted CI supplies final-commit verification before integration and retirement of the old heads.
