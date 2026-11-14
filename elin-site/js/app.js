/* ELIN storefront. You do not need to edit this file. Use  index.html#/admin  to manage the store. */
(function(){
const E=window.EL,D=E.D,C=D.cats,S=E.S,$=s=>document.querySelector(s),m=$("#m");
const {IMG,VID,money,esc,wl}=E;
const sl=s=>s.toLowerCase().replace(/&/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
let sortBy="",coupon="",ckv={},cur=null;
const img=(b,cls="",lab,mk)=>`<div class="slot ${cls}" data-mk="${mk||b.replace("assets/","")}"><i>${lab||"Add photo:<br>"+b+".jpg"}</i><img alt="" loading="lazy" src="${b}.jpg" data-b="${b}" data-x="jpg,jpeg,png,webp" decoding="async" onerror="nx(this)" onload="this.classList.add('ok')"></div>`;
const vid=(b,cls="",lab,mk)=>`<div class="slot ${cls}" data-mk="${mk||b.replace("assets/","")}"><i>${lab||"Add video:<br>"+b+".mp4"}</i><video muted loop playsinline preload="none"><source src="${b}.mp4" type="video/mp4"><source src="${b}.webm" type="video/webm" onerror="this.parentNode.remove()"></video></div>`;
const gal=(p,cls="")=>`<div class="slot pic ${cls}"><i>Add photos:<br>${IMG}${p.cat}/${p.id}.jpg<br>(add -2 and -3 for slides)</i><div class="gal">${E.slides(p)}</div><button class="ga l" data-g="-1" aria-label="Previous photo">‹</button><button class="ga r" data-g="1" aria-label="Next photo">›</button></div>`;
const scopeName=s=>s=="all"?"Bags, Hair, Gifts, Toys & Stationery":(C[s]||{}).t||s;
/* header, footer */
const cfg=S.settings;
function chrome(){
 $("#tick").innerHTML=[...cfg.ticker,...cfg.ticker].map(t=>`<span${/weekend|sale|offer/i.test(t)?' class="hot"':""}>${esc(t)}</span>`).join("");
 $("#wafab").href=wl("Hello ELIN, I need help with an order.");
 $("#nav").innerHTML=`<div><a href="#/">Home</a></div>`+Object.keys(C).map(k=>`<div><a href="#/${k}" ${k=="sale"?'class="sale"':""}>${C[k].t}</a>${k=="sale"?"":`<div class="dd">${C[k].subs.map(s=>`<a href="#/${k}/${sl(s)}">${s}</a>`).join("")}</div>`}</div>`).join("")+`<div><a class="blink" href="#/bundles">Bundle Offers</a></div><div><a class="blink" href="#/reseller">Wholesale &amp; Bulk Orders</a></div>`;
 $("#foot").innerHTML=`<div><img class="flogo" src="assets/images/logo-light.png" alt="ELIN" onerror="this.replaceWith(document.createTextNode('ELIN'))"><p style="margin-top:10px">Premium lifestyle products, curated bags, footwear and accessories, delivered to your doorstep.</p><div class="soc" aria-label="Follow ELIN">${SOC.map(x=>`<a href="${x[1]}" target="_blank" rel="noopener" aria-label="ELIN on ${x[0]}">${x[2]}</a>`).join("")}</div></div>
<div><h2>Our products</h2>${Object.keys(C).filter(k=>k!="sale").map(k=>`<a href="#/${k}">${C[k].t}</a>`).join("")}</div>
<div><h2>Customer service</h2>${[["About us","about-2"],["FAQ's","faq"],["Shipping policy","shipping-policy"],["Refund & exchange","refund_returns"],["Privacy policy","privacy-policy"]].map(x=>`<a href="https://elin.com.pk/${x[1]}/" target="_blank" rel="noopener">${x[0]}</a>`).join("")}</div>
<div><h2>Visit & contact</h2><p>${esc(cfg.address)}</p><a href="mailto:${esc(cfg.email)}">${esc(cfg.email)}</a><a href="tel:+${esc(cfg.wa)}">${esc(cfg.phone)}</a>${SOC.map(x=>`<a href="${x[1]}" target="_blank" rel="noopener">${x[0]}</a>`).join("")}</div><div class="fbar"><span>© ${new Date().getFullYear()} ELIN. All rights reserved.</span><a class="adl" href="#/admin"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>Admin login</a></div>`;
 cc();
}
const cc=()=>{const n=E.count(),b=$("#cc");b.textContent=n;b.style.display=n?"grid":"none"};
/* blocks */
const hero=(k,v,t,cta,eb)=>`<section class="hero h-${v}"><div class="ht"><p class="eb">${eb||"ELIN"}</p><h1>${esc(t.h)} <em>${esc(t.em)}</em></h1><p class="sub">${esc(t.s)}</p>${cta}</div>${vid(VID+"hero-"+k,"hm")}</section>`;
const tiles=(k,list,title,sub)=>`<section class="rv"><div class="sh"><h2>${title}</h2><p>${sub}</p></div><div class="vgrid">${list.map((t,i)=>{const a=Array.isArray(t)?t:[t,""];return `<div class="vt" tabindex="0" role="button" aria-label="Play video with sound: ${esc(a[0])}">${vid(VID+k+"-tile-"+(i+1))}<span class="snd" aria-hidden="true">${SND}</span><div class="cp"><em class="nm">${pad(i+1)}</em><b>${a[0]}</b><span>${a[1]}</span></div></div>`}).join("")}</div></section>`;
const ben=()=>`<div class="pts rv">${D.benefits.map(b=>`<div><h2>${b[0]}</h2><p>${b[1]}</p></div>`).join("")}</div>`;
const SND='<svg class="m" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.6L12 18.5v-13L7.6 9.5H4z"/><path d="M16 9l5 6M21 9l-5 6"/></svg><svg class="u" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.6L12 18.5v-13L7.6 9.5H4z"/><path d="M15.5 9a4.2 4.2 0 010 6M18.3 6.5a8 8 0 010 11"/></svg>';
const CART='<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8a3 3 0 016 0"/></svg>';
const pad=n=>String(n).padStart(2,"0");
const stars=E.stars;
const SOC=[
["Facebook","https://www.facebook.com/elin.com.pk2",'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/></svg>'],
["Instagram","https://www.instagram.com/elin.com.pk",'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>'],
["TikTok","https://www.tiktok.com/@elin.com.pk",'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>'],
["YouTube","https://www.youtube.com/@elin.com.pk1",'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>']
];
const REV_SEC=6.5; /* seconds each review card takes to pass; raise to slow down, lower to speed up */
const WHEN=["Last week","2 weeks ago","Last month","3 days ago","This week","A month ago"],TICK='<svg class="vt2" viewBox="0 0 24 24" width="16" height="16" aria-label="Verified customer"><circle cx="12" cy="12" r="11" fill="#3b1220"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const rrow=(L,cls)=>{const B=L.length?Array.from({length:Math.max(L.length,Math.ceil(8/L.length)*L.length)},(_,i)=>L[i%L.length]):L;return `<div class="rmq ${cls}"><div style="animation-duration:${Math.max(B.length*REV_SEC,40)}s">${[...B,...B].map(r=>`<figure class="rc"><span class="rph" data-ri="${S.reviews.indexOf(r)}"></span><div class="rcb"><div class="rcs">${stars(r.r)}<small>${WHEN[(S.reviews.indexOf(r)*5+2)%WHEN.length]}</small></div><p>${esc(r.t)}</p><figcaption><b>${esc(r.n)}${TICK}</b><span class="rcp">${esc(r.c)}</span></figcaption></div></figure>`).join("")}</div></div>`};
const revs=k=>{const R=S.reviews;if(!R.length)return"";const a=E.avg(),h=Math.ceil(R.length/2);
 return `<section class="rv revsec"><div class="sh"><h2>Loved by <em>customers</em></h2><div class="avg"><b>${a.toFixed(1)}</b>${stars(a)}<span>${R.length} reviews</span></div></div>${rrow(R.slice(0,h),"")}${rrow(R.slice(h),"rev2")}<div class="rev shots">${[1,2,3].map(i=>`<figure>${img(IMG+"reviews/"+k+"-"+i,"","Add screenshot:<br>reviews/"+k+"-"+i+".jpg")}</figure>`).join("")}</div></section>`};
const bundles=(only)=>{if(only&&E.NOBUN.includes(only))return"";const L=S.bundles.filter(b=>b.on&&(!only||b.scope=="all"||b.scope==only));if(!L.length)return"";
 return `<section class="rv bunsec"><div class="sh"><h2>Bundle <em>offers</em></h2><p>Mix and match. Buy more, pay less. Saving applies to packs built here.</p></div><div class="buns">${L.map(b=>{const v=E.bprev(b);return `<div class="bun">${img(IMG+"bundles/"+b.id,"","Bundle photo:<br>bundles/"+b.id+".jpg")}${b.tag?`<span class="btag">${esc(b.tag)}</span>`:""}<div class="bt"><b>${esc(b.name)}</b><span class="bd2">${E.bdesc(b)}</span>${v?`<small>Example: <s>${money(v.normal)}</s> <strong>${money(v.deal)}</strong> · you save ${money(v.save)}</small>`:""}<small>${esc(scopeName(b.scope))}</small><button class="btn" data-bb="${b.id}">Build your pack</button></div></div>`}).join("")}</div></section>`};
/* bundle builder */
let bb=null;
function openBuilder(id){const b=S.bundles.find(x=>x.id==id);if(!b)return;bb={b,sel:[]};drawBuilder();show("md")}
function drawBuilder(){
 const {b,sel}=bb,L=S.products.filter(p=>p.on&&E.bok(p)&&(b.scope=="all"||p.cat==b.scope)),keep=$("#md .bl"),st=keep?keep.scrollTop:0;
 const ps=sel.map(s=>E.eff(E.prod(s.pid))),normal=ps.reduce((a,x)=>a+x,0),full=sel.length==b.qty;
 const deal=!full?normal:b.type=="pct"?Math.round(normal*(1-b.val/100)):b.type=="free"?normal-Math.min(...ps):Math.min(normal,b.val);
 $("#md").innerHTML=`<div class="mbox bbox" role="dialog" aria-modal="true" aria-label="${esc(b.name)}"><button class="mx" data-close aria-label="Close">×</button><div class="bh2"><h2>Build your <em>${esc(b.name)}</em></h2><p>${E.bdesc(b)}. Pick ${b.qty} items (${sel.length} of ${b.qty} chosen).</p><div class="prog"><i style="width:${sel.length/b.qty*100}%"></i></div></div>
 <div class="bl">${L.map(p=>`<button class="bpc ${sel.some(s=>s.pid==p.id)?"on":""}" data-bp="${p.id}"><span class="slot th"><span class="gal">${E.slides(p)}</span></span><b>${esc(p.name)}</b><span>${money(E.eff(p))}</span></button>`).join("")||"<p>No products yet.</p>"}</div>
 <div class="bs"><div class="tray">${sel.map((s,i)=>{const p=E.prod(s.pid);return `<div class="tr"><span>${esc(p.name)}</span>${p.sizes.length?`<select data-bsz="${i}" aria-label="Size"><option value="">Size</option>${p.sizes.map(z=>`<option ${s.size==z?"selected":""}>${esc(z)}</option>`).join("")}</select>`:""}${p.colors.length?`<select data-bco="${i}" aria-label="Colour"><option value="">Colour</option>${p.colors.map(z=>`<option ${s.color==z?"selected":""}>${esc(z)}</option>`).join("")}</select>`:""}<button data-bx="${i}" aria-label="Remove">×</button></div>`}).join("")||`<p class="hint2">Tap products above to add them to your pack.</p>`}</div>
 <div class="bt2">${full?`<s>${money(normal)}</s> <b>${money(deal)}</b> <em>You save ${money(normal-deal)}</em>`:`<span>Choose ${b.qty-sel.length} more</span>`}<button class="btn" data-bgo ${full?"":"disabled"}>Add pack to cart</button></div></div></div>`;
 E.hydrate($("#md"));const n=$("#md .bl");if(n)n.scrollTop=st;
}

const marq=()=>`<div class="bigm"><div>${[...Object.values(C).map(c=>c.t),...Object.values(C).map(c=>c.t)].map(t=>`<span>${t}</span>`).join("")}</div></div>`;
const card=(p,nr)=>{const e=E.eff(p),pc=E.pct(p);return `<article class="p ${nr?"":"rv"}" data-pid="${p.id}">${gal(p)}<button class="hrt ${E.wish.includes(p.id)?"on":""}" data-w="${p.id}" aria-label="Save ${esc(p.name)} to wishlist" aria-pressed="${E.wish.includes(p.id)}">♥</button>${pc?`<span class="bd">Save ${pc}%</span>`:p.badge?`<span class="bd">${esc(p.badge)}</span>`:""}<small>${esc(p.sub)}</small><h3 data-open="${p.id}">${esc(p.name)}</h3>${p.rating>0?`<div class="rt">${stars(p.rating)} <span>(${(+p.rating).toFixed(1)})</span></div>`:""}<div class="pr">${pc?`<s>${money(p.price)}</s> `:""}${money(e)}</div><div class="acts"><button class="btn atc" data-q="${p.id}">${CART}<span>Add to cart</span></button><button class="btn o" data-open="${p.id}">View</button></div></article>`};
/* auto-moving rows: products on home, round collection strip on category pages */
const grp=(html,c)=>`<div class="g"${c?' data-c aria-hidden="true"':""}>${html}</div>`;
const triple=html=>RM?grp(html):grp(html)+grp(html,1)+grp(html,1);
const fillTo=(arr,n)=>arr.length&&arr.length<n?Array.from({length:Math.ceil(n/arr.length)*arr.length},(_,i)=>arr[i%arr.length]):arr;
function autoScroll(el){if(RM||el._as)return;const g=el.querySelector(".g");if(!g)return;el._as=1;
 const pps=+el.dataset.pps||60;let pos=0,last=0,hold=0,raf=0,vis=false,st;
 const W=()=>g.offsetWidth,pause=ms=>{hold=ms?performance.now()+ms:Infinity};el._pause=pause;
 const norm=()=>{const w=W();if(!w)return;let v=el.scrollLeft;if(v<w*.5)v+=w;else if(v>=w*2.5)v-=w;else return;el.scrollLeft=v;pos=v};
 const tick=ts=>{raf=0;if(!el.isConnected||!vis)return;const dt=Math.min(50,ts-(last||ts));last=ts;
  if(!hold||performance.now()>hold){hold=0;const w=W();if(w){pos+=pps*dt/1000;if(pos>=2*w)pos-=w;if(pos<w)pos+=w;el.scrollLeft=pos}}
  raf=requestAnimationFrame(tick)};
 const start=()=>{if(!raf&&vis){last=0;raf=requestAnimationFrame(tick)}};
 el.scrollLeft=pos=W();
 el.addEventListener("pointerenter",e=>{if(e.pointerType=="mouse")pause(0)});el.addEventListener("pointerleave",e=>{if(e.pointerType=="mouse")pause(700)});
 el.addEventListener("focusin",()=>pause(0));el.addEventListener("focusout",()=>pause(700));
 el.addEventListener("touchstart",()=>pause(0),{passive:true});el.addEventListener("touchend",()=>pause(3000),{passive:true});el.addEventListener("wheel",()=>pause(2000),{passive:true});
 el.addEventListener("scroll",()=>{if(Math.abs(el.scrollLeft-pos)>3){pos=el.scrollLeft;clearTimeout(st);st=setTimeout(norm,160)}},{passive:true});
 el.querySelectorAll(".g[data-c] a,.g[data-c] button,.g[data-c] [tabindex]").forEach(x=>x.tabIndex=-1);
 if("IntersectionObserver"in window)new IntersectionObserver(es=>{vis=es[0].isIntersecting;start()},{threshold:0}).observe(el);else{vis=true;start()}}
const cirItem=(href,label,base,k,x)=>`<a class="cir" href="${href}" data-pk="${esc(k||"")}" data-ps="${esc(x||"")}" data-pb="${base}"><span class="cm"><b aria-hidden="true">${esc((label.trim()[0]||""))}</b><img alt="" decoding="async"></span><em>${esc(label)}</em></a>`;
/* Round collection photos: use the collection's own photo if it exists, otherwise pick the photos of the products listed below it, automatically. */
const _pr=(u,t)=>new Promise(r=>{const i=new Image(),T=setTimeout(()=>r(null),t||6000);i.onload=()=>{clearTimeout(T);r(u)};i.onerror=()=>{clearTimeout(T);r(null)};i.src=u});
const _pc={};
function circlePics(k,x,base){const key=k+"|"+x;if(_pc[key])return _pc[key];
 return _pc[key]=(async()=>{const out=[];
  try{const b=await E.dget("m:"+base.replace("assets/",""));if(b&&b.type.startsWith("image"))out.push(URL.createObjectURL(b))}catch(e){}
  if(!out.length)for(const e of ["jpg","jpeg","png","webp"]){const u=await _pr(base+"."+e);if(u){out.push(u);break}}
  const L=S.products.filter(p=>p.on&&p.cat==k&&p.sub==x);
  for(const p of L){if(out.length>=5)break;const f=p.imgs&&p.imgs[0];
   if(f&&f.startsWith("idb:")){try{const b=await E.dget("p:"+f.slice(4));if(b)out.push(URL.createObjectURL(b))}catch(e){}}
   else if(f){const u=await _pr(f);if(u)out.push(u)}
   else for(const e of ["jpg","jpeg","png","webp"]){const u=await _pr(IMG+p.cat+"/"+p.id+"."+e);if(u){out.push(u);break}}}
  return out})()}
/* one photo per product (its first photo), shared by the menu, the review cards and the reviews panel */
const _pp={};
function prodPic(p){return _pp[p.id]||(_pp[p.id]=(async()=>{const f=p.imgs&&p.imgs[0];
 if(f&&f.startsWith("idb:")){try{const b=await E.dget("p:"+f.slice(4));return b?URL.createObjectURL(b):null}catch(e){return null}}
 if(f)return _pr(f);
 for(const e of ["jpg","jpeg","png","webp"]){const u=await _pr(IMG+p.cat+"/"+p.id+"."+e);if(u)return u}return null})())}
let _rp=null;
const reviewPool=()=>_rp||(_rp=(async()=>{const on=S.products.filter(p=>p.on),step=Math.max(1,Math.floor(on.length/30)),L=on.filter((p,i)=>i%step==0).slice(0,30),out=[];
 const us=await Promise.all(L.map(prodPic));us.forEach((u,i)=>{if(u)out.push({u,n:L[i].name})});return out})());
async function reviewPhoto(i){const r=S.reviews[i];if(!r)return null;
 if(r.img){if(r.img.startsWith("idb:")){try{const b=await E.dget("p:"+r.img.slice(4));if(b)return{u:URL.createObjectURL(b)}}catch(e){}}else return{u:r.img}}
 const P=await reviewPool();return P.length?P[(i*7+3)%P.length]:null}
function fillReviewPics(root){root.querySelectorAll(".rph[data-ri]:not([data-pd])").forEach(el=>{el.dataset.pd=1;reviewPhoto(+el.dataset.ri).then(o=>{if(o){el.innerHTML='<img alt="" loading="lazy" decoding="async">';const im=el.firstChild;im.onload=()=>el.classList.add("ok");im.src=o.u;if(o.n){const f=el.closest("figure"),cp=f&&f.querySelector(".rcp");if(cp)cp.textContent=o.n}}else{el.classList.add("av");const r=S.reviews[+el.dataset.ri];el.textContent=((r&&r.n||"?").trim()[0]||"?").toUpperCase()}})})}
window.ELX={prodPic,reviewPhoto,fillReviewPics,reviewPool};
function fillCircles(root){root.querySelectorAll(".cir[data-pk]:not([data-pd])").forEach(a=>{a.dataset.pd=1;const im=a.querySelector("img");if(!im)return;
 circlePics(a.dataset.pk,a.dataset.ps,a.dataset.pb).then(L=>{if(!L.length)return;let i=0;im.src=L[0];im.classList.add("ok");
  if(L.length>1&&!RM){const step=()=>{if(!a.isConnected)return;i=(i+1)%L.length;im.classList.remove("ok");setTimeout(()=>{im.src=L[i];im.classList.add("ok")},350)};setTimeout(()=>{if(!a.isConnected)return;const t=setInterval(()=>{if(!a.isConnected)return clearInterval(t);step()},3200+Math.random()*1800);step()},800+Math.random()*2500)}})})}
const saleTiers=()=>[...new Set(S.products.filter(p=>p.on&&p.cat=="sale").map(p=>E.pct(p)).filter(x=>x>0))].sort((a,b)=>b-a).slice(0,8);
const pctCir=n=>`<a class="cir pc" href="#/sale/flat-${n}" aria-label="Flat ${n} percent off"><span class="cm"><span class="fl"><small>FLAT</small><strong>${n}<sup>%</sup></strong><small>OFF</small></span></span></a>`;
const cstrip=k=>{const c=C[k],items=[];if(k=="sale")saleTiers().forEach(n=>items.push(pctCir(n)));c.subs.forEach(x=>items.push(cirItem(`#/${k}/${sl(x)}`,x,IMG+"sub/"+k+"-"+sl(x),k,x)));
 const html=fillTo(items,Math.ceil(Math.max(innerWidth,1280)*2.4/150)).join("");
 return `<section class="cst" aria-label="${esc(c.t)} collections"><h2>${esc(c.t)}</h2><div class="cmq" data-auto data-pps="42">${triple(html)}</div></section>`};
const hwo=()=>`<div class="hwo" role="note"><span>Sale</span><b>Flat discounts on bags, shoes, gifts, toys and more. While stock lasts.</b></div>`;
const tierChips=cur=>{const T=saleTiers();return T.length?`<div class="chips tiers" aria-label="Filter by discount"><a href="#/sale" ${!cur?'aria-current="page"':""}>All sale</a>${T.map(n=>`<a href="#/sale/flat-${n}" ${cur==n?'aria-current="page"':""}>Flat ${n}% off</a>`).join("")}</div>`:""};
const catBan=k=>{const c=C[k],T=E.T(k),L=S.products.filter(p=>p.on&&p.cat==k).slice(0,8);
 return `<section class="rv cband" aria-label="${esc(c.t)}"><a class="cbn" href="#/${k}" aria-label="Shop ${esc(c.t)}">${vid(VID+"hero-"+k,"hm")}<span class="cbt"><em class="eb">ELIN · ${esc(c.t)}</em><b>${esc(T.h)} <i>${esc(T.em)}</i></b><u>Shop ${esc(c.t)} →</u></span></a><div class="grid hgrid">${L.map(p=>card(p,1)).join("")}</div><p class="cmore"><a class="btn o" href="#/${k}">View all ${esc(c.t)}</a></p></section>`};
function page(k){
 const c=C[k],T=E.T(k),all=S.products.filter(p=>p.cat==k&&p.on),list=all.slice();
 if(sortBy=="lo")list.sort((a,b)=>E.eff(a)-E.eff(b));if(sortBy=="hi")list.sort((a,b)=>E.eff(b)-E.eff(a));
 const sale=S.sale.on&&(S.sale.scope=="all"||S.sale.scope==k)?`<div class="salebar">${esc(S.sale.label)}: ${S.sale.pct}% off on ${S.sale.scope=="all"?"everything":esc(c.t)}</div>`:"";
 return (k=="sale"?hwo():"")+hero(k,c.v,T,`<a class="btn" href="#shop" onclick="document.getElementById('shop').scrollIntoView();return false">Shop ${list.length} items</a>`,"ELIN · "+c.t)+cstrip(k)+sale+
 `<div class="pts rv">${c.pts.map(p=>`<div><h2>${p[0]}</h2><p>${p[1]}</p></div>`).join("")}</div>`+
 `<section class="rv"><div class="sh"><h2>Shop by <em>collection</em></h2><p>${c.subs.length} collections. Tap one to see only those items.</p></div><div class="cols">${c.subs.map(s=>`<a href="#/${k}/${sl(s)}">${img(IMG+"sub/"+k+"-"+sl(s),"","Add photo:<br>sub/"+k+"-"+sl(s)+".jpg")}<h3>${s}</h3><span>${all.filter(p=>sl(p.sub)==sl(s)).length} items</span></a>`).join("")}</div></section>`+
 `<section id="shop"><div class="sh"><h2>All ${c.t}</h2>${k=="sale"?tierChips(0):""}<label class="srt">Sort <select id="srt"><option value="">Featured</option><option value="lo" ${sortBy=="lo"?"selected":""}>Price: low to high</option><option value="hi" ${sortBy=="hi"?"selected":""}>Price: high to low</option></select></label></div><div class="grid">${list.map(card).join("")||"<p>No items here yet.</p>"}</div></section>`+
 recentSec()+tiles(k,c.tiles,"See it in <em>motion</em>","Short videos from the "+c.t)+revs(k);
}
function saleFlat(n){const c=C.sale,list=S.products.filter(p=>p.cat=="sale"&&p.on&&E.pct(p)==n);
 return `<nav class="crumb" aria-label="Breadcrumb"><a href="#/">Home</a> / <a href="#/sale">${c.t}</a> / <b>Flat ${n}% off</b></nav>`+cstrip("sale")+hwo()+`<section id="shop"><div class="sh"><h1 style="font:400 clamp(26px,3.4vw,40px) var(--hf)">Flat <em>${n}% off</em></h1>${tierChips(n)}</div><div class="grid">${list.map(card).join("")||"<p>No items at this discount right now.</p>"}</div></section>`+recentSec()+revs("sale")}
function subPage(k,sub){
 const c=C[k],i=c.subs.findIndex(s=>sl(s)==sub);if(i<0)return page(k);
 const name=c.subs[i],T=E.TS(k,sub),list=S.products.filter(p=>p.cat==k&&p.on&&sl(p.sub)==sub);
 if(sortBy=="lo")list.sort((a,b)=>E.eff(a)-E.eff(b));if(sortBy=="hi")list.sort((a,b)=>E.eff(b)-E.eff(a));
 const sale=S.sale.on&&(S.sale.scope=="all"||S.sale.scope==k)?`<div class="salebar">${esc(S.sale.label)}: ${S.sale.pct}% off</div>`:"";
 return `<nav class="crumb" aria-label="Breadcrumb"><a href="#/">Home</a> / <a href="#/${k}">${c.t}</a> / <b>${esc(name)}</b></nav>`+(k=="sale"?hwo():"")+
 `<section class="hero h-full mini v${i%3}"><div class="ht"><p class="eb">${c.t}</p><h1>${esc(T.h)} <em>${esc(T.em)}</em></h1><p class="sub">${esc(T.s)}</p></div>${vid(VID+"sub-"+k+"-"+sub,"hm")}</section>`+cstrip(k)+sale+
 `<section id="shop"><div class="sh"><h2>${list.length} <em>${list.length==1?"item":"items"}</em></h2><label class="srt">Sort <select id="srt"><option value="">Featured</option><option value="lo" ${sortBy=="lo"?"selected":""}>Price: low to high</option><option value="hi" ${sortBy=="hi"?"selected":""}>Price: high to low</option></select></label></div><div class="grid">${list.map(card).join("")||"<p>No items in this collection yet.</p>"}</div></section>`+
 `<section class="rv"><div class="sh"><h2>More <em>collections</em></h2><p>${c.t}</p></div><div class="chips">${c.subs.filter(s=>s!=name).map(s=>`<a href="#/${k}/${sl(s)}">${s}</a>`).join("")}</div></section>`+recentSec()+revs(k);
}
const hpn=[["hero-home-2","Footwear","#/footwear"],["hero-home","Handbags","#/bags"],["hero-home-3","Gifts","#/gifts"]];
const banA=()=>{const T=E.T("ban-a");return `<section class="fb fa">${img(IMG+"home/banner-mid","hm")}<div class="fbt l"><h2>${esc(T.h)} <em>${esc(T.em)}</em></h2><p>${esc(T.s)}</p><a class="btn" href="#/bags">Shop handbags</a></div></section>`};
const banEnd=()=>{const T=E.T("ban-c");return `<div class="fbs"><section class="fb fb2">${img(IMG+"home/banner-end-1","hm")}</section><section class="fb fb3">${img(IMG+"home/banner-end-2","hm")}<div class="fbt c"><h2>${esc(T.h)}</h2><p>${esc(T.s)}</p><a class="btn o" href="#/bags">SHOP NOW</a></div></section></div>`};
const HSD="assets/hero-slides/";
const HSL=[["slide-1","vid",[["Shop the collection","#/bags"],["Bundle offers","#/bundles"]]],["slide-2","img",[["Shop gifts","#/gifts"],["Gifts by occasion","#/gifts/gifts-by-occasion"]]],["slide-3","img",[["Shop new arrivals","#/bags"],["See the sale","#/sale"]]]];
const homeHero=T=>`<section class="cine" data-hero data-s="0" aria-roledescription="carousel" aria-label="Welcome"><div class="hsls" aria-live="off">${HSL.map((x,i)=>{const t=i?E.T("hs"+(i+1)):T,m=x[1]=="vid"?vid(HSD+x[0],"cvv","","videos/hero-home-wide").replace("<video ",`<video poster="${HSD+x[0]}.jpg" autoplay `):img(HSD+x[0],"cvi","Hero photo:<br>"+HSD+x[0]+".jpg",["","images/home/hero-slide-2","images/home/hero-bg"][i]);
 return `<div class="hsl${i?"":" on"}" data-i="${i}" role="group" aria-roledescription="slide" aria-label="Slide ${i+1} of ${HSL.length}"><div class="cv">${m}</div><div class="cc"><p class="eb"><i></i>${esc(t.eb||"ELIN")}<i></i></p><h1>${esc(t.h)} <em>${esc(t.em)}</em></h1><span class="orn" aria-hidden="true"><i></i><b></b><i></i></span><p class="sub">${esc(t.s)}</p><div class="cta"><a class="btn" href="${x[2][0][1]}">${x[2][0][0]}</a><a class="btn o" href="${x[2][1][1]}">${x[2][1][0]}</a></div>${i?"":`<ul class="trust"><li>Express delivery</li><li>${esc(cfg.payments||"Cash on delivery")}</li><li>WhatsApp support</li></ul>`}</div></div>`}).join("")}</div><button class="hav l" data-hs="-1" aria-label="Previous slide">‹</button><button class="hav r" data-hs="1" aria-label="Next slide">›</button><div class="hdots" role="tablist" aria-label="Choose slide">${HSL.map((x,i)=>`<button role="tab" class="${i?"":"on"}" data-hg="${i}" aria-label="Slide ${i+1}" aria-selected="${!i}"></button>`).join("")}</div><button class="cmute" data-un aria-label="Toggle sound">${SND}</button><button class="cscr" data-scroll="cats" aria-label="Scroll down"><span>Scroll</span><i></i></button><span class="cfr" aria-hidden="true"></span><div class="cstrip">${["bags","footwear","gifts","toys"].map((k,i)=>`<a href="#/${k}"><em>${pad(i+1)}</em><b>${C[k].t}</b><span>${S.products.filter(p=>p.cat==k&&p.on).length} items</span><u aria-hidden="true">→</u></a>`).join("")}</div></section>`;
const spotlight=()=>`<section class="rv spot"><div class="sh"><h2>The ELIN <em>edit</em></h2><p>Three looks we love right now.</p></div><div class="hpan">${hpn.map((x,i)=>`<figure class="hp p${i}">${vid(VID+x[0],"hm")}<button class="snd" data-un aria-label="Toggle sound">${SND}</button><figcaption><em class="nm">${pad(i+1)}</em><a href="${x[2]}"><b>${x[1]}</b><span>Shop now</span></a></figcaption></figure>`).join("")}</div></section>`;
const recentSec=()=>{const L=E.recent.map(id=>E.prod(id)).filter(p=>p&&p.on);return L.length?`<section class="rv" style="padding-top:0"><div class="sh"><h2>Recently <em>viewed</em></h2></div>${car(L)}</section>`:""};
/* New arrivals / Best sellers: one row of products shows, then slides to the next row, and so on (back to the start at the end) */
function pager(el){if(el._pg||RM)return;el._pg=1;let hold=0,vis=false;
 const step=()=>{if(!el.isConnected)return clearInterval(tm);if(!vis||performance.now()<hold)return;const c=el.children[0];if(!c)return;
  const gap=parseFloat(getComputedStyle(el).columnGap)||18,w=c.offsetWidth+gap,n=Math.max(1,Math.floor((el.clientWidth+gap)/w)),max=el.scrollWidth-el.clientWidth;
  if(max<=4)return;if(el.scrollLeft>=max-4)el.scrollTo({left:0,behavior:"smooth"});else el.scrollTo({left:Math.min(max,Math.round(el.scrollLeft/w)*w+n*w),behavior:"smooth"})};
 const tm=setInterval(step,3600);
 el._pause=ms=>{hold=performance.now()+(ms||0)};
 el.addEventListener("pointerenter",e=>{if(e.pointerType=="mouse")hold=Infinity});el.addEventListener("pointerleave",e=>{if(e.pointerType=="mouse")hold=performance.now()+1200});
 el.addEventListener("touchstart",()=>{hold=performance.now()+7000},{passive:true});el.addEventListener("focusin",()=>{hold=Infinity});el.addEventListener("focusout",()=>{hold=performance.now()+1200});
 if("IntersectionObserver"in window)new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(el);else vis=true}
const car=(list,auto)=>{const h=list.map(p=>card(p,1)).join("");return `<div class="car"><button class="cb l" data-cs="-1" aria-label="Previous">‹</button><div class="ct"${auto?" data-page":""}>${h}</div><button class="cb r" data-cs="1" aria-label="Next">›</button></div>`};
const pick=flag=>{const on=S.products.filter(p=>p.on);let L=on.filter(p=>p[flag]);if(!L.length)L=on.filter((p,i)=>i%9==(flag=="new"?0:4));const by={};L.forEach(p=>(by[p.cat]=by[p.cat]||[]).push(p));const out=[];for(let i=0;out.length<L.length&&i<60;i++)Object.keys(by).forEach(k=>by[k][i]&&out.push(by[k][i]));return out.slice(0,14)};
const reels=(k,list,title,sub)=>`<section class="rv rvfull"><div class="sh"><h2>${title}</h2><p>${sub}</p></div><div class="car"><button class="cb l" data-cs="-1" aria-label="Previous">‹</button><div class="ct reels">${list.map((t,i)=>{const a=Array.isArray(t)?t:[t,""];return `<div class="vt" tabindex="0" role="button" aria-label="Play video with sound: ${esc(a[0])}">${vid(VID+k+"-tile-"+(i+1))}<span class="snd" aria-hidden="true">${SND}</span><div class="cp"><em class="nm">${pad(i+1)}</em><b>${a[0]}</b><span>${a[1]}</span></div></div>`}).join("")}</div><button class="cb r" data-cs="1" aria-label="Next">›</button></div></section>`;
const colour=()=>`<section class="rv"><div class="sh"><h2>Choose your <em>style</em></h2><p>Two looks we love this season.</p></div><div class="pair">${[["Classic & timeless","#/bags"],["Bold & modern","#/footwear"]].map((x,i)=>`<a href="${x[1]}">${img(IMG+"home/colour-"+(i+1))}<span>${x[0]}<small>View collection →</small></span></a>`).join("")}</div></section>`;
const featStrip=()=>`<section class="feat"><div><b>Express delivery</b><span>Delivered right to your doorstep</span></div><div><b>Customer service</b><span>Available via WhatsApp on ${esc(cfg.phone)}</span></div><div><b>Payment methods</b><span>${esc(cfg.payments||"Cash on delivery")}</span></div></section>`;
const wc=()=>{const n=E.wish.length,b=$("#wc");b.textContent=n;b.style.display=n?"grid":"none"};
function updHdr(){const u=E.getUser(),b=$("#ab");if(!b.dataset.svg)b.dataset.svg=b.innerHTML;b.innerHTML=u?`<span class="av">${esc((u.name||u.email||"?")[0].toUpperCase())}</span>`:b.dataset.svg;b.setAttribute("aria-label",u?"Your account: "+u.name:"Sign in")}
const FBI=`<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/></svg>`;
const authHTML=()=>{const P=E.providers();return P.g||P.f?`<div class="authb">${P.g?'<div class="gb"></div>':""}${P.f?`<button type="button" class="fbbtn">${FBI}<span>Continue with Facebook</span></button>`:""}</div>`:`<p class="hint2">Quick sign-in (the store owner has not switched on Google or Facebook sign-in yet).</p><form id="af"><input name="name" placeholder="Your name" required aria-label="Your name" autocomplete="name"><input name="email" type="email" placeholder="Email address" required aria-label="Email address" autocomplete="email"><input name="phone" type="tel" placeholder="Phone (optional)" aria-label="Phone number" autocomplete="tel"><button class="btn" type="submit">Continue</button></form>`};
const login=()=>`<h2>Welcome to <em>ELIN</em></h2><p class="hint2">Sign in with Google or Facebook to place orders, save your wishlist and see your order history.</p>${authHTML()}<p class="hint2">We only use your details to prepare and deliver your orders.</p>`;
const welcome=u=>{E.setUser(u);updHdr();E.toast("Welcome, "+(u.name||u.email))};
const profile=u=>{const O=E.orders().filter(o=>(o.cemail||o.email)==(u.uid||u.email));return `<div class="prof"><span class="av big">${u.picture?`<img src="${esc(u.picture)}" alt="" referrerpolicy="no-referrer">`:esc((u.name||"?")[0].toUpperCase())}</span><div><h2>${esc(u.name)}</h2><p class="hint2">${esc(u.email||"Signed in with Facebook")} · ${esc(u.via||"")}</p></div></div><div class="acts"><button class="btn o" data-openwish>My wishlist (${E.wish.length})</button><button class="btn o" data-so>Sign out</button></div><h3 class="oh">My orders</h3>${O.length?O.slice(0,10).map(o=>`<div class="ord"><b>${esc(o.id)}</b> · ${new Date(o.time).toLocaleDateString()} · ${money(o.total)}<small>${esc(o.items)}</small></div>`).join(""):`<p class="hint2">No orders yet. Orders you place on this device appear here.</p>`}`};
function openAccount(){const u=E.getUser();$("#md").innerHTML=`<div class="mbox sbox acc" role="dialog" aria-modal="true" aria-label="Your account"><button class="mx" data-close aria-label="Close">×</button><div class="sp">${u?profile(u):login()}</div></div>`;show("md");if(!u)E.authInit($("#md .sp"),x=>{welcome(x);closeAll();if(location.hash=="#/checkout"){ckv._init=0;route(true)}})}
function openWish(){const L=E.wish.map(id=>E.prod(id)).filter(p=>p&&p.on);$("#md").innerHTML=`<div class="mbox sbox" role="dialog" aria-modal="true" aria-label="Wishlist"><button class="mx" data-close aria-label="Close">×</button><div class="sp"><h2>My <em>wishlist</em></h2>${L.length?`<div class="grid sg">${L.map(p=>card(p,1)).join("")}</div>`:`<p class="hint2">Tap the heart on any product to save it here.</p>`}</div></div>`;show("md");E.hydrate($("#md"))}
/* search: big box, a moving strip of products from every category, and live suggestions under whatever is typed */
const SQ_MIN=1;
const hl=(t,q)=>{const i=q?t.toLowerCase().indexOf(q):-1;return i<0?esc(t):esc(t.slice(0,i))+"<mark>"+esc(t.slice(i,i+q.length))+"</mark>"+esc(t.slice(i+q.length))};
const sTok=q=>q.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
const sHay=p=>(p.name+" "+p.sub+" "+C[p.cat].t+" "+(p.badge||"")).toLowerCase();
const sFind=q=>{const T=sTok(q);if(!T.length)return[];return S.products.filter(p=>p.on).map(p=>{const h=sHay(p),n=p.name.toLowerCase();if(!T.every(t=>h.includes(t)))return null;let sc=0;T.forEach(t=>{if(n.startsWith(t))sc+=4;else if(n.split(/\s+/).some(w=>w.startsWith(t)))sc+=3;else if(n.includes(t))sc+=2;else sc+=1});return{p,sc}}).filter(Boolean).sort((a,b)=>b.sc-a.sc).map(x=>x.p)};
function searchStrip(){const cats=Object.keys(C),per=5,cols=cats.map(k=>S.products.filter(p=>p.on&&p.cat==k).slice(0,per)),L=[];for(let i=0;i<per;i++)cols.forEach(c=>{if(c[i])L.push(c[i])});if(!L.length)return"";
 const it=L.map(p=>`<button class="smi" data-open="${p.id}" tabindex="-1" aria-label="${esc(p.name)}"><span class="slot th"><span class="gal">${E.slides(p)}</span></span><b>${esc(p.name)}</b><small>${esc(C[p.cat].t)} · ${money(E.eff(p))}</small></button>`).join("");
 return `<div class="smq" aria-label="Products from every category"><div class="smt">${it}${it}</div></div>`}
function openSearch(){$("#md").innerHTML=`<div class="mbox sbox sbig" role="dialog" aria-modal="true" aria-label="Search"><button class="mx" data-close aria-label="Close">×</button><div class="sp"><p class="eb sbe">Search ELIN</p><div class="sfield"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="sq" type="search" placeholder="${innerWidth<600?"Search ELIN...":"Search bags, shoes, hair clips, gifts, toys..."}" aria-label="Search products" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="ssg"></div><div id="ssg" class="ssg" role="listbox" hidden></div><div id="sidle"><div class="schips">${Object.keys(C).map(k=>`<button type="button" class="schip" data-sqs="${esc(C[k].t)}">${esc(C[k].t)}</button>`).join("")}</div>${searchStrip()}</div><div id="sr" class="grid sg"></div></div></div>`;show("md");E.hydrate($("#md"));$("#sq").focus()}
function searchUpdate(raw){const q=raw.trim().toLowerCase(),box=$("#ssg"),res=$("#sr"),idle=$("#sidle"),inp=$("#sq");if(!box)return;
 if(q.length<SQ_MIN){box.hidden=true;box.innerHTML="";res.innerHTML="";idle.hidden=false;inp.setAttribute("aria-expanded","false");return}
 idle.hidden=true;const T=sTok(q),L=sFind(q),rows=[];
 Object.keys(C).forEach(k=>{if(T.length&&T.every(t=>C[k].t.toLowerCase().includes(t)))rows.push(`<a class="sgi" role="option" href="#/${k}" data-close><span class="sgt">Category</span><span>${hl(C[k].t,q)}</span></a>`);C[k].subs.forEach(sb=>{if(T.every(t=>sb.toLowerCase().includes(t)))rows.push(`<a class="sgi" role="option" href="#/${k}/${sl(sb)}" data-close><span class="sgt">Collection</span><span>${hl(sb,q)} <small>in ${esc(C[k].t)}</small></span></a>`)})});
 const cr=rows.slice(0,5);L.slice(0,6).forEach(p=>cr.push(`<button type="button" class="sgi" role="option" data-sqs="${esc(p.name)}"><span class="sgt">Product</span><span>${hl(p.name,q)} <small>${esc(C[p.cat].t)} · ${money(E.eff(p))}</small></span></button>`));
 box.innerHTML=cr.join("");box.hidden=!cr.length;inp.setAttribute("aria-expanded",String(!!cr.length));
 res.innerHTML=L.length?`<p class="scount">${L.length} result${L.length>1?"s":""} for “${esc(raw.trim())}”</p>`+L.slice(0,24).map(p=>card(p,1)).join(""):`<p class="scount">No products found for “${esc(raw.trim())}”. Try a shorter word such as <b>bag</b>, <b>clip</b> or <b>gift</b>.</p>`;E.hydrate(res)}


/* slideshow (story + gallery cards): up to n photos, crossfade, dots */
const shw=(base,n,cls,ms)=>`<div class="slot shw ${cls||""}" style="--ms:${ms||5200}ms" data-shw data-ms="${ms||5200}" ${cls=="storyshw"?"data-swipe":""}><i>Add photo:<br>${base}.jpg</i><div class="sws">${Array.from({length:n},(_,i)=>{const b=i?base+"-"+(i+1):base;return `<div class="sw ${i?"":"on"}" data-mk="${b.replace("assets/","")}"><img alt="" ${i?'loading="lazy" ':""}src="${b}.jpg" data-b="${b}" data-x="jpg,jpeg,png,webp" decoding="async" onerror="nx(this)" onload="this.classList.add('ok')"></div>`}).join("")}</div><div class="dots" aria-hidden="true"></div><div class="cnt" aria-hidden="true"></div><div class="prog" aria-hidden="true"><i></i></div><button class="swa l" data-sw="-1" aria-label="Previous photo">‹</button><button class="swa r" data-sw="1" aria-label="Next photo">›</button></div>`;
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
function initShows(root){
 root.querySelectorAll("[data-shw]").forEach(el=>{
  if(el._sw)return;const st=el._sw={i:0,t:0,x:null},dots=el.querySelector(".dots");
  const live=()=>[...el.querySelectorAll(".sw")].filter(s=>{const i=s.querySelector("img");return i&&i.classList.contains("ok")});
  const go=n=>{const L=live();if(!L.length)return;st.i=(n+L.length)%L.length;el.querySelectorAll(".sw").forEach(s=>s.classList.remove("on"));L[st.i].classList.add("on");[...dots.children].forEach((d,j)=>d.classList.toggle("on",j==st.i));const c=el.querySelector(".cnt");if(c)c.textContent=pad(st.i+1)+" / "+pad(L.length);const pr=el.querySelector(".prog i");if(pr){pr.style.animation="none";void pr.offsetWidth;pr.style.animation=""}};
  const play=()=>{clearInterval(st.t);if(live().length>1&&!RM)st.t=setInterval(()=>{if(!el.isConnected){clearInterval(st.t);return}if(!document.hidden)go(st.i+1)},+el.dataset.ms||5200)};
  const ref=()=>{const L=live();dots.innerHTML=L.length>1?L.map(()=>"<b></b>").join(""):"";el.classList.toggle("multi",L.length>1);go(Math.min(st.i,Math.max(0,L.length-1)));play()};
  el.addEventListener("load",ref,true);
  el.addEventListener("mouseenter",()=>clearInterval(st.t));el.addEventListener("mouseleave",play);
  el.addEventListener("click",e=>{const b=e.target.closest("[data-sw]");if(!b)return;e.preventDefault();e.stopPropagation();go(st.i+ +b.dataset.sw);play()});
  if(el.dataset.swipe!=null){el.addEventListener("pointerdown",e=>{st.x=e.clientX});el.addEventListener("pointerup",e=>{if(st.x==null)return;const d=e.clientX-st.x;st.x=null;if(Math.abs(d)>40){go(st.i+(d<0?1:-1));play()}})}
  setTimeout(ref,350);setTimeout(ref,1500);ref();
 })}
/* videos load and play only when near the screen */
const vio="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(x=>{const v=x.target;if(x.isIntersecting){if(!v.dataset.ld){v.dataset.ld=1;v.preload="auto";v.load()}const r=v.play();if(r&&r.catch)r.catch(()=>{})}else v.pause()}),{rootMargin:"250px"}):null;
function lazyVid(root){root.querySelectorAll("video:not([data-lz])").forEach(v=>{v.dataset.lz=1;if(!vio){v.autoplay=true;v.preload="auto";return}vio.observe(v)})}
/* theme fonts load only on the pages that use them */
const FX={bags:"Cormorant+Garamond:ital,wght@0,500;1,500;1,600",toys:"Fredoka:wght@500;600",stationery:"Caveat:wght@600",footwear:"Abril+Fatface",sale:"Bebas+Neue"},fl={};
function themeFont(k){if(!FX[k]||fl[k])return;fl[k]=1;const l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family="+FX[k]+"&display=swap";document.head.appendChild(l)}
/* premium trust stats + delivery network */
const TRUST=[["trophy","7","","Years experience"],["box","40","K+","Orders delivered"],["users","1500","+","Trusted clients"],["shield","200","+","Wholesale partners"]];
const TI={trophy:'<path d="M8 4h8v5a4 4 0 01-8 0V4z"/><path d="M8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4M12 13v4M9 20h6M10 17h4"/>',box:'<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5v-9z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>',users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><path d="M16 4.8a3.2 3.2 0 010 6.2M18 14.8c1.8.7 3 2.3 3 5.2"/>',shield:'<path d="M12 3l7.5 3v5.5c0 4.5-3 8-7.5 9.5C7.5 19.5 4.5 16 4.5 11.5V6L12 3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'};
const trust=()=>`<section class="rv tnum" aria-label="ELIN in numbers"><p class="eb">ELIN in numbers</p><div class="tg">${TRUST.map(t=>`<div class="tc"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${TI[t[0]]}</svg><b><span data-n="${t[1]}">${t[1]}</span>${t[2]}</b><span class="tl">${t[3]}</span></div>`).join("")}</div></section>`;
/* Pakistan outline [lon,lat] and delivery cities: [name,lon,lat,label dx,dy,anchor] */
const PK=[[61.6,25.1],[61.7,26.2],[63.2,26.6],[63.2,27.2],[62.8,28.2],[61.7,28.8],[60.9,29.8],[62.5,29.4],[64.1,29.4],[65,29.1],[66.2,29.8],[66.4,30.9],[67.8,31.5],[69.3,31.9],[69.5,33],[70.1,33.2],[71.1,34.05],[71.6,35.2],[71.5,36],[72.6,36.9],[74.5,37],[74.9,37.2],[75.9,36.7],[77.8,35.5],[76,34.8],[74.5,34.7],[74,34],[74.2,33.3],[74.6,32.7],[74.3,32.1],[74.6,31.6],[74.9,31.3],[74.6,31],[73.9,30.3],[73.2,29.9],[72.9,29],[72.1,28.5],[70.9,28],[70.1,27.8],[70,26.6],[70.6,25.7],[69.6,25.1],[68.9,24.3],[68.2,23.7],[67.4,24],[67,24.8],[66.7,25.4],[65.5,25.3],[64.6,25.2],[63.5,25.3],[62.4,25.2]];
const HUB=["Islamabad hub",73.05,33.69];
const CIT=[["Peshawar",71.58,34.01,-9,-6,"end"],["Abbottabad",73.22,34.15,5,-10,"start"],["Sialkot",74.53,32.5,10,-4,"start"],["Gujranwala",74.19,32.16,10,5,"start"],["Lahore",74.35,31.55,10,5,"start"],["Sargodha",72.67,32.08,-10,-2,"end"],["Faisalabad",73.08,31.42,-10,6,"end"],["Multan",71.47,30.2,10,-3,"start"],["Bahawalpur",71.68,29.4,10,5,"start"],["Dera Ghazi Khan",70.64,30.06,-9,12,"end"],["Quetta",67,30.18,-10,4,"end"],["Sukkur",68.86,27.7,10,4,"start"],["Hyderabad",68.37,25.4,10,4,"start"],["Karachi",67,24.86,10,4,"start"]];
const pkMap=()=>{const K=33,pt=(o,a)=>[+((o-60.2)*Math.cos(30*Math.PI/180)*K+30).toFixed(1),+((37.4-a)*K+20).toFixed(1)],h=pt(HUB[1],HUB[2]),
 d="M"+PK.map(q=>pt(q[0],q[1]).join(",")).join("L")+"Z";
 const rt=CIT.map((c,i)=>{const p=pt(c[1],c[2]),mx=(h[0]+p[0])/2+(p[1]>h[1]?(i%2?18:-18):0),my=(h[1]+p[1])/2;return `<path class="rte" style="animation-delay:${(i*.18).toFixed(2)}s" d="M${h[0]},${h[1]}Q${mx},${my} ${p[0]},${p[1]}"/>`}).join("");
 const ct=CIT.map(c=>{const p=pt(c[1],c[2]);return `<g><circle class="cd" cx="${p[0]}" cy="${p[1]}" r="3.6"/><text class="cn" x="${p[0]+c[3]}" y="${p[1]+c[4]}" text-anchor="${c[5]}">${c[0]}</text></g>`}).join("");
 return `<svg class="pkm" viewBox="0 0 560 480" role="img" aria-label="Map of Pakistan with delivery routes from our Islamabad hub to major cities"><defs><linearGradient id="pkg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a2620"/><stop offset="1" stop-color="#14120f"/></linearGradient><pattern id="pkd" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".8" fill="#e8c566" opacity=".12"/></pattern></defs><rect width="560" height="480" fill="url(#pkd)"/><path class="pko" d="${d}" fill="url(#pkg)"/>${rt}${ct}<g><circle class="hp1" cx="${h[0]}" cy="${h[1]}" r="9"/><circle class="hp2" cx="${h[0]}" cy="${h[1]}" r="6"/><text class="hn" x="${h[0]+14}" y="${h[1]+4}">ISLAMABAD HUB</text></g></svg>`};
const network=()=>{const q=encodeURIComponent(cfg.address+", Pakistan");return `<section class="net rv" aria-label="Delivery network"><div class="nh"><p class="eb">Nationwide delivery</p><h2>Our Pakistan-Wide <em>Delivery Network</em></h2><p>Reaching every major city from our Islamabad hub</p></div><div class="nb"><div class="nmap">${pkMap()}</div><div class="nt"><h3>We Deliver What We Promise</h3><p>Every order is packed, tracked and shipped with the same commitment: no shortcuts, no excuses. If we say it will arrive, it arrives.</p><p>From the moment your order is confirmed it is checked for quality, packed securely and dispatched on schedule. Every parcel is followed from our hub all the way to your doorstep.</p><p>Our promise is not only about speed. It is about reliability, on the timelines and terms we commit to.</p><ul>${["On-time dispatch and reliable delivery","Secure packaging for every shipment","Real-time tracking from dispatch to destination","Dedicated customer support whenever you need it"].map(x=>`<li>${x}</li>`).join("")}</ul></div></div><div class="nl"><div><span>Our location</span><b>${esc(cfg.address)}, Pakistan</b></div><a class="btn" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener">Get directions →</a></div></section>`};
function home(){
 const st=D.story,T=E.T("home"),on=S.products.filter(p=>p.on),feat=["bags","footwear","gifts","toys"].flatMap(k=>on.filter(p=>p.cat==k).slice(0,2));
 return homeHero(T)+marq()+spotlight()+
 `<section class="rv"><div class="story"><div class="stx"><p class="eb">Our story</p><div class="sh" style="margin-bottom:12px"><h2>${st.title} <em>${st.em}</em></h2></div>${st.text.map(t=>`<p>${t}</p>`).join("")}<a class="btn" href="#/reseller">Become a reseller</a></div><div class="sfr">${shw(IMG+"home/story",4,"storyshw",5600)}<div class="sbadge"><b>ELIN</b><span>Timeless Beauty, Modern Style</span></div></div></div></section>`+
 `<section class="rv" id="cats" style="padding-top:0"><div class="sh"><h2>Shop the <em>galleries</em></h2><p>Seven worlds. Hundreds of finds.</p></div><div class="gcs">${Object.keys(C).map((k,i)=>`<a class="gc" href="#/${k}" aria-label="${C[k].t}"><div class="gm">${shw(IMG+"home/cat-"+k,3,"",4400+i*470)}</div><div class="gi"><em>${pad(i+1)}</em><h3>${C[k].t}</h3><span>${C[k].subs.length} collections</span><u>Explore <b aria-hidden="true">→</b></u></div></a>`).join("")}</div></section>`+
 `<section class="rv" style="padding-top:0"><div class="sh"><h2>New <em>arrivals</em></h2><a class="btn o" href="#/bags">View all</a></div>${car(pick("new"),1)}</section>`+bundles()+
 `<section class="rv" style="padding-top:0"><div class="sh"><h2>Best <em>sellers</em></h2><a class="btn o" href="#/sale">View all</a></div>${car(pick("best"),1)}</section>`+catBan("bags")+catBan("footwear")+
 recentSec()+reels("home",D.homeTiles,"Watch &amp; <em>shop</em>","Tap any video to hear the sound.")+colour()+
 trust()+network()+ben()+
 `<section class="rv" style="padding:0"><div class="band">${img(IMG+"home/reseller")}<div class="t"><p class="eb">Wholesale &amp; Bulk Orders</p><h2>Your Business. Our <em>Products.</em></h2><p>Source quality products in bulk for your shop, online store or distribution network.</p><a class="btn" href="#/reseller">Apply for Wholesale</a></div></div></section>`+revs("home")+
 `<section class="rv loop"><div class="lbg">${img(IMG+"home/newsletter-bg","hm","Background photo:<br>"+IMG+"home/newsletter-bg.jpg")}</div><div class="lin"><div class="sh"><h2>Stay in the <em>loop</em></h2><p>New arrivals and insider-only discounts.</p></div><form class="news" id="nf"><input type="email" name="e" placeholder="Your email" required aria-label="Email"><button class="btn" type="submit">Subscribe</button></form></div></section>`+banEnd();
}
function bundlesPage(){return `<section class="hero h-full mini v1 bun-hero"><div class="ht"><p class="eb">Save more</p><h1>Bundle <em>offers</em></h1><p class="sub">Mix and match. Buy more, pay less.</p></div><div class="bhs" aria-hidden="true">${["banner-mid","banner-end-1","banner-end-2"].map(n=>img(IMG+"home/"+n,"hm")).join("")}</div></section><section class="rv" style="padding-bottom:0"><div class="sh" style="display:none"></div><p class="sub" style="margin-top:0">Choose a pack and build it below; the saving applies to the items in your pack only. Bundle offers cover Bags, Hair Accessories, Gifts, Toys and Stationery at regular price; Footwear and Sale items are not included.</p></section>`+(bundles()||`<section><p>No bundle offers right now. Check back soon.</p></section>`)+ben()}
function reseller(){
 return WS.render(vid(VID+"hero-reseller","hm"))+tiles("reseller",["Why partner with ELIN","Packing and delivery","Bulk order showcase"],"See how it <em>works</em>","Short videos for wholesale partners")+revs("reseller");
}

/* when Finalize / Send is pressed and a required box is empty, scroll to it, mark it red and say which one (the tiny browser bubble was easy to miss) */
function watchInvalid(f,say){let busy=0;f.addEventListener("invalid",ev=>{const el=ev.target;if(busy)return;busy=1;setTimeout(()=>busy=0,80);
 const lb=el.closest("label"),nm=lb?((lb.querySelector("span")&&lb.querySelector("span").textContent.trim())||lb.textContent.trim()):(el.name||"this field");
 if(lb){lb.classList.add("bad");const un=()=>{lb.classList.remove("bad");el.removeEventListener("input",un);el.removeEventListener("change",un)};el.addEventListener("input",un);el.addEventListener("change",un)}
 try{el.scrollIntoView({block:"center",behavior:"smooth"})}catch(x){}
 say(el.type=="checkbox"?"Please tick the box: "+nm.trim():"Please check: "+nm.trim()+(el.validationMessage?" ("+el.validationMessage+")":""))},true)}
/* ===== checkout page ===== */
let lastOrder=null;
const PROV=["Punjab","Sindh","Khyber Pakhtunkhwa","Balochistan","Islamabad Capital Territory","Azad Jammu & Kashmir","Gilgit-Baltistan"];
const PAYS={cod:"Cash on Delivery (COD)",bank:"Bank Deposit",card:"Debit / Credit Card"};
const shipSaved=()=>{try{return JSON.parse(localStorage.getItem("elin_ship")||"null")||{}}catch(e){return{}}};
const readCo=()=>{const f=$("#co");if(f){const d=Object.fromEntries(new FormData(f));["news","save","terms"].forEach(k=>d[k]=d[k]?"on":"");Object.assign(ckv,d)}const c=$("#cpi2");if(c)coupon=c.value};
const cfl=(n,l,o={})=>`<label class="fl${o.cls?" "+o.cls:""}"><span>${l}${o.req?"":" (optional)"}</span><input name="${n}" type="${o.t||"text"}" autocomplete="${o.ac||"off"}"${o.req?" required":""}${o.pat?` pattern="${o.pat}"`:""}${o.title?` title="${o.title}"`:""}${o.inp?` inputmode="${o.inp}"`:""} value="${esc(ckv[n]||"")}"></label>`;
const PHONE='^[+0-9][0-9 \\-]{8,16}$',PHT="Enter a valid phone number, for example 0300 1234567";
function checkoutPage(){
 const U=E.getUser(),r=E.calc(coupon);
 if(!r.lines.length)return lastOrder?confirmPage():`<section class="co empty"><h1>Checkout</h1><p>Your bag is empty.</p><a class="btn" href="#/bags">Start shopping</a></section>`;
 const sv=shipSaved();if(!ckv._init){ckv._init=1;const nm=(U&&U.name||"").split(" ");Object.assign(ckv,{first:sv.first||nm[0]||"",last:sv.last||nm.slice(1).join(" "),email:(U&&U.email)||sv.email||"",address:sv.address||"",apt:sv.apt||"",city:sv.city||"",province:sv.province||"",postal:sv.postal||"",phone:sv.phone||(U&&U.phone)||"",pay:"cod",bill:"same",save:sv.first?"on":""})}
 const sum=`<details class="sumd cos-in"${innerWidth>900?" open":""}><summary>Order summary <b>${money(r.total)}</b></summary><div class="sumb"><ul class="cl">${r.lines.map(x=>`<li><div class="slot th"><div class="gal">${E.slides(x.p)}</div><span class="qb" aria-label="Quantity ${x.l.qty}">${x.l.qty}</span></div><div><b>${esc(x.p.name)}</b><small>${[x.l.size&&"Size "+x.l.size,x.l.color,x.l.bun&&((S.bundles.find(b=>b.id==x.l.bun)||{}).name)].filter(Boolean).map(esc).join(" · ")}</small></div><span class="lp">${money(x.line)}</span></li>`).join("")}</ul>
 <div class="cpn"><input id="cpi2" placeholder="Discount code" value="${esc(coupon)}" aria-label="Discount code"><button type="button" class="btn o" data-cpc>Apply</button></div>${r.cerr?`<p class="err" role="alert">${esc(r.cerr)}</p>`:""}
 <div class="sm"><div><span>Subtotal</span><span>${money(r.sub)}</span></div>${r.applied.map(a=>`<div class="g"><span>${esc(a.name)} ×${a.packs}</span><span>− ${money(a.d)}</span></div>`).join("")}${r.cd?`<div class="g"><span>Discount</span><span>− ${money(r.cd)}</span></div>`:""}<div><span>Shipping</span><span>${r.ship?money(r.ship):"Free"}</span></div><div class="tt"><span>Total</span><span><small>PKR</small> ${money(r.total)}</span></div></div>
 <button type="button" class="lnk" data-eb>Edit bag</button>
 <ul class="trustl"><li>Cash on delivery available</li><li>Easy exchange if the size or colour is wrong</li><li>Help on WhatsApp ${esc(cfg.phone)}</li></ul></div></details>`;
 if(!U)return `<section class="co"><div class="cof"><h1>Checkout</h1><div class="signin"><h2>Sign in to place your order</h2><p class="fs">Sign in with Google or Facebook. Your bag is saved while you sign in.</p>${authHTML()}</div></div><aside class="cos" aria-label="Order summary">${sum}</aside></section>`;
 const eta=cfg.shipEta||"Delivery in 3 to 5 working days",bank=cfg.bankInfo||"Our bank account details will be sent to you on WhatsApp right after you place the order.";
 const opt=(v,name,body)=>`<label class="opt pay${ckv.pay==v?" on":""}"><input type="radio" name="pay" value="${v}"${ckv.pay==v?" checked":""}><b>${name}</b><div class="pd">${body||""}</div></label>`;
 return `<section class="co"><div class="cof"><p class="ckcr">Bag <i>›</i> <b>Checkout</b> <i>›</i> Confirmation</p><h1>Checkout</h1>
 <form id="co" autocomplete="on">
 <div class="cs"><h2>Contact</h2><p class="who">Signed in as <b>${esc(U.name||U.email)}</b> (${esc(U.via)}) · <button type="button" class="lnk" data-so>Sign out</button></p>
 ${cfl("email","Email",{req:1,t:"email",ac:"email"})}<p class="fs">Used for your order confirmation.</p>
 <label class="chk"><input type="checkbox" name="news"${ckv.news?" checked":""}><span>Email me with news and offers</span></label></div>
 <div class="cs"><h2>Delivery</h2>
 <label class="fl"><span>Country/Region</span><select name="country" autocomplete="country-name"><option>Pakistan</option></select></label>
 <div class="two">${cfl("first","First name",{req:1,ac:"given-name"})}${cfl("last","Last name",{req:1,ac:"family-name"})}</div>
 ${cfl("address","Address",{req:1,ac:"address-line1"})}${cfl("apt","Apartment, suite, etc.",{ac:"address-line2"})}
 <div class="two">${cfl("city","City",{req:1,ac:"address-level2"})}<label class="fl"><span>Province</span><select name="province" required autocomplete="address-level1"><option value="">Select</option>${PROV.map(x=>`<option${ckv.province==x?" selected":""}>${x}</option>`).join("")}</select></label></div>
 <div class="two">${cfl("postal","Postal code",{inp:"numeric",ac:"postal-code"})}${cfl("phone","Phone",{req:1,t:"tel",ac:"tel",pat:PHONE,title:PHT})}</div>
 <label class="chk"><input type="checkbox" name="save"${ckv.save?" checked":""}><span>Save this information for next time</span></label></div>
 <div class="cs"><h2>Shipping method</h2><div class="opt on static"><b>${esc(cfg.shipName||"Standard delivery")}</b><small>${esc(eta)}</small><span>${r.ship?money(r.ship):"Free"}</span></div>
 ${cfg.freeOver?`<p class="fs">Free delivery on orders over ${money(cfg.freeOver)}.</p>`:""}</div>
 <div class="cs"><h2>Payment</h2><p class="fs">Choose how you would like to pay. We never ask for card details on this website.</p>
 <div class="opts">${opt("cod",PAYS.cod,"Pay in cash when your order arrives.")}${opt("bank",PAYS.bank,`<span class="pre">${esc(bank)}</span><span>After paying, send the receipt on WhatsApp ${esc(cfg.phone)} with your order number.</span>`)}${opt("card",PAYS.card+' <span class="cards" aria-hidden="true"><i>VISA</i><i>Mastercard</i></span>',"We will send you a secure payment link on WhatsApp or email right after you place the order.")}</div></div>
 <div class="cs"><h2>Billing address</h2><div class="opts"><label class="opt pay${ckv.bill!="diff"?" on":""}"><input type="radio" name="bill" value="same"${ckv.bill!="diff"?" checked":""}><b>Same as shipping address</b></label><label class="opt pay${ckv.bill=="diff"?" on":""}"><input type="radio" name="bill" value="diff"${ckv.bill=="diff"?" checked":""}><b>Use a different billing address</b><div class="pd">${cfl("bname","Full name",{ac:"off"})}${cfl("baddr","Address")}<div class="two">${cfl("bcity","City")}${cfl("bphone","Phone")}</div></div></label></div></div>
 <div class="cs"><h2>Order note</h2><label class="fl"><span>Note for ELIN (optional)</span><textarea name="note" rows="2">${esc(ckv.note||"")}</textarea></label></div>
 <div class="cs terms"><label class="chk"><input type="checkbox" name="terms" required${ckv.terms?" checked":""}><span>I agree to the <a href="https://elin.com.pk/refund_returns/" target="_blank" rel="noopener">refund &amp; exchange policy</a> and the <a href="https://elin.com.pk/privacy-policy/" target="_blank" rel="noopener">privacy policy</a>.</span></label>
 <button class="btn fin" type="submit">Finalize order · ${money(r.total)}</button><p class="fs" id="com" role="status"></p></div>
 </form></div><aside class="cos" aria-label="Order summary">${sum}</aside></section>`}
function confirmPage(){const o=lastOrder,bank=cfg.bankInfo||"Our bank account details will be sent to you on WhatsApp.";
 const how=o.pay=="bank"?`<h2>Bank deposit</h2><p class="pre">${esc(bank)}</p><p>Please send the receipt with order number <b>${esc(o.id)}</b> on WhatsApp.</p><a class="btn" target="_blank" rel="noopener" href="${esc(wl("Hello ELIN, I paid for order "+o.id+" by bank deposit. Receipt attached."))}">Send receipt on WhatsApp</a>`:o.pay=="card"?`<h2>Card payment</h2><p>We will send a secure payment link on WhatsApp or email shortly. Your order is confirmed once it is paid.</p>`:`<h2>Cash on delivery</h2><p>Please keep ${esc(money(o.total))} ready when your order arrives.</p>`;
 return `<section class="co done"><div class="cof"><p class="eb">Order confirmed</p><h1>Thank you, ${esc(o.first)}!</h1><p class="lead">${o.pend?`Your order <b>${esc(o.id)}</b> is saved and is being sent to ELIN. To confirm it fastest, tap the button below and send it to us on WhatsApp.</p><p><a class="btn" target="_blank" rel="noopener" href="${esc(wl("New ELIN order "+o.id+"\n\n"+o.wa))}">Send my order on WhatsApp</a></p><p class="lead" hidden>`:`Your order <b>${esc(o.id)}</b> has been sent to ELIN. We will confirm it with you shortly${o.email?` and a confirmation email is on its way to ${esc(o.email)}`:""}.`}</p>${how}<h2>Delivery to</h2><p>${esc(o.name)}<br>${esc(o.addr)}<br>${esc(o.phone)}</p><div class="acts"><a class="btn" href="#/">Continue shopping</a></div></div><aside class="cos"><div class="cos-in"><h2>Order ${esc(o.id)}</h2><ul class="cl">${o.lines.map(l=>`<li><div><b>${esc(l.name)}</b><small>${esc(l.v)}</small></div><span class="lp">${esc(l.price)} ×${l.qty}</span></li>`).join("")}</ul><div class="sm"><div><span>Subtotal</span><span>${esc(money(o.sub))}</span></div>${o.applied.map(a=>`<div class="g"><span>${esc(a.name)} ×${a.packs}</span><span>− ${esc(money(a.d))}</span></div>`).join("")}${o.cd?`<div class="g"><span>Discount</span><span>− ${esc(money(o.cd))}</span></div>`:""}<div><span>Shipping</span><span>${esc(o.ship)}</span></div><div class="tt"><span>Total</span><span>${esc(money(o.total))}</span></div><div><span>Payment</span><span>${esc(PAYS[o.pay])}</span></div></div></div></aside></section>`}
function wireCheckout(){const f=$("#co");
 if(!f){const sg=$(".co .signin");if(sg)E.authInit(sg,x=>{welcome(x);ckv._init=0;route(true)});const eb0=$("[data-eb]");if(eb0)eb0.onclick=openCart;return}
 $("[data-eb]").onclick=()=>{readCo();openCart()};
 $("[data-cpc]").onclick=()=>{readCo();route(true)};
 $("#cpi2").onkeydown=e=>{if(e.key=="Enter"){e.preventDefault();readCo();route(true)}};
 const sync=()=>{f.querySelectorAll(".opt.pay").forEach(l=>l.classList.toggle("on",l.querySelector("input").checked));const d=f.bill.value=="diff";["bname","baddr","bcity"].forEach(n=>f[n].required=d)};
 f.addEventListener("change",sync);sync();watchInvalid(f,t=>{const m=$("#com");if(m){m.className="fs err";m.textContent=t}});
 f.onsubmit=async e=>{e.preventDefault();readCo();const r=E.calc(coupon),me=E.getUser(),btn=f.querySelector(".fin"),msg=$("#com");if(!me||!r.lines.length)return route(true);
  const v=ckv,name=(v.first+" "+v.last).trim(),addr=[v.address,v.apt].filter(Boolean).join(", ")+", "+v.city+", "+v.province+(v.postal?" "+v.postal:"")+", Pakistan";
  const L=r.lines.map((x,i)=>`${i+1}) ${x.p.name}${x.l.size?" | Size "+x.l.size:""}${x.l.color?" | "+x.l.color:""} x${x.l.qty} = ${money(x.line)}`).join("\n");
  const id=E.newId("EL"),cemail=me.uid||me.email,pay=PAYS[v.pay]||PAYS.cod,shipTxt=r.ship?money(r.ship):"Free";
  const bill=v.bill=="diff"?`${v.bname}, ${v.baddr}, ${v.bcity}${v.bphone?" | "+v.bphone:""}`:"Same as shipping address";
  const by=`${me.name} (${me.via}, ${me.email||me.uid})`,to=cfg.orderEmail||cfg.email;
  const body=`New website order ${id}\n\n${L}\n\nSubtotal: ${money(r.sub)}${r.save?"\nBundle savings: -"+money(r.save):""}${r.cd?"\nDiscount: -"+money(r.cd):""}\nShipping: ${shipTxt}\nTOTAL: ${money(r.total)}\nPayment: ${pay}\n\nPlaced by: ${by}\nName: ${name}\nPhone: ${v.phone}\nEmail: ${v.email}\nAddress: ${addr}\nBilling: ${bill}${v.note?"\nNote: "+v.note:""}`;
  btn.disabled=true;btn.textContent="Sending your order...";msg.textContent="";msg.className="fs";
  const extra=v.pay=="bank"?`\n\nBank deposit details:\n${cfg.bankInfo||"We will send our bank details on WhatsApp."}\nPlease send the receipt on WhatsApp ${cfg.phone} with order number ${id}.`:v.pay=="card"?"\n\nWe will send you a secure card payment link on WhatsApp or email shortly.":"\n\nPlease keep the amount ready for cash on delivery.";
  const loginMail=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(me.email||"")?me.email:"",custMail=loginMail||v.email||"";   /* the customer's confirmation goes to the email they signed in with */
  const sumTxt=`Subtotal: ${money(r.sub)}${r.applied.map(a=>"\n"+a.name+" x"+a.packs+": -"+money(a.d)).join("")}${r.cd?"\nDiscount: -"+money(r.cd):""}\nShipping: ${shipTxt}`;
  const mailArgs=()=>[`New ELIN order ${id} - ${name} - ${money(r.total)} - ${pay}`,{"Order":id,"Placed by":by,"Name":name,"Phone":v.phone,email:custMail,"Contact email on form":v.email||"-","Address":addr,"Billing address":bill,"Shipping":shipTxt,"Payment":pay,"Wants news and offers":v.news?"Yes":"No","Note":v.note||"-","Items":L,"Subtotal":money(r.sub),...(r.save?{"Bundle savings":"-"+money(r.save)}:{}),...(r.cd?{"Discount":"-"+money(r.cd)+(coupon?" ("+coupon.trim().toUpperCase()+")":"")}:{}),"Total":money(r.total)},`Thank you for your order ${id} at ELIN.\n\n${L}\n\n${sumTxt}\nTotal: ${money(r.total)} (${pay})\nDelivery to: ${addr}${extra}\n\nWe will confirm your order shortly. For help, WhatsApp us on ${cfg.phone}.`,[loginMail,v.email]];const mailF=()=>E.sendMail(...mailArgs());
  const rec={id,time:new Date().toISOString(),name,phone:v.phone,email:v.email||"",lemail:loginMail,city:v.city,addr,items:L.replace(/\n/g," ; "),sub:r.sub,save:r.save,disc:r.cd,total:r.total,cname:me.name,cemail,via:me.via||"",pay,ship:shipTxt,note:v.note||"",bill,status:"new"};
  let shOk=false,pend=false;
  /* the order is saved in the phone first, sent in the background, and the customer sees the confirmation within 1.5 s (a slow network never blocks checkout) */
  const job=(()=>{try{
   const fbP=E.liveOn()?E.liveSave("orders",rec).then(x=>{if(!x.ok&&!x.denied)E.liveQueue("orders",rec);return !!x.ok}):Promise.resolve(false);
   const shP=cfg.webhook?E.hookWait("order",rec).then(x=>{shOk=!!x.ok;return x.ok||mailF()}):mailF();
   shP.then(v=>{if(v)E.outboxDel(rec.id)},()=>{});   /* the saved copy is removed only when the Gmail/Sheet route really worked */
   return E.anyOk([fbP,shP])}catch(x){return Promise.resolve(false)}})();
  E.outboxAdd({type:"order",rec,mail:mailArgs(),ts:Date.now()});
  const first=await Promise.race([job,new Promise(r=>setTimeout(()=>r("slow"),1500))]);
  if(first===false)pend=true   /* pend = every route already failed: the confirmation page offers WhatsApp, and the phone keeps retrying */
  try{v.save?localStorage.setItem("elin_ship",JSON.stringify({first:v.first,last:v.last,email:v.email,address:v.address,apt:v.apt,city:v.city,province:v.province,postal:v.postal,phone:v.phone})):localStorage.removeItem("elin_ship")}catch(x){}
  E.addOrder(rec,shOk||!!cfg.webhook);
  lastOrder={pend,wa:body,id,first:v.first,name,email:custMail,phone:v.phone,addr,pay:v.pay,total:r.total,sub:r.sub,applied:r.applied,cd:r.cd,ship:shipTxt,lines:r.lines.map(x=>({name:x.p.name,v:[x.l.size&&"Size "+x.l.size,x.l.color].filter(Boolean).join(" · "),price:money(x.line/x.l.qty),qty:x.l.qty}))};
  E.cartClear();coupon="";ckv={};cc();route()}}
let heroT=0;
function heroInit(){clearTimeout(heroT);const h=$("[data-hero]");if(!h)return;const sl=[...h.querySelectorAll(".hsl")],dots=[...h.querySelectorAll("[data-hg]")],D=[6500,6500,6500];let i=0,paused=false;
 const go=n=>{i=(n+sl.length)%sl.length;h.dataset.s=i;sl.forEach((x,j)=>{x.classList.toggle("on",j==i);x.setAttribute("aria-hidden",j!=i)});dots.forEach((d,j)=>{d.classList.toggle("on",j==i);d.setAttribute("aria-selected",j==i)});const v=h.querySelector("video");if(v){if(i==0){v.currentTime=0;const r=v.play();r&&r.catch&&r.catch(()=>{})}else{v.muted=true;h.querySelector(".cmute")&&h.querySelector(".cmute").classList.remove("s")}}sched()};
 const sched=()=>{clearTimeout(heroT);if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;heroT=setTimeout(function t(){if(!document.body.contains(h))return;if(paused||document.hidden){heroT=setTimeout(t,1000);return}go(i+1)},D[i])};
 {const v0=h.querySelector("video");v0&&v0.play&&v0.play().catch(()=>{})}h._go=go;h._pause=v=>{paused=v};sl.forEach((x,j)=>x.setAttribute("aria-hidden",j!=0));
 h.addEventListener("mouseenter",()=>paused=true);h.addEventListener("mouseleave",()=>paused=false);h.addEventListener("focusin",()=>paused=true);h.addEventListener("focusout",()=>paused=false);
 let x0=null;h.addEventListener("touchstart",e=>{x0=e.touches[0].clientX},{passive:true});h.addEventListener("touchend",e=>{if(x0==null)return;const d=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(d)>50)go(i+(d<0?1:-1))});
 h.addEventListener("click",e=>{const a=e.target.closest("[data-hs]"),b=e.target.closest("[data-hg]");if(a)go(i+ +a.dataset.hs);else if(b)go(+b.dataset.hg)});
 sched()}
function route(keep){
 const [k0,sub]=(location.hash.replace("#/","")||"home").split("/"),k=(["reseller","bundles","admin","checkout"].includes(k0)||C[k0])?k0:"home";if(k!="checkout")lastOrder=null;
 themeFont(k);document.body.classList.toggle("am",k=="admin");document.documentElement.dataset.th=(k=="bundles"||k=="checkout")?"home":k=="admin"?"reseller":k;
 if(k=="admin"){m.innerHTML="";window.renderAdmin(m)}
 else m.innerHTML=k=="checkout"?checkoutPage():k=="home"?home():k=="reseller"?reseller():k=="bundles"?bundlesPage():(k=="sale"&&/^flat-\d+$/.test(sub||"")?saleFlat(+sub.slice(5)):sub?subPage(k,sub):page(k));
 document.title="ELIN | "+(C[k]?(sub&&C[k].subs.find(s=>sl(s)==sub)?C[k].subs.find(s=>sl(s)==sub)+" · ":"")+C[k].t:k=="admin"?"Store admin":k=="checkout"?"Checkout":k=="reseller"?"Wholesale & Bulk Orders":k=="bundles"?"Bundle Offers":"Home");
 if(k=="reseller")WS.wire(m,m);if(k=="home")heroInit();
 const nf=$("#nf");if(nf)nf.onsubmit=e=>{e.preventDefault();open(wl("Please add me to the ELIN newsletter: "+nf.e.value),"_blank")};
 if(k!="admin"&&k!="checkout")m.insertAdjacentHTML("beforeend",featStrip());if(k=="checkout")wireCheckout();
 if(!keep)scrollTo(0,0);
 const io="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.08}):null;
 m.querySelectorAll(".rv").forEach(e=>io?io.observe(e):e.classList.add("in"));
 const cu=m.querySelectorAll("[data-n]");if(cu.length){const run=el=>{cancelAnimationFrame(el._r);const to=+el.dataset.n;if(RM){el.textContent=to;return}const t0=performance.now(),dur=1800;(function f(t){const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e);if(p<1)el._r=requestAnimationFrame(f)})(t0)};if("IntersectionObserver"in window){const o2=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)run(x.target);else{cancelAnimationFrame(x.target._r);x.target.textContent=0}}),{threshold:.6});cu.forEach(e=>{e.textContent=0;o2.observe(e)})}else cu.forEach(e=>e.textContent=e.dataset.n)}
 E.hydrate(m);fillCircles(m);fillReviewPics(m);lazyVid(m);initShows(m);m.querySelectorAll("[data-auto]").forEach(autoScroll);m.querySelectorAll("[data-page]").forEach(pager);
}
/* product popup */
function openProd(id){
 const p=E.prod(id);if(!p)return;cur={id,size:"",color:"",qty:1};E.pushRecent(id);
 const e=E.eff(p),pc=E.pct(p),rel=[];
 $("#md").innerHTML=`<div class="mbox" role="dialog" aria-modal="true" aria-label="${esc(p.name)}"><button class="mx" data-close aria-label="Close">×</button><div class="mg">${gal(p,"big")}</div><div class="mi"><small>${esc(p.sub)}</small><h2>${esc(p.name)}</h2>${p.rating>0?`<div class="rt">${stars(p.rating)} <span>${(+p.rating).toFixed(1)}</span></div>`:""}<div class="pr big">${pc?`<s>${money(p.price)}</s> `:""}${money(e)}${pc?` <em class="sv">Save ${pc}%</em>`:""}</div>${p.desc?`<p class="dsc">${esc(p.desc)}</p>`:""}
 ${p.sizes.length?`<div class="opt"><b>Size</b><div>${p.sizes.map(s=>`<button class="chip" data-sz="${esc(s)}">${esc(s)}</button>`).join("")}</div></div>`:""}
 ${p.colors.length?`<div class="opt"><b>Colour</b><div>${p.colors.map(s=>`<button class="chip" data-co="${esc(s)}">${esc(s)}</button>`).join("")}</div></div>`:""}
 <div class="opt"><b>Quantity</b><div class="qty"><button data-mq="-1">−</button><span id="mq">1</span><button data-mq="1">+</button></div></div>
 <div class="acts"><button class="btn atc" data-addm>${CART}<span>Add to cart</span></button><button class="btn o" data-buy>Buy now</button></div>
 <div class="acts2"><button class="lnk" data-w="${p.id}" aria-pressed="${E.wish.includes(p.id)}">${E.wish.includes(p.id)?"♥ Saved":"♡ Save for later"}</button><button class="lnk" data-share>Share</button></div>
 ${rel.length?`<div class="bh"><b>Bundle offers</b>${rel.map(b=>`<span>${esc(b.name)}: ${E.bdesc(b)}</span>`).join("")}</div>`:""}</div></div>`;
 show("md");E.hydrate($("#md"));
}
const need=()=>{const p=E.prod(cur.id);if(p.sizes.length&&!cur.size){E.toast("Please choose a size");return false}if(p.colors.length&&!cur.color){E.toast("Please choose a colour");return false}return true};
function show(w){$("#ov").classList.add("on");$("#"+w).classList.add("on");document.body.style.overflow="hidden"}
function closeAll(){["ov","dr","md"].forEach(i=>$("#"+i).classList.remove("on"));document.body.style.overflow=""}
/* cart drawer */
function readCk(){const f=$("#ck");if(f)ckv=Object.fromEntries(new FormData(f));const c=$("#cpi");if(c)coupon=c.value}
function renderCart(){
 readCk();const U=E.getUser();if(U)["name","email","phone"].forEach(k=>{if(!ckv[k]&&U[k])ckv[k]=U[k]});const r=E.calc(coupon),v=n=>esc(ckv[n]||"");
 $("#dr").innerHTML=`<div class="dh"><h3>Your bag</h3><button data-close aria-label="Close">×</button></div>`+(r.lines.length?`<div class="dl">${r.lines.map((x,i)=>`<div class="ci"><div class="slot th"><div class="gal">${E.slides(x.p)}</div></div><div><b>${esc(x.p.name)}</b><small>${[x.l.size&&"Size "+x.l.size,x.l.color,x.l.bun&&((S.bundles.find(b=>b.id==x.l.bun)||{}).name)].filter(Boolean).map(esc).join(" · ")}</small><div class="qty"><button data-cq="${i}" data-d="-1">−</button><span>${x.l.qty}</span><button data-cq="${i}" data-d="1">+</button></div></div><div class="cr">${money(x.line)}<button data-cr="${i}">Remove</button></div></div>`).join("")}</div>
 <div class="dc">${r.nudge?`<div class="nudge">🎁 ${esc(r.nudge)}</div>`:""}<div class="cpn"><input id="cpi" placeholder="Coupon code" value="${esc(coupon)}" aria-label="Coupon code"><button class="btn o" data-cpn>Apply</button></div>${r.cerr?`<p class="err">${r.cerr}</p>`:""}
 <div class="sm"><div><span>Subtotal</span><span>${money(r.sub)}</span></div>${r.applied.map(a=>`<div class="g"><span>${esc(a.name)} ×${a.packs}</span><span>− ${money(a.d)}</span></div>`).join("")}${r.cd?`<div class="g"><span>Coupon</span><span>− ${money(r.cd)}</span></div>`:""}<div><span>Delivery</span><span>${r.ship?money(r.ship):"Free"}</span></div><div class="tt"><span>Total</span><span>${money(r.total)}</span></div></div>
 <a class="btn cob" href="#/checkout" data-close>Checkout</a><p class="fs">Delivery, payment method and address are on the next page.</p></div>`:`<p class="emp">Your bag is empty.<br><a class="btn" href="#/bags" data-close>Start shopping</a></p>`);
 E.hydrate($("#dr"));
}
const openCart=()=>{renderCart();show("dr")};
/* clicks */
document.addEventListener("click",e=>{
 const t=e.target,c=s=>t.closest(s);let x;
 if(c("#cb"))return openCart();
 if(c("#sb"))return openSearch();
 if(c("#ab"))return openAccount();
 if(c("#wb")||c("[data-openwish]"))return openWish();
 if(c("[data-so]")){E.setUser(null);updHdr();closeAll();E.toast("Signed out");if(location.hash=="#/checkout")route(true);return}
 if(x=c("[data-scroll]")){const t=document.getElementById(x.dataset.scroll);t&&t.scrollIntoView({behavior:"smooth"});return}
 if(x=c("[data-w]")){const id=x.dataset.w,on=E.toggleWish(id);document.querySelectorAll(`[data-w="${id}"]`).forEach(b=>{b.classList.toggle("on",on);b.setAttribute("aria-pressed",on);if(b.classList.contains("lnk"))b.textContent=on?"♥ Saved":"♡ Save for later"});wc();E.toast(on?"Saved to wishlist":"Removed from wishlist");return}
 if(c("[data-share]")){const p=E.prod(cur.id),t=`${p.name} at ELIN (${money(E.eff(p))})`;if(navigator.share)navigator.share({title:p.name,text:t,url:location.href.split("#")[0]}).catch(()=>{});else open("https://wa.me/?text="+encodeURIComponent(t+" "+location.href.split("#")[0]),"_blank");return}
 if(x=c("[data-cs]")){const ct=x.parentNode.querySelector(".ct");if(ct._pause)ct._pause(2600);ct.scrollBy({left:+x.dataset.cs*ct.clientWidth*.85,behavior:"smooth"});return}
 if(x=c("[data-un]")){const v=x.parentNode.querySelector("video");if(v){v.muted=!v.muted;v.play();x.classList.toggle("s",!v.muted)}return}
 if(x=c("[data-bb]"))return openBuilder(x.dataset.bb);
 if(x=c("[data-bp]")){const id=x.dataset.bp,i=bb.sel.findIndex(s=>s.pid==id);if(i>=0)bb.sel.splice(i,1);else if(bb.sel.length>=bb.b.qty){E.toast("Your pack is full. Remove an item first.");return}else bb.sel.push({pid:id,size:"",color:""});drawBuilder();return}
 if(x=c("[data-bx]")){bb.sel.splice(+x.dataset.bx,1);drawBuilder();return}
 if(c("[data-bgo]")){for(const s of bb.sel){const p=E.prod(s.pid);if((p.sizes.length&&!s.size)||(p.colors.length&&!s.color)){E.toast("Please choose size or colour for "+p.name);return}}
  bb.sel.forEach(s=>E.cartAdd(s.pid,s.size,s.color,1,bb.b.id));cc();closeAll();E.toast(bb.b.name+" added to your bag");openCart();return}
 if(c("[data-close]")||t.id=="ov"){closeAll();return}
 if(x=c("[data-g]")){const g=x.closest(".slot").querySelector(".gal");g.scrollBy({left:+x.dataset.g*g.clientWidth,behavior:"smooth"});return}
 if(x=c("[data-open]")){openProd(x.dataset.open);return}
 if(x=c("[data-q]")){const p=E.prod(x.dataset.q);if(p.sizes.length||p.colors.length)return openProd(p.id);E.cartAdd(p.id,"","",1);cc();E.toast("Added to your bag");return}
 if(x=c("[data-sz]")){cur.size=x.dataset.sz;x.parentNode.querySelectorAll(".chip").forEach(b=>b.classList.toggle("on",b==x));return}
 if(x=c("[data-co]")){cur.color=x.dataset.co;x.parentNode.querySelectorAll(".chip").forEach(b=>b.classList.toggle("on",b==x));return}
 if(x=c("[data-mq]")){cur.qty=Math.max(1,cur.qty+ +x.dataset.mq);$("#mq").textContent=cur.qty;return}
 if(c("[data-addm]")){if(need()){E.cartAdd(cur.id,cur.size,cur.color,cur.qty);cc();closeAll();E.toast("Added to your bag");openCart()}return}
 if(c("[data-buy]")){if(need()){E.cartAdd(cur.id,cur.size,cur.color,cur.qty);cc();closeAll();openCart()}return}
 if(x=c("[data-cq]")){E.cartQty(+x.dataset.cq,+x.dataset.d);renderCart();cc();return}
 if(x=c("[data-cr]")){E.cartDel(+x.dataset.cr);renderCart();cc();return}
 if(c("[data-cpn]")){renderCart();return}
 if(x=c(".vt")){const v=x.querySelector("video");if(v){v.muted=!v.muted;v.play();x.classList.toggle("s",!v.muted)}}
});
document.addEventListener("input",e=>{if(e.target.id=="sq")searchUpdate(e.target.value)});
document.addEventListener("click",e=>{const b=e.target.closest("[data-sqs]");if(!b)return;const i=$("#sq");if(!i)return;i.value=b.dataset.sqs;searchUpdate(i.value);i.focus()});
document.addEventListener("keydown",e=>{if(e.target.id!="sq")return;const box=$("#ssg");if(e.key=="Enter"){e.preventDefault();const f=box&&!box.hidden&&box.querySelector(".sgi");if(f)f.click()}else if(e.key=="ArrowDown"&&box&&!box.hidden){e.preventDefault();const f=box.querySelector(".sgi");f&&f.focus()}});
document.addEventListener("keydown",e=>{const t=e.target;if(!t.classList||!t.classList.contains("sgi"))return;const L=[...t.parentNode.querySelectorAll(".sgi")],i=L.indexOf(t);if(e.key=="ArrowDown"){e.preventDefault();(L[i+1]||t).focus()}else if(e.key=="ArrowUp"){e.preventDefault();(i?L[i-1]:$("#sq")).focus()}})
document.addEventListener("change",e=>{const t=e.target;if(t.dataset.bsz!==undefined){bb.sel[+t.dataset.bsz].size=t.value;return}if(t.dataset.bco!==undefined){bb.sel[+t.dataset.bco].color=t.value;return}if(e.target.id=="srt"){sortBy=e.target.value;route(true)}});
document.addEventListener("submit",e=>{if(e.target.id=="af"){e.preventDefault();const d=Object.fromEntries(new FormData(e.target));const inCart=$("#dr").classList.contains("on");welcome({name:d.name.trim(),email:d.email.trim().toLowerCase(),phone:d.phone.trim(),via:"email (unverified)"});if(location.hash=="#/checkout"){ckv._init=0;closeAll();route(true)}else inCart?renderCart():closeAll()}});
document.addEventListener("keydown",e=>{if(e.key=="Escape")closeAll();if((e.key=="Enter"||e.key==" ")&&e.target.classList&&e.target.classList.contains("vt")){e.preventDefault();e.target.click()}});
chrome();updHdr();wc();
const bt=$("#bt");addEventListener("scroll",()=>{bt.classList.toggle("on",document.documentElement.scrollTop>700)},{passive:true});bt.onclick=()=>scrollTo({top:0,behavior:"smooth"});
const sk=$("#skip");if(sk)sk.onclick=e=>{e.preventDefault();m.setAttribute("tabindex","-1");m.focus()};
addEventListener("hashchange",()=>{closeAll();route()});route();
E.hydrate($("header"));
})();
