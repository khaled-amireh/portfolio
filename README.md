# Khaled Amireh — AI & Machine Learning Portfolio

React, Vite, and Tailwind CSS 4 portfolio with cinematic motion, a neural wolf Hero, selected projects, experience, education, certifications, and contact information.

## Local development

Use Node 24 (`.node-version`). On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

```sh
npm ci
npm run dev
npm run verify
npm run lint
npm run build
npm run preview
```

Vite prints the local development URL when it starts. The production output is `dist/`.

## Content and assets

Portfolio content and external links live in `src/data/portfolio.js`. The six project covers, neural portrait, wolf artwork, and certification previews are imported from `src/assets/images/`. The Hero uses the supplied `Wolf.jpg`; the earlier procedural face and its assets remain in the repository for reference but are not part of the active render.

The portfolio uses one primary heading. Animation respects the system reduced-motion preference and the on-page motion control. Lenis owns optional smooth scrolling, while scoped GSAP ScrollTriggers handle the section sequences.

## Deployment

`render.yaml` configures a Render Static Site with `npm ci && npm run build` and publish directory `dist`. The same settings can be entered manually in Render. Relative Vite asset paths support the site at a root or repository subpath. Navigation uses same-page anchors, so no client-side route rewrite is needed.

The page has no canonical URL until a public domain is known. Keep the static metadata in `index.html` aligned with `portfolio.site.title` and `portfolio.site.description` when updating it. Do not commit secrets or the generated `dist/` directory.

This local folder is not itself an initialized Git repository. Create or connect a repository only when ready to publish; no deployment is performed by the build command.

## Verification

`npm run verify` exercises semantic rendering, content/anchor checks, client interactions, reduced-motion changes, Strict Mode replay, and ScrollTrigger cleanup in a simulated DOM. `npm run lint` and `npm run build` check source quality and production bundling. Visual behavior should also be reviewed in a real browser before publishing.
