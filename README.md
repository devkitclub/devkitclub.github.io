# DevKit Club website

Static multi-page storefront at https://devkitclub.github.io/ — no backend, cart, account system, or runtime build service.

## Edit and preview

Serve the repository root over HTTP because navigation uses root-relative URLs:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. `mobile-preview.html` offers selectable viewport sizes and pages for responsive checks; it is noindex and is not device emulation.

## Content architecture

- `index.html`: preserved terminal hero, featured products, RepoReady Lite workbench and sticky setup, ImportKit layered animation, kit contents, newsletter, FAQ
- `data/products.js`: single public source for ten product identities, descriptions, proposed prices, categories, compatibility, availability, and guarded checkout links
- `scripts/build-pages.cjs`: build-time HTML templates for the store, ten product pages, free tools, guides, about, support, privacy, terms, refunds, and 404; also updates the shared header/footer and featured homepage cards
- `storefront.css`, `product.css`: extensions of the existing full-width Chivo / IBM Plex Mono, cyan, near-black design
- `shared.js`: native mobile menu behavior, header transparency, signup links, lightweight-page motion preference
- `storefront.js`: progressive category filters with URL state; all cards remain available without JavaScript
- `product.js`: command copying and an additional runtime checkout guard
- `script.js`: original homepage language switch, copy controls, newsletter
- `motion.js`, `objects.css`, `mobile.css`: retained 3D hero, scroll scenes, phone layout, reduced-motion fallback
- `site-config.js`: public MailerLite URL; no secrets

After editing catalog data or page templates, regenerate the static files and commit both source and generated output:

```sh
node scripts/build-pages.cjs
```

No Node dependencies are needed to generate pages. GitHub Pages serves the committed HTML directly. Important descriptions, prices, requirements, and notification links work without JavaScript.

## Product availability and checkout

ReleaseKit 1.0.1 content was checked against its private README, quickstart, validation evidence, and draft license/support documents on October 13, 2026. Only descriptions and a short setup excerpt are public; no private toolkit source or downloadable archive is included.

ReleaseKit remains a preview. The other nine product pages describe the supplied catalog's intended scope and are marked coming soon. Every listed premium price is proposed; RepoReady Lite is available free. No public purchase link currently collects payment.

`canPurchase()` requires all of these:

- `availability: 'available'`
- `deliveryVerified: true`
- `termsApproved: true`
- `priceConfirmed: true`, a positive numeric USD price
- A valid HTTPS checkout URL on `devkitclub.lemonsqueezy.com`

The ReleaseKit checkout URL is saved in the catalog but not exposed as a purchase action. Before activation, confirm the actual downloadable ZIP and buyer fulfillment, final price, license, private support contact, update period, and refund terms. The current private product documents still identify the terms as drafts. Do not switch flags based only on a successful test checkout.

After verification, update the catalog, current informational policy pages, and storefront availability note in the generator together, then rebuild. Never publish the private premium repository or package to provide delivery.

## Preserved behavior

Desktop retains the pointer-reactive six-sided terminal and scrolling monospace backdrop; phones hide the terminal. Setup uses native sticky scenes when content fits, falling back to normal instructions and sticky navigation on short screens. ImportKit retains its four-layer scroll animation. System or manual reduced motion removes pinning and choreography. New pages load neither GSAP nor ScrollTrigger.

MailerLite signup remains at https://preview.mailerlite.io/forms/2704240/201068731093223124/share. Signup opens the provider form without embedded tracking or API credentials; there is no product-specific subscription claim.

## Deployment and verification

Commit to `main` in `devkitclub/devkitclub.github.io`, then verify the GitHub Pages deployment. Keep changed CSS/JS URLs versioned to prevent mixed cached revisions.

Check internal links and fragments, metadata and headings, JavaScript syntax, category filters, language switching, copy behavior, checkout gating, mobile navigation, desktop and phone layout, sticky scenes, and reduced motion. Browser viewport checks do not replace physical iOS/Android testing.
