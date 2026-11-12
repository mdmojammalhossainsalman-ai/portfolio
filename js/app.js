(()=>{
const $=(s,r=document)=>r.querySelector(s),P=window.PROJECTS,I='img/';
const th=i=>`${I}${i.f}-t.webp`,fu=i=>`${I}${i.f}.webp`;
$('#yr').textContent=new Date().getFullYear();
// hero strip: logos twice for seamless loop
const logos=P.filter(p=>p.cat==='Logo Design');
$('#track').innerHTML=[...logos,...logos].map(p=>`<img src="${th(p.cover)}" width="${p.cover.w}" height="${p.cover.h}" alt="" loading="lazy" decoding="async">`).join('');
// filters: only categories that have projects
const cats=['All',...new Set(P.map(p=>p.cat))];let cur='All';
const f=$('#filters');
f.innerHTML=cats.map(c=>`<button role="tab" aria-selected="${c===cur}">${c}</button>`).join('');
f.onclick=e=>{const b=e.target.closest('button');if(!b)return;cur=b.textContent;f.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x===b));draw()};
function draw(){$('#grid').innerHTML=P.map((p,n)=>({p,n})).filter(({p})=>cur==='All'||p.cat===cur).map(({p,n})=>`<button class="card" data-n="${n}"><div class="ph"><img src="${th(p.cover)}" width="${p.cover.w}" height="${p.cover.h}" alt="${p.title} ${p.cat.toLowerCase()} project" loading="lazy" decoding="async"></div><div class="tx">${p.images.length>1?`<span class="ct">${p.images.length} pieces</span>`:''}<h3>${p.title}</h3><p>${p.type}</p></div></button>`).join('')}
draw();
// modal
const m=$('#modal'),mi=$('#mi');let cp,ci,last;
function show(k){ci=(k+cp.images.length)%cp.images.length;const i=cp.images[ci];mi.src=fu(i);mi.width=i.W;mi.height=i.H;mi.alt=`${cp.title}, image ${ci+1} of ${cp.images.length}`;$('#mth').querySelectorAll('button').forEach((b,x)=>b.setAttribute('aria-current',x===ci))}
function open(n){cp=P[n];last=document.activeElement;const many=cp.images.length>1;
$('#mm').textContent=`${cp.cat} · ${cp.type}`;$('#mt').textContent=cp.title;$('#mb').textContent=cp.blurb;
$('#ml').innerHTML=cp.deliverables.map(d=>`<li>${d}</li>`).join('');
$('#mth').hidden=!many;$('#mth').innerHTML=many?cp.images.map((i,x)=>`<button data-x="${x}" aria-label="Image ${x+1}"><img src="${th(i)}" alt="" loading="lazy"></button>`).join(''):'';
m.querySelectorAll('.nv').forEach(b=>b.hidden=!many);show(0);m.hidden=false;document.body.style.overflow='hidden';$('#mx').focus()}
function close(){m.hidden=true;document.body.style.overflow='';last&&last.focus()}
$('#grid').onclick=e=>{const c=e.target.closest('.card');c&&open(+c.dataset.n)};
$('#mx').onclick=close;m.onclick=e=>{if(e.target===m)close()};$('#mc').onclick=close;
m.querySelector('.p').onclick=()=>show(ci-1);m.querySelector('.n').onclick=()=>show(ci+1);
$('#mth').onclick=e=>{const b=e.target.closest('button');b&&show(+b.dataset.x)};
document.addEventListener('keydown',e=>{if(m.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(ci-1);if(e.key==='ArrowRight')show(ci+1);
if(e.key==='Tab'){const t=[...m.querySelectorAll('button:not([hidden]),a')].filter(x=>!x.closest('[hidden]'));const a=t[0],z=t[t.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
// before/after
const C=window.COMPARES||[];
if(C.length){$('#compare').hidden=false;$('#cmps').innerHTML=C.map(c=>`<figure class="cmp"><img src="${c.after}" alt="${c.title}, after" loading="lazy"><img class="b" src="${c.before}" alt="${c.title}, before" loading="lazy"><span class="hd"></span><input type="range" min="0" max="100" value="50" aria-label="Compare before and after: ${c.title}"><figcaption>${c.note||c.title}</figcaption></figure>`).join('');
document.querySelectorAll('.cmp input').forEach(r=>r.oninput=()=>r.parentNode.style.setProperty('--p',r.value+'%'))}
else document.querySelectorAll('[data-compare]').forEach(a=>a.remove());
// nav
const nav=$('#menu'),bg=$('.burger');bg.onclick=()=>bg.setAttribute('aria-expanded',nav.classList.toggle('open'));nav.onclick=e=>{if(e.target.tagName==='A'){nav.classList.remove('open');bg.setAttribute('aria-expanded','false')}};
// contact
const E='marketing.salman2019@gmail.com',note=$('#note');
$('#copy').onclick=async()=>{try{await navigator.clipboard.writeText(E);note.textContent='Email copied.'}catch{note.textContent=E}};
$('#form').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target);
if(!d.get('name')||!/\S+@\S+\.\S+/.test(d.get('email'))||!d.get('msg')){note.textContent='Add your name, a valid email and a message.';return}
const body=`Name: ${d.get('name')}\nEmail: ${d.get('email')}\nNeed: ${d.get('need')}\n\n${d.get('msg')}`;
location.href=`mailto:${E}?subject=${encodeURIComponent('Project enquiry: '+d.get('need'))}&body=${encodeURIComponent(body)}`;note.textContent='Opening your email app. If nothing opens, copy the address above.'};
})();
