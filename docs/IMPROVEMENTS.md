# KEB.is — improvement roadmap

Synthesized from 6 research agents (full docs live in the `personal-portfolio`
repo: `docs/research/improve/01..06`). Mapped to THIS codebase
(`Create/Coding/portfolio_site`, the live keb.is). Workflow: do on `improve/v2`,
preview at `localhost:5174`, then deploy (GitHub → Cloudflare).

Priority key: **P0** = critical/ship-blocker · **P1** = high impact, low effort ·
**P2** = the "wow" · **P3** = combine-from-the-other-build.

---

## P0 — Critical (mobile + perf foundations) — do first, low risk
- [ ] **`100vh` → `100svh/100dvh`** on all full-screen elements (preloader, modals, hero). *Biggest mobile bug: elements overflow under mobile browser chrome on first load.*
- [ ] **Safe-area insets** (`env(safe-area-inset-*)`) on the cards strip (sits over the iOS home bar) and the nav (notch).
- [ ] **`defer` the GSAP + Lenis CDN scripts** (currently render-blocking in `<head>`).
- [ ] **Images → AVIF/WebP + `width`/`height` + `loading="lazy"`** (the work mockups are ~12 MB of full-res PNGs → ~80% smaller, kills CLS).
- [ ] **Fonts: TTF → WOFF2 + `font-display: swap`** (GCAkihiko is two TTFs, no swap → FOIT on mobile). Also confirm the **GCAkihiko "Demo" license** allows production use, or swap the face.
- [ ] **Contrast fix:** the amber `#ff9d41` gradient is applied to body/accessible text → fails WCAG; restrict gradient to display/hero, use solid light for body.

## P1 — High impact, low effort (quick "polish that reads premium")
- [ ] **Gate heavy ScrollTrigger pins behind `gsap.matchMedia('(min-width:769px)')`** + IntersectionObserver reveals on mobile (mid-range Android jank on the long scroll page).
- [ ] **Velocity skew** on the cards marquee (read `lenis.velocity`, apply `skewX`) — tactile, ~15 lines.
- [ ] **Section background-color scrub** between hero→works→bio→contact (atmosphere shift).
- [ ] **Magnetic links** on nav / CTA / email (GSAP `quickTo`).
- [ ] **Copy-email "Afritað!" + confetti** micro-interaction.
- [ ] **Tap pattern for hover-only reveals** (the work cards/mockups need a touch path).

## P2 — The "wow" (signature, bigger effort — pick boldness with Kristján)
- [ ] **Film-grain + aurora noise shader** over the hero (raw WebGL, ~0 KB extra, reduced-motion → static grain). *Ships the most cinema for the least weight.*
- [ ] **Clip-path "scene wipe"** transition between two sections (feels like a film cut) — the single most award-caliber move.
- [ ] **OGL flowmap** distortion on the hero image (~29 KB, lazy-loaded, scroll-driven on touch).
- [ ] (stretch) **OGL ASCII name-mask** hero — the name rendered as living ASCII.

## P3 — Combine best of both builds (needs a direction from Kristján)
Candidates to graft from the dark/ocean-blue build we made:
- [ ] The **"living ASCII hands" canvas footer** (signature, recolorable to amber).
- [ ] The **animated ribbon** hero motif.
- [ ] A **dark theme / ocean-blue option**, or keep the live amber/watercolor identity and only borrow techniques.
- [ ] The cleaner **reduced-motion + reveal system**.

## Cross-cutting (do alongside)
- [ ] **SEO top-up:** add **JSON-LD Person + WebSite**, proper favicon/touch icons (currently a JPEG), verify sitemap/robots. (Title/desc/OG/canonical already exist — good.)
- [ ] **Accessibility pass:** focus-visible, alt text on work images, `aria-hidden` on decorative canvases, full `prefers-reduced-motion` coverage.
- [ ] **Privacy-friendly analytics** (Cloudflare Web Analytics / Plausible).

## Delight / easter eggs (sprinkle in)
- [ ] **Konami code → "Íslenska mode"** (aurora pulse + Icelandic flip) — the share-worthy one.
- [ ] **Icelandic word-of-the-day** in the footer.
- [ ] Works-row **image-follow** preview (desktop).
