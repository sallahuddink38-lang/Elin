# ELIN update v41 (scroll lag fix: wholesale page, home and all pages)

Cause: the GSAP motion in js/v37.js made every section (even the tall wholesale form) fly in with 3D rotation, depth and perspective, plus 3D leans and scrubbed parallax, and live blur sat on top of videos. That forced the browser to re-draw very large layers on every scroll frame.

| Area | Change |
|---|---|
| js/v37.js | Reveals are now a plain fade + slide (no 3D). Blocks taller than 1.25 screens (the wholesale form) are not animated at all. Max 12 cards animated per block. No re-hiding when scrolling back up. Hero parallax only on desktop; phones skip it. Image parallax desktop only, 3D lean and panel drift removed. Cheaper "rescue" check, scrub:true. |
| css/v37.css | Removed will-change and preserve-3d on revealed blocks (dozens of extra GPU layers). |
| css/v40.css | Removed live blur (backdrop-filter) on header, hero strip, arrows, mute and sound buttons; lighter shadows on the wholesale form; no Ken Burns zoom on phones. |
| js/v34.js | Hero-video side-fill is redrawn only for videos on screen, every 400 ms instead of 260 ms. |
| index.html | Cache version ?v=41 on the changed files. |

Measured (4x slower CPU, mobile 390 px): wholesale page 22 slow frames -> 0 (0 long tasks). Bags page also smoother. Home page is the heaviest page (172 images, 5,500 elements); it improved but is still the biggest to optimise (fewer images per screen, smaller photos).
To undo: put back js/v37.js, css/v37.css, js/v34.js from v45 and delete the v41 block at the bottom of css/v40.css.

---

---
# ELIN update v47 (mobile fixes)
| File | Change |
|---|---|
| css/v47.css (new) | Search dialog no longer wider than the phone (moving product strip was stretching the grid); smaller, shorter, calmer search field (16px text, 46-50px tall, max 680px on desktop); category chips swipe in one row; compact suggestion rows. Hero on phones: text always sits above the 4 gallery links (no overlap on small screens). |
| js/v47.js (new) | Measures the hero gallery-strip height into --sh so the hero text keeps clear of it. |
| js/app.js | Short placeholder "Search ELIN..." on phones (<600px). |
| index.html | Links v47.css and v47.js. |
To undo: delete css/v47.css, js/v47.js, their 2 lines in index.html, and restore the placeholder in openSearch().

---
# ELIN update v48 (mobile fixes round 2)
| Problem | Cause | Fix |
|---|---|---|
| End banners (ELIN / Walk in with confidence) text cut off on the right | min-height + aspect-ratio made the banner 750-840px wide on phones | css/v48.css: width 100%, aspect-ratio auto on phones |
| Blank gap above footer, missing/offset first product card | GSAP hid blocks and sometimes never revealed them | js/v37.js: phones no longer hide content; rescue also runs while scrolling |
| Footer links glued together | `#foot a{display:inline-block}` | css/v48.css: links are blocks again |
| Search box shifted/cut | content could scroll sideways | overflow-x hidden on dialog; all ?v= bumped to 48 so old cached files are dropped |
| Reviews tab covering admin login | tab too wide | slimmer tab, footer bar padded |
To undo: delete css/v48.css + its link, restore js/v37.js.

---
# ELIN update v48b
| Problem | Fix |
|---|---|
| Product images up/down in every category (first card lower) | Cards had the section padding (40-56px top). css/v48.css item 6 removes it (stationery/toys keep their own 10px) |
| Only one video visible on phones, no movement | "Watch & shop" now shows 2 videos side by side and glides to the next every 3.2 s (js/v48.js, css/v48.css item 7). Pauses 8 s after touch or when sound is on |
To undo: delete js/v48.js + its script line, and items 6-7 of css/v48.css.

---
# ELIN update v49
| Problem | Cause | Fix |
|---|---|---|
| Phone header: round "S" (signed-in) sat outside its ring | Default button padding shrank the content box, the 30px avatar overflowed to the right | css/v49.css item 1: padding 0, centred content, 40px buttons (36px under 380px), logo shrinks instead of the buttons |
| Checkout / wholesale order not reaching Gmail (silently) | When the live database saved the order, the phone dropped its "send again" copy even if the email had NOT gone, so a failed email was never retried | js/app.js and js/wholesale.js: the saved copy is removed only after the Gmail/Sheet route succeeds. js/core.js: email wait 6 s -> 12 s (slow mobile networks), 1.2 s pause before the second try |
| Forms on phones | 15px text made iPhones zoom, two columns cramped | css/v49.css item 2: 16px text, 52-56px tap height, one column under 480px |
To undo: delete css/v49.css + its link; restore js/core.js, js/app.js, js/wholesale.js from v48b.

---
# ELIN update v50
| Problem | Fix |
|---|---|
| Customer did not get an email at the Gmail they signed in with | js/core.js sendMail1 now sends FormSubmit "_autoresponse" (the thank-you text) to the customer's login Gmail. The same address is no longer also CC'd. An extra address typed on the form is still CC'd. The small second try keeps the thank-you too |
| Admin password unknown | New starting admin login: elin.dt01@gmail.com + a temporary password (given in chat). First sign-in forces you to choose your own (js/core.js default hash, js/admin.js) |
To undo: restore js/core.js and js/admin.js from v49.
