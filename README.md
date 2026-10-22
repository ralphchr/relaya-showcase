# Relaya product showcase

A separate, static presentation site for Relaya. It reuses the app's logo, illustrations, fonts, and color palette, and recreates representative app screens with sample data. The showcase does not import the original app, connect to its API, or require a database, authentication, microphone access, or meeting service.

`index.html` extends the original app's landing page into a scrolling, demo-first showcase: hero, seven-step interactive tour, features, an animated sample flow, delivery modes, use cases, and an interest survey. The focused tour remains available at `demo.html`; the video demonstration has its own `video.html` page.

The exact original design tokens and landing CSS are copied into `src/styles/source-landing/`. The base stylesheet only changes font URLs from `/fonts/` to `/assets/`; the font binaries and logo match the original app. New section arrangements live in `src/styles/showcase-extension.css`. The original application is not modified.

The demo screens use the original app's styles and matching markup with sample data. They render in an isolated 1440 × 900 document and scale proportionally in the gallery and expanded viewer. See `src/app-preview/README.md` for the source mapping. Add approved screenshots and a demo recording later using the media steps below.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Install and run

From this folder:

```sh
npm install
npm run dev
```

The showcase runs at `http://127.0.0.1:5175`, leaving port 5173 available for the main Relaya app. It stops if port 5175 is already occupied. To make a static production build:

```sh
npm run build
npm run preview
```

The production files are written to `dist/`. No environment variables or backend services are needed.

## Configure the interest survey

Edit `src/data/interest.ts` and paste the published Google Forms `viewform` URL into `interestForm.embedUrl`. Optionally supply a separate Google Forms or `forms.gle` link in `openUrl`. The embed automatically adds `embedded=true`, and the fallback link opens the form in a new tab. Without an explicit fallback URL, it is derived from the embed URL.

Until configured, the final section shows a survey-coming-soon placeholder. It does not display fake inputs or claim to collect responses. The iframe is responsive, lazy loaded, and always accompanied by the fallback link when a form is configured.

## Interactive tour and motion

All seven demonstrations remain available. `src/data/tour.ts` controls each description, accent, floating position, and preview composition. `useFeatureTour` handles fade-out, preview switching, fade-in, wraparound, rapid input, and reduced-motion preferences. Arrow keys, Home, and End work while the tour has focus; the native selector keeps its own keyboard behavior.

The first screen is a capture of the original app. Other screens are isolated, inert samples rendered with the original app's styles. Google Meet is explicitly illustrated. Feature and use-case links select the relevant step. No microphone, account, or meeting connection is created.

## Add screenshots and video

Media and copy are registered centrally in `src/data/showcase.ts`. Put image files in `public/screenshots/` and video files in `public/videos/`.

For a screenshot, set the matching `src` field to a root-relative public path, while leaving the `screen` value as the fallback if the image is missing:

```ts
{
  id: "sentence-review",
  title: "Review your sentence",
  caption: "Read the suggested English before it is delivered.",
  screen: "sentence",
  src: "/screenshots/sentence-review.webp",
}
```

The same `src` field is available for each feature, walkthrough step, gallery item, and use case. The fallback screen is shown if an image is not configured or fails to load, so there are no broken-image boxes. Use PNG, JPEG, or WebP and crop to the part of the app you want visitors to inspect.

For a video, add an MP4 or WebM to `public/videos/`, then set `demoVideo.src` in the same data file. Optionally set `demoVideo.poster` to a screenshot path. The video uses the browser's controls, including play, pause, volume, and fullscreen. If the path fails, the designed video placeholder remains visible.

Use sample accounts and redact email addresses, meeting links, private names, and other personal information from any media before adding it.

## Content and project details

Edit feature descriptions, benefits, the guided steps, screenshot captions, use cases, video copy, and project details in `src/data/showcase.ts`. Project team and contact details were not in the source repository, so the page shows clear editable placeholders. Replace those with approved details before a public launch.

The project status and stack description are based on the repository's current frontend README and package configuration. Update them as the product changes.

## Deploy as a static website

This site is independently buildable and can be deployed to any static host. Publish the contents of `dist/`; no server-side routes are required.

For Vercel, use the existing repository but set the Vercel project's **Root Directory** to `showcase`, **Install Command** to `npm ci`, **Build Command** to `npm run build`, and **Output Directory** to `dist`. Preview the deployment and test its public URL before assigning a public domain or alias.

The repository's existing root `vercel.json` still builds and serves the original app and API. It has not been changed. These instructions describe hosting setup only; no live deployment settings have been changed.

### Restore the original app

To restore the current public app after a showcase period, return the Vercel project's **Root Directory** to its previous repository-root value and restore the previous build and output settings. The repository's original `vercel.json` serves `frontend/dist` and routes `/api` to the backend. Keep that configuration and the original `frontend/` source in place while the showcase is published.

## Project structure

```text
showcase/
├── public/
│   ├── assets/          # Copied Relaya logo, fonts, and mode illustrations
│   ├── screenshots/     # Add product screenshots here
│   └── videos/          # Add a demo recording here
├── src/
│   ├── components/      # Brand, media fallback, and app-screen recreation
│   ├── data/            # Central product, step, media, and project content
│   ├── sections/        # Page sections and demo interactions
│   └── styles/          # Relaya tokens and responsive page styles
├── index.html
├── demo.html             # Standalone product demo page
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```
