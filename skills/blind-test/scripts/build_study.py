from pathlib import Path
import sys,json,hashlib,struct,math,re
def validate(c):
    if c.get('schema_version')!=1 or not isinstance(c.get('study_id'),str) or not c['study_id'] or type(c.get('protocol_version')) is not int or c['protocol_version']<1 or type(c.get('seed')) is not int:raise ValueError('Invalid study/protocol/seed')
    screens=c['screens']
    if not isinstance(screens,list) or not screens or any(not isinstance(s,str) or not s or s=='set' for s in screens) or len(set(screens))!=len(screens):raise ValueError('Invalid screen IDs')
    for key,allowed in [('supported_locales',{'ru','en'}),('supported_views',{'desktop','mobile','full'})]:
        values=c[key]
        if not isinstance(values,list) or not values or any(not isinstance(x,str) or x not in allowed for x in values) or len(set(values))!=len(values):raise ValueError('Invalid '+key)
    if not isinstance(c.get('artifacts'),list) or len(c['artifacts'])<2:raise ValueError('At least two artifacts required')
    ids=[]
    for a in c['artifacts']:
        if not isinstance(a,dict) or not isinstance(a.get('id'),str) or not re.fullmatch('[a-z0-9-]+',a['id']):raise ValueError('Invalid artifact ID')
        ids.append(a['id'])
        if not isinstance(a.get('captures'),dict):raise ValueError('Missing captures')
        for screen in screens:
            for locale in c['supported_locales']:
                for view in c['supported_views']:
                    value=a['captures'].get(screen+'/'+locale+'/'+view)
                    if not isinstance(value,str) or not value.startswith('data:image/png;base64,'):raise ValueError('Missing PNG capture')
        if 'runtime_b64' in a and not isinstance(a['runtime_b64'],str):raise ValueError('Invalid runtime')
    if len(set(ids))!=len(ids):raise ValueError('Duplicate artifact ID')
def canonical(value):
    if value is None:return ['null']
    if isinstance(value,bool):return ['boolean',value]
    if isinstance(value,(int,float)):
        if not math.isfinite(value) or isinstance(value,int) and abs(value)>9007199254740991:raise ValueError('Use strings for exact integers beyond the JavaScript safe range; numbers must be finite')
        return ['number',struct.pack('>d',value).hex()]
    if isinstance(value,str):return ['string',value]
    if isinstance(value,list):return ['array',[canonical(x) for x in value]]
    if isinstance(value,dict):return ['object',[[k,canonical(value[k])] for k in sorted(value,key=lambda k:k.encode('utf-16-be'))]]
    raise ValueError('Unsupported JSON value')
def build(config,destination):
    assets=Path(__file__).resolve().parent.parent/'assets'
    c=dict(config);c.setdefault('schema_version',1);c.setdefault('screens',['market','management','shop']);c.setdefault('supported_locales',['ru','en']);c.setdefault('supported_views',['desktop','mobile','full'])
    validate(c)
    c['runner_sha256']=hashlib.sha256(b''.join((assets/name).read_bytes() for name in ['viewer.template','study.css','study-core.js','study.js'])).hexdigest()
    if len(c.get('artifacts',[]))<2:raise ValueError('At least two artifacts required')
    c.pop('corpus_id',None);c['corpus_hash_format']='typed-ieee754-v1';c['corpus_id']=hashlib.sha256(json.dumps(canonical(c),ensure_ascii=False,separators=(',',':')).encode()).hexdigest()
    out=Path(destination);out.mkdir(parents=True,exist_ok=True)
    html=(assets/'viewer.template').read_text(encoding='utf8').replace('<link rel="stylesheet" href="study.css">','<style>'+(assets/'study.css').read_text(encoding='utf8')+'</style>')
    payload=json.dumps(c,ensure_ascii=False,separators=(',',':')).replace('<',r'\u003c')
    scripts={'corpus.js':'window.IFS_CORPUS='+payload+';','study-core.js':(assets/'study-core.js').read_text(encoding='utf8'),'study.js':(assets/'study.js').read_text(encoding='utf8')}
    for name,body in scripts.items():html=html.replace('<script src="'+name+'"></script>','<script>'+body.replace('</script',r'<\/script')+'</script>')
    (out/'Blind-Test.html').write_text(html,encoding='utf8',newline='');(out/'corpus.json').write_text(json.dumps(c,ensure_ascii=False),encoding='utf8',newline='')
    return c
if __name__=='__main__':
    c=build(json.loads(Path(sys.argv[1]).read_text(encoding='utf8')),sys.argv[2]);print(c['corpus_id'])
