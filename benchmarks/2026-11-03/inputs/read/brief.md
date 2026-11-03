# Read — Field Notes

A curious reader has a few minutes to notice an ordinary street after closing. The photograph is an imagined place. Use the three exact observations in fixture.json.

Capabilities: select any observation; keep/remove each independently; see the real kept count; open a field book with actual kept entries and a genuine empty state; save/edit a margin note up to 300 characters. Empty submission gives an inline error, focuses the textarea and preserves a previously saved note. Draft and saved note survive direction/book switching. Cyrillic and markup-like input render safely as text. Reload clears this visit.

Required test adapters: stop-0/1/2; keep-0/1/2 (where present for the object); open-book, close-book; kept-count; note-input, save-note, note-error, saved-note. No extra product features.

Fixtures: initial = fresh street with shutter selected; secondary = empty field book; error = empty-note validation shown with no keeps; complete = all three kept plus note "The chair makes room for someone." in the field book. Support real actions independently of fixture initialization.
