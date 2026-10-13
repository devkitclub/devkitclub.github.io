(() => {
  'use strict';
  const catalog = window.DEVKIT_PRODUCTS;
  const purchase = document.querySelector('[data-purchase]');
  const product = catalog?.products.find(p => p.slug === purchase?.dataset.purchase);
  // Static HTML is gated at build time, then checked again here.
  purchase?.querySelectorAll('[data-checkout]').forEach(link => {
    if (catalog.canPurchase(product)) link.href = product.checkoutUrl;
    else {
      link.href = window.DEVKIT_CONFIG.signupUrl;
      link.textContent = 'Notify me when available ↗';
      link.removeAttribute('data-checkout');
    }
  });
  document.querySelectorAll('[data-copy]').forEach(button => {
    const code = document.getElementById(button.dataset.copy);
    const status = button.closest('.product-commands').querySelector('[role=status]');
    if (!code) return;
    button.hidden = false;
    button.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(code.textContent);
        status.textContent = 'Commands copied'; button.textContent = 'Copied';
      } catch (_) {
        const range = document.createRange(); range.selectNodeContents(code);
        const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
        status.textContent = 'Commands selected — use your device’s Copy command';
      }
    });
  });
})();
