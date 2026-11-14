/* ELIN v34: collapsing header, full-visible hero media, 3D tilt and hero depth.
   Standalone: does not change any other file's logic. Delete this file and css/v34.css to undo. */
(function(){
"use strict";
var D=document,W=window,root=D.documentElement;
var RM=!!(W.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches);
var FINE=!!(W.matchMedia&&matchMedia("(hover:hover) and (pointer:fine)").matches);

/* ---------- 1. header: measure the logo row so only the category bar stays stuck ---------- */
var lastHx=-1;
function measureHdr(){
 var t=D.querySelector("header .top"),h=D.querySelector("header"),k=D.querySelector(".tick");if(!t)return;
 var x=Math.round(t.getBoundingClientRect().height);
 if(x!==lastHx){lastHx=x;root.style.setProperty("--hx",x+"px")}
 if(h)root.style.setProperty("--hdr",Math.round(h.offsetHeight)+"px");
 if(h)root.style.setProperty("--hh",Math.round(h.offsetHeight+(k?k.offsetHeight:0))+"px");
}
function initHdr(){
 measureHdr();
 var t=D.querySelector("header .top");
 if(W.ResizeObserver){var ro=new ResizeObserver(measureHdr),hd=D.querySelector("header");if(t)ro.observe(t);if(hd)ro.observe(hd)}
 W.addEventListener("resize",measureHdr);
 W.addEventListener("load",measureHdr);
 if(D.fonts&&D.fonts.ready)D.fonts.ready.then(measureHdr);
}

/* ---------- 2. hero video / photo: show it whole, blurred copy fills the sides ---------- */
var HERO=".cv .slot,.h-full .hm,.hero .hm";
var fits=[],fitTimer=0;
/* only redraw the blurred side-fill for hero videos that are on screen (drawing every one, every 260 ms, was wasted work while scrolling) */
var visIO=W.IntersectionObserver?new IntersectionObserver(function(es){es.forEach(function(x){x.target._vis=x.isIntersecting})}):null;

function drawBk(s){
 var m=s._m,c=s._bk;if(!m||!c)return;
 var w=m.videoWidth||m.naturalWidth,h=m.videoHeight||m.naturalHeight;if(!w||!h)return;
 if(m.tagName==="VIDEO"&&m.readyState<2)return;
 try{
  var x=c.getContext("2d"),cw=c.width,ch=c.height,k=Math.max(cw/w,ch/h),dw=w*k,dh=h*k;
  x.drawImage(m,(cw-dw)/2,(ch-dh)/2,dw,dh);
 }catch(e){}
}
function drawAll(){
 fits=fits.filter(function(s){return s.isConnected});
 if(!fits.length){clearInterval(fitTimer);fitTimer=0;return}
 if(D.hidden)return;
 fits.forEach(function(s){
  if(!s.classList.contains("fit"))return;
  if(visIO&&s._vis===false)return;
  var m=s._m;
  if(m&&m.tagName==="VIDEO"&&m.paused&&s._drawn)return;
  drawBk(s);s._drawn=1;
 });
}
function evalFit(m){
 var s=m&&m.closest&&m.closest(".slot");
 if(!s||!s.matches(HERO))return;
 var w=m.videoWidth||m.naturalWidth,h=m.videoHeight||m.naturalHeight;
 if(!w||!h)return;
 var r=s.getBoundingClientRect();
 if(!r.width||!r.height)return;
 var va=w/h,ca=r.width/r.height,f=Math.max(va/ca,ca/va),on=f>1.16;
 s.classList.toggle("fit",on);
 if(!on)return;
 if(!s._bk){
  var c=D.createElement("canvas");
  c.className="bk";c.setAttribute("aria-hidden","true");
  c.width=64;c.height=Math.max(16,Math.round(64*r.height/r.width));
  s.insertBefore(c,s.firstChild);s._bk=c;
 }else{
  s._bk.height=Math.max(16,Math.round(s._bk.width*r.height/r.width));
 }
 s._m=m;s._drawn=0;
 if(fits.indexOf(s)<0){fits.push(s);if(visIO)visIO.observe(s)}
 drawBk(s);
 if(!fitTimer)fitTimer=setInterval(drawAll,400);
}
function sweep(){
 D.querySelectorAll(".cine img").forEach(function(i){i.loading="eager"});
 D.querySelectorAll(".cv .slot video,.cv .slot img,.h-full .hm video,.h-full .hm img,.hero .hm video,.hero .hm img").forEach(function(m){
  if(m.tagName==="VIDEO"){if(m.readyState>=1)evalFit(m)}
  else if(m.complete&&m.naturalWidth)evalFit(m);
 });
}
function initFit(){
 D.addEventListener("loadedmetadata",function(e){if(e.target&&e.target.tagName==="VIDEO")evalFit(e.target)},true);
 D.addEventListener("load",function(e){if(e.target&&e.target.tagName==="IMG")evalFit(e.target)},true);
 var rt=0;
 W.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(sweep,150)});
 W.addEventListener("orientationchange",function(){setTimeout(sweep,300)});
 var main=D.getElementById("m");
 if(main&&W.MutationObserver)new MutationObserver(function(){clearTimeout(rt);rt=setTimeout(sweep,80)}).observe(main,{childList:true});
 setTimeout(sweep,100);setTimeout(sweep,900);
}

/* ---------- 3. 3D tilt on cards (mouse) ---------- */
var TILT=".p,.vt,.hp,.cats a,.cols a,.pair a,.gc,.sfr";
var cur=null,px=0,py=0,raf=0;
function tiltApply(){
 raf=0;var t=cur;if(!t)return;
 var r=t.getBoundingClientRect();if(!r.width)return;
 var x=(px-r.left)/r.width-.5,y=(py-r.top)/r.height-.5,mx=5;
 t.style.setProperty("--ry",(x*mx*2).toFixed(2)+"deg");
 t.style.setProperty("--rx",(-y*mx*2).toFixed(2)+"deg");
 t.style.setProperty("--sx",(-x*24).toFixed(1));
 t.style.setProperty("--sy",(-y*24).toFixed(1));
}
function tiltReset(t){
 t.classList.remove("t3");
 ["--rx","--ry","--sx","--sy"].forEach(function(k){t.style.removeProperty(k)});
}
function initTilt(){
 if(RM||!FINE)return;
 D.addEventListener("pointermove",function(e){
  if(e.pointerType!=="mouse")return;
  var t=e.target.closest?e.target.closest(TILT):null;
  if(t&&(t.closest(".rvfull")||t.closest("#mmenu,header,#md,#dr")))t=null;
  if(t!==cur){
   if(cur)tiltReset(cur);
   cur=t;
   if(t)t.classList.add("t3");
  }
  if(!t)return;
  px=e.clientX;py=e.clientY;
  if(!raf)raf=requestAnimationFrame(tiltApply);
 },{passive:true});
 D.documentElement.addEventListener("mouseleave",function(){if(cur){tiltReset(cur);cur=null}});
}

/* ---------- 4. hero depth: mouse + scroll parallax ---------- */
var heroEl=null,hraf=0,sraf=0;
function heroMouse(e){
 if(e.pointerType!=="mouse"||root.classList.contains("gs"))return;
 var h=e.target.closest?e.target.closest(".cine,.h-full"):null;
 if(h!==heroEl){
  if(heroEl){heroEl.style.setProperty("--mx",0);heroEl.style.setProperty("--my",0)}
  heroEl=h;
 }
 if(!h)return;
 var mx=e.clientX,my=e.clientY;
 if(hraf)return;
 hraf=requestAnimationFrame(function(){
  hraf=0;if(!heroEl)return;
  var r=heroEl.getBoundingClientRect();if(!r.width)return;
  heroEl.style.setProperty("--mx",(((mx-r.left)/r.width-.5)*2).toFixed(3));
  heroEl.style.setProperty("--my",(((my-r.top)/r.height-.5)*2).toFixed(3));
 });
}
function heroScroll(){
 sraf=0;if(root.classList.contains("gs"))return;
 D.querySelectorAll(".cine,.h-full").forEach(function(h){
  var r=h.getBoundingClientRect();
  if(r.bottom<0||r.top>W.innerHeight)return;
  h.style.setProperty("--sy",Math.min(Math.max(0,-r.top),r.height).toFixed(0));
 });
}
function initHero(){
 if(RM)return;
 if(FINE)D.addEventListener("pointermove",heroMouse,{passive:true});
 W.addEventListener("scroll",function(){if(!sraf)sraf=requestAnimationFrame(heroScroll)},{passive:true});
}


/* ---------- 5. transparent header over the hero ---------- */
var hpRaf=0;
function hovSync(){
 hpRaf=0;
 var main=D.getElementById("m"),hd=D.querySelector("header"),B=D.body;
 if(!main||!hd)return;
 var hero=main.querySelector(":scope>.cine,:scope>.hero.h-full");
 if(hero){
  Array.prototype.slice.call(main.children).forEach(function(c){
   if(c!==hero&&c.matches("nav.crumb,.hwo")&&(c.compareDocumentPosition(hero)&Node.DOCUMENT_POSITION_FOLLOWING))hero.after(c);
  });
 }
 var hp=!!hero&&main.firstElementChild===hero&&!B.classList.contains("am");
 B.classList.toggle("hpage",hp);
 var hov=hp&&hero.getBoundingClientRect().bottom>hd.getBoundingClientRect().bottom;
 B.classList.toggle("hov",hov);
 var im=hd.querySelector(".logo img");
 if(im){
  var cs=im.getAttribute("src")||"";
  if(hov&&/assets\/images\/logo\.png$/.test(cs)){im.dataset.o=cs;im.src="assets/images/logo-light.png"}
  else if(!hov&&im.dataset.o){im.src=im.dataset.o;delete im.dataset.o}
 }
}
function queueHov(){if(!hpRaf)hpRaf=requestAnimationFrame(hovSync)}
function initHov(){
 hovSync();
 W.addEventListener("scroll",queueHov,{passive:true});
 W.addEventListener("resize",queueHov);
 W.addEventListener("hashchange",function(){setTimeout(hovSync,60)});
 var main=D.getElementById("m");
 if(main&&W.MutationObserver)new MutationObserver(queueHov).observe(main,{childList:true});
 setTimeout(hovSync,300);
}


/* ---------- 6. home "Watch & shop" videos: flip to the next set every 10 seconds ---------- */
function flipReels(){
 if(D.hidden)return;
 var ct=D.querySelector(".rvfull .ct.reels");
 if(!ct||ct._flip||ct.scrollWidth<=ct.clientWidth+4)return;
 var r=ct.getBoundingClientRect();
 if(r.bottom<0||r.top>W.innerHeight)return;
 if(ct.querySelector(".vt.s"))return;
 var left=ct.scrollLeft+ct.clientWidth,max=ct.scrollWidth-ct.clientWidth;
 if(ct.scrollLeft>=max-4)left=0;else left=Math.min(left,max);
 function go(){ct.scrollTo({left:left,behavior:"instant"})}
 if(RM||!ct.animate){go();return}
 ct._flip=1;
 var a=ct.animate([{transform:"rotateY(0deg)",opacity:1},{transform:"rotateY(90deg)",opacity:.2}],{duration:450,easing:"ease-in",fill:"forwards"});
 a.onfinish=function(){
  go();
  var b=ct.animate([{transform:"rotateY(-90deg)",opacity:.2},{transform:"rotateY(0deg)",opacity:1}],{duration:550,easing:"ease-out"});
  a.cancel();
  b.onfinish=function(){ct._flip=0};b.oncancel=function(){ct._flip=0};
 };
 a.oncancel=function(){ct._flip=0};
}
function initFlip(){setInterval(flipReels,10000)}

function start(){initHdr();initFit();initTilt();initHero();initHov();initFlip()}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
})();
