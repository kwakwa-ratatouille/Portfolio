// Construit le site à partir de src.html + data.json
//   index.html    : page complète (GitHub Pages)
//   artifact.html : fragment sans <head> (artifact Claude)
const fs=require('fs'),p=require('path'),d=__dirname;
const src=fs.readFileSync(p.join(d,'src.html'),'utf8');
const data=fs.readFileSync(p.join(d,'data.json'),'utf8').trim();
if(!src.includes('/*DATA*/null'))throw new Error('marqueur DATA introuvable dans src.html');
const frag=src.replace('/*DATA*/null',()=>data);
const head='<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
+'<title>Matis Rodrigues Photographie</title><meta name="description" content="Matis Rodrigues, photographe à Tours : sport, spectacle, reportage.">'
+'<style>[hidden]{display:none!important}body{margin:0}img{max-width:100%}</style></head><body>\n';
fs.writeFileSync(p.join(d,'artifact.html'),frag);
fs.writeFileSync(p.join(d,'index.html'),head+frag+'\n</body></html>\n');
console.log('ok',frag.length);
