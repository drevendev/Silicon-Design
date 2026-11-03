'use strict';
// Source/model checks and a small DOM adapter. This is not a browser or rendering test.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const model = require('./state.js');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
let assertions = 0;
function eq(actual, expected, label) { assert.deepEqual(actual, expected, label); assertions++; }
function ok(value, label) { assert.ok(value, label); assertions++; }
class Element {
  constructor(id) {
    this.id = id; this.textContent = ''; this.dataset = {}; this.attributes = {};
    this.listeners = {}; this.firstChild = { textContent: '' }; this.disabled = false;
    this.open = false; this.hidden = false; this.classes = new Set();
    this.classList = { toggle: (key, force) => force ? this.classes.add(key) : this.classes.delete(key) };
  }
  addEventListener(type, fn) { this.listeners[type] = fn; }
  setAttribute(key, value) { this.attributes[key] = value; }
  removeAttribute(key) { delete this.attributes[key]; }
  focus() { this.focused = true; }
  fire(type, extras = {}) { if (type === 'click' && this.disabled) return; this.listeners[type]?.({ preventDefault() {}, ...extras }); }
}
function visit(fixture = 'initial', direction = 'a') {
  const elements = Object.fromEntries([...html.matchAll(/\bid="([^"]+)"/g)].map(m => [m[1], new Element(m[1])]));
  const directions = ['a', 'b', 'c'].map(d => { const el = new Element('direction-' + d); el.dataset.directionLink = d; return el; });
  const journalLinks = [new Element('journal-link'), new Element('journal-chapter')];
  const summary = new Element('summary');
  const body = new Element('body');
  const location = new URL(`http://localhost/index.html?fixture=${fixture}&direction=${direction}`);
  const document = {
    body,
    getElementById: id => { assert.ok(elements[id], 'Missing #' + id); return elements[id]; },
    querySelectorAll: selector => selector === '[data-direction-link]' ? directions : selector === '[data-open-journal]' ? journalLinks : [],
    querySelector: selector => { eq(selector, '[data-testid="open-journal"]', 'Known focus target'); return summary; }
  };
  const context = vm.createContext({ document, location, URL, URLSearchParams, BenchmarkState: model,
    history: { replaceState: (_, __, href) => { location.href = new URL(href, location.href).href; } } });
  vm.runInContext(app, context);
  return { elements, directions, journalLinks, summary, body, location };
}

eq(model.createGame(), { timber: 8, resin: 3, phase: 'unmade' }, 'Initial model');
const crafted = model.makeLantern(model.createGame()).state;
eq(crafted, { timber: 2, resin: 1, phase: 'crafted' }, 'Exact craft cost');
ok(model.makeLantern(crafted).error, 'Duplicate make blocked');
ok(model.hangLantern(model.createGame()).error, 'Pre-craft hang blocked');
ok(model.makeLantern({ timber: 4, resin: 1, phase: 'unmade' }).error, 'Insufficient blocked');
eq(model.hangLantern(crafted).state, { timber: 2, resin: 1, phase: 'lit' }, 'Hang has zero cost');

for (const direction of ['a', 'b', 'c']) {
  const v = visit('initial', direction), e = v.elements;
  eq(v.body.dataset.direction, direction, direction + ' selected');
  eq(e.bridge.dataset.phase, 'unmade', 'Initial phase');
  eq(e.timber.textContent, 8, 'Initial timber');
  eq(e.resin.textContent, 3, 'Initial resin');
  ok(!e.make.disabled && e.hang.disabled, 'Only make is available initially');
  e.hang.fire('click'); eq(e.bridge.dataset.phase, 'unmade', 'Disabled hang unchanged');
  e.make.fire('click');
  eq(e.bridge.dataset.phase, 'crafted', 'Make enters crafted');
  eq(e.timber.textContent, 2, 'Timber after make'); eq(e.resin.textContent, 1, 'Resin after make');
  ok(e.make.disabled && !e.hang.disabled, 'Make disabled, hang unlocked');
  ok(e.hang.focused, 'Focus transfers to hanging');
  e.make.fire('click'); eq(e.timber.textContent, 2, 'Repeated click spends nothing');
  v.journalLinks[0].fire('click'); ok(e.journal.open, 'Journal opens during crafted');
  for (const link of v.directions) {
    link.fire('click');
    eq(v.body.dataset.direction, link.dataset.directionLink, 'Direction changes');
    eq(e.bridge.dataset.phase, 'crafted', 'Direction retains pending craft');
    eq(e.timber.textContent, 2, 'Direction preserves resources');
    ok(e.journal.open, 'Direction preserves journal open');
  }
  e['close-journal'].fire('click'); ok(!e.journal.open, 'Journal closes');
  eq(e.bridge.dataset.phase, 'crafted', 'Closing journal retains crafted');
  ok(v.summary.focused, 'Journal focus restoration');
  e.hang.fire('click');
  eq(e.bridge.dataset.phase, 'lit', 'Hang enters lit');
  eq(e.world.src, 'assets/mosslight-world-lit.jpg', 'Actual completed painting');
  eq(e.timber.textContent, 2, 'Hanging preserves timber'); eq(e.resin.textContent, 1, 'Hanging preserves resin');
  ok(e.make.disabled && e.hang.disabled, 'Completed controls unavailable');
  ok(e['game-status'].textContent.includes('already has a lantern'), 'Duplicate explanation visible');
  ok(!e['completion-title'].hidden && !e['completion-copy'].hidden, 'Completion copy visible');
  e.reset.fire('click');
  eq(e.bridge.dataset.phase, 'unmade', 'Reset phase'); eq(e.timber.textContent, 8, 'Reset timber'); eq(e.resin.textContent, 3, 'Reset resin');
  ok(e.make.focused, 'Reset focus returns to making');
}
for (const direction of ['a', 'b', 'c']) {
  const secondary = visit('secondary', direction).elements;
  eq(secondary.bridge.dataset.phase, 'crafted', 'Secondary crafted'); ok(secondary.journal.open, 'Secondary journal open');
  eq(secondary.timber.textContent, 2, 'Secondary resources'); ok(!secondary.hang.disabled, 'Secondary can hang');
  const error = visit('error', direction).elements;
  eq(error.timber.textContent, 4, 'Error timber'); eq(error.resin.textContent, 1, 'Error resin');
  ok(error.make.disabled && error.hang.disabled, 'Insufficient controls blocked');
  ok(error['game-status'].textContent.includes('need') && error['game-status'].textContent.includes('4 timber'), 'Explicit insufficient reason');
  error.reset.fire('click'); eq(error.timber.textContent, 8, 'Error reset restores initial'); ok(!error.make.disabled, 'Error recovery enables make');
  const complete = visit('complete', direction).elements;
  eq(complete.bridge.dataset.phase, 'lit', 'Complete fixture lit'); ok(complete.journal.open, 'Complete journal open');
  eq(complete['used-timber'].textContent, 6, 'Journal exact cost'); eq(complete['left-timber'].textContent, 2, 'Journal exact remainder');
  eq(visit('initial', direction).elements.timber.textContent, 8, 'Fresh initialization resets visit');
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
eq(new Set(ids).size, ids.length, 'Unique element IDs');
for (const testid of ['make','hang','reset','open-journal','timber','resin','game-status','direction-a','direction-b','direction-c']) {
  eq([...html.matchAll(new RegExp('data-testid="' + testid + '"', 'g'))].length, 1, 'Unique adapter ' + testid);
}
for (const ref of [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]).filter(s => !s.startsWith('#') && !s.startsWith('?'))) {
  ok(!ref.includes(':') && !ref.includes('..'), 'Local relative reference: ' + ref);
  ok(fs.existsSync(path.join(__dirname, ref)), 'Referenced file exists: ' + ref);
}
ok(!/localStorage|sessionStorage|innerHTML|fetch\(|https?:\/\//.test(app), 'No persistence, HTML injection or app network calls');
eq((css.match(/{/g) || []).length, (css.match(/}/g) || []).length, 'Balanced CSS blocks');
ok(css.includes('@media(max-width:760px)') && css.includes('prefers-reduced-motion'), 'Narrow and reduced-motion source rules');
function hash(file) { return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }
for (const relative of ['assets/mosslight-world.jpg','assets/mosslight-world-lit.jpg','fixture.json','state.js']) {
  eq(hash(path.join(__dirname, relative)), hash(path.join(__dirname, '..', relative)), 'Unchanged supplied file ' + relative);
}
console.log(`PASS: ${assertions} source/model/DOM-adapter assertions. No browser, visual, keyboard, or screen-reader checks performed.`);
function luminance(hex) {
  const rgb = hex.match(/[a-f0-9]{2}/gi).map(h => parseInt(h, 16) / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
  return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
}
for (const [name, foreground, background] of [
  ['Workbench body', 'ebdfc7', '1b2c25'], ['Workbench supporting', 'b4b9a5', '1b2c25'],
  ['Primary action', '18271f', 'e1b576'], ['Disabled action', '9ba58f', '223229'],
  ['Journal body', '2b352d', 'ede3ce'], ['Journal supporting', '4b5948', 'ede3ce'],
  ['Folio supporting', '56664f', 'f0e8d4'], ['Folio action', 'fff2d8', '46573c'],
  ['Prototype metadata', 'bdc2b8', '0d1917']
]) {
  const a = luminance(foreground), b = luminance(background);
  const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
  assert.ok(ratio >= 4.5, name + ' solid color contrast below 4.5:1');
  console.log(`${name}: ${ratio.toFixed(2)}:1 (solid CSS pair only)`);
}
