(function (root) {
  'use strict';
  var contract = typeof module !== 'undefined' && module.exports ? require('./state.js') : root.BenchmarkState;
  function create(fixture, fixtureName) {
    var state = { jobs: contract.createWorkshop(), selected: fixture.initial_selected, surface: fixtureName === 'secondary' ? 'handovers' : 'bench', address: {17: null}, errors: {}, notes: {}, records: [], recordOpen: null };
    function finish(id) {
      var outcome = contract.finishJob(state.jobs, id, state.address[id]);
      if (outcome.error) { state.errors[id] = outcome.error; return false; }
      state.jobs = outcome.jobs;
      var source = fixture.jobs.find(function (j) { return j.id === id; });
      state.records.push({id: id, title: source.title, owner: source.owner, method: id === 17 ? 'Released to delivery' : 'Collected', address: id === 17 ? source.corrected_address : null});
      delete state.errors[id];
      return true;
    }
    function undo(id) {
      state.jobs = contract.undoJob(state.jobs, id);
      state.records = state.records.filter(function (r) { return r.id !== id; });
      if (state.recordOpen === id) state.recordOpen = null;
      delete state.errors[id];
    }
    if (fixtureName === 'error') { state.address[17] = 'original'; finish(17); }
    if (fixtureName === 'complete') { state.address[17] = 'corrected'; finish(17); finish(18); state.surface = 'handovers'; }
    return {state: state, finish: finish, undo: undo, chooseAddress: function (value) { state.address[17] = value; delete state.errors[17]; }, counts: function () { return {open: state.jobs.filter(function (j) { return j.status !== 'done'; }).length, handovers: state.records.length}; }};
  }
  var api = {create: create};
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.DispatchModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
