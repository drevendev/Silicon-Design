(function () {
  'use strict';
  const fixture = window.DISPATCH_FIXTURE;
  const params = new URLSearchParams(location.search);
  const fixtureName = ['initial','secondary','error','complete'].includes(params.get('fixture')) ? params.get('fixture') : 'initial';
  let direction = ['a','b','c'].includes(params.get('direction')) ? params.get('direction') : 'a';
  let workshop = DispatchModel.create(fixture, fixtureName);
  const assets = {17:'lamp',18:'turntable',19:'radio'};
  const names = {a:'Bench ledger · recommended', b:'Object desk', c:'Work-order register'};
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const number = id => String(id).padStart(3,'0');
  const statusName = job => ({address:'Address correction',ready:'Ready for collection',waiting:'Waiting on repair',done:'Handed over'}[job.status]);
  const badge = job => `<span class="status status-${job.status}">${statusName(job)}</span>`;
  const drawing = (id, cls='') => `<img class="${cls}" src="assets/${assets[id]}.svg" alt="Workshop drawing of the ${esc(fixture.jobs.find(j=>j.id===id).title.toLowerCase())}">`;
  const jobData = id => Object.assign({}, fixture.jobs.find(j=>j.id===id), workshop.state.jobs.find(j=>j.id===id));
  function jobIndex() {
    const state = workshop.state;
    const rows = state.jobs.map(j => {
      const job = jobData(j.id);
      if (direction === 'c') return `<tr class="${state.selected===j.id?'selected':''}"><td class="order-no">${number(j.id)}</td><td><button data-action="job" data-id="${j.id}" data-testid="job-${j.id}" aria-pressed="${state.selected===j.id}">${esc(job.title)}</button><span class="table-owner">${esc(job.owner)}</span></td><td>${badge(job)}</td><td class="table-owner-column">${esc(job.owner)}</td></tr>`;
      return `<button class="job-card ${state.selected===j.id?'selected':''}" data-action="job" data-id="${j.id}" data-testid="job-${j.id}" aria-pressed="${state.selected===j.id}"><span class="job-illustration">${drawing(j.id)}</span><span class="job-copy"><span class="job-number">WORK ORDER ${number(j.id)}</span><strong>${esc(job.title)}</strong><span class="owner">${esc(job.owner)}</span>${badge(job)}</span><span class="job-arrow" aria-hidden="true">↗</span></button>`;
    }).join('');
    return `<aside class="job-index" aria-label="Work orders"><div class="index-heading"><span class="eyebrow">BENCH INDEX</span><span>3 objects</span></div>${direction==='c'?`<div class="table-scroll"><table class="job-table"><thead><tr><th>Order</th><th>Object</th><th>Stage</th><th class="table-owner-column">Owner</th></tr></thead><tbody>${rows}</tbody></table></div>`:`<div class="job-list">${rows}</div>`}<p class="index-note">Repaired is a stage.<br>Handed over is a separate record.</p></aside>`;
  }
  function addressPanel(job) {
    const chosen = workshop.state.address[17];
    return `<section class="handover-panel"><div class="panel-heading"><span class="step-number">02</span><h3>Confirm the address</h3></div><p>Use Mina’s correction before releasing this work order.</p><fieldset><legend>Delivery address</legend><label class="address-option"><input type="radio" name="address" value="original" data-testid="address-original" ${chosen==='original'?'checked':''}><span><small>ORIGINAL ADDRESS</small><strong>${esc(job.original_address)}</strong></span></label><label class="address-option"><input type="radio" name="address" value="corrected" data-testid="address-corrected" ${chosen==='corrected'?'checked':''}><span><small>CUSTOMER CORRECTION</small><strong>${esc(job.corrected_address)}</strong></span></label></fieldset>${operationError(job.id)}<button class="primary" data-action="finish" data-id="17" data-testid="release">${esc(job.action)} <span aria-hidden="true">↗</span></button><p class="action-footnote">Records the handover in this visit.</p></section>`;
  }
  function operationError(id) { return workshop.state.errors[id] ? `<div class="operation-error" role="alert" tabindex="-1" data-testid="operation-error"><strong>Handover not recorded</strong><p>${esc(workshop.state.errors[id])}</p></div>` : ''; }
  function actionPanel(job) {
    if (job.id === 17) return addressPanel(job);
    if (job.id === 18) return `<section class="handover-panel"><div class="panel-heading"><span class="step-number">02</span><h3>Collection</h3></div><p>The turntable is ready for Alex to collect.</p><div class="collection-note"><span class="eyebrow">PACKED WITH THE UNIT</span><strong>Old belt</strong><p>New belt fitted. Speed checked at both settings. Old belt packed with the unit.</p></div>${operationError(job.id)}<button class="primary" data-action="finish" data-id="18" data-testid="collect">${esc(job.action)} <span aria-hidden="true">↗</span></button><p class="action-footnote">Records the collection in this visit.</p></section>`;
    return `<section class="handover-panel blocked-panel"><div class="panel-heading"><span class="step-number">!</span><h3>Handover unavailable</h3></div><p>The replacement switch and final test are still needed.</p><div class="waiting-reason"><strong>Still on the bench</strong><p>The current switch cuts out under load.</p><span>Replacement switch · final test</span></div><button class="primary" disabled data-testid="release">${esc(job.action)}</button><p class="action-footnote">Finish the repair before recording a handover.</p></section>`;
  }
  function noteEditor(id) {
    return `<div class="note-editor"><label for="workshop-note">Workshop note <span>optional · this visit only</span></label><textarea id="workshop-note" rows="2" data-note="${id}" placeholder="Add a note to this work order">${esc(workshop.state.notes[id] || '')}</textarea></div>`;
  }
  function receipt(id, fromHandovers) {
    const job = jobData(id), record = workshop.state.records.find(r=>r.id===id);
    if (!record) return '';
    return `<article class="receipt" aria-labelledby="receipt-title"><div class="receipt-top"><span class="eyebrow">HANDOVER RECORD / ${number(id)}</span><span class="receipt-seal">RECORDED</span></div><div class="receipt-main">${drawing(id,'receipt-drawing')}<div><h2 id="receipt-title" tabindex="-1">${esc(record.title)}</h2><p class="receipt-method">${esc(record.method)}</p><dl><div><dt>Owner</dt><dd>${esc(record.owner)}</dd></div>${record.address?`<div class="actual-address"><dt>Actual delivery address</dt><dd>${esc(record.address)}</dd></div>`:`<div><dt>Handover</dt><dd>Collection</dd></div>`}</dl></div></div><div class="receipt-detail"><span class="eyebrow">REPAIR RECORD</span><p>${esc(job.repair)}</p>${job.customer_note?`<p class="retained-note">Mina’s note: “${esc(job.customer_note)}”</p>`:''}<span class="eyebrow">WORKSHOP NOTE</span><p class="user-note">${esc(workshop.state.notes[id] || 'No workshop note added.')}</p></div><div class="receipt-bottom"><p>This local record clears only work order ${number(id)}. Undo restores its previous stage${id===17?' and chosen address correction':''}.</p><button class="secondary" data-action="undo" data-id="${id}" data-testid="undo">Undo handover <span aria-hidden="true">↶</span></button></div>${!fromHandovers?`<button class="text-button" data-action="handovers">View handovers →</button>`:''}</article>`;
  }
  function workRecord() {
    const job = jobData(workshop.state.selected);
    if (job.status === 'done') return `<main id="main" class="record-workspace completed-workspace"><div class="section-heading"><span class="eyebrow">WORK ORDER ${number(job.id)}</span><span>Handover recorded</span></div>${receipt(job.id,false)}</main>`;
    return `<main id="main" class="record-workspace"><article class="work-record"><header class="record-header"><div class="record-topline"><span class="eyebrow">WORK ORDER ${number(job.id)}</span>${badge(job)}</div><h2 id="work-title" tabindex="-1">${esc(job.title)}</h2><p class="record-owner">For <strong>${esc(job.owner)}</strong></p></header><figure class="object-drawing">${drawing(job.id)}<figcaption>${number(job.id)} / ${esc(job.title)}</figcaption></figure><section class="record-body"><div class="panel-heading"><span class="step-number">01</span><h3>Repair record</h3></div><p class="repair-copy">${esc(job.repair)}</p>${job.customer_note?`<blockquote><span class="eyebrow">MINA’S NOTE</span><p>“${esc(job.customer_note)}”</p></blockquote>`:`<div class="owner-annotation"><span class="eyebrow">${job.id===18?'COLLECTION NOTE':'REPAIR HOLD'}</span><p>${job.id===18?'Old belt packed with the unit.':'The replacement switch and final test are still needed.'}</p></div>`}${noteEditor(job.id)}</section>${actionPanel(job)}</article></main>`;
  }
  function handovers() {
    const state = workshop.state;
    const entries = state.records.map(r=>`<button class="handover-entry ${state.recordOpen===r.id?'selected':''}" data-action="record" data-id="${r.id}" data-testid="record-${r.id}" aria-pressed="${state.recordOpen===r.id}"><span class="record-number">${number(r.id)}</span>${drawing(r.id)}<span class="entry-copy"><strong>${esc(r.title)}</strong><span>${esc(r.owner)} · ${esc(r.method)}</span>${r.address?`<b>${esc(r.address)}</b>`:'<b>Collection</b>'}</span><span class="entry-arrow" aria-hidden="true">↗</span></button>`).join('');
    return `<main id="main" class="handover-workspace"><div class="page-heading"><div><span class="eyebrow">THE HANDOVER BOOK</span><h1>Handovers</h1></div><p>Only cleared work orders appear here.</p></div>${state.records.length?`<div class="handover-layout"><section class="handover-list" aria-label="Completed work orders"><div class="section-heading"><span class="eyebrow">COMPLETED RECORDS</span><span>${state.records.length} ${state.records.length===1?'handover':'handovers'}</span></div>${entries}<p class="ledger-end">${state.records.length===2?'Both ready jobs have cleared. Kitchen radio remains waiting for the replacement switch and final test.':'The other objects remain on the bench.'}</p></section><section class="handover-inspector" aria-label="Record details">${state.recordOpen?receipt(state.recordOpen,true):`<div class="inspect-placeholder"><span aria-hidden="true">↖</span><h2>Open a handover record</h2><p>Inspect the actual handover details or restore an object to its previous stage.</p></div>`}</section></div>`:`<section class="empty-handovers"><div class="empty-book" aria-hidden="true"><span>017</span><span>018</span><span>019</span></div><span class="eyebrow">NO HANDOVERS YET</span><h2>The book is still open.</h2><p>There are no completed records in this visit. Confirm the lamp’s corrected address or record the turntable’s collection to add a handover.</p><button class="primary" data-action="bench">Return to bench <span aria-hidden="true">↗</span></button><p class="empty-caption">3 objects remain on the bench.</p></section>`}</main>`;
  }
  function render(focusSelector) {
    const state = workshop.state, counts = workshop.counts();
    document.body.dataset.direction = direction;
    document.body.dataset.surface = state.surface;
    document.getElementById('fixture').value = fixtureName;
    document.getElementById('open-count').textContent = counts.open;
    document.getElementById('handover-count').textContent = counts.handovers;
    document.getElementById('direction-caption').textContent = direction.toUpperCase()+' / '+names[direction];
    document.querySelectorAll('[data-direction]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.direction===direction)));
    document.querySelectorAll('.surface-nav button').forEach(b=>b.setAttribute('aria-current',b.dataset.action===state.surface?'page':'false'));
    document.getElementById('app').innerHTML = state.surface==='handovers'?handovers():`<div class="bench-heading"><div><span class="eyebrow">FROM REPAIR TO HANDOVER</span><h1>On the bench</h1></div><p>${counts.open===1?'Kitchen radio remains waiting.':counts.open+' open work orders. Finish each handover with care.'}</p></div><div class="bench-layout">${jobIndex()}${workRecord()}</div>`;
    if (focusSelector) document.querySelector(focusSelector)?.focus({preventScroll:true});
  }
  document.addEventListener('click',event=>{
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.dataset.direction) {
      direction = button.dataset.direction;
      const url = new URL(location.href); url.searchParams.set('direction',direction); history.replaceState(null,'',url);
      render(); return;
    }
    const action = button.dataset.action, id = Number(button.dataset.id);
    if (action==='job') {workshop.state.selected=id; render('#work-title, #receipt-title');}
    if (action==='bench' || action==='handovers') {workshop.state.surface=action; render();}
    if (action==='record') {workshop.state.recordOpen=id; render('#receipt-title');}
    if (action==='finish') {const success=workshop.finish(id); render(success?'#receipt-title':'[data-testid="operation-error"]');}
    if (action==='undo') {
      workshop.undo(id);
      workshop.state.surface='bench';
      workshop.state.selected=id;
      const target=id===17?'[data-testid="address-corrected"]':'[data-testid="collect"]';
      render(target);
      document.querySelector(target)?.scrollIntoView({block:'nearest'});
    }
    if (action==='reset') {workshop=DispatchModel.create(fixture,fixtureName); render();}
  });
  document.addEventListener('change',event=>{
    if (event.target.name==='address') {workshop.chooseAddress(event.target.value); render(`[data-testid="address-${event.target.value}"]`);}
    if (event.target.id==='fixture') {const url = new URL(location.href); url.searchParams.set('fixture',event.target.value); location.assign(url.href);}
  });
  document.addEventListener('input',event=>{if(event.target.dataset.note) workshop.state.notes[event.target.dataset.note]=event.target.value;});
  render();
})();
