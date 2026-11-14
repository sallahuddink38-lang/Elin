/* ELIN Wholesale & Bulk Orders page: form, thank-you message and the admin editor for it.
   Everything the visitor reads or fills in comes from one settings object (S.wform).
   Edit it in Admin > Wholesale Form. You do not need to change this file. */
(function(){
const E=window.EL,S=E.S,esc=E.esc;
const PROV=["Punjab","Sindh","Khyber Pakhtunkhwa","Balochistan","Islamabad Capital Territory","Azad Jammu & Kashmir","Gilgit-Baltistan","Other"];
const PHONE=/^[+0-9][0-9 \-]{8,16}$/,MAIL=/^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const F=(id,l,type,o={})=>Object.assign({id,l,type,w:"half",ph:"",help:"",req:false,on:true,opts:[]},o);
const DEF=()=>({v:1,
 hero:{eb:"ELIN · Wholesale Partnerships",h:"Your Business.",em:"Our Products.",s:"Source quality products from ELIN for your retail store, online business or distribution network. Explore our collections, enquire about wholesale pricing and grow your business with a trusted product partner.",b1:"Apply for Wholesale",b2:"Explore Collections"},
 how:{h:"How Wholesale Partnership",em:"Works",steps:[
  {t:"Apply for Partnership",d:"Complete the form with your business details and wholesale requirements."},
  {t:"Explore Products",d:"Choose from bags, footwear, hair accessories, gifts, toys and stationery."},
  {t:"Get Wholesale Pricing",d:"Discuss bulk quantities, product availability and wholesale rates with our team."},
  {t:"Place Your Order",d:"Confirm your order, complete payment and receive your products at your delivery address."}]},
 form:{eb:"ELIN Wholesale Partner Programme",h:"Apply to Become a",em:"Wholesale Partner",s:"Partner with ELIN to source quality products in bulk for your shop, online store or retail business. Submit your application to discuss wholesale pricing, minimum order quantities and business purchasing options.",
  bul:["Wholesale pricing for bulk orders","Multiple product categories","Dedicated business support","Repeat ordering opportunities"],
  submit:"Submit Wholesale Application",
  consents:[{t:"I confirm that the business and contact information provided is accurate.",req:true,on:true},{t:"I agree to be contacted by ELIN regarding wholesale pricing, product availability and bulk purchase opportunities.",req:true,on:true}],
  sections:[
   {id:"s1",t:"Business Contact Details",fields:[
    F("name","Full Name","text",{k:"name",ph:"Enter your full name",req:true}),
    F("email","Business Email Address","email",{k:"em",ph:"Enter your business email",req:true}),
    F("phone","Contact Number","tel",{k:"ph",ph:"Enter your mobile number",req:true}),
    F("whatsapp","WhatsApp Number","tel",{k:"wa",ph:"Enter your WhatsApp number",req:true}),
    F("city","City","text",{k:"city",ph:"Enter your city",req:true}),
    F("province","Province / Region","select",{k:"prov",ph:"Select your province or region",req:true,opts:PROV.slice()})]},
   {id:"s2",t:"Business Information",fields:[
    F("bname","Business / Shop Name","text",{k:"bn",w:"full",ph:"Enter your registered or trading business name",req:true}),
    F("btype","Business Type","check",{k:"bt",w:"full",req:true,help:"Select all that apply.",opts:["Retail Shop","Online Store","E-commerce Seller","Distributor","Wholesaler","Boutique / Fashion Store","Gift Shop","Other"]}),
    F("reg","Business Registration Status","radio",{k:"reg",w:"full",opts:["Registered Business","Unregistered Business","Registration in Progress"]}),
    F("web","Business Website or Social Media Page","text",{k:"web",w:"full",ph:"instagram.com/yourbusiness",help:"Enter your website, Instagram, Facebook or other business profile link."}),
    F("age","How long have you been operating?","radio",{k:"age",w:"full",opts:["New Business","Less than 1 Year","1–3 Years","3+ Years"]})]},
   {id:"s3",t:"Products & Bulk Order Requirements",fields:[
    F("cats","Which ELIN product categories are you interested in?","check",{k:"cats",w:"full",req:true,help:"Select all that apply.",opts:["Bags","Hair Accessories","Gifts","Toys & Kids Products","Stationery","Footwear","Other"]}),
    F("qty","Estimated Quantity Per Order","radio",{k:"qty",w:"full",req:true,opts:["10–25 Pieces","26–50 Pieces","51–100 Pieces","101–250 Pieces","250+ Pieces"]}),
    F("freq","Expected Purchasing Frequency","radio",{k:"freq",w:"full",req:true,opts:["One-Time Purchase","Weekly","Every Two Weeks","Monthly","As Required"]}),
    F("budget","Expected Monthly Purchasing Budget","radio",{k:"budget",w:"full",req:true,opts:["Under PKR 25,000","PKR 25,000–50,000","PKR 50,001–100,000","PKR 100,001–250,000","PKR 250,000+"]}),
    F("want","Specific Products or Designs","textarea",{k:"want",w:"full",ph:"Mention the products, colours, sizes, designs or quantities you want to purchase."})]},
   {id:"s4",t:"Delivery & Payment Preferences",fields:[
    F("daddr","Delivery City / Address","textarea",{k:"addr",w:"full",ph:"Enter your business delivery location.",req:true}),
    F("pay","Preferred Payment Method","radio",{k:"pay",w:"full",req:true,opts:["Bank Transfer","JazzCash","Easypaisa","Other, subject to approval"]}),
    F("ppref","Order Payment Preference","radio",{k:"ppref",w:"full",opts:["Full Advance Payment","Discuss Payment Terms with ELIN"]}),
    F("quote","Do you require a quotation before placing an order?","radio",{k:"quote",w:"full",opts:["Yes","No"]})]}]},
 next:{h:"What Happens Next?",t:"Our team will review your application and contact you via WhatsApp or email to discuss product availability, wholesale rates, minimum order quantities, delivery charges and payment terms.",note:"Submitting this application does not guarantee wholesale approval or credit facilities.",ah:"Need Assistance?",at:"Contact the ELIN team for wholesale enquiries, bulk pricing and business partnerships.",ab:"Chat on WhatsApp"},
 thanks:{h:"Thank You for Your Application!",lines:["Your wholesale partnership application has been submitted successfully.","Thank you for your interest in partnering with ELIN. Our team will review your business details and contact you via WhatsApp or email to discuss wholesale pricing, bulk orders and next steps.","We look forward to doing business with you!"],sig:"— Team ELIN",b1:"Back to home",b2:"Explore Collections"}
});
/* the saved copy always wins; missing pieces fall back to the defaults so an old save never breaks the page */
const cfg=()=>{const d=DEF(),s=S.wform;if(!s||s.v!==1)return d;const o=Object.assign({},d,s);["hero","how","form","next","thanks"].forEach(k=>o[k]=Object.assign({},d[k],s[k]||{}));try{o.form.sections.forEach(x=>x.fields.forEach(f=>{if(f.id=="btype"&&f.type=="radio"){f.type="check";if(!f.help)f.help="Select all that apply."}}))}catch(e){}return o};
const edit=()=>{if(!S.wform||S.wform.v!==1)S.wform=DEF();return S.wform};
const val=f=>f.type=="check";
const nm=f=>"f_"+f.id;
const ac={name:"name",email:"email",phone:"tel",whatsapp:"tel",city:"address-level2",bname:"organization"};
const lab=f=>`${esc(f.l)}${f.req?'<b class="rq" aria-hidden="true"> *</b>':""}`;
function field(f){
 const w=f.w=="full"?" full":"",h=f.help?`<small class="fh" id="h_${f.id}">${esc(f.help)}</small>`:"",err=`<small class="fe" id="e_${f.id}" role="alert" hidden></small>`,d=`aria-describedby="${f.help?"h_"+f.id+" ":""}e_${f.id}"`,rq=f.req?" required":"";
 if(f.type=="radio"||f.type=="check"){const t=f.type=="check"?"checkbox":"radio";
  return `<div class="wf full g${w}" data-f="${esc(f.id)}" role="${t=="radio"?"radiogroup":"group"}" aria-labelledby="l_${f.id}"><span class="xl" id="l_${f.id}">${lab(f)}</span>${h}<span class="pills">${f.opts.map(o=>`<label class="pill"><input type="${t}" name="${nm(f)}" value="${esc(o)}"><span>${esc(o)}</span></label>`).join("")}</span>${err}</div>`}
 let c;
 if(f.type=="textarea")c=`<textarea name="${nm(f)}" rows="3" placeholder="${esc(f.ph)}" ${d}${rq}></textarea>`;
 else if(f.type=="select")c=`<select name="${nm(f)}" ${d}${rq}><option value="">${esc(f.ph||"Select")}</option>${f.opts.map(o=>`<option>${esc(o)}</option>`).join("")}</select>`;
 else c=`<input name="${nm(f)}" type="${f.type=="email"?"email":f.type=="tel"?"tel":"text"}" placeholder="${esc(f.ph)}" autocomplete="${ac[f.id]||"off"}"${f.type=="tel"?' inputmode="tel"':""} ${d}${rq}>`;
 return `<div class="wf${w}" data-f="${esc(f.id)}"><label><span class="xl">${lab(f)}</span>${c}</label>${h}${err}</div>`}
function section(s,i){const fs=s.fields.filter(f=>f.on!==false);if(!fs.length)return"";
 return `<fieldset><legend><i>${String(i+1).padStart(2,"0")}</i>${esc(s.t)}</legend><div class="wgrid">${fs.map(field).join("")}</div></fieldset>`}
function render(vidHtml){
 const c=cfg(),n=c.form.sections.filter(s=>s.fields.some(f=>f.on!==false)).length,cons=c.form.consents.filter(x=>x.on!==false&&x.t.trim());
 const hero=`<section class="hero h-full mini ws-hero"><div class="ht"><p class="eb">${esc(c.hero.eb)}</p><h1>${esc(c.hero.h)} <em>${esc(c.hero.em)}</em></h1><p class="sub">${esc(c.hero.s)}</p><div class="hbtns"><a class="btn" href="#/reseller" data-ws-go="join">${esc(c.hero.b1)}</a><a class="btn o" href="#/bags">${esc(c.hero.b2)}</a></div></div>${vidHtml||""}</section>`;
 const how=`<section class="rv wshow"><div class="sh"><h2>${esc(c.how.h)} <em>${esc(c.how.em)}</em></h2></div><div class="wsteps">${c.how.steps.map((x,i)=>`<div class="wst"><span class="num">${String(i+1).padStart(2,"0")}</span><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></div>`).join("")}</div></section>`;
 const form=`<section id="join" class="rv wsform"><div id="rwrap"><form class="form xf wsf" id="rf" novalidate autocomplete="on">
  <div class="xh"><p class="xe">${esc(c.form.eb)}</p><h3>${esc(c.form.h)} <em>${esc(c.form.em)}</em></h3><p class="fs">${esc(c.form.s)}</p><ul class="xk">${c.form.bul.map(b=>`<li>${esc(b)}</li>`).join("")}</ul></div>
  ${c.form.sections.map(section).join("")}
  ${cons.length?`<fieldset><legend><i>${String(n+1).padStart(2,"0")}</i>Final Confirmation</legend><div class="wcons">${cons.map((x,i)=>`<div class="wf full" data-f="consent${i}"><label class="chk wc"><input type="checkbox" name="consent${i}" data-req="${x.req!==false?1:0}"><span>${esc(x.t)}</span></label><small class="fe" id="e_consent${i}" role="alert" hidden></small></div>`).join("")}</div></fieldset>`:""}
  <div class="wsub"><input class="hpot" type="text" name="company_site" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="btn" type="submit">${esc(c.form.submit)}</button><p class="fs err" id="wmsg" role="alert" hidden></p></div>
 </form></div></section>`;
 const phone=esc(S.settings.phone||""),next=`<section class="rv wsnext"><div class="wn"><div class="wn1"><h3>${esc(c.next.h)}</h3><p>${esc(c.next.t)}</p><p class="wnote">${esc(c.next.note)}</p></div><div class="wn2"><h3>${esc(c.next.ah)}</h3><p>${esc(c.next.at)}</p><a class="btn" target="_blank" rel="noopener" href="${esc(E.wl("Hello ELIN, I have a wholesale / bulk order enquiry."))}">${esc(c.next.ab)}</a>${phone?`<small>${phone}</small>`:""}</div></div></section>`;
 return hero+how+form+next}
function thanks(id){const c=cfg().thanks;
 return `<div class="form xf wsf wsthanks" tabindex="-1" id="wthx" role="status"><div class="wtk"><span class="wck" aria-hidden="true"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><h3>${esc(c.h)}</h3>${c.lines.map(l=>`<p>${esc(l)}</p>`).join("")}<p class="wsig">${esc(c.sig)}</p><p class="wref">Application reference: <b>${esc(id)}</b></p><div class="hbtns"><a class="btn" href="#/">${esc(c.b1)}</a><a class="btn o" href="#/bags">${esc(c.b2)}</a></div></div></div>`}
/* read the filled form into answers, in the order of the form */
function collect(f,c){const out=[],R={};
 c.form.sections.forEach(s=>s.fields.filter(x=>x.on!==false).forEach(x=>{let v;
  if(x.type=="check")v=[...f.querySelectorAll(`[name="${nm(x)}"]:checked`)].map(i=>i.value).join(", ");
  else if(x.type=="radio"){const i=f.querySelector(`[name="${nm(x)}"]:checked`);v=i?i.value:""}
  else v=(f.elements[nm(x)]||{}).value||"";
  v=String(v).trim();out.push({f:x,v});if(x.k)R[x.k]=v}));
 return{out,R}}
function setErr(f,id,msg){const w=f.querySelector(`[data-f="${id}"]`),e=f.querySelector("#e_"+id);if(!w||!e)return;w.classList.toggle("bad",!!msg);e.hidden=!msg;e.textContent=msg||""}
function validate(f,c){let first=null;const bad=(id,m)=>{setErr(f,id,m);if(m&&!first)first=id};
 const {out}=collect(f,c);
 out.forEach(({f:x,v})=>{let m="";const lb=x.l;
  if(x.req&&!v)m=(x.type=="radio"||x.type=="check"||x.type=="select")?`Please choose an option for "${lb}".`:`Please fill in "${lb}".`;
  else if(v&&x.type=="email"&&!MAIL.test(v))m="Please enter a valid email address, for example name@business.com.";
  else if(v&&x.type=="tel"&&!PHONE.test(v))m="Please enter a valid phone number, for example 0300 1234567.";
  bad(x.id,m)});
 f.querySelectorAll("[name^=consent]").forEach(i=>{const id=i.name;bad(id,i.dataset.req=="1"&&!i.checked?"Please tick this box to continue.":"")});
 return first}
function wire(root,m){
 const f=root.querySelector("#rf");if(!f)return;
 f.addEventListener("input",ev=>{const w=ev.target.closest("[data-f]");if(w&&w.classList.contains("bad"))setErr(f,w.dataset.f,"")});
 f.addEventListener("change",ev=>{const w=ev.target.closest("[data-f]");if(w&&w.classList.contains("bad"))setErr(f,w.dataset.f,"")});
 f.addEventListener("submit",ev=>{ev.preventDefault();const c=cfg(),btn=f.querySelector("button[type=submit]"),msg=f.querySelector("#wmsg"),label=btn.textContent;
  msg.hidden=true;
  if(f.company_site.value){root.querySelector("#rwrap").innerHTML=thanks("RS-"+Date.now().toString(36).toUpperCase());return}   /* spam robots fill the hidden box: pretend it worked */
  const first=validate(f,c);
  if(first){const w=f.querySelector(`[data-f="${first}"]`);msg.hidden=false;msg.textContent="Please correct the highlighted fields and submit again.";try{w.scrollIntoView({block:"center",behavior:"smooth"});const i=w.querySelector("input,select,textarea");i&&i.focus({preventScroll:true})}catch(x){}return}
  const {out,R:K}=collect(f,c),me=E.getUser(),id=E.newId("RS");
  const details=out.filter(o=>o.v).map(o=>o.f.l+": "+o.v).join("\n");
  const R=Object.assign({id,time:new Date().toISOString(),lemail:(me&&me.email)||"",fn:K.name||"",ln:"",city:"",details,cemail:me?(me.uid||me.email):""},K);
  R.vol=[K.qty,K.freq].filter(Boolean).join(" · ");R.pm=K.pay||"";R.how=K.ppref||"";
  btn.disabled=true;btn.textContent="Sending...";
  const rMail=MAIL.test(K.em||"")?K.em:(me&&MAIL.test(me.email||"")?me.email:"");
  const fields={"Application":id};out.forEach(o=>{fields[o.f.l]=o.v||"-"});fields.email=rMail;fields["Signed in as"]=me?`${me.name} (${me.via}, ${me.email||me.uid})`:"not signed in";
  const auto=c.thanks.lines.join("\n\n")+`\n\nApplication reference: ${id}\n${c.thanks.sig}`;
  const mailArgs=()=>[`New wholesale application ${id} - ${K.bn||K.name||""}`.trim(),fields,auto,[rMail,me&&me.email]];const mailF=()=>E.sendMail(...mailArgs());
  const job=(async()=>{try{
   const fbP=E.liveOn()?E.liveSave("resellers",R).then(x=>{if(!x.ok&&!x.denied)E.liveQueue("resellers",R);return !!x.ok}):Promise.resolve(false);
   const shP=S.settings.webhook?E.hookWait("reseller",R).then(x=>{R._sent=!!x.ok;return x.ok||mailF()}):mailF();
   shP.then(v=>{if(v)E.outboxDel(R.id)},()=>{});
   return await E.anyOk([fbP,shP])}catch(x){return false}})();
  E.outboxAdd({type:"reseller",rec:R,mail:mailArgs(),ts:Date.now()});
  Promise.race([job,new Promise(r=>setTimeout(()=>r("slow"),1500))]).then(ok=>{
   if(ok===false){E.outboxDel(R.id);btn.disabled=false;btn.textContent=label;msg.hidden=false;msg.innerHTML=esc("We could not send your application. Please check your internet connection and try again. ["+(E.WHY.mail||E.WHY.db||"unknown")+"] ")+`or <a href="${esc(E.wl("Wholesale application "+id+"\n\n"+details))}" target="_blank" rel="noopener">send it on WhatsApp</a>.`;return}
   {const sent=R._sent||!!S.settings.webhook;delete R._sent;E.addReseller(R,sent)}
   root.querySelector("#rwrap").innerHTML=thanks(id);const t=root.querySelector("#wthx");try{t.scrollIntoView({block:"start",behavior:"smooth"});t.focus({preventScroll:true})}catch(x){}})});
 if(!root._wsgo){root._wsgo=1;root.addEventListener("click",ev=>{const a=ev.target.closest("[data-ws-go]");if(!a)return;ev.preventDefault();const t=root.querySelector("#"+a.dataset.wsGo);if(t)t.scrollIntoView({behavior:"smooth",block:"start"})})}}

/* ================= admin editor ================= */
const TYPES=[["text","Short text"],["email","Email"],["tel","Phone number"],["textarea","Long text"],["select","Dropdown"],["radio","Choose one (buttons)"],["check","Choose many (buttons)"]];
const g=(o,p)=>p.split(".").reduce((a,k)=>a==null?a:a[k],o);
const w=(p,v)=>`data-w="${p}" value="${esc(v)}"`;
const inp=(l,p,v,cls="")=>`<label class="${cls}">${l}<input ${w(p,v)}></label>`;
const area=(l,p,v,rows=3)=>`<label class="wide">${l}<textarea rows="${rows}" data-w="${p}" data-t="l">${esc(Array.isArray(v)?v.join("\n"):v)}</textarea></label>`;
const txt=(l,p,v,rows=3)=>`<label class="wide">${l}<textarea rows="${rows}" data-w="${p}">${esc(v)}</textarea></label>`;
function adminHTML(){const c=cfg(),custom=S.wform&&S.wform.v===1;
 const fr=(s,si)=>s.fields.map((f,fi)=>{const p=`form.sections.${si}.fields.${fi}`,opt=["select","radio","check"].includes(f.type);
  return `<div class="wfe${f.on===false?" off":""}"><div class="wfh"><label class="chk"><input type="checkbox" data-w="${p}.on" ${f.on===false?"":"checked"}><b>${esc(f.l)||"(no name)"}</b></label><span class="wfa"><button class="btn o sm" data-wm="f:${si}:${fi}:-1" aria-label="Move up">↑</button><button class="btn o sm" data-wm="f:${si}:${fi}:1" aria-label="Move down">↓</button><button class="btn o sm dl" data-wdel="f:${si}:${fi}">Delete</button></span></div>
  <div class="rowf">${inp("Question",p+".l",f.l,"wide")}<label>Type<select data-w="${p}.type" data-redraw="1">${TYPES.map(t=>`<option value="${t[0]}"${f.type==t[0]?" selected":""}>${t[1]}</option>`).join("")}</select></label><label>Width<select data-w="${p}.w"><option value="half"${f.w!="full"?" selected":""}>Half</option><option value="full"${f.w=="full"?" selected":""}>Full</option></select></label><label class="chk"><input type="checkbox" data-w="${p}.req" ${f.req?"checked":""}> Required</label></div>
  <div class="rowf">${opt&&f.type!="select"?"":inp("Placeholder (grey hint text)",p+".ph",f.ph,"wide")}${inp("Small help text under the question",p+".help",f.help,"wide")}</div>
  ${opt?`<div class="rowf">${area("Options (one per line)",p+".opts",f.opts,Math.min(8,Math.max(3,f.opts.length)))}</div>`:""}</div>`}).join("");
 return `<p class="hint">Everything on the <b>Wholesale &amp; Bulk Orders</b> page is edited here: headings, steps, every question, the answer options, the tick boxes and the thank-you message. Changes show on the website at once in this browser. To publish them for everyone use <b>Publish &amp; Backup</b>. ${custom?"":"<b>Showing the standard ELIN wording. Change anything below to start customising.</b>"}</p>
 <div class="acts"><a class="btn o" href="index.html#/reseller" target="_blank" rel="noopener">Preview page</a>${custom?'<button class="btn o dl" data-wreset>Restore standard wording</button>':""}</div>
 <div class="card"><h3>1. Top banner</h3><div class="rowf">${inp("Small line above heading","hero.eb",c.hero.eb)}${inp("Heading","hero.h",c.hero.h)}${inp("Stylish ending of heading","hero.em",c.hero.em)}</div><div class="rowf">${txt("Paragraph","hero.s",c.hero.s)}</div><div class="rowf">${inp("Main button (goes to the form)","hero.b1",c.hero.b1)}${inp("Second button (goes to Bags)","hero.b2",c.hero.b2)}</div><p class="hint">The banner video: Photos &amp; Videos &gt; Reseller hero video.</p></div>
 <div class="card"><h3>2. How it works (steps)</h3><div class="rowf">${inp("Heading","how.h",c.how.h)}${inp("Stylish word","how.em",c.how.em)}</div>${c.how.steps.map((s,i)=>`<div class="rowf">${inp("Step "+(i+1)+" title",`how.steps.${i}.t`,s.t)}${inp("Description",`how.steps.${i}.d`,s.d,"wide")}<button class="btn o sm dl" data-wdel="st:${i}">Delete</button></div>`).join("")}<button class="btn o sm" data-wadd="st">+ Add step</button></div>
 <div class="card"><h3>3. Form heading</h3><div class="rowf">${inp("Small line","form.eb",c.form.eb)}${inp("Heading","form.h",c.form.h)}${inp("Stylish ending","form.em",c.form.em)}</div><div class="rowf">${txt("Paragraph","form.s",c.form.s)}</div><div class="rowf">${area("Tick-list under the heading (one per line)","form.bul",c.form.bul,4)}</div></div>
 ${c.form.sections.map((s,si)=>`<div class="card"><div class="wfh"><h3>Form section ${si+1}</h3><span class="wfa"><button class="btn o sm" data-wm="s:${si}:0:-1">↑</button><button class="btn o sm" data-wm="s:${si}:0:1">↓</button><button class="btn o sm dl" data-wdel="s:${si}">Delete section</button></span></div><div class="rowf">${inp("Section title",`form.sections.${si}.t`,s.t,"wide")}</div>${fr(s,si)}<button class="btn o sm" data-wadd="f:${si}">+ Add a question to this section</button></div>`).join("")}
 <div class="acts"><button class="btn o" data-wadd="s">+ Add a new section</button></div>
 <div class="card"><h3>4. Final confirmation and button</h3><p class="hint">Tick boxes at the end of the form. Untick "Show" to hide one.</p>${c.form.consents.map((x,i)=>`<div class="rowf"><label class="chk"><input type="checkbox" data-w="form.consents.${i}.on" ${x.on===false?"":"checked"}> Show</label><label class="chk"><input type="checkbox" data-w="form.consents.${i}.req" ${x.req===false?"":"checked"}> Required</label>${inp("Text",`form.consents.${i}.t`,x.t,"wide")}<button class="btn o sm dl" data-wdel="c:${i}">Delete</button></div>`).join("")}<button class="btn o sm" data-wadd="c">+ Add a tick box</button><div class="rowf">${inp("Submit button text","form.submit",c.form.submit)}</div></div>
 <div class="card"><h3>5. Below the form</h3><div class="rowf">${inp("Left heading","next.h",c.next.h)}${inp("Right heading","next.ah",c.next.ah)}</div><div class="rowf">${txt("Left text","next.t",c.next.t)}${txt("Right text","next.at",c.next.at)}</div><div class="rowf">${inp("Small note under left text","next.note",c.next.note,"wide")}${inp("WhatsApp button text","next.ab",c.next.ab)}</div></div>
 <div class="card"><h3>6. Thank-you message (shown after the form is sent)</h3><div class="rowf">${inp("Heading","thanks.h",c.thanks.h,"wide")}</div><div class="rowf">${area("Message (one paragraph per line)","thanks.lines",c.thanks.lines,5)}</div><div class="rowf">${inp("Sign-off","thanks.sig",c.thanks.sig)}${inp("Button 1 (goes home)","thanks.b1",c.thanks.b1)}${inp("Button 2 (goes to Bags)","thanks.b2",c.thanks.b2)}</div><p class="hint">Applications arrive in <b>Wholesale Applications</b> and in the store email (Admin &gt; Settings).</p></div>`}
const blank=()=>({id:"f"+Date.now().toString(36),l:"New question",type:"text",w:"full",ph:"",help:"",req:false,on:true,opts:[]});
const move=(a,i,d)=>{const j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]]};
function bindAdmin(root,draw){
 if(root._ws)return;root._ws=1;
 root.addEventListener("change",ev=>{const t=ev.target,p=t.dataset&&t.dataset.w;if(!p)return;const c=edit();let v=t.type=="checkbox"?t.checked:t.value;
  if(t.dataset.t=="l")v=v.split("\n").map(s=>s.trim()).filter(Boolean);
  const a=p.split("."),l=a.pop(),o=a.reduce((x,k)=>x[k],c);
  if(t.type=="checkbox"&&l=="on")v=t.checked;
  o[l]=v;E.save();E.toast("Saved");if(t.dataset.redraw||l=="on"||l=="l"&&a.includes("fields"))draw()});
 root.addEventListener("click",ev=>{const b=ev.target.closest("[data-wm],[data-wdel],[data-wadd],[data-wreset]");if(!b)return;
  if(b.dataset.wreset!==undefined){if(confirm("Go back to the standard ELIN wording and questions? Your edits to this page will be removed.")){delete S.wform;E.save();draw()}return}
  const c=edit();
  if(b.dataset.wm){const[k,si,fi,d]=b.dataset.wm.split(":");if(k=="s")move(c.form.sections,+si,+d);else move(c.form.sections[+si].fields,+fi,+d)}
  else if(b.dataset.wdel){const[k,i,j]=b.dataset.wdel.split(":");
   if(k=="f"){if(!confirm("Delete this question?"))return;c.form.sections[+i].fields.splice(+j,1)}
   else if(k=="s"){if(!confirm("Delete this whole section and its questions?"))return;c.form.sections.splice(+i,1)}
   else if(k=="st")c.how.steps.splice(+i,1);else if(k=="c")c.form.consents.splice(+i,1)}
  else if(b.dataset.wadd){const[k,i]=b.dataset.wadd.split(":");
   if(k=="f")c.form.sections[+i].fields.push(blank());else if(k=="s")c.form.sections.push({id:"s"+Date.now().toString(36),t:"New section",fields:[blank()]});
   else if(k=="st")c.how.steps.push({t:"New step",d:"Describe this step."});else if(k=="c")c.form.consents.push({t:"New tick box text",req:true,on:true})}
  E.save();draw()})}
window.WS={render,wire,adminHTML,bindAdmin,cfg};
})();
