import unittest,importlib.util,json,subprocess,tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class BlindTest(unittest.TestCase):
 def test_whole_site_package_manifest_and_invalid_contracts(self):
  import hashlib,copy
  spec=importlib.util.spec_from_file_location('blind_builder',ROOT/'skills/blind-test/scripts/build_study.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
  with tempfile.TemporaryDirectory() as tmp:
   folder=Path(tmp);site=folder/'source';(site/'nested').mkdir(parents=True);(site/'index.html').write_text('<a href="nested/page.html">Guide</a>',encoding='utf8');(site/'nested/page.html').write_text('<a href="../index.html">Home</a>',encoding='utf8')
   config={'schema_version':2,'study_id':'synthetic-package','protocol_version':3,'seed':42,'evaluation_unit':'whole_site','comparison':{'format':'selected_pairs','side_control':'as_listed','pairs':[{'left':'a','right':'b'}]},'screens':['home','guide'],'supported_locales':['en'],'supported_views':['desktop'],'qa_fixture':True,'artifacts':[{'id':x,'site_dir':'source'} for x in ['a','b']]}
   c=m.build(config,folder/'out',folder);self.assertNotIn('site_dir',c['artifacts'][0]);self.assertEqual(c['artifacts'][0]['site']['entry'],'sites/a/index.html');self.assertEqual(c['artifacts'][0]['site']['files']['sites/a/index.html'],hashlib.sha256((site/'index.html').read_bytes()).hexdigest());self.assertTrue((folder/'out/sites/b/nested/page.html').is_file())
   result=subprocess.run(['node','-e',"const C=require(process.argv[1]),fs=require('fs'),assert=require('assert/strict'),c=JSON.parse(fs.readFileSync(process.argv[2]));C.verifyCorpus(c).then(()=>{assert.equal(C.scheduleCorpus(c).length,1);assert.equal(C.newSession(c).evaluation_unit,'whole_site');}).catch(e=>{throw e});",str(ROOT/'skills/blind-test/assets/study-core.js'),str(folder/'out/corpus.json')],capture_output=True,text=True);self.assertEqual(result.returncode,0,result.stderr)
   for patch in [{'coherence':True},{'evaluation_unit':'surface'},{'schema_version':1},{'protocol_version':4},{'comparison':{'format':'selected_pairs','side_control':'as_listed','pairs':[{'left':'a','right':'b'},{'left':'b','right':'a'}]}}]:
    with self.assertRaises(ValueError):m.build({**config,**patch},folder/'bad',folder)
   unsafe=copy.deepcopy(config);unsafe['artifacts'][0]['site_entry']='../source/index.html'
   with self.assertRaises(ValueError):m.build(unsafe,folder/'bad',folder)
   self.assertFalse((folder/'bad').exists())

 def test_generic_builder_and_core(self):
  script=ROOT/'skills/blind-test/scripts/build_study.py';spec=importlib.util.spec_from_file_location('blind_builder',script);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
  png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j5i8AAAAASUVORK5CYII='
  config={'study_id':'synthetic-other-product','protocol_version':2,'seed':42,'screens':['first','second','third'],'supported_locales':['en'],'supported_views':['desktop'],'qa_fixture':True,'artifacts':[{'id':'v-'+str(i),'captures':{s+'/en/desktop':png for s in ['first','second','third']}} for i in range(4)]}
  with tempfile.TemporaryDirectory() as tmp:
   c=m.build(config,tmp);self.assertTrue((Path(tmp)/'Blind-Test.html').exists());self.assertNotIn('src="study.js"',(Path(tmp)/'Blind-Test.html').read_text(encoding='utf8'))
   result=subprocess.run(['node','-e',"const fs=require('fs'),assert=require('assert/strict'),vm=require('vm');vm.runInThisContext(fs.readFileSync(process.argv[1],'utf8'));const c=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));StudyCore.validateCorpus(c);const ts=StudyCore.schedule(c.artifacts.map(a=>a.id),c.seed,c.screens);assert.equal(ts.length,24);assert.equal(new Set(ts.map(t=>t.pair_id)).size,24);for(const a of c.artifacts){assert.equal(ts.filter(t=>t.left===a.id).length,6);assert.equal(ts.filter(t=>t.right===a.id).length,6);}const s=StudyCore.newSession(c);assert.equal(s.qa,true);assert.throws(()=>StudyCore.validateSession({...s,corpus_id:'foreign'},c));StudyCore.verifyCorpus(c).then(()=>console.log('PASS')).catch(e=>{throw e});",str(ROOT/'skills/blind-test/assets/study-core.js'),str(Path(tmp)/'corpus.json')],capture_output=True,text=True)
   self.assertEqual(result.returncode,0,result.stderr)

 def test_hash_and_inline_text_roundtrip(self):
  spec=importlib.util.spec_from_file_location('blind_builder',ROOT/'skills/blind-test/scripts/build_study.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
  c={'study_id':'numeric-review','protocol_version':2,'seed':3,'screens':['page'],'supported_locales':['en'],'supported_views':['desktop'],'capture_contract':{'dpr':1.0,'fraction':1.25,'tiny':1e-7,'negative_zero':-0.0,'10':10,'2':2},'screen_labels':{'page':'</ScRiPt><script>injected=true</script> Кириллица'},'artifacts':[{'id':x,'captures':{'page/en/desktop':'data:image/png;base64,AA=='}} for x in ['a','b']]}
  with tempfile.TemporaryDirectory() as tmp:
   m.build(c,tmp);html=(Path(tmp)/'Blind-Test.html').read_text(encoding='utf8');start=html.index('window.IFS_CORPUS=');end=html.index(';</script>',start);embedded=Path(tmp)/'embedded.js';embedded.write_text(html[start:end],encoding='utf8')
   p=subprocess.run(['node','-e',"const vm=require('vm'),fs=require('fs'),assert=require('assert/strict');globalThis.window=globalThis;vm.runInThisContext(fs.readFileSync(process.argv[1],'utf8'));vm.runInThisContext(fs.readFileSync(process.argv[2],'utf8'));assert.equal(IFS_CORPUS.screen_labels.page,'</ScRiPt><script>injected=true</script> Кириллица');StudyCore.verifyCorpus(IFS_CORPUS).catch(e=>{throw e});",str(ROOT/'skills/blind-test/assets/study-core.js'),str(embedded)],capture_output=True,text=True,encoding='utf8');self.assertEqual(p.returncode,0,p.stderr)
  for value in [float('nan'),float('inf'),9007199254740992]:
   with tempfile.TemporaryDirectory() as tmp,self.assertRaises(ValueError):m.build(dict(c,extra=value),tmp)

 def test_session_cursor_preferences_and_coherence_guards(self):
  p=subprocess.run(['node','-e',"const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');vm.runInThisContext(fs.readFileSync(process.argv[1],'utf8'));const c={study_id:'s',schema_version:1,protocol_version:2,corpus_id:'c',seed:5,screens:['a','b'],supported_locales:['en'],supported_views:['desktop'],artifacts:[{id:'x'},{id:'y'}]};const s=StudyCore.newSession(c);for(const cursor of [-1,3,1.5,'1'])assert.throws(()=>StudyCore.validateSession({...s,cursor},c));assert.throws(()=>StudyCore.validateSession({...s,preferences:{locale:'en',view:'broken',zoom:'fit'}},c));const t=StudyCore.schedule(['x','y'],5,c.screens).find(t=>t.block==='set');const a={block:'set',screen:null,pair_id:t.pair_id,left_artifact_id:t.left,right_artifact_id:t.right,winner:'tie',comment:'',timestamp:new Date().toISOString(),locale:'en',view:'desktop',zoom:'fit'};assert.throws(()=>StudyCore.validateSession({...s,answers:[a]},c));StudyCore.validateSession({...s,answers:[a],seen_screens:{[t.pair_id]:{left:['a','b'],right:['a','b']}}},c);const legacy={...c,protocol_version:1};StudyCore.validateSession({...s,protocol_version:1,answers:[a]},legacy);",str(ROOT/'skills/blind-test/assets/study-core.js')],capture_output=True,text=True);self.assertEqual(p.returncode,0,p.stderr)
