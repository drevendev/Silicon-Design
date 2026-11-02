(function (root) {
  'use strict';

  function createWorkshop() {
    return [
      { id: 17, status: 'address', title: 'Blue enamel lamp' },
      { id: 18, status: 'ready', title: 'Portable turntable' },
      { id: 19, status: 'waiting', title: 'Kitchen radio' }
    ];
  }

  function finishJob(jobs, id, address) {
    var job = jobs.find(function (item) { return item.id === id; });
    if (!job) return { error: 'This job is not on the bench.' };
    if (job.status === 'done') return { error: 'This job has already been cleared.' };
    if (job.status === 'waiting') return { error: 'The replacement switch and final test are still needed.' };
    if (job.status === 'address' && !address) return { error: 'Choose an address before releasing the lamp. The customer’s note is above.' };
    if (job.status === 'address' && address !== 'corrected') return { error: 'The customer corrected this to 18a. Check the note and use the corrected address.' };
    return { jobs: jobs.map(function (item) { return item.id === id ? Object.assign({}, item, { status: 'done', previous: item.status }) : Object.assign({}, item); }) };
  }

  function undoJob(jobs, id) {
    return jobs.map(function (item) {
      if (item.id !== id || item.status !== 'done' || !item.previous) return Object.assign({}, item);
      return { id: item.id, title: item.title, status: item.previous };
    });
  }

  function createGame() { return { timber: 8, resin: 3, phase: 'unmade' }; }

  function makeLantern(state) {
    if (state.phase !== 'unmade') return { error: 'There is already a lantern for this bridge.' };
    if (state.timber < 6 || state.resin < 2) return { error: 'More timber and resin are needed.' };
    return { state: { timber: state.timber - 6, resin: state.resin - 2, phase: 'crafted' } };
  }

  function hangLantern(state) {
    if (state.phase !== 'crafted') return { error: 'Make the lantern before hanging it.' };
    return { state: { timber: state.timber, resin: state.resin, phase: 'lit' } };
  }

  var model = { createWorkshop: createWorkshop, finishJob: finishJob, undoJob: undoJob, createGame: createGame, makeLantern: makeLantern, hangLantern: hangLantern };
  if (typeof module !== 'undefined' && module.exports) module.exports = model;
  else root.SiliconDemo = model;
})(typeof globalThis !== 'undefined' ? globalThis : this);
