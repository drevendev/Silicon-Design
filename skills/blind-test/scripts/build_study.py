from pathlib import Path
import sys,json,hashlib
def build(config,destination):
    assets=Path(__file__).resolve().parent.parent/'assets'
    c=dict(config);c.setdefault('schema_version',1);c.setdefault('screens',['market','management','shop']);c.setdefault('supported_locales',['ru','en']);c.setdefault('supported_views',['desktop','mobile','full'])
    c['runner_sha256']=hashlib.sha256(b''.join((assets/name).read_bytes() for name in ['viewer.template','study.css','study-core.js','study.js'])).hexdigest()
    if len(c.get('artifacts',[]))<2:raise ValueError('At least two artifacts required')
    c.pop('corpus_id',None);c['corpus_id']=hashlib.sha256(json.dumps(c,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
    out=Path(destination);out.mkdir(parents=True,exist_ok=True)
    html=(assets/'viewer.template').read_text(encoding='utf8').replace('<link rel="stylesheet" href="study.css">','<style>'+(assets/'study.css').read_text(encoding='utf8')+'</style>')
    scripts={'corpus.js':'window.IFS_CORPUS='+json.dumps(c,ensure_ascii=False,separators=(',',':'))+';','study-core.js':(assets/'study-core.js').read_text(encoding='utf8'),'study.js':(assets/'study.js').read_text(encoding='utf8')}
    for name,body in scripts.items():html=html.replace('<script src="'+name+'"></script>','<script>'+body.replace('</script','<\\/script')+'</script>')
    (out/'Blind-Test.html').write_text(html,encoding='utf8',newline='');(out/'corpus.json').write_text(json.dumps(c,ensure_ascii=False),encoding='utf8',newline='')
    return c
if __name__=='__main__':
    c=build(json.loads(Path(sys.argv[1]).read_text(encoding='utf8')),sys.argv[2]);print(c['corpus_id'])
