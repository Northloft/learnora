"use strict";
/* Renders the Industries, Universities and Government pages from js/data/audiences.js. Needs catalogue.js (escapeHTML, createCompactCard). */
(function () {
  const key = document.documentElement.dataset.aud, A = window.NAVYUG_AUDIENCES && NAVYUG_AUDIENCES[key], root = document.querySelector("#main");
  if (!A || !root) return;
  const e = s => escapeHTML(String(s));
  document.title = A.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", A.description);

  const ICONS = {
    book: '<path d="M4 19V5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M8 8h6M8 12h6"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5.5a3 3 0 0 1 0 5.8M18 14.3c2 .7 3.4 2.6 3.4 5.7"/>',
    chart: '<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>'
  };
  const ico = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ICONS.check}</svg>`;

  /* Numbers calculated from the catalogue, never typed in. */
  const num = {
    courses: courses.length,
    hours: Math.round(courses.reduce((t, c) => t + (c.duration || 0), 0) / 60),
    spec: courses.filter(c => c.speciality).length,
    free: courses.filter(c => c.price === 0).length,
    levels: new Set(courses.map(c => c.level)).size,
    formats: new Set(courses.map(c => c.type)).size
  };
  const fill = s => s.replace(/\{(\w+)\}/g, (_, k) => num[k] ?? "");
  const byId = id => courses.find(c => c.id === id);
  const audImg = (window.NAVYUG_IMAGES && NAVYUG_IMAGES.audiences && NAVYUG_IMAGES.audiences[key]) || "";
  const fallback = "assets/aud-" + key + ".svg";
  const photo = `<img src="${e(audImg || fallback)}" alt="" onerror="this.onerror=null;this.src='${fallback}'">`;

  const h = A.hero;
  const hero = h.variant === "band"
    ? `<section class="ah ah-band"><div class="x-wrap ah-grid"><div><h1>${e(h.h1)}</h1><p class="ah-lead">${e(h.lead)}</p>
        <div class="ah-cta"><a class="button ah-btn" href="${h.cta[1]}">${e(h.cta[0])}</a><a class="ah-ghost" href="${h.ghost[1]}">${e(h.ghost[0])}</a></div></div>
        <ul class="ah-panel">${h.panel.map(p => `<li><span class="ic">${ico(p[0])}</span><strong>${e(p[1])}</strong><small>${e(p[2])}</small></li>`).join("")}</ul></div></section>`
    : `<section class="ah"><div class="x-wrap ah-grid"><div><h1>${e(h.h1)}</h1><p class="ah-lead">${e(h.lead)}</p>
        <ul class="tick-list">${h.ticks.map(t => `<li>${e(t)}</li>`).join("")}</ul>
        <div class="ah-cta"><a class="button button-dark" href="${h.cta[1]}">${e(h.cta[0])}</a><a class="ah-ghost" href="${h.ghost[1]}">${e(h.ghost[0])}</a></div></div>
        <div class="ah-photo">${photo}</div></div></section>`;

  const stats = `<section class="ab-stats-wrap"><div class="x-wrap"><ul class="ab-stats">${A.stats.map(s => `<li><b>${e(fill(s[0]))}</b><span>${e(s[1])}</span></li>`).join("")}</ul></div></section>`;

  const net = A.network, all = (window.NAVYUG_NETWORK || []).flatMap(g => g.items);
  const names = net.only || ((window.NAVYUG_NETWORK || []).find(g => g.group === net.group) || { items: [] }).items.map(i => i.name);
  const mono = n => n.replace(/\(.*?\)/g, "").split(/[\s,]+/).filter(w => /^[A-Za-z]/.test(w) && w.length > 2).map(w => w[0]).join("").slice(0, 3).toUpperCase();
  const tiles = names.map(n => all.find(o => o.name === n)).filter(Boolean)
    .map(o => `<li class="net-logo" title="${e(o.name)}">${o.logo ? `<img src="${e(o.logo)}" alt="${e(o.name)}" height="44" loading="lazy">` : `<span class="net-mono" aria-hidden="true">${e(mono(o.name))}</span><span class="net-name">${e(o.name)}</span>`}</li>`).join("");
  const network = `<section class="x-sec"><div class="x-wrap ab-split"><div><p class="eyebrow">${e(net.eyebrow)}</p><h2>${e(net.title)}</h2><p class="x-sub">${e(net.text)}</p>
      <ul class="tick-list ab-ticks">${net.ticks.map(t => `<li>${e(t)}</li>`).join("")}</ul></div><ul class="net-tiles">${tiles}</ul></div></section>`;

  const f = A.features;
  const features = `<section class="x-sec ${f.dark ? "ab-dark" : "alt"}" id="${f.id}"><div class="x-wrap"><h2>${e(f.title)}</h2>${f.text ? `<p class="x-sub">${e(f.text)}</p>` : ""}
      <div class="ab-feat">${f.items.map(i => `<div><span class="ic">${ico(i[0])}</span><h3>${e(i[1])}</h3><p>${e(i[2])}</p></div>`).join("")}</div></div></section>`;

  const t = A.tracks;
  const tracks = `<section class="x-sec" id="${t.id}"><div class="x-wrap"><p class="eyebrow">${e(t.eyebrow)}</p><h2>${e(t.title)}</h2><p class="x-sub">${e(t.sub)}</p>
      <div class="trk-grid">${t.items.map(tr => {
        const list = tr.courses.map(byId).filter(Boolean);
        return `<article class="trk"><img class="trk-img" ${courseImgAttrs(list[0])} alt="" loading="lazy"><div class="trk-body"><h3>${e(tr.name)}</h3><p>${e(tr.text)}</p>
          <div class="trk-list">${list.map(createCompactCard).join("")}</div><a class="text-link" href="${tr.more[1]}">${e(tr.more[0])} →</a></div></article>`;
      }).join("")}</div></div></section>`;

  const c = A.cards;
  const cards = `<section class="x-sec alt" id="${c.id}"><div class="x-wrap"><h2>${e(c.title)}</h2><p class="x-sub">${e(c.sub)}</p><div class="sector-grid">${c.items.map(i =>
    c.sector ? `<a href="#contact" data-sector="${e(i[0])}"><strong>${e(i[0])}</strong><span>${e(i[1])}</span><em>Talk to us about this →</em></a>`
             : `<div class="use-card"><strong>${e(i[0])}</strong><span>${e(i[1])}</span></div>`).join("")}</div></div></section>`;

  const how = `<section class="x-sec" id="${A.how.id}"><div class="x-wrap"><h2>${e(A.how.title)}</h2><div class="x-steps">${A.how.steps.map((s, i) => `<div><b>${i + 1}</b><span><h3>${e(s[0])}</h3><p>${e(s[1])}</p></span></div>`).join("")}</div></div></section>`;

  const faq = `<section class="x-sec alt" id="${A.faq.id}"><div class="x-wrap"><h2>Questions</h2><div class="x-faq">${A.faq.items.map(q => `<details><summary>${e(q[0])}</summary><p>${e(q[1])}</p></details>`).join("")}</div></div></section>`;

  const k = A.contact, ex = k.extra;
  const contact = `<section class="x-sec" id="contact"><div class="x-wrap ab-contact"><div><h2>${e(k.title)}</h2><p class="x-sub">${e(k.text)}</p><ul class="tick-list ab-ticks">${k.ticks.map(x => `<li>${e(x)}</li>`).join("")}</ul></div>
    <form class="x-form" id="inquiryForm"><h2>Send an enquiry</h2>
      <label>Your name<input name="name" required autocomplete="name"></label>
      <label>${e(k.orgLabel)}<input name="org" required autocomplete="organization"></label>
      <label>Work email<input name="email" type="email" required autocomplete="email"></label>
      <label>${e(ex.label)}<select name="${ex.name}" required><option value="">Select</option>${ex.options.map(o => `<option>${e(o)}</option>`).join("")}</select></label>
      <label>What would you like to achieve?<textarea name="message" rows="4" required></textarea></label>
      <button class="button button-dark" type="submit">Send enquiry</button><p class="p-note" id="formSuccess" hidden></p>
      <p class="p-note">This opens your email app with the message ready to send to our team.</p></form></div></section>`;

  const LINKS = { industries: ["For Industries", "Role-based learning for teams and organisations.", "industries.html"], universities: ["For Universities", "Practical courses that sit alongside degree programmes.", "universities.html"], government: ["For Governments", "Skills programmes for public servants and citizens.", "government.html"], individuals: ["For Individuals", "Browse courses and learn on your own.", "index.html"] };
  const cross = `<section class="x-sec alt"><div class="x-wrap"><h2>Looking for something else?</h2><div class="aud-cross">${A.cross.map(x => `<a href="${LINKS[x][2]}"><strong>${LINKS[x][0]}</strong><span>${LINKS[x][1]}</span></a>`).join("")}</div></div></section>`;

  root.innerHTML = hero + stats + network + features + tracks + cards + how + faq + contact + cross;
})();
