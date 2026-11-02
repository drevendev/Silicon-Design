# Three directions, three jobs

Open [specimen.html](specimen.html) in a browser, or serve the repository root locally:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Then visit [the specimen](http://127.0.0.1:8765/examples/specimen.html). The page has no external assets, fonts, libraries or network calls. Stop the local server with Ctrl+C.

All names, content and quantities are **fictional teaching data**. These are small compositional specimens, not working versions of the imagined products. Website navigation jumps to local content, the app exposes record details, and the game has a labelled local crafting demonstration.

| Specimen | Person and task | Direction and tradeoff | Filled brief |
| --- | --- | --- | --- |
| Field Notes | A reader choosing a field essay | Editorial serif, reading column and chapter rhythm; fewer simultaneous entries | [Direction](field-notes.DESIGN.md) |
| Dispatch | An operator choosing the next case to resolve | Aligned records, visible priority and plain status; less atmospheric imagery | [Direction](dispatch.DESIGN.md) |
| Mosslight | A player deciding whether to craft a lantern | Dark workshop surface, warm light and explicit costs; a static panel cannot establish playfield legibility | [Direction](mosslight.DESIGN.md) |

The [palette file](palettes.json) gives semantic roles and declared contrast pairs. The specimen's inline CSS uses the same hex values; a structural check catches value drift but does not prove every rendered combination. These are examples of decisions, not three presets to apply to every new project.

[Verification and limits](VERIFICATION.md)
