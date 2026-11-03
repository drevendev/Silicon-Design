/* Authored teaching fixture; the street and observations are fictional. */
(function (root) {
  const stops = [
    { id: 'shutter', name: 'Shutter', title: 'A shutter wearing the weather.', copy: 'Blue paint holds in the grooves. Rust gathers at the edges. The shop is closed, but its front keeps a record of every season it has stood through.', prompt: 'Look at what time leaves behind.', crop: '0% 25%' },
    { id: 'chair', name: 'Chair', title: 'A chair keeping the doorway.', copy: 'Nobody is sitting here. Still, the chair turns a threshold into a place to stay. A small invitation, left out after the shop has closed.', prompt: 'Notice the things that make room for someone.', crop: '72% 64%' },
    { id: 'water', name: 'Waterline', title: 'A garden with no address.', copy: 'A little water follows the edge of the street. A plant has found the crack beside it. No pot, no sign, no permission: just enough room to grow.', prompt: 'Follow the water. See what follows it.', crop: '65% 100%' }
  ];
  function createBook() { return { selected: 0, kept: [], draft: '', note: '' }; }
  function toggleKeep(book, index) {
    if (!stops[index]) return false;
    const found = book.kept.indexOf(index);
    if (found < 0) book.kept.push(index); else book.kept.splice(found, 1);
    return found < 0;
  }
  function saveNote(book, value) {
    book.draft = value.slice(0, 300);
    if (!book.draft.trim()) return false;
    book.note = book.draft.trim();
    return true;
  }
  const api = { stops, createBook, toggleKeep, saveNote };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FieldNotes = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
