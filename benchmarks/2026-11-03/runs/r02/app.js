(function () {
'use strict';
const facts = [
 {id:17,title:'Blue enamel lamp',owner:'Mina',status:'address',repair:'Switch replaced. Tested, cleaned, ready to go.',customer_note:'Please send it to 18a, not 18. The door is beside the bakery.',original_address:'18 High Street',corrected_address:'18a High Street',action:'Confirm address & release',asset:'lamp.svg'},
 {id:18,title:'Portable turntable',owner:'Alex',status:'ready',repair:'New belt fitted. Speed checked at both settings. Old belt packed with the unit.',action:'Mark collected',asset:'turntable.svg'},
 {id:19,title:'Kitchen radio',owner:'You',status:'waiting',repair:'The current switch cuts out under load. The replacement switch and final test are still needed.',action:'Release to delivery',asset:'radio.svg'}
];
const params = new URLSearchParams(location.search);
let direction = ['a','b','c'].includes(params.get('direction')) ? params.get('direction') : 'a';
let fixture = ['initial','secondary','error','complete'].includes(params.get('fixture')) ? params.get('fixture') : 'initial';
let jobs, selected, surface, record, addresses, notes, errors;
const app = document.getElementById('app');
const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const no = id => String(id).padStart(3,'0');
const done = () => jobs.filter(j => j.status === 'done');
const status = j => j.status === 'done' ? (j.id === 17 ? 'Delivery recorded' : 'Collected') : ({address:'Address to confirm',ready:'Ready for collection',waiting:'Waiting for repair'}[j.status]);
const fact = id => facts.find(j=>j.id===id);
function initialize() {
 jobs = BenchmarkState.createWorkshop(); selected = 17; surface = fixture==='secondary' || fixture==='complete' ? 'handovers':'bench'; record = null;
 addresses={17:''}; notes={17:'',18:'',19:''}; errors={};
 if(fixture==='error') {addresses[17]='original'; errors[17]=BenchmarkState.finishJob(jobs,17,'original').error;}
 if(fixture==='complete') {addresses[17]='corrected'; jobs=BenchmarkState.finishJob(jobs,17,'corrected').jobs; jobs=BenchmarkState.finishJob(jobs,18).jobs;}
 render();
}
function updateURL() {const url = new URL(location.href); url.searchParams.set('direction',direction);url.searchParams.set('fixture',fixture);history.replaceState({},'',url);}
function draw(j, cls='') {return `<figure class="drawing ${cls}"><img src="assets/${j.asset}" width="250" height="290" alt="Workshop drawing of ${esc(j.title.toLowerCase())}" fetchpriority="high"><figcaption>Object study / ${no(j.id)}</figcaption></figure>`;}
function countNav() {return `<nav class="primary-nav" aria-label="Workshop views"><button data-testid="close-handovers" data-action="bench" class="${surface==='bench'?'current':''}">Bench <span data-testid="open-count">${jobs.length-done().length}</span></button><button data-testid="open-handovers" data-action="handovers" class="${surface==='handovers'?'current':''}">Handovers <span data-testid="handover-count">${done().length}</span></button></nav>`;}
function jobList() {
 if(direction==='c') return `<section class="register" aria-label="Work orders"><div class="register-head"><span>Work order / owner</span><span>Current stage</span><span>Next decision</span></div>${jobs.map(j=>{const f=fact(j.id);return `<button class="register-row ${selected===j.id?'selected':''}" data-testid="job-${j.id}" data-job="${j.id}" aria-pressed="${selected===j.id}"><span><b>${no(j.id)}</b> ${esc(f.title)} <small>${esc(f.owner)}</small></span><span>${status(j)}</span><span>${j.status==='done'?'Inspect handover':j.id===17?'Check 18a':j.id===18?'Confirm collection':'Switch + final test'}</span></button>`;}).join('')}</section>`;
 return `<aside class="job-list" aria-label="Work orders"><div class="list-heading"><span>Work orders</span><span>017–019</span></div>${jobs.map(j=>{const f=fact(j.id);return `<button class="job-item ${selected===j.id?'selected':''}" data-testid="job-${j.id}" data-job="${j.id}" aria-pressed="${selected===j.id}"><span class="job-no">${no(j.id)}</span>${direction==='b'?`<img src="assets/${f.asset}" width="70" height="74" alt="">`:''}<span class="job-label"><strong>${esc(f.title)}</strong><span>${esc(f.owner)} / ${status(j)}</span></span><span class="selection-mark" aria-hidden="true">${selected===j.id?'↳':''}</span></button>`;}).join('')}<p class="list-foot">Repaired objects stay on the bench until their handover is recorded.</p></aside>`;
}
function remaining() {return done().length===2?'<p class="remaining" role="status"><strong>Radio remains waiting.</strong> The replacement switch and final test are still needed.</p>':'';}
function noteInput(id) {return `<details class="notes" ${notes[id]?'open':''}><summary>Visit note <span>optional</span></summary><label for="note-${id}">Note for work order ${no(id)}</label><textarea id="note-${id}" data-note="${id}" rows="2" maxlength="1500" placeholder="Add a note for this visit">${esc(notes[id])}</textarea><small>Kept while this page stays open.</small></details>`;}
function receipt(id, inRecord=false) {
 const j=fact(id); return `<article class="receipt" aria-label="Handover receipt"><div class="receipt-stamp">${id===17?'Delivery address confirmed':'Collection recorded'}</div><h2>Handover recorded.</h2><dl><div><dt>Work order</dt><dd>${no(id)} / ${esc(j.title)}</dd></div><div><dt>Owner</dt><dd>${esc(j.owner)}</dd></div><div><dt>${id===17?'Actual delivery address':'Handover'}</dt><dd class="actual">${id===17?'18a High Street':'Collected by Alex'}</dd></div></dl><p>${id===17?'The lamp is cleared from the bench.':'The turntable is cleared from the bench.'}</p><p class="quiet">Local record only. ${id===17?'No delivery has been arranged.':'No external collection service is connected.'}</p>${notes[id]?`<div class="record-note"><h3>Visit note</h3><p>${esc(notes[id])}</p></div>`:''}<button class="undo" data-testid="undo" data-undo="${id}">Undo handover</button><small>Restores the previous stage${id===17?' and your chosen address correction':''}.</small>${!inRecord?'<button class="text-button" data-action="handovers">Inspect handovers</button>':''}</article>`;
}
function task(id) {
 const j=jobs.find(x=>x.id===id), f=fact(id);
 return `<article class="work-order" id="workspace"><div class="order-head"><div class="order-caption">Work order <b>${no(id)}</b> <span>/ ${esc(f.owner)}</span></div><h1>${esc(f.title)}</h1><p class="stage ${j.status==='waiting'?'waiting':''}">${status(j)}</p></div><div class="order-body">${draw(f)}<div class="order-copy"><section class="repair"><h2>Repair record</h2><p>${esc(f.repair)}</p></section>${j.status==='done'?receipt(id):id===17?`<section class="customer-note"><h2>Mina’s address correction</h2><blockquote>${esc(f.customer_note)}</blockquote></section><form id="release-form"><fieldset aria-describedby="address-help${errors[id]?' operation-error':''}"><legend>Confirm the delivery address</legend><p id="address-help">Use the customer’s correction before releasing this work order.</p><label class="address-option ${addresses[17]==='original'?'chosen':''}"><input type="radio" name="address" value="original" data-testid="address-original" ${addresses[17]==='original'?'checked':''}><span><strong>18 High Street</strong><small>Original work order</small></span></label><label class="address-option ${addresses[17]==='corrected'?'chosen':''}"><input type="radio" name="address" value="corrected" data-testid="address-corrected" ${addresses[17]==='corrected'?'checked':''}><span><strong>18a High Street</strong><small>Customer’s corrected address</small></span></label></fieldset><div class="error" data-testid="operation-error" id="operation-error" role="alert" ${errors[id]?'':'hidden'}>${esc(errors[id])}</div>${noteInput(id)}<div class="action-area"><button class="primary" type="submit" data-testid="release">Confirm address &amp; release</button><small>Clears only work order 017.</small></div></form>`:id===18?`<section class="collection-note"><h2>Collection handover</h2><p>Alex’s turntable is ready for collection. The old belt is packed with the unit.</p></section>${noteInput(id)}<div class="action-area"><button class="primary" data-testid="collect" data-collect="18">Mark collected</button><small>Records collection and clears work order 018.</small></div>`:`<section class="blocked"><h2>Keep on the bench</h2><p>The replacement switch and final test are still needed.</p><p>Complete the repair before recording a handover.</p></section>${noteInput(id)}<div class="action-area"><button class="primary" data-testid="release" disabled aria-describedby="radio-reason">Release to delivery</button><small id="radio-reason">Unavailable while the radio is waiting for repair.</small></div>`}</div></div></article>`;
}
function handovers() {
 const records=done(); const opened=records.find(j=>j.id===record);
 return `<section class="handovers" id="workspace"><div class="handover-heading"><div><div class="order-caption">The handover book</div><h1>Handovers</h1><p>Completed records from this visit.</p></div><div class="book-total"><b>${records.length}</b><span>record${records.length===1?'':'s'}</span></div></div>${records.length?`<div class="handover-content"><div class="record-list">${records.map(j=>`<button data-testid="record-${j.id}" data-record="${j.id}" class="record-row ${record===j.id?'selected':''}" aria-pressed="${record===j.id}"><span class="record-num">${no(j.id)}</span><span><strong>${esc(j.title)}</strong><small>${j.id===17?'Mina / 18a High Street':'Alex / Collected'}</small></span><span>Open record</span></button>`).join('')}</div>${opened?`<div class="record-detail"><div class="record-top"><h2>Work order ${no(opened.id)}</h2><button data-action="close-record" class="text-button">Close record</button></div><div class="record-inside">${draw(fact(opened.id))}<div><p class="record-repair">${esc(fact(opened.id).repair)}</p>${receipt(opened.id,true)}</div></div></div>`:'<div class="inspect-prompt"><p>Select a completed work order to inspect its receipt or undo the handover.</p></div>'}</div>`:`<div class="empty-book"><div class="empty-lines" aria-hidden="true"><span></span><span></span><span></span></div><h2>No handovers yet.</h2><p>These pages fill only when you release a work order or mark an object collected.</p><button class="primary" data-action="bench">Return to the bench</button></div>`}${remaining()}</section>`;
}
function render(focusTarget) {
 document.body.dataset.direction=direction;
 document.querySelectorAll('[data-direction]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.direction===direction)));
 document.getElementById('fixture').value=fixture;
 app.innerHTML=`<div class="shell"><header class="app-header"><div class="brand">Dispatch<span>.</span><small>Repair workshop</small></div>${countNav()}<button class="reset" data-testid="reset" data-action="reset">Reset visit</button></header><main class="${surface==='bench'?'bench':'book-view'}">${surface==='bench'?`${jobList()}<div class="task-wrap">${direction==='c'?'<div class="register-caption">Selected work order</div>':''}${task(selected)}${remaining()}</div>`:handovers()}</main><footer><p>Fictional workshop records for teaching.</p><p>Changes last for this visit only. Reset or reload restores the selected QA fixture.</p></footer></div>`;
 if(focusTarget) {const el=document.querySelector(focusTarget); if(el) el.focus();}
}
function finish(id) {
 const result=BenchmarkState.finishJob(jobs,id,addresses[id]);
 if(result.error){errors[id]=result.error; render('[data-testid="release"]');return;}
 jobs=result.jobs; errors[id]=''; render('[data-testid="undo"]');
}
document.addEventListener('click', e=>{
 const b=e.target.closest('button'); if(!b || b.disabled)return;
 if(b.dataset.direction){direction=b.dataset.direction;updateURL();render();return;}
 if(b.dataset.job){selected=Number(b.dataset.job);surface='bench';render();return;}
 if(b.dataset.collect){finish(Number(b.dataset.collect));return;}
 if(b.dataset.undo){const id=Number(b.dataset.undo);jobs=BenchmarkState.undoJob(jobs,id);errors[id]='';selected=id;record=null;surface='bench';render();return;}
 if(b.dataset.record){record=Number(b.dataset.record);render();return;}
 switch(b.dataset.action){case 'bench':surface='bench';render();break;case 'handovers':surface='handovers';render();break;case 'close-record':record=null;render();break;case 'reset':initialize();break;}
});
document.addEventListener('submit',e=>{if(e.target.id==='release-form'){e.preventDefault();finish(17);}});
document.addEventListener('change',e=>{
 if(e.target.name==='address'){addresses[17]=e.target.value;errors[17]='';render(`[data-testid="address-${e.target.value}"]`);}
 if(e.target.id==='fixture'){fixture=e.target.value;updateURL();initialize();}
});
document.addEventListener('input',e=>{if(e.target.dataset.note)notes[e.target.dataset.note]=e.target.value;});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&surface==='handovers'){if(record!==null){record=null;}else{surface='bench';}render();}});
initialize();
})();
