# Mojammal Hossain, design portfolio

Static site. No build step, no paid services.

## Deploy on Cloudflare Pages
1. Push this folder to a GitHub repo (or use Direct Upload in the Pages dashboard).
2. Framework preset: None. Build command: empty. Output directory: `/`.
3. Replace `YOUR-DOMAIN.pages.dev` in `index.html`, `robots.txt` and `sitemap.xml` with your real domain.

## Edit content
- Projects: `js/data.js` (images live in `img/`, WebP, a small `-t` thumbnail plus a full size).
- Before/after pairs: add entries to `js/compare-data.js`. The section stays hidden until you do.
- Email, copy and services: `index.html`. Colours: variables at the top of `css/style.css`.
