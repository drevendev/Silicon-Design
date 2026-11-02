const test = require('node:test');
const assert = require('node:assert/strict');
const model = require('../examples/model.js');

test('address validation keeps the original work order intact', () => {
  const jobs = model.createWorkshop();
  assert.ok(model.finishJob(jobs, 17, null).error);
  assert.ok(model.finishJob(jobs, 17, 'original').error);
  assert.equal(jobs[0].status, 'address');
});

test('a corrected address clears one job and preserves the other jobs', () => {
  const jobs = model.createWorkshop();
  const result = model.finishJob(jobs, 17, 'corrected');
  assert.equal(result.jobs[0].status, 'done');
  assert.deepEqual(result.jobs.slice(1), jobs.slice(1));
  assert.equal(jobs[0].status, 'address');
});

test('waiting and already cleared jobs cannot be released', () => {
  const jobs = model.createWorkshop();
  assert.ok(model.finishJob(jobs, 19, null).error);
  const finished = model.finishJob(jobs, 18, null).jobs;
  assert.ok(model.finishJob(finished, 18, null).error);
});

test('undo restores the exact job stage without reopening other work', () => {
  const first = model.finishJob(model.createWorkshop(), 17, 'corrected').jobs;
  const second = model.finishJob(first, 18, null).jobs;
  const restored = model.undoJob(second, 17);
  assert.equal(restored[0].status, 'address');
  assert.equal(restored[1].status, 'done');
  assert.equal(restored[2].status, 'waiting');
});

test('one craft consumes only the declared materials, without mutating the fixture', () => {
  const initial = model.createGame();
  const made = model.makeLantern(initial);
  assert.deepEqual(made.state, { timber: 2, resin: 1, phase: 'crafted' });
  assert.deepEqual(initial, { timber: 8, resin: 3, phase: 'unmade' });
  assert.ok(model.makeLantern(made.state).error);
});

test('hanging requires a crafted lantern and consumes no extra materials', () => {
  assert.ok(model.hangLantern(model.createGame()).error);
  const crafted = model.makeLantern(model.createGame()).state;
  const hung = model.hangLantern(crafted).state;
  assert.deepEqual(hung, { timber: 2, resin: 1, phase: 'lit' });
  assert.ok(model.hangLantern(hung).error);
});

test('insufficient inventory cannot create a lantern', () => {
  const short = { timber: 5, resin: 2, phase: 'unmade' };
  assert.ok(model.makeLantern(short).error);
  assert.deepEqual(short, { timber: 5, resin: 2, phase: 'unmade' });
});
