(() => {
  'use strict';
  const buttons = [...document.querySelectorAll('[data-category-filter]')];
  const cards = [...document.querySelectorAll('.product-card')];
  const toolbar = document.querySelector('.catalog-filters');
  const count = document.getElementById('catalog-count');
  if (!toolbar || !count) return;
  toolbar.hidden = false;
  function filter(category, updateUrl = false) {
    if (!buttons.some(button => button.dataset.categoryFilter === category)) category = 'all';
    const matching = new Set(window.DEVKIT_PRODUCTS.products.filter(p => category === 'all' || p.category === category).map(p => p.slug));
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.categoryFilter === category)));
    cards.forEach(card => { card.hidden = !matching.has(card.dataset.product); });
    count.textContent = `${matching.size} ${matching.size === 1 ? 'kit' : 'kits'}${category === 'all' ? '' : ` / ${buttons.find(button=>button.dataset.categoryFilter===category).textContent}`}`;
    if (updateUrl) {
      const url = new URL(location.href);
      if (category === 'all') url.searchParams.delete('category'); else url.searchParams.set('category', category);
      history.replaceState(null, '', url);
    }
  }
  buttons.forEach(button => button.addEventListener('click', () => filter(button.dataset.categoryFilter, true)));
  window.addEventListener('popstate', () => filter(new URL(location.href).searchParams.get('category') || 'all'));
  filter(new URL(location.href).searchParams.get('category') || 'all');
})();
