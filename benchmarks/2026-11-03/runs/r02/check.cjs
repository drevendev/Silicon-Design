'use strict';
const fs=require('node:fs'); const vm=require('node:vm'); const assert=require('node:assert/strict'); const crypto=require('node:crypto'); const path=require('node:path');
const base=__dirname; let checks=0;
function ok(value,message){assert.ok(value,message);checks++;}
function setup(direction='a',fixture='initial'){
 const app={innerHTML:''}, fixtureSelect={value:''}, listeners={};
 const document={body:{dataset:{}},getElementById:id=>id==='app'?app:fixtureSelect,querySelectorAll:()=>[],querySelector:()=>({focus(){}}),addEventListener:(type,handler)=>listeners[type]=handler};
 const context=vm.createContext({document,URL,URLSearchParams,location:{search:`?direction=${direction}&fixture=${fixture}`,href:`http://local.test/?direction=${direction}&fixture=${fixture}`},history:{replaceState(){}}});
 vm.runInContext(fs.readFileSync(path.join(base,'state.js'),'utf8'),context);
 vm.runInContext(fs.readFileSync(path.join(base,'app.js'),'utf8'),context);
 return {html:()=>app.innerHTML,click:dataset=>listeners.click({target:{closest:()=>({dataset,disabled:false})}}),submit:()=>listeners.submit({target:{id:'release-form'},preventDefault(){}}),change:target=>listeners.change({target}),input:target=>listeners.input({target}),key:key=>listeners.keydown({key})};
}
function count(view,id,n){ok(view.html().includes(`data-testid="${id}">${n}</span>`),`${id} = ${n}`);}
for(const direction of ['a','b','c']){
 for(const fixture of ['initial','secondary','error','complete']){
  const v=setup(direction,fixture); ok(v.html().includes('Dispatch'),`render ${direction}/${fixture}`);
  if(fixture==='secondary'){ok(v.html().includes('No handovers yet.'),'empty handovers');ok(!v.html().includes('data-testid="record-'),'no invented records');}
  if(fixture==='error'){ok(v.html().includes('The customer corrected this to 18a.'),'error fixture');count(v,'open-count',3);}
  if(fixture==='complete'){count(v,'open-count',1);count(v,'handover-count',2);ok(v.html().includes('Radio remains waiting.'),'complete radio waiting');}
 }
 const v=setup(direction);count(v,'open-count',3); count(v,'handover-count',0);
 v.submit();ok(v.html().includes('Choose an address before releasing the lamp.'),'missing address error');count(v,'open-count',3);
 v.change({name:'address',value:'original'});v.submit();ok(v.html().includes('The customer corrected this to 18a.'),'original rejected');count(v,'open-count',3);
 v.change({name:'address',value:'corrected'});v.input({dataset:{note:'17'},value:'<img src=x onerror=alert(1)>'});
 v.click({job:'18'});ok(v.html().includes('New belt fitted. Speed checked at both settings. Old belt packed with the unit.'),'turntable repair');ok(v.html().includes('turntable.svg'),'turntable drawing');
 v.click({job:'17'});ok(v.html().includes('value="corrected" data-testid="address-corrected" checked'),'address retained across jobs');ok(v.html().includes('&lt;img src=x onerror=alert(1)&gt;'),'note escaped');
 v.click({direction:direction==='a'?'b':'a'});ok(v.html().includes('value="corrected" data-testid="address-corrected" checked'),'address retained across direction');
 v.submit();count(v,'open-count',2);count(v,'handover-count',1);ok(v.html().includes('18a High Street'),'actual receipt address');ok(!v.html().includes('<img src=x'),'note cannot inject HTML');
 v.click({action:'handovers'});ok(v.html().includes('data-testid="record-17"'),'lamp record created');ok(!v.html().includes('data-testid="record-18"'),'turntable not cleared by lamp');
 v.click({record:'17'});ok(v.html().includes('data-testid="undo"'),'record opens undo');v.click({undo:'17'});count(v,'open-count',3);count(v,'handover-count',0);ok(v.html().includes('value="corrected" data-testid="address-corrected" checked'),'undo restores correction');
 v.click({action:'handovers'});ok(v.html().includes('No handovers yet.'),'undo leaves genuine empty');v.click({action:'bench'});v.submit();v.click({job:'18'});v.click({collect:'18'});count(v,'open-count',1);count(v,'handover-count',2);ok(v.html().includes('Collected by Alex'),'collection receipt');ok(v.html().includes('Radio remains waiting.'),'only radio waiting');
 v.click({job:'19'});ok(v.html().includes('data-testid="release" disabled'),'radio release disabled');ok(v.html().includes('replacement switch and final test are still needed'),'radio missing needs explicit');
 v.click({action:'handovers'});v.click({record:'18'});ok(v.html().includes('turntable.svg'),'collection record drawing');v.key('Escape');ok(!v.html().includes('record-detail'),'escape closes record');v.key('Escape');ok(v.html().includes('Kitchen radio'),'escape restores bench context');
 v.click({action:'reset'});count(v,'open-count',3);count(v,'handover-count',0);ok(v.html().includes('Blue enamel lamp'),'reset returns initial lamp');
}
for(const asset of ['lamp.svg','radio.svg','turntable.svg']){
 const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
 ok(hash(path.join(base,'assets',asset))===hash(path.join(base,'..','assets',asset)),`${asset} unchanged`);
}
ok(fs.readFileSync(path.join(base,'fixture.json')).equals(fs.readFileSync(path.join(base,'..','fixture.json'))),'fixture unchanged');
const model=require('./state.js');const waiting=model.finishJob(model.createWorkshop(),19);ok(!!waiting.error&&!waiting.jobs,'model blocks radio');
function lum(hex){const rgb=hex.match(/\w\w/g).map(c=>parseInt(c,16)/255).map(c=>c<=.03928?c/12.92:((c+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
for(const [fg,bg] of [['263e3c','f6f3e9'],['263e3c','fffdf6'],['59645d','f6f3e9'],['59645d','fffdf6'],['46514b','e6e6dd'],['fffdf6','9e3f26'],['fffdf6','7b301d'],['89341f','f8e9de'],['40564a','e8ede4'],['713e2c','f8f0e5'],['5c6259','e1e2d9'],['263e3c','dde5da'],['fffdf6','3f5450']]){
 const a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);ok(ratio>=4.5,`contrast ${fg}/${bg}`);console.log(`Contrast #${fg}/#${bg}: ${ratio.toFixed(2)}:1`);
}
console.log(`${checks} assertions passed. VM event simulation, not browser testing.`);
