# Dishan Vinoy D Souza — Personal Portfolio

A dark, futuristic personal portfolio for Dishan Vinoy D Souza, a Finance &
Accounting professional (audit, financial reporting, CMA (US) candidate).
Built as plain HTML/CSS/JS for zero-friction deployment on GitHub Pages —
no build step, no backend, no dependencies beyond two CDN links (Google
Fonts + Lucide Icons).

## Structure

```
/
├── index.html
├── assets/
│   └── resume/
│       └── 1Dishan Vinoy D Souza.pdf
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Run locally

Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Push this folder's contents to the root of a GitHub repository (e.g. `dishan-portfolio`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose the `main` branch and `/ (root)` folder, then **Save**.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

All asset paths in `index.html` are relative, so no changes are needed for
the site to work correctly under a GitHub Pages subpath.

## Updating content

- **Resume PDF**: replace `assets/resume/1Dishan Vinoy D Souza.pdf` with an
  updated file of the same name — the download and "View Resume" links
  already point to it.
- **Contact links**: email, phone, and LinkedIn links live in the `#contact`
  section and the footer of `index.html`.
- **Colors / type**: all design tokens are CSS custom properties at the top
  of `css/style.css` (`:root { ... }`).

## Notes

- No GitHub or live-demo links are included for the featured work items,
  since the source resume doesn't list any — nothing has been fabricated.
- Respects `prefers-reduced-motion` throughout (canvas backgrounds, scroll
  reveals, and counters all degrade to static/instant states).
