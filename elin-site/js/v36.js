/* ELIN v36: motion helpers (vanilla; no libraries, so the strict CSP stays as it is).
   Safe by design: if this file fails, the site looks and works exactly as before.
   Delete this file and css/v36.css to undo. */
(function(){
"use strict";
var D=document,W=window;
var RM=!!(W.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches);

/* stagger index for children of revealed grids and for the mobile menu (used by CSS delays) */
function indexKids(root){
 root.querySelectorAll(".grid,.cats,.cols,.pair,.hpan,#mmenu .mml").forEach(function(g){
  if(g._q)return;g._q=1;
  Array.prototype.forEach.call(g.children,function(c,i){c.style.setProperty("--i",Math.min(i,9))});
 });
}

/* page transition: a short fade on every route change (never delays navigation) */
var lastKey="";
function pageEnter(){
 var m=D.getElementById("m");if(!m||RM)return;
 var key=location.hash||"#/";if(key===lastKey)return;lastKey=key;
 m.classList.remove("q-enter");void m.offsetWidth;m.classList.add("q-enter");
 setTimeout(function(){m.classList.remove("q-enter")},600);
}

/* loading feedback on submit buttons while a form is being sent (restored by the site's own code or after 8 s) */
D.addEventListener("submit",function(e){
 var f=e.target;if(!f||!f.checkValidity||!f.checkValidity())return;
 var b=f.querySelector('button[type=submit],button:not([type])');if(!b||b.disabled)return;
 b.setAttribute("aria-busy","true");
 setTimeout(function(){b.removeAttribute("aria-busy")},8000);
},true);

/* mark external-looking primary buttons used as links for assistive tech: buttons that only navigate */
function a11y(root){
 root.querySelectorAll('.cb,.hav,.mmx,.mmt,.snd').forEach(function(b){
  if(!b.getAttribute("aria-label")&&!b.textContent.trim())b.setAttribute("aria-label",b.className.split(" ")[0]);
 });
 root.querySelectorAll("img:not([alt])").forEach(function(i){i.alt=""});
}


/* hero video: some phones (battery saver) refuse to autoplay; start it on the first touch, and re-check shortly after load */
function heroVideo(){
 var v=D.querySelector(".cine .hsl.on video");if(!v||!v.paused)return;
 var p=v.play();if(p&&p.catch)p.catch(function(){});
}
["pointerdown","touchstart","keydown","scroll"].forEach(function(t){D.addEventListener(t,heroVideo,{once:true,passive:true})});
setTimeout(heroVideo,1500);setTimeout(heroVideo,4000);

function start(){
 var m=D.getElementById("m");
 indexKids(D);a11y(D);lastKey=location.hash||"#/";
 W.addEventListener("hashchange",function(){pageEnter();setTimeout(function(){indexKids(D)},30)});
 if(m&&W.MutationObserver)new MutationObserver(function(){indexKids(m);a11y(m)}).observe(m,{childList:true});
 var mm=D.getElementById("mmenu");
 if(mm)indexKids(mm.parentNode||D);
 else if(W.MutationObserver)new MutationObserver(function(_,o){if(D.getElementById("mmenu")){indexKids(D);o.disconnect()}}).observe(D.body,{childList:true});
}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",start);else start();
})();
