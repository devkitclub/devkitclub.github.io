# DevKit Club website

A full-width static homepage prepared for GitHub Pages. No build step, backend, or package installation is required to run it.

## Preview

Open `index.html` in a browser, or serve this directory locally:

```sh
python3 -m http.server 8000
```

Visit `http://localhost:8000`. Stop the server with Ctrl+C. The separately supplied `devkit-club-preview.html` embeds the assets and can also be opened directly. For the complete scroll experience, open that file in a regular browser; some document-preview panes disable scripts.

## Files

- `index.html`: homepage, tool preview, setup, ImportKit spotlight, ten-concept catalog, engineering standards, proposed validation sequence, updates, and FAQ
- `styles.css`: full-width responsive layout, local typography, dark color system
- `objects.css`: CLI styling, responsive concept catalog, terminal slab, exploded pipeline, and isolated packet geometry
- `script.js`: stack selection, copy controls, header behavior, concept filters/deep links, and signup link
- `motion.js`: GSAP introduction, pointer response, 3D scroll choreography, desktop pinning, rolling step numbers, motion preference
- `site-config.js`: public email signup URL configuration
- `privacy.html`: privacy notice
- `assets/hero-background.webp`: previous background, retained as an unused asset; the new hero uses CSS geometry
- `assets/fonts/`: Chivo and IBM Plex Mono font files
- `assets/vendor/`: GSAP 3.15.0 and ScrollTrigger, bundled locally
- `assets/licenses/`: font licenses and third-party notices
- `DESIGN.md`: visual and motion specification
- `.nojekyll`: direct serving without Jekyll processing

## What changed in this revision

The dark Chivo / IBM Plex Mono system and full-width chapters are retained. Monospaced navigation, path labels, square filter controls, an expandable file-list catalog, and small status readouts add CLI character without turning the page into a fake command interface. The header remains transparent only over the hero.

The hero now contains a code-native, six-sided terminal slab with a screen, metal bezel, side vents, and depth. Fine-pointer movement tilts an inner rig; scrolling rotates a separate outer rig. ImportKit uses four 3D pipeline layers that spread apart on scroll. Three isolated packet cubes converge and rotate through the engineering section. No Three.js, WebGL, image request, or additional dependency is required.

The October 10 premium-systems catalog replaces the old generic Pro teaser. All ten candidates are clearly marked as concepts; ImportKit is the first validation hypothesis, and ReleaseKit is the smaller paid experiment. The Data / Infrastructure / SaaS filters update counts, and each product expands to show its proposed scope and failure tests. Concept deep links reveal their target even after filtering. There are no invented launch dates, prices, achieved demonstrations, or checkout flows.

Motion also retains masked text entrances, section rules, a tilting code surface, a pinned setup sequence, rolling numbers, and a closing CTA reveal. Phone styling is in `mobile.css`: compact pinned setup, horizontal step navigation, wrapping commands, larger touch targets, and a smaller hero. Setup pinning is enabled when the measured content fits the viewport; short screens use sticky navigation with normal-flow instructions. The ImportKit object pins separately on phones when it fits. Width and language changes rebuild the scene, while mobile toolbar-only height changes do not interrupt it. System or manual reduced motion removes pinning, pointer listeners, and GSAP choreography. Touch devices do not require hover. No perpetual animation loop runs for decorative objects; movement is input-driven. DOM checks passed; rendered phone layout and scroll smoothness still need device review.

## Email signup

The website links to the MailerLite-hosted signup form:

https://preview.mailerlite.io/forms/2704240/201068731093223124/share

The URL is configured in `site-config.js` and in the HTML updates link so signup also works without JavaScript. Keep both URLs synchronized if the form changes. No API key or embedded provider script is used.

The owner reported a successful subscription on October 11, 2026. Confirmation delivery, unsubscribe behavior, and welcome automation have not been independently verified. The provider handles form validation and subscriptions; the website does not claim signup success itself.

## GitHub Pages

Source is in `devkitclub/devkitclub.github.io`, targeting https://devkitclub.github.io. Phase 1 completion was confirmed by the owner. Check the repository’s Pages deployment status for each change. All internal paths are relative.

## Verification and limits

JavaScript syntax, HTML local links and fragments, both stylesheets, concept counts/filters/deep links, pointer response and cleanup, actual DOM controls, signup fallbacks, and motion lifecycle/step navigation were checked. No supported browser-preview tool is available in this environment, so rendered desktop/mobile layout, physical perspective, scroll smoothness, and Lighthouse have not been verified. Review the standalone preview in a browser before publishing.

Existing RepoReady Lite content follows its README reviewed on 2026-10-10, blob `e0a79c1a72d3d4a158748ceb8e9b1806a84354b0`; the repository was not revalidated in this revision. The code shown is a labeled excerpt, with complete templates linked on GitHub. Roadmap content follows the supplied `02-devkit-club-premium-top-10.md`, dated 2026-10-10. Proposed demos and engineering standards are goals, not completed results.

## Maintenance

There are no runtime CDN calls, analytics scripts, accounts, or backend services. Static fonts and the two animation libraries are bundled, with attribution. `devkit-reduce-motion` is the only browser storage written by this revision. The previous `devkit-theme` preference is no longer read or written.
