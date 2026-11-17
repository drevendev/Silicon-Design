'use strict';
const $ = id => document.getElementById(id), key = 'silicon-nightjar-1';
let state = Decisions.game(), language = new URLSearchParams(location.search).get('lang') === 'ru' ? 'ru' : 'en', reader = null, returnOwner = null, returnY = 0, effects = 0, storageDenied = false;
const historyNodes=new Map();
const words = {
  title:['A light for the way home','Огонёк для дороги домой'], subtitle:['Choose a lantern. Keep its light on the path.','Выберите фонарик. Пусть он освещает дорогу.'],
  preview:['Preview','Предпросмотр'],hang:['Hang lantern','Подвесить фонарь'],choose:['Choose this copy','Выбрать экземпляр'],confirm:['Accept for','Принять за'],back:['Back','Назад'],cancel:['Cancel · retain draft','Отмена · сохранить черновик'],
  chooseGuide:['Choose a lantern to inspect','Выберите фонарь и рассмотрите его'],previewGuide:['Your draft is ready to preview','Черновик готов к просмотру'],confirmGuide:['Review the exact price, then accept','Проверьте точную цену и примите заказ'],hangGuide:['Your lantern is ready. Hang it on the path.','Ваш фонарь готов. Подвесьте его на тропе.'],doneGuide:['A light stays on the path','На тропе остался огонёк'],skippedGuide:['Guide skipped; workshop remains available','Подсказки пропущены; мастерская доступна'],
  accepted:['Accepted. Nothing hangs until you choose Hang.','Заказ принят. Фонарь появится на тропе после подвешивания.'],hung:['The lantern is hanging.','Фонарь подвешен.'],refused:['Conditions changed. Draft retained; nothing charged. Preview again.','Условия изменились. Черновик сохранён; ничего не списано. Проверьте заново.'],
  idle:['No lantern hangs yet.','На тропе пока нет фонарей.'],lit:['lantern(s) on the path','фонарей на тропе'],stock:['available','доступно'],tokens:['tokens','жетонов'],settings:['Settings','Настройки'],motion:['Motion on','Движение включено'],audio:['No audio is included. All outcomes remain visible.','Звука нет. Все результаты видны без него.'],note:['Workshop note','Записка мастеру'],hint:['Inspect keeps your choice. Preview does not spend tokens. The action below remains available.','Просмотр не меняет выбор. Предпросмотр не тратит жетоны. Кнопка действия ниже остаётся доступной.']
};
const t = id => words[id][language === 'ru' ? 1 : 0];
function art(kind) { const hue = [36,168,48,78,202][kind]; return `<svg class="art" viewBox="0 0 120 150" aria-hidden="true"><g stroke="hsl(${hue} 48% 70%)" stroke-width="3" fill="none"><path d="M43 28V14q17-18 34 0v14M29 40h62l-7 78H36zM22 40h76M31 118h58M41 128h38"/><path d="M45 48l15 55 15-55M35 77h50" opacity=".55"/><path d="M60 54q-22 35 0 43 22-8 0-43" fill="hsl(${hue} 65% 72%)" stroke="none"/><path d="M52 103h16"/></g></svg>`; }
let original = null;
try { original = localStorage.getItem(key); } catch { storageDenied = true; }
if (original) { const saved=Decisions.restoreGame(original);if(saved)state=saved;else{$('recovery').hidden=false;$('raw').textContent=original;} }
try{const preserved=localStorage.getItem(key+'-original');if(preserved&&$('recovery').hidden){$('recovery').hidden=false;$('recovery-title').textContent='Preserved unreadable original';$('raw').textContent=preserved;}}catch{}
function persist() { try { if (storageDenied) throw Error();if(original&&!Decisions.restoreGame(original)){const previous=localStorage.getItem(key+'-original');if(previous&&previous!==original)throw Error();localStorage.setItem(key+'-original',original);original=null;}localStorage.setItem(key, JSON.stringify(state));$('storage-status').hidden=true;return true; } catch { $('storage-status').hidden=false;$('storage-status').textContent = language === 'ru' ? 'Сеанс остаётся открыт, но локальное сохранение недоступно.' : 'Session retained here; local saving is unavailable.'; return false; } }
function feedback(event) { if (!event) return; effects++; $('path').classList.remove('pulse'); void $('path').offsetWidth; $('path').classList.add('pulse'); }
function send(action) { const result = Decisions.command(state,action); state = result.state; render(); persist(); if (result.event) feedback(result.event); return result; }
for (const item of state.offers) {
  const offer = document.createElement('article'); offer.className = 'offer'; offer.id = item.id;
  const button = document.createElement('button'); button.id = 'inspect-' + item.id; button.className = 'inspect';
  button.innerHTML = art(item.kind) + '<strong></strong><span class="effect"></span><span class="price"></span>';
  button.addEventListener('click',()=>openReader('inspect',item.id,button)); offer.append(button); $('offers').append(offer);
}
function render() {
  document.documentElement.lang = language; $('lang').value = language;
  $('title').textContent=t('title'); $('subtitle').textContent=t('subtitle'); $('funds').textContent=`${state.funds} ${t('tokens')}`;
  for (const item of state.offers) { const f=Decisions.fact(item,language), el=$('inspect-'+item.id); el.querySelector('strong').textContent=f.name;el.querySelector('.effect').textContent=f.short;el.querySelector('.price').textContent=`${f.cost} · ${item.stock} ${t('stock')}`;el.setAttribute('aria-label',f.name+'. '+f.short+'. '+f.cost+' '+t('tokens'));$(item.id).classList.toggle('chosen',state.draft?.id===item.id); }
  const step=Decisions.guide(state);$('guide').textContent=t(step+'Guide');$('draft-summary').textContent=state.draft?Decisions.fact(state.offers.find(x=>x.id===state.draft.id),language).name:'';
  $('preview').textContent=t('preview');$('preview').disabled=!state.draft;$('hang').textContent=t('hang');$('hang').disabled=state.accepted.length===state.hung.length;
  $('path-text').textContent=state.hung.length?state.hung.length+' '+t('lit'):t('idle');$('path').dataset.lit=String(state.hung.length>0);
  $('settings-label').textContent=t('settings');$('motion-label').textContent=t('motion');$('audio-note').textContent=t('audio');$('hint').textContent=t('hint');
  for(const x of state.accepted){if(!historyNodes.has(x.id)){const li=document.createElement('li'),line=document.createElement('span'),button=document.createElement('button');button.id='accepted-'+x.copy.id;button.onclick=()=>openReader('inspect',x.copy.id,button);li.append(line,button);historyNodes.set(x.id,li);$('history').append(li);}const li=historyNodes.get(x.id);li.querySelector('span').textContent=`${x.id}: ${Decisions.fact(x.copy,language).name} · ${x.fact.cost} · ${x.note} `;li.querySelector('button').textContent=language==='ru'?'Рассмотреть экземпляр':'Inspect physical copy';}
  if (reader) fillReader();
}
function fillReader() {
  const copy=state.offers.find(x=>x.id===reader.id), f=Decisions.fact(copy,language);
  $('reader-title').textContent=f.name;$('reader-rule').textContent=f.full;$('reader-art').innerHTML=art(copy.kind);$('reader-note').textContent=`${f.id} · ${t('stock')}: ${copy.stock}`;
  const quote=reader.mode==='preview';$('draft-fields').hidden=!quote;$('choose').hidden=quote;$('confirm').hidden=!quote;$('choose').textContent=t('choose');$('close-reader').textContent=t(quote?'cancel':'back');$('note-label').textContent=t('note');
  $('confirm').textContent=t('confirm')+' '+(state.preview?.cost??f.cost)+' '+t('tokens');$('quote').textContent=(language==='ru'?'Точная сумма: ':'Exact total: ')+(state.preview?.cost??f.cost)+' '+t('tokens');
}
function openReader(mode,id,owner) { reader={mode,id};returnOwner=owner;returnY=scrollY;$('refusal').textContent='';fillReader();$('note').value=state.draft?.note||'';$('reader').showModal();$('close-reader').focus(); }
function closeReader(){const closed=reader;reader=null;if(closed?.mode==='preview')send({type:'cancel'});$('reader').close();returnOwner?.isConnected?returnOwner.focus({preventScroll:true}):$('preview').focus();scrollTo(0,returnY);}
$('reader').addEventListener('cancel',event=>{event.preventDefault();closeReader();});
$('close-reader').onclick=closeReader;
$('choose').onclick=()=>{send({type:'choose',id:reader.id});closeReader();$('preview').focus();};
$('preview').onclick=()=>{send({type:'preview'});openReader('preview',state.draft.id,$('preview'));};
$('note').oninput=()=>send({type:'note',note:$('note').value});
$('confirm').onclick=()=>{const r=send({type:'commit'});if(r.outcome==='refused'){$('refusal').textContent=t('refused');}else if(r.outcome==='accepted'){closeReader();$('status').textContent=t('accepted');$('hang').focus();}};
$('hang').onclick=()=>{const r=send({type:'hang'});if(r.event)$('status').textContent=t('hung');};
$('lang').onchange=()=>{language=$('lang').value;render();};
$('motion').onchange=()=>document.documentElement.classList.toggle('motion-off',!$('motion').checked);
$('stale').onclick=()=>send({type:'stock',id:state.draft?.id||state.offers[0].id,stock:0});
$('rerender').onclick=render;$('skip').onclick=()=>send({type:'skip'});
$('hint-toggle').onclick=()=>{const visible=$('hint').hidden;$('hint').hidden=!visible;$('hint-toggle').setAttribute('aria-pressed',String(visible));};
$('layout').onchange=()=>{$('dock').classList.toggle('fixed',$('layout').value==='fixed');reserveDock();};
function reserveDock(){document.body.style.paddingBottom=$('dock').classList.contains('fixed')?($('dock').getBoundingClientRect().height+20)+'px':'0px';}new ResizeObserver(reserveDock).observe($('dock'));
$('deny').onchange=()=>storageDenied=$('deny').checked;
$('broken').onclick=()=>{$('recovery').hidden=false;$('raw').textContent='{"format":1,"original":"Ёж / unreadable';};
$('diagnostic').onclick=()=>{const a=document.createElement('a');const url=URL.createObjectURL(new Blob([$ ('raw').textContent],{type:'text/plain'}));a.href=url;a.download='nightjar-original-diagnostic.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('download-status').textContent='Diagnostic download requested; file saving is not observed.';};
$('deny-download').onclick=()=>$('download-status').textContent='Download blocked in this simulation. The exact original remains selectable above.';
$('reset').onclick=()=>{localStorage.removeItem(key);localStorage.removeItem(key+'-original');location.reload();};
window.exchangeQA={state:()=>JSON.parse(JSON.stringify(state)),effects:()=>effects,send,art};
render();
