// Contract review: genuine locale entry pages, measured frames and schema-2 surface/coherence UI.
import {createServer} from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.SILICON_BROWSER_PACKAGE||'@playwright/test');
const root=path.resolve(process.argv[2]),out=path.resolve(process.argv[3]);
await fs.mkdir(out,{recursive:true});
const server=createServer(async(req,res)=>{
  try{
    let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const broken=name==='/bad-startup.html';
    if(broken)name='/locales/Blind-Test.html';
    const file=path.resolve(root,'.'+name);
    if(!file.startsWith(root+path.sep))throw Error();
    let body=await fs.readFile(file);
    if(broken)body=Buffer.from(body.toString().replace('"schema_version":2','"schema_version":true'));
    res.writeHead(200,{'Content-Type':file.endsWith('.html')?'text/html; charset=utf-8':'application/json'});res.end(body);
  }catch{res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port,browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1,acceptDownloads:true});
const errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem(Object.keys(localStorage).find(x=>x.includes(document.documentElement.dataset.corpusId)))));
const open=async unit=>{await page.goto(origin+'/'+unit+'/Blind-Test.html');await page.waitForFunction(()=>!document.querySelector('#start').disabled);};
const begin=()=>page.locator('#start').click();
const frames={};
try{
  await open('locales');await begin();
  const left=page.frameLocator('.pane[data-side="left"] .site-frame'),right=page.frameLocator('.pane[data-side="right"] .site-frame');
  await left.locator('h1').waitFor();await right.locator('h1').waitFor();
  assert.equal(await left.locator('html').getAttribute('lang'),await page.locator('#locale').inputValue());
  await page.locator('[data-vote="tie"]').click();await page.locator('#comment').fill('SYNTHETIC locale/view draft');
  for(const locale of ['en','ru']){
    await page.locator('#locale').selectOption(locale);
    for(const frame of [left,right]){
      await frame.getByRole('heading',{name:locale==='en'?'Repair atlas':'Атлас ремонта',exact:true}).waitFor();
      assert.equal(await frame.locator('html').getAttribute('lang'),locale);
    }
  }
  const rightURL=await right.locator('html').evaluate(()=>location.href);
  await left.getByRole('link').click();
  await left.locator('html').evaluate(()=>document.readyState==='complete');
  assert.equal(await right.locator('html').evaluate(()=>location.href),rightURL);
  assert.equal(await page.locator('#comment').inputValue(),'SYNTHETIC locale/view draft');
  for(const [view,zoom,width,height]of [['desktop','100',1280,720],['mobile','100',390,844],['mobile','200',780,844]]){
    await page.locator('#view').selectOption(view);await page.locator('#zoom').selectOption(zoom);
    await page.waitForFunction(()=>!document.querySelector('#confirm-next').disabled);
    for(const side of ['left','right']){
      const frame=page.frameLocator(`.pane[data-side="${side}"] .site-frame`);
      const metrics=await frame.locator('html').evaluate(()=>({width:innerWidth,height:innerHeight,document_lang:document.documentElement.lang}));
      assert.equal(metrics.width,width);assert.equal(metrics.height,height);assert.equal(metrics.document_lang,'ru');
      assert.match(await page.locator(`.pane[data-side="${side}"] .runtime-metrics`).textContent(),new RegExp(width+' × '+height));
      frames[view+'-'+zoom+'-'+side]=metrics;
    }
  }
  await page.screenshot({path:path.join(out,'locale-runtime-wide.png'),fullPage:true});
  await page.locator('#confirm-next').click();const answer=(await read()).answers[0];
  assert.equal(answer.locale,'ru');assert.equal(answer.runtime_display.left.width,780);assert.equal(answer.runtime_display.right.document_lang,'ru');
  assert.ok(Object.values((await read()).seen_routes).some(log=>log.left.some(route=>route.includes('https://'))));
  await page.evaluate(()=>StudyCore.validateSession(JSON.parse(localStorage.getItem(Object.keys(localStorage).find(x=>x.includes(document.documentElement.dataset.corpusId)))),IFS_CORPUS));
  checks.push('Whole-site locale selects actual EN/RU entry pages on both sides; navigation and view changes preserve draft; measured site viewport/language and URL-valued query strings remain exportable');

  await open('surface');assert.match(await page.locator('#corpus-note').textContent(),/21 заданий: 0 сайтов целиком, 21 поверхностей, 0 комплектов/);await begin();
  assert.equal(await page.locator('.screen-choice').first().isHidden(),true);
  await page.locator('[data-vote="left"]').click();await page.waitForFunction(()=>!document.querySelector('#confirm-next').disabled);await page.locator('#confirm-next').click();
  assert.equal((await read()).answers[0].screen,'one');assert.equal((await read()).answers.length,1);
  checks.push('Schema-2 single surface: actual workload 21; declared surface only; draft/Next creates a valid surface answer');

  await open('multi');assert.match(await page.locator('#corpus-note').textContent(),/126 заданий: 0 сайтов целиком, 105 поверхностей, 21 комплектов/);await begin();
  let skipped=0;while(await page.locator('.screen-choice').first().isHidden()){await page.locator('#skip').click();assert.ok(++skipped<126);}
  await page.locator('[data-vote="right"]').click();assert.equal(await page.locator('#confirm-next').isDisabled(),true);
  for(const side of ['left','right'])for(const screen of ['one','two','three','four','five']){
    await page.locator(`.pane[data-side="${side}"] .screen-choice`).selectOption(screen);
    await page.waitForFunction(({side,screen})=>{const s=JSON.parse(localStorage.getItem(Object.keys(localStorage).find(x=>x.includes(document.documentElement.dataset.corpusId))));return Object.values(s.seen_screens??{}).some(log=>log[side].includes(screen));},{side,screen});
  }
  await page.waitForFunction(()=>!document.querySelector('#confirm-next').disabled);await page.locator('#comment').fill('SYNTHETIC explicit coherence');await page.locator('#confirm-next').click();
  assert.equal((await read()).answers.length,1);assert.equal((await read()).answers[0].block,'set');
  await page.reload();await begin();assert.equal((await read()).answers.length,1);
  checks.push('Schema-2 five surfaces plus explicitly selected coherence: 126 ballots; confirmation blocked until both sides display all five; valid set answer survives reload');

  await open('multi-no-set');assert.match(await page.locator('#corpus-note').textContent(),/105 заданий: 0 сайтов целиком, 105 поверхностей, 0 комплектов/);await begin();
  assert.equal((await read()).answers.length,0);assert.equal(await page.locator('.screen-choice').first().isHidden(),true);
  checks.push('Schema-2 multi-surface without coherence: 105 ballots and a distinct empty session, with no added set ballot');

  await page.goto(origin+'/bad-startup.html');await page.locator('#notice').filter({hasText:'корпус'}).waitFor();assert.equal(await page.locator('#start').isDisabled(),true);
  assert.deepEqual(errors,[]);checks.push('Malformed initial corpus displays a useful error with Start disabled, rather than throwing before the error handler');
  await fs.writeFile(path.join(out,'protocol-browser.json'),JSON.stringify({qa:true,status:'PASS',revision:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),browser:browser.version(),outer_viewport:[1440,1000],dpr:1,browser_zoom:'100% default; width controls resize actual frame viewport, not native browser zoom',frames,checks},null,2));
  console.log(JSON.stringify({status:'PASS',checks}));
}finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
