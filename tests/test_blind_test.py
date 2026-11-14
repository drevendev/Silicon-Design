import unittest,importlib.util,json,subprocess,tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class BlindTest(unittest.TestCase):
 def test_generic_builder_and_core(self):
  script=ROOT/'skills/blind-test/scripts/build_study.py';spec=importlib.util.spec_from_file_location('blind_builder',script);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
  png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j5i8AAAAASUVORK5CYII='
  config={'study_id':'synthetic-other-product','protocol_version':2,'seed':42,'screens':['first','second','third'],'supported_locales':['en'],'supported_views':['desktop'],'qa_fixture':True,'artifacts':[{'id':'v-'+str(i),'captures':{s+'/en/desktop':png for s in ['first','second','third']}} for i in range(4)]}
  with tempfile.TemporaryDirectory() as tmp:
   c=m.build(config,tmp);self.assertTrue((Path(tmp)/'Blind-Test.html').exists());self.assertNotIn('src="study.js"',(Path(tmp)/'Blind-Test.html').read_text(encoding='utf8'))
   result=subprocess.run(['node','-e',"const fs=require('fs'),assert=require('assert/strict'),vm=require('vm');vm.runInThisContext(fs.readFileSync(process.argv[1],'utf8'));const c=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));StudyCore.validateCorpus(c);const ts=StudyCore.schedule(c.artifacts.map(a=>a.id),c.seed,c.screens);assert.equal(ts.length,24);assert.equal(new Set(ts.map(t=>t.pair_id)).size,24);for(const a of c.artifacts){assert.equal(ts.filter(t=>t.left===a.id).length,6);assert.equal(ts.filter(t=>t.right===a.id).length,6);}const s=StudyCore.newSession(c);assert.equal(s.qa,true);assert.throws(()=>StudyCore.validateSession({...s,corpus_id:'foreign'},c));StudyCore.verifyCorpus(c).then(()=>console.log('PASS')).catch(e=>{throw e});",str(ROOT/'skills/blind-test/assets/study-core.js'),str(Path(tmp)/'corpus.json')],capture_output=True,text=True)
   self.assertEqual(result.returncode,0,result.stderr)
