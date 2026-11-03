(function () {
  'use strict';
  var $ = function (selector) { return document.querySelector(selector); };
  var params = new URLSearchParams(window.location.search);
  var fixtures = ['initial', 'secondary', 'error', 'complete'];
  var fixture = fixtures.includes(params.get('fixture')) ? params.get('fixture') : 'initial';
  var direction = ['a', 'b', 'c'].includes(params.get('direction')) ? params.get('direction') : 'a';
  var state;
  var start;
  var model = window.BenchmarkState;
  var scene = $('#scene');
  var journal = $('#journal');
  var make = $('[data-testid="make"]');
  var hang = $('[data-testid="hang"]');
  var opener = $('[data-testid="open-journal"]');
  function setText(id, value) { document.getElementById(id).textContent = value; }
  function updateURL() {
    var url = new URL(window.location.href);
    url.searchParams.set('direction', direction);
    url.searchParams.set('fixture', fixture);
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  }
  function changeDirection(next) {
    direction = next;
    document.body.dataset.direction = direction;
    document.querySelectorAll('.directions button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.direction === direction));
    });
    // Keep DOM and keyboard reading order aligned with each composition.
    if (direction === 'b') { scene.append($('#lead'), $('#bench'), $('#world')); }
    else { scene.append($('#lead'), $('#world'), $('#bench')); }
    updateURL();
  }
  function render() {
    var made = state.phase !== 'unmade';
    var lit = state.phase === 'lit';
    var short = state.timber < 6 || state.resin < 2;
    scene.dataset.phase = state.phase;
    setText('timber', state.timber); setText('resin', state.resin);
    make.disabled = made || short;
    hang.disabled = state.phase !== 'crafted';
    make.textContent = made ? 'Lantern made' : 'Make lantern';
    hang.textContent = lit ? 'Lantern hung' : 'Hang lantern';
    setText('made-label', made ? 'Made' : 'Not made');
    setText('hung-label', lit ? 'Hung' : 'Not hung');
    $('#make-step').classList.toggle('is-current', !made && !short);
    $('#make-step').classList.toggle('is-done', made);
    $('#hang-step').classList.toggle('is-current', state.phase === 'crafted');
    $('#hang-step').classList.toggle('is-done', lit);
    $('[data-testid="game-status"]').classList.toggle('is-error', !made && short);
    var title = lit ? 'A light left for someone else.' : made ? 'Made, and ready to hang.' : short ? 'More timber and resin are needed.' : 'The bridge is waiting.';
    var copy = lit ? 'The bridge is lit. The path is open. That is enough for tonight. This bridge already has a lantern.' : made ? 'The lantern is ready. Hang it on the empty iron hook beside the footbridge. Hanging uses no extra resources.' : short ? 'Making needs 6 timber and 2 resin. You have ' + state.timber + ' timber and ' + state.resin + ' resin. Reset scene to return to 8 timber and 3 resin.' : 'You have enough timber and resin to make one lantern.';
    setText('status-title', title); setText('status-copy', copy);
    setText('scene-caption', lit ? 'The lantern is on the hook. The bridge is lit.' : made ? 'The lantern is made. The iron hook is still waiting.' : 'The iron hook is empty. A little work before nightfall.');
    var image = $('#world-image');
    image.setAttribute('src', lit ? 'assets/mosslight-world-lit.jpg' : 'assets/mosslight-world.jpg');
    image.alt = lit ? 'A warm lantern hangs on the iron hook beside the forest footbridge at dusk.' : 'A lanternmaker\'s forest workshop at dusk. An empty iron hook stands beside the footbridge.';
    setText('journal-made', made ? 'Made' : 'Not made');
    setText('journal-hung', lit ? 'Hung' : 'Not hung');
    setText('make-mark', made ? '✓' : '01');
    setText('hang-mark', lit ? '✓' : '02');
    setText('journal-make-copy', made ? 'You made one lantern using 6 timber and 2 resin. ' + state.timber + ' timber and ' + state.resin + ' resin remain.' : short ? 'Making is blocked. You need 6 timber and 2 resin; the bench has ' + state.timber + ' timber and ' + state.resin + ' resin.' : 'Still to make. Making uses exactly 6 timber and 2 resin. It will leave 2 timber and 1 resin.');
    setText('journal-hang-copy', lit ? 'You hung the lantern on the iron hook. No extra resources used. This bridge already has a lantern.' : made ? 'Ready to hang on the empty iron hook. No extra resources will be used.' : 'Make the lantern first. Hanging uses no extra resources.');
    setText('start-timber', start.timber); setText('start-resin', start.resin);
    setText('used-timber', made ? 6 : 0); setText('used-resin', made ? 2 : 0);
    setText('journal-timber', state.timber); setText('journal-resin', state.resin);
  }
  function loadFixture(name) {
    fixture = name;
    state = name === 'error' ? { timber: 4, resin: 1, phase: 'unmade' } : name === 'secondary' ? { timber: 2, resin: 1, phase: 'crafted' } : name === 'complete' ? { timber: 2, resin: 1, phase: 'lit' } : model.createGame();
    start = { timber: name === 'error' ? 4 : 8, resin: name === 'error' ? 1 : 3 };
    $('#fixture').value = name;
    if (journal.open) journal.close();
    render(); updateURL();
    if (name === 'secondary' || name === 'complete') journal.showModal();
  }
  make.addEventListener('click', function () {
    var result = model.makeLantern(state);
    if (result.state) { state = result.state; render(); hang.focus(); }
  });
  hang.addEventListener('click', function () {
    var result = model.hangLantern(state);
    if (result.state) { state = result.state; render(); $('[data-testid="reset"]').focus(); }
  });
  $('[data-testid="reset"]').addEventListener('click', function () {
    state = model.createGame(); start = { timber: 8, resin: 3 }; render(); make.focus();
  });
  opener.addEventListener('click', function () { journal.showModal(); });
  $('#close-journal').addEventListener('click', function () { journal.close(); });
  $('#return-scene').addEventListener('click', function () { journal.close(); });
  journal.addEventListener('close', function () { opener.focus(); });
  document.querySelectorAll('.directions button').forEach(function (button) {
    button.addEventListener('click', function () { changeDirection(button.dataset.direction); });
  });
  $('#fixture').addEventListener('change', function (event) { loadFixture(event.target.value); });
  changeDirection(direction);
  loadFixture(fixture);
})();
