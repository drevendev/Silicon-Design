(function () {
  'use strict';
  var model = window.SiliconDemo;
  var byId = function (id) { return document.getElementById(id); };
  var captions = {
    'field-notes': '01 / Field Notes — a route, a record, a reason to look closer.',
    dispatch: '02 / Dispatch — finishing the repair means finishing the job.',
    mosslight: '03 / Mosslight — make a light, leave a way home.'
  };
  var briefs = { 'field-notes': 'field-notes.DESIGN.md', dispatch: 'dispatch.DESIGN.md', mosslight: 'mosslight.DESIGN.md' };
  function showExample(name) {
    if (!captions[name]) name = 'field-notes';
    document.querySelectorAll('.example').forEach(function (section) { section.hidden = section.id !== name; });
    document.querySelectorAll('[data-example]').forEach(function (link) {
      if (link.dataset.example === name) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    byId('specimen-caption').textContent = captions[name];
    byId('brief-link').href = 'https://github.com/drevendev/Silicon-Design/blob/master/examples/' + briefs[name];
    document.title = name === 'field-notes' ? 'Field Notes — After closing / Silicon Design' : name === 'dispatch' ? 'Dispatch — The workshop desk / Silicon Design' : 'Mosslight — A lanternmaker’s evening / Silicon Design';
  }
  document.querySelectorAll('[data-example]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      history.pushState(null, '', '?example=' + link.dataset.example);
      showExample(link.dataset.example);
      window.scrollTo(0, 0);
    });
  });
  window.addEventListener('popstate', function () { showExample(new URLSearchParams(location.search).get('example')); });
  showExample(new URLSearchParams(location.search).get('example'));

  var stops = [
    { title: 'A shutter wearing the weather.', copy: 'Blue paint holds in the grooves. Rust gathers at the edges. The shop is closed, but its front keeps a record of every season it has stood through.', prompt: 'Look at what time leaves behind.' },
    { title: 'A chair keeping the doorway.', copy: 'Nobody is sitting here. Still, the chair turns a threshold into a place to stay. A small invitation, left out after the shop has closed.', prompt: 'Notice the things that make room for someone.' },
    { title: 'A garden with no address.', copy: 'A little water follows the edge of the street. A plant has found the crack beside it. No pot, no sign, no permission: just enough room to grow.', prompt: 'Follow the water. See what follows it.' }
  ];
  var selectedStop = 0;
  var kept = new Set();
  function renderStop() {
    var stop = stops[selectedStop];
    byId('stop-number').textContent = 'OBSERVATION 0' + (selectedStop + 1);
    byId('stop-title').textContent = stop.title;
    byId('stop-copy').textContent = stop.copy;
    byId('stop-prompt').textContent = stop.prompt;
    document.querySelectorAll('[data-stop]').forEach(function (button) { button.setAttribute('aria-pressed', Number(button.dataset.stop) === selectedStop ? 'true' : 'false'); });
    byId('keep-stop').setAttribute('aria-pressed', kept.has(selectedStop) ? 'true' : 'false');
    byId('keep-stop').textContent = kept.has(selectedStop) ? '✓ Kept in your field book' : '＋ Keep this observation';
    byId('kept-count').textContent = kept.size + ' / 3 KEPT';
  }
  document.querySelectorAll('[data-stop]').forEach(function (button) {
    button.addEventListener('click', function () { selectedStop = Number(button.dataset.stop); renderStop(); });
  });
  byId('keep-stop').addEventListener('click', function () {
    if (kept.has(selectedStop)) { kept.delete(selectedStop); byId('field-status').textContent = 'Removed from this visit’s field book. You can keep it again.'; }
    else { kept.add(selectedStop); byId('field-status').textContent = kept.size === 3 ? 'Three small things kept. A street, remembered a little differently.' : 'Observation 0' + (selectedStop + 1) + ' kept. There is always something else to notice.'; }
    renderStop();
  });
  byId('field-note-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var note = byId('field-note').value.trim();
    byId('field-note-error').hidden = Boolean(note);
    byId('field-note').setAttribute('aria-invalid', note ? 'false' : 'true');
    if (!note) { byId('field-note').setAttribute('aria-describedby', 'field-note-error'); byId('field-note').focus(); return; }
    byId('field-note').removeAttribute('aria-describedby');
    byId('field-own-text').textContent = note;
    byId('field-own-saved').hidden = false;
    byId('field-status').textContent = 'Your margin note is in this visit’s field book. You can keep editing it.';
  });
  renderStop();

  var jobs = model.createWorkshop();
  var selectedJob = 17;
  var lampDrawing = byId('repair-object').innerHTML;
  var drawings = {
    17: lampDrawing,
    18: '<rect x="51" y="75" width="145" height="145" rx="9" fill="var(--surface)" stroke="currentColor" stroke-width="2"/><circle cx="114" cy="145" r="52" stroke="currentColor" stroke-width="2"/><circle cx="114" cy="145" r="40" stroke="currentColor"/><circle cx="114" cy="145" r="13" stroke="currentColor"/><path d="M171 99V170L148 187M164 94H179M50 231H196M64 219V229M183 219V229" stroke="currentColor" stroke-width="3"/><circle cx="170" cy="98" r="6" fill="var(--raised)" stroke="currentColor"/><path d="M62 65H180M62 59V71M180 59V71" stroke="currentColor" stroke-dasharray="3 4"/>',
    19: '<rect x="51" y="95" width="146" height="113" rx="12" fill="var(--surface)" stroke="currentColor" stroke-width="2"/><path d="M69 94V77Q124 38 179 77V94M148 119H182M148 129H182M70 213V222M179 213V222" stroke="currentColor" stroke-width="3"/><circle cx="101" cy="151" r="34" stroke="currentColor" stroke-width="2"/><circle cx="101" cy="151" r="25" stroke="currentColor" stroke-dasharray="2 4"/><circle cx="157" cy="173" r="10" stroke="currentColor" stroke-width="2"/><circle cx="181" cy="173" r="6" stroke="currentColor"/><path d="M62 64H185M62 58V70M185 58V70" stroke="currentColor" stroke-dasharray="3 4"/>'
  };
  var details = {
    17: { owner: 'Checked by Mina', kicker: 'REPAIR COMPLETE / DELIVERY ON HOLD', heading: 'The lamp is fixed.\nThe address isn’t.', label: 'BLUE ENAMEL / DESK LAMP', summary: 'Switch replaced.\nTested, cleaned, ready to go.', route: '02 / Address check', state: 'ON HOLD', waiting: '017 needs an address decision. Your place on the bench stays here.' },
    18: { owner: 'Checked by Alex', kicker: 'REPAIR COMPLETE / READY FOR COLLECTION', heading: 'Back up to speed.\nReady to go home.', label: 'PORTABLE / TURNTABLE', summary: 'New belt fitted.\nPlayback and speed checked.', route: '02 / Customer collection', state: 'READY', waiting: '018 is ready to collect. Mark it only when it has actually left the workshop.' },
    19: { owner: 'Assigned to you', kicker: 'PART ON ORDER / FINAL CHECK OUTSTANDING', heading: 'Good things take\nthe right small part.', label: 'KITCHEN / RADIO', summary: 'Switch still unreliable.\nFinal test outstanding.', route: '02 / Replacement switch', state: 'WAITING', waiting: '019 stays on the bench. The switch and final test are still needed.' }
  };
  function renderWorkshop(message) {
    var job = jobs.find(function (item) { return item.id === selectedJob; });
    var item = details[selectedJob];
    byId('open-jobs').textContent = jobs.filter(function (entry) { return entry.status !== 'done'; }).length;
    document.querySelectorAll('[data-job]').forEach(function (button) {
      var entry = jobs.find(function (record) { return record.id === Number(button.dataset.job); });
      button.setAttribute('aria-pressed', entry.id === selectedJob ? 'true' : 'false');
      button.dataset.done = entry.status === 'done' ? 'true' : 'false';
      button.querySelector('.ticket-status').textContent = entry.status === 'done' ? '✓ CLEARED' : entry.status === 'address' ? 'NEEDS A DECISION' : entry.status === 'ready' ? 'READY TO COLLECT' : 'WAITING FOR A PART';
    });
    byId('order-ref').textContent = 'WORK ORDER / 0' + selectedJob;
    byId('order-owner').textContent = item.owner;
    byId('order-kicker').textContent = job.status === 'done' ? 'REPAIR COMPLETE / JOB CLEARED' : item.kicker;
    byId('dispatch-heading').textContent = job.status === 'done' ? (selectedJob === 17 ? 'Ready for delivery.\nAddress confirmed.' : 'Collected.\nBack in rotation.') : item.heading;
    byId('item-label').textContent = item.label;
    byId('repair-summary').textContent = item.summary;
    byId('address-decision').hidden = job.status !== 'address';
    byId('collection-decision').hidden = job.status !== 'ready';
    byId('waiting-decision').hidden = job.status !== 'waiting';
    byId('order-receipt').hidden = job.status !== 'done';
    document.querySelector('.repair-seal').hidden = job.status === 'waiting';
    byId('repair-object').innerHTML = drawings[selectedJob];
    byId('routing-first').textContent = job.status === 'waiting' ? '01 / On the bench' : '01 / Bench ✓';
    byId('routing-last').textContent = job.status === 'done' ? (selectedJob === 17 ? '02 / Released to delivery ✓' : '02 / Collected ✓') : item.route;
    byId('order-status').textContent = job.status === 'done' ? 'CLEARED' : item.state;
    if (job.status === 'done') {
      byId('cleared-ref').textContent = '0' + selectedJob + (selectedJob === 17 ? ' / TO DELIVERY' : ' / COLLECTED');
      byId('receipt-title').textContent = selectedJob === 17 ? 'A good repair, properly finished.' : 'Another record, another life.';
      byId('receipt-copy').textContent = selectedJob === 17 ? 'The label now reads 18a High Street. The lamp is released to delivery in this local workshop record.' : 'The turntable is marked collected in this local workshop record. The bench has room for the next repair.';
    }
    byId('dispatch-status').textContent = message || (job.status === 'done' ? 'Job 0' + selectedJob + ' is cleared. Undo remains available here.' : item.waiting);
  }
  document.querySelectorAll('[data-job]').forEach(function (button) { button.addEventListener('click', function () { selectedJob = Number(button.dataset.job); byId('dispatch-error').hidden = true; renderWorkshop(); }); });
  function finishCurrent(address) {
    var result = model.finishJob(jobs, selectedJob, address);
    if (result.error) { byId('dispatch-error').hidden = false; byId('dispatch-error').textContent = result.error; return; }
    jobs = result.jobs;
    byId('dispatch-error').hidden = true;
    renderWorkshop('Job 0' + selectedJob + ' cleared. The open-job count is updated. You are still on the same work order.');
    byId('undo-job').focus();
  }
  byId('release-form').addEventListener('submit', function (event) { event.preventDefault(); var choice = document.querySelector('input[name=address]:checked'); finishCurrent(choice ? choice.value : null); });
  byId('collect-job').addEventListener('click', function () { finishCurrent(null); });
  byId('undo-job').addEventListener('click', function () { jobs = model.undoJob(jobs, selectedJob); renderWorkshop('Action undone. Job 0' + selectedJob + ' is back on the bench; your address choice is retained.'); if (selectedJob === 17) document.querySelector('input[value=corrected]').focus(); else byId('collect-job').focus(); });
  byId('reset-workshop').addEventListener('click', function () { jobs = model.createWorkshop(); selectedJob = 17; byId('release-form').reset(); byId('dispatch-error').hidden = true; renderWorkshop('The sample workshop is reset. All three jobs are back on the bench.'); });
  renderWorkshop();

  var game = model.createGame();
  function renderGame() {
    byId('timber').textContent = game.timber;
    byId('resin').textContent = game.resin;
    byId('game-scene').dataset.phase = game.phase;
    byId('craft-button').hidden = game.phase === 'crafted';
    byId('craft-button').disabled = game.phase === 'lit';
    byId('hang-button').hidden = game.phase !== 'crafted';
    byId('game-journal').hidden = game.phase !== 'lit';
    document.querySelector('.world-image').alt = game.phase === 'lit' ? 'The forest workshop at dusk: your lantern now hangs from the bridge hook, casting warm light across the stepping stones.' : 'A painted forest workshop at dusk, with a stepping-stone path, a footbridge and an empty lantern hook.';
    if (game.phase === 'unmade') {
      byId('recipe-title').textContent = 'A light for the bridge.';
      byId('recipe-copy').textContent = 'Six pieces of timber. Two drops of resin. Enough to make the dark a little smaller.';
      byId('craft-button').innerHTML = 'Make the lantern <span aria-hidden="true">↗</span>';
      byId('craft-status').textContent = 'The materials are here. Let’s make something useful.';
      byId('game-location').textContent = 'The workshop · blue hour';
      byId('world-caption').textContent = 'There is still a way home. It just needs a light.';
      byId('bridge-marker-text').textContent = 'A little light would help.';
    } else if (game.phase === 'crafted') {
      byId('recipe-title').textContent = 'Made by your own hands.';
      byId('recipe-copy').textContent = 'The lantern is ready. There is a hook beside the footbridge. A good place to leave a little warmth.';
      byId('craft-status').textContent = 'Lantern made. 6 timber and 2 resin used. Hang it to light the path.';
      byId('world-caption').textContent = 'A lantern on the bench. A dark bridge outside.';
      byId('bridge-marker-text').textContent = 'A place for your lantern.';
    } else {
      byId('recipe-title').textContent = 'A little less dark.';
      byId('recipe-copy').textContent = 'Your lantern is by the bridge now. The stones are easier to see. Someone will be glad of that.';
      byId('craft-button').textContent = 'Lantern placed · path open';
      byId('craft-status').textContent = 'Another lantern needs 4 more timber and 1 more resin. Begin again to replay this small scene.';
      byId('game-location').textContent = 'The footbridge · a way home';
      byId('world-caption').textContent = 'A light for the next person who comes this way.';
      byId('bridge-marker-text').textContent = 'The way is lit.';
    }
  }
  byId('craft-button').addEventListener('click', function () { var result = model.makeLantern(game); if (result.error) { byId('craft-status').textContent = result.error; return; } game = result.state; renderGame(); byId('hang-button').focus(); });
  byId('hang-button').addEventListener('click', function () { var result = model.hangLantern(game); if (result.error) { byId('craft-status').textContent = result.error; return; } game = result.state; renderGame(); byId('reset-game').focus(); });
  byId('reset-game').addEventListener('click', function () { game = model.createGame(); renderGame(); byId('craft-status').textContent = 'An evening to begin again. Timber and resin restored.'; byId('craft-button').focus(); });
  renderGame();
})();
