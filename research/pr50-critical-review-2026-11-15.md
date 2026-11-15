# Critical follow-up review of PR #50

Reviewed starting head: `1008dc4da2a851da50d941f358a74ca748eccd49`. Scope: the original release request, its thirteen selected issues and PR #4/#24 integration, implementation, contracts, and evidence. This is a corrective code/evidence review, not a new generation, owner vote, independent approval or release publication.

## Findings and corrections

| Finding at the reviewed head | Consequence | Correction and regression coverage |
| --- | --- | --- |
| The whole-site locale selector reloaded `site.entry` for every language | A selected RU condition could display English sites and export a misleading requested locale. A new browser reproduction failed with actual `en` versus selected `ru`. | The builder accepts per-locale `site_entries` and emits packaged `site.entries`; the parent loads the actual selected entry on both sides. Missing multilingual mappings fail explicitly. Genuine EN/RU HTML pages, not screenshots, exercise this in `blind_protocols.browser.mjs`. |
| Evidence recorded the outer viewport, while Fit used the smaller pane as the actual website viewport; mobile 200 still used 390 px | A 1440 px browser window could be mistaken for 1280 px desktop sites, and one width control had no effect | Each pane displays measured inner width/height and the document's declared language. Whole-site answers include optional `runtime_display` evidence. Tests verify desktop 1280×720, mobile 390×844 and mobile 780×844, and record Fit dimensions separately. These controls resize frames; they do not apply native browser zoom. |
| Route-history validation rejected any string containing `://` | A valid relative route with `?source=https://…` could make the current session unexportable | Reject absolute/out-of-package route forms while accepting URL-valued query data. Contract and actual HTTP-navigation/export tests cover this case; navigation still does not create ballots. |
| Initial corpus validation ran before the error handler | Malformed startup input could throw and leave an inert page without the useful error state | Validate inside the async startup verification path. The browser now checks a useful error and disabled Start with no uncaught page error. |
| Python accepted malformed supplementary capture records that JavaScript rejected; schema 2 inherited undeclared product defaults | The builder could emit an unusable viewer or invent conditions instead of requiring the declared study contract | Align object/PNG/schema validation, require explicit schema-2 surfaces/locales/views, validate locale entry paths, and reject invalid inputs before writing output. Legacy schema-1 defaults and valid older single-locale packages remain readable. |
| Schema-2 single-surface and multi-surface/coherence had only scheduler-level coverage | Green CI did not establish that the new UI could submit/resume those answer types or enforce their selected coherence contract | Add actual browser journeys for 21 single-surface ballots, 105 five-surface ballots without coherence, and 126 with explicitly selected coherence. For the latter, Next stays disabled until all five surfaces display on both sides; a recorded set answer survives reload. Synthetic pixels prove display mechanics, not human attention or design coherence. |
| Old receipts had broad shared hash lists and lacked the inner-frame conditions | Provenance and viewing conditions were less precise than the request required | Preserve those receipts as initial-revision evidence. New review receipts use source lists scoped to each executed script, identify immutable source revisions, and distinguish outer viewport from actual site frames. No old result is relabeled as a new pass. |

The synthetic browser cases retain draft choices/comments, distinct Next, technical defects, skips, early stop, reload/resume, strict corpus/protocol import isolation and storage-denied export. Contract tests separately include a valid non-QA analysis control and exclusion of `qa:true` sessions. No human vote file is generated or published.

## Other acceptance reviewed

The existing same-data workshop/chart/link corrections and PR #24 board/operator/matrix/landing/icon/recovery fixtures remain bounded demonstrations. Their source values and capabilities are unchanged by this follow-up. The critical comparison remains explicit: duplicate state/help/frame chrome is removed while visible instructions, exact amounts, blocked/unknown/zero distinctions, price-buff association, input targets and actual focus survive. Natural heights, deliberate scrolling, existing useful backgrounds and alignment remain valid; there is no universal grid, card, green or font ban. The affected browser suites are rerun; unchanged historical screenshots are not claimed as fresh inspection.

PR #4's facts/knowledge, draft/commit/refusal, achievable teaching/resume, accepted feedback and recovery contracts remain conditional. No tutorial, save runtime or backup infrastructure was added merely to fill the handbook. Both PR #24 exploration status statements distinguish its historical scaled iframe from the later full-size checks. Private-source correction and separate attribution of Scriptorium, Codex #37 and Claude #39 remain intact. All thirteen issues and PRs #4/#24 stay open for their unverified product/owner/effectiveness criteria.

## Packaging and evidence

Version remains **2026.11.15.1**, prepared in the existing open PR. The five optional-depth document versions did not change, so their verified pin to `ac944d4b7d2893d6442c858fad1c3d58edd3a7f5` remains correct. No pinned commit is rewritten. The regenerated synthetic corpora get new content identities; old sessions are not moved onto them. Keep the pinned Git history reachable under the eventual merge method.

The five design entrypoints remain 2,070 whitespace words. This review adds 16 essential words about actual locale pages/frame evidence to blind-test: 577 → 593 (509 → 593 versus master). Metadata/routing descriptions remain unchanged, and the detail stays in its portable bundled protocol. No administrative questionnaire, approval gate or model call is added.

Fresh source-bound results and captures are retained in [the review evidence directory](../examples/craft/evidence/pr50-review/). The initial release receipts remain under their original names. Final-head checks and CI status are also summarized in PR #50.

Remaining limits: trusted static-site output over local HTTP; backends, absolute deployment-root paths and shared saved state need equal explicit adapters/origin isolation. HTML language metadata is not proof of translation quality. No native browser zoom, physical device, AT/controller, human learning, general generation effectiveness, cost or explicit owner acceptance is established. The PR remains open without merging, tagging or publishing.

## Executed verification

Corrected implementation commit: `548ea0bbde09e9f77445f7b80286fa61a0d71778`. New receipt source hashes were compared with that Git commit before publication. Later evidence prose does not change these runtime bytes.

| Scope | Actual result | Receipt |
| --- | --- | --- |
| Source/contracts/portability | 43 Python tests and 15 Node tests pass; handbook/isolated-folder/pinned-blob checks pass; 12 activation-corpus cases valid; whitespace checks pass | [Entrypoint measurement](../examples/craft/evidence/pr50-review/entrypoint-size.json); final-head CI in the PR |
| New protocol/condition suite | Five browser scenarios pass: real EN/RU entries and frame conditions, single surface, explicit coherence, no coherence, malformed startup | [Protocol observations](../examples/craft/evidence/pr50-review/protocol-browser.json) |
| Seven-site runner | Navigation, drafts/Next, defects, imports/exports, resume, selected pairs, early stop and unavailable-storage fallback pass again | [Whole-site observations](../examples/craft/evidence/pr50-review/whole-site-browser.json) |
| Legacy runner | Existing four grouped browser scenarios pass again without schedule reinterpretation | [Legacy observations](../examples/craft/evidence/pr50-review/legacy-browser.json) |
| Craft examples | All ten recorded scenarios pass again; example source values/capabilities remain unchanged | [Craft observations](../examples/craft/evidence/pr50-review/craft-browser.json) |
| Capacity | All ten existing EN/RU scenarios pass again | [Capacity observations](../examples/craft/evidence/pr50-review/capacity-browser.json) |

Actual local environment: Windows, Python 3.14.7, Node 24.19.0, Playwright 1.62.1 and Chromium 151.0.7922.34. Browser default zoom and DPR are 100% and 1. New protocol viewport is 1440×1000; site widths are tested at 1280, 390 and 780 CSS px with 720/844 px height. In the seven-site default Fit case the 1440×1000 wrapper contains two **694×720** site viewports; the 390×844 wrapper stacks two **369×720** site viewports. These measured values are in the new receipts and screenshots, not inferred from the wrapper size. Declared HTML language and frame dimensions are observed metadata, not a translation/attention/accessibility claim.

Both failure reproductions occurred before correction: the browser observed English under a selected RU condition, and the builder emitted a malformed supplementary-capture corpus. The new regressions pass after correction. No old receipt is used as verification of these new paths, and no new design generation or owner evaluation occurred.
