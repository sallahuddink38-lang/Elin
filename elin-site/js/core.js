/* ELIN core: saved settings, products, prices, cart. You do not need to edit this file. */
(function(){
const D=window.ELIN,KEY="elin_state_v3",IMG="assets/images/",VID="assets/videos/";
const base=()=>({
 settings:{wa:D.wa,phone:D.phone,email:D.email,address:D.address,ticker:D.ticker.slice(),deliveryFee:0,freeOver:0,payments:"Cash on delivery",adminEmail:"elin.dt01@gmail.com",adminSalt:"elin-store-salt-7f3a",adminHash:"04f78c0db6ecd079df811f4dc1a400b1efc6140553450dede56c367097235139",googleClientId:"",adminGoogle:"",webhook:"",fbDb:D.fbDb||"",fbKey:D.fbKey||""},
 sale:{on:false,scope:"all",pct:10,label:"Sale"},
 coupons:[{code:"WELCOME10",type:"pct",val:10,min:0,on:true}],
 bundles:[{id:"b2",name:"Pack of 2",scope:"all",qty:2,type:"pct",val:10,on:true},{id:"b3",name:"Pack of 3",scope:"all",qty:3,type:"pct",val:15,on:true,tag:"Best value"}],
 text:{},
 reviews:(D.allReviews||[]).map(r=>({n:r[0],c:r[1],r:r[2],t:r[3]})),
 products:Object.entries(D.cats).flatMap(([k,c])=>c.items.map((i,n)=>({id:i.f,cat:k,sub:i.s,name:i.n,price:i.p,disc:k=="sale"?[11,21,31,41,51][n%5]:0,rating:+(4.3+((n*7)%8)/10).toFixed(1),new:n<3,best:n>=3&&n<5,sizes:k=="footwear"?["36","37","38","39","40","41"]:[],colors:[],desc:"",imgs:[],badge:"",on:true})))
});
const S=base();
try{const o=Object.assign({},window.ELIN_STORE||{},JSON.parse(localStorage.getItem(KEY)||"{}"));
 for(const k in o)S[k]=(o[k]&&typeof o[k]=="object"&&!Array.isArray(o[k]))?Object.assign(S[k]||{},o[k]):o[k]}catch(e){}
/* browsers that still hold the OLD first-time login (info@elin.com.pk / elin123) get the new default login */
if(S.settings.adminHash=="0f998aa55d5c6a853599bc676541643c9f0af0874745185fe2fda0d952dbeaf4"&&!S.settings.adminPass){S.settings.adminEmail="elin.dt01@gmail.com";S.settings.adminHash="04f78c0db6ecd079df811f4dc1a400b1efc6140553450dede56c367097235139";S.settings.adminSalt="elin-store-salt-7f3a"}
if(!S.settings.orderEmail&&D.orderEmail)S.settings.orderEmail=D.orderEmail;if(!S.settings.webhook&&D.webhook)S.settings.webhook=D.webhook;if(!S.settings.fbDb&&D.fbDb)S.settings.fbDb=D.fbDb;if(!S.settings.fbKey&&D.fbKey)S.settings.fbKey=D.fbKey;
S.settings.ticker=(S.settings.ticker||[]).map(t=>String(t).replace(/happy weekend offer/gi,"Sale"));
if(S.sale&&/weekend/i.test(S.sale.label||""))S.sale.label="Sale";
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const money=n=>"Rs. "+Math.round(n).toLocaleString("en-US");
let tm;const toast=t=>{let e=document.getElementById("toast");if(!e){e=document.createElement("div");e.id="toast";document.body.appendChild(e)}e.textContent=t;e.className="on";clearTimeout(tm);tm=setTimeout(()=>e.className="",2800)};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast("Could not save. Browser storage is full.")}};
const wl=t=>`https://wa.me/${S.settings.wa}?text=${encodeURIComponent(t)}`;
/* try .jpg .jpeg .png .webp .svg. If none exist the label stays */
window.nx=function(el){var X=(el.dataset.x||"jpg,jpeg,png,webp,svg").split(","),t=(el.dataset.t||"")+el.src.split("?")[0].split(".").pop().toLowerCase()+",";el.dataset.t=t;var n=X.filter(function(x){return t.indexOf(x+",")<0})[0];if(n)el.src=el.dataset.b+"."+n;else(el.closest(".sl")||el).remove()};
/* browser database for uploaded photos and videos */
const DB=new Promise(r=>{try{const q=indexedDB.open("elin3",1);q.onupgradeneeded=()=>q.result.createObjectStore("m");q.onsuccess=()=>r(q.result);q.onerror=()=>r(null)}catch(e){r(null)}});
const dbx=async(mode,fn)=>{const d=await DB;if(!d)return null;return new Promise(r=>{const q=fn(d.transaction("m",mode).objectStore("m"));q.onsuccess=()=>r(q.result);q.onerror=()=>r(null)})};
const dget=k=>dbx("readonly",s=>s.get(k)),dput=(k,v)=>dbx("readwrite",s=>s.put(v,k)),ddel=k=>dbx("readwrite",s=>s.delete(k)),dkeys=()=>dbx("readonly",s=>s.getAllKeys()).then(r=>r||[]);
function resize(f,max=1400,type="image/jpeg"){return new Promise(ok=>{const im=new Image();im.onload=()=>{const sc=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=im.width*sc;c.height=im.height*sc;c.getContext("2d").drawImage(im,0,0,c.width,c.height);c.toBlob(ok,type,.85)};im.src=URL.createObjectURL(f)})}
async function hydrate(root=document){
 for(const el of root.querySelectorAll("[data-idb]")){const b=await dget("p:"+el.dataset.idb);if(b){el.src=URL.createObjectURL(b);el.classList.add("ok")}}
 for(const el of root.querySelectorAll("[data-mk]")){const b=await dget("m:"+el.dataset.mk);if(!b)continue;const u=URL.createObjectURL(b);
  if(b.type.startsWith("video")){el.querySelectorAll("video").forEach(v=>v.remove());el.insertAdjacentHTML("beforeend",`<video muted loop playsinline autoplay src="${u}"></video>`)}
  else{let i=el.querySelector("img");if(!i){i=document.createElement("img");i.alt="";el.prepend(i)}i.removeAttribute("onerror");i.src=u;i.className="ok"}}
}
/* prices */
const saleOn=p=>S.sale.on&&(S.sale.scope=="all"||S.sale.scope==p.cat);
const pct=p=>Math.max(+p.disc||0,saleOn(p)?+S.sale.pct||0:0);
const eff=p=>Math.round(p.price*(1-pct(p)/100));
/* bundle savings are only for the five main galleries. Footwear, Sale items and anything already discounted never join a bundle. */
const NOBUN=["footwear","sale"],bok=p=>!!p&&!NOBUN.includes(p.cat)&&pct(p)==0;
const prod=id=>S.products.find(p=>p.id==id);
function slides(p){
 if(p.imgs&&p.imgs.length)return p.imgs.map(s=>s.startsWith("idb:")?`<div class="sl"><img alt="" data-idb="${esc(s.slice(4))}" class="ok"></div>`:`<div class="sl"><img alt="" src="${esc(s)}" class="ok" onerror="this.closest('.sl').remove()"></div>`).join("");
 const b=IMG+p.cat+"/"+p.id;return [b,b+"-2",b+"-3"].map((x,i)=>`<div class="sl"><img alt="" src="${x}.jpg" data-b="${x}" data-x="${i?"jpg":"jpg,png,webp"}" loading="lazy" decoding="async" onerror="nx(this)" onload="this.classList.add('ok')"></div>`).join("");
}
/* cart */
let cart=[];try{cart=JSON.parse(localStorage.getItem("elin_cart")||"[]")}catch(e){}
const csave=()=>{try{localStorage.setItem("elin_cart",JSON.stringify(cart))}catch(e){}};
const cartAdd=(pid,size,color,qty,bun)=>{bun=bun||"";const l=cart.find(x=>x.pid==pid&&x.size==size&&x.color==color&&(x.bun||"")==bun);l?l.qty+=qty:cart.push(bun?{pid,size,color,qty,bun}:{pid,size,color,qty});csave()};
const cartQty=(i,d)=>{cart[i].qty+=d;if(cart[i].qty<1)cart.splice(i,1);csave()};
const cartDel=i=>{cart.splice(i,1);csave()};
const cartClear=()=>{cart.length=0;csave()};
const count=()=>cart.reduce((a,l)=>a+l.qty,0);
function calc(code){
 const lines=cart.map(l=>({l,p:prod(l.pid)})).filter(x=>x.p).map(x=>({...x,line:eff(x.p)*x.l.qty}));
 const sub=lines.reduce((a,x)=>a+x.line,0);let pool=[];
 /* bundle savings only apply to items added through the Bundles page (line.bun); normal cart items never get a pack discount */
 lines.forEach(x=>{if(!x.l.bun||!bok(x.p))return;for(let i=0;i<x.l.qty;i++)pool.push({cat:x.p.cat,price:eff(x.p),bun:x.l.bun})});
 pool.sort((a,b)=>b.price-a.price);const all=pool.slice();let save=0;const applied=[];
 for(const r of S.bundles.filter(b=>b.on).sort((a,b)=>b.qty-a.qty)){
  const sc=pool.filter(u=>u.bun==r.id&&(r.scope=="all"||u.cat==r.scope)),packs=Math.floor(sc.length/r.qty);if(!packs)continue;
  const take=sc.slice(0,packs*r.qty),tot=take.reduce((a,u)=>a+u.price,0);let d;
  if(r.type=="pct")d=tot*r.val/100;else if(r.type=="free"){d=0;for(let i=0;i<packs;i++){const g=take.slice(i*r.qty,(i+1)*r.qty);d+=g[g.length-1].price}}else d=tot-packs*r.val;
  d=Math.round(d);if(d<=0)continue;save+=d;applied.push({name:r.name,packs,d});pool=pool.filter(u=>!take.includes(u));
 }
 let nudge="";
 save=Math.round(save);const base=sub-save,c=S.coupons.find(c=>c.on&&code&&c.code.toUpperCase()==code.trim().toUpperCase());
 let cd=0,cerr="";if(code&&!c)cerr="Coupon not found";else if(c&&base<c.min)cerr="Minimum order "+money(c.min);else if(c)cd=Math.round(c.type=="pct"?base*c.val/100:Math.min(c.val,base));
 const after=base-cd,ship=(S.settings.freeOver&&after>=S.settings.freeOver)?0:(+S.settings.deliveryFee||0);
 return{nudge,lines,sub,save,applied,cd,cerr,ship,total:after+ship};
}
const PD=()=>{const o={home:{eb:"Islamabad · Timeless Beauty, Modern Style",h:"Everything you love,",em:"in one place.",s:"Handbags, footwear, hair accessories, gifts, toys and stationery, delivered to your door."},hs2:{eb:"Gifts & keepsakes",h:"Gifts they'll",em:"remember.",s:"Birthday sets, keychains, candles and keepsakes, wrapped with love and ready to give."},hs3:{eb:"New arrivals",h:"New season,",em:"new favourites.",s:"Fresh bags, hair accessories, toys and stationery land every week. See the new arrivals in motion."},reseller:{h:"Sell ELIN.",em:"Keep the profit.",s:"Join our reseller family. Pick from six galleries, share with your customers and earn on every order."}};o["ban-a"]={h:"New season",em:"arrivals.",s:"Fresh pieces picked for every mood."};o["ban-c"]={h:"ELIN",em:"",s:"Timeless beauty, modern style. Pieces made to be bold, graceful and essential for every day."};for(const k in D.cats){const c=D.cats[k];o[k]={h:c.h,em:c.em,s:c.s}}return o};
const T=k=>Object.assign({},PD()[k],S.text[k]||{});
const sl=s=>s.toLowerCase().replace(/&/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const SUBEM={bags:"in style.",hair:"& glow.",gifts:"with love.",toys:"& fun.",stationery:"& ideas.",footwear:"& comfort.",sale:"on offer."};
const TS=(k,s)=>{const n=D.cats[k].subs.find(x=>sl(x)==s)||s;return Object.assign({h:n,em:SUBEM[k],s:`Browse every ${n.toLowerCase()} piece from ELIN, chosen for quality, style and value.`},S.text[k+"/"+s]||{})};
const avg=()=>S.reviews.length?S.reviews.reduce((a,r)=>a+(+r.r||0),0)/S.reviews.length:0;
const stars=r=>`<span class="stars" style="--r:${r}" role="img" aria-label="${(+r).toFixed(1)} out of 5 stars"></span>`;
const bdesc=b=>b.type=="pct"?`${b.val}% off when you buy ${b.qty}`:b.type=="free"?`Buy ${b.qty-1}, get the cheapest one free`:`Any ${b.qty} for ${money(b.val)}`;
const bprev=b=>{const L=S.products.filter(p=>p.on&&bok(p)&&(b.scope=="all"||p.cat==b.scope));if(!L.length)return null;const av=L.reduce((a,p)=>a+eff(p),0)/L.length,n=av*b.qty,deal=b.type=="pct"?n*(1-b.val/100):b.type=="free"?av*(b.qty-1):b.val;return{normal:Math.round(n),deal:Math.round(deal),save:Math.round(n-deal)}};
/* customer data kept in this browser */
const ls=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},ws=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let user=ls("elin_user",null),wish=ls("elin_wish",[]),recent=ls("elin_recent",[]);
const hook=(type,data)=>{const u=S.settings.webhook;if(!u)return;try{fetch(u,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify(Object.assign({type,time:new Date().toISOString()},data))})}catch(e){}};
const setUser=u=>{const tok=u&&u.tok;if(u){u=Object.assign({},u);delete u.tok;u.uid=u.uid||u.email}user=u;u?ws("elin_user",u):localStorage.removeItem("elin_user");if(u){const L=ls("elin_customers",[]),i=L.findIndex(x=>(x.uid||x.email)==u.uid);i>=0?L[i]=Object.assign(L[i],u,{last:new Date().toISOString()}):L.push(Object.assign({first:new Date().toISOString()},u));ws("elin_customers",L);hook("customer",{name:u.name,email:u.email||"",uid:u.uid,phone:u.phone||"",via:u.via||"",tok:tok||""});if(liveOn()){const ck=rk(u.uid);if(!ls("elin_cs_"+ck,0))rtPut("customers",ck,{name:u.name||"",email:u.email||"",uid:u.uid,phone:u.phone||"",via:u.via||"",time:new Date().toISOString()},2).then(r=>{if(r.ok||r.denied)ws("elin_cs_"+ck,1)})}}};
const toggleWish=id=>{const i=wish.indexOf(id);i>=0?wish.splice(i,1):wish.push(id);ws("elin_wish",wish);return i<0};
const pushRecent=id=>{recent=[id,...recent.filter(x=>x!=id)].slice(0,12);ws("elin_recent",recent)};
const addOrder=(o,sent)=>{const L=ls("elin_orders",[]);L.unshift(o);ws("elin_orders",L.slice(0,200));if(!sent)hook("order",o)};
const addReseller=(r,sent)=>{const L=ls("elin_resellers",[]);L.unshift(r);ws("elin_resellers",L.slice(0,200));if(!sent)hook("reseller",r)};
/* send to the Google script and WAIT for its answer (it saves the row and emails your Gmail). ok=true only when the script says so */
const WHY={db:"",mail:""};
const anyOk=ps=>new Promise(res=>{let n=ps.length;if(!n)return res(false);ps.forEach(p=>Promise.resolve(p).then(v=>{if(v)res(true);else if(--n==0)res(false)},()=>{if(--n==0)res(false)}))});
const hookWait=async(type,data)=>{const u=S.settings.webhook;if(!u)return{off:true};const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),6000);try{const r=await fetch(u,{method:"POST",keepalive:true,headers:{"Content-Type":"text/plain;charset=utf-8"},signal:ctl.signal,body:JSON.stringify(Object.assign({type,time:new Date().toISOString()},data))});const x=(await r.text()).trim();return{ok:x=="ok"||x=="dup"}}catch(e){return{ok:false}}finally{clearTimeout(t)}};
/* send a message to the store email (orders, reseller applications). Returns true when it was sent. */
const sendMail1=async(subject,fields,auto,copy,toOverride)=>{const to=toOverride||S.settings.orderEmail||S.settings.email,cust=String((fields&&fields.email)||"").trim().toLowerCase(),ar=!!auto&&/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cust),cc=[...new Set([].concat(copy||[]).map(x=>String(x||"").trim().toLowerCase()).filter(x=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x)&&x!=String(to).toLowerCase()&&!(ar&&x==cust)))].slice(0,2).join(","),ctl=new AbortController(),tm=setTimeout(()=>ctl.abort(),12000);try{const res=await fetch("https://formsubmit.co/ajax/"+encodeURIComponent(to),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},signal:ctl.signal,body:JSON.stringify(Object.assign({_subject:subject,"Time (PKT)":new Date().toLocaleString("en-GB",{timeZone:"Asia/Karachi",day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:true}),_template:"table",_captcha:"false",_replyto:(fields&&fields.email)||""},cc?{_cc:cc}:{},ar?{_autoresponse:String(auto).slice(0,4000)}:{},fields))});const j=await res.json().catch(()=>({}));const g=res.ok&&String(j.success)!=="false";WHY.mail=g?"":("Email service: "+(j.message||("error "+res.status)).toString().slice(0,140));return g}catch(e){WHY.mail="Email service not reachable ("+(e&&e.name=="AbortError"?"timeout":"blocked or offline - open the site from https, not from a file")+")";return false}finally{clearTimeout(tm)}};
/* admin: read every device's data back from the Google Sheet */
const remote=async(key,t)=>{const u=S.settings.webhook;if(!u||!key)return null;try{const r=await fetch(u+(u.includes("?")?"&":"?")+"action=list&key="+encodeURIComponent(key)+(t?"&t="+t:""));const j=await r.json();return j&&j.ok?j:{error:(j&&j.error)||"Could not read the sheet"}}catch(e){return{error:"Could not reach Google Sheets. Check the Web app URL and that access is set to Anyone."}}};
/* customer sign-in: Google and Facebook */
const providers=()=>({g:!!S.settings.googleClientId,f:!!S.settings.facebookAppId});
let fbState=0,fbQ=[];
const fbLoad=()=>{if(fbState==2||fbState==1)return;fbState=1;window.fbAsyncInit=()=>{try{FB.init({appId:S.settings.facebookAppId,cookie:false,xfbml:false,version:"v19.0"});fbState=2;fbQ.splice(0).forEach(f=>f())}catch(e){fbState=0}};const s=document.createElement("script");s.src="https://connect.facebook.net/en_US/sdk.js";s.async=true;s.onerror=()=>{fbState=0};document.head.appendChild(s)};
function authInit(root,cb){const P=providers(),g=root.querySelector(".gb"),f=root.querySelector(".fbbtn");
 if(g&&P.g)gInit(g,(p,tok)=>{if(!p.email){toast("Google did not share an email");return}cb({name:p.name||p.email,email:p.email,uid:p.email,picture:p.picture||"",via:"google",tok})});
 if(f&&P.f){fbLoad();f.onclick=()=>{if(fbState!=2||!window.FB){toast("Facebook is still loading. Please try again in a moment.");fbLoad();return}
  FB.login(r=>{if(!r.authResponse){toast("Facebook sign-in was cancelled");return}const tok=r.authResponse.accessToken;FB.api("/me",{fields:"name,email,picture.width(96).height(96)"},p=>{if(!p||p.error||!p.id){toast("Facebook sign-in failed");return}cb({name:p.name||"Facebook customer",email:p.email||"",uid:"fb:"+p.id,picture:(p.picture&&p.picture.data&&p.picture.data.url)||"",via:"facebook",tok})})},{scope:"public_profile,email"})}}}
const jwt=t=>JSON.parse(decodeURIComponent(escape(atob(t.split(".")[1].replace(/-/g,"+").replace(/_/g,"/")))));
/* PBKDF2-SHA256 in plain JS: used when the browser has no crypto.subtle (a site opened over plain http). Gives exactly the same result. */
function pbkJS(pw,salt,it){const K=new Uint32Array([0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2]),W=new Uint32Array(64),I=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
 const rr=(x,n)=>(x>>>n)|(x<<(32-n));
 function comp(st,b){for(let t=0;t<16;t++)W[t]=b[t];for(let t=16;t<64;t++){const a=W[t-15],d=W[t-2];W[t]=(W[t-16]+(rr(a,7)^rr(a,18)^(a>>>3))+W[t-7]+(rr(d,17)^rr(d,19)^(d>>>10)))|0}
  let a=st[0],b2=st[1],c2=st[2],d2=st[3],e=st[4],f=st[5],g=st[6],h=st[7];
  for(let t=0;t<64;t++){const T1=(h+(rr(e,6)^rr(e,11)^rr(e,25))+((e&f)^(~e&g))+K[t]+W[t])|0,T2=((rr(a,2)^rr(a,13)^rr(a,22))+((a&b2)^(a&c2)^(b2&c2)))|0;h=g;g=f;f=e;e=(d2+T1)|0;d2=c2;c2=b2;b2=a;a=(T1+T2)|0}
  st[0]=(st[0]+a)|0;st[1]=(st[1]+b2)|0;st[2]=(st[2]+c2)|0;st[3]=(st[3]+d2)|0;st[4]=(st[4]+e)|0;st[5]=(st[5]+f)|0;st[6]=(st[6]+g)|0;st[7]=(st[7]+h)|0}
 const enc=new TextEncoder();
 function blk(bytes,tail){const n=bytes.length+tail,L=Math.ceil((n+9)/64)*64-tail,u=new Uint8Array(L);u.set(bytes);u[bytes.length]=0x80;const dv=new DataView(u.buffer);dv.setUint32(L-4,(n*8)>>>0);dv.setUint32(L-8,Math.floor(n*8/4294967296));return u}
 function words(u){const o=[];const dv=new DataView(u.buffer,u.byteOffset,u.length);for(let i=0;i<u.length;i+=64){const w=new Uint32Array(16);for(let j=0;j<16;j++)w[j]=dv.getUint32(i+j*4);o.push(w)}return o}
 function sha(bytes){const st=Uint32Array.from(I);words(blk(bytes,0)).forEach(w=>comp(st,w));const o=new Uint8Array(32),dv=new DataView(o.buffer);for(let i=0;i<8;i++)dv.setUint32(i*4,st[i]);return o}
 let key=enc.encode(pw);if(key.length>64)key=sha(key);const ip=new Uint8Array(64).fill(0x36),op=new Uint8Array(64).fill(0x5c);key.forEach((v,i)=>{ip[i]^=v;op[i]^=v});
 const si=Uint32Array.from(I),so=Uint32Array.from(I);comp(si,words(ip)[0]);comp(so,words(op)[0]);
 function hm(msg){const s=Uint32Array.from(si);const m=blk(msg,64);words(m).forEach(w=>comp(s,w));const inner=new Uint8Array(32),d=new DataView(inner.buffer);for(let i=0;i<8;i++)d.setUint32(i*4,s[i]);
  const s2=Uint32Array.from(so);words(blk(inner,64)).forEach(w=>comp(s2,w));const out=new Uint8Array(32),d2=new DataView(out.buffer);for(let i=0;i<8;i++)d2.setUint32(i*4,s2[i]);return out}
 const sb=enc.encode(salt),m0=new Uint8Array(sb.length+4);m0.set(sb);m0[sb.length+3]=1;let u=hm(m0);const acc=Uint8Array.from(u);
 for(let n=1;n<it;n++){u=hm(u);for(let k=0;k<32;k++)acc[k]^=u[k]}
 return [...acc].map(x=>x.toString(16).padStart(2,"0")).join("")}
const pbk=async(pw,salt)=>{try{const e=new TextEncoder(),k=await crypto.subtle.importKey("raw",e.encode(pw),"PBKDF2",false,["deriveBits"]),b=await crypto.subtle.deriveBits({name:"PBKDF2",salt:e.encode(salt),iterations:150000,hash:"SHA-256"},k,256);return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}catch(e){try{await new Promise(r=>setTimeout(r,30));return pbkJS(pw,salt,150000)}catch(x){return ""}}};
function gInit(el,cb){const id=S.settings.googleClientId;if(!id){el.innerHTML='<p class="hint2">Google sign-in is not set up yet. The store owner adds a Google Client ID in Admin > Settings.</p>';return}
 const go=()=>{google.accounts.id.initialize({client_id:id,callback:r=>{try{cb(jwt(r.credential),r.credential)}catch(e){toast("Google sign-in failed")}}});google.accounts.id.renderButton(el,{theme:"outline",size:"large",width:280,text:"continue_with"})};
 if(window.google&&google.accounts){go();return}
 const s=document.createElement("script");s.src="https://accounts.google.com/gsi/client";s.async=true;s.onload=go;s.onerror=()=>{el.innerHTML='<p class="hint2">Could not load Google sign-in. Please check your internet connection.</p>'};document.head.appendChild(s)}

/* ===== LIVE DATABASE: Firebase Realtime Database through plain web requests (no extra library) =====
   Customers write orders / reseller forms / sign-ins. The admin page listens and sees them the moment they arrive. */
const FBA="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",FBR="https://securetoken.googleapis.com/v1/token?key=",COLLS=["orders","customers","resellers"];
const rtc=()=>({db:String(S.settings.fbDb||"").trim().replace(/\/+$/,""),key:String(S.settings.fbKey||"").trim()});
const liveOn=()=>/^(https:\/\/|http:\/\/localhost)/.test(rtc().db);
const rk=x=>String(x==null?"":x).replace(/[.#$\[\]\/\s]/g,"_").slice(0,120)||"x";
const newId=pre=>pre+Date.now().toString(36).toUpperCase().slice(-7)+Math.random().toString(36).slice(2,3).toUpperCase();
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
/* write one record. Records can only be created, never changed, by the public (see database rules in Admin > Settings) */
async function rtPut(coll,key,obj,tries){tries=tries||1;if(!liveOn())return{ok:false,off:true};const c=rtc();
 for(let i=0;i<tries;i++){const ctl=new AbortController(),t=setTimeout(()=>ctl.abort(),6000);
  try{const r=await fetch(c.db+"/"+coll+"/"+encodeURIComponent(key)+".json",{method:"PUT",headers:{"Content-Type":"application/json"},signal:ctl.signal,body:JSON.stringify(Object.assign({},obj,{ts:{".sv":"timestamp"}}))});
   if(r.ok)return{ok:true};
   if(r.status==401||r.status==403){WHY.db="Database: permission denied ("+r.status+") - publish firebase-rules.json in Firebase > Realtime Database > Rules";return i>0?{ok:true,dup:true}:{ok:false,denied:true,status:r.status}}WHY.db="Database error "+r.status}catch(e){WHY.db="Database not reachable"}finally{clearTimeout(t)}
  if(i<tries-1)await sleep(900*(i+1))}
 return{ok:false}}
const liveSave=(coll,rec)=>rtPut(coll,rec.id,rec,2);
const outbox=()=>ls("elin_outbox",[]);
const liveQueue=(coll,rec)=>{const L=outbox();if(!L.some(x=>x.coll==coll&&x.key==rec.id)){L.push({coll,key:rec.id,obj:rec});ws("elin_outbox",L.slice(-50))}};
let flushing=false;
async function liveFlush(){if(flushing||!liveOn())return;flushing=true;try{for(const it of outbox()){const r=await rtPut(it.coll,it.key,it.obj,1);if(r.ok||r.denied)ws("elin_outbox",outbox().filter(x=>!(x.coll==it.coll&&x.key==it.key)));else break}}finally{flushing=false}}
/* admin side: sign in to the database, then listen */
const rts=()=>{try{return JSON.parse(sessionStorage.getItem("elin_fbs")||"null")}catch(e){return null}};
const rtMsg=m=>{m=String(m||"").split(" ")[0];return({INVALID_LOGIN_CREDENTIALS:"Wrong email or password for the live database.",EMAIL_NOT_FOUND:"This email is not a user in your Firebase project yet.",INVALID_PASSWORD:"Wrong password for the live database.",INVALID_API_KEY:"The Firebase Web API key is wrong.",API_KEY_INVALID:"The Firebase Web API key is wrong.",USER_DISABLED:"This Firebase user is disabled.",TOO_MANY_ATTEMPTS_TRY_LATER:"Too many attempts. Try again in a few minutes.",OPERATION_NOT_ALLOWED:"Turn on Email/Password sign-in in Firebase > Authentication."})[m]||("Firebase said: "+m)};
let lastErr="";
async function rtLogin(email,pw){const c=rtc();lastErr="";if(!c.key){lastErr="Add the Firebase Web API key in Settings first.";return{error:lastErr}}
 try{const r=await fetch(FBA+encodeURIComponent(c.key),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:pw,returnSecureToken:true})}),j=await r.json().catch(()=>({}));
  if(!r.ok){lastErr=rtMsg(j.error&&j.error.message);return{error:lastErr}}
  sessionStorage.setItem("elin_fbs",JSON.stringify({rt:j.refreshToken,id:j.idToken,exp:Date.now()+(+j.expiresIn||3600)*1000,email}));return{ok:true}}
 catch(e){lastErr="Could not reach Firebase. Check your internet connection.";return{error:lastErr}}}
async function rtTok(force){const s=rts();if(!s)return null;if(!force&&s.exp-60000>Date.now())return s.id;
 try{const r=await fetch(FBR+encodeURIComponent(rtc().key),{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=refresh_token&refresh_token="+encodeURIComponent(s.rt)}),j=await r.json();if(!r.ok)throw 0;
  s.id=j.id_token;s.rt=j.refresh_token||s.rt;s.exp=Date.now()+(+j.expires_in||3600)*1000;sessionStorage.setItem("elin_fbs",JSON.stringify(s));return s.id}
 catch(e){sessionStorage.removeItem("elin_fbs");return null}}
const LV={orders:{},customers:{},resellers:{}},ST={s:"off",msg:""},subs=[],srcs={},loaded={},tms={};
const notify=e=>subs.slice().forEach(f=>{try{f(e)}catch(x){}});
const setSt=(s,msg)=>{ST.s=s;ST.msg=msg||"";notify({type:"state"})};
function applyAt(root,path,val){const p=String(path||"/").split("/").filter(Boolean);if(!p.length)return(val&&typeof val=="object")?val:{};
 let o=root;for(let i=0;i<p.length-1;i++){if(!o[p[i]]||typeof o[p[i]]!="object")o[p[i]]={};o=o[p[i]]}
 const last=p[p.length-1];if(val==null)delete o[last];else o[last]=val;return root}
function closeOne(k){if(srcs[k]){try{srcs[k].close()}catch(e){}delete srcs[k]}clearTimeout(tms[k])}
function openOne(k,tok){closeOne(k);const c=rtc(),e=new EventSource(c.db+"/"+k+".json?auth="+encodeURIComponent(tok));srcs[k]=e;
 const hit=(path,data,patch)=>{const had=new Set(Object.keys(LV[k]));
  if(patch){for(const f in data)applyAt(LV[k],(path.replace(/\/$/,""))+"/"+f,data[f])}else LV[k]=applyAt(LV[k],path,data);
  const added=loaded[k]?Object.keys(LV[k]).filter(id=>!had.has(id)).map(id=>LV[k][id]):[];loaded[k]=true;notify({type:"data",kind:k,added})};
 e.addEventListener("put",ev=>{try{const d=JSON.parse(ev.data);hit(d.path,d.data,false)}catch(x){}});
 e.addEventListener("patch",ev=>{try{const d=JSON.parse(ev.data);hit(d.path,d.data,true)}catch(x){}});
 e.addEventListener("cancel",()=>{closeOne(k);setSt("denied","The database stopped sending data. Check the rules and the login email.")});
 e.addEventListener("auth_revoked",()=>reopen(k));
 e.onerror=()=>{if(!srcs[k])return;closeOne(k);if(ST.s=="live")setSt("retry","Connection lost. Reconnecting...");tms[k]=setTimeout(()=>reopen(k),4000)}}
async function reopen(k){const t=await rtTok(true);if(!t){stopLive();setSt("noauth");return}openOne(k,t)}
async function startLive(){if(!liveOn())return{error:"off"};if(ST.s=="live"||ST.s=="connecting")return{ok:true};
 setSt("connecting");const tok=await rtTok();if(!tok){setSt("noauth");return{error:"noauth"}}
 try{const r=await fetch(rtc().db+"/orders.json?shallow=true&auth="+encodeURIComponent(tok));
  if(r.status==401||r.status==403){setSt("denied","The database refused this login. Paste the rules from Admin > Settings into Firebase and check the login email is the same.");return{error:"denied"}}
  if(!r.ok){setSt("error","The database answered with error "+r.status+". Check the Database URL in Settings.");return{error:"http"}}}
 catch(e){setSt("error","Could not reach the database. Check the Database URL and your internet.");return{error:"net"}}
 COLLS.forEach(k=>{loaded[k]=false;openOne(k,tok)});setSt("live");
 clearInterval(tms.ref);tms.ref=setInterval(async()=>{const t=await rtTok(true);if(t)COLLS.forEach(k=>openOne(k,t))},45*60*1000);
 for(let i=0;i<40&&!COLLS.every(k=>loaded[k]);i++)await sleep(150);
 return{ok:true}}
function stopLive(){COLLS.forEach(closeOne);clearInterval(tms.ref);COLLS.forEach(k=>{loaded[k]=false;LV[k]={}});ST.s="off"}
function liveOut(){stopLive();sessionStorage.removeItem("elin_fbs");setSt("off")}
const liveList=k=>Object.values(LV[k]).filter(x=>x&&typeof x=="object").sort((a,b)=>(+b.ts||0)-(+a.ts||0)||String(b.time||"").localeCompare(String(a.time||"")));
const LIVE={enabled:liveOn,hasSession:()=>!!rts(),login:rtLogin,logout:liveOut,start:startLive,state:()=>ST,lastErr:()=>lastErr,list:liveList,sub:f=>{subs.length=0;subs.push(f)},unsub:()=>{subs.length=0}};
window.addEventListener("online",liveFlush);setTimeout(liveFlush,2500);
/* wake the Google script up early (cold start is the slowest part), so the real submit is fast */
let _warm=0;const warm=()=>{const u=S.settings.webhook;if(!u||Date.now()-_warm<240000)return;_warm=Date.now();try{fetch(u+(u.includes("?")?"&":"?")+"action=ping",{mode:"no-cors",cache:"no-store"}).catch(()=>{})}catch(e){}};
setTimeout(warm,2500);addEventListener("hashchange",()=>{if(/#\/(checkout|reseller)/.test(location.hash))warm()});addEventListener("pointerdown",e=>{if(e.target.closest&&e.target.closest("form"))warm()},{passive:true});
/* second try with a tiny plain message (no CC, no template): some networks block or slow the big one */
const sendMail=async(subject,fields,auto,copy,toOverride)=>{if(await sendMail1(subject,fields,auto,copy,toOverride))return true;await new Promise(r=>setTimeout(r,1200));const f=fields||{};return sendMail1(subject,{message:Object.keys(f).map(k=>k+": "+f[k]).join("\n"),email:f.email||""},auto,[],toOverride)};
/* OUTBOX: if every route fails the order is kept on the phone and sent again by itself (page open, internet back, or next visit) */
const outboxAdd=it=>{const L=ls("elin_mailbox",[]);if(!L.some(x=>x.rec&&it.rec&&x.rec.id==it.rec.id)){L.push(it);ws("elin_mailbox",L.slice(-20))}};
const outboxDel=id=>{ws("elin_mailbox",ls("elin_mailbox",[]).filter(x=>!(x.rec&&x.rec.id==id)))};
let _fl=0;const flush=async()=>{if(_fl||!navigator.onLine)return;let L=ls("elin_mailbox",[]);if(!L.length)return;_fl=1;try{for(const it of L){if(it.ts&&Date.now()-it.ts<60000)continue;let ok=false;try{if(S.settings.webhook){const x=await hookWait(it.type,it.rec);ok=!!x.ok}if(!ok&&it.mail)ok=await sendMail(...it.mail)}catch(e){}if(ok&&it.rec)outboxDel(it.rec.id)}}finally{_fl=0}};
setTimeout(flush,4000);setInterval(flush,45000);addEventListener("online",flush);
window.EL={outboxAdd,outboxDel,flush,bok,NOBUN,WHY,anyOk,hookWait,live:LIVE,liveOn,liveSave,liveQueue,rk,newId,hook,addReseller,sendMail,remote,providers,authInit,setUser,toggleWish,pushRecent,addOrder,jwt,pbk,gInit,getUser:()=>user,get wish(){return wish},get recent(){return recent},orders:()=>ls("elin_orders",[]),customers:()=>ls("elin_customers",[]),resellers:()=>ls("elin_resellers",[]),D,S,IMG,VID,KEY,esc,money,toast,save,wl,dget,dput,ddel,dkeys,resize,hydrate,eff,pct,prod,slides,cartAdd,cartQty,cartDel,cartClear,count,calc,PD,T,TS,sl,avg,stars,bdesc,bprev,get cart(){return cart}};
})();
