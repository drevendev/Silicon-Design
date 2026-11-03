(() => {
  const { stops, createBook, toggleKeep, saveNote } = FieldNotes;
  const book = createBook();
  const params = new URLSearchParams(location.search);
  let direction = ['atlas', 'contact', 'reading'].includes(params.get('direction')) ? params.get('direction') : 'atlas';
  let view = params.get('view') === 'book' ? 'book' : 'street';
  const journal = document.querySelector('#journal');
  const photo = (className = '', position = 'center') => {
    const detail = stops.find(s => s.crop === position);
    const alt = detail ? `Detail of the ${detail.name.toLowerCase()} in an imagined street photograph.` : 'Imagined street after closing: a blue shutter, a chair beside a doorway and plants at the waterline.';
    return `<img class="${className}" src="assets/field-notes-alley.jpg" alt="${alt}" style="object-position:${position};transform-origin:${position}">`;
  };
  const keep = (i) => `<button class="keep" data-keep="${i}" aria-pressed="${book.kept.includes(i)}">${book.kept.includes(i) ? 'Kept · remove' : 'Keep observation'}<span aria-hidden="true">${book.kept.includes(i) ? '−' : '+'}</span></button>`;
  const noteForm = () => `<form class="note-form" novalidate><label for="margin">Your margin note</label><textarea id="margin" maxlength="300" rows="3" placeholder="What did you notice?" aria-describedby="note-help note-error"></textarea><p id="note-help">Up to 300 characters. Saved in this visit's field book.</p><p id="note-error" class="error" role="alert"></p><button class="solid" type="submit">${book.note ? 'Update note' : 'Save note'}</button></form>`;
  const header = () => `<header class="journal-header"><button class="wordmark" data-view="street">Field<span>Notes</span><i aria-hidden="true">↗</i></button><span class="edition">An imagined walk / After closing</span><button class="book-link" data-view="${view === 'book' ? 'street' : 'book'}">${view === 'book' ? '← Back to the street' : `Field book <b>${book.kept.length}</b>`}</button></header>`;
  const map = () => `<div class="street-map" aria-label="Schematic of the imagined street; select an observation"><svg viewBox="0 0 440 500" aria-hidden="true"><path class="building" d="M0 0H137L149 203 115 218 128 500H0ZM440 0H255L277 169 305 213 287 500H440Z"/><path class="roof" d="M26 38H112V152H35ZM27 275L92 267 103 396 36 404ZM292 42H417V144H303ZM330 248H416V433H318Z"/><path class="shutter-mark" d="M115 163L146 161 150 210 119 214ZM118 177L147 175M119 186L148 184M120 196L148 194"/><path class="route" d="M202 478C195 395 200 338 207 280S218 201 199 170 174 103 174 38"/><path class="water-mark" d="M281 465C265 392 300 357 275 292M291 453C278 405 302 369 288 330"/><path class="chair-mark" d="M279 243L300 241 300 257 282 261ZM283 260V274M299 258V270M278 243V230L296 228 299 241"/><path class="sight" d="M202 184L139 187M207 267L289 251M200 393L281 394"/></svg>${stops.map((s, i) => `<button class="map-stop map-stop-${i}" data-stop="${i}" aria-pressed="${book.selected === i}"><span>${i + 1}</span>${s.name}</button>`).join('')}<span class="map-caption">Street schematic · not a geographic map</span><span class="map-start">Start here ↑</span></div>`;
  function atlas() {
    const s = stops[book.selected];
    return `<section class="atlas"><div class="atlas-intro"><p class="eyebrow">Look, then look again.</p><h1>After<br>closing.</h1><p class="dek">A shutter, a chair, a little water.<br>Three ways into an ordinary street.</p><div class="atlas-instruction"><span aria-hidden="true">↗</span><p>Choose a mark on the street.<br>Keep what makes you stop.</p></div></div>${map()}<article class="atlas-observation"><div class="photo-window">${photo('', s.crop)}<span>Detail / ${s.name.toLowerCase()}</span></div><p class="eyebrow">Observation ${book.selected + 1} of 3</p><h2>${s.title}</h2><p class="body-copy">${s.copy}</p><p class="prompt">${s.prompt}</p>${keep(book.selected)}</article></section><section class="afterword"><h2>A field book is made of things you notice.</h2><p>Keep an observation, or leave a thought in your own words.</p>${noteForm()}</section>`;
  }
  function contact() {
    return `<section class="contact"><div class="contact-title"><p>Three details.<br>One street.</p><h1>After closing.</h1></div><div class="contact-strip">${stops.map((s, i) => `<article class="contact-frame ${book.selected === i ? 'is-selected' : ''}"><button class="frame-image" data-stop="${i}" aria-pressed="${book.selected === i}">${photo('', s.crop)}<span>Select ${s.name.toLowerCase()} <b>↗</b></span></button><div class="frame-caption"><span class="frame-number" aria-hidden="true">${i + 1}</span><h2>${s.title}</h2></div><p class="body-copy">${s.copy}</p><p class="prompt">${s.prompt}</p>${keep(i)}</article>`).join('')}</div><div class="contact-bottom"><p>Keep what belongs together.<br>Your field book follows your attention.</p><button class="solid" data-view="book">Open field book (${book.kept.length}) →</button></div></section><section class="afterword"><h2>In your own words.</h2>${noteForm()}</section>`;
  }
  function reading() {
    return `<article class="reading"><header class="reading-title"><p class="eyebrow">A short reading of an ordinary street</p><h1>After<br><em>closing.</em></h1><p class="reading-lead">A shutter, a chair, a little water.<br>Three ways into an ordinary street.</p></header><figure class="reading-figure">${photo()}<figcaption>An imagined street. The photograph is generated; the observations are authored fiction.</figcaption></figure><div class="reading-body">${stops.map((s, i) => `<section class="reading-section"><aside><button data-stop="${i}" class="section-marker" aria-pressed="${book.selected === i}">${String(i + 1).padStart(2, '0')} / ${s.name}</button><p>${s.prompt}</p>${keep(i)}</aside><div><h2>${s.title}</h2><p class="body-copy">${s.copy}</p></div></section>`).join('')}<section class="reading-section margin-section"><aside><p>Some things are worth returning to.</p><button class="text-link" data-view="book">Read your field book →</button></aside><div><h2>What stays with you?</h2>${noteForm()}</div></section></div></article>`;
  }
  function fieldBook() {
    return `<section class="field-book"><div class="book-heading"><p class="eyebrow">Your visit / ${book.kept.length} of 3 observations</p><h1>What you kept.</h1><p>${book.kept.length ? 'A small record of where your attention went.' : 'A blank page, for now. Go back to the street and keep something that catches your eye.'}</p></div><div class="book-pages">${book.kept.map(i => `<article class="book-entry"><div>${photo('', stops[i].crop)}</div><section><p class="eyebrow">${stops[i].name}</p><h2>${stops[i].title}</h2><p class="body-copy">${stops[i].copy}</p>${keep(i)}</section></article>`).join('') || `<button class="empty-book" data-view="street"><span aria-hidden="true">↗</span>Go looking</button>`}<section class="book-note"><h2>In the margin</h2><p class="saved-note"></p>${noteForm()}</section></div></section>`;
  }
  function render(focusTarget) {
    document.body.dataset.direction = direction;
    document.querySelectorAll('[data-direction]').forEach(b => b.setAttribute('aria-pressed', b.dataset.direction === direction));
    journal.innerHTML = header() + (view === 'book' ? fieldBook() : ({ atlas, contact, reading }[direction])());
    journal.querySelectorAll('textarea').forEach(t => { t.value = book.draft; });
    const saved = journal.querySelector('.saved-note');
    if (saved) saved.textContent = book.note || 'No note yet. Leave one below.';
    const url = new URL(location.href);
    url.searchParams.set('direction', direction);
    if (view === 'book') url.searchParams.set('view', 'book'); else url.searchParams.delete('view');
    history.replaceState(null, '', url);
    if (focusTarget) journal.querySelector(focusTarget)?.focus({ preventScroll: true });
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.direction) { direction = b.dataset.direction; render(); }
    if (b.dataset.view) { view = b.dataset.view; render(); journal.focus(); window.scrollTo(0, 0); }
    if (b.dataset.stop !== undefined) {
      book.selected = Number(b.dataset.stop); render(`[data-stop="${book.selected}"]`);
      if (direction === 'atlas' && matchMedia('(max-width: 640px)').matches) {
        const observation = journal.querySelector('.atlas-observation');
        observation.tabIndex = -1;
        observation.setAttribute('aria-label', stops[book.selected].title);
        observation.scrollIntoView({ block: 'start' });
        observation.focus({ preventScroll: true });
      }
      announce(`Looking at ${stops[book.selected].name.toLowerCase()}.`);
    }
    if (b.dataset.keep !== undefined) {
      const i = Number(b.dataset.keep); const kept = toggleKeep(book, i);
      render(`[data-keep="${i}"]`);
      if (!journal.querySelector(`[data-keep="${i}"]`)) journal.querySelector('.book-link').focus();
      announce(`${stops[i].name} ${kept ? 'kept in' : 'removed from'} your field book. ${book.kept.length} of 3 kept.`);
    }
  });
  document.addEventListener('input', e => { if (e.target.id === 'margin') book.draft = e.target.value; });
  document.addEventListener('submit', e => {
    if (!e.target.matches('.note-form')) return;
    e.preventDefault();
    const t = e.target.querySelector('textarea');
    if (!saveNote(book, t.value)) {
      e.target.querySelector('.error').textContent = 'Write a thought before saving your note.';
      t.setAttribute('aria-invalid', 'true'); t.focus(); return;
    }
    e.target.querySelector('.error').textContent = ''; t.removeAttribute('aria-invalid');
    e.target.querySelector('[type="submit"]').textContent = 'Update note';
    const saved = journal.querySelector('.saved-note'); if (saved) saved.textContent = book.note;
    announce('Margin note saved in your field book.');
  });
  function announce(message) { document.querySelector('#announcement').textContent = message; }
  render();
})();
