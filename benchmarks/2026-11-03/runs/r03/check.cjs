/* Node-only behavior smoke check. This minimal DOM is not a browser or layout test. */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const decode=s=>s.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&');
class El {
  constructor(tag,attrs={},parent=null){this.tag=tag;this.attrs=attrs;this.parent=parent;this.children=[];this.handlers={};this.style={};this.hidden='hidden'in attrs;this.value='';this.dataset=new Proxy({}, {get:(_,k)=>this.attrs['data-'+k.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())],set:(_,k,v)=>(this.attrs['data-'+k]=v,true)});this.classList={toggle:(k,on)=>{let a=(this.attrs.class||'').split(' ').filter(x=>x&&x!==k);if(on)a.push(k);this.attrs.class=a.join(' ')}};}
  set innerHTML(s){this.children=parse(s,this);if(this.tag==='textarea')this.value=this.textContent}
  get innerHTML(){return this.children.map(n=>typeof n==='string'?n:n.innerHTML).join('')}
  set textContent(s){this.children=[String(s)]}
  get textContent(){return this.children.map(n=>typeof n==='string'?decode(n):n.textContent).join('')}
  get id(){return this.attrs.id}setAttribute(k,v){this.attrs[k]=String(v)}hasAttribute(k){return k in this.attrs}
  addEventListener(k,f){(this.handlers[k]??=[]).push(f)}focus(){doc.activeElement=this}
  closest(t){return this.tag===t?this:this.parent?.closest(t)}
  all(){return this.children.filter(n=>typeof n!=='string').flatMap(n=>[n,...n.all()])}
}
function parse(html,parent){let root=new El('root');root.parent=parent;let stack=[root];for(let t of html.match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g)||[]){if(t.startsWith('<!--')||t.startsWith('<!'))continue;if(t.startsWith('</')){if(stack.length>1)stack.pop();continue}if(t.startsWith('<')){let tag=t.match(/^<([\w-]+)/)?.[1];if(!tag)continue;let attrs={};let rest=t.slice(tag.length+1,-1);for(let m of rest.matchAll(/([\w-]+)(?:="([^"]*)"|='([^']*)'|=([^\s>]+))?/g))attrs[m[1]]=decode(m[2]??m[3]??m[4]??'');let node=new El(tag,attrs,stack.at(-1));stack.at(-1).children.push(node);if(!['img','meta','link','br','input','hr'].includes(tag))stack.push(node)}else stack.at(-1).children.push(t)}for(let e of root.all())if(e.tag==='textarea')e.value=e.textContent;for(let e of root.children)if(typeof e!=='string')e.parent=parent;return root.children}
function matches(e,s){if(s.startsWith('#'))return e.id===s.slice(1);if(s.startsWith('.'))return(e.attrs.class||'').split(' ').includes(s.slice(1));let m=s.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);return m?(m[2]===undefined?e.hasAttribute(m[1]):e.attrs[m[1]]===m[2]):e.tag===s}
let doc;
function setup(direction='a',fixture='initial'){
  let root=new El('root');root.innerHTML=fs.readFileSync(__dirname+'/index.html','utf8');
  doc={body:root.all().find(n=>n.tag==='body'),activeElement:null,handlers:{},getElementById:id=>root.all().find(n=>n.id===id),querySelectorAll:s=>{let bits=s.split(' ');return root.all().filter(e=>{if(!matches(e,bits.at(-1)))return false;if(bits.length===1)return true;for(let p=e.parent;p;p=p.parent)if(matches(p,bits[0]))return true;return false})},querySelector:s=>doc.querySelectorAll(s)[0],addEventListener:(k,f)=>(doc.handlers[k]??=[]).push(f)};
  let loc={href:`http://local/index.html?direction=${direction}&fixture=${fixture}`,search:`?direction=${direction}&fixture=${fixture}`};
  let ctx=vm.createContext({document:doc,location:loc,history:{replaceState:(_,__,url)=>{loc.href=String(url)}},window:{scrollTo(){}},URL,URLSearchParams,console});
  vm.runInContext(fs.readFileSync(__dirname+'/state.js','utf8'),ctx);vm.runInContext(fs.readFileSync(__dirname+'/app.js','utf8'),ctx);
  return {get:id=>doc.querySelector(`[data-testid="${id}"]`),click:id=>{let target=doc.querySelector(`[data-testid="${id}"]`);assert.ok(target,'Missing '+id);for(let f of doc.handlers.click)f({target})},input:value=>{let target=doc.getElementById('note-input');target.value=value;for(let f of target.handlers.input)f({target})},save:()=>{for(let f of doc.getElementById('note-form').handlers.submit)f({preventDefault(){}})}};
}
let checks=0;
for(let d of ['a','b','c'])for(let fixture of ['initial','secondary','error','complete']){
  const t=setup(d,fixture);assert.equal(t.get('kept-count').textContent,fixture==='complete'?'3':'0');assert.equal(doc.getElementById('book').hidden,!['secondary','complete'].includes(fixture));assert.equal(t.get('note-error').hidden,fixture!=='error');
  if(fixture==='complete')assert.equal(t.get('saved-note').textContent,'The chair makes room for someone.');
  const ids=doc.querySelectorAll('[data-testid]').map(e=>e.attrs['data-testid']);assert.equal(new Set(ids).size,ids.length,'Duplicate adapters');checks++;
}
for(let d of ['a','b','c']){
  const t=setup(d);for(let i=0;i<3;i++){t.click('stop-'+i);t.click('keep-'+i)}assert.equal(t.get('kept-count').textContent,'3');t.click('keep-2');assert.equal(t.get('kept-count').textContent,'2');t.click('keep-2');
  const note='Кириллица <b>текст</b>';t.input(note);t.save();assert.equal(t.get('saved-note').textContent,note);assert.equal(t.get('saved-note').all().length,0,'Notes must be text');
  t.input('  ');t.save();assert.equal(t.get('saved-note').textContent,note);assert.equal(t.get('note-error').hidden,false);assert.equal(doc.activeElement,t.get('note-input'));
  t.input('Unfinished margin');t.click('direction-'+(d==='a'?'b':'a'));assert.equal(t.get('note-input').value,'Unfinished margin');assert.equal(t.get('kept-count').textContent,'3');t.click('open-book');assert.equal(t.get('note-input').value,'Unfinished margin');assert.equal(doc.getElementById('entries').all().filter(n=>(n.attrs.class||'')==='book-entry').length,3);
  for(let i=0;i<3;i++)t.click('keep-'+i);assert.equal(t.get('kept-count').textContent,'0');assert.ok(doc.getElementById('entries').textContent.includes('Nothing kept. Yet.'));t.click('close-book');assert.equal(t.get('note-input').value,'Unfinished margin');t.input('x'.repeat(400));t.save();assert.equal(t.get('saved-note').textContent.length,300);checks++;
}
console.log(`${checks} fixture/interaction scenarios passed in the Node minimal-DOM harness. Browser rendering, native events, focus behavior and layout are untested.`);
const html=fs.readFileSync(__dirname+'/index.html','utf8'),css=fs.readFileSync(__dirname+'/style.css','utf8'),fixture=JSON.parse(fs.readFileSync(__dirname+'/fixture.json','utf8')),api=require('./state.js');
for(let i=0;i<3;i++)for(let key of ['name','title','copy','prompt'])assert.equal(api.stops[i][key],fixture.observations[i][key]);
for(let match of html.matchAll(/(?:src|href)="([^"]+)"/g))if(!match[1].startsWith('#'))assert.ok(fs.existsSync(__dirname+'/'+match[1]),'Local reference '+match[1]);
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length,'CSS braces');
function luminance(hex){const a=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.03928?x/12.92:((x+.055)/1.055)**2.4);return a[0]*.2126+a[1]*.7152+a[2]*.0722}
for(let [label,a,b]of [['dark accent','#d59a7c','#20353e'],['dark button','#fff8ef','#954932'],['input boundary','#737b73','#faf6ee']])console.log(label+': '+((Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05)).toFixed(3)+':1');
console.log('Exact fixture content, local references and CSS brace check passed.');
