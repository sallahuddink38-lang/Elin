/* v47: measures the hero's bottom gallery strip so the hero text never sits underneath it (phones). */
(function(){
 function fit(){document.querySelectorAll(".cine").forEach(function(h){var s=h.querySelector(".cstrip");if(s)h.style.setProperty("--sh",Math.ceil(s.getBoundingClientRect().height)+"px")})}
 var t;function soon(){clearTimeout(t);t=setTimeout(fit,60)}
 addEventListener("resize",soon);addEventListener("orientationchange",soon);addEventListener("load",soon);
 var m=document.getElementById("m");if(m&&window.MutationObserver)new MutationObserver(soon).observe(m,{childList:true});
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(soon);
 soon();
})();
