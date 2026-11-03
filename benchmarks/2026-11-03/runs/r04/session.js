/* Visit-only state shared by all directions and both surfaces. */
(function(root) {
  const core = typeof module !== 'undefined' && module.exports ? require('./state.js') : root.BenchmarkState;
  function createSession(fixture = 'initial', direction = 'a') {
    const state = Object.assign(core.createBook(), { book: false, error: false, feedback: '', direction });
    if (fixture === 'secondary' || fixture === 'error') state.book = true;
    if (fixture === 'error') state.error = true;
    if (fixture === 'complete') {
      state.book = true; state.kept = [0, 1, 2];
      state.note = state.draft = 'The chair makes room for someone.';
    }
    return {
      state,
      select(i) { if (Number.isInteger(i) && core.stops[i]) state.selected = i; },
      keep(i) { const added = core.toggleKeep(state, i); state.feedback = added ? core.stops[i].name + ' kept in your field book.' : core.stops[i].name + ' removed from your field book.'; return added; },
      input(value) { state.draft = String(value).slice(0, 300); state.error = false; state.feedback = ''; },
      save() { const ok = core.saveNote(state, state.draft); state.error = !ok; state.feedback = ok ? 'Margin note saved for this visit.' : ''; return ok; },
      open() { state.book = true; },
      close() { state.book = false; },
      direction(value) { if (['a','b','c'].includes(value)) state.direction = value; }
    };
  }
  const api = { createSession };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FieldSession = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
