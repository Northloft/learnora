"use strict";
/*
 * NavyugStore: the ONLY module that reads or writes learner data.
 * Today it persists to this browser's localStorage, namespaced per demo account. When the custom LMS exists,
 * replace these function bodies with API calls (see docs/API.md). Pages must not touch storage directly.
 * Contract: call `await NavyugStore.init()` once per page, then read synchronously from the cache.
 * Writes update the cache immediately and persist in the background. They return true on success.
 */
window.NavyugStore = (() => {
  const R = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const W = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
  const USERS = "navyug-users", SESSION = "navyug-session";
  let users = R(USERS, []), session = R(SESSION, null);
  const ns = id => `navyug:${id}:`;
  const uid = () => (session ? session.email.toLowerCase() : "guest");
  const load = () => ({ progress: R(ns(uid()) + "progress", {}), saved: R(ns(uid()) + "saved", []), orders: R(ns(uid()) + "orders", []), cart: R(ns(uid()) + "cart", []) });
  let cache = load();
  const save = n => W(ns(uid()) + n, cache[n]);
  const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
  const start = u => {
    const g = { saved: R(ns("guest") + "saved", []), cart: R(ns("guest") + "cart", []) };
    session = { name: u.name, email: u.email }; W(SESSION, session); cache = load();
    cache.saved = [...new Set([...cache.saved, ...g.saved])]; cache.cart = [...new Set([...cache.cart, ...g.cart])];
    save("saved"); save("cart");
    try { localStorage.removeItem(ns("guest") + "saved"); localStorage.removeItem(ns("guest") + "cart"); } catch {}
    return { ok: true };
  };
  return {
    init: () => Promise.resolve(),
    /* Demo accounts. No password is collected. The real LMS must handle authentication. */
    getUser: () => session,
    isSignedIn: () => !!session,
    signUp(name, email) { email = email.toLowerCase(); if (users.some(u => u.email === email)) return { ok: false, error: "An account with that email already exists. Log in instead." }; users = [...users, { name, email }]; W(USERS, users); return start({ name, email }); },
    signIn(email) { const u = users.find(x => x.email === email.toLowerCase()); return u ? start(u) : { ok: false, error: "No account found for that email. Join for Free to create one." }; },
    signOut() { session = null; try { localStorage.removeItem(SESSION); } catch {} cache = load(); },
    /* Pricing */
    formatInr: n => inr.format(n),
    priceLabel: c => (c.price > 0 ? inr.format(c.price) : "Free"),
    /* Saved courses */
    getSaved: () => cache.saved,
    isSaved: id => cache.saved.includes(id),
    toggleSaved(id) { cache.saved = cache.saved.includes(id) ? cache.saved.filter(x => x !== id) : [...cache.saved, id]; return save("saved"); },
    /* Cart (paid courses only) */
    getCart: () => cache.cart,
    inCart: id => cache.cart.includes(id),
    addToCart(id) { if (!cache.cart.includes(id)) cache.cart = [...cache.cart, id]; return save("cart"); },
    removeFromCart(id) { cache.cart = cache.cart.filter(x => x !== id); return save("cart"); },
    /* Orders. Demo only: no payment gateway is connected. */
    getOrders: () => cache.orders,
    demoCheckout(list) {
      list.forEach(c => { cache.orders = [...cache.orders, { id: "ord_" + Date.now() + c.id, courseId: c.id, amount: c.price, currency: "INR", status: "paid" }]; cache.progress[c.id] ??= { done: [], last: null }; });
      cache.cart = []; save("orders"); save("progress"); return save("cart");
    },
    canEnrol: c => !(c.price > 0) || cache.orders.some(o => o.courseId === c.id && o.status === "paid"),
    /* Enrolment and progress: { courseId: { done: [lessonId], last: lessonId } }. Requires sign-in. */
    getEnrolments: () => cache.progress,
    enrol(courseId) { if (!session) return false; cache.progress[courseId] ??= { done: [], last: null }; return save("progress"); },
    setLast(courseId, lessonId) { if (!cache.progress[courseId]) return false; cache.progress[courseId].last = lessonId; return save("progress"); },
    toggleLesson(courseId, lessonId) { const e = cache.progress[courseId]; if (!e) return false; e.done = e.done.includes(lessonId) ? e.done.filter(x => x !== lessonId) : [...e.done, lessonId]; return save("progress"); },
    /* Learner notes */
    getNote: (c, l) => { try { return localStorage.getItem(ns(uid()) + "note:" + c + "-" + l) || ""; } catch { return ""; } },
    setNote(c, l, text) { try { localStorage.setItem(ns(uid()) + "note:" + c + "-" + l, text); return true; } catch { return false; } }
  };
})();
