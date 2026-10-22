# Original app sample screens

`app-preview.html` renders four static sample states in an isolated document. `OriginalAppPreview` embeds that document at 1440 × 900 and scales the complete viewport proportionally, so gallery resizing does not change the app's spacing, font sizes, or responsive breakpoints.

`original-styles/` contains copies from the main Relaya frontend:

- `styles/tokens.css` and `styles/base.css`
- `components/ui/ui.css` and `components/ui/tone-select.css`
- `components/shell/shell.css`
- `features/new-session/new-session.css`
- `features/session/panel.css`
- `features/workspace/workspace-pages.css`

Only the font URLs in `base.css` are changed, from `/fonts/` to the showcase's `/assets/`. `preview-only.css` freezes animations and hides the document's scrollbar for consistent samples. Refresh these copies when the original app's styles change.

`OriginalScreens.tsx` follows the original New Session, AppShell/Sidebar/TopBar, DraftCard/PanelHeader/PanelFooter, and VoicePage markup. Account details and sentence content are sample fixtures. The in-call panel correctly renders without a workspace sidebar. No auth, recording, API, or meeting code is imported. The rendered samples are inert; gallery navigation and expansion are controlled by `DemoPage`.
