# DevKit Club website

A full-width static homepage prepared for GitHub Pages. No build step, backend, or package installation is required to run it.

## Preview

Open `index.html` in a browser, or serve this directory locally:

```sh
python3 -m http.server 8000
```

Visit `http://localhost:8000`. Stop the server with Ctrl+C. The separately supplied `devkit-club-preview.html` embeds the assets and can also be opened directly. For the complete scroll experience, open that file in a regular browser; some document-preview panes disable scripts.

## Files

- `index.html`: homepage, tool preview, three-step setup, roadmap, updates, and FAQ
- `styles.css`: full-width responsive layout, local typography, dark color system
- `script.js`: stack selection, copy controls, header behavior, and signup link
- `motion.js`: GSAP introduction, scroll transitions, desktop pinning, rolling step numbers, motion preference
- `site-config.js`: public email signup URL configuration
- `privacy.html`: privacy notice
- `assets/hero-background.webp`: custom generated background illustration
- `assets/fonts/`: Chivo and IBM Plex Mono font files
- `assets/vendor/`: GSAP 3.15.0 and ScrollTrigger, bundled locally
- `assets/licenses/`: font licenses and third-party notices
- `DESIGN.md`: visual and motion specification
- `.nojekyll`: direct serving without Jekyll processing

## What changed in this revision

The first design’s narrow wrapper, boxed illustration, repeated cards, warm palette, and system font were replaced. This version uses edge-to-edge section backgrounds, a one-sided hero, crisp near-black surfaces, cyan accents, and locally hosted type. The header is transparent over the hero and opaque elsewhere. Headings, labels, and short standalone copy omit terminal periods.

Motion includes masked text entrances, a parallax hero exit, section rules and staggered entrances, a tilting code surface, a pinned three-step setup sequence, rolling numbers, and a closing CTA reveal. Desktop pinning requires at least 900px width and 740px height. Mobile, short windows, and reduced-motion settings keep the setup steps in normal document flow. The footer has a Reduce motion control, which respects the system preference and saves a manual choice locally.

## Email signup

No email service is connected. The site explicitly says email updates are coming soon and links to GitHub release notifications. It does not collect addresses or pretend to register subscribers.

To enable the email CTA:

1. Create a real provider-hosted form with consent, privacy information, confirmation, and unsubscribe handling
2. Put its public HTTPS URL in `signupUrl` in `site-config.js`; never add an API key
3. Test the entire subscription and unsubscribe flow with an address you control

Empty, invalid, non-HTTPS, or credential-bearing URLs keep the GitHub fallback. The hosted form owns validation and submission handling.

## Later: GitHub Pages

These files have not been uploaded or deployed. The intended repository remains `devkitclub/devkitclub.github.io`; confirm its existence and ownership at publishing time. Upload the contents of this directory to its root, preserving `assets/` and `.nojekyll`, then configure GitHub Pages for that source. All internal paths are relative, so a project subpath also works.

The domain is not assumed live, and canonical/social image URLs should be added after the actual deployment address is verified. No email service or paid plan was created.

## Verification and limits

JavaScript syntax, HTML local links and fragments, CSS parsing, actual DOM interactions, signup fallback behavior, and motion lifecycle/step navigation were checked. No supported browser-preview tool is available in this environment, so rendered desktop/mobile screenshots, scroll smoothness, and Lighthouse have not been verified. Review the standalone preview in a browser before publishing.

Product content follows the RepoReady Lite README reviewed on 2026-10-10, blob `e0a79c1a72d3d4a158748ceb8e9b1806a84354b0`. The code shown is a labeled excerpt; the complete templates remain linked on GitHub. Pro is planned, with no checkout, price, or delivery promise.

## Maintenance

There are no runtime CDN calls, analytics scripts, accounts, or backend services. Static fonts and the two animation libraries are bundled, with attribution. `devkit-reduce-motion` is the only browser storage written by this revision. The previous `devkit-theme` preference is no longer read or written.
