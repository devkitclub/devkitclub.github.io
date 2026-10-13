(() => {
  'use strict';
  const header = document.getElementById('site-header');
  const hero = document.getElementById('hero');
  if (header && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      header.classList.toggle('is-over-hero', entry.isIntersecting);
    }, {rootMargin:'-80px 0px 0px 0px'}).observe(hero);
  }
  const menu = document.querySelector('.site-menu');
  menu?.addEventListener('keydown', event => {
    if (event.key === 'Escape') { menu.open = false; menu.querySelector('summary').focus(); }
  });
  document.addEventListener('click', event => {
    if (menu?.open && !menu.contains(event.target)) menu.open = false;
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  document.querySelectorAll('[data-signup]').forEach(link => {
    try {
      const url = new URL(window.DEVKIT_CONFIG?.signupUrl || '');
      if (url.protocol === 'https:' && !url.username && !url.password) link.href = url.href;
    } catch (_) { /* Keep the working static signup link. */ }
  });
  // Homepage GSAP owns its motion controls; lightweight pages need no GSAP.
  if (!document.body.classList.contains('store-page')) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.querySelector('.motion-toggle');
  let manual = false;
  try { manual = localStorage.getItem('devkit-reduce-motion') === 'true'; } catch (_) {}
  function apply() {
    const reduce = manual || preference.matches;
    document.documentElement.dataset.reducedMotion = String(reduce);
    if (!button) return;
    button.hidden = false;
    button.textContent = reduce ? 'Motion reduced' : 'Reduce motion';
    button.setAttribute('aria-pressed', String(reduce));
    button.disabled = preference.matches;
    button.title = preference.matches ? 'Reduced motion follows your device setting' : 'Switch object transitions on or off';
  }
  button?.addEventListener('click', () => {
    manual = !manual;
    try { localStorage.setItem('devkit-reduce-motion', String(manual)); } catch (_) {}
    apply();
  });
  preference.addEventListener?.('change', apply);
  window.addEventListener('storage', event => {
    if (event.key === 'devkit-reduce-motion') { manual = event.newValue === 'true'; apply(); }
  });
  apply();
})();
