"use strict";
/* Navyug Learn course, lesson and dashboard pages. Progress is stored in this browser. */
(() => {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const progress = () => NavyugStore.getEnrolments();            // { courseId: { done: [lessonId], last: lessonId } }
  const saved = () => NavyugStore.getSaved();

  // Extend each course with modules and lessons (one module per learning outcome).
  const cat = courses.map(c => ({ ...c, modules: c.outcomes.map((o, i) => ({
    id: `m${i + 1}`, title: o.replace(/\.$/, ""),
    lessons: [
      { id: `m${i + 1}l1`, title: "Key ideas", type: "Read", body: (window.NAVYUG_CONTENT?.[c.id]?.[i] || [])[0] || c.description },
      { id: `m${i + 1}l2`, title: "Try it yourself", type: "Practice", body: (window.NAVYUG_CONTENT?.[c.id]?.[i] || [])[1] || `Write two or three sentences in your own words: ${o.toLowerCase()}` }
    ] })) }));
  const get = id => cat.find(c => c.id === id);
  const lessons = c => c.modules.flatMap(m => m.lessons.map(l => ({ ...l, module: m.title })));
  const stats = c => { const p = progress()[c.id]; const all = lessons(c); const done = p ? all.filter(l => p.done.includes(l.id)).length : 0;
    return { done, total: all.length, pct: Math.round(done / all.length * 100), enrolled: !!p, next: all.find(l => !p?.done.includes(l.id)) || all[0] }; };
  const enroll = id => NavyugStore.enrol(id);
  const art = c => `<img class="course-img p-art" src="assets/${c.id}.svg" alt="">`;
  const bar = pct => `<div class="p-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>`;
  const note = m => typeof showToast === "function" && showToast(m);
  const root = document.querySelector("#platformRoot");
  const id = new URLSearchParams(location.search).get("id");
  const missing = () => root.innerHTML = `<div class="container p-wrap"><h1>Course not found</h1><p>That course isn't in the catalogue.</p><a class="button button-dark" href="index.html#explore">Browse courses</a></div>`;

  const gate = msg => { root.innerHTML = `<div class="x-wrap p-wrap"><h1>${msg}</h1><p class="p-lead">You need a free Navyug account to learn, save your progress and keep your notes.</p><p><button class="button button-dark" data-auth="join" type="button">Join for Free</button> <button class="button button-outline" data-auth="login" type="button">Log in</button></p></div>`; };
  function ctaHtml(c, s) {
    const learn = `learn.html?id=${c.id}&lesson=${s.next.id}`;
    if (s.enrolled) return `<a class="button button-dark" id="enrollBtn" href="${learn}">${s.done ? "Continue learning" : "Start learning"}</a>`;
    if (c.price > 0 && !NavyugStore.canEnrol(c)) return NavyugStore.inCart(c.id) ? `<a class="button button-dark" id="cartBtn" href="cart.html">Go to cart</a>` : `<button class="button button-dark" id="cartBtn" type="button">Add to cart · ${NavyugStore.priceLabel(c)}</button>`;
    return `<a class="button button-dark" id="enrollBtn" href="${learn}">Enrol for free</a>`;
  }
  function cartPage() {
    const items = NavyugStore.getCart().map(get).filter(Boolean), total = items.reduce((n, c) => n + c.price, 0);
    root.innerHTML = `<div class="x-wrap p-wrap"><h1>Your cart</h1>${items.length ? `<div class="p-two"><div class="cart-list">${items.map(c => `<div class="cart-item"><img src="assets/${c.id}.svg" alt=""><div><h3><a href="course.html?id=${c.id}">${esc(c.title)}</a></h3><p class="mono">${esc(c.type)} · ${esc(c.level)} · ${esc(c.durationLabel)}</p><button class="text-link" data-remove="${c.id}" type="button">Remove</button></div><b>${NavyugStore.priceLabel(c)}</b></div>`).join("")}</div>
      <aside class="p-side"><h3>Order summary</h3><p class="co-row"><span>${items.length} course${items.length > 1 ? "s" : ""}</span><b>${NavyugStore.formatInr(total)}</b></p>${NavyugStore.isSignedIn() ? `<button class="button button-dark" id="payBtn" type="button">Complete demo checkout</button>` : `<button class="button button-dark" data-auth="join" type="button">Join to check out</button>`}<p class="p-note"><b>Demo checkout.</b> No payment gateway is connected, so no money is taken. It only unlocks the courses in this browser.</p></aside></div>` : `<p class="empty-state">Your cart is empty. Paid courses you add will appear here.</p><p><a class="button button-dark" href="index.html#explore">Browse courses</a></p>`}</div>`;
    root.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => { NavyugStore.removeFromCart(b.dataset.remove); cartPage(); updateCartBadge(); }));
    root.querySelector("#payBtn")?.addEventListener("click", () => { NavyugStore.demoCheckout(items); location.href = "dashboard.html"; });
  }

  function coursePage() {
    const c = get(id); if (!c) return missing();
    document.title = `${c.title} — Navyug Learn`;
    const s = stats(c), isSaved = saved().includes(c.id);
    const rel = cat.filter(x => x.id !== c.id).sort((a, b) => (b.category === c.category) - (a.category === c.category)).slice(0, 4);
    root.innerHTML = `<section class="cp-hero"><div class="x-wrap cp-hero-grid"><div>
      <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="index.html?cat=${encodeURIComponent(c.category)}#explore">${esc(c.category)}</a><span>/</span>${esc(c.title)}</nav>
      <h1>${esc(c.title)}</h1><p class="p-lead">${esc(c.description)}</p>
      ${c.sample ? '<p class="sample-note"><b>Sample course.</b> This is demonstration content and has not been approved as a Navyug offering. Details, lessons and price are placeholders.</p>' : ""}
      <div class="cp-actions">${ctaHtml(c, s)}<button class="button button-outline" id="saveBtn" type="button">${isSaved ? "Saved ✓" : "Save for later"}</button></div>
      <p class="cp-sub">${s.enrolled ? s.pct + "% complete" : (c.price > 0 ? esc(c.type) + " · " + NavyugStore.priceLabel(c) + " · Learn at your own pace" : "Free " + esc(c.type).toLowerCase() + ". Learn at your own pace.")}</p></div>
      <img class="cp-cover" src="assets/${c.id}.svg" alt=""></div></section>
    <div class="x-wrap cp-facts"><div><b>${esc(c.level)}</b><span>Level</span></div><div><b>${esc(c.durationLabel)}</b><span>To complete</span></div><div><b>${c.modules.length} modules</b><span>${s.total} lessons</span></div><div><b>${NavyugStore.priceLabel(c)}</b><span>${esc(c.type)}</span></div><div><b>English</b><span>Language</span></div></div>
    <div class="x-wrap p-two cp-body"><div><h2>What you will learn</h2><ul class="cp-learn">${c.outcomes.map(o => `<li>${esc(o)}</li>`).join("")}</ul>
      <h2>Syllabus</h2>${c.modules.map((m, i) => `<details class="p-module" ${i === 0 ? "open" : ""}><summary>Module ${i + 1}: ${esc(m.title)}</summary><ul>${m.lessons.map(l => `<li><span>${esc(l.title)}</span><span class="mono">${l.type}</span></li>`).join("")}</ul></details>`).join("")}</div>
      <aside class="p-side"><h3>This course includes</h3><ul class="cp-inc"><li>${s.total} short lessons</li><li>Practice with your own notes</li><li>Progress tracking</li><li>Access on any device</li></ul>${s.enrolled ? `<div>${bar(s.pct)}<p class="mono">${s.done} of ${s.total} lessons complete</p></div>` : ""}
        <p class="p-note">Prototype: enrolment, notes and progress are stored in this browser only. No account is needed, and certificates are not available yet.</p></aside></div>
    <section class="x-sec alt"><div class="x-wrap"><h2>More courses you might like</h2><div class="rel-grid">${rel.map(x => `<a class="rel-card" href="course.html?id=${x.id}"><img src="assets/${x.id}.svg" alt=""><small>${esc(x.category)}${x.sample ? " · Sample" : ""}</small><strong>${esc(x.title)}</strong><small>${esc(x.level)} · ${esc(x.durationLabel)} · ${NavyugStore.priceLabel(x)}</small></a>`).join("")}</div></div></section>`;
    document.querySelector("#enrollBtn")?.addEventListener("click", e => {
      if (!NavyugStore.isSignedIn()) { e.preventDefault(); return NavyugAuth.open("join"); }
      if (!enroll(c.id)) note("Browser storage is unavailable. Progress won't be kept.");
    });
    document.querySelector("#cartBtn")?.addEventListener("click", e => { if (e.currentTarget.tagName !== "BUTTON") return; NavyugStore.addToCart(c.id); coursePage(); updateCartBadge(); note("Added to cart."); });
    document.querySelector("#saveBtn").addEventListener("click", e => {
      const has = NavyugStore.isSaved(c.id);
      if (NavyugStore.toggleSaved(c.id)) { e.target.textContent = has ? "Save for later" : "Saved ✓"; note(has ? "Removed from saved courses." : "Course saved."); }
      else note("Browser storage is unavailable. Nothing was saved.");
    });
  }

  function learnPage() {
    const c = get(id); if (!c) return missing();
    if (!NavyugStore.isSignedIn()) return gate("Log in to start learning");
    if (!progress()[c.id]) return root.innerHTML = `<div class="container p-wrap"><h1>Enrol to start learning</h1><p>Enrol in ${esc(c.title)} to open its lessons and track your progress.</p><a class="button button-dark" href="course.html?id=${c.id}">View course</a></div>`;
    const all = lessons(c); const want = new URLSearchParams(location.search).get("lesson");
    let i = Math.max(0, all.findIndex(l => l.id === want)); const l = all[i];
    const done = progress()[c.id].done, isDone = done.includes(l.id);
    NavyugStore.setLast(c.id, l.id);
    const s = stats(c); document.title = `${l.title} — ${c.title}`;
    const link = x => `learn.html?id=${c.id}&lesson=${x.id}`;
    root.innerHTML = `<div class="p-learn"><nav class="p-toc" aria-label="Course lessons"><a class="text-link" href="course.html?id=${c.id}">← ${esc(c.title)}</a>${bar(s.pct)}<p class="mono">${s.done} of ${s.total} lessons complete</p>
      ${c.modules.map(m => `<h2>${esc(m.title)}</h2><ul>${m.lessons.map(x => `<li><a href="${link(x)}" ${x.id === l.id ? 'aria-current="page"' : ""}><span class="p-tick">${done.includes(x.id) ? "✓" : ""}</span>${esc(x.title)}</a></li>`).join("")}</ul>`).join("")}</nav>
      <article class="p-lesson"><p class="course-category">${esc(l.module)} · ${l.type}</p><h1>${esc(l.title)}</h1><p class="p-lead">${esc(l.body)}</p>
      <label class="p-notes">Your notes<textarea id="noteBox" rows="5" placeholder="Write what you want to remember. Saved on this device."></textarea></label>
      
      <div class="dialog-actions">${i > 0 ? `<a class="button button-outline" href="${link(all[i - 1])}">Previous</a>` : ""}
      <button class="button button-dark" id="doneBtn" type="button">${isDone ? "Mark as not done" : "Mark complete"}</button>
      ${i < all.length - 1 ? `<a class="button button-outline" href="${link(all[i + 1])}">Next lesson</a>` : `<a class="button button-outline" href="dashboard.html">Finish and go to dashboard</a>`}</div></article></div>`;
    const nb = document.querySelector("#noteBox");
    nb.value = NavyugStore.getNote(c.id, l.id);
    nb.addEventListener("input", () => NavyugStore.setNote(c.id, l.id, nb.value));
    document.querySelector("#doneBtn").addEventListener("click", () => {
      NavyugStore.toggleLesson(c.id, l.id); learnPage(); const n = stats(c); if (n.pct === 100) note("Course complete. Well done.");
    });
  }

  function dashboardPage() {
    if (!NavyugStore.isSignedIn()) return gate("Log in to see your learning");
    const mine = cat.filter(c => progress()[c.id]), sv = cat.filter(c => saved().includes(c.id));
    const cont = mine.find(c => stats(c).pct < 100);
    const total = mine.reduce((n, c) => n + stats(c).done, 0), finished = mine.filter(c => stats(c).pct === 100).length;
    const row = c => { const s = stats(c); return `<a class="p-row" href="course.html?id=${c.id}">${art(c)}<div><h3>${esc(c.title)}</h3>${s.enrolled ? bar(s.pct) + `<p class="mono">${s.done}/${s.total} lessons · ${s.pct}%</p>` : `<p class="mono">${esc(c.level)} · ${esc(c.durationLabel)} · ${NavyugStore.priceLabel(c)}</p>`}</div></a>`; };
    const sugg = cat.filter(c => !progress()[c.id]).slice(0, 3);
    root.innerHTML = `<div class="x-wrap p-wrap"><h1>My learning</h1><p class="p-lead">Welcome back, ${esc(NavyugStore.getUser().name.split(" ")[0])}.</p><p class="sample-note">Demonstration only. This page shows how learning could look, using demo accounts and progress stored in this browser. It is not connected to a learning management system yet.</p>
      <div class="db-stats"><div><b>${mine.length}</b><span>Enrolled</span></div><div><b>${total}</b><span>Lessons done</span></div><div><b>${finished}</b><span>Completed</span></div><div><b>${sv.length}</b><span>Saved</span></div></div>
      ${cont ? `<section class="db-cont"><img src="assets/${cont.id}.svg" alt=""><div><p class="mono">Continue learning</p><h2>${esc(cont.title)}</h2>${bar(stats(cont).pct)}<p class="mono">${stats(cont).done} of ${stats(cont).total} lessons complete</p><a class="button button-dark" href="learn.html?id=${cont.id}&lesson=${stats(cont).next.id}">Resume</a></div></section>` : ""}
      <section><h2>Enrolled courses</h2>${mine.length ? `<div class="p-list">${mine.map(row).join("")}</div>` : `<p class="empty-state">You haven't enrolled in a course yet. Here are a few places to start.</p><div class="p-list">${sugg.map(row).join("")}</div>`}</section>
      <section><h2>Saved courses</h2>${sv.length ? `<div class="p-list">${sv.map(row).join("")}</div>` : `<p class="empty-state">Courses you save will appear here. <a class="text-link" href="index.html#explore">Browse the catalogue</a></p>`}</section></div>`;
  }

  const strip = document.querySelector("#continueStrip");
  if (strip) {
    const c = cat.find(x => progress()[x.id] && stats(x).pct < 100);
    if (c) { const s = stats(c); strip.hidden = false; strip.innerHTML = `<div class="container p-strip"><div><p class="mono">Continue learning</p><strong>${esc(c.title)}</strong></div><div class="p-strip-bar">${bar(s.pct)}<span class="mono">${s.pct}%</span></div><a class="button button-dark button-small" href="learn.html?id=${c.id}&lesson=${s.next.id}">Resume</a></div>`; }
  }
  if (root) NavyugStore.init().then(() => ({ course: coursePage, learn: learnPage, dashboard: dashboardPage, cart: cartPage })[root.dataset.page]?.());
})();
/* Topic tile counts follow the catalogue */
(() => document.querySelectorAll(".x-tiles a[href*='cat=']").forEach(a => { const k = decodeURIComponent(a.href.split("cat=")[1].split("#")[0]), n = courses.filter(c => c.category === k).length, s = a.querySelector("small"); if (s) s.textContent = `${n} ${n === 1 ? "course" : "courses"}`; }))();

/* Homepage hero search and quick topics */
(() => {
  const f = document.querySelector("#heroSearchForm"); if (!f) return;
  const go = q => { const s = document.querySelector("#courseSearch"); if (s) { s.value = q; s.dispatchEvent(new Event("input", { bubbles: true })); } document.querySelector("#explore")?.scrollIntoView({ behavior: "smooth" }); };
  f.addEventListener("submit", e => { e.preventDefault(); go(f.querySelector("input").value.trim()); });
  document.querySelectorAll("[data-quick]").forEach(b => b.addEventListener("click", () => go(b.dataset.quick)));
})();
