ELIN WEBSITE
============
Open index.html in Chrome (double click). No server needed. Internet is needed for fonts.

STORE ADMIN (no coding)
Open admin.html  (or index.html#/admin). Use Chrome or Edge when opening from a folder.   (you are asked to set your own password at first sign-in)
  Products           add, edit, delete items. Price, discount %, sizes, colours, badge, description, up to 4 photos (slides)
  Customer Reviews   120 SAMPLE reviews with stars. Replace with your real customers' feedback
  Sales, Bundles     store-wide sale, pack of 2 / pack of 3 offers, coupon codes, delivery charges
  Photos & Videos    replace the logo, every hero video, video box, category photo
  Page Text          change the big heading on every page
  Settings           WhatsApp number, phone, email, address, top moving message
  Publish & Backup   download a zip of your changes, backup, reset

PUBLISH YOUR CHANGES
Changes made in admin are saved in YOUR browser. To show them to everyone:
Admin > Publish & Backup > Download my website files. Unzip, copy the folders into elin-site (say Yes to replace), upload elin-site to your hosting.

REPLACE FILES BY HAND (alternative)
Logo:            assets/images/logo.png  (or .jpg .webp .svg)
Hero videos:     assets/videos/hero-home.mp4 ... hero-bags, hero-hair, hero-gifts, hero-toys, hero-stationery, hero-footwear, hero-sale, hero-reseller
Video boxes:     assets/videos/home-tile-1..6, and bags-tile-1..3, hair-tile-1..3 etc.
Product photos:  assets/images/bags/bags-01.jpg, slides: bags-01-2.jpg and bags-01-3.jpg
The 39 videos now in assets/videos are SAMPLE videos. Replace each with your own (same name).
Keep videos short and under 10 MB.

FOLDERS
index.html  css/style.css  js/data.js (default items)  js/store-data.js (your published changes)
js/core.js  js/app.js  js/admin.js  assets/images  assets/videos

COLLECTION PAGES
Every item in the menu dropdown has its own page, for example #/bags/crossbody-bags.
Hero video:  assets/videos/sub-<category>-<collection>.mp4  (example: sub-bags-crossbody-bags.mp4)
Photo tile:  assets/images/sub/<category>-<collection>.jpg  (shown on the category page)
Or use Admin > Photos & Videos, which lists every one with its name.
Star ratings on products: Admin > Products (Stars column). 0 hides the stars.

NEW IN THIS VERSION
Logo:          assets/images/logo.png (header) and logo-light.png (footer). Replace with the same names.
Home hero:     3 centre videos/photos: videos/hero-home-2 (left), hero-home (centre), hero-home-3 (right)
Home extras:   New Arrivals and Best Sellers sliders (tick the boxes in Admin > Products), video reels, style photos
               images/home/colour-1.jpg and colour-2.jpg
Bundles:       Admin > Sales, Bundles & Coupons. Types: percent off, fixed pack price, cheapest item free.
               Customers press "Build your pack" to pick items. The bag also shows a hint like "Add 1 more item to get Pack of 3".
Search:        magnifier icon in the header
Ratings:       Admin > Products > Stars. The star ratings and reviews are SAMPLES. Replace with real ones.
Footer strip:  payment methods text is in Admin > Settings

HOME PAGE PHOTOS (assets/images/home/)  - sample photos are there now, replace with the same names
hero-bg.jpg        background behind the home hero (a light wash keeps the text readable)
banner-mid.jpg     wide banner in the middle of the page, with text and a Shop handbags button
banner-end-1.jpg   first of the two joined banners at the end of the page
banner-end-2.jpg   second joined banner, with centred text and SHOP NOW
newsletter-bg.jpg  background behind "Stay in the loop"
Best size: about 1900 x 800 pixels. Banner text can be changed in Admin > Page Text.

NEW: ACCOUNTS, ADMIN LOGIN, AUDIT
Admin:    open admin.html  -> first sign-in asks you to set your own password. Change the admin email in Settings.
Customers can sign in (Google or email) from the person icon in the header. Wishlist is the heart icon.
Gmail login and Google Sheets saving are set up in Admin > Settings (steps are written there).
google-apps-script.txt is the script for Google Sheets.
Home hero slider (3 slides): assets/hero-slides/ -> slide-1.mp4, slide-2.jpg, slide-3.jpg
Read AUDIT.md before launch.

ORDERS BY EMAIL
Cart orders are emailed to the address in Admin > Settings ("Email that receives orders", or the main Email if empty) using formsubmit.co.
FIRST TIME ONLY: place one test order on the live site, then open the inbox. FormSubmit sends an "Activate" email. Click it once. Orders arrive after that.
If email fails, the customer's mail app opens with the order filled in, and the bag is kept.
SOCIAL LINKS: Facebook, Instagram, TikTok, YouTube are set in js/app.js (list called SOC).
REVIEW SPEED: js/app.js, REV_SEC (seconds per review card). Higher = slower.

V2 (14 Oct): SIGN-IN, ORDERS, RESELLERS, ADMIN DATA
Customers must sign in (Google or Facebook) before the delivery form appears. Add the IDs in Admin > Settings.
Orders and reseller applications are emailed to the store email. Both are also saved to Google Sheets when connected (google-apps-script.txt, set your own ADMIN_KEY inside it).
Admin has separate tabs: Orders, Customers, Resellers. In Orders/Customers/Resellers type the ADMIN_KEY once to see data from every device.
Read AUDIT.md (top section) for what is still open before launch.

V3 (15 Oct): CHECKOUT, HOME, SALE
Checkout is the page #/checkout. Set bank details and delivery time in Admin > Settings. Delivery fee and free-delivery amount are in Admin > Sales, Bundles & Coupons.
Home banners: assets/videos/hero-bags.mp4 and hero-footwear.mp4. Category strip photos: assets/images/sub/<category>-<collection>.jpg (round crop, square photos work best).
Moving speed: js/app.js, data-pps="75" (products) and data-pps="42" (round strip) in the car() and cstrip() functions. Higher = faster.
Sale discounts: set the Discount % of each product in Admin > Products. The FLAT circles on the Sale page appear automatically from those numbers.

V4 (16 Oct): SALE, BIGGER HERO VIDEOS, LIVE ORDERS
- "Happy weekend offer" is now "Sale" everywhere (menu, top line, offer banner). The blinking bulbs are removed.
- Hero videos are larger on every page (home, categories, collections, banners, "The ELIN edit"). Sizes are in the last block of css/style.css ("v4").
- LIVE ORDERS: orders, reseller forms and customer sign-ins are now saved first to a live database (Firebase) and shown in Admin > Orders / Resellers / Customers the moment they arrive, from any device, with a beep and a message.
  The email (FormSubmit) is now only a copy: if email fails the order still goes through. If both fail the customer gets a WhatsApp button with the order text.
  SET UP ONCE: Admin > Settings > "Live orders (Firebase)" has the steps and the exact rules to paste. Put the Database URL and Web API key there (or in js/data.js: fbDb, fbKey), publish, upload.
  Then open Admin > Orders and sign in with the Firebase user (same email as the admin email).
  Until Firebase is set up the site works as before (email only), so set it up before launch.

V7 (16 Oct): ORDERS AND RESELLER FORM GO TO ADMIN + GMAIL AT ONCE
EASIEST SETUP (Google, 5 minutes, free, no FormSubmit activation):
 1. New Google Sheet > Extensions > Apps Script. Paste ALL of google-apps-script.txt.
 2. Change ADMIN_KEY (long secret) and OWNER_EMAIL (your Gmail). Press Run once on doGet and click Allow (so it may send email).
 3. Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone. Copy the Web app URL.
 4. Open js/data.js and put the URL in  webhook:"..."   (or Admin > Settings, then Publish). Upload the site.
    IMPORTANT: customers only get the setting after it is in js/data.js or published from admin. Saving in admin alone is NOT enough.
 5. Admin > Orders: type ADMIN_KEY once. New orders appear within 4 seconds, with a beep.
What happens on an order: site > Google script > row in sheet + email to your Gmail + thank-you email to customer. The customer sees "confirmed" only when the script answered ok.
If the script is down, FormSubmit email is the backup, then a WhatsApp button. Sending the same order twice never makes two rows (dedupe by order number).
FASTER (instant, optional): also fill fbDb / fbKey (Firebase, see V4). Admin then uses Firebase instead of the 4-second check.

V34 (header, video fit, 3D)
css/v34.css + js/v34.js:  scroll par sirf category bar rehta hai, hero video poori nazar aati hai (blur background),
laptop / phone / bari screen ke sizes, 3D effects (tilt cards, hero depth, 3D reveal, 3D menu).
Undo: index.html se v34.css aur v34.js ki do lines hata dein.

V34b: home hero ab 3 full pictures (assets/hero-slides/slide-1.jpg, slide-2.jpg, slide-3.jpg - apni photos isi naam se replace karein, best size 1900 x 900).
Gol collection photos ab hero ke NEECHE hain. Hero, banner, story, product aur wholesale sizes chhote kiye (css/v34.css).

V34c: header (logo + menu) hero ke upar transparent hota hai (home aur har category page). Hero se neeche scroll karne par header wapas white ho jata hai.

V41 (23 Oct): FORMS -> GMAIL TABLE + GOOGLE SHEET, FASTER
google-apps-script.txt is the new script: designed Gmail (summary cards + clean table of every answer + Call / WhatsApp buttons), styled Google Sheet, thank-you mail to the customer.
Connected Gmail stays elin.dt01@gmail.com (OWNER_EMAIL in the script, orderEmail in js/data.js).
Speed: js/core.js wakes the script before Submit, answers wait max 6 s, emails are sent in the background, FormSubmit email stays as backup.
MUST DO ONCE: paste script > set ADMIN_KEY > Run setupOnce > Deploy web app > put the URL in js/data.js  webhook:"..."  (it is empty now, so forms use only the FormSubmit backup until you do this).

V43 (23 Oct): CHECKOUT NEVER FAILS, WHOLESALE BUSINESS TYPE = CHOOSE MANY
Checkout uses the same send route as the wholesale form (Google script first, FormSubmit backup, now with a 6 s limit and a second tiny-message try).
If nothing reaches us, the order is kept in the phone (elin_mailbox), sent again by itself, and the confirmation page shows a "Send my order on WhatsApp" button instead of an error.
Wholesale form: "Business Type" is now tick boxes (choose as many as you like). Forms saved earlier in Admin are converted automatically.
STILL NEEDED for the fast Gmail table: put the Google script web app URL in js/data.js  webhook:"..."  (empty now).

V44 (23 Oct): INSTANT CONFIRMATION
Checkout and wholesale save the form in the phone first, send it in the background, and show the confirmation within about 1.5 s even on a slow network. If sending keeps failing the phone retries by itself (elin_mailbox).
The Gmail TABLE email and the Google Sheet need the Google script URL in js/data.js  webhook:"..."  (still empty). Until then only the plain FormSubmit email is used.

V45 (23 Oct): GMAIL EMAILS NOW IN TABLE FORM (no setup needed)
Checkout and wholesale emails use the FormSubmit "table" layout (one row per answer) and carry a "Time (PKT)" row. js/core.js, sendMail.
