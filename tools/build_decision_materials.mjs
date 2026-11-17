// Build complete offline artifacts; measure actual whole-file transports, never sums of fragments.
import fs from 'node:fs/promises';import path from 'node:path';import {createHash} from 'node:crypto';import {gzipSync,brotliCompressSync,constants} from 'node:zlib';
const root=path.resolve('examples/decisions'),html=await fs.readFile(path.join(root,'exchange.html'),'utf8'),css=await fs.readFile(path.join(root,'decisions.css'),'utf8'),model=await fs.readFile(path.join(root,'model.js'),'utf8'),app=await fs.readFile(path.join(root,'exchange.js'),'utf8');
const license=await fs.readFile(path.resolve('LICENSE'),'utf8');
const rows=[];for(const variant of ['plain','engraved','luminous']){
 const source='<!--\n'+license+'-->\n'+html.replace('class="material-engraved"',`class="material-${variant}"`).replace('<link rel="stylesheet" href="decisions.css">',`<style>${css}</style>`).replace('<script src="model.js"></script><script src="exchange.js"></script>',`<script>${model}</script><script>${app}</script>`);
 const file=`exchange-${variant}.html`,body=Buffer.from(source),row={variant,file,sha256:createHash('sha256').update(body).digest('hex'),raw_bytes:body.length,gzip_bytes:gzipSync(body,{level:9}).length,brotli_bytes:brotliCompressSync(body,{params:{[constants.BROTLI_PARAM_QUALITY]:11}}).length};
 await fs.writeFile(path.join(root,file),body);rows.push(row);
}
for(const row of rows)row.net_vs_plain={raw_bytes:row.raw_bytes-rows[0].raw_bytes,gzip_bytes:row.gzip_bytes-rows[0].gzip_bytes,brotli_bytes:row.brotli_bytes-rows[0].brotli_bytes};
const receipt={format:1,compression:'Node zlib gzip level 9; Brotli quality 11; UTF-8 full artifact',cost_scope:'Each HTML includes the entire shared CSS, original vector generator and models/UI. Same payload family; no remote assets. Navigation destinations are optional sibling examples, not required for this flow.',rights:'All added code/vector material original, repository MIT; system fonts. No purchased media or external-service exposure.',variants:rows};
await fs.writeFile(path.join(root,'material-costs.json'),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(rows));
