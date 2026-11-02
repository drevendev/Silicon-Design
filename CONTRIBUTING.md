# Contributing

Prefer a small, inspectable improvement over a larger collection of untested advice.

For a principle or guideline, describe the problem, intended context, concrete decision, exception and how to review it. For source research, use primary material where possible, record a revision/date, explain what transfers and what does not, and keep third-party rights separate. Do not import code, assets or skill text as an incidental part of adding a link.

For a skill, keep its name and description specific, its instructions self-contained, and the effort proportional to the task. Check that it preserves user intent, existing identity and authorization scope. A realistic trial is valuable; record its actual outcome instead of claiming behavioral validation from metadata checks.

For examples, mark fictional data and incomplete actions, keep local assets self-contained, and inspect the render at narrow and wide widths. Include at least one difficult content/state case. Avoid generic “before” strawmen presented as real product history.

Run from the repository root with Python 3.11+:

```sh
python tools/check.py
python -m unittest discover -s tests -v
```

The checker covers repository-owned inline Markdown destinations without fragments, local HTML destinations and same-document HTML fragments, required skill metadata, source revision records and declared sRGB palette pairs. It does not render Markdown, validate external URLs or Markdown fragments, inspect every CSS color combination, or certify design quality. Review those boundaries manually.

Pull requests should explain the concrete problem, resulting guidance or behavior, evidence, checks performed and relevant limits. Reconcile changes with related guides instead of duplicating rules in multiple files.
