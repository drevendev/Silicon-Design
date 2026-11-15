const {test}=require('node:test'),assert=require('node:assert/strict');
const C=require('../skills/blind-test/assets/study-core.js');
const base=()=>({schema_version:2,protocol_version:3,study_id:'synthetic-whole-20261115',corpus_id:'synthetic',seed:20261115,evaluation_unit:'whole_site',comparison:{format:'round_robin',side_control:'seeded'},screens:['home','guide','detail','data','about'],supported_locales:['en'],supported_views:['desktop'],qa_fixture:true,artifacts:Array.from({length:7},(_,i)=>({id:'v'+i}))});
test('seven complete websites have 21 unique balanced pairs, never route ballots',()=>{
 const c=base(),ts=C.scheduleCorpus(c);assert.equal(ts.length,21);assert.equal(new Set(ts.map(t=>t.pair_id)).size,21);assert.ok(ts.every(t=>t.block==='whole_site'&&t.screen===null));
 for(const a of c.artifacts){assert.equal(ts.filter(t=>t.left===a.id).length,3);assert.equal(ts.filter(t=>t.right===a.id).length,3);}
 assert.deepEqual(ts,C.scheduleCorpus(c));assert.notDeepEqual(ts,C.scheduleCorpus({...c,seed:11}));
 assert.equal(C.scheduleCorpus({...c,screens:['another-route']}).length,21);
});
test('126 requires explicitly selected five surfaces and coherence; single surface is 21',()=>{
 const c={...base(),evaluation_unit:'multi_surface',coherence:true};C.validateEvaluation(c);const ts=C.scheduleCorpus(c);assert.equal(ts.length,126);assert.equal(ts.filter(t=>t.block==='set').length,21);
 assert.equal(C.scheduleCorpus({...c,coherence:false}).length,105);
 assert.throws(()=>C.validateEvaluation({...c,coherence:undefined}));assert.throws(()=>C.validateEvaluation({...base(),coherence:true}));
 const single={...base(),evaluation_unit:'surface',screens:['home']};C.validateEvaluation(single);assert.equal(C.scheduleCorpus(single).length,21);
});
test('explicit smaller pair set, side control, duplicate rejection and early-stop drafts',()=>{
 const c={...base(),comparison:{format:'selected_pairs',side_control:'as_listed',pairs:[{left:'v2',right:'v0'},{left:'v5',right:'v3'}]}};C.validateEvaluation(c);const ts=C.scheduleCorpus(c);assert.equal(ts.length,2);assert.equal(ts.find(t=>t.left==='v2').right,'v0');
 assert.throws(()=>C.validateEvaluation({...c,comparison:{...c.comparison,pairs:[...c.comparison.pairs,{left:'v0',right:'v2'}]}}));
 const s={...C.newSession(c),cursor:1,completion:'early_stopped',pending_votes:{[ts[1].pair_id]:'right'},drafts:{[ts[1].pair_id]:'unfinished'}};C.validateSession(s,c);assert.equal(s.answers.length,0);assert.deepEqual(C.humanSessions([s],c),[]);
 assert.throws(()=>C.validateSession({...s,evaluation_unit:'multi_surface'},c));assert.throws(()=>C.validateSession({...s,schema_version:1},c));
});
test('legacy schedules and protocol/session identity are immutable',()=>{
 const c={...base(),schema_version:1,protocol_version:2};delete c.evaluation_unit;delete c.comparison;
 assert.deepEqual(C.scheduleCorpus(c),C.schedule(c.artifacts.map(a=>a.id),c.seed,c.screens));
 assert.throws(()=>C.validateEvaluation({...c,evaluation_unit:'whole_site'}));assert.throws(()=>C.validateEvaluation({...c,protocol_version:3}));
 assert.throws(()=>C.validateSession(C.newSession(c),base()));
});
