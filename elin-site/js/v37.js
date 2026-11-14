/* ELIN v37: GSAP + ScrollTrigger motion (3D section reveals, staggered cards, hero parallax and depth,
   image parallax, gold scroll-progress line). Local copy of GSAP in js/vendor (the site's strict CSP allows only its own files).
   If GSAP is missing or motion is reduced, nothing here runs and the older CSS reveals keep working. */
(function(){
"use strict";
var W=window,D=document,G=W.gsap,ST=W.ScrollTrigger;
if(!G||!ST)return;
G.registerPlugin(ST);
ST.config({ignoreMobileResize:true,limitCallbacks:true});
var RMQ=W.matchMedia("(prefers-reduced-motion:reduce)");
if(RMQ.matches)return;
var root=D.documentElement,FINE=W.matchMedia("(hover:hover) and (pointer:fine)").matches;
var MOB=function(){return W.innerWidth<700};
var ctx=null,prog=null,first=true,cleanups=[];
root.classList.add("gs");

var KIDS=".grid,.cats,.cols,.pair,.hpan,.buns";

function build(){
 var m=D.getElementById("m");if(!m)return;
 if(ctx){ctx.revert();ctx=null}
 cleanups.forEach(function(f){try{f()}catch(e){}});cleanups=[];
 ctx=G.context(function(){
  /* ---- A. every .rv block fades up (plain opacity + slide, no 3D: 3D on big blocks made scrolling lag).
         Very tall blocks (the wholesale form, long lists) are left alone: moving a huge layer is what stutters. ---- */
  var VH=W.innerHeight,rvs=Array.prototype.slice.call(m.querySelectorAll(".rv")).filter(function(el){return !MOB()&&el.offsetHeight<VH*1.25});  /* v48: phones never hide content (it could stay invisible = blank gaps / missing cards) */
  rvs.forEach(function(el){
   var card=el.classList.contains("p")||el.matches("article,.bun,.vt");
   el._from={opacity:0,y:card?24:(MOB()?22:32)};
   G.set(el,el._from);
   el.setAttribute("data-gs3d","");
   var kids=[];el.querySelectorAll(":scope>"+KIDS.split(",").join(",:scope>")+",:scope>.buns").forEach(function(g){
    Array.prototype.forEach.call(g.children,function(c){if(!c.classList.contains("rv"))kids.push(c)});
   });
   if(kids.length>12)kids=kids.slice(0,12);   /* never animate dozens of cards at once */
   el._kfrom={opacity:0,y:22};
   if(kids.length)G.set(kids,el._kfrom);
   el._kids=kids;
  });
  ST.batch(rvs,{
   start:"top 94%",end:"max",interval:.05,batchMax:4,
   onEnter:function(b){
    G.to(b,{opacity:1,y:0,duration:.65,ease:"power2.out",stagger:.06,overwrite:true,
     clearProps:"transform,opacity",
     onComplete:function(){b.forEach(function(e){e.removeAttribute("data-gs3d")})}});
    b.forEach(function(e,i){
     var k=e._kids;if(k&&k.length)G.to(k,{opacity:1,y:0,duration:.55,ease:"power2.out",stagger:{each:.045,from:"start"},delay:.1+i*.04,clearProps:"transform,opacity"});
    });
   }
   /* no "put it away again" on scroll-up: re-hiding and re-playing everything while scrolling back was extra work for nothing */
  });

  /* ---- B. hero: light scroll parallax on desktop only (phones skip it); mouse depth on desktop ---- */
  var hero=m.querySelector(".cine,.hero.h-full");
  if(hero){
   var cv=hero.querySelectorAll(".cine .cv,.hm"),cc=hero.querySelectorAll(".cc,.ht");
   if(!MOB()){
    var tl=G.timeline({scrollTrigger:{trigger:hero,start:"top top",end:"bottom top",scrub:true}});
    tl.to(cv,{yPercent:8,scale:1.12,ease:"none"},0).to(cc,{yPercent:-10,opacity:.2,ease:"none"},0);
   }
   if(FINE){
    var qx=G.quickTo(cv,"x",{duration:.9,ease:"power3.out"}),qy=G.quickTo(cv,"y",{duration:.9,ease:"power3.out"}),
        tx=G.quickTo(cc,"x",{duration:.9,ease:"power3.out"}),ty=G.quickTo(cc,"y",{duration:.9,ease:"power3.out"});
    var mvq=0,mx0=0,my0=0;
    var move=function(e){mx0=e.clientX;my0=e.clientY;if(mvq)return;mvq=requestAnimationFrame(function(){mvq=0;
     var r=hero.getBoundingClientRect();if(my0<r.top||my0>r.bottom)return;
     var nx=(mx0/W.innerWidth-.5)*2,ny=((my0-r.top)/r.height-.5)*2;
     qx(nx*-12);qy(ny*-8);tx(nx*10);ty(ny*7)})};
    D.addEventListener("pointermove",move,{passive:true});
    cleanups.push(function(){D.removeEventListener("pointermove",move)});
   }
   /* re-play the text entrance whenever the slider changes slide */
   var sl=hero.querySelectorAll(".hsl");
   if(sl.length&&W.MutationObserver){
    var mo=new MutationObserver(function(ml){ml.forEach(function(r){var t=r.target;
     if(t.classList.contains("on")&&(r.oldValue||"").split(" ").indexOf("on")<0){
      G.fromTo(t.querySelectorAll(".cc>*"),{opacity:0,y:28},{opacity:1,y:0,duration:.8,ease:"power3.out",stagger:.09,clearProps:"transform,opacity"});
     }})});
    sl.forEach(function(s){mo.observe(s,{attributes:true,attributeFilter:["class"],attributeOldValue:true})});
    cleanups.push(function(){mo.disconnect()});
   }
  }

  /* ---- C. big pictures: gentle parallax inside the frame, desktop only (the 3D lean and panel drift were removed: they cost frames) ---- */
  if(!MOB()&&FINE)m.querySelectorAll(".fb,.band,.cband .cbn,.story .slot").forEach(function(f){
   var im=f.querySelector("img.ok,video");if(!im)return;
   G.fromTo(im,{yPercent:-5,scale:1.1},{yPercent:5,scale:1.1,ease:"none",scrollTrigger:{trigger:f,start:"top bottom",end:"bottom top",scrub:true}});
  });
 },m);
 /* footer columns rise too (footer lives outside #m) */
 var ft=D.getElementById("foot");
 if(ft&&!MOB()){
  var fk=Array.prototype.slice.call(ft.querySelectorAll("footer>*,footer .fc,footer .cols>*"));
  if(ft._st)ft._st.kill();
  var ff={opacity:0,y:24};
  if(fk.length){G.set(fk,ff);
   ft._st=ST.create({trigger:ft,start:"top 94%",end:"max",
    onEnter:function(){G.to(fk,{opacity:1,y:0,duration:.6,ease:"power2.out",stagger:.05,overwrite:true,clearProps:"transform,opacity"})},
    });
  }
 }
 ST.refresh();
 clearTimeout(build._r);build._r=setTimeout(rescue,3500);
}

/* failsafe: anything on screen that is still invisible after 3.5 s is shown (never leave content hidden) */
function rescue(){
 D.querySelectorAll('[data-gs3d],#m [style*="opacity"],#foot [style*="opacity"]').forEach(function(e){
  if(!e.style||e.style.opacity===""||parseFloat(e.style.opacity)>=.05)return;
  var r=e.getBoundingClientRect();
  if(r.top>W.innerHeight+40)return;
  G.killTweensOf(e);G.set(e,{clearProps:"transform,opacity"});
 });
}

/* v48: keep rescuing while the visitor scrolls (positions can go stale when images load late) */
var rq=0;W.addEventListener("scroll",function(){if(rq)return;rq=setTimeout(function(){rq=0;rescue()},350)},{passive:true});

/* gold progress line */
function progress(){
 prog=D.createElement("div");prog.id="qprog";prog.setAttribute("aria-hidden","true");D.body.appendChild(prog);
 G.to(prog,{scaleX:1,ease:"none",scrollTrigger:{trigger:D.documentElement,start:"top top",end:"max",scrub:true}});
}

/* header and menu entrance on first load */
function intro(){
 var l=D.querySelectorAll("#nav>div");
 if(l.length)G.from(l,{opacity:0,y:-14,duration:.7,ease:"power3.out",stagger:.04,delay:.15,clearProps:"all"});
}

function start(){
 var m=D.getElementById("m");if(!m)return;
 progress();
 build();
 if(first){first=false;intro()}
 /* page content swapped (route change): rebuild at once, before the browser paints, so nothing flashes */
 new MutationObserver(function(){build()}).observe(m,{childList:true});
 W.addEventListener("load",function(){ST.refresh()});
 setTimeout(function(){ST.refresh()},1200);
 if(D.fonts&&D.fonts.ready)D.fonts.ready.then(function(){ST.refresh()});
}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",function(){setTimeout(start,0)});else setTimeout(start,0);
})();
