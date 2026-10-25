# Navyug Learn: platform frontend

Static frontend (HTML, CSS, vanilla JS) for the Navyug Learn LMS. No framework, no build step. Host the folder on any static host.

**Run locally:** `python3 -m http.server 8000`, then open http://localhost:8000. Use a server, not `file://`.

## Structure
```
index.html          Individuals homepage: compact hero, New and popular carousel, learning network, 3 destination cards, categories, trending searches, testimonials, FAQ
explore.html        Catalogue: search, category filter, sort (?cat=, ?search=, ?collection=featured|new|ev)
course.html         Course detail, enrol / add to cart   (?id=course-id)
cart.html           Cart and demo checkout
check.html          Project self-check (open through a local server)
learn.html          Lesson player                    (?id=course-id&lesson=lesson-id)
dashboard.html      My learning
industries.html · universities.html · government.html     Organisation landing pages + enquiry form
about.html · 404.html
css/  base.css (tokens, base, home) → components.css → site.css   (load order matters)
js/   data/courses.js · data/lessons.js     all content lives here
      store.js        the only code that reads/writes learner data: accounts, cart, progress (LMS boundary, see docs/API.md)
      auth.js         join / log in dialog (demo accounts)
      photos.js       swaps placeholders for real photos listed in assets/photos/manifest.json
      chrome.js       shared header and footer, audience sub-brands, promo banner, forms
      catalogue.js    homepage catalogue, search, filters, course cards
      pages.js        course, lesson, dashboard pages and homepage widgets
assets/  placeholder illustrations (assets/IMAGES.md); real photos go in assets/photos/ (see its README.md)
```

## Content rules
- **Sample content.** Courses with `sample: true` in `js/data/courses.js` are demonstration content, not approved offerings. They show a "Sample" tag on cards and a notice on the course page. Remove the flag only after Navyug has approved the course. The six EV and battery courses are currently sample content; their lessons are written for demonstration and contain no named schemes, partnerships or accreditation.
- **Speciality vs scope.** EV and battery technology is the speciality (`speciality: true` on courses and categories) but the site is not EV-only. Categories live in one list (`categories` in `js/data/courses.js`) and drive the Explore menu, filter chips and homepage tiles.
- **Palette.** White is the main background. Alabaster Grey `#E0E0E0` is used for borders, the subtle `--surface` section tint and course art backgrounds. Carbon `#1A1A1A` and Tuscan Sun `#F2C94C` are the accents.
- **My learning** is a demonstration with browser-only data. Do not grow it into a student dashboard; that belongs to the LMS.

## Audience pages (Industries, Universities, Government)
`industries.html`, `universities.html` and `government.html` are thin shells. Their content lives in `js/data/audiences.js` and is rendered by `js/audience.js`: hero, calculated stats, organisations, benefits, course tracks (by course id), use cards, steps, FAQ and an enquiry form. Edit text in `audiences.js`; never type statistics, partners or testimonials that are not real. Organisation tiles read names and logos from `js/data/home.js`.

## Homepage content files
- `js/data/images.js`: temporary Unsplash photo URLs (hero, per course, testimonial avatars). Replace with Navyug course photos here only. A URL that fails falls back to the local illustration. The photo IDs were not verified when written, so check them in a browser.
- `js/data/home.js`: learning network organisations, trending search terms, and SAMPLE testimonials. Network `relationship` is null until confirmed; add logos to `assets/logos/` and set `logo`. Add a course `certification` (for example for IIT Guwahati) only on courses that genuinely carry it.
- Homepage collections (Featured courses, Recently added, Explore EV and battery) are defined in `collections` in `js/data/courses.js` and use no popularity or date claims.

## Rules for changes
- Add or edit a course in `js/data/courses.js` (type, price, outcomes, category, optional `keywords`) and `js/data/lessons.js` (lesson text), and add `assets/<course-id>.svg`.
- Header and footer exist in **one** place: `js/chrome.js`. Audience pages set `<html data-aud="industries|campus|government">`.
- Never call `localStorage` outside `js/store.js`.
- Colours and fonts come from the existing identity: Inter, IBM Plex Mono, carbon `#1A1A1A`, yellow `#F2C94C`.

## Prototype status
Placeholders: all images (swap in real photos via assets/photos/), the footer social links (`SOCIAL` in `js/chrome.js`), prices (₹499 Essentials, ₹1,999 Courses, Tutorials free), the contact email (`partnerships@navyug.in`, line 4 of `js/chrome.js`), the demo checkout, and demo accounts (email only, no password, stored in this browser). Not built: real accounts, real payments, video, certificates, ratings, testimonials, other languages.

## Homepage content (individuals)
All homepage content that is not a course lives in `js/data/home.js`:
- `NAVYUG_HERO`: the hero carousel cards (title, text, button, link, image). Each `image` is `"hero"` or a course id; the photo comes from `js/data/images.js`.
- `NAVYUG_NETWORK`: organisations in the Learning network strip. Add a logo by putting a file in `assets/logos/` and setting `logo` (see `assets/logos/README.md`). Until then a monogram and name are shown.
- `NAVYUG_TRENDING` and `NAVYUG_TESTIMONIALS` (sample content, replace before launch).
