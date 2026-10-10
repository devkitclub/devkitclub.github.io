# DevKit Club visual system

## Direction

Dark developer editorial, with full-width chapter canvases and a photographic hero. The reference is [TasteCode](https://tastecode.dev/), used for its product clarity, restrained software typography, and scroll-led storytelling. No source code or artwork was copied from that site.

The prior boxed illustration, narrow wrapper, warm gray palette, system font, and repeated panels were retired. Existing routes, anchor IDs, product links, copy controls, language selection, and email integration were retained.

## Tokens

| Role | Choice |
| --- | --- |
| Main canvas | `#080a0d` |
| Code and FAQ surface | `#0d1117` |
| Setup chapter | `#121a21` |
| Main type | `#f1f4f5` |
| Body type | `#a5aeb9` |
| Secondary type | `#87929f` |
| Accent | `#64dee2` |
| Display and body | Chivo, local font files |
| Code and numbers | IBM Plex Mono, local font file |
| Page gutter | `clamp(24px, 4.5vw, 100px)` |
| Radius | 3px controls, 4px code panel |

User brief determines the one-sided hero, dark theme, full-width composition, and strong motion. It takes precedence over skill defaults recommending centered heroes, width caps, light themes, or randomized layouts.

## Reference analysis

Four separate horizontal design references were generated before implementation:

- Hero: left-aligned two-line heading; background fills the viewport; dark safe area behind copy; transparent navigation
- Toolkit: wide code surface with an open feature column; no nested cards; syntax uses the site’s cyan accent
- Setup: large rolling number and step navigation paired with the active instructions; a distinct slate-black chapter
- Future collection and CTA: oversized heading, open roadmap rows, and a full-width separation before the closing action

Generated reference code was not treated as real product code. The website uses a clearly labeled excerpt from the existing workflow structure, and links to the complete current templates. Generated decorative labels and extra icons were omitted.

## Motion specification

| Moment | Animation | Purpose |
| --- | --- | --- |
| Initial page entrance | Masked heading lines, staggered navigation/copy, slow background settle | Introduce message and action in reading order |
| Hero exit | Background zoom/parallax, text rises and fades with scroll | Hand off from brand introduction to product |
| Chapter entry | Horizontal rule draws in, content rises, code surface rotates gently into place | Separate chapters and bring the actual tool forward |
| Setup sequence | Pinned full-height scene with scrubbing instructions and rolling 01/02/03 | Walk through the installation steps without competing instructions |
| Roadmap and CTA | Staggered row entrances, large CTA heading moves into place | Separate future plans from the available starter |

GSAP 3.15.0 and ScrollTrigger are bundled locally. No scroll smoothing library or wheel hijacking is used. Native scrolling remains in control. Pinning is limited to desktop viewports at least 900px wide and 740px tall. Small screens use the complete vertical sequence.

The device’s reduced-motion preference disables choreography and pinning. A footer control also lets a visitor reduce motion, with the preference saved locally. Static content remains usable if JavaScript or GSAP fails to load.

## Hero asset

The built-in Image Generation tool created `assets/hero-background.webp`. Production prompt: remove all text, buttons, navigation and logos from the approved hero concept, preserving only the macro photograph of ribbed black aluminum, restrained cyan edge light, dark left-side negative space, and diagonal perspective.

The source is an illustration of industrial material, used as a brand background; it is not a photograph of a DevKit Club physical product.
