"use strict";
/* Shared header, footer, course rows and enquiry forms for every Navyug Learn page. */
(() => {
  const CONTACT = "partnerships@navyug.in";
  const page = location.pathname.split("/").pop() || "index.html";
  const aud = [["index.html", "For Individuals"], ["industries.html", "For Industries"], ["universities.html", "For Universities"], ["government.html", "For Governments"]];
  const AUD = { industries: ["for industries", "industries.html", "sectors", "By industry"], campus: ["for campus", "universities.html"], government: ["for government", "government.html"] }[document.documentElement.dataset.aud];
  const dd = (t, items) => `<details class="x-explore x-dd"><summary>${t} <span aria-hidden="true">⌄</span></summary><div>${items.map(([h, l]) => `<a href="${h}">${l}</a>`).join("")}</div></details>`;
  const subBar = AUD && `<div class="x-bar x-wrap">
      <a class="x-brand" href="${AUD[1]}" aria-label="Navyug ${AUD[0]}"><span class="brand-mark">N</span><span>navyug<i>.</i> <b>${AUD[0]}</b></span></a>
      <nav class="x-subnav" aria-label="${AUD[0]}">${dd("Why Navyug", [["#why", "Benefits"], ["#how", "How we work together"]])}${dd("Solutions", [["#courses", "Courses"], ...(AUD[2] ? [["#" + AUD[2], AUD[3]]] : []), ["#contact", "Custom programmes"]])}${dd("Resources", [["#faq", "Questions"], ["about.html", "About Navyug"], ["index.html#explore", "Browse all courses"]])}</nav>
      <span class="x-right"><a class="x-cta" href="#contact">Contact us</a></span></div>`;
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const U = NavyugStore.getUser(), nCart = NavyugStore.getCart().length;
  const initials = U ? U.name.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase() : "";
  const cartIcon = `<a class="x-cart" href="cart.html" aria-label="Cart"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6"/></svg><span class="x-badge" ${nCart ? "" : "hidden"}>${nCart}</span></a>`;
  const right = `<span class="x-right"><a class="x-link x-mylearn" href="dashboard.html"${page === "dashboard.html" ? ' aria-current="page"' : ""}>My learning</a>${cartIcon}${U ? `<details class="x-explore x-user"><summary aria-label="Account menu"><span class="x-avatar">${esc(initials)}</span></summary><div><span class="x-who">${esc(U.name)}</span><a href="dashboard.html">My learning</a><a href="cart.html">Cart</a><button type="button" data-signout>Log out</button></div></details>` : `<button class="x-link" type="button" data-auth="login">Log in</button><button class="x-join" type="button" data-auth="join">Join for Free</button>`}</span>`;
  const SOCIAL = [["LinkedIn", "https://www.linkedin.com/", '<rect x="3" y="9" width="4" height="12"/><circle cx="5" cy="5" r="2"/><path d="M10 9h4v2c1-1.5 2.5-2.4 4.5-2.4 3 0 3.5 2 3.5 5V21h-4v-6c0-1.5-.3-2.5-1.8-2.5S14 13.5 14 15v6h-4z"/>'], ["X", "https://x.com/", '<path d="M4 4l16 16M20 4L4 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>'], ["Instagram", "https://www.instagram.com/", '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2"/>'], ["YouTube", "https://www.youtube.com/", '<rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 9l5 3-5 3z"/>']]; /* PLACEHOLDER social URLs: set Navyug's real profile links here */
  const spec = categories.filter(c => c.speciality), more = categories.filter(c => !c.speciality);
  const catLink = c => `<a href="index.html?cat=${encodeURIComponent(c.name)}#explore">${c.name}</a>`;
  const header = `<header class="x-head">
    <div class="x-aud"><nav class="x-wrap" id="mainNav" aria-label="Audience">${aud.map(([h, t]) => `<a href="${h}" ${(page === h || (h === "index.html" && !aud.some(a => a[0] === page))) ? 'aria-current="page"' : ""}>${t}</a>`).join("")}</nav></div>
    ${subBar || `<div class="x-bar x-wrap">
      <a class="x-brand" href="index.html" aria-label="Navyug Learn home"><span class="brand-mark">N</span><span>navyug<i>.</i> <b>learn</b></span></a>
      <details class="x-explore"><summary>Explore <span aria-hidden="true">⌄</span></summary><div><span class="x-dd-h">EV and battery technology</span>${spec.map(catLink).join("")}<span class="x-dd-h">More subjects</span>${more.map(catLink).join("")}<a href="index.html#explore">All courses</a></div></details>
      <form class="x-search" id="navSearchForm" role="search"><label class="visually-hidden" for="navSearchInput">Search courses</label><input id="navSearchInput" type="search" placeholder="What do you want to learn?"><button type="submit" aria-label="Search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg></button></form>
      ${right}
      <button class="menu-toggle" id="menuToggle" type="button" aria-label="Open navigation" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>`}</header>`;
  const footer = `<footer class="x-foot"><div class="x-wrap x-foot-grid">
    <div class="x-foot-brand"><a class="x-brand" href="index.html"><span class="brand-mark">N</span><span>navyug<i>.</i> <b>learn</b></span></a><p>Learning for individuals, institutions and industry, with a speciality in EV and battery technology.</p><div class="x-social">${SOCIAL.map(([n, u, p]) => `<a href="${u}" target="_blank" rel="noopener noreferrer" aria-label="Navyug on ${n}"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">${p}</svg></a>`).join("")}</div></div>
    <div><strong>Explore</strong><a href="index.html#featured">Featured courses</a><a href="index.html#explore">All courses</a><a href="index.html#paths">Learning pathways</a><a href="index.html#categories">Categories</a><a href="index.html#speciality">EV and battery technology</a></div>
    <div><strong>About</strong><a href="about.html">About Navyug Learn</a><a href="index.html#why">Why Navyug Learn</a><a href="index.html#faq">FAQ</a><a href="dashboard.html">My learning (demo)</a></div>
    <div><strong>Contact</strong><a href="mailto:${CONTACT}">${CONTACT}</a><a href="mailto:${CONTACT}?subject=Support">Help and support</a></div>
    <div><strong>Teach on Navyug</strong><a href="mailto:${CONTACT}?subject=Teach%20on%20Navyug">Become an instructor</a></div>
    <div><strong>Institutions</strong><a href="industries.html">For industries</a><a href="universities.html">For universities</a><a href="government.html">For governments</a></div>
    </div><div class="x-wrap x-foot-base"><span>© ${new Date().getFullYear()} Navyug Learn</span></div></footer>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  document.currentScript.insertAdjacentHTML("afterend", header);
  document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML("beforeend", footer);
    document.addEventListener("click", e => {
      const a = e.target.closest("[data-auth]"); if (a) { e.preventDefault(); NavyugAuth.open(a.dataset.auth); }
      if (e.target.closest("[data-signout]")) { NavyugStore.signOut(); location.href = "index.html"; }
    });
    window.updateCartBadge = () => { const n = NavyugStore.getCart().length, b = document.querySelector(".x-badge"); if (b) { b.textContent = n; b.hidden = !n; } };
    const mm = document.querySelector("#menuToggle"), nav = document.querySelector("#mainNav");
    mm?.addEventListener("click", () => { const o = nav.classList.toggle("is-open"); mm.setAttribute("aria-expanded", o); });
    document.querySelectorAll("[data-row]").forEach(el => {
      const list = el.dataset.row === "all" ? courses : el.dataset.row === "featured" ? courses.filter(c => c.featured) : el.dataset.row === "speciality" ? courses.filter(c => c.speciality) : courses.filter(c => c.category === el.dataset.row);
      el.innerHTML = list.map((c, i) => createCourseCard(c, i)).join("");
    });
    const cat = new URLSearchParams(location.search).get("cat");
    if (cat && typeof setActiveCategory === "function") setActiveCategory(cat);
    document.addEventListener("click", e => document.querySelectorAll(".x-dd[open]").forEach(d => { if (!d.contains(e.target)) d.open = false; }));
    const pr = document.querySelector("#promo"), pk = "navyug-promo-closed";
    try { if (sessionStorage.getItem(pk)) pr?.remove(); } catch {}
    document.querySelector("#promoClose")?.addEventListener("click", () => { pr.remove(); try { sessionStorage.setItem(pk, "1"); } catch {} });
    document.querySelectorAll("[data-sector]").forEach(a => a.addEventListener("click", () => { const m = document.querySelector("#inquiryForm [name=message]"); if (m && !m.value) m.value = "Industry: " + a.dataset.sector + "\n\n"; }));
    const f = document.querySelector("#inquiryForm");
    f?.addEventListener("submit", e => { e.preventDefault(); if (!f.reportValidity()) return;
      const d = Object.fromEntries(new FormData(f));
      location.href = `mailto:${CONTACT}?subject=${encodeURIComponent("Enquiry from " + d.org)}&body=${encodeURIComponent(`Name: ${d.name}\nOrganisation: ${d.org}\nEmail: ${d.email}\n\n${d.message}`)}`;
      const ok = document.querySelector("#formSuccess"); if (ok) { ok.hidden = false; ok.textContent = "Your email app should open with the message ready to send."; } });
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const m = document.querySelector("main"); if (m) { m.id = m.id || "main"; m.tabIndex = -1; }
  const a = document.createElement("a"); a.className = "skip-link"; a.href = "#main"; a.textContent = "Skip to content"; document.body.prepend(a);
});
