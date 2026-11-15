from pathlib import Path
import sys,json,hashlib,struct,math,re
def validate(c):
    if c.get('schema_version') not in (1,2) or not isinstance(c.get('study_id'),str) or not c['study_id'] or type(c.get('protocol_version')) is not int or type(c.get('seed')) is not int:raise ValueError('Invalid study/protocol/seed')
    screens=c['screens']
    if not isinstance(screens,list) or not screens or any(not isinstance(s,str) or not s or s in ('set','whole_site') for s in screens) or len(set(screens))!=len(screens):raise ValueError('Invalid screen IDs')
    for key,allowed in [('supported_locales',{'ru','en'}),('supported_views',{'desktop','mobile','full'})]:
        values=c[key]
        if not isinstance(values,list) or not values or any(not isinstance(x,str) or x not in allowed for x in values) or len(set(values))!=len(values):raise ValueError('Invalid '+key)
    if not isinstance(c.get('artifacts'),list) or len(c['artifacts'])<2:raise ValueError('At least two artifacts required')
    ids=[]
    for a in c['artifacts']:
        if not isinstance(a,dict) or not isinstance(a.get('id'),str) or not re.fullmatch('[a-z0-9-]+',a['id']):raise ValueError('Invalid artifact ID')
        ids.append(a['id'])
        if c.get('evaluation_unit')!='whole_site' and not isinstance(a.get('captures'),dict):raise ValueError('Missing captures')
        for screen in ([] if c.get('evaluation_unit')=='whole_site' else screens):
            for locale in c['supported_locales']:
                for view in c['supported_views']:
                    value=a['captures'].get(screen+'/'+locale+'/'+view)
                    if not isinstance(value,str) or not value.startswith('data:image/png;base64,'):raise ValueError('Missing PNG capture')
        if 'runtime_b64' in a and not isinstance(a['runtime_b64'],str):raise ValueError('Invalid runtime')
    if len(set(ids))!=len(ids):raise ValueError('Duplicate artifact ID')
    if c['schema_version']==1:
        if c['protocol_version'] not in (1,2) or any(k in c for k in ('evaluation_unit','comparison','coherence')):raise ValueError('Legacy protocol cannot be reinterpreted')
    else:
        unit=c.get('evaluation_unit');p=c.get('comparison',{})
        if c['protocol_version']!=3 or unit not in ('whole_site','surface','multi_surface'):raise ValueError('Explicit evaluation contract required')
        if p.get('format') not in ('round_robin','selected_pairs') or p.get('side_control') not in ('seeded','as_listed'):raise ValueError('Explicit comparison format and side control required')
        if p['format']=='round_robin' and ('pairs' in p or p['side_control']!='seeded'):raise ValueError('Round robin uses seeded sides')
        if p['format']=='selected_pairs':
            if not isinstance(p.get('pairs'),list) or not p['pairs']:raise ValueError('Select at least one pair')
            seen=set()
            for pair in p['pairs']:
                if not isinstance(pair,dict) or pair.get('left') not in ids or pair.get('right') not in ids or pair['left']==pair['right']:raise ValueError('Unknown pair')
                key=tuple(sorted((pair['left'],pair['right'])))
                if key in seen:raise ValueError('Duplicate pair')
                seen.add(key)
        if unit=='multi_surface':
            if type(c.get('coherence')) is not bool:raise ValueError('Select coherence explicitly')
        elif 'coherence' in c:raise ValueError('Coherence only applies to multi-surface evaluation')
        if unit=='surface' and len(screens)!=1:raise ValueError('Declare exactly one surface')
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
def build(config,destination,source_base=None):
    assets=Path(__file__).resolve().parent.parent/'assets'
    c=dict(config);c.setdefault('schema_version',1);c.setdefault('screens',['market','management','shop']);c.setdefault('supported_locales',['ru','en']);c.setdefault('supported_views',['desktop','mobile','full'])
    validate(c)
    # Stage all bytes before writing. Only original, trusted static sites belong here.
    site_files={}
    if c.get('evaluation_unit')=='whole_site':
        c['artifacts']=[dict(a) for a in c['artifacts']]
        for a in c['artifacts']:
            source_dir=a.pop('site_dir',None)
            if not isinstance(source_dir,str) or not source_dir:raise ValueError('site_dir required')
            root=(Path(source_base or Path.cwd())/source_dir).resolve()
            entry=a.pop('site_entry','index.html')
            if not re.fullmatch(r'[a-zA-Z0-9_./-]+\.html',entry) or '..' in entry.split('/') or not (root/entry).is_file():raise ValueError('Invalid site entry')
            if not root.is_dir():raise ValueError('site_dir required')
            manifest={}
            for file in sorted(root.rglob('*')):
                if file.is_symlink():raise ValueError('Site symlinks are not portable')
                if not file.is_file():continue
                relative=file.relative_to(root)
                if any(part.startswith('.') or part=='node_modules' for part in relative.parts):raise ValueError('Package static output only, without hidden/source dependency directories')
                name='sites/'+a['id']+'/'+relative.as_posix();data=file.read_bytes();site_files[name]=data;manifest[name]=hashlib.sha256(data).hexdigest()
            a['site']={'entry':'sites/'+a['id']+'/'+entry,'files':manifest}
        c['runtime_package_id']=hashlib.sha256(json.dumps({k:hashlib.sha256(v).hexdigest() for k,v in sorted(site_files.items())},sort_keys=True).encode()).hexdigest()
    c['runner_sha256']=hashlib.sha256(b''.join((assets/name).read_bytes() for name in ['viewer.template','study.css','study-core.js','study.js'])).hexdigest()
    if len(c.get('artifacts',[]))<2:raise ValueError('At least two artifacts required')
    c.pop('corpus_id',None);c['corpus_hash_format']='typed-ieee754-v1';c['corpus_id']=hashlib.sha256(json.dumps(canonical(c),ensure_ascii=False,separators=(',',':')).encode()).hexdigest()
    out=Path(destination);out.mkdir(parents=True,exist_ok=True)
    for name,data in site_files.items():
        target=out/name;target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
    html=(assets/'viewer.template').read_text(encoding='utf8').replace('<link rel="stylesheet" href="study.css">','<style>'+(assets/'study.css').read_text(encoding='utf8')+'</style>')
    payload=json.dumps(c,ensure_ascii=False,separators=(',',':')).replace('<',r'\u003c')
    scripts={'corpus.js':'window.IFS_CORPUS='+payload+';','study-core.js':(assets/'study-core.js').read_text(encoding='utf8'),'study.js':(assets/'study.js').read_text(encoding='utf8')}
    for name,body in scripts.items():html=html.replace('<script src="'+name+'"></script>','<script>'+body.replace('</script',r'<\/script')+'</script>')
    (out/'Blind-Test.html').write_text(html,encoding='utf8',newline='');(out/'corpus.json').write_text(json.dumps(c,ensure_ascii=False),encoding='utf8',newline='')
    return c
if __name__=='__main__':
    source=Path(sys.argv[1]).resolve();c=build(json.loads(source.read_text(encoding='utf8')),sys.argv[2],source.parent);print(c['corpus_id'])
