(() => {
  'use strict';
  const base = 'https://github.com/devkitclub/repoready-lite/blob/main/';
  const stacks = {
    python: { title: 'Python + pip + pytest', track: 'Python / pip / pytest', label: 'Python', prerequisites: 'Start with requirements.txt, requirements-dev.txt containing pytest, and tests that pass on your machine', commands: 'python -m pip install -r requirements.txt -r requirements-dev.txt\npython -m pytest', path: '.github/workflows/python-ci.yml', template: 'python/ci.yml', guide: 'docs/python.md' },
    javascript: { title: 'JavaScript + npm', track: 'JavaScript / npm', label: 'JavaScript', prerequisites: 'Start with a committed package-lock.json matching package.json and a non-interactive npm test script that passes locally', commands: 'npm ci\nnpm test', path: '.github/workflows/javascript-ci.yml', template: 'javascript/ci.yml', guide: 'docs/javascript.md' }
  };
  const code = document.getElementById('setup-code');
  const status = document.getElementById('copy-status');
  const copyButton = document.getElementById('copy-commands');
  const stackButtons = [...document.querySelectorAll('[data-stack]')];
  let selectedStack = 'python', copyAttempt = 0;
  document.querySelector('.stack-switch').hidden = false;
  stackButtons.forEach(button => button.addEventListener('click', () => {
    selectedStack = button.dataset.stack;
    const stack = stacks[selectedStack];
    copyAttempt++;
    stackButtons.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    document.getElementById('stack-title').textContent = stack.title;
    document.getElementById('stack-prerequisites').textContent = stack.prerequisites;
    document.getElementById('process-stack').textContent = stack.track;
    code.textContent = stack.commands;
    document.getElementById('workflow-path').textContent = stack.path;
    document.getElementById('workflow-file').textContent = stack.template;
    // Preserve syntax markup: only this text node changes, never user-provided HTML.
    const excerpt = document.getElementById('workflow-code');
    const nameNode = excerpt.childNodes[1];
    if (nameNode && nameNode.nodeType === 3) nameNode.textContent = ` ${stack.label} CI\n\n`;
    document.getElementById('template-link').href = base + stack.template;
    const stepLink = document.getElementById('step-template-link');
    stepLink.href = base + stack.template;
    stepLink.textContent = `Open the ${stack.label} template ↗`;
    document.getElementById('guide-link').href = base + stack.guide;
    status.textContent = ''; copyButton.textContent = 'Copy commands';
    window.dispatchEvent(new Event('devkit:layout'));
    window.ScrollTrigger?.refresh();
  }));
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const attempt = ++copyAttempt, commands = code.textContent;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(commands);
      if (attempt !== copyAttempt) return;
      copyButton.textContent = 'Copied'; status.textContent = `${stacks[selectedStack].label} commands copied`;
    } catch (_) {
      if (attempt !== copyAttempt) return;
      const selection = window.getSelection(), range = document.createRange();
      range.selectNodeContents(code); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'Commands selected: press Ctrl+C (or ⌘C), or use your device’s Copy menu';
    }
  });

  // A transparent header is used only while the hero covers the header area.
  const header = document.getElementById('site-header');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => header.classList.toggle('is-over-hero', entry.isIntersecting), {rootMargin:'-80px 0px 0px 0px',threshold:0}).observe(document.getElementById('hero'));
    const navLinks = [...document.querySelectorAll('.nav a')];
    const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (!entry.isIntersecting) return; navLinks.forEach(link => { if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); }); });
    }, {rootMargin:'-15% 0px -55% 0px',threshold:0});
    sections.forEach(section => activeObserver.observe(section));
  }
  // Native details remain fully usable without JS; filtering is progressive enhancement.
  const filters = [...document.querySelectorAll('[data-filter]')];
  const kits = [...document.querySelectorAll('.kit-row')];
  const filterBar = document.querySelector('.catalog-filters');
  filterBar.hidden = false;
  function filterKits(collection) {
    filters.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.filter === collection)));
    let count = 0;
    kits.forEach(kit => {
      kit.hidden = collection !== 'all' && kit.dataset.collection !== collection;
      if (!kit.hidden) count++;
    });
    document.getElementById('catalog-count').textContent = `${count} concepts / 0 released`;
    window.ScrollTrigger?.refresh();
  }
  filters.forEach(button => button.addEventListener('click',() => filterKits(button.dataset.filter)));
  function openLinkedKit(scroll = true) {
    const kit = kits.find(item => `#${item.id}` === location.hash);
    if (!kit) return;
    if (kit.hidden) filterKits('all');
    kit.open = true;
    window.ScrollTrigger?.refresh();
    if (scroll) requestAnimationFrame(() => kit.scrollIntoView({block:'start',behavior:'instant'}));
  }
  window.addEventListener('hashchange',() => openLinkedKit());
  window.addEventListener('load',() => openLinkedKit(),{once:true});
  openLinkedKit(false);
  try {
    const signup = new URL(window.DEVKIT_CONFIG?.signupUrl || '');
    if (signup.protocol !== 'https:' || signup.username || signup.password) return;
    document.getElementById('updates-description').textContent = 'Get news about free tools and the systems we’re exploring through our email list';
    const link = document.getElementById('updates-link'); link.href = signup.href; link.textContent = 'Join the email list ↗';
    document.getElementById('updates-note').textContent = 'The signup page explains consent and how to unsubscribe';
  } catch (_) { /* The GitHub releases fallback remains available. */ }
})();
