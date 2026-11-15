(()=>{'use strict';
const C=StudyCore,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],names={market:'Market',management:'Management / Hired Hands',shop:'Shop — полки',set:'Целостность комплекта',whole_site:'Сайт целиком'};
let corpus=window.IFS_CORPUS,tasks=[],session,index=0,locale='ru',view='desktop',zoom='fit',runtimeSide=null,runtimeURL=null,paintVersion=0,loaded={left:false,right:false},runtimeDisplay={left:null,right:null};
const initialQA=new URLSearchParams(location.hash.slice(1)).get('qa')==='1';
const notice=message=>{$('#notice').textContent=message;};
const key=()=>`blind-test:${corpus.study_id}:${corpus.corpus_id}:${session?.qa??initialQA?'qa':'human'}`;
function persist(){session.cursor=index;session.preferences={locale,view,zoom};try{localStorage.setItem(key(),JSON.stringify(session));$('#storage-status').textContent='Прогресс сохранён в этом браузере.';}catch{$('#storage-status').textContent='Хранилище браузера недоступно. Экспортируйте JSON, чтобы сохранить ответы.';}}
function initialize(){Object.assign(names,corpus.screen_labels??{});for(const x of corpus.screens??[])names[x]??=x;tasks=C.scheduleCorpus(corpus);session=C.newSession(corpus,initialQA);try{const old=localStorage.getItem(key());if(old)session=C.validateSession(JSON.parse(old),corpus);}catch{notice('Сохранённый прогресс не прочитан. Можно импортировать JSON.');}
 document.documentElement.dataset.corpusId=corpus.corpus_id;
 index=Math.min(Math.max(0,Number(session.cursor)||0),tasks.length-1);({locale='ru',view='desktop',zoom='fit'}=session.preferences??{});
 $('#locale').replaceChildren(...(corpus.supported_locales??['ru','en']).map(x=>new Option(x.toUpperCase(),x)));$('#view').replaceChildren(...(corpus.supported_views??['desktop','mobile','full']).map(x=>new Option(x,x)));locale=(corpus.supported_locales??['ru','en']).includes(locale)?locale:(corpus.supported_locales??['ru'])[0];view=(corpus.supported_views??['desktop','mobile','full']).includes(view)?view:(corpus.supported_views??['desktop'])[0];$('#locale').value=locale;$('#view').value=view;$('#zoom').value=zoom;
 const setCount=tasks.filter(t=>t.block==='set').length,siteCount=tasks.filter(t=>t.block==='whole_site').length;
 $('#corpus-note').textContent=`${corpus.artifacts.length} вариантов · ${corpus.comparison?.format==='selected_pairs'?'выбранные пары':'полный круг'} · ${tasks.length} заданий: ${siteCount} сайтов целиком, ${tasks.length-setCount-siteCount} поверхностей, ${setCount} комплектов · корпус ${corpus.corpus_id.slice(0,12)}`;
 $('#unit-note').textContent=siteCount?'Два рабочих сайта. Навигация внутри каждой стороны независима; переходы и дополнительные снимки не добавляют голосов. Можно остановиться досрочно. Локальный HTTP-сервер обязателен; ничего не публикуется.':'Оценивайте объявленную поверхность. Только отдельный протокол целостности требует показать все поверхности с обеих сторон. Можно остановиться досрочно.';
 $('#candidates').textContent='Нейтральные варианты: '+corpus.artifacts.map(a=>a.id).join(', ');
 $('#fixture').replaceChildren(...(corpus.fixtures??['main']).map(id=>new Option(id==='main'?'Основные данные':id,id)));
 $$('button,input[type="file"]').forEach(x=>x.disabled=false);$('#confirm-next').disabled=true;updateStatus();}
function updateStatus(){const all=tasks.length,done=session.answers.length;$('#status').textContent=`${session.qa?'Синтетическая QA-сессия · ':''}Ответов: ${done} / ${all}`;}
function current(){return tasks[index];}
function artifact(side){return corpus.artifacts.find(a=>a.id===current()[side]);}
function selectedScreen(side){return current().block==='whole_site'?null:($(`.pane[data-side="${side}"] .screen-choice`).value||(corpus.screens??['market'])[0]);}
function siteEntry(side){const site=artifact(side).site;return site.entries?.[locale]??site.entry;}
function measureSite(side){
 if(!session||current()?.block!=='whole_site'||!loaded[side])return;
 const pane=$(`.pane[data-side="${side}"]`),frame=pane.querySelector('.site-frame');
 try{
  const route=new URL(frame.contentWindow.location.href),prefix=new URL('sites/'+artifact(side).id+'/',location.href);
  if(route.origin!==prefix.origin||!route.pathname.startsWith(prefix.pathname))return;
  const d={route:route.pathname.slice(prefix.pathname.length)+route.search+route.hash,width:frame.contentWindow.innerWidth,height:frame.contentWindow.innerHeight,document_lang:frame.contentDocument.documentElement.lang};
  runtimeDisplay[side]=d;
  pane.querySelector('.runtime-metrics').textContent=`Рабочая область: ${d.width} × ${d.height} CSS px · язык документа: ${d.document_lang||'не указан'}`;
 }catch{runtimeDisplay[side]=null;}
}
function render(){
 $('#intro').hidden=true;$('#done').hidden=true;$('#workspace').hidden=false;
 const t=current(),a=session.answers.find(a=>a.pair_id===t.pair_id);$('#task-title').textContent=names[t.block];$('#task-count').textContent=`Задание ${index+1} из ${tasks.length}`;$('#comment').value=session.drafts?.[t.pair_id]??a?.comment??'';
 $$('.pane').forEach(p=>{const choice=p.querySelector('.screen-choice');choice.replaceChildren(...(t.block==='set'?(corpus.screens??['market','management','shop']):t.screen?[t.screen]:[]).map(s=>new Option(names[s],s)));choice.hidden=t.block!=='set';p.querySelector('h2').textContent=(p.dataset.side==='left'?'Левая':'Правая')+' · '+t[p.dataset.side];});
 $$('[data-vote]').forEach(b=>{b.classList.toggle('selected',(session.pending_votes?.[t.pair_id]??a?.winner)===b.dataset.vote);b.setAttribute('aria-pressed',String((session.pending_votes?.[t.pair_id]??a?.winner)===b.dataset.vote));});
 $('#previous').disabled=index===0;paint();updateStatus();persist();
}
function paint(){
 const whole=current().block==='whole_site';$('#workspace').classList.toggle('whole-sites',whole);
 $$('.pane').forEach(p=>{p.querySelector('.site-scroll').hidden=!whole;p.querySelector('.runtime-metrics').hidden=!whole;p.querySelector('.image-scroll').hidden=whole;p.querySelector('.reset-site').hidden=!whole;p.querySelector('.supplement').hidden=!whole;});
 if(whole){paintSites();return;}
 const generation=++paintVersion,t=current();loaded={left:false,right:false};for(const side of ['left','right']){const p=$(`.pane[data-side="${side}"]`),shot=p.querySelector('.shot'),screen=selectedScreen(side),capture=artifact(side).captures[screen+'/'+locale+'/'+view];shot.onload=()=>{if(generation!==paintVersion||current().pair_id!==t.pair_id||shot.src!==capture||!shot.complete||!shot.naturalWidth)return;loaded[side]=true;session.seen_screens??={};const seen=session.seen_screens[t.pair_id]??={left:[],right:[]};if(!seen[side].includes(screen))seen[side].push(screen);ready();persist();};shot.onerror=()=>{if(generation===paintVersion){loaded[side]=false;ready();notice('Снимок не загрузился. Ответ не записан; можно пропустить задание.');}};shot.src=capture;if(shot.complete&&shot.naturalWidth)shot.onload();p.querySelector('.runtime').hidden=!artifact(side).runtime_b64;shot.style.width=zoom==='fit'?'100%':((view==='mobile'?390:1280)*Number(zoom)/100)+'px';p.querySelector('.image-scroll').scrollTo(0,0);}ready();
}
function paintSites(){
 const generation=++paintVersion,t=current();loaded={left:false,right:false};runtimeDisplay={left:null,right:null};
 for(const side of ['left','right']){
  const p=$(`.pane[data-side="${side}"]`),frame=p.querySelector('.site-frame'),a=artifact(side);p.querySelector('.runtime').hidden=true;
  // Each side owns its document/navigation. Loading either never repaints the pair or draft.
  frame.onload=()=>{if(generation!==paintVersion||current().pair_id!==t.pair_id)return;let route;try{route=new URL(frame.contentWindow.location.href);const prefix=new URL('sites/'+a.id+'/',location.href);if(route.origin!==prefix.origin||!route.pathname.startsWith(prefix.pathname))throw Error('outside package');if(frame.contentDocument?.title==='Error response')throw Error('missing page');}catch{loaded[side]=false;runtimeDisplay[side]=null;p.querySelector('.runtime-metrics').textContent='Рабочая страница недоступна.';ready();notice('Рабочая страница недоступна. Вернитесь к началу сайта или запишите дефект.');return;}loaded[side]=true;measureSite(side);session.seen_routes??={};const log=session.seen_routes[t.pair_id]??={left:[],right:[]};const path=runtimeDisplay[side].route;if(!log[side].includes(path))log[side].push(path);ready();persist();};
  const baseWidth=view==='mobile'?390:1280;
  frame.style.width=zoom==='fit'?(view==='mobile'?'390px':'100%'):(baseWidth*Number(zoom)/100)+'px';frame.style.height=view==='mobile'?'844px':'720px';p.querySelector('.runtime-metrics').textContent='Загрузка рабочего сайта…';frame.src=siteEntry(side);
  const supplement=p.querySelector('.supplement');supplement.replaceChildren();const entries=Object.entries(a.captures??{});if(entries.length){const summary=document.createElement('summary');summary.textContent='Дополнительные снимки (не рабочий сайт)';supplement.append(summary);for(const [label,src]of entries){const text=document.createElement('p');text.textContent=label;const img=document.createElement('img');img.src=src;img.alt=label;supplement.append(text,img);}}else supplement.hidden=true;
 }
 ready();
}
async function verifyRuntime(c){if(c.evaluation_unit!=='whole_site')return;if(!['http:','https:'].includes(location.protocol))throw Error('Для рабочих сайтов запустите локальный HTTP-сервер из папки корпуса.');for(const a of c.artifacts)for(const [path,expected]of Object.entries(a.site.files)){const response=await fetch(path,{cache:'no-store'});if(!response.ok)throw Error('Не найден файл сайта: '+path);const digest=await crypto.subtle.digest('SHA-256',await response.arrayBuffer());if([...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,'0')).join('')!==expected)throw Error('Файл сайта изменён: '+path);}}
function next(){if(index<tasks.length-1){index++;render();}else{const unanswered=tasks.findIndex(t=>!session.answers.some(a=>a.pair_id===t.pair_id));if(unanswered>=0){index=unanswered;render();notice('Остались пропущенные задания. Они не считаются ничьими.');}else finish('complete');}}
function ready(){const t=current(),winner=session.pending_votes?.[t.pair_id]??session.answers.find(a=>a.pair_id===t.pair_id)?.winner;const seen=session.seen_screens?.[t.pair_id];const screens=corpus.screens??['market','management','shop'];const exposed=t.block!=='set'||['left','right'].every(side=>screens.every(s=>seen?.[side]?.includes(s)));$('#confirm-next').disabled=!winner||!exposed||!loaded.left||!loaded.right;$('#exposure-note').textContent=exposed?'': 'Для оценки комплекта просмотрите все страницы с обеих сторон.';}
function vote(winner){session.pending_votes??={};session.pending_votes[current().pair_id]=winner;$$('[data-vote]').forEach(b=>{b.classList.toggle('selected',b.dataset.vote===winner);b.setAttribute('aria-pressed',String(b.dataset.vote===winner));});persist();ready();$('#comment').focus();}
function commitVote(winner){const t=current(),answer={block:t.block,screen:t.screen,pair_id:t.pair_id,left_artifact_id:t.left,right_artifact_id:t.right,winner,comment:$('#comment').value,timestamp:new Date().toISOString(),locale,view,zoom,left_screen:selectedScreen('left'),right_screen:selectedScreen('right')};if(t.block==='whole_site'){for(const side of ['left','right'])measureSite(side);answer.runtime_display=JSON.parse(JSON.stringify(runtimeDisplay));}session.answers=session.answers.filter(a=>a.pair_id!==t.pair_id);session.answers.push(answer);delete session.drafts?.[t.pair_id];delete session.pending_votes?.[t.pair_id];persist();next();}
$('#confirm-next').onclick=()=>{if(!$('#confirm-next').disabled)commitVote(session.pending_votes?.[current().pair_id]??session.answers.find(a=>a.pair_id===current().pair_id)?.winner);};
function finish(state){session.completion=state;session.finished_at=new Date().toISOString();persist();$('#intro').hidden=true;$('#workspace').hidden=true;$('#done').hidden=false;$('#done-title').textContent=state==='complete'?'Все сравнения завершены':'Сессия завершена досрочно';$('#done-text').textContent=`Сохранено ответов: ${session.answers.length}. Пропущено: ${tasks.length-session.answers.length}. Сайты, поверхности и целостность комплектов анализируются по своему протоколу отдельно. Экспортируйте ответы и передайте их координатору. Методы в этом стенде не раскрываются.`;updateStatus();}
function download(name,value){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function exportAnswers(){C.validateSession(session,corpus);download(`votes-${session.session_id}${session.qa?'-SYNTHETIC-QA':''}.json`,session);}
function loadRuntime(){
 if(runtimeURL)URL.revokeObjectURL(runtimeURL);
 const bytes=Uint8Array.from(atob(artifact(runtimeSide).runtime_b64),c=>c.charCodeAt(0));
 const policy=`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; media-src data: blob:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'">`;
 const html=new TextDecoder().decode(bytes).replace('<head>','<head>'+policy);
 runtimeURL=URL.createObjectURL(new Blob([html],{type:'text/html'}));
 const frame=$('#runtime-dialog iframe'),screen=selectedScreen(runtimeSide),params=new URLSearchParams({screen,locale,fixture:$('#fixture').value});
 frame.width=view==='mobile'?390:1280;frame.height=view==='mobile'?844:800;frame.style.width=frame.width+'px';frame.style.height=frame.height+'px';frame.src=runtimeURL+'#'+params;$$('#fixture,#play,#pause,#step').forEach(x=>x.hidden=corpus.runtime_protocol!=='idle-review');$('#runtime-title').textContent=(runtimeSide==='left'?'Левая':'Правая')+' · '+names[screen]+' · '+locale.toUpperCase();
}
function message(action,extra={}){$('#runtime-dialog iframe').contentWindow?.postMessage({type:'idle-review',action,...extra},'*');}
function closeRuntime(){message('pause');$('#runtime-dialog iframe').src='about:blank';if(runtimeURL)URL.revokeObjectURL(runtimeURL);runtimeURL=null;runtimeSide=null;}
$('#start').onclick=()=>session.completion==='in_progress'?render():finish(session.completion);
$$('.reset-site').forEach(b=>b.onclick=()=>{const side=b.closest('.pane').dataset.side;loaded[side]=false;runtimeDisplay[side]=null;ready();b.closest('.pane').querySelector('.site-frame').src=siteEntry(side);});
$$('.site-frame').forEach(frame=>new ResizeObserver(()=>measureSite(frame.closest('.pane').dataset.side)).observe(frame));
$('#resume').onclick=()=>{session.completion='in_progress';session.finished_at=null;render();};
$$('[data-vote]').forEach(b=>b.onclick=()=>vote(b.dataset.vote));
$('#previous').onclick=()=>{if(index>0){index--;render();}};$('#skip').onclick=next;
$('#comment').oninput=()=>{session.drafts??={};session.drafts[current().pair_id]=$('#comment').value;persist();};
for(const field of ['locale','view','zoom'])$('#'+field).onchange=()=>{locale=$('#locale').value;view=$('#view').value;zoom=$('#zoom').value;paint();persist();};
$$('.screen-choice').forEach(s=>s.onchange=paint);
$$('.runtime').forEach(b=>b.onclick=()=>{runtimeSide=b.closest('.pane').dataset.side;$('#fixture').value='main';loadRuntime();$('#runtime-dialog').showModal();});
$('#close-runtime').onclick=()=>$('#runtime-dialog').close();$('#runtime-dialog').addEventListener('close',closeRuntime);
$('#fixture').onchange=loadRuntime;$('#reset').onclick=loadRuntime;$('#play').onclick=()=>message('play');$('#pause').onclick=()=>message('pause');$('#step').onclick=()=>message('step',{ms:1000});
$('#defect').onclick=()=>{$('#defect-comment').value='';$('#defect-dialog').showModal();};
$('#defect-dialog').addEventListener('close',()=>{if($('#defect-dialog').returnValue!=='save')return;session.defects.push({pair_id:current().pair_id,side:$('#defect-side').value,comment:$('#defect-comment').value,timestamp:new Date().toISOString(),locale,view,zoom});persist();});
$('#early').onclick=()=>{if(confirm('Завершить с текущими ответами? Пропуски останутся без голоса.'))finish('early_stopped');};
$('#export').onclick=exportAnswers;$('#export-done').onclick=exportAnswers;
$('#import').onchange=async e=>{try{const s=C.validateSession(JSON.parse(await e.target.files[0].text()),corpus);session=s;index=Math.min(Number(s.cursor)||0,tasks.length-1);({locale='ru',view='desktop',zoom='fit'}=s.preferences??{});$('#locale').replaceChildren(...(corpus.supported_locales??['ru','en']).map(x=>new Option(x.toUpperCase(),x)));$('#view').replaceChildren(...(corpus.supported_views??['desktop','mobile','full']).map(x=>new Option(x,x)));locale=(corpus.supported_locales??['ru','en']).includes(locale)?locale:(corpus.supported_locales??['ru'])[0];view=(corpus.supported_views??['desktop','mobile','full']).includes(view)?view:(corpus.supported_views??['desktop'])[0];$('#locale').value=locale;$('#view').value=view;$('#zoom').value=zoom;persist();session.completion==='in_progress'?render():finish(session.completion);notice('Ответы импортированы.');}catch(error){notice(error.message);}finally{e.target.value='';}};
$('#export-corpus').onclick=()=>download('corpus-'+corpus.corpus_id.slice(0,12)+'.json',corpus);
$('#import-corpus').onchange=async e=>{try{const c=await C.verifyCorpus(JSON.parse(await e.target.files[0].text()));if(c.runner_sha256!==corpus.runner_sha256)throw Error('Корпус подготовлен для другой версии стенда. Пересоберите его с согласованным протоколом.');if(c.runtime_package_id!==corpus.runtime_package_id)throw Error('Пакет рабочих сайтов отличается. Откройте соответствующую папку корпуса.');await verifyRuntime(c);if(!confirm('Открыть импортируемый корпус? Текущий прогресс останется сохранён под прежним ID.'))return;persist();corpus=c;initialize();$('#workspace').hidden=true;$('#done').hidden=true;$('#intro').hidden=false;notice('Корпус импортирован.');}catch(error){notice(error.message);}finally{e.target.value='';}};
$('.answer').prepend($('.votes'));
$('#confirm-next').style.marginTop='.8rem';
$$('button,input[type="file"]').forEach(x=>x.disabled=true);
C.verifyCorpus(corpus).then(verifyRuntime).then(initialize).catch(error=>{$('#start').disabled=true;notice(error.message);});
})();
