
"use strict";

/*
 * Learnora — frontend prototype
 * This file uses sample data only.
 * No real accounts, enrollment service or backend is connected.
 */

const courses = [
  {
    id: "business-foundations",
    title: "Business Foundations",
    category: "Business",
    level: "Beginner",
    duration: 90,
    durationLabel: "90 minutes",
    description:
      "Understand how businesses create value, serve customers and turn ideas into useful products and services.",
    artTitle: "Think like a builder.",
    symbol: "↗",
    background: "#F2C94C",
    foreground: "#1A1A1A",
    outcomes: [
      "Explain how a business creates value.",
      "Identify customers and their basic needs.",
      "Describe the role of revenue, costs and value."
    ]
  },
  {
    id: "data-literacy",
    title: "Data Literacy: The Essentials",
    category: "Technology",
    level: "Beginner",
    duration: 120,
    durationLabel: "2 hours",
    description:
      "Learn to read basic data, interpret charts and ask better questions before making decisions.",
    artTitle: "Make sense of data.",
    symbol: "01",
    background: "#D9E4DE",
    foreground: "#1A1A1A",
    outcomes: [
      "Distinguish common data types.",
      "Read and interpret simple charts.",
      "Recognize misleading data presentations."
    ]
  },
  {
    id: "brand-strategy",
    title: "Introduction to Brand Strategy",
    category: "Business",
    level: "Beginner",
    duration: 150,
    durationLabel: "2.5 hours",
    description:
      "Explore positioning, customer perception and the choices that help a brand stand out.",
    artTitle: "Make meaning matter.",
    symbol: "B.",
    background: "#E6DCD3",
    foreground: "#1A1A1A",
    outcomes: [
      "Distinguish a brand from its visual identity.",
      "Describe a target audience and its needs.",
      "Draft a basic positioning statement."
    ]
  },
  {
    id: "design-thinking",
    title: "Design Thinking in Practice",
    category: "Design",
    level: "Beginner",
    duration: 100,
    durationLabel: "100 minutes",
    description:
      "Practice understanding user problems, generating ideas and testing early solutions.",
    artTitle: "Start with people.",
    symbol: "✳",
    background: "#DCD9EC",
    foreground: "#1A1A1A",
    outcomes: [
      "Describe the stages of design thinking.",
      "Write a clear problem statement.",
      "Plan a simple test for an idea."
    ]
  },
  {
    id: "web-fundamentals",
    title: "How the Web Works",
    category: "Technology",
    level: "Beginner",
    duration: 80,
    durationLabel: "80 minutes",
    description:
      "Discover how browsers, websites, HTML, CSS and JavaScript work together to create web experiences.",
    artTitle: "Understand the web.",
    symbol: "</>",
    background: "#D9E5EE",
    foreground: "#1A1A1A",
    outcomes: [
      "Explain the role of a browser and a server.",
      "Describe the purpose of HTML, CSS and JavaScript.",
      "Identify the basic parts of a website."
    ]
  },
  {
    id: "better-thinking",
    title: "Thinking Clearly",
    category: "Personal Growth",
    level: "Beginner",
    duration: 60,
    durationLabel: "60 minutes",
    description:
      "Build a practical approach to questions, assumptions and everyday decisions.",
    artTitle: "Question the obvious.",
    symbol: "?",
    background: "#E7E2D3",
    foreground: "#1A1A1A",
    outcomes: [
      "Separate observations from assumptions.",
      "Ask more precise questions.",
      "Compare options using simple criteria."
    ]
  }
];

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
      ...course.outcomes
    ].join(" ").toLowerCase();

    return matchesCategory && searchableText.includes(query);
  });

  const sortValue = courseSort?.value || "featured";

  if (sortValue === "title") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortValue === "duration") {
    result.sort((a, b) => a.duration - b.duration);
  }

  return result;
}

function createCourseCard(course, index) {
  return `
    <article class="course-card">
      <div class="course-art"
        style="--art-background:${course.background};
               --art-foreground:${course.foreground}">
        <span class="art-index">COURSE / ${String(index + 1).padStart(2, "0")}</span>
        <span class="art-symbol" aria-hidden="true">${escapeHTML(course.symbol)}</span>
        <span class="art-label">${escapeHTML(course.artTitle)}</span>
      </div>

      <div class="course-card-body">
        <p class="course-category">${escapeHTML(course.category)}</p>
        <h3>${escapeHTML(course.title)}</h3>
        <p class="course-description">${escapeHTML(course.description)}</p>

        <div class="course-meta">
          <span>${escapeHTML(course.level)}</span>
          <span>${escapeHTML(course.durationLabel)}</span>
        </div>

        <div class="course-card-actions">
          <button class="course-open" type="button"
            data-open-course="${escapeHTML(course.id)}"
            aria-label="View ${escapeHTML(course.title)}">
            View course <span aria-hidden="true">↗</span>
          </button>
          <span class="course-tag">SAMPLE</span>
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

    <p class="dialog-description">
      ${escapeHTML(course.description)}
    </p>

    <div class="course-meta">
      <span>${escapeHTML(course.level)}</span>
      <span>${escapeHTML(course.durationLabel)}</span>
      <span>Original sample content</span>
    </div>

    <h3 class="dialog-section-title">What you will learn</h3>

    <ul class="outcome-list">
      ${course.outcomes.map(outcome =>
        `<li>${escapeHTML(outcome)}</li>`
      ).join("")}
    </ul>

    <div class="dialog-notice">
      This is a frontend demonstration. Real enrollment and course
      completion services have not been connected yet.
    </div>

    <div class="dialog-actions">
      <button class="button button-dark" type="button"
        data-demo-start="${escapeHTML(course.id)}">
        Preview learning <span aria-hidden="true">↗</span>
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
  if (courseDialog?.open) {
    courseDialog.close();
  }

  document.body.classList.remove("dialog-open");
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(toastTimeout);

  toastTimeout = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function getSavedCourses() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("learnora-saved-courses") || "[]"
    );

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveCourse(courseId) {
  const course = courses.find(item => item.id === courseId);

  if (!course) return;

  try {
    const saved = getSavedCourses();

    if (saved.includes(courseId)) {
      showToast("This course is already saved in this browser.");
      return;
    }

    saved.push(courseId);
    localStorage.setItem(
      "learnora-saved-courses",
      JSON.stringify(saved)
    );

    showToast("Course saved in this browser.");
  } catch {
    showToast("Browser storage is unavailable. Nothing was saved.");
  }
}

function previewCourse(courseId) {
  const course = courses.find(item => item.id === courseId);

  if (!course) return;

  closeCourseDialog();

  showToast(
    `Preview selected: ${course.title}. The lesson experience is our next build step.`
  );
}

function setActiveCategory(category) {
  activeCategory = category;

  if (!categoryList) return;

  categoryList.querySelectorAll("[data-category]").forEach(button => {
    const isActive = button.dataset.category === category;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  renderCourses();
}

courseSearch?.addEventListener("input", renderCourses);
courseSort?.addEventListener("change", renderCourses);

categoryList?.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");

  if (!button) return;

  setActiveCategory(button.dataset.category);
});

courseGrid?.addEventListener("click", event => {
  const button = event.target.closest("[data-open-course]");

  if (button) {
    openCourse(button.dataset.openCourse);
  }
});

dialogContent?.addEventListener("click", event => {
  const saveButton = event.target.closest("[data-save-course]");
  const previewButton = event.target.closest("[data-demo-start]");

  if (saveButton) {
    saveCourse(saveButton.dataset.saveCourse);
  }

  if (previewButton) {
    previewCourse(previewButton.dataset.demoStart);
  }
});

dialogClose?.addEventListener("click", closeCourseDialog);

courseDialog?.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
});

courseDialog?.addEventListener("click", event => {
  if (event.target === courseDialog) {
    closeCourseDialog();
  }
});

heroSearch?.addEventListener("submit", event => {
  event.preventDefault();

  const query = heroSearchInput?.value.trim() || "";

  if (courseSearch) {
    courseSearch.value = query;
  }

  setActiveCategory("All");

  document.querySelector("#courses")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  if (query && getFilteredCourses().length === 0) {
    showToast("No matching sample courses. Try another keyword.");
  }
});

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav?.classList.toggle("open") || false;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  });
});

document.querySelectorAll('a[href="#demo"]').forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    showToast("Demo access will be built in a later step.");
  });
});

const currentYear = document.querySelector("#currentYear");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

renderCourses();
