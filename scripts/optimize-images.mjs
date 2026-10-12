import sharp from 'sharp';
import {existsSync} from 'node:fs';
for(const name of ['brunch','dinner']){
 if(existsSync(`public/images/${name}.png`)){
  await sharp(`public/images/${name}.png`).resize({width:1400,withoutEnlargement:true}).webp({quality:85}).toFile(`public/images/${name}.webp`);
  await sharp(`public/images/${name}.png`).resize({width:700,withoutEnlargement:true}).webp({quality:82}).toFile(`public/images/${name}-small.webp`);
 }
}
