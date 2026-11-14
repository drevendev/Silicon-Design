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
  function newSession(corpus,qa=false){return{schema_version:1,study_id:corpus.study_id,protocol_version:corpus.protocol_version,corpus_id:corpus.corpus_id,session_id:root.crypto?.randomUUID?.()??('local-'+Date.now()+'-'+Math.random().toString(16).slice(2)),qa:qa||Boolean(corpus.qa_fixture),completion:'in_progress',started_at:new Date().toISOString(),finished_at:null,answers:[],defects:[]};}
  function validateSession(s,c){
    if(!s||s.schema_version!==1||s.study_id!==c.study_id||s.protocol_version!==c.protocol_version||s.corpus_id!==c.corpus_id)throw Error('Ответ относится к другому корпусу или протоколу.');
    if(typeof s.session_id!=='string'||typeof s.qa!=='boolean'||!['in_progress','complete','early_stopped'].includes(s.completion)||!Array.isArray(s.answers)||!Array.isArray(s.defects))throw Error('Некорректная сессия.');
    if(c.qa_fixture&&!s.qa)throw Error('Синтетический корпус требует QA-флаг.');
    const tasks=new Map(schedule(c.artifacts.map(x=>x.id),c.seed,c.screens).map(t=>[t.pair_id,t])),seen=new Set();
    for(const a of s.answers){const t=tasks.get(a.pair_id);if(!t||seen.has(a.pair_id)||a.left_artifact_id!==t.left||a.right_artifact_id!==t.right||a.block!==t.block||a.screen!==t.screen||!['left','right','tie'].includes(a.winner)||typeof a.comment!=='string'||!Number.isFinite(Date.parse(a.timestamp))||!['ru','en'].includes(a.locale)||!['desktop','mobile','full'].includes(a.view)||!['fit','100','200'].includes(a.zoom))throw Error('Некорректный ответ или пара.');seen.add(a.pair_id);}
    if(s.completion==='complete'&&seen.size!==tasks.size)throw Error('Завершённая сессия содержит пропуски.');
    for(const [id,winner] of Object.entries(s.pending_votes??{}))if(!tasks.has(id)||!['left','tie','right'].includes(winner))throw Error('Некорректный черновик выбора.');
    for(const [id,comment] of Object.entries(s.drafts??{}))if(!tasks.has(id)||typeof comment!=='string')throw Error('Некорректный черновик комментария.');
    for(const [id,exposure] of Object.entries(s.seen_screens??{}))if(!tasks.has(id)||!['left','right'].every(side=>Array.isArray(exposure?.[side])&&exposure[side].every(x=>(c.screens??blocks.slice(0,3)).includes(x))))throw Error('Некорректная история просмотра.');
    for(const d of s.defects)if(!tasks.has(d.pair_id)||!['left','right','both'].includes(d.side)||typeof d.comment!=='string')throw Error('Некорректная запись дефекта.');
    return s;
  }
  function validateCorpus(c){
    if(!c||c.schema_version!==1||typeof c.study_id!=='string'||!c.study_id||!Number.isInteger(c.protocol_version)||c.protocol_version<1||!Number.isInteger(c.seed)||typeof c.corpus_id!=='string'||!Array.isArray(c.artifacts)||c.artifacts.length<2)throw Error('Некорректный корпус.');
    if(new Set(c.artifacts.map(a=>a.id)).size!==c.artifacts.length)throw Error('Повтор ID.');
    for(const a of c.artifacts){if(!/^[a-z0-9-]+$/.test(a.id)||(a.runtime_b64!==undefined&&typeof a.runtime_b64!=='string')||!a.captures)throw Error('Неполный вариант.');for(const screen of (c.screens??blocks.slice(0,3)))for(const locale of (c.supported_locales??['ru','en']))for(const view of (c.supported_views??['desktop','mobile','full']))if(!a.captures[screen+'/'+locale+'/'+view]?.startsWith('data:image/png;base64,'))throw Error('Не хватает снимков.');}
    if(c.screens&&(!Array.isArray(c.screens)||!c.screens.length||new Set(c.screens).size!==c.screens.length||c.screens.includes('set')))throw Error('Invalid screens');
    return c;
  }
  async function verifyCorpus(c){
    validateCorpus(c);
    const canonical=x=>Array.isArray(x)?x.map(canonical):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
    const {corpus_id,...payload}=c;
    const digest=await root.crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(canonical(payload))));
    const actual=[...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
    if(actual!==corpus_id)throw Error('Хеш корпуса не совпадает: файл повреждён или изменён.');
    return c;
  }
  const api={blocks,rand,shuffle,schedule,newSession,validateSession,validateCorpus,verifyCorpus};root.StudyCore=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
