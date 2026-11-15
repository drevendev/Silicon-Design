# Seven complete synthetic websites

This is original **QA-only** content with a new study/corpus identity. No models, Scriptorium generations, owner votes or private media were used. Every session is forced to `qa:true` and excluded from human analysis.

From this folder run `python -m http.server --bind 127.0.0.1`, then open [the runner](http://127.0.0.1:8000/Blind-Test.html). Whole-site mode needs local HTTP for genuine nested routes, assets and JSON; opening the HTML as `file:` explains that requirement. Nothing is published externally.

The intro declares a selected **complete round robin: 21 whole-site ballots, zero surface and zero set ballots**. Each side navigates Atlas → Guide → About independently; each page’s Inspect action loads its relative JSON. Navigating never changes the current pair, ballot count or answer draft. Left/Tie/Right saves a draft; only Next records. Reload retains drafts, comments and cursor. Early stop and export remain available.

The `selected/` folder supplies a distinct two-pair corpus with explicitly listed sides; it does not inherit answers from the 21-pair study. Import its corpus JSON into the main runner (the runtime packages are identical), or serve that folder directly. The viewer rejects corrupt/incompatible sessions and runtime packages before replacing current progress.

Reproduce both folders with `python tests/prepare_whole_site_fixture.py examples/blind-test-demo` from the repository root. The portable [protocol](../../skills/blind-test/references/protocol.md) explains schema 2 / protocol 3 and builder configuration. Generated HTML/corpora include the runner digest and file manifests; regenerate after runner changes. No private source directory is embedded. Runtime candidates are trusted static builds with no shared saved state; a real application needing isolated storage or a backend requires an equal explicit adapter/origin contract.

The [browser test](../../tests/blind_whole_site.browser.mjs) exercises actual HTTP navigation, scripts/assets, drafts, separate Next, reload/resume, exports/imports, smaller pair sets, early stopping and storage denial. Scheduler tests verify that 126 ballots occur only for explicitly selected five surfaces plus coherence. These are runtime/contract observations, not design preference results.
