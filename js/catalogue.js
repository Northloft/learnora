"use strict";

/*
 * Navyug Learn catalogue logic.
 * Original Navyug course data.
 * No backend, real accounts or enrolment service is connected.
 */



const courseGrid = document.querySelector("#courseGrid");
const courseSearch = document.querySelector("#courseSearch");
const courseSort = document.querySelector("#courseSort");
const categoryList = document.querySelector("#categoryList");
const emptyState = document.querySelector("#emptyState");
const courseDialog = document.querySelector("#courseDialog");
const dialogContent = document.querySelector("#dialogContent");
const dialogClose = document.querySelector("#dialogClose");
const heroSearch = document.querySelector("#heroSearch");
const heroSearchInput = document.querySelector("#heroSearchInput");
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const toast = document.querySelector("#toast");

let activeCategory = "All";

/* Category chips come from the categories list in js/data/courses.js */
if (categoryList) {
  categoryList.innerHTML = '<button class="category-chip active" type="button" data-category="All" aria-pressed="true">All courses</button>' +
    categories.map(cat => `<button class="category-chip${cat.speciality ? " is-speciality" : ""}" type="button" data-category="${escapeHTML(cat.name)}" aria-pressed="false">${escapeHTML(cat.name)} <span class="chip-n">${courses.filter(x => x.category === cat.name).length}</span></button>`).join("");
}
let toastTimeout;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[character];
  });
}

/* Shared by Explore and the homepage trending searches. Short queries (EV, BMS) match whole words only. */
function courseMatches(course, rawQuery) {
  const query = (rawQuery || "").trim().toLowerCase();
  if (!query) return true;
  const text = [course.title, course.category, course.level, course.description, course.keywords || "", ...course.outcomes].join(" ").toLowerCase();
  if (query.length > 3) return text.includes(query);
  return new RegExp("(^|[^a-z0-9])" + query.replace(/[^a-z0-9]/g, "") + "([^a-z0-9]|$)").test(text);
}

let activeCollection = null;

function getFilteredCourses() {
  const query = courseSearch?.value || "";
  let result = courses.filter(course =>
    (activeCategory === "All" || course.category === activeCategory) &&
    (!activeCollection || activeCollection.pick(course)) &&
    courseMatches(course, query));

  const sortValue = courseSort?.value || "featured";

  if (sortValue === "title") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "duration") {
    result.sort((a, b) => a.duration - b.duration);
  } else if (sortValue === "new") {
    result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  return result;
}

function createCourseCard(course, index) {
  return `
    <article class="course-card">
      <img class="course-img" ${courseImgAttrs(course)} alt="" loading="lazy">

      <div class="course-card-body">
        <p class="course-category">${escapeHTML(course.category)}</p>
        <h3>${escapeHTML(course.title)}</h3>
        <p class="course-description">${escapeHTML(course.description)}</p>

        <div class="course-meta">
          <span>${escapeHTML(course.level)}</span>
          <span>${escapeHTML(course.durationLabel)}</span>
        </div>
        <p class="course-price">${NavyugStore.priceLabel(course)}<small>${escapeHTML(course.type)}</small></p>

        <div class="course-card-actions">
          <a class="course-open" href="course.html?id=${escapeHTML(course.id)}"
            aria-label="View ${escapeHTML(course.title)}">
            View course <span aria-hidden="true">↗</span>
          </a>
          <span class="course-tag">${getSavedCourses().includes(course.id) ? "Saved" : course.isNew ? "New" : ""}</span>
        </div>
      </div>
    </article>
  `;
}

function renderCourses() {
  if (!courseGrid) return;

  const filteredCourses = getFilteredCourses();

  courseGrid.innerHTML = filteredCourses
    .map((course, index) => createCourseCard(course, index))
    .join("");

  if (emptyState) {
    emptyState.hidden = filteredCourses.length !== 0;
    emptyState.textContent = activeCategory !== "All" && !courseSearch?.value
      ? "No courses in " + activeCategory + " yet. More subjects are planned."
      : "No courses match that search. Try another keyword or topic.";
  }
  const note = document.querySelector("#collectionNote");
  if (note) { note.hidden = !activeCollection; if (activeCollection) note.innerHTML = "Showing: <b>" + escapeHTML(activeCollection.title) + "</b> · <a class=\"text-link\" href=\"explore.html\">Clear</a>"; }
}

function openCourse(courseId) {
  const course = courses.find(item => item.id === courseId);

  if (!course || !courseDialog || !dialogContent) {
    showToast("That course could not be found.");
    return;
  }

  dialogContent.innerHTML = `
    <div class="dialog-art"
      style="--art-background:${course.background};
             --art-foreground:${course.foreground}">
      ${escapeHTML(course.artTitle)}
    </div>

    <p class="dialog-category">
      ${escapeHTML(course.category)} / ${escapeHTML(course.level)}
    </p>

    <h2 class="dialog-title" id="dialogTitle">
      ${escapeHTML(course.title)}
    </h2>

    <p class="dialog-description">${escapeHTML(course.description)}</p>

    <div class="course-meta">
      <span>${escapeHTML(course.level)}</span>
      <span>${escapeHTML(course.durationLabel)}</span>
    </div>

    <h3 class="dialog-section-title">What you will learn</h3>

    <ul class="outcome-list">
      ${course.outcomes.map(outcome =>
        `<li>${escapeHTML(outcome)}</li>`
      ).join("")}
    </ul>

    <div class="dialog-actions">
      <button class="button button-dark" type="button"
        data-demo-start="${escapeHTML(course.id)}">
        Open course <span aria-hidden="true">↗</span>
      </button>
      <button class="button button-outline" type="button"
        data-save-course="${escapeHTML(course.id)}">
        Save course
      </button>
    </div>
  `;

  if (!courseDialog.open) {
    courseDialog.showModal();
    document.body.classList.add("dialog-open");
  }
}

function closeCourseDialog() {
  if (courseDialog?.open) courseDialog.close();
  document.body.classList.remove("dialog-open");
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function getSavedCourses() {
  return NavyugStore.getSaved();
}

function saveCourse(courseId) {
  if (!courses.some(item => item.id === courseId)) return;
  if (NavyugStore.isSaved(courseId)) {
    showToast("This course is already saved.");
    return;
  }
  showToast(NavyugStore.toggleSaved(courseId) ? "Course saved." : "Could not save this course right now.");
}

function previewCourse(courseId) {
  window.location.href = "course.html?id=" + encodeURIComponent(courseId);
}

function setActiveCategory(category) {
  activeCategory = category;

  categoryList?.querySelectorAll("[data-category]").forEach(button => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderCourses();
}

function searchFor(query) {
  if (courseSearch) courseSearch.value = query;
  setActiveCategory("All");

  if (query && getFilteredCourses().length === 0) {
    showToast("No matching courses. Try another keyword.");
  }
}

/* Catalogue controls */

courseSearch?.addEventListener("input", renderCourses);
courseSort?.addEventListener("change", renderCourses);

categoryList?.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (button) setActiveCategory(button.dataset.category);
});

courseGrid?.addEventListener("click", event => {
  const button = event.target.closest("[data-open-course]");
  if (button) openCourse(button.dataset.openCourse);
});

heroSearch?.addEventListener("submit", event => {
  event.preventDefault();
  searchFor(heroSearchInput?.value.trim() || "");
});

document.querySelectorAll("[data-quick-search]").forEach(button => {
  button.addEventListener("click", () => {
    searchFor(button.dataset.quickSearch || "");
  });
});


/* Course dialog */

dialogContent?.addEventListener("click", event => {
  const saveButton = event.target.closest("[data-save-course]");
  const previewButton = event.target.closest("[data-demo-start]");

  if (saveButton) saveCourse(saveButton.dataset.saveCourse);
  if (previewButton) previewCourse(previewButton.dataset.demoStart);
});

dialogClose?.addEventListener("click", closeCourseDialog);

courseDialog?.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
});

courseDialog?.addEventListener("click", event => {
  if (event.target === courseDialog) closeCourseDialog();
});

/* Search shortcuts */


const currentYear = document.querySelector("#currentYear");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());


const navSearchForm = document.querySelector("#navSearchForm");
const navSearchInput = document.querySelector("#navSearchInput");

navSearchForm?.addEventListener("submit", event => {
  event.preventDefault();
  const query = navSearchInput?.value.trim() || "";
  const catalogSearch = document.querySelector("#courseSearch");
  if (catalogSearch) {
    activeCollection = null;
    setActiveCategory("All");
    catalogSearch.value = query;
    renderCourses();
  } else {
    window.location.href = "explore.html?search=" + encodeURIComponent(query);
  }
});

const params = new URLSearchParams(window.location.search);
const initialSearch = params.get("search");
const initialCollection = params.get("collection");
if (initialCollection) activeCollection = collections.find(x => x.key === initialCollection) || null;

if (initialSearch) {
  const searchInput = document.querySelector("#courseSearch");

  if (searchInput) {
    searchInput.value = initialSearch;
  }
}

/* Initial render */

renderCourses();

/* ===== Compact course card: used by the homepage collections and trending searches ===== */
function createCompactCard(course) {
  const meta = [course.type, course.level].map(escapeHTML).join(" · ");
  return `<a class="cc" href="course.html?id=${encodeURIComponent(course.id)}">
    <img class="cc-img" ${courseImgAttrs(course)} alt="" width="80" height="80" loading="lazy">
    <span class="cc-body">
      <span class="cc-provider">Navyug Learn</span>
      <strong class="cc-title">${escapeHTML(course.title)}</strong>
      <span class="cc-meta">${meta}${course.rating ? ` · <span class="cc-star" aria-label="Rated ${escapeHTML(course.rating)}">★ ${escapeHTML(course.rating)}</span>` : ""}</span>
      ${course.certification ? `<span class="cc-cert">${escapeHTML(course.certification)}</span>` : ""}
    </span></a>`;
}

/* ===== Homepage sections ===== */
const popularTrack = document.querySelector("#popularTrack");
if (popularTrack) {
  popularTrack.innerHTML = collections.map(col => `
    <section class="np-panel" aria-label="${escapeHTML(col.title)}">
      <h3><a href="explore.html?collection=${col.key}">${escapeHTML(col.title)} <span aria-hidden="true">→</span></a></h3>
      ${courses.filter(col.pick).slice(0, 3).map(createCompactCard).join("")}
    </section>`).join("");
  const prev = document.querySelector("#popPrev"), next = document.querySelector("#popNext");
  const step = () => (popularTrack.querySelector(".np-panel")?.offsetWidth || 400) + 16;
  const sync = () => {
    const max = popularTrack.scrollWidth - popularTrack.clientWidth - 2;
    if (prev) prev.disabled = popularTrack.scrollLeft <= 0;
    if (next) next.disabled = popularTrack.scrollLeft >= max;
  };
  prev?.addEventListener("click", () => popularTrack.scrollBy({ left: -step(), behavior: "smooth" }));
  next?.addEventListener("click", () => popularTrack.scrollBy({ left: step(), behavior: "smooth" }));
  popularTrack.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  sync();
}

const homeCategories = document.querySelector("#homeCategories");
if (homeCategories) {
  homeCategories.innerHTML = `<div class="chip-group">${categories.map(cat => `<a class="chip-link" href="explore.html?cat=${encodeURIComponent(cat.name)}">${escapeHTML(cat.name)}</a>`).join("")}</div>`;
}

const trendingGrid = document.querySelector("#trendingGrid");
if (trendingGrid && window.NAVYUG_TRENDING) {
  trendingGrid.innerHTML = NAVYUG_TRENDING.map(term => {
    const hits = courses.filter(c => courseMatches(c, term)).slice(0, 3);
    return `<section class="np-panel" aria-label="${escapeHTML(term)}">
      <h3><a href="explore.html?search=${encodeURIComponent(term)}">${escapeHTML(term)} <span aria-hidden="true">→</span></a></h3>
      ${hits.length ? hits.map(createCompactCard).join("") : `<p class="np-empty">No ${escapeHTML(term)} courses yet. <a class="text-link" href="explore.html">Browse all courses</a></p>`}
    </section>`;
  }).join("");
}

const networkEl = document.querySelector("#networkGroups");
if (networkEl && window.NAVYUG_NETWORK) {
  const orgs = NAVYUG_NETWORK.flatMap(g => g.items);
  const initials = n => n.replace(/\(.*?\)/g, "").split(/[\s,]+/).filter(w => /^[A-Za-z]/.test(w) && w.length > 2).map(w => w[0]).join("").slice(0, 3).toUpperCase();
  const tile = (o, clone) => `<li class="net-logo"${clone ? ' aria-hidden="true"' : ""} title="${escapeHTML(o.name)}">${o.logo
    ? `<img src="${escapeHTML(o.logo)}" alt="${clone ? "" : escapeHTML(o.name)}" height="44" loading="lazy">`
    : `<span class="net-mono" aria-hidden="true">${escapeHTML(initials(o.name))}</span><span class="net-name">${escapeHTML(o.name)}</span>`}</li>`;
  /* Two identical halves so the loop is seamless; the second half is hidden from assistive technology. */
  networkEl.innerHTML = `<ul class="net-track">${orgs.map(o => tile(o, false)).join("")}${orgs.map(o => tile(o, true)).join("")}${orgs.map(o => tile(o, true)).join("")}${orgs.map(o => tile(o, true)).join("")}</ul>`;
}

const testiEl = document.querySelector("#testimonialGrid");
if (testiEl && window.NAVYUG_TESTIMONIALS) {
  testiEl.innerHTML = NAVYUG_TESTIMONIALS.map((t, i) => {
    const initials = t.name.split(/\s+/).map(w => w[0]).join("").slice(0, 2);
    const photo = (window.NAVYUG_IMAGES?.avatars || [])[i];
    return `<figure class="testi"><blockquote>“${escapeHTML(t.quote)}”</blockquote>
      <figcaption><span class="testi-av" aria-hidden="true">${escapeHTML(initials)}${photo ? `<img src="${escapeHTML(photo)}" alt="" onerror="this.remove()">` : ""}</span>
      <span><b>${escapeHTML(t.name)}</b><small>${escapeHTML(t.context)}</small></span></figcaption></figure>`;
  }).join("");
}


/* Hero carousel (individuals homepage). Slides come from NAVYUG_HERO in js/data/home.js. */
const heroEl = document.querySelector("#heroCarousel");
if (heroEl && window.NAVYUG_HERO) {
  const photo = k => k === "hero" ? ((window.NAVYUG_IMAGES && NAVYUG_IMAGES.hero) || "assets/learn-anywhere.svg") : courseImg({ id: k });
  const local = k => k === "hero" ? "assets/learn-anywhere.svg" : `assets/${k}.svg`;
  heroEl.innerHTML = NAVYUG_HERO.map((s, i) => `<article class="hc-slide tone-${escapeHTML(s.tone)}" aria-roledescription="slide" aria-label="${i + 1} of ${NAVYUG_HERO.length}">
    <div class="hc-copy">${i === 0 ? "<h1>" : "<h2>"}${escapeHTML(s.title)}${i === 0 ? "</h1>" : "</h2>"}<p>${escapeHTML(s.text)}</p><a class="hc-cta" href="${escapeHTML(s.href)}">${escapeHTML(s.cta)} <span aria-hidden="true">→</span></a></div>
    <img src="${escapeHTML(photo(s.image))}" alt="" width="900" height="600"${i ? ' loading="lazy"' : ""} onerror="this.onerror=null;this.src='${local(s.image)}'"></article>`).join("");
  const slides = [...heroEl.children], dots = document.querySelector("#heroDots");
  dots.innerHTML = slides.map((_, i) => `<button type="button" aria-label="Go to slide ${i + 1}"></button>`).join("");
  const step = () => (slides[1] ? slides[1].offsetLeft - slides[0].offsetLeft : heroEl.clientWidth);
  const mark = () => { const i = Math.round(heroEl.scrollLeft / step()); [...dots.children].forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-current", k === i ? "true" : "false"); }); };
  [...dots.children].forEach((b, i) => b.addEventListener("click", () => heroEl.scrollTo({ left: i * step(), behavior: "smooth" })));
  heroEl.addEventListener("scroll", mark, { passive: true }); mark();
}
