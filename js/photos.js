"use strict";
/* Real photos: drop files in assets/photos/ and list them in assets/photos/manifest.json. No other code changes.
   Format: { "user-research": "user-research.jpg" }  (key = placeholder file name without .svg). Falls back to the placeholder. */
(async () => {
  let m = {};
  try { const r = await fetch("assets/photos/manifest.json", { cache: "no-store" }); if (r.ok) m = await r.json(); } catch {}
  if (!Object.keys(m).length) return;
  const swap = img => {
    const k = /assets\/([a-z0-9-]+)\.svg$/i.exec(img.getAttribute("src") || ""); if (!k || !m[k[1]]) return;
    img.dataset.fallback = img.getAttribute("src"); img.addEventListener("error", () => { img.src = img.dataset.fallback; }, { once: true });
    img.src = "assets/photos/" + m[k[1]];
  };
  const run = el => el.querySelectorAll('img[src^="assets/"]').forEach(swap);
  run(document);
  new MutationObserver(ms => ms.forEach(x => x.addedNodes.forEach(n => { if (n.nodeType === 1) (n.tagName === "IMG" ? swap(n) : run(n)); }))).observe(document.documentElement, { childList: true, subtree: true });
})();
