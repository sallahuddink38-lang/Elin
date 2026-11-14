/* v48: phones - the "Watch & shop" videos glide to the next tile by themselves (2 tiles on screen at once).
   Stops for 8 s after the visitor touches it, and while any video has sound on. To undo: delete this file and its <script> in index.html. */
(function(){
 var W=window,D=document,RM=W.matchMedia("(prefers-reduced-motion:reduce)").matches,touchT=0;
 function ct(){return D.querySelector(".rvfull .ct.reels")}
 function step(){
  if(RM||D.hidden||W.innerWidth>700)return;
  var c=ct();if(!c||c.scrollWidth<=c.clientWidth+4)return;
  c._flip=1;                                   /* switch off the old whole-screen flip on phones */
  if(Date.now()-touchT<8000||c.querySelector(".vt.s"))return;
  var r=c.getBoundingClientRect();if(r.bottom<80||r.top>W.innerHeight-80)return;
  var t=c.querySelector(".vt");if(!t)return;
  var w=t.getBoundingClientRect().width+(parseFloat(getComputedStyle(c).columnGap)||0);
  var max=c.scrollWidth-c.clientWidth;
  if(c.scrollLeft>=max-4)c.scrollTo({left:0,behavior:"smooth"});
  else c.scrollTo({left:Math.min(c.scrollLeft+w,max),behavior:"smooth"});
 }
 ["touchstart","pointerdown","wheel"].forEach(function(t){D.addEventListener(t,function(e){if(e.target.closest&&e.target.closest(".rvfull .ct.reels"))touchT=Date.now()},{passive:true})});
 setInterval(step,3200);
})();
