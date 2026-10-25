"use strict";
/* Homepage content that is not a course. */

/* LEARNING NETWORK. Organisations named by Navyug.
   relationship is intentionally null until Navyug confirms each one (partner, affiliation, course provider, or initiative association).
   Do NOT add a relationship, and do not show certification, unless it is established. logo: put a file in assets/logos/ and set "logo": "assets/logos/name.svg". */
window.NAVYUG_NETWORK = [
  { group: "Education", items: [
    { name: "IIT Guwahati", relationship: null, logo: null },
    { name: "OP Jindal University", relationship: null, logo: null },
    { name: "CSVTU Bhilai", relationship: null, logo: null },
    { name: "GPCET, Kurnool", relationship: null, logo: null },
    { name: "Ravindra College of Engineering for Women", relationship: null, logo: null }
  ] },
  { group: "Organisations and initiatives", items: [
    { name: "MSME", relationship: null, logo: null },
    { name: "Startup India", relationship: null, logo: null },
    { name: "OPJU Innovation Center", relationship: null, logo: null },
    { name: "Erkey Montors", relationship: null, logo: null },
    { name: "Jindal Power Limited (JPL)", relationship: null, logo: null }
  ] }
];

/* Trending searches. Each links to explore.html?search=<term>. Terms with no matching course show a short "no courses yet" message. */
window.NAVYUG_TRENDING = ["EV", "Data Analytics", "Project Management"];

/* SAMPLE TESTIMONIALS. TEMPORARY placeholder text and names for the prototype, not real learners.
   Replace this whole list with real testimonials (and real photos in js/data/images.js avatars) before launch.
   Keep quotes short, and do not add outcomes, job results or institutions that the learner did not state. */
window.NAVYUG_TESTIMONIALS = [
  { sample: true, name: "Aarav S.", context: "Learner, Business Foundations", quote: "The lessons are short and clear, so I could fit them around my day." },
  { sample: true, name: "Meera K.", context: "Learner, Data Literacy", quote: "I liked knowing what I would be able to do at the end of each course." },
  { sample: true, name: "Rohan D.", context: "Learner, Thinking Clearly", quote: "Keeping notes beside each lesson made it easy to pick up where I stopped." }
];

/* HERO CAROUSEL. One card per entry. image: "hero" or a course id (uses that course's photo from js/data/images.js).
   tone: dark | light | sun. href must be a real page. The first slide carries the page's main heading. */
window.NAVYUG_HERO = [
  { tone: "dark", title: "Make knowledge move you forward.", text: "Explore practical courses, discover new interests, and build skills for what comes next.", cta: "Explore courses", href: "explore.html", image: "hero" },
  { tone: "light", title: "Power the shift to electric.", text: "Start with EV and battery technology, our speciality.", cta: "Explore EV courses", href: "explore.html?cat=Electric%20Vehicles", image: "ev-fundamentals" },
  { tone: "sun", title: "Make sense of data, one chart at a time.", text: "Learn to read numbers and ask better questions before you decide.", cta: "View the course", href: "course.html?id=data-literacy", image: "data-literacy" },
  { tone: "light", title: "Start with the ideas behind every business.", text: "Understand how organisations create value, in plain language.", cta: "View the course", href: "course.html?id=business-foundations", image: "business-foundations" },
  { tone: "dark", title: "Understand people before you design.", text: "Learn to ask good questions and listen for what people really need.", cta: "View the course", href: "course.html?id=user-research", image: "user-research" }
];
