# Shailja Lavania — Public Policy & Political Researcher

A personal portfolio built with HTML, CSS and JavaScript for GitHub Pages. No framework, package installation or build step is needed.

This is a glimpse of the work Shailja has done so far and, somewhere, of who she is too. Some things began with curiosity, a question that stayed with her, or a feeling that something mattered enough to understand it better.

## Open and edit in VS Code

Open this folder in VS Code. Open `index.html` in a browser, or use VS Code's Live Server extension if you already have it. The site also works when the HTML file is opened directly.

| File | What to edit |
| --- | --- |
| `index.html` | All text, research, publication links, experience, contact links and image captions |
| `styles.css` | Colours in `:root`, typography, layout and responsive rules |
| `script.js` | Slider timing, mobile navigation and motion |
| `assets/images/` | Optimised photographs in WebP format |
| `assets/documents/Shailja-Lavania-CV.pdf` | Downloadable public CV |
| `assets/favicon.svg` | SL browser icon |

The section order is Home, Story, Research, Publications, Impact, CV and Contact. Research interests are inside Research; professional experience is inside Impact. Search for each section's `id` in `index.html` to find it quickly.

## Updating photographs

Replace an image while keeping its filename to avoid changing the HTML. Otherwise update the `src`, `width`, `height` and descriptive `alt` text in `index.html`. WebP files keep the page light. Keep your full-resolution originals outside the repository.

The three hero photographs are in `.slides`. Their visible captions come from `data-title` and `data-caption`. If you add or remove slides, also update the `aria-label` slide totals and the displayed `/ 03` counter in the HTML. The script automatically cycles through the available slides. The delay is `6500` milliseconds in `script.js`.

## GitHub Pages

This repository is the account website: `Shailja-Lavania/shailjalavania.github.io`. Its public address is **https://shailja-lavania.github.io/** (the account name includes a hyphen).

In repository **Settings → Pages**, select **Deploy from a branch**, **main**, and **/ (root)**, then Save. No custom domain or Actions workflow is required. `.nojekyll` tells Pages to serve the files directly. Subsequent pushes to `main` update the site.

All local asset paths are relative. There are no server-side functions, tracking scripts, external font requests or contact-form services. The contact link opens the visitor's email application.

## Content and public CV

The Story section is adapted from Shailja's own account. Research and experience are based on her supplied resume. The Quint publication links directly to the published article dated 21 June 2026. Kiul Nadi is explicitly labelled as a book in progress; unpublished work is not presented as a publication.

The public CV is a formatted version of the supplied resume with Gmail, LinkedIn and published-work links. The phone number and Instagram link are omitted to match the chosen public contact details. Replace the PDF with an updated public CV when needed.

## Accessibility and motion

- Semantic headings, skip link, visible keyboard focus and image descriptions.
- Mobile menu supports Escape, closes on link selection and reports expanded state.
- Slider supports previous/next buttons, left/right arrow keys, touch swiping and pause/play.
- Automatic rotation stops while hovered, keyboard-focused or in a hidden tab.
- Reduced-motion preference disables automatic rotation at load and removes reveal transitions and smooth scrolling.
- Main content remains visible if JavaScript is unavailable. Mobile navigation is also available without JavaScript.

## Photo placement

See `PHOTO-NOTES.md` for the source filenames and their placement. Photos without confirmed context are given descriptive captions; no identities or endorsements are inferred from group photographs.
