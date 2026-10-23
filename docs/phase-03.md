# Phase 03 — Cinematic Neural Intelligence

Implemented only the Hero, its navigation integration, and minimal About/Work/Contact targets. The other portfolio sections remain scaffolds. No existing assets were modified or deleted. No model, robot video, or attached reference image was available; the entity is original procedural geometry.

## Preview

Run `npm.cmd run dev -- --host 127.0.0.1` on Windows (or `npm run dev` elsewhere). The verified local URL for this session is http://127.0.0.1:5173/. Vite selects another port if that port is occupied.

## Rendering

`neuralGeometry.js` constructs an angular front shell with authored widths at the forehead, temples, cheeks, jaw, and chin. A depth function builds the bridge of the nose and cheek planes. Explicit cutouts form eye sockets, brow/cheek seams, a mouth plate, and an asymmetric forehead seam. Layered optical slits and temple circuitry are sampled separately so they retain detail at lower quality. This is not a sphere distribution or a downloaded head model.

The resulting typed arrays feed one BufferGeometry/Points draw for the face. Custom vertex shaders perform convergence, local movement, pointer proximity, and dissolution; fragment shaders control small digital dots and restrained cyan/mint illumination. Nine selected circuit routes use one LineSegments object with traveling signals. Sparse atmospheric dust uses one additional Points object. No lights, shadows, textures, postprocessing, or per-particle React components are needed.

Adaptive presets currently generate:

| Preset | Facial points | Maximum DPR | Atmospheric points |
| --- | ---: | ---: | ---: |
| Low | 1,942 | 1 | 30 |
| Medium | 3,660 | 1.25 | 55 |
| High | 6,471 | 1.5 | 85 |

Hardware-concurrency/device-memory hints, data-saving preference, viewport, and pointer capabilities select the starting tier. Drei PerformanceMonitor can downgrade it when sustained rendering slows. These are configured quality levels, **not measured FPS results**.

The optional WebGL scene is lazy-loaded; Three core and renderer chunks are separately cached. The initial UI does not preload Three. Rendering switches to demand mode offscreen, in a hidden tab, and under reduced motion. WebGL/context/shader errors return to a static SVG projection of the same authored face. Failed scene imports also preserve the SVG and HTML content.

## Motion

The coordinated entrance starts particles converging at 0.2 seconds, activates circuit paths at 1.1 seconds, sweeps an energy band over the face from 1.3 seconds, and illuminates the eyes at 1.65 seconds. HTML enters in order: eyebrow, first name, last name, statement, description, actions, and status. Delays range from 1.6 to 2.6 seconds. Pointer response is enabled at 3.25 seconds. Late-loading WebGL joins the current state, rather than restarting or delaying the content.

Motion owns inner HTML entrances and button hover effects. GSAP owns the outer text wrapper and scalar scene parameters. R3F reads those parameters and exclusively writes Three transforms and uniforms. The existing single Lenis instance remains synchronized with ScrollTrigger. No second scrolling controller was introduced.

Desktop uses a CSS-sticky stage plus 360–640 pixels of cinematic scroll. A scrubbed, reversible timeline fades and lifts the outer text, slightly advances the camera, brings the head toward front view, emphasizes neural paths, morphs facial points into a lateral field, then pushes that field outward. The About transition target follows naturally. There is no GSAP pin spacer or long empty region. Mobile has a dedicated, unpinned composition with the entity above the name.

Reduced motion skips the entrance, pointer response, idle movement, and dissolution; content appears immediately and the face stays stable. A manual motion toggle persists only for the mounted session, while OS reduced motion always takes precedence. Existing scroll restoration is not overridden; nonzero scroll positions and fragment navigation skip the introduction.

## Content and accessibility

All supplied Hero copy lives under `portfolio.hero`, with `isPlaceholder: true`. Verified identity/contact fields remain null. The draft note is visible. No accomplishments or contact links were invented.

There is one HTML H1. The decorative canvas/SVG do not receive keyboard focus. CTAs link to actual `#projects` and `#contact` targets, each explicitly explaining that content is pending. `#about` is only a transition target. A skip link, visible focus styles, reduced-motion control, and minimum 50px CTA heights remain available. Scroll-hidden text is made inert unless it contains keyboard focus.

## Verification completed

Follow-up blank-screen fix: the scroll component previously used a child layout effect to access its ancestor DOM ref before that ref attached. A client-mount test reproduced the null `querySelector` crash. The initialization now uses a passive effect after refs attach, with defensive element checks. `scripts/verify-hero-lifecycle.mjs` tests real React mount/Strict Mode replay, live reduced-motion toggles, exactly one active ScrollTrigger, and cleanup in jsdom. This simulated-DOM regression test is included in `npm run verify`; it is not GPU or visual browser verification.

- `npm run build`: passed without build warnings.
- `npm run lint`: passed without warnings.
- `npm run verify`: passed server-rendered single-H1/semantic checks, all anchor targets, preservation of eight unrelated scaffolds, draft metadata, deterministic finite geometry at every tier, optical detail retention, sparse connection geometry, and responsive CSS foundation checks.
- Development server launched; document and HeroScene module returned HTTP 200.
- Inspected a CPU-projected image of the procedural face to assess silhouette. This was **not** a screenshot of the browser or WebGL renderer.
- Dependency installation reported zero known vulnerabilities at install time.

## Verification limits

Browser automation was unavailable (no browser surfaces were exposed). The requested 320/390/768/1024/1440/1920px screenshots and browser layout measurements were not run. Actual shader compilation, GPU rendering, frame rate, live scroll reversibility, scroll restoration, keyboard focus, context-loss recovery, live media-query changes, and Strict Mode cleanup have implementation safeguards but still need browser validation. There are no claimed performance benchmarks.

Before publication, inspect those widths plus 200% zoom; exercise both CTA links, touch scrolling, keyboard-only navigation, manual/OS reduced motion, navigation back/forward, and simulated WebGL context loss. Confirm no overflow, text overlap, or console errors. Use a real lower-powered mobile device for performance assessment.

## Created files

```text
src/components/hero/HeroContent.jsx
src/components/hero/HeroScene.jsx
src/components/hero/NeuralEntity.jsx
src/components/hero/NeuralParticles.jsx
src/components/hero/NeuralConnections.jsx
src/components/hero/HeroAtmosphere.jsx
src/components/hero/HeroScrollSequence.jsx
src/components/hero/HeroFallback.jsx
src/components/hero/heroMotion.js
src/components/hero/neuralGeometry.js
src/components/hero/neuralShaders.js
src/hooks/useDeviceQuality.js
src/styles/hero.css
docs/phase-03.md
```

## Modified files

```text
src/components/hero/Hero.jsx
src/App.jsx
src/components/layout/Navbar.jsx
src/components/layout/Footer.jsx
src/data/portfolio.js
src/index.css
index.html
vite.config.js
package.json
package-lock.json
scripts/verify-foundation.mjs
.gitignore
README.md
```

The existing reduced-motion context/hook, magnetic buttons, scroll engine, section scaffolds, foundation preview, fonts, assets, and deployment files are retained. No new `useReducedMotion` hook was needed because the existing `useMotionPreferences` already supplies live preferences.

References: [R3F Canvas/fallbacks](https://r3f.docs.pmnd.rs/api/canvas), [R3F performance guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance), [Three Points](https://threejs.org/docs/pages/Points).

This phase ends with the Hero. No later portfolio sections have been implemented.
