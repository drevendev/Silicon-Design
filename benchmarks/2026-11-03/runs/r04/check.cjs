const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {createSession}=require('./session.js'),core=require('./state.js');
const fixture=JSON.parse(fs.readFileSync('./fixture.json','utf8').replace(/^\uFEFF/,''));
let checks=0;function check(c,label){assert.ok(c,label);checks++;}
for(let i=0;i<3;i++)for(const k of ['name','title','copy','prompt'])check(core.stops[i][k]===fixture.observations[i][k],`Exact fixture ${i} ${k}`);
let s=createSession();check(s.state.selected===0&&s.state.kept.length===0,'Initial state');
[0,1,2].forEach(i=>s.keep(i));check(s.state.kept.length===3,'Independent keeps');s.keep(1);check(s.state.kept.join(',')==='0,2','Independent removal');s.keep(1);check(s.state.kept.length===3,'Repeated keep');
s.input('Привет <script>alert("x")</script>');check(s.save(),'Cyrillic and markup save');const saved=s.state.note;s.input('  ');check(!s.save()&&s.state.error,'Empty invalid');check(s.state.note===saved,'Previous note preserved');
s.input('Unfinished margin');s.direction('c');s.open();s.close();s.direction('a');check(s.state.draft==='Unfinished margin'&&s.state.note===saved,'Draft survives switching');s.input('x'.repeat(310));check(s.state.draft.length===300,'300 limit');
check(createSession().state.note===''&&createSession().state.kept.length===0,'New visit resets');check(createSession('secondary').state.book&&createSession('secondary').state.kept.length===0,'Secondary fixture');check(createSession('error').state.error,'Error fixture');check(createSession('complete').state.note==='The chair makes room for someone.'&&createSession('complete').state.kept.length===3,'Complete fixture');
function harness(d,f){
 const elements=new Map(),listeners={};function el(k){if(!elements.has(k))elements.set(k,{value:'',textContent:'',hidden:false,focus(){this.focused=true},setAttribute(){}});return elements.get(k)}
 const app={innerHTML:'',addEventListener(n,fn){listeners[n]=fn},querySelector(k){if(k==='#note-input'&&!this.innerHTML.includes('id="note-input"'))return null;if(k==='[data-testid="saved-note"]'&&!this.innerHTML.includes('data-testid="saved-note"'))return null;return el(k)}};
 const context={URL,URLSearchParams,location:{search:`?direction=${d}&fixture=${f}`,href:`http://localhost/index.html?direction=${d}&fixture=${f}`},history:{replaceState(){}},window:{scrollTo(){}},BenchmarkState:core,FieldSession:{createSession},document:{body:{dataset:{}},querySelector(k){return k==='#app'?app:el(k)}}};
 vm.runInNewContext(fs.readFileSync('./app.js','utf8'),context);const click=(action,extra={})=>listeners.click({target:{closest(){return{dataset:{action,...extra}}}},preventDefault(){}});return{app,el,listeners,context,click};
}
for(const d of ['a','b','c'])for(const f of ['initial','secondary','error','complete']){
 const h=harness(d,f);check(h.app.innerHTML.includes(`QA fixture: ${f}`),`${d}/${f} label`);check(h.context.document.body.dataset.direction===d,`${d}/${f} direction`);check(h.app.innerHTML.includes('data-testid="kept-count"'),`${d}/${f} count adapter`);for(const opt of ['a','b','c'])check(h.app.innerHTML.includes(`data-testid="direction-${opt}"`),`${d}/${f} switch ${opt}`);
 if(f==='initial'){
  for(let i=0;i<3;i++)check(h.app.innerHTML.includes(`data-testid="stop-${i}"`),`${d} stop ${i}`);
  h.click('select',{index:'1'});check(h.app.innerHTML.includes('A chair keeping the doorway.'),`${d} chair selected`);h.click('keep',{index:'1'});h.click('open');check(h.app.innerHTML.includes('A chair keeping the doorway.')&&!h.app.innerHTML.includes('Nothing kept yet'),`${d} populated book`);h.click('keep',{index:'1'});check(h.app.innerHTML.includes('Nothing kept yet'),`${d} empty book`);
  const input=value=>h.listeners.input({target:{id:'note-input',value,setAttribute(){}}}),submit=()=>h.listeners.submit({target:{id:'note-form'},preventDefault(){}});
  input('Тихо <b>улица</b>');submit();check(h.el('[data-testid="saved-note"]').textContent==='Тихо <b>улица</b>',`${d} safe textContent`);check(!h.app.innerHTML.includes('Тихо <b>улица</b>'),`${d} no HTML injection`);input('  ');submit();check(h.el('#note-input').focused,`${d} validation focus`);check(h.el('[data-testid="saved-note"]').textContent==='Тихо <b>улица</b>',`${d} recover previous note`);h.click('direction',{direction:'c'});check(h.el('#note-input').value==='  ',`${d} direction draft`);h.click('close');h.click('open');check(h.el('#note-input').value==='  ',`${d} book draft`);
 }
}
check(!/https?:\/\/|file:\/\/|localStorage|sessionStorage|fetch\(/.test(fs.readFileSync('./app.js','utf8')),'No network or persistence');
console.log(`${checks} source/state/markup checks passed. This DOM stub is not a browser or layout test.`);
const pairs=[['A reading','#263b3c','#faf8f1'],['A supporting','#5b655f','#faf8f1'],['A prompt / focus','#92513c','#faf8f1'],['A action','#fffaf0','#234c59'],['B reading','#34413a','#f8f4e9'],['B prompt','#84462f','#f8f4e9'],['B action','#fffaf0','#3c5745'],['C reading','#293e3a','#f5f4e9'],['C prompt','#80533c','#f5f4e9'],['C action','#fffaf0','#284f52']];
function luminance(hex){const rgb=hex.match(/\w\w/g).map(c=>parseInt(c,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
for(const [label,a,b] of pairs){const x=luminance(a),y=luminance(b),ratio=(Math.max(x,y)+.05)/(Math.min(x,y)+.05);assert.ok(ratio>=4.5,label+' contrast');console.log(label+': '+ratio.toFixed(2)+':1');}
const css=fs.readFileSync('./styles.css','utf8');check((css.match(/{/g)||[]).length===(css.match(/}/g)||[]).length,'CSS brace balance');
for(const file of ['index.html','styles.css','app.js','session.js','state.js','fixture.json','assets/field-notes-alley.jpg'])check(fs.existsSync(file),'Required local file '+file);
console.log(`${checks} total assertions passed, plus 10 palette contrast comparisons.`);
