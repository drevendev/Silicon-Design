(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const fixture = ['initial','secondary','error','complete'].includes(params.get('fixture')) ? params.get('fixture') : 'initial';
  const direction = ['a','b','c'].includes(params.get('direction')) ? params.get('direction') : 'a';
  const session = FieldSession.createSession(fixture, direction);
  const s = session.state, stops = BenchmarkState.stops;
  const app = document.querySelector('#app');
  const names = {a:'Street & margin', b:'Three small readings', c:'Observation index'};
  const number = i => String(i + 1).padStart(2, '0');
  const keepButton = i => `<button class="keep ${s.kept.includes(i) ? 'is-kept' : ''}" data-action="keep" data-index="${i}" data-testid="keep-${i}" aria-pressed="${s.kept.includes(i)}"><span aria-hidden="true">${s.kept.includes(i) ? '✓' : '+'}</span> ${s.kept.includes(i) ? 'Remove from field book' : 'Keep observation'}</button>`;
  const stopButton = i => `<button class="stop ${s.selected === i ? 'selected' : ''}" data-action="select" data-index="${i}" data-testid="stop-${i}" aria-pressed="${s.selected === i}"><span class="stop-num">${number(i)}</span><span>${stops[i].name}</span><span class="stop-sign" aria-hidden="true">${s.kept.includes(i) ? '✓' : '↗'}</span></button>`;
  const observation = (i, tag = 'h2') => `<div class="observation"><p class="eyebrow">Observation ${number(i)} <span>/ 03</span></p><${tag}>${stops[i].title}</${tag}><p class="copy">${stops[i].copy}</p><p class="prompt">${stops[i].prompt}</p>${keepButton(i)}</div>`;
  const photo = (cls = '', crop = '50% 50%') => `<img class="street-photo ${cls}" src="assets/field-notes-alley.jpg" alt="An imagined narrow street: a weathered blue shutter, a wooden chair beside a doorway, and plants along a small water channel." style="object-position:${crop}">`;
  const intro = () => `<p class="eyebrow">A street after hours</p><h1>After closing.</h1><p class="intro">A shutter, a chair, a little water. Three ways into an ordinary street.</p>`;
  const wrapper = () => `<aside class="demo" aria-label="Prototype controls"><span>Fictional teaching prototype <span class="fixture">· QA fixture: ${fixture}</span></span><nav aria-label="Design direction"><span class="direction-label">View</span>${['a','b','c'].map(d=>`<button data-action="direction" data-direction="${d}" data-testid="direction-${d}" aria-pressed="${s.direction===d}" title="${names[d]}">${d.toUpperCase()}<span class="direction-name"> ${names[d]}</span></button>`).join('')}</nav></aside>`;
  const header = () => `<header class="masthead"><a class="wordmark" href="?direction=${s.direction}&fixture=${fixture}" data-action="home" aria-label="Field Notes, return to street"><span class="brand-mark" aria-hidden="true">f.</span>Field Notes</a><span class="mast-caption">An ordinary place.<br>A closer look.</span><button class="book-link" data-action="${s.book ? 'close' : 'open'}" data-testid="${s.book ? 'close-book' : 'open-book'}">${s.book ? '← Back to street' : 'Field book'} <span class="count" data-testid="kept-count" aria-label="${s.kept.length} observations kept">${s.kept.length}</span>${s.book ? '' : '<span aria-hidden="true">↗</span>'}</button></header>`;
  const footer = () => `<footer><span>Authored fictional observations · Generated photograph</span><span>Your keeps and margin note last for this visit only. Reload clears them.</span></footer>`;
  const margin = () => `<section class="margin" aria-labelledby="margin-title"><div class="margin-heading"><span class="eyebrow">In the margin</span><span class="small">Your own noticing</span></div><h2 id="margin-title">Leave a little of your own.</h2><form id="note-form" novalidate><label for="note-input">Margin note</label><textarea id="note-input" data-testid="note-input" maxlength="300" rows="4" placeholder="What caught your attention?" aria-describedby="note-help note-error" aria-invalid="${s.error}"></textarea><div class="note-meta"><span id="note-help">Up to 300 characters · This visit only</span><span id="note-length">${s.draft.length}/300</span></div><p class="error" data-testid="note-error" id="note-error" ${s.error ? '' : 'hidden'}>Write a margin note before saving.</p><button class="save" type="submit" data-testid="save-note">${s.note ? 'Save edited note' : 'Save margin note'} <span aria-hidden="true">↗</span></button><p class="save-feedback" role="status">${s.feedback === 'Margin note saved for this visit.' ? s.feedback : ''}</p></form><div class="saved" ${s.note ? '' : 'hidden'}><span class="eyebrow">Saved margin note</span><p data-testid="saved-note"></p></div></section>`;
  function streetA() {
    return `<main id="main" tabindex="-1" class="main-a"><section class="scene-a"><div class="photo-frame">${photo()}<div class="scene-title">${intro()}</div><span class="image-caption">Imagined street / after closing</span></div></section><section class="reading-a" aria-label="Explore observations"><div class="reading-top"><span class="eyebrow">Look / Keep / Notice</span><span class="small">Three observations</span></div>${observation(s.selected)}<nav class="stops" aria-label="Choose an observation">${stops.map((_,i)=>stopButton(i)).join('')}</nav><p class="book-invitation">Keep what catches your attention.<br>Find it again in your field book.</p></section></main>`;
  }
  function streetB() {
    return `<main id="main" tabindex="-1" class="main-b"><section class="opening-b"><div>${intro()}</div><div class="opening-image">${photo()}<span class="image-caption">An imagined place</span></div></section><div class="reading-label"><span>Three small readings</span><span>Choose a detail. Keep what stays with you.</span></div><section class="strips" aria-label="Street observations">${stops.map((st,i)=>`<article class="strip ${s.selected===i?'active':''}"><div class="strip-nav">${stopButton(i)}</div><div class="strip-picture">${photo('',st.crop)}</div>${observation(i)}</article>`).join('')}</section></main>`;
  }
  function streetC() {
    return `<main id="main" tabindex="-1" class="main-c"><aside class="index-c"><div>${intro()}</div><nav class="stops" aria-label="Observation index">${stops.map((_,i)=>stopButton(i)).join('')}</nav><p class="index-note">The shop is closed.<br>There is still something to read.</p></aside><section class="canvas-c" aria-label="Selected observation"><div class="index-photo">${photo('',stops[s.selected].crop)}<span class="image-caption">${number(s.selected)} / ${stops[s.selected].name}</span></div><div class="index-reading">${observation(s.selected)}</div></section></main>`;
  }
  function book() {
    const entries = s.kept.slice().sort((a,b)=>a-b).map(i=>`<article class="book-entry"><div class="entry-number">${number(i)}</div><div><p class="eyebrow">${stops[i].name}</p><h2>${stops[i].title}</h2><p class="copy">${stops[i].copy}</p><p class="prompt">${stops[i].prompt}</p>${keepButton(i)}</div></article>`).join('');
    return `<main id="main" tabindex="-1" class="book-page"><section class="book-cover"><div class="book-photo">${photo()}</div><div class="book-cover-text"><p class="eyebrow">Field Notes / After closing.</p><h1>Your<br>field book.</h1><p>What you chose to keep.</p><div class="book-tally"><strong>${number(s.kept.length-1)}</strong><span>${s.kept.length===1?'observation':'observations'} kept<br>this visit</span></div></div></section><div class="book-interior"><section class="entries" aria-label="Kept observations"><div class="section-rule"><span class="eyebrow">Kept observations</span><span class="small">${s.kept.length} of 3</span></div>${entries || `<div class="empty"><span class="empty-lines" aria-hidden="true"></span><p class="eyebrow">Nothing kept yet</p><h2>A little room<br>for what you notice.</h2><p>Keep an observation from the street.<br>It will be waiting here.</p><button class="text-button" data-action="close">Return to the street <span aria-hidden="true">↗</span></button></div>`}</section>${margin()}</div></main>`;
  }
  function render(focus) {
    document.body.dataset.direction = s.direction;
    document.body.dataset.surface = s.book ? 'book' : 'street';
    app.innerHTML = wrapper() + header() + (s.book ? book() : ({a:streetA,b:streetB,c:streetC}[s.direction])()) + footer();
    const input = app.querySelector('#note-input');
    if (input) input.value = s.draft;
    const saved = app.querySelector('[data-testid="saved-note"]');
    if (saved) saved.textContent = s.note;
    if (focus) app.querySelector(focus)?.focus({preventScroll:true});
  }
  function announce(text) { document.querySelector('#announcement').textContent = text; }
  app.addEventListener('click', e => {
    const b = e.target.closest('[data-action]');
    if (!b) return;
    const action = b.dataset.action, i = Number(b.dataset.index);
    if (action === 'direction') {
      session.direction(b.dataset.direction);
      const url = new URL(location.href); url.searchParams.set('direction',s.direction); history.replaceState(null,'',url);
      render(`[data-testid="direction-${s.direction}"]`);
    } else if (action === 'select') { session.select(i); render(`[data-testid="stop-${i}"]`); announce(stops[i].name+' selected.'); }
    else if (action === 'keep') { session.keep(i); render(s.book && !s.kept.includes(i) ? '#main' : `[data-testid="keep-${i}"]`); announce(s.feedback); }
    else if (action === 'open') { session.open(); render('#main'); window.scrollTo(0,0); }
    else if (action === 'close' || action === 'home') { e.preventDefault(); session.close(); render('[data-testid="open-book"]'); window.scrollTo(0,0); }
  });
  app.addEventListener('input', e => {
    if (e.target.id !== 'note-input') return;
    session.input(e.target.value);
    e.target.setAttribute('aria-invalid','false');
    app.querySelector('#note-error').hidden = true;
    app.querySelector('#note-length').textContent = `${s.draft.length}/300`;
    app.querySelector('.save-feedback').textContent = '';
  });
  app.addEventListener('submit', e => {
    if (e.target.id !== 'note-form') return;
    e.preventDefault();
    const ok = session.save(); render(ok ? '[data-testid="save-note"]' : '#note-input');
    announce(ok ? s.feedback : 'Write a margin note before saving.');
  });
  render();
})();
