const test = require('node:test');
const assert = require('node:assert/strict');
const { createBook, toggleKeep, saveNote } = require('../examples/field-notes-data.js');
test('keeps are unique, removable, bounded and local to a visit', () => {
  const a = createBook(), b = createBook();
  assert.equal(toggleKeep(a, 1), true);
  assert.equal(toggleKeep(a, 1), false);
  assert.deepEqual(a.kept, []);
  toggleKeep(a, 2); toggleKeep(a, 0); toggleKeep(a, 8);
  assert.deepEqual(a.kept, [2, 0]); assert.deepEqual(b.kept, []);
});
test('empty edits preserve the saved note and retain the editable draft', () => {
  const book = createBook();
  assert.equal(saveNote(book, '  Сад у воды.  '), true);
  assert.equal(book.note, 'Сад у воды.');
  assert.equal(saveNote(book, '   '), false);
  assert.equal(book.note, 'Сад у воды.'); assert.equal(book.draft, '   ');
  assert.equal(saveNote(book, '<b>Street</b>'), true);
  assert.equal(book.note, '<b>Street</b>');
});
