// Behaviour shared by every page: theme, top bar, scroll progress, reveal on scroll, the photo, a clock.
(function () {
  const root = document.documentElement;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));

  // light is the default; the dark choice is remembered
  function theme() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  function setTheme(next) {
    if (next === "dark") root.setAttribute("data-theme", "dark"); else root.removeAttribute("data-theme");
    try { localStorage.setItem("theme", next); } catch (e) {}
    const meta = $('meta[name="theme-color"]'); if (meta) meta.setAttribute("content", next === "dark" ? "#1a1810" : "#f2ecdf");
    const b = $("#theme"); if (b) b.setAttribute("aria-label", next === "dark" ? "Switch to the light theme" : "Switch to the dark theme");
  }

  document.addEventListener("DOMContentLoaded", function () {
    setTheme(theme());
    const tb = $("#theme"); if (tb) tb.addEventListener("click", () => setTheme(theme() === "dark" ? "light" : "dark"));

    // top bar: solid after a little scroll, progress line, small-screen menu
    const nav = $(".nav"), bar = $(".progress");
    function onScroll() {
      const y = window.scrollY || 0;
      if (nav) nav.classList.toggle("scrolled", y > 8);
      if (bar) { const h = document.documentElement.scrollHeight - innerHeight; bar.style.setProperty("--p", h > 0 ? Math.min(1, y / h).toFixed(4) : 0); }
    }
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    const mb = $("#menu-btn");
    if (mb && nav) {
      mb.addEventListener("click", () => { const o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o ? "true" : "false"); mb.textContent = o ? "Close" : "Menu"; });
      $$(".nav-links a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); mb.textContent = "Menu"; }));
    }

    // which section you are in
    const links = $$('.nav-links a[href^="#"]');
    if (links.length && "IntersectionObserver" in window) {
      const byId = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
      const spy = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) links.forEach(a => a.setAttribute("aria-current", a === byId.get(e.target.id) ? "true" : "false"));
      }), { rootMargin: "-40% 0px -55% 0px" });
      ["work", "built", "been", "written", "more", "contact", "hero"].forEach(id => { const s = document.getElementById(id); if (s) spy.observe(s); });
    }

    // things rise into place as you reach them
    const items = $$(".reveal");
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      items.forEach((el, i) => { el.style.setProperty("--d", (i % 3) * 70 + "ms"); io.observe(el); });
    } else items.forEach(el => el.classList.add("in"));

    // the photo: shown once images/me.jpg loads (the top-bar picture too); it leans toward the pointer a little
    const probe = new Image();
    probe.onload = function () { $$("[data-photo]").forEach(el => el.classList.add("has-photo")); root.classList.add("has-photo"); };
    probe.src = "/images/me.jpg";
    const photo = $(".photo-frame");
    if (photo && !reduce && matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const hero = $(".hero");
      hero.addEventListener("pointermove", e => {
        const r = photo.getBoundingClientRect(), x = (e.clientX - (r.left + r.width / 2)) / innerWidth, y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
        photo.style.setProperty("--ry", (x * 9).toFixed(2) + "deg"); photo.style.setProperty("--rx", (-y * 7).toFixed(2) + "deg");
      });
      hero.addEventListener("pointerleave", () => { photo.style.setProperty("--ry", "0deg"); photo.style.setProperty("--rx", "0deg"); });
    }

    // the time in Hiroshima
    const clocks = $$("[data-tz]");
    function tick() { clocks.forEach(el => { try { el.textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: el.dataset.tz }).format(new Date()); } catch (e) {} }); }
    if (clocks.length) { tick(); setInterval(tick, 15000); }

    // after the talk, say so
    const talk = $("#talk");
    if (talk && new Date(talk.dataset.date + "T23:59:59") < new Date()) {
      const a = $("a", talk);
      talk.innerHTML = "<b>Recently:</b> on 17 October I gave a talk on this at the Chugoku-section joint conference of electrical and information engineers, in Hiroshima (" + (a ? a.outerHTML : "programme") + ").";
    }

    const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();
  });
})();
