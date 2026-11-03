(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  const fixtures = {
    initial: { timber: 8, resin: 3, phase: 'unmade' },
    secondary: { timber: 2, resin: 1, phase: 'crafted' },
    error: { timber: 4, resin: 1, phase: 'unmade' },
    complete: { timber: 2, resin: 1, phase: 'lit' }
  };
  const labels = { initial: 'Initial fixture · 8 timber / 3 resin', secondary: 'Secondary fixture · made, journal open', error: 'Insufficient fixture · 4 timber / 1 resin', complete: 'Complete fixture · lit, journal open' };
  const fixture = Object.hasOwn(fixtures, params.get('fixture')) ? params.get('fixture') : 'initial';
  let state = { ...fixtures[fixture] };
  let start = fixture === 'error' ? { timber: 4, resin: 1 } : { timber: 8, resin: 3 };
  let direction = ['a', 'b', 'c'].includes(params.get('direction')) ? params.get('direction') : 'a';
  $('fixture').value = fixture;
  $('fixture-label').textContent = labels[fixture];
  $('journal').open = fixture === 'secondary' || fixture === 'complete';

  function setDirection(next, updateURL) {
    direction = next;
    document.body.dataset.direction = direction;
    document.querySelectorAll('[data-direction-link]').forEach(link => {
      const d = link.dataset.directionLink;
      if (d === direction) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
      const url = new URL(location.href);
      url.searchParams.set('direction', d);
      link.href = url.pathname + url.search + url.hash;
    });
    if (updateURL) {
      const url = new URL(location.href);
      url.searchParams.set('direction', direction);
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }

  function render(message) {
    const made = state.phase !== 'unmade';
    const lit = state.phase === 'lit';
    const insufficient = state.timber < 6 || state.resin < 2;
    $('timber').textContent = state.timber;
    $('resin').textContent = state.resin;
    $('bridge').dataset.phase = state.phase;
    $('bridge').setAttribute('aria-label', 'The footbridge scene, ' + state.phase);
    $('world').src = lit ? 'assets/mosslight-world-lit.jpg' : 'assets/mosslight-world.jpg';
    $('world').alt = lit ? 'A warm lantern hangs from the iron hook beside the forest footbridge, lighting the path at dusk.' : 'A forest workshop at dusk beside a footbridge, with an empty iron hook waiting for a lantern.';
    $('phase-tag').textContent = lit ? 'Lit' : made ? 'Crafted' : 'Unmade';
    $('scene-caption').textContent = lit ? 'A lantern now lights the way across.' : made ? 'The lantern is made. The hook is waiting.' : 'An empty iron hook waits beside the path.';
    $('make').disabled = made || insufficient;
    $('hang').disabled = state.phase !== 'crafted';
    $('make').firstChild.textContent = made ? 'Lantern made ' : 'Make lantern ';
    $('hang').firstChild.textContent = lit ? 'Lantern hung ' : 'Hang lantern ';
    $('make-step').classList.toggle('is-done', made);
    $('hang-step').classList.toggle('is-done', lit);
    $('make-state').textContent = made ? '6 timber and 2 resin used' : insufficient ? 'Blocked · need 6 timber and 2 resin' : 'Ready at the workbench';
    $('hang-state').textContent = lit ? 'The bridge already has a lantern' : made ? 'Ready · no extra materials' : 'Make the lantern first';
    $('completion-title').hidden = !lit;
    $('completion-copy').hidden = !lit;
    const normal = lit ? 'This bridge already has a lantern. 2 timber and 1 resin remain.' : made ? 'Lantern made. 2 timber and 1 resin remain. Hang it on the iron hook; no extra materials are needed.' : insufficient ? 'Not enough materials. You have 4 timber and 1 resin; making needs 6 timber and 2 resin. Begin again to restore 8 timber and 3 resin.' : 'Ready to make. Making uses 6 timber and 2 resin, leaving 2 timber and 1 resin.';
    $('game-status').textContent = message || normal;
    $('feedback').classList.toggle('is-error', !made && insufficient);
    $('feedback').classList.toggle('is-lit', lit);
    $('journal-summary').textContent = lit ? 'Made & hung' : made ? 'Made · not hung' : 'Not yet made';
    $('record-made-title').textContent = made ? 'Lantern made' : 'Not yet made';
    $('record-made').textContent = made ? 'Used 6 timber and 2 resin, once. 2 timber and 1 resin remain. The lantern is ready for the bridge.' : insufficient ? 'Making is blocked: 4 timber and 1 resin are available, but 6 timber and 2 resin are needed. No materials have been spent.' : 'Making will use 6 timber and 2 resin, leaving 2 timber and 1 resin. No materials have been spent.';
    $('record-hung-title').textContent = lit ? 'Lantern hung' : 'Not yet hung';
    $('record-hung').textContent = lit ? 'Hung on the iron hook beside the footbridge. No extra materials were used. This bridge already has a lantern.' : made ? 'The made lantern is waiting. Hang it on the iron hook when you are ready. Hanging uses no extra materials.' : 'Make the lantern before taking it to the bridge. Hanging uses no extra materials.';
    $('start-timber').textContent = start.timber;
    $('start-resin').textContent = start.resin;
    $('used-timber').textContent = made ? 6 : 0;
    $('used-resin').textContent = made ? 2 : 0;
    $('left-timber').textContent = state.timber;
    $('left-resin').textContent = state.resin;
  }

  $('make').addEventListener('click', () => {
    const result = BenchmarkState.makeLantern(state);
    if (result.error) return render(result.error);
    state = result.state;
    render();
    $('hang').focus({ preventScroll: true });
  });
  $('hang').addEventListener('click', () => {
    const result = BenchmarkState.hangLantern(state);
    if (result.error) return render(result.error);
    state = result.state;
    render();
    $('game-status').tabIndex = -1;
    $('game-status').focus({ preventScroll: true });
  });
  $('reset').addEventListener('click', () => {
    state = BenchmarkState.createGame();
    start = { timber: 8, resin: 3 };
    render('Beginning again: 8 timber and 3 resin. Ready to make; the iron hook is empty.');
    $('make').focus();
  });
  $('close-journal').addEventListener('click', () => {
    $('journal').open = false;
    document.querySelector('[data-testid="open-journal"]').focus();
  });
  document.querySelectorAll('[data-open-journal]').forEach(link => link.addEventListener('click', () => { $('journal').open = true; }));
  document.querySelectorAll('[data-direction-link]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setDirection(link.dataset.directionLink, true);
  }));
  $('fixture').addEventListener('change', () => {
    const url = new URL(location.href);
    url.searchParams.set('fixture', $('fixture').value);
    url.searchParams.set('direction', direction);
    url.hash = '';
    location.href = url.pathname + url.search;
  });
  setDirection(direction, false);
  render();
})();
