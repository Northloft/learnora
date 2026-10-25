"use strict";
/* Sign-in and join dialog. Demo accounts only (see NavyugStore). Replace with the LMS login when it exists. */
window.NavyugAuth = (() => {
  function open(mode = "join") {
    document.querySelector("#authDialog")?.remove();
    const join = mode !== "login";
    const d = document.createElement("dialog"); d.id = "authDialog"; d.className = "course-dialog";
    d.innerHTML = `<form class="co auth" novalidate><h2>${join ? "Join Navyug Learn for free" : "Log in to Navyug Learn"}</h2>
      ${join ? `<label>Full name<input name="name" autocomplete="name" required></label>` : ""}
      <label>Email<input name="email" type="email" autocomplete="email" required></label>
      <p class="auth-err" role="alert" hidden></p>
      <p class="p-note"><b>Demo account.</b> Your details stay in this browser. No password is collected or checked yet.</p>
      <div class="dialog-actions"><button class="button button-dark" type="submit">${join ? "Join for Free" : "Log in"}</button><button class="button button-outline" type="button" data-close>Cancel</button></div>
      <p class="auth-switch">${join ? 'Already have an account? <button type="button" class="text-link" data-switch="login">Log in</button>' : 'New to Navyug Learn? <button type="button" class="text-link" data-switch="join">Join for Free</button>'}</p></form>`;
    document.body.append(d); d.showModal();
    const f = d.querySelector("form"), err = d.querySelector(".auth-err"), show = m => { err.hidden = false; err.textContent = m; };
    d.querySelector("[data-close]").onclick = () => d.close();
    d.querySelector("[data-switch]").onclick = e => open(e.target.dataset.switch);
    f.addEventListener("submit", e => {
      e.preventDefault();
      if (!f.checkValidity()) return show(join ? "Enter your name and a valid email." : "Enter a valid email.");
      const v = Object.fromEntries(new FormData(f));
      const r = join ? NavyugStore.signUp(v.name.trim(), v.email.trim()) : NavyugStore.signIn(v.email.trim());
      if (!r.ok) return show(r.error);
      location.reload();
    });
  }
  return { open };
})();
