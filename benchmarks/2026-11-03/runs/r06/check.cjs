// Local source and DOM-model checks. This is not a browser or layout test.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const crypto = require('node:crypto');
const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const model = require('./state.js');
class Element {
  constructor(name, document) { this.name=name; this.document=document; this.dataset={}; this.attributes={}; this.textContent=''; this.disabled=false; this.open=false; this.listeners={}; this.classList={ toggle() {} }; }
  setAttribute(name,value) { this.attributes[name]=String(value); }
  addEventListener(name,listener) { this.listeners[name]=listener; }
  focus() { this.document.activeElement=this; }
  append(...elements) { this.children=elements; }
  showModal() { this.open=true; }
  close() { this.open=false; this.listeners.close?.(); }
  click() { if (!this.disabled) this.listeners.click?.({target:this}); }
}
function boot(fixture='initial', direction='a') {
  const elements={};
  const document={ querySelector(selector) { return elements[selector] ||= new Element(selector,document); }, getElementById(id) { return this.querySelector('#'+id); }, querySelectorAll(selector) { assert.equal(selector,'.directions button'); return buttons; } };
  document.body = new Element('body',document);
  const buttons=['a','b','c'].map(d => { const el=document.querySelector('[data-testid="direction-'+d+'"]'); el.dataset.direction=d; return el; });
  const window={location:{search:'?fixture='+fixture+'&direction='+direction,href:'http://local.test/index.html?fixture='+fixture+'&direction='+direction},history:{replaceState(_a,_b,url){this.url=url}}, BenchmarkState:model};
  vm.runInNewContext(source,{window,document,URL,URLSearchParams});
  return {document,window,get:selector=>document.querySelector(selector),phase:()=>document.querySelector('#scene').dataset.phase,click:id=>document.querySelector('[data-testid="'+id+'"]').click()};
}
for (const direction of ['a','b','c']) {
  let t=boot('initial',direction);
  assert.equal(t.phase(),'unmade'); assert.equal(t.get('#timber').textContent,8); assert.equal(t.get('#resin').textContent,3);
  assert.equal(t.get('[data-testid="hang"]').disabled,true);
  t.click('hang'); assert.equal(t.phase(),'unmade');
  t.click('make'); assert.equal(t.phase(),'crafted'); assert.equal(t.get('#timber').textContent,2); assert.equal(t.get('#resin').textContent,1);
  t.click('make'); assert.equal(t.get('#timber').textContent,2);
  t.click('open-journal'); assert.equal(t.get('#journal').open,true); assert.equal(t.get('#journal-made').textContent,'Made'); assert.equal(t.get('#journal-hung').textContent,'Not hung');
  t.get('#close-journal').click(); assert.equal(t.get('#journal').open,false); assert.equal(t.phase(),'crafted'); assert.equal(t.get('#timber').textContent,2);
  for(const target of ['a','b','c']) { t.click('direction-'+target); assert.equal(t.document.body.dataset.direction,target); assert.equal(t.phase(),'crafted'); assert.equal(t.get('#resin').textContent,1); }
  t.click('hang'); assert.equal(t.phase(),'lit'); assert.match(t.get('#world-image').attributes.src,/world-lit.jpg$/); assert.match(t.get('#status-copy').textContent,/already has a lantern/);
  t.click('make'); t.click('hang'); assert.equal(t.phase(),'lit'); assert.equal(t.get('#timber').textContent,2);
  t.click('reset'); assert.equal(t.phase(),'unmade'); assert.equal(t.get('#timber').textContent,8); assert.equal(t.get('#resin').textContent,3); assert.equal(t.document.activeElement,t.get('[data-testid="make"]'));
  t=boot('secondary',direction); assert.equal(t.phase(),'crafted'); assert.equal(t.get('#journal').open,true); t.get('#return-scene').click(); assert.equal(t.phase(),'crafted'); assert.equal(t.get('#timber').textContent,2); t.click('hang'); assert.equal(t.phase(),'lit');
  t=boot('error',direction); assert.equal(t.phase(),'unmade'); assert.equal(t.get('#timber').textContent,4); assert.equal(t.get('#resin').textContent,1); assert.equal(t.get('[data-testid="make"]').disabled,true); assert.match(t.get('#status-copy').textContent,/6 timber and 2 resin/); t.click('make'); assert.equal(t.phase(),'unmade'); t.click('reset'); t.click('make'); assert.equal(t.phase(),'crafted');
  t=boot('complete',direction); assert.equal(t.phase(),'lit'); assert.equal(t.get('#journal').open,true); assert.equal(t.get('#journal-made').textContent,'Made'); assert.equal(t.get('#journal-hung').textContent,'Hung');
  t.get('#journal').close(); t.get('#fixture').listeners.change({target:{value:'initial'}}); assert.equal(t.phase(),'unmade'); assert.equal(t.get('#timber').textContent,8);
}
assert.ok(model.makeLantern(model.createGame()).state);
assert.ok(model.makeLantern({timber:4,resin:1,phase:'unmade'}).error);
assert.ok(model.hangLantern(model.createGame()).error);
assert.ok(model.makeLantern({timber:2,resin:1,phase:'crafted'}).error);
for(const id of ['make','hang','reset','open-journal','timber','resin','game-status','direction-a','direction-b','direction-c']) assert.ok(html.includes('data-testid="'+id+'"'),id);
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) assert.ok(fs.existsSync(path.join(root,match[1])),match[1]);
assert.ok(!/localStorage|sessionStorage|fetch\(|https?:\/\//.test(source));
assert.ok(!/[\u2014]/.test(html+source+css));
assert.ok(!/innerHTML/.test(source));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
for(const file of ['mosslight-world.jpg','mosslight-world-lit.jpg']) assert.equal(hash(path.join(root,'assets',file)),hash(path.join(root,'..','assets',file)));
for(const file of ['fixture.json','state.js']) assert.equal(hash(path.join(root,file)),hash(path.join(root,'..',file)));
console.log('PASS: all three directions, all four fixtures, progression guards, exact resource use, journal interruption, completion, reset focus intent, fixture change, direction retention, static local references and unchanged copied inputs.');
function luminance(hex) { const c=hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4); return c[0]*.2126+c[1]*.7152+c[2]*.0722; }
const pairs=[['ede5cd','1d2824'],['c0c5b7','1d2824'],['c0c5b7','15201d'],['a3aa9b','15201d'],['253025','e9b66a'],['29382f','e8dfc6'],['4c5b49','e8dfc6'],['f4edd9','344a39'],['59634f','e8dfc6']];
for(const [fg,bg] of pairs){ const a=luminance(fg), b=luminance(bg); const ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05); assert.ok(ratio>=4.5,fg+'/'+bg+' '+ratio); console.log('Text contrast #'+fg+' on #'+bg+': '+ratio.toFixed(2)+':1'); }
console.log('Browser layout, native dialog behavior, assistive technology and pointer/keyboard interaction are UNTESTED.');
