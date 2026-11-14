/* ELIN extras: category mega menu with product photos, "Our Reviews" side tab, centred-logo header helper. */
(function(){
"use strict";
var E=window.EL;if(!E)return;
var S=E.S,C=E.D.cats,esc=E.esc,$=function(s,r){return(r||document).querySelector(s)};
var wide=function(){return window.innerWidth>=900};

/* ---------- header: phone on the left so the logo sits in the exact centre ---------- */
(function(){var top=$("header .top"),logo=top&&$(".logo",top);if(!top||!logo||$(".topl",top))return;
 var d=document.createElement("div");d.className="topl";
 d.innerHTML='<small>Call &amp; WhatsApp</small><a href="tel:+'+esc(S.settings.wa||"")+'">'+esc(S.settings.phone||"")+'</a>';
 top.insertBefore(d,logo)})();

/* ---------- mega menu ---------- */
var hdr=$("header"),nav=$("#nav"),mega=document.createElement("div"),cur=null,tmo=0,ctm=0;
mega.id="mega";mega.setAttribute("role","region");mega.hidden=true;hdr.appendChild(mega);
function featured(k){var L=S.products.filter(function(p){return p.on&&p.cat==k}),out=[],seen={};
 L.sort(function(a,b){return (b.new||b.best?1:0)-(a.new||a.best?1:0)});
 L.forEach(function(p){if(out.length<3&&!seen[p.sub]){seen[p.sub]=1;out.push(p)}});
 L.forEach(function(p){if(out.length<3&&out.indexOf(p)<0)out.push(p)});return out}
function build(k){var c=C[k],cols=[],subs=c.subs,i,n=Math.ceil(subs.length/Math.ceil(subs.length/6));
 for(i=0;i<subs.length;i+=n)cols.push(subs.slice(i,i+n));
 var h=cols.map(function(col,j){return '<div class="mgc"><h3>'+(j?"&nbsp;":esc(c.t))+'</h3>'+col.map(function(s){return '<a href="#/'+k+'/'+E.sl(s)+'">'+esc(s)+'</a>'}).join("")+(j==cols.length-1?'<a class="va" href="#/'+k+'">View all</a>':"")+'</div>'}).join("");
 var f=featured(k).map(function(p){var pc=E.pct(p);return '<div class="mgp" data-pid="'+p.id+'"><button type="button" class="mgi" data-open="'+p.id+'" aria-label="'+esc(p.name)+'"><span class="mgph"><b aria-hidden="true">'+esc(p.name.trim()[0]||"")+'</b><span class="gal">'+E.slides(p)+'</span></span><span class="mgn">'+esc(p.name)+'</span><span class="mgpr">'+(pc?'<s>'+E.money(p.price)+'</s> ':"")+E.money(E.eff(p))+'</span></button><button type="button" class="mgs" data-open="'+p.id+'">Shop now</button></div>'}).join("");
 var top='<a class="mgtop" href="#/'+k+'">Open '+esc(c.t)+' page \u2192</a>';
mega.innerHTML='<div class="mgw">'+top+'<div class="mgcols">'+h+'</div><div class="mgf">'+f+'</div></div>';
 if(E.hydrate)E.hydrate(mega);
}
function openM(k,a){if(!C[k])return;clearTimeout(tmo);clearTimeout(ctm);if(cur!=k){build(k);cur=k}mega.hidden=false;
 requestAnimationFrame(function(){mega.classList.add("on")});
 var max=window.innerHeight-hdr.getBoundingClientRect().bottom-12;mega.style.maxHeight=Math.max(260,max)+"px";
 nav.querySelectorAll("a").forEach(function(x){x.removeAttribute("aria-expanded");x.classList.remove("mo")});
 if(a){a.setAttribute("aria-expanded","true");a.classList.add("mo")}}
function closeM(){clearTimeout(tmo);clearTimeout(ctm);cur=null;mega.classList.remove("on");mega.hidden=true;
 nav.querySelectorAll("a").forEach(function(x){x.removeAttribute("aria-expanded");x.classList.remove("mo")})}
function keyOf(a){var m=/^#\/([a-z0-9-]+)$/.exec(a.getAttribute("href")||"");return m&&C[m[1]]&&m[1]!="sale"?m[1]:null}
var mouseSeen=false,quiet=0;document.addEventListener("pointermove",function(e){if(e.pointerType=="mouse")mouseSeen=true},{passive:true});
function mouseUser(e){var t=e&&e.pointerType;if(t&&t!="mouse")return false;return mouseSeen||(window.matchMedia&&(matchMedia("(any-hover:hover)").matches||matchMedia("(hover:hover)").matches))}
nav.addEventListener("click",function(e){var a=e.target.closest("a");if(!a)return;var k=keyOf(a);
 if(!k){closeM();return}
 /* mouse + wide screen: hover shows the menu, a click opens the category page */
 if(wide()&&mouseUser(e)){closeM();quiet=Date.now()+700;return}
 /* phone / tablet: first tap shows the menu (it has an "Open page" link), tap again to close */
 e.preventDefault();if(cur==k&&!mega.hidden)closeM();else openM(k,a)});
nav.addEventListener("mouseover",function(e){if(!wide()||Date.now()<quiet)return;var a=e.target.closest("a"),k=a&&keyOf(a);if(k&&k!=cur){clearTimeout(tmo);tmo=setTimeout(function(){openM(k,a)},60)}else if(a&&!k)closeM()});
hdr.addEventListener("mouseleave",function(){if(!wide())return;clearTimeout(tmo);clearTimeout(ctm);ctm=setTimeout(closeM,220)});
hdr.addEventListener("mouseenter",function(){clearTimeout(ctm)});
mega.addEventListener("click",function(e){if(e.target.closest("a,[data-open]"))closeM()});
document.addEventListener("click",function(e){if(!mega.hidden&&!e.target.closest("header"))closeM()});
document.addEventListener("keydown",function(e){if(e.key=="Escape"){closeM();closeR()}});
window.addEventListener("hashchange",closeM);
window.addEventListener("resize",function(){if(!mega.hidden)closeM()});

/* ---------- "Our Reviews" side tab and panel ---------- */
var tab=document.createElement("button");tab.id="rvtab";tab.type="button";tab.setAttribute("aria-haspopup","dialog");
tab.innerHTML='<span>Our Reviews</span><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z"/></svg>';
document.body.appendChild(tab);
var pan=document.createElement("aside");pan.id="rvpanel";pan.setAttribute("role","dialog");pan.setAttribute("aria-label","Customer reviews");pan.setAttribute("aria-hidden","true");
var bg=document.createElement("div");bg.id="rvbg";document.body.appendChild(bg);document.body.appendChild(pan);
var drawn=false;
function drawR(){var R=S.reviews||[];if(!R.length){pan.innerHTML='<div class="rvh"><h2>Our Reviews</h2><button type="button" class="rvx" aria-label="Close">×</button></div><p class="rvn">No reviews yet.</p>';return}
 var a=E.avg();
 pan.innerHTML='<div class="rvh"><div><h2>Our <em>Reviews</em></h2><div class="rva"><b>'+a.toFixed(1)+'</b>'+E.stars(a)+'<span>'+R.length+' reviews</span></div></div><button type="button" class="rvx" aria-label="Close">×</button></div><div class="rvl">'+
  R.slice(0,24).map(function(r,i){return '<figure class="rvi"><span class="rph" data-ri="'+i+'"></span><div>'+E.stars(r.r)+'<p>'+esc(r.t)+'</p><figcaption><b>'+esc(r.n)+'</b> · '+esc(r.c)+'</figcaption></div></figure>'}).join("")+'</div>';
 if(window.ELX)window.ELX.fillReviewPics(pan)}
function openR(){if(!drawn){drawR();drawn=true}pan.classList.add("on");bg.classList.add("on");pan.setAttribute("aria-hidden","false");tab.setAttribute("aria-expanded","true");var x=$(".rvx",pan);if(x)x.focus()}
function closeR(){pan.classList.remove("on");bg.classList.remove("on");pan.setAttribute("aria-hidden","true");tab.removeAttribute("aria-expanded")}
tab.addEventListener("click",function(){pan.classList.contains("on")?closeR():openR()});
bg.addEventListener("click",closeR);
pan.addEventListener("click",function(e){if(e.target.closest(".rvx"))closeR()});
/* the admin page has its own layout: hide the shop extras there */
function sync(){var adm=/^#\/admin/.test(location.hash)||/admin\.html/.test(location.pathname);tab.style.display=adm?"none":"";if(adm){closeR();closeM()}}
window.addEventListener("hashchange",sync);sync();

/* ---------- hover over any product photo: its photos play one after another ---------- */
var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
function slidesOf(b){var g=b.querySelector(".gal");return g?{g:g,n:g.querySelectorAll(".sl").length}:null}
function startC(b){if(b._t)return;var o=slidesOf(b);if(!o||o.n<2)return;var i=0;
 var step=function(){var q=slidesOf(b);if(!q||q.n<2)return;i=(i+1)%q.n;q.g.scrollTo({left:i*q.g.clientWidth,behavior:(i==0||RM)?"auto":"smooth"})};
 setTimeout(function(){if(b._h)step()},120);b._h=1;b._t=setInterval(step,1000)}
function stopC(b){b._h=0;if(b._t){clearInterval(b._t);b._t=0}var g=b.querySelector(".gal");if(g)g.scrollTo({left:0,behavior:"auto"})}
document.addEventListener("mouseover",function(e){var b=e.target.closest&&e.target.closest(".slot.pic,.mgph");if(b&&!b.contains(e.relatedTarget))startC(b)});
document.addEventListener("mouseout",function(e){var b=e.target.closest&&e.target.closest(".slot.pic,.mgph");if(b&&!b.contains(e.relatedTarget))stopC(b)});

/* ---------- phone menu: full list with sub-categories ---------- */
(function(){var mb=document.createElement("button");mb.type="button";mb.className="mmb";mb.id="mmb";mb.setAttribute("aria-label","Open menu");mb.setAttribute("aria-controls","mmenu");
 mb.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg><span>Menu</span>';
 nav.parentNode.insertBefore(mb,nav);
 var mm=document.createElement("aside");mm.id="mmenu";mm.setAttribute("aria-label","Menu");mm.setAttribute("aria-hidden","true");
 var mbg=document.createElement("div");mbg.id="mmbg";document.body.appendChild(mbg);document.body.appendChild(mm);
 var keys=Object.keys(C);
 mm.innerHTML='<div class="mmh"><b>Menu</b><button type="button" class="mmx" aria-label="Close menu">\u00d7</button></div><div class="mml"><a class="mmr" href="#/">Home</a>'+
  keys.map(function(k){var c=C[k];return '<div class="mmc'+(k=="sale"?" sale":"")+'"><div class="mmr2"><a href="#/'+k+'">'+esc(c.t)+'</a>'+(k=="sale"?"":'<button type="button" class="mmt" aria-expanded="false" aria-label="Show '+esc(c.t)+' collections">+</button>')+'</div>'+
   (k=="sale"?"":'<div class="mms" hidden>'+c.subs.map(function(s){return '<a href="#/'+k+'/'+E.sl(s)+'">'+esc(s)+'</a>'}).join("")+'<a class="va" href="#/'+k+'">View all '+esc(c.t)+'</a></div>')+'</div>'}).join("")+
  '<a class="mmr blink" href="#/bundles">Bundle Offers</a><a class="mmr blink" href="#/reseller">Wholesale &amp; Bulk Orders</a><a class="mmr wa" href="https://wa.me/'+esc(S.settings.wa||"")+'" target="_blank" rel="noopener">WhatsApp: '+esc(S.settings.phone||"")+'</a></div>';
 function op(){mm.classList.add("on");mbg.classList.add("on");mm.setAttribute("aria-hidden","false");mb.setAttribute("aria-expanded","true");document.body.classList.add("mmo")}
 function cl(){mm.classList.remove("on");mbg.classList.remove("on");mm.setAttribute("aria-hidden","true");mb.setAttribute("aria-expanded","false");document.body.classList.remove("mmo")}
 mb.addEventListener("click",function(){mm.classList.contains("on")?cl():op()});mbg.addEventListener("click",cl);
 mm.addEventListener("click",function(e){if(e.target.closest(".mmx")){cl();return}
  var t=e.target.closest(".mmt");if(t){var box=t.closest(".mmc").querySelector(".mms"),open=box.hidden;box.hidden=!open;t.setAttribute("aria-expanded",open?"true":"false");t.textContent=open?"\u2212":"+";return}
  if(e.target.closest("a"))cl()});
 window.addEventListener("hashchange",cl);window.addEventListener("resize",function(){if(innerWidth>=900)cl()});
 document.addEventListener("keydown",function(e){if(e.key=="Escape")cl()});
})();
})();
