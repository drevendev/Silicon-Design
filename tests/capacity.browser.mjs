// Optional real-browser verification; requires an existing @playwright/test installation.
// No package install, server, model generation or network request is performed here.
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.SILICON_BROWSER_PACKAGE || '@playwright/test');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=process.env.SILICON_BROWSER_OUTPUT || await fs.mkdtemp(path.join(os.tmpdir(),'silicon-capacity-'));
await fs.mkdir(out,{recursive:true});
const html=await fs.readFile(path.join(root,'examples/capacity.html'),'utf8');
const browser=await chromium.launch({headless:true});
const checks=[],errors=[],requests=[];
async function open({lang='en',kind='assortment',width=1080,height=800,funds}={}){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>{
    const url=new URL(route.request().url());requests.push(url.origin+url.pathname);
    return url.origin==='https://capacity-check.invalid'&&url.pathname==='/'
      ? route.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}) : route.abort();
  });
  await page.goto('https://capacity-check.invalid/?case='+kind+'&lang='+lang+(funds===0?'&funds=0':''));
  await page.locator('.offer').first().waitFor();
  return {context,page};
}
async function check(name,fn){try{const result=await fn();checks.push({name,passed:true,...result});}catch(e){checks.push({name,passed:false,error:String(e)});}}
async function geometry(page){return page.evaluate(()=>{
  const main=document.querySelector('main'),rect=e=>e.getBoundingClientRect().toJSON();
  return {viewport:[innerWidth,innerHeight],dpr:devicePixelRatio,body:{width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight},main:{box:rect(main),width:main.clientWidth,height:main.clientHeight,scrollWidth:main.scrollWidth,scrollHeight:main.scrollHeight},offers:[...document.querySelectorAll('.offer')].map(e=>({box:rect(e),name:rect(e.querySelector('.item')),price:rect(e.querySelector('.price')),buy:rect(e.querySelector('.buy')),input:rect(e.querySelector('input')),font:parseFloat(getComputedStyle(e.querySelector('.item')).fontSize),scrollWidth:e.scrollWidth,clientWidth:e.clientWidth}))};
});}
try{
  for(const lang of ['en','ru']){
    await check(lang+': nine complete usable offers fit base viewport',async()=>{
      const {context,page}=await open({lang});try{
        const g=await geometry(page);assert.equal(g.offers.length,9);assert(g.body.width<=1080&&g.body.height<=800);assert(g.main.scrollHeight<=g.main.height+1&&g.main.scrollWidth<=g.main.width+1);
        for(const e of g.offers){assert(e.box.y>=0&&e.box.y+e.box.height<=800);assert(e.scrollWidth<=e.clientWidth);assert(e.font>=16);assert(e.buy.height>=44&&e.input.height>=44&&e.name.height>=44);for(const part of ['name','price','buy','input']){const r=e[part];assert(r.x>=e.box.x&&r.y>=e.box.y&&r.x+r.width<=e.box.x+e.box.width+1&&r.y+r.height<=e.box.y+e.box.height+1);}}
        await page.screenshot({path:path.join(out,lang+'-base.png')});return {geometry:g};
      }finally{await context.close();}
    });
    await check(lang+': purchase truth, input limits, exact detail and keyboard focus',async()=>{
      const {context,page}=await open({lang});try{
        const first=page.locator('#offer-0'),field=first.locator('input'),buy=first.locator('.buy');
        await field.fill('1.5');assert(await buy.isDisabled());await field.fill('51');assert(await buy.isDisabled());await field.fill('');assert(await buy.isDisabled());
        await field.fill('2');await buy.focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#gold').textContent(),lang==='ru'?'9\u00a0952 золота':'9,952 gold');assert((await first.locator('.stock').textContent()).includes('48'));assert((await page.locator('#status').textContent()).includes('2'));assert(await buy.evaluate(e=>e===document.activeElement));
        const title=first.locator('.item');await title.focus();await page.keyboard.press('Enter');assert(await page.locator('dialog').isVisible());assert.equal(await page.locator('dialog dd').nth(0).textContent(),lang==='ru'?'20 золота':'20 gold');assert.equal(await page.locator('dialog dd').nth(2).textContent(),'2');await page.keyboard.press('Escape');assert(await title.evaluate(e=>e===document.activeElement));
        await page.locator('#rules').focus();await page.keyboard.press('Enter');assert((await page.locator('#detail-body').textContent()).includes('20%'));await page.locator('#close').click();assert(await page.locator('#rules').evaluate(e=>e===document.activeElement));
        await field.fill('48');await buy.click();assert((await first.locator('.stock').textContent()).endsWith('0'));assert(await buy.isDisabled());assert.equal(await first.count(),1);
      }finally{await context.close();}
    });
    await check(lang+': no gold has a truthful blocked action',async()=>{
      const {context,page}=await open({lang,funds:0});try{for(const buy of await page.locator('.buy').all()){assert(await buy.isDisabled());assert((await buy.innerText()).includes(lang==='ru'?'Не хватает':'Not enough'));}}finally{await context.close();}
    });
    await check(lang+': narrow and enlarged text deliberately reflow without horizontal loss',async()=>{
      for(const [width,height,enlarged] of [[390,844,false],[1080,800,true]]){
        const {context,page}=await open({lang,width,height});try{
          if(enlarged)await page.evaluate(()=>document.documentElement.style.fontSize='200%');
          const g=await geometry(page);assert.equal(g.offers.length,9);assert(g.body.width<=width);assert(g.main.scrollWidth<=g.main.width+1);for(const e of g.offers)assert(e.scrollWidth<=e.clientWidth);
          const last=page.locator('.offer').last().locator('.buy');await last.scrollIntoViewIfNeeded();await last.focus();assert(await last.evaluate(e=>e===document.activeElement));await last.click();assert((await page.locator('#status').textContent()).length>0);
          await page.screenshot({path:path.join(out,lang+(enlarged?'-enlarged':'-narrow')+'.png')});
        }finally{await context.close();}
      }
    });
    await check(lang+': large catalog can search, sort, retain drafts and buy',async()=>{
      const {context,page}=await open({lang,kind:'catalog'});try{
        assert.equal(await page.locator('.offer').count(),96);assert(await page.locator('main').evaluate(e=>e.scrollHeight>e.clientHeight));await page.screenshot({path:path.join(out,lang+'-catalog.png')});
        await page.locator('#search').fill('001');assert.equal(await page.locator('.offer').count(),1);await page.locator('.offer input').fill('3');await page.locator('#search').fill('');await page.locator('#sort').selectOption('price');assert.equal(await page.locator('.offer').first().getAttribute('id'),'offer-0');assert.equal(await page.locator('#offer-0 input').inputValue(),'3');
        await page.locator('#search').fill('no-such-fictional-item');assert.equal(await page.locator('.offer').count(),0);assert((await page.locator('#offers').textContent()).trim().length>0);
        await page.locator('#search').fill('096');const last=page.locator('.buy');await last.focus();await page.keyboard.press('Enter');assert((await page.locator('#status').textContent()).includes('096'));await page.screenshot({path:path.join(out,lang+'-catalog-filtered.png')});
      }finally{await context.close();}
    });
  }
}finally{await browser.close();}
const report={browser:'Chromium '+browser.version(),checks,errors,requests:[...new Set(requests)],model_generations:0,comparative_experiments:0,limits:['Original fictional fixture only, not a private consuming game.','200% text enlargement is not native browser zoom.','No physical device, assistive technology, preference, billing or compliance certification.']};
await fs.writeFile(path.join(out,'report.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({checks:checks.map(({geometry,...x})=>x),errors,out}));
if(errors.length||checks.some(x=>!x.passed))process.exitCode=1;
