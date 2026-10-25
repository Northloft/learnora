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

/* Category tiles (homepage) */
const categoryTiles = document.querySelector("#categoryTiles");
if (categoryTiles) {
  categoryTiles.innerHTML = categories.map(cat => `<a href="index.html?cat=${encodeURIComponent(cat.name)}#explore"><img src="assets/${escapeHTML(cat.image)}.svg" alt="" width="400" height="240" loading="lazy"><strong>${escapeHTML(cat.name)}</strong><small></small></a>`).join("");
}

/* Category chips come from the categories list in js/data/courses.js */
if (categoryList) {
  categoryList.innerHTML = '<button class="category-chip active" type="button" data-category="All" aria-pressed="true">All courses</button>' +
    categories.map(cat => `<button class="category-chip${cat.speciality ? " is-speciality" : ""}" type="button" data-category="${escapeHTML(cat.name)}" aria-pressed="false">${escapeHTML(cat.name)}</button>`).join("");
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

function getFilteredCourses() {
  const query = (courseSearch?.value || "").trim().toLowerCase();

  let result = courses.filter(course => {
    const matchesCategory =
      activeCategory === "All" ||
      course.category === activeCategory;

    const searchableText = [
      course.title,
      course.category,
      course.level,
      course.description,
      course.keywords || "",
      ...course.outcomes
    ].join(" ").toLowerCase();

    /* Short queries such as "ev" or "bms" must match whole words, or "ev" would match "every" and "level". */
    const matchesQuery = query.length > 3
      ? searchableText.includes(query)
      : new RegExp("(^|[^a-z0-9])" + query.replace(/[^a-z0-9]/g, "") + "([^a-z0-9]|$)").test(searchableText);

    return matchesCategory && (!query || matchesQuery);
  });

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
      <img class="course-img" src="assets/${escapeHTML(course.id)}.svg" alt="" loading="lazy">

      <div class="course-card-body">
        <p class="course-category">${escapeHTML(course.category)}${course.sample ? '<span class="sample-flag" title="Demonstration content, not an approved Navyug offering">Sample</span>' : ""}</p>
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
  }
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
    showToast("This course is already saved in this browser.");
    return;
  }
  showToast(NavyugStore.toggleSaved(courseId) ? "Course saved in this browser." : "Browser storage is unavailable. Nothing was saved.");
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

  document.querySelector("#explore")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

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

  if (window.location.pathname.endsWith("/index.html") ||
      window.location.pathname === "/" ||
      window.location.pathname.endsWith("/")) {
    const catalogSearch = document.querySelector("#courseSearch");

    if (catalogSearch) {
      setActiveCategory("All");
      catalogSearch.value = query;
      catalogSearch.dispatchEvent(new Event("input", { bubbles: true }));
    }

    document.querySelector("#explore")?.scrollIntoView({
      behavior: "smooth"
    });
  } else {
    window.location.href = "index.html?search=" + encodeURIComponent(query) + "#explore";
  }
});

const params = new URLSearchParams(window.location.search);
const initialSearch = params.get("search");

if (initialSearch) {
  const searchInput = document.querySelector("#courseSearch");

  if (searchInput) {
    searchInput.value = initialSearch;
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

/* Initial render */

renderCourses();
