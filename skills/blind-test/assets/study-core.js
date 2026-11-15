(function(root){
  'use strict';
  const blocks=['market','management','shop','set'];
  const rand=seed=>()=>{let t=seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};
  function shuffle(xs,r){xs=[...xs];for(let i=xs.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[xs[i],xs[j]]=[xs[j],xs[i]];}return xs;}
  function schedule(ids,seed=20261114,screens=blocks.slice(0,3)){
    if(new Set(ids).size!==ids.length||ids.length<2)throw Error('Invalid artifact IDs');
    const r=rand(seed),order=shuffle([...ids].sort(),r),odd=ids.length%2?ids.length:ids.length+1,tasks=[];
    [...screens,'set'].forEach((block,b)=>{for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){
      const forward=(j-i)<=Math.floor(odd/2),flip=Boolean(b%2),a=order[i],c=order[j];
      const [left,right]=forward!==flip?[a,c]:[c,a];
      tasks.push({block,screen:block==='set'?null:block,pair_id:block+':'+[a,c].sort().join('~'),left,right});
    }});
    return shuffle(tasks,r);
  }
  // The legacy schedule is immutable: reading an old session never moves its answers.
  function scheduleCorpus(c){
    if(c.schema_version===1)return schedule(c.artifacts.map(a=>a.id),c.seed,c.screens);
    const ids=c.artifacts.map(a=>a.id),r=rand(c.seed),order=shuffle([...ids].sort(),r),odd=ids.length%2?ids.length:ids.length+1;
    let pairs=[];
    if(c.comparison.format==='round_robin')for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++)pairs.push((j-i)<=Math.floor(odd/2)?[order[i],order[j]]:[order[j],order[i]]);
    else pairs=c.comparison.pairs.map(p=>c.comparison.side_control==='as_listed'?[p.left,p.right]:(r()<.5?[p.left,p.right]:[p.right,p.left]));
    const units=c.evaluation_unit==='whole_site'?['whole_site']:c.evaluation_unit==='surface'?[c.screens[0]]:[...c.screens,...(c.coherence?['set']:[])];
    return shuffle(units.flatMap((block,b)=>pairs.map(([a,d])=>{const [left,right]=b%2&&c.comparison.side_control!=='as_listed'?[d,a]:[a,d];return {block,screen:['set','whole_site'].includes(block)?null:block,pair_id:block+':'+[a,d].sort().join('~'),left,right};})),r);
  }
  function validateEvaluation(c){
    if(c.schema_version===1){if(![1,2].includes(c.protocol_version)||c.evaluation_unit!==undefined||c.comparison!==undefined||c.coherence!==undefined)throw Error('Legacy protocol cannot be reinterpreted.');return;}
    if(c.schema_version!==2||c.protocol_version!==3||!['whole_site','surface','multi_surface'].includes(c.evaluation_unit))throw Error('Unknown evaluation contract.');
    const ids=c.artifacts.map(a=>a.id),p=c.comparison;
    if(!p||!['round_robin','selected_pairs'].includes(p.format)||!['seeded','as_listed'].includes(p.side_control))throw Error('Explicit comparison format and side control required.');
    if(p.format==='round_robin'&&(p.pairs!==undefined||p.side_control!=='seeded'))throw Error('Round robin uses seeded sides.');
    if(p.format==='selected_pairs'){
      if(!Array.isArray(p.pairs)||!p.pairs.length)throw Error('Select at least one pair.');const seen=new Set();
      for(const pair of p.pairs){if(!pair||!ids.includes(pair.left)||!ids.includes(pair.right)||pair.left===pair.right)throw Error('Unknown pair.');const id=[pair.left,pair.right].sort().join('~');if(seen.has(id))throw Error('Duplicate pair.');seen.add(id);}
    }
    if(c.evaluation_unit==='multi_surface'){if(typeof c.coherence!=='boolean')throw Error('Select coherence explicitly.');}
    else if(c.coherence!==undefined)throw Error('Coherence only applies to multi-surface evaluation.');
    if(c.evaluation_unit==='surface'&&c.screens.length!==1)throw Error('Declare exactly one surface.');
  }
  function newSession(corpus,qa=false){return{schema_version:corpus.schema_version,...(corpus.schema_version===2?{evaluation_unit:corpus.evaluation_unit}:{}),study_id:corpus.study_id,protocol_version:corpus.protocol_version,corpus_id:corpus.corpus_id,session_id:root.crypto?.randomUUID?.()??('local-'+Date.now()+'-'+Math.random().toString(16).slice(2)),qa:qa||Boolean(corpus.qa_fixture),completion:'in_progress',started_at:new Date().toISOString(),finished_at:null,answers:[],defects:[]};}
  function validateSession(s,c){
    if(!s||s.schema_version!==c.schema_version||s.study_id!==c.study_id||s.protocol_version!==c.protocol_version||s.corpus_id!==c.corpus_id||(c.schema_version===2&&s.evaluation_unit!==c.evaluation_unit)||(c.schema_version===1&&s.evaluation_unit!==undefined))throw Error('Ответ относится к другому корпусу или протоколу.');
    if(typeof s.session_id!=='string'||typeof s.qa!=='boolean'||!['in_progress','complete','early_stopped'].includes(s.completion)||!Array.isArray(s.answers)||!Array.isArray(s.defects))throw Error('Некорректная сессия.');
    if(c.qa_fixture&&!s.qa)throw Error('Синтетический корпус требует QA-флаг.');
    for(const key of ['pending_votes','drafts','seen_screens'])if(s[key]!==undefined&&(!s[key]||typeof s[key]!=='object'||Array.isArray(s[key])))throw Error('Некорректные черновики.');
    const tasks=new Map(scheduleCorpus(c).map(t=>[t.pair_id,t])),seen=new Set();
    if(s.cursor!==undefined&&(!Number.isInteger(s.cursor)||s.cursor<0||s.cursor>=tasks.size))throw Error('Некорректный курсор.');
    if(s.preferences!==undefined&&(!s.preferences||(typeof s.preferences!=='object')||!(c.supported_locales??['ru','en']).includes(s.preferences.locale)||!(c.supported_views??['desktop','mobile','full']).includes(s.preferences.view)||!['fit','100','200'].includes(s.preferences.zoom)))throw Error('Некорректные настройки просмотра.');
    for(const a of s.answers){const t=tasks.get(a.pair_id);if(!t||seen.has(a.pair_id)||a.left_artifact_id!==t.left||a.right_artifact_id!==t.right||a.block!==t.block||a.screen!==t.screen||!['left','right','tie'].includes(a.winner)||typeof a.comment!=='string'||!Number.isFinite(Date.parse(a.timestamp))||!(c.supported_locales??['ru','en']).includes(a.locale)||!(c.supported_views??['desktop','mobile','full']).includes(a.view)||!['fit','100','200'].includes(a.zoom))throw Error('Некорректный ответ или пара.');seen.add(a.pair_id);}
    if(s.completion==='complete'&&seen.size!==tasks.size)throw Error('Завершённая сессия содержит пропуски.');
    if(c.schema_version===2)for(const a of s.answers)for(const side of ['left','right'])if(c.evaluation_unit==='whole_site'?a[side+'_screen']!==null:!c.screens.includes(a[side+'_screen'])||(a.block!=='set'&&a[side+'_screen']!==a.screen))throw Error('Invalid answer surface.');
    for(const [id,winner] of Object.entries(s.pending_votes??{}))if(!tasks.has(id)||!['left','tie','right'].includes(winner))throw Error('Некорректный черновик выбора.');
    for(const [id,comment] of Object.entries(s.drafts??{}))if(!tasks.has(id)||typeof comment!=='string')throw Error('Некорректный черновик комментария.');
    for(const [id,exposure] of Object.entries(s.seen_screens??{}))if(!tasks.has(id)||!['left','right'].every(side=>Array.isArray(exposure?.[side])&&exposure[side].every(x=>(c.screens??blocks.slice(0,3)).includes(x))))throw Error('Некорректная история просмотра.');
    if(s.seen_routes!==undefined){if(c.evaluation_unit!=='whole_site'||!s.seen_routes||typeof s.seen_routes!=='object'||Array.isArray(s.seen_routes))throw Error('Invalid route history.');for(const [id,log]of Object.entries(s.seen_routes))if(!tasks.has(id)||!['left','right'].every(side=>Array.isArray(log?.[side])&&log[side].every(x=>typeof x==='string'&&x.length<=2000&&!x.includes('://')&&!x.startsWith('/'))))throw Error('Invalid route history.');}
    for(const a of s.answers)if(c.protocol_version>=2&&a.block==='set'&&!['left','right'].every(side=>(c.screens??blocks.slice(0,3)).every(screen=>s.seen_screens?.[a.pair_id]?.[side]?.includes(screen))))throw Error('Не подтверждён просмотр комплекта.');
    for(const d of s.defects)if(!tasks.has(d.pair_id)||!['left','right','both'].includes(d.side)||typeof d.comment!=='string')throw Error('Некорректная запись дефекта.');
    return s;
  }
  function validateCorpus(c){
    if(!c||![1,2].includes(c.schema_version)||typeof c.study_id!=='string'||!c.study_id||!Number.isInteger(c.protocol_version)||c.protocol_version<1||!Number.isInteger(c.seed)||typeof c.corpus_id!=='string'||!Array.isArray(c.artifacts)||c.artifacts.length<2)throw Error('Некорректный корпус.');
    if(new Set(c.artifacts.map(a=>a.id)).size!==c.artifacts.length)throw Error('Повтор ID.');
    for(const [key,allowed] of [['supported_locales',['ru','en']],['supported_views',['desktop','mobile','full']]])if(c[key]!==undefined&&(!Array.isArray(c[key])||!c[key].length||new Set(c[key]).size!==c[key].length||c[key].some(x=>!allowed.includes(x))))throw Error('Некорректные доступные виды.');
    if(c.corpus_hash_format!==undefined&&c.corpus_hash_format!=='typed-ieee754-v1')throw Error('Неизвестный формат хеша.');
    if(c.screens&&(!Array.isArray(c.screens)||!c.screens.length||c.screens.some(x=>typeof x!=='string'||!x||['set','whole_site'].includes(x))||new Set(c.screens).size!==c.screens.length))throw Error('Invalid screens');
    if(c.schema_version===2&&!c.screens)throw Error('Declare surfaces/routes.');
    validateEvaluation(c);
    if(c.evaluation_unit==='whole_site'&&!/^[a-f0-9]{64}$/.test(c.runtime_package_id))throw Error('Runtime package identity required.');
    for(const a of c.artifacts){
      if(typeof a.id!=='string'||!/^[a-z0-9-]+$/.test(a.id)||(a.runtime_b64!==undefined&&typeof a.runtime_b64!=='string'))throw Error('Неполный вариант.');
      if(c.evaluation_unit==='whole_site'){
        if(!a.site||!new RegExp('^sites/'+a.id+'/[a-zA-Z0-9_./-]+\\.html$').test(a.site.entry)||a.site.entry.includes('..')||!a.site.files||!a.site.files[a.site.entry]||Object.entries(a.site.files).some(([p,h])=>!p.startsWith('sites/'+a.id+'/')||p.includes('..')||!/^[a-f0-9]{64}$/.test(h)))throw Error('Whole-site runtime package required.');
        if(a.captures&&Object.values(a.captures).some(x=>typeof x!=='string'||!x.startsWith('data:image/png;base64,')))throw Error('Invalid supplementary capture.');
      }else {if(!a.captures)throw Error('Не хватает снимков.');for(const screen of (c.screens??blocks.slice(0,3)))for(const locale of (c.supported_locales??['ru','en']))for(const view of (c.supported_views??['desktop','mobile','full']))if(!a.captures[screen+'/'+locale+'/'+view]?.startsWith('data:image/png;base64,'))throw Error('Не хватает снимков.');}
    }
    return c;
  }
  async function verifyCorpus(c){
    validateCorpus(c);
    const canonical=x=>Array.isArray(x)?x.map(canonical):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
    const {corpus_id,...payload}=c;
    function typed(x){if(x===null)return['null'];if(typeof x==='boolean')return['boolean',x];if(typeof x==='number'){if(!Number.isFinite(x))throw Error('Invalid number');const b=new ArrayBuffer(8);new DataView(b).setFloat64(0,x,false);return['number',[...new Uint8Array(b)].map(v=>v.toString(16).padStart(2,'0')).join('')];}if(typeof x==='string')return['string',x];if(Array.isArray(x))return['array',x.map(typed)];return['object',Object.keys(x).sort().map(k=>[k,typed(x[k])])];}
    const digest=await root.crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(c.corpus_hash_format==='typed-ieee754-v1'?typed(payload):canonical(payload))));
    const actual=[...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
    if(actual!==corpus_id)throw Error('Хеш корпуса не совпадает: файл повреждён или изменён.');
    return c;
  }
  function humanSessions(sessions,corpus){return sessions.map(s=>validateSession(s,corpus)).filter(s=>!s.qa);}
  const api={blocks,rand,shuffle,schedule,scheduleCorpus,validateEvaluation,newSession,validateSession,validateCorpus,verifyCorpus,humanSessions};root.StudyCore=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
