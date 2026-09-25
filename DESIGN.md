# Portfolio: audit and design directions

## Audit before implementation

Vite / React 19, React Router, Tailwind 4, Motion and Lenis. Home is a separate baseline; the three concepts live at /1, /2 and /3. There is no backend, project-detail route or working project dataset. Two local SVG assets; project imagery is remote stock photography. Inter and Syne are already available.

| Direction | Keep | Weakness / opportunity |
| --- | --- | --- |
| 1 — cinematic monochrome | Strong contrast, alternating project rhythm, restrained palette | Abstract image does not explain the work; delayed entrance; project surfaces do not open anything |
| 2 — expressive studio | Acid green / forest identity, confident type and section transitions | Agency language (“our”) weakens personal identity; perpetual marquee distracts; inactive calls to action |
| 3 — visual gallery | Readable project titles, staggered image rhythm, simple navigation | Shares imagery and magnetic controls with 1; stock covers replace evidence; placeholder contact details |

All three are linear image-led presentations. Shared shortcomings: hover-only information, placeholder links, multiple h1s, no reduced-motion handling, requestAnimationFrame loops that survive unmount, global hidden cursor. At the initial narrow browser size, floating concept navigation also overlaps content. Home has the useful existing email, Telegram and GitHub links; reuse those exact destinations.

## Exploration / selection

Considered a command-line interface, explorable game world, product control room, editorial journal and scientific atlas. A terminal makes recruiters learn commands; a game world adds navigation and rendering cost. Selected the atlas for immediate nonlinear discovery and the journal for calm, sequential explanation. Both use original SVG diagrams rather than decorative stock images. No new animation or rendering dependency is necessary.

## Concept 4 — Systems Atlas (/4)

- Core: choose a system and inspect how its parts relate. Breadth becomes three types of the same engineering practice.
- Identity: ink-black technical atlas, warm white lettering, signal-orange paths; Inter headings and system monospace annotations.
- Layout / hero: compact masthead, large editorial statement, asymmetric interactive map and inspector. Real content appears immediately.
- Navigation: ordinary header anchors, three native project-selection buttons, architecture / decisions / prototype views. On mobile the inspector follows the selector and a compact map.
- Projects: original architecture diagrams, explicit constraints, decisions, stack and illustrative local prototype. Existing names are retained as concept studies, never claimed as shipped work.
- Skills: mapped to interface, orchestration and runtime; about explains the connection between disciplines. Contact uses the existing Gmail / GitHub / Telegram destinations.
- Motion: short state entrances and finite path reveal on selection; no idle loop, scroll hijack or cursor replacement.
- Unique interaction: one selected system changes the map, written explanation and runnable local demonstration together.

## Concept 5 — Field Notes (/5)

- Core: an engineer’s annotated publication. The visitor reads a design argument and changes one assumption to understand its consequence.
- Identity: warm paper, black ink, editorial serif headlines, rust-red rules, mono marginalia. System Georgia avoids another font request.
- Layout / hero: issue masthead, oversized but composed two-line title, index rail and illustrated opening essay. Projects become chapters rather than cards.
- Navigation: linked table of contents, sequential chapters, native disclosures for engineering notes. Mobile becomes a reading-first single column.
- Projects: Web / AI / Games framed as three questions; diagrams illustrate state, review boundaries and feedback. Each chapter distinguishes proposed architecture from actual browser demo behavior.
- Skills / about: demonstrated in the chapter reasoning, followed by a short author note. Contact closes the publication with a real email link.
- Motion: quiet chapter entrance, diagram updates only after input, hover underlines. All animation disabled under reduced motion.
- Unique interaction: compare automatic versus human-reviewed flow inside the essay, plus a direct-input state-machine experiment.

## Content and launch constraints

No verified descriptions, roles, results, metrics, screenshots or repositories for the named projects were supplied. Therefore new pages visibly label these as illustrative studies, describe only the actual local prototype results, and do not invent shipped outcomes. Replace study data with verified case studies before public launch. Keep the existing three variants intact except necessary shared lifecycle safety. Production domain is unknown: do not invent canonical URLs or sitemap origins.

## Final review and verification

- Visual: reviewed both desktop compositions and mobile layouts in the browser. Increased supporting text size and controls in a second pass. Atlas uses a stacked inspector on tablet; Notes switches to a reading column on mobile. Fixed the 320px journal grid overflow and made its flow diagram vertical.
- UX: verified project selection, inspector selection, AI draft / review / approval, empty and valid workspace names, game Idle / Moving / Arrived / Reset, chapter navigation and native disclosure expansion. Contact destinations are the existing Home destinations; no messages were sent.
- Motion: finite SVG path reveal and panel entrance in Atlas; progressive CSS scroll reveal in Notes when supported. Reduced-motion emulation verified `animation-name: none`; restored emulation afterward. No new requestAnimationFrame loop or render library.
- Accessibility: one h1 and one main per new page, labeled SVGs, native buttons and forms, pressed-state selectors, live status messages, visible keyboard focus and skip links. Desktop/mobile checks are not a full assistive-technology certification.
- Responsive: checked at 320, 390, 768, 1024 and 1440px across the two directions; final narrow-page scroll width matches client width. No browser console warnings/errors observed on the new pages.
- Engineering: `npm run lint` and `npm run build` pass. Components, study data and styling are separate. JSDoc defines the study shape without converting the existing JavaScript project. Existing Lenis loops now cancel their frames when leaving routes; entrance timers clean up. No new dependencies.
- Performance: all concepts load by route. Shared initial JavaScript is about 233.5 KB / 75 KB gzip, versus 434.8 KB / 135.2 KB before splitting. New route chunks are roughly 7.1 and 9.2 KB plus 5.5 KB shared study code, before gzip. These are build sizes, not measured Core Web Vitals. No Lighthouse score is claimed.
- SEO: description, Open Graph text, Twitter summary, Person JSON-LD, meaningful browser titles, corrected favicon path, robots.txt. Run `npm run seo` after the production build with SITE_URL set to the actual HTTPS origin. Configure the host to rewrite application routes to index.html. Canonical URL, absolute social image and prerendering remain deployment decisions once the final direction/domain is selected.

Recommendation: Systems Atlas is the stronger primary direction for the brief because it exposes cross-disciplinary reasoning immediately. Field Notes is the quieter alternative for readers who prefer an authored technical narrative. Both are implemented independently and remain available alongside the three existing directions.
