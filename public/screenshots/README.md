# Screenshots

Place approved Relaya app screenshots in this folder. Register each path in `../../src/data/showcase.ts` using a root-relative URL such as `/screenshots/session-review.webp`. Keep the matching `screen` fallback configured so an absent or invalid image still shows a useful interface recreation.

## Landing page snapshot

`relaya-new-session-live.png` is an actual guest-view capture of the original app at `http://127.0.0.1:5173/new`, taken on 2026-10-23. It uses the running frontend from the sibling `Philippine-Startup-Challenge-2026/frontend` folder. The 1280 × 900 viewport capture was cropped to the work area at x=300, y=0, width=965, height=631, removing the sidebar and excess empty space. The UI content was not redrawn or edited. `ShowcasePage.tsx` displays this image directly.
