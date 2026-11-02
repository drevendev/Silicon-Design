# Dispatch — fictional operations app

## Context

An operator needs to identify and inspect the next unresolved case. The specimen shows a fictional queue with realistic labels and differing states. It has local expandable details, without a backend or a claim of persisted work.

## Direction

A clear operations ledger: left-aligned system sans, aligned rows, compact metadata and a strong case title. Warm orange marks the queue's current work context; written status and ordering communicate urgency. Avoid a chart wall when the next action is a record.

A grid of large case cards was considered, but would weaken scanning across priority, owner and action. The ledger gives up rich per-case imagery for comparison and density.

## System and behavior

- System sans for all reading roles; tabular numerals for case IDs and counts.
- Cool background `#edf1f4`, white rows, ink `#172b35`, supporting text `#4e606b`, action `#9a3d0a`.
- A bounded content width, 1rem text, clear rules between records, and larger hit areas on disclosure controls.
- Native details/summary provides a keyboard-operable route to each record's next step. A long case title wraps without hiding the status.
- On narrow layouts, rows stack in DOM order. Labels remain visible and no data is silently dropped.
- No network, authentication, saved changes, full search or application navigation is implemented.

## Evidence

[Specimen](specimen.html), [palette data](palettes.json) and [verification](VERIFICATION.md). A complete record-resolution flow remains a task for a real application.
