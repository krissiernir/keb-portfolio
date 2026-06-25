# GitHub Utility / Media / On-Brand Embeds for keb.is

_Creative producer portfolio — film/video, photography, music, code, Icelandic context.  
Vanilla HTML/CSS/JS only. CDN-loadable or single droppable file. No build step._

---

## Lightbox / Gallery

### 1. GLightbox — https://github.com/biati-digital/glightbox
⭐ 2.5k · Last release: v3.3.1 Jan 2025 · MIT

Pure JS/CSS lightbox that handles images, HTML5 video, YouTube/Vimeo, iframes, and mixed content. Mobile-friendly, swipe-enabled, open/close animations (zoomIn, fade).

**Size/deps:** 11 kB gzipped. Zero deps.  
**CDN?** Yes — jsDelivr and cdnjs.
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
<script>const lightbox = GLightbox();</script>
```
**Demo:** https://biati-digital.github.io/glightbox/  
**On-brand fit:** Direct drop-in for the photography gallery and reel modal — handles video autoplay natively.

---

### 2. PhotoSwipe — https://github.com/dimsemenov/PhotoSwipe
⭐ 25.2k · Last release: v5.4.4 May 2024 · MIT

The gold-standard gallery lightbox. Modular, framework-independent. v5 ships as ES modules with a smaller Lightbox sub-module. Touch/gesture-native. Progressive enhancement.

**Size/deps:** Core ~15 kB min. Lightbox module is smaller still. Zero runtime deps.  
**CDN?** Yes — cdnjs, jsDelivr. Requires `<script type="module">`.
```html
<script type="module">
  import PhotoSwipeLightbox from 'https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe-lightbox.esm.js';
  const lightbox = new PhotoSwipeLightbox({ gallery: '#gallery', children: 'a', pswpModule: () => import('https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe.esm.js') });
  lightbox.init();
</script>
```
**Demo:** https://photoswipe.com/  
**On-brand fit:** Best-in-class for photo portfolios. Pinch-zoom, native-feeling transitions. The benchmark.

---

### 3. Viewer.js — https://github.com/fengyuanchen/viewerjs
⭐ 8.2k · Last release: v1.11.7 Nov 2024 · MIT

Full-featured image viewer: zoom, rotate, flip, scale, fullscreen, slideshow. 53 config options, 23 methods, 17 events. Inline or modal mode.

**Size/deps:** ~16 kB min. Zero deps.  
**CDN?** Yes — cdnjs.
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.7/viewer.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.7/viewer.min.js"></script>
<script>new Viewer(document.getElementById('gallery'));</script>
```
**Demo:** https://fengyuanchen.github.io/viewerjs/  
**On-brand fit:** Good for photography detail pages — rotate + zoom for print/editorial work.

---

### 4. Splide — https://github.com/Splidejs/splide
⭐ 5.4k · Last release: v4.1.3 Sep 2022 · MIT

Lightweight, accessible carousel/slider. No deps, no Lighthouse warnings. Works for photo reels, project thumbnails, team / testimonial strips. Note: single maintainer, dev has slowed since mid-2023 but library is stable.

**Size/deps:** 29 kB min / 12 kB gzip. Zero deps.  
**CDN?** Yes — jsDelivr.
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/css/splide.min.css">
<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/js/splide.min.js"></script>
<script>new Splide('#splide').mount();</script>
```
**Demo:** https://splidejs.com/  
**On-brand fit:** Work gallery strip, reel thumbnails. Clean and accessible out of the box.

---

## Before / After Image Compare

### 5. img-comparison-slider — https://github.com/sneas/img-comparison-slider
⭐ 861 · MIT · Maintained

Web component (Custom Elements v1) for before/after image comparison. Mobile-friendly, keyboard-accessible, responsive. Works as plain HTML tag — no JS init required.

**Size/deps:** <12 kB min / ~4 kB gzip. Zero deps.  
**CDN?** Yes — jsDelivr.
```html
<script defer src="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/index.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/styles.css">
<img-comparison-slider>
  <img slot="first" src="before.jpg">
  <img slot="second" src="after.jpg">
</img-comparison-slider>
```
**Demo:** https://img-comparison-slider.sneas.io/  
**On-brand fit:** Excellent for color-grade / LUT demos, film grade comparisons, photography retouching before/after.

---

### 6. JuxtaposeJS — https://github.com/NUKnightLab/juxtapose
⭐ 878 · MIT · Northwestern Knight Lab

Classic before/after storytelling slider. Knight Lab CDN hosted. Great for editorial/photojournalism-style reveals. Simple declarative embed.

**Size/deps:** Self-contained JS + CSS. No external deps.  
**CDN?** Yes — Knight Lab CDN.
```html
<link rel="stylesheet" href="https://cdn.knightlab.com/libs/juxtapose/latest/css/juxtapose.css">
<script src="https://cdn.knightlab.com/libs/juxtapose/latest/js/juxtapose.min.js"></script>
<div class="juxtapose" data-startingposition="50%">
  <img src="before.jpg"><img src="after.jpg">
</div>
```
**Demo:** https://juxtapose.knightlab.com/  
**Note:** Last release 2014 — stable/feature-frozen. Good for basic use but not actively developed.  
**On-brand fit:** Strong storytelling vibe for film grade comparisons.

---

### 7. BeerSlider — https://github.com/pehaa/beerslider
⭐ 323 · MIT · Vanilla JS

Keyboard-accessible, dependency-free before/after slider. Dead-simple API — one function call. Unpkg CDN.

**Size/deps:** Tiny. Zero deps.  
**CDN?** Yes — unpkg.
```html
<link rel="stylesheet" href="https://unpkg.com/beerslider/dist/BeerSlider.css">
<script src="https://unpkg.com/beerslider/dist/BeerSlider.js"></script>
<div class="beer-slider" data-beer-label="After"><img src="after.jpg">
  <div class="beer-reveal" data-beer-label="Before"><img src="before.jpg"></div>
</div>
<script>new BeerSlider(document.querySelector('.beer-slider'));</script>
```
**Demo:** https://pehaa.github.io/beerslider/  
**On-brand fit:** Clean minimal option for LUT / color grade demos.

---

## Video / Reel Niceties

### 8. Plyr — https://github.com/sampotts/plyr
⭐ 29.9k · Last release: v3.8.4 Jan 2026 · MIT · Actively maintained

The best-looking accessible HTML5 + YouTube + Vimeo player. Consistent API across all providers. Custom skinnable, keyboard-navigable, works with `<video>`, `<audio>`, YouTube, Vimeo.

**Size/deps:** ~16 kB JS + ~5 kB CSS. Zero runtime deps.  
**CDN?** Yes — Cloudflare CDN.
```html
<link rel="stylesheet" href="https://cdn.plyr.io/3.8.4/plyr.css">
<script src="https://cdn.plyr.io/3.8.4/plyr.js"></script>
<video id="player" playsinline controls>
  <source src="reel.mp4" type="video/mp4">
</video>
<script>const player = new Plyr('#player');</script>
```
**Demo:** https://plyr.io/  
**On-brand fit:** Makes the reel player look intentional. CSS variables for complete reskin to match site palette.

---

### 9. hover-video-player — https://github.com/Gyanreyer/hover-video-player
⭐ 33 · MIT · Web Component

Custom element (`<hover-video-player>`) that plays video on hover/touch, pauses on leave. Supports thumbnail overlay, loading states. Vanilla web component — drop-in, no framework.

**Size/deps:** Tiny. Zero deps. Web component.  
**CDN?** Yes — unpkg.
```html
<script type="module" src="https://unpkg.com/hover-video-player"></script>
<hover-video-player>
  <video src="clip.mp4" muted loop playsinline></video>
  <img src="thumbnail.jpg" slot="paused-overlay">
</hover-video-player>
```
**Demo:** https://unpkg.com/hover-video-player/  
**On-brand fit:** Cinemagraph-style work-grid where clips play on hover — very portfolio-native. Low star count but solid implementation.

---

## Film-Flavored Effects

### 10. grained — https://github.com/sarathsaleem/grained
⭐ 321 · MIT · Single file

Animated film-grain / noise overlay generator. Targets any CSS selector. Configurable grain density, opacity, size, animation speed. Generates an SVG noise pattern with requestAnimationFrame loop.

**Size/deps:** Single JS file (~3 kB). Zero deps.  
**CDN?** jsDelivr via GitHub.
```html
<script src="https://cdn.jsdelivr.net/gh/sarathsaleem/grained@master/grained.js"></script>
<script>
grained('body', {
  animate: true, patternWidth: 200, patternHeight: 200,
  grainOpacity: 0.07, grainDensity: 1, grainWidth: 1.5, grainHeight: 1.5
});
</script>
```
**Demo:** http://sarathsaleem.github.io/grained/  
**Note:** Last active commit ~2018 but codebase is intentionally minimal — unlikely to break.  
**On-brand fit:** Film grain texture over hero or portfolio backgrounds. Signature film-photographer aesthetic.

---

## Music / Audio

### 11. Wavesurfer.js — https://github.com/katspaugh/wavesurfer.js
⭐ 10.3k · Last release: v7.12.8 Jun 2026 · BSD-3-Clause · Actively maintained

Audio waveform renderer + player built on Web Audio API + Canvas. Plugins: Regions, Timeline, Record, Spectrogram, Envelope, Minimap. v7 renders into Shadow DOM for CSS isolation.

**Size/deps:** Core ~50 kB. Zero runtime deps.  
**CDN?** Yes — unpkg.
```html
<script src="https://unpkg.com/wavesurfer.js@7"></script>
<div id="waveform"></div>
<script>
const ws = WaveSurfer.create({ container: '#waveform', waveColor: '#ddd', progressColor: '#e8c97e', url: 'track.mp3' });
</script>
```
**Demo:** https://wavesurfer.xyz/  
**On-brand fit:** Waveform mini-player for his music tracks. Visualizes audio identity. Pairs with "now playing" UX.

---

### 12. Tiny HTML5 Music Player — https://github.com/mrt-prodz/Tiny-HTML5-Music-Player
⭐ 27 · GPL-2.0 · Self-contained

Under 8 kB dependency-free HTML5 audio player. Seek bar, time display, keyboard shortcuts, auto-advance, loop. Track list defined as a JS array.

**Size/deps:** <8 kB total. Zero deps.  
**CDN?** No dedicated CDN — drop the two files (CSS + JS) locally.  
**Embed:** Add `<div id="all_tracks"></div>`, include files, call `tinyplayer(TrackList)`.  
**Note:** GPL-2.0 license — verify compatibility with portfolio use. Low stars but clean implementation.  
**On-brand fit:** Lightweight self-hosted music player for original tracks. No branding bloat.

---

## Globe / Map / Location

### 13. COBE — https://github.com/shuding/cobe
⭐ 5.4k · Last release: v2 Mar 2026 · MIT · Actively maintained

5 kB WebGL globe. Animated, customizable dot-map. Supports markers, arcs, CSS anchor positioning for HTML overlays. Zero deps.

**Size/deps:** 5 kB. Zero deps (uses WebGL directly).  
**CDN?** Yes — jsDelivr/unpkg.
```html
<canvas id="globe" width="400" height="400"></canvas>
<script type="module">
  import createGlobe from 'https://cdn.jsdelivr.net/npm/cobe@latest/dist/index.js';
  const globe = createGlobe(document.getElementById('globe'), {
    devicePixelRatio: 2, width: 400, height: 400, phi: 1.0, theta: 0,
    dark: 1, diffuse: 1.2, scale: 1, mapSamples: 16000, mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3], markerColor: [1, 0.5, 0],
    glowColor: [1, 1, 1],
    markers: [{ location: [64.1355, -21.8954], size: 0.07 }], // Reykjavík
    onRender: (state) => { state.phi += 0.005; }
  });
</script>
```
**Demo:** https://cobe.vercel.app/  
**On-brand fit:** Interactive Iceland-pinned globe in the About or contact section. 5 kB is remarkable for WebGL.

---

## Utility

### 14. vanilla-lazyload — https://github.com/verlok/vanilla-lazyload
⭐ 7.9k · v19.1.3 Apr 2024 · MIT · Actively maintained

2.4 kB IntersectionObserver-based lazy loader for images, video, iframes, backgrounds, and animated SVGs. Native lazy loading delegation. Zero deps.

**Size/deps:** 2.4 kB min. Zero deps.  
**CDN?** Yes — jsDelivr.
```html
<script src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@19.1.3/dist/lazyload.min.js"></script>
<script>new LazyLoad({ elements_selector: '.lazy' });</script>
<!-- images: <img class="lazy" data-src="photo.jpg"> -->
```
**Demo:** https://verlok.github.io/vanilla-lazyload/  
**On-brand fit:** Essential for a photo-heavy gallery. Defers off-screen images until needed.

---

### 15. marquee6k — https://github.com/SPACESODA/marquee6k
⭐ 9 · v1.3.8 Mar 2026 · MIT · Maintained

Smooth infinite horizontal (or vertical) marquee. No deps. Tap-to-pause, drag-scrub, directional control. RAF-driven 60 fps. Very low stars but actively maintained and published recently.

**Size/deps:** 3 kB min. Zero deps.  
**CDN?** Yes — jsDelivr.
```html
<script src="https://cdn.jsdelivr.net/gh/SPACESODA/marquee6k@latest/marquee6k.min.js"></script>
<div class="marquee">— Kristján Ernir Björnsson · Film · Photography · Music · Iceland ·</div>
<script>marquee6k.init();</script>
```
**Demo:** https://spacesoda.github.io/marquee6k/  
**On-brand fit:** Credits / skills ticker in the hero or footer. Common in creative portfolios.

---

### 16. AOS (Animate On Scroll) — https://github.com/michalsnik/aos
⭐ 28.1k · MIT · Maintained (v2 stable, v3/next in development)

CSS-driven scroll-reveal animations via data attributes. Fade, slide, zoom, flip. Widely adopted. CDN-loadable. One `AOS.init()` call.

**Size/deps:** ~15 kB JS + CSS. Zero runtime deps.  
**CDN?** Yes — unpkg.
```html
<link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>AOS.init({ duration: 800, once: true });</script>
<!-- on elements: data-aos="fade-up" -->
```
**Demo:** https://michalsnik.github.io/aos/  
**On-brand fit:** Subtle scroll reveals for gallery sections, bio text, project cards.

---

### 17. clipboard.js — https://github.com/zenorocha/clipboard.js
⭐ 34.1k · MIT · Last release v2.0.11 May 2022 (stable/mature)

3 kB copy-to-clipboard. Data attributes API. No Flash. Selection + execCommand APIs with fallback.

**Size/deps:** 3 kB gzip. Zero deps.  
**CDN?** Yes — jsDelivr, unpkg.
```html
<script src="https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"></script>
<button class="btn" data-clipboard-text="krissiernir@reka.is">Copy email</button>
<script>new ClipboardJS('.btn');</script>
```
**Demo:** https://clipboardjs.com/  
**On-brand fit:** Contact section email copy, share links for reel, collab CTA.

---

### 18. Panzoom — https://github.com/timmywil/panzoom
⭐ 2.4k · v4.6.2 Apr 2026 · MIT · Actively maintained

3.7 kB CSS-transform-based pan + zoom for any element (image, canvas, SVG, video). GPU-accelerated, touch + pinch support.

**Size/deps:** 3.7 kB gzip. Zero deps.  
**CDN?** Yes — unpkg.
```html
<script src="https://unpkg.com/@panzoom/panzoom@4.6.2/dist/panzoom.min.js"></script>
<div id="parent" style="overflow:hidden">
  <img id="photo" src="print.jpg">
</div>
<script>
const panzoom = Panzoom(document.getElementById('photo'), { maxScale: 5 });
document.getElementById('parent').addEventListener('wheel', panzoom.zoomWithWheel);
</script>
```
**Demo:** https://timmywil.com/panzoom/  
**On-brand fit:** High-res photography detail view, print/editorial work close-up inspection.

---

## Top 6 To Actually Try

Ranked by: film/photo/music fit × on-brand × low-integration-effort.

| # | Repo | ⭐ | Why ship it |
|---|------|----|-------------|
| 1 | **img-comparison-slider** (sneas) | 861 | Drop-in web component for LUT/color-grade before-afters. Pure HTML, no JS init. Highest bang/effort ratio. |
| 2 | **Wavesurfer.js** (katspaugh) | 10.3k | Waveform audio player for his music tracks. Actively maintained v7, CDN script tag, stunning visual. |
| 3 | **COBE** (shuding) | 5.4k | 5 kB WebGL globe pinned to Reykjavík. Visually striking, unique to his Icelandic identity. Instant hero section piece. |
| 4 | **GLightbox** (biati-digital) | 2.5k | Best pragmatic lightbox — handles images AND video in one. 11 kB, one CSS + one JS CDN link, recent release. |
| 5 | **Plyr** (sampotts) | 29.9k | Makes the reel look polished. Actively maintained (Jan 2026 release), full CSS variable skinning, one CDN call. |
| 6 | **grained** (sarathsaleem) | 321 | Film grain overlay on hero/bg in 3 kB of JS. Iconic film-photographer texture. Single file, no deps, instant character. |

---

### Single "ship it first" pick

**`img-comparison-slider`** — A creative producer who does color grading should demo it. Pure HTML custom element, 4 kB gzipped, two CDN links, works in any browser with modern Custom Elements support. Add it to the first photography project card and it immediately signals craft to the viewer.
