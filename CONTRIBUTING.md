# Contributing

Prefer a small, inspectable improvement over a larger collection of untested advice.

For a principle or guideline, describe the problem, intended context, concrete decision, exception and how to review it. For source research, use primary material where possible, record a revision/date, explain what transfers and what does not, and keep third-party rights separate. Do not import code, assets or skill text as an incidental part of adding a link.

For a skill, keep its name and description specific, its instructions self-contained, and the effort proportional to the task. Check that it preserves user intent, existing identity and authorization scope. A realistic trial is valuable; record its actual outcome instead of claiming behavioral validation from metadata checks.

For examples, mark fictional data and incomplete actions, keep local assets self-contained, and inspect the render at narrow and wide widths. Include at least one difficult content/state case. Avoid generic “before” strawmen presented as real product history.

Run from the repository root with Python 3.11+:

```sh
python -m pip install -r requirements-dev.txt
python tools/check.py
python -m unittest discover -s tests -v
python tools/activation.py validate
```

PyYAML is a pinned development/checker dependency, not an installed-skill runtime requirement. CI parses real YAML and checks each local reference within its portable folder, then checks an isolated copy without surrounding handbook/sibling skills. Optional external URLs are not fetched by offline validation.

Optional depth must match the release recorded in `skills-release.json`. After intentionally committing updated handbook material, run `python tools/skill_release.py --revision [commit] --version [new-version]` and review the generated URLs/digests. The helper validates all target documents before writing; it refuses a revision that differs from the working handbook. Do not replace immutable URLs with `master`.

The checker compares each digest with both the working document and the Git blob at the declared commit. Keep that commit's history available locally; CI uses a full-history checkout. Editing a document and its manifest digest together cannot certify an unchanged old URL.

The [routing corpus](evals/activation/README.md) is validated in normal CI without model calls. Native executions are explicit, bounded checks with retained traces and meaningful untested rows; their result is distinct from package validation and design preference.

The checker covers repository-owned inline Markdown destinations without fragments, local HTML destinations and same-document HTML fragments, required skill metadata, source revision records and declared sRGB palette pairs. It does not render Markdown, validate external URLs or Markdown fragments, inspect every CSS color combination, or certify design quality. Review those boundaries manually.

Pull requests should explain the concrete problem, resulting guidance or behavior, evidence, checks performed and relevant limits. Reconcile changes with related guides instead of duplicating rules in multiple files.

For runner or teaching-fixture changes, CI also runs the synthetic Chromium journeys (Playwright 1.62.1). Local reproduction and evidence boundaries are in [examples/craft](examples/craft/README.md) and [the synthetic whole-site demo](examples/blind-test-demo/README.md). Browser scripts accept `SILICON_BROWSER_PACKAGE` for an existing @playwright/test installation; the legacy runner script uses `BLIND_TEST_PLAYWRIGHT` pointing to its index.mjs. Run `node tests/craft.browser.mjs <report-directory>`, `node tests/blind_whole_site.browser.mjs <built-corpus-directory> <report-directory>` and `node tests/capacity.browser.mjs` from the repository root. For legacy coverage, build with `python tests/prepare_blind_runner_fixture.py <temporary-directory>` and run `node tests/blind_runner_browser.mjs <temporary-directory>/good/Blind-Test.html <temporary-directory>/broken/Blind-Test.html <report-directory>`. These are QA dependencies, not portable-skill runtime dependencies. For schema-2 locale/surface/coherence checks, build `python tests/prepare_runner_review_fixture.py <temporary-directory>` and run `node tests/blind_protocols.browser.mjs <temporary-directory> <report-directory>`. No model or human study runs in CI.
