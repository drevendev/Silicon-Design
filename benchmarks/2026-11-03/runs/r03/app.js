/* All task state is in memory. A reload intentionally starts the selected QA fixture. */
(() => {
  'use strict';
  const api = BenchmarkState;
  const params = new URLSearchParams(location.search);
  let direction = ['a', 'b', 'c'].includes(params.get('direction')) ? params.get('direction') : 'a';
  const fixture = ['initial', 'secondary', 'error', 'complete'].includes(params.get('fixture')) ? params.get('fixture') : 'initial';
  const state = api.createBook();
  let bookOpen = fixture === 'secondary' || fixture === 'complete';
  let error = fixture === 'error';
  let savedFeedback = false;
  if (fixture === 'complete') {
    state.kept = [0, 1, 2];
    state.note = state.draft = 'The chair makes room for someone.';
  }
  const $ = id => document.getElementById(id);
  const numeral = i => String(i + 1).padStart(2, '0');
  const kept = i => state.kept.includes(i);
  const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  $('fixture-label').textContent = `QA fixture: ${fixture}`;
  function keepButton(i) {
    return `<button class="keep-button ${kept(i) ? 'is-kept' : ''}" data-testid="keep-${i}" data-keep="${i}" aria-pressed="${kept(i)}">${kept(i) ? 'Remove from field book' : 'Keep observation'}<span aria-hidden="true">${kept(i) ? '−' : '+'}</span></button>`;
  }
  function tabs() {
    return `<nav class="stop-nav" aria-label="Select an observation">${api.stops.map((s, i) => `<button data-testid="stop-${i}" data-stop="${i}" aria-pressed="${state.selected === i}"><span class="stop-number">${numeral(i)}</span><span>${s.name}</span>${kept(i) ? '<span class="kept-mark" aria-label="Kept">✓</span>' : ''}</button>`).join('')}</nav>`;
  }
  function observation(i, heading = 'h2') {
    const s = api.stops[i];
    return `<div class="observation"><p class="section-label">Observation ${numeral(i)} / ${s.name}</p><${heading}>${s.title}</${heading}><p class="observation-copy">${s.copy}</p><p class="observation-prompt">${s.prompt}</p>${keepButton(i)}</div>`;
  }
  function margin() {
    return `<section class="margin"><p class="section-label">In your own words</p><h2>A note in the margin.</h2><form id="note-form" novalidate><label for="note-input">What did you notice?</label><textarea id="note-input" data-testid="note-input" maxlength="300" rows="4" aria-describedby="note-hint note-error" aria-invalid="${error}">${escape(state.draft)}</textarea><div class="note-meta"><span id="note-hint">Up to 300 characters.</span><span id="note-length">${state.draft.length}/300</span></div><p id="note-error" data-testid="note-error" class="note-error" role="alert" ${error ? '' : 'hidden'}>Write a note before saving. Your saved note has not changed.</p><button class="save-button" data-testid="save-note" type="submit">${state.note ? 'Save changes' : 'Save margin note'}</button><span class="save-feedback" role="status">${savedFeedback ? 'Saved for this visit.' : ''}</span></form><div class="saved-block" ${state.note ? '' : 'hidden'}><h3>Saved margin note</h3><p data-testid="saved-note" id="saved-note"></p></div><p class="visit-hint">A small record, just for this visit.</p></section>`;
  }
  function renderReader() {
    $('spatial-stops').innerHTML = '';
    if (direction === 'b') {
      $('reader').innerHTML = `<p class="index-intro">Choose an observation to bring its detail into view.</p><div class="index-list">${api.stops.map((s, i) => `<article class="index-entry ${state.selected === i ? 'selected' : ''}"><button class="index-select" data-testid="stop-${i}" data-stop="${i}" aria-pressed="${state.selected === i}"><span class="stop-number">${numeral(i)}</span><span>${s.name}</span><span class="index-state">${state.selected === i ? 'Looking here' : 'Look closer'}</span></button><div class="index-content"><h2>${s.title}</h2><p class="observation-copy">${s.copy}</p><p class="observation-prompt">${s.prompt}</p>${keepButton(i)}</div></article>`).join('')}</div>`;
    } else {
      $('reader').innerHTML = `${direction === 'a' ? tabs() : ''}${observation(state.selected)}${direction === 'c' ? '<p class="spatial-hint">Choose a numbered point in the photograph.</p>' : ''}`;
      if (direction === 'c') $('spatial-stops').innerHTML = api.stops.map((s, i) => `<button class="photo-point point-${i}" data-testid="stop-${i}" data-stop="${i}" aria-pressed="${state.selected === i}" aria-label="Look at ${s.name}"><span>${numeral(i)}</span><span class="point-name">${s.name}</span></button>`).join('');
    }
    $('hero-photo').style.objectPosition = direction === 'b' ? api.stops[state.selected].crop : 'center';
  }
  function renderBook() {
    $('book-count').textContent = `${state.kept.length} of 3`;
    $('entries').innerHTML = state.kept.length ? api.stops.map((s, i) => kept(i) ? `<article class="book-entry"><div class="book-thumb"><img src="assets/field-notes-alley.jpg" width="1122" height="1402" alt="Detail of the imagined street: ${s.name.toLowerCase()}." style="object-position:${s.crop}" loading="lazy"></div><div><p class="section-label">${numeral(i)} / ${s.name}</p><h3>${s.title}</h3><p>${s.copy}</p><p class="observation-prompt">${s.prompt}</p>${keepButton(i)}</div></article>` : '').join('') : `<div class="empty-book"><span class="empty-zero" aria-hidden="true">0</span><h3>Nothing kept. Yet.</h3><p>Your field book begins with what catches your eye. Return to the street and keep an observation.</p><button class="text-button" data-close>Look at the street <span aria-hidden="true">↗</span></button></div>`;
  }
  function render() {
    document.body.dataset.direction = direction;
    document.body.classList.toggle('book-open', bookOpen);
    document.querySelectorAll('[data-direction]').forEach(button => button.setAttribute('aria-pressed', button.dataset.direction === direction));
    document.querySelector('[data-testid="kept-count"]').textContent = state.kept.length;
    $('open-book').setAttribute('aria-expanded', bookOpen);
    $('street').hidden = bookOpen;
    $('book').hidden = !bookOpen;
    $('street-margin').innerHTML = '';
    $('book-margin').innerHTML = '';
    if (bookOpen) {
      $('reader').innerHTML = '';
      $('spatial-stops').innerHTML = '';
      renderBook();
    } else {
      $('entries').innerHTML = '';
      renderReader();
    }
    $(bookOpen ? 'book-margin' : 'street-margin').innerHTML = margin();
    $('saved-note').textContent = state.note;
    $('note-input').addEventListener('input', event => {
      state.draft = event.target.value.slice(0, 300);
      $('note-length').textContent = `${state.draft.length}/300`;
      savedFeedback = false;
      document.querySelector('.save-feedback').textContent = '';
    });
    $('note-form').addEventListener('submit', event => {
      event.preventDefault();
      const success = api.saveNote(state, $('note-input').value);
      error = !success;
      savedFeedback = success;
      $('note-error').hidden = success;
      $('note-input').setAttribute('aria-invalid', !success);
      if (!success) { $('note-input').focus(); return; }
      $('saved-note').textContent = state.note;
      document.querySelector('.saved-block').hidden = false;
      document.querySelector('.save-feedback').textContent = 'Saved for this visit.';
      document.querySelector('[data-testid="save-note"]').textContent = 'Save changes';
    });
  }
  function focusMain() { $('main').focus(); window.scrollTo({top:0, behavior:'instant'}); }
  function closeBook() { bookOpen = false; render(); $('open-book').focus(); window.scrollTo({top:0, behavior:'instant'}); }
  document.addEventListener('click', event => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.dataset.direction) {
      direction = target.dataset.direction;
      const url = new URL(location.href);
      url.searchParams.set('direction', direction);
      history.replaceState(null, '', url);
      render();
      document.querySelector(`[data-direction="${direction}"]`).focus();
    } else if (target.hasAttribute('data-stop')) {
      state.selected = Number(target.dataset.stop);
      const index = state.selected;
      render();
      document.querySelector(`[data-testid="stop-${index}"]`).focus();
      $('status').textContent = `Looking at ${api.stops[index].name}.`;
    } else if (target.hasAttribute('data-keep')) {
      const index = Number(target.dataset.keep);
      const added = api.toggleKeep(state, index);
      render();
      const replacement = document.querySelector(`${bookOpen ? '#book' : '#street'} [data-testid="keep-${index}"]`);
      if (replacement) replacement.focus(); else $('close-book').focus();
      $('status').textContent = `${api.stops[index].name} ${added ? 'kept in' : 'removed from'} your field book. ${state.kept.length} kept.`;
    } else if (target.id === 'open-book') { bookOpen = true; render(); focusMain(); }
    else if (target.id === 'close-book' || target.hasAttribute('data-close')) closeBook();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && bookOpen) closeBook(); });
  render();
})();
