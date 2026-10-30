/* Optional, dependency-free rebuild after editing publication records.
   主页编辑器.html generates the same output in the browser; keep the two in step. */
const fs=require('node:fs');
const path=require('node:path');
global.window={};
require(path.join(__dirname,'content.js'));
const data=window.HOMEPAGE;
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function authors(p){
  return p.authors.map((a,i)=>(a==='Dong, Z.'?'<strong>'+escape(a)+'</strong>':escape(a))+((p.corresponding||[]).includes(i)?'<sup>†</sup>':'')).join(', ');
}
// Papers without a DOI may give a plain url instead.
const paperLink=p=>p.doi?'https://doi.org/'+p.doi:(p.url||'');
const hasTextCover=p=>Array.isArray(p.coverLines)&&p.coverLines.length>0;
function cover(p){
  const lines=p.coverLines.map((line,i)=>'<text x="27" y="'+(92+i*34)+'" font-family="Arial,sans-serif" font-size="25" fill="#34485f">'+escape(line)+'</text>').join('');
  return '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><title>Typographic cover: '+escape(p.title)+'</title><rect width="400" height="240" fill="#fff"/><rect x="0.5" y="0.5" width="399" height="239" fill="none" stroke="#d9e1e8"/><path d="M27 52h346" stroke="#c5ced8"/>'+lines+'<text x="27" y="213" font-family="Arial,sans-serif" font-size="12" fill="#7c8794">'+escape(p.short+' · '+p.year+' · Zhentao Dong')+'</text></svg>';
}
function selected(p){
  const link=paperLink(p);
  return '<article class="paper-box"><div class="paper-image"><div><div class="badge">'+escape(p.short+' '+p.year)+'</div><img src="'+escape(p.cover)+'" alt="'+(hasTextCover(p)?'Typographic cover: ':'Figure: ')+escape(p.title)+'" width="280" height="168" loading="lazy"></div></div><div class="paper-text"><ul><li class="authors">'+authors(p)+'</li><li>'+escape(p.title)+' (<em>'+escape(p.journal)+'</em>, '+escape(p.year)+')</li>'+(link?'<li><a href="'+escape(link)+'" target="_blank" rel="noopener noreferrer">[paper]</a></li>':'')+'</ul></div></article>';
}
function listed(p){
  const link=paperLink(p);
  const title=link?'<a href="'+escape(link)+'" target="_blank" rel="noopener noreferrer">'+escape(p.title)+'</a>':escape(p.title);
  return '<li>'+authors(p)+', '+title+' <em>'+escape(p.journal)+'</em>, '+(p.details?escape(p.details)+', ':'')+escape(p.year)+(p.chinese?' [In Chinese]':'')+'.</li>';
}
const selectedHTML=data.publications.filter(p=>p.selected).map(p=>{if(hasTextCover(p))fs.writeFileSync(path.join(__dirname,p.cover),cover(p),'utf8');return selected(p)}).join('\n');
const years=[...new Set(data.publications.map(p=>p.year))].sort().reverse();
const allHTML=years.map(year=>'<section class="publication-year"><h4>🎯 '+escape(year)+'</h4><ul>'+data.publications.filter(p=>p.year===year).map(listed).join('')+'</ul></section>').join('\n');
let html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
function replaceBlock(name,value){
  const start='<!-- '+name+' -->',end='<!-- END_'+name+' -->';
  const from=html.indexOf(start);
  if(from<0)throw Error('Missing marker '+name);
  const endAt=html.indexOf(end,from);
  const to=endAt<0?from+start.length:endAt+end.length;
  html=html.slice(0,from)+start+'\n'+value+'\n'+end+html.slice(to);
}
replaceBlock('SELECTED_PUBLICATIONS',selectedHTML);
replaceBlock('COMPLETE_PUBLICATIONS',allHTML);
const underReviewHTML=(data.underReview||[]).map(p=>'<li><div>'+escape(p.title)+'</div><div class="authors">'+authors(p)+' · <em>Under Review</em></div></li>').join('\n');
replaceBlock('UNDER_REVIEW',underReviewHTML);
// Each data-t wrapper has no nested element of its own tag type.
// Keep the default English HTML in sync with the bilingual content file.
html=html.replace(/<([a-z][\w-]*)(\s[^>]*\bdata-t="([^"]+)"[^>]*)>[\s\S]*?<\/\1>/g,(match,tag,attrs,key)=>{
  const value=data.translations.en[key];
  if(value===undefined)throw Error('Missing English text: '+key);
  return '<'+tag+attrs+'>'+value+'</'+tag+'>';
});
fs.writeFileSync(path.join(__dirname,'index.html'),html,'utf8');
console.log('Built '+data.publications.filter(p=>p.selected).length+' selected papers, '+data.publications.length+' published records, '+(data.underReview||[]).length+' under-review records, and publication title covers.');
