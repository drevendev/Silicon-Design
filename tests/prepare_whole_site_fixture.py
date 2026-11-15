"""Reproducible original synthetic seven-site corpus; no models, owner votes or media."""
from pathlib import Path
import importlib.util,json,tempfile,sys
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('builder',ROOT/'skills/blind-test/scripts/build_study.py');builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)
def main(destination):
    with tempfile.TemporaryDirectory() as tmp:
        source=Path(tmp)
        for i in range(7):
            site=source/('v'+str(i));(site/'guide').mkdir(parents=True);(site/'assets').mkdir()
            (site/'assets/site.css').write_text('body{font:18px/1.5 system-ui;margin:0;background:#faf7ef;color:#203b39}header,main{padding:20px}nav{display:flex;gap:18px;flex-wrap:wrap}a{color:#205b70}button{font:inherit;padding:10px}svg{width:100px}a:focus-visible,button:focus-visible{outline:3px solid #b25218}',encoding='utf8')
            (site/'assets/mark.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><path d="M5 50L30 15L55 50L80 10" fill="none" stroke="#205b70" stroke-width="6"/></svg>',encoding='utf8')
            (site/'assets/data.json').write_text('{"count":24}',encoding='utf8')
            for file,title,prefix in [('index.html','Repair atlas',''),('guide/index.html','Material guide','../'),('about.html','About this fixture','')]:
                (site/file).write_text(f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title><link rel="stylesheet" href="{prefix}assets/site.css"></head><body><header><nav><a href="{prefix}index.html">Atlas</a><a href="{prefix}guide/">Guide</a><a href="{prefix}about.html">About</a></nav></header><main><p>Original fictional QA website · v{i}</p><h1>{title}</h1><img src="{prefix}assets/mark.svg" width="100" height="60" alt="Bent wire illustration"><p>Inspect 24 repair records. This is synthetic runner verification, not a design candidate or human study.</p><button id="inspect">Inspect record</button><p id="result" role="status"></p><script>document.querySelector("#inspect").onclick=async()=>{{const d=await(await fetch("{prefix}assets/data.json")).json();document.querySelector("#result").textContent=d.count+" records available";}};</script></main></body></html>',encoding='utf8')
        c={'schema_version':2,'study_id':'synthetic-whole-site-20261115','protocol_version':3,'evaluation_unit':'whole_site','comparison':{'format':'round_robin','side_control':'seeded'},'seed':20261115,'screens':['home','guide','about'],'supported_locales':['en'],'supported_views':['desktop','mobile'],'qa_fixture':True,'runtime_contract':'Original static multi-file websites; independent navigation, relative CSS/SVG/JSON and actual JS interaction; trusted local packages, HTTP required. No backend.','artifacts':[{'id':'v'+str(i),'site_dir':'v'+str(i)} for i in range(7)]}
        builder.build(c,destination,source)
        c['study_id']='synthetic-selected-site-20261115';c['comparison']={'format':'selected_pairs','side_control':'as_listed','pairs':[{'left':'v0','right':'v4'},{'left':'v2','right':'v6'}]};builder.build(c,Path(destination)/'selected',source)
if __name__=='__main__':main(sys.argv[1])
