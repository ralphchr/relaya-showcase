# Relaya product showcase

A separate, static presentation site for Relaya. It reuses the app's logo, illustrations, fonts, and color palette, and recreates representative app screens with sample data. The showcase does not import the original app, connect to its API, or require a database, authentication, microphone access, or meeting service.

The landing page is `index.html`: a fixed, single-viewport intro with no scrolling or sections below it. Its demo links open a standalone product demo at `demo.html`. The intro uses the reference typography and colors, with smaller type on narrow or short screens to keep the action visible.

The sample screens are interface recreations, not live screenshots. They are labeled as a demo in the page. Add approved screenshots and a demo recording later using the media steps below.

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
