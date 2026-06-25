# keb.is — Kristján Ernir Björgvinsson

Bilingual (IS/EN) creative-producer portfolio. Static site (HTML/CSS/JS + GSAP/Lenis), deployed on GitHub Pages.

## Develop
Serve locally: `python3 -m http.server 8123 --bind 127.0.0.1` then open http://127.0.0.1:8123

## Validate data (dev only)
`node --test scripts/` — checks `projects.json` shape and IS/EN string parity.

## Deploy
Push to `main`; GitHub Actions (`.github/workflows/static.yml`) publishes to Pages. Custom domain in `CNAME`.
