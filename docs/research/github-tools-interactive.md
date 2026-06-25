# Interactive / Playful / Micro-Tools — GitHub Research
> For keb.is (Kristján Ernir) — Vanilla HTML/CSS/JS, no build step, CDN-loadable.
> Already uses GSAP + Lenis. Notes where overlap exists.

---

## Text Effects

### Splitting.js — https://github.com/shshaw/Splitting
- **Stars:** ~1.8k · last active: periodic maintenance, MIT
- **What:** Micro-library that splits text into `<span>`s per word/char/line, populating CSS custom properties (`--char-index`, `--word-index`) to unlock pure-CSS animations. Does *not* animate itself — pairs perfectly with GSAP or CSS transitions.
- **Size/deps:** ~1.5 KB gzipped, zero deps
- **CDN:** `https://unpkg.com/splitting/dist/splitting.min.js` + CSS
- **Demo:** https://splitting.js.org / CodePen collection
- **Embed:**
  ```html
  <link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting.css" />
  <script src="https://unpkg.com/splitting/dist/splitting.min.js"></script>
  <script>Splitting();</script>
  ```
- **Brand fit:** High — char-by-char reveals, staggered letter entrances. Complements GSAP. NOT redundant (GSAP SplitText is a paid plugin; this is free + CSS-native).

---

### SplitType — https://github.com/lukePeavey/SplitType
- **Stars:** ~727 · last commit: maintained (MIT)
- **What:** Similar to Splitting.js — splits into lines/words/chars. More modern API, better line-detection. Often preferred with GSAP ScrollTrigger workflows.
- **Size/deps:** Small, zero runtime deps
- **CDN:** `https://unpkg.com/split-type`
- **Demo:** https://lukepeavey.github.io/SplitType/
- **Embed:**
  ```html
  <script src="https://unpkg.com/split-type"></script>
  <script>const type = new SplitType('#target')</script>
  ```
- **Brand fit:** High. Slightly overlaps Splitting.js — pick one. SplitType tends to be more robust for complex layouts.
- **Note:** Overlap with GSAP SplitText (paid). This is the free alternative — worth keeping.

---

### Typed.js — https://github.com/mattboldt/typed.js
- **Stars:** 16.3k · last commit: Jan 2026 (v3.0.0), GPL-3.0 (free for personal/open-source)
- **What:** Classic typewriter typing animation. Cycles through strings, supports backspacing, loop, smart backspace, HTML content.
- **Size/deps:** ~zero deps, UMD build available
- **CDN:** `https://unpkg.com/typed.js@3.0.0/dist/typed.umd.js`
- **Demo:** https://mattboldt.com/demos/typed-js/
- **Embed:**
  ```html
  <script src="https://unpkg.com/typed.js@3.0.0/dist/typed.umd.js"></script>
  <script>new Typed('#el', { strings: ['film.', 'code.', 'music.'], typeSpeed: 60 })</script>
  ```
- **Brand fit:** Medium-high — the "creative producer: film / code / AI / design / music" hero text is a natural fit.

---

### Scrambling Letters — https://github.com/Recidvst/scrambling-letters
- **Stars:** ~57 · last release: Nov 2023, MIT
- **What:** Decode/scramble effect — randomises letters then resolves them back one-by-one. Multiple bundle formats (IIFE included in `/dist`).
- **Size/deps:** Lightweight, SCSS styling separately
- **CDN:** Not on jsDelivr by default; use unpkg: `https://unpkg.com/scrambling-letters/dist/scrambling-letters.iife.js`
- **Demo:** https://recidvst.github.io/scrambling-letters/
- **Embed:** Drop the IIFE build, call `scramblingLetters({ target: '.scramble' })`
- **Brand fit:** High — cinematic "decoding" effect matches tech/AI/creative aesthetic. Low star count but functional and minimal.

---

### Blotter.js — https://github.com/bradley/Blotter
- **Stars:** 3.1k · (last commit older, ~2019, but stable), license: see repo
- **What:** GLSL-backed text shaders in the browser. Apply ripple, liquid, noise, channel-split shaders directly to DOM text via WebGL. Visually spectacular.
- **Size/deps:** Requires Three.js + Underscore.js (heavier — ~300 KB total with deps)
- **CDN:** Raw GitHub builds available (not ideal for prod)
- **Demo:** https://blotter.js.org
- **Embed:** Load Three.js, Underscore.js, blotter.min.js, then chosen material file
- **Brand fit:** Very high visually, but dependency weight and age are concerns. Use for a single hero element only. Flag: heavier than ideal.
- **Note:** Not redundant with GSAP — this is WebGL shader territory.

---

## Confetti / Feedback

### canvas-confetti — https://github.com/catdad/canvas-confetti
- **Stars:** 12.6k · last release: Oct 2025 (v1.9.4), ISC
- **What:** Performant confetti burst on `<canvas>`. Highly configurable: shapes, colors, physics, spread, origin. Fire on CTA clicks, project reveals, Easter egg triggers.
- **Size/deps:** Zero deps, ~14 KB minified
- **CDN:** `https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.min.js`
- **Demo:** https://catdad.github.io/canvas-confetti/
- **Embed:**
  ```html
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.min.js"></script>
  <script>confetti({ particleCount: 100, spread: 70 })</script>
  ```
- **Brand fit:** High — use for Konami code payoff, project-card hover reveal, or "send message" success.

---

### js-confetti — https://github.com/loonywizard/js-confetti
- **Stars:** 1.3k · last commit: Dec 2021 (stable, no active dev), MIT
- **What:** Confetti with emoji support. Launch 🎵 🎬 🇮🇸 as confetti particles. Zero deps.
- **CDN:** `https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js`
- **Demo:** https://loonywizard.github.io/js-confetti/
- **Embed:**
  ```html
  <script src="https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js"></script>
  <script>const c = new JSConfetti(); c.addConfetti({ emojis: ['🎵','🎬','🇮🇸'] })</script>
  ```
- **Brand fit:** Playful easter egg — Icelandic flag emoji + music note confetti is on-brand and delightful. Note: not actively maintained (2021 last commit), but works fine.

---

## Cursor / Magnetic / Hover

### cursor-effects — https://github.com/tholman/cursor-effects
- **Stars:** 4k · last commit: Dec 2024 (v1.0.17), MIT
- **What:** 12 drop-in old-school cursor effects: rainbow trail, emoji rain, ghost follower, fairy dust, snowflakes, bubbles, clock cursor, character cursor. Respects `prefers-reduced-motion`.
- **Size/deps:** Zero deps, single browser JS file
- **CDN:** `https://unpkg.com/cursor-effects@latest/dist/browser.js`
- **Embed:**
  ```html
  <script src="https://unpkg.com/cursor-effects@latest/dist/browser.js"></script>
  <script>new ghostCursor(); // or rainbowCursor(), emojiCursor({emoji:['🎵']})</script>
  ```
- **Brand fit:** Very high — ghost follower or emoji cursor (🎵 🎬 or Icelandic staves) is a perfect easter egg.

---

### magnet-mouse — https://github.com/fluffy-factory/magnet-mouse
- **Stars:** 114 · last release: 2019 (older but MIT, functional)
- **What:** Makes DOM elements magnetically attracted to the mouse cursor. Elements warp toward cursor as it approaches.
- **Size/deps:** Zero deps (vanilla JS)
- **CDN:** `https://cdn.jsdelivr.net/gh/fluffy-factory/magnet-mouse@latest/lib/magnet-mouse.min.js`
- **Demo:** https://fluffy-factory.github.io/magnet-mouse/
- **Embed:** Drop CDN, call `MagnetMouse({ manget: { el: '.btn', padding: 20, maxMovement: 40 } })`
- **Brand fit:** Medium — works well on CTA buttons. Low star count + old. Consider implementing by hand instead (~30 lines vanilla).
- **Note:** Mouse Follower (Cuberto) is slicker but requires GSAP — redundant here.

---

## Terminal / CLI Emulator

### ttty — https://github.com/mkrl/ttty
- **Stars:** 77 · last commit: Aug 2024 (v1.7.0), MIT
- **What:** Tiny dependency-free terminal emulator (~1 KB gzipped). Register custom commands, supports command history, `print()` output, "foreground process" simulation.
- **CDN:** `https://unpkg.com/ttty/dist/ttty.iife.js` (IIFE build, no build step needed)
- **Demo:** https://github.com/mkrl/ttty (examples in README)
- **Embed:**
  ```html
  <script src="https://unpkg.com/ttty/dist/ttty.iife.js"></script>
  <script>
    ttty.initTerminal({
      host: document.querySelector('#terminal'),
      prompt: 'kristjan@keb.is:~$ ',
      commands: {
        whoami: { name: 'whoami', func: ({print}) => print('creative producer. film / code / music.') },
        projects: { name: 'projects', func: ({print}) => print('run `ls projects` to see them.') }
      }
    })
  </script>
  ```
- **Brand fit:** Very high — a hidden terminal (`~` key to open) with custom commands (`whoami`, `contact`, `play`, `cv`) is a perfect low-key easter egg for a code-literate audience.

---

## Audio

### wavesurfer.js — https://github.com/katspaugh/wavesurfer.js
- **Stars:** 10.3k · last release: Jun 2026 (v7.12.8), BSD-3-Clause
- **What:** Waveform audio player. Renders scrollable waveforms for any audio file. Plugins for regions, minimap, timeline, spectrogram.
- **Size/deps:** Heavier (~60 KB minified, self-contained)
- **CDN:** `https://unpkg.com/wavesurfer.js@7` (UMD) or ESM via jsDelivr
- **Demo:** https://wavesurfer.xyz/examples/
- **Embed:**
  ```html
  <script src="https://unpkg.com/wavesurfer.js@7"></script>
  <script>
    const ws = WaveSurfer.create({ container: '#waveform', waveColor: '#c0c0c0', url: '/audio.mp3' })
  </script>
  ```
- **Brand fit:** High if music is featured on-site. Use for a "now playing" or "selected tracks" section. Not tiny but well-maintained and actively developed as of 2026.
- **Note:** No conflict with GSAP/Lenis.

---

### Wave.js — https://github.com/foobar404/Wave.js
- **Stars:** 732 · MIT
- **What:** Audio visualizer that renders animated bars/circles reacting to an audio stream. Simpler than wavesurfer — no waveform display, just live reactive animation.
- **CDN:** `https://cdn.jsdelivr.net/gh/foobar404/wave.js/dist/bundle.js`
- **Demo:** https://foobar404.github.io/wave.js/
- **Embed:** Drop CDN, pass an `<audio>` element reference
- **Brand fit:** Medium — cool for ambient music visualizer section. Lower maintenance than wavesurfer; consider wavesurfer instead if you want both player + waveform.

---

## Easter Eggs

### cheet.js — https://github.com/namuol/cheet.js
- **Stars:** 1.3k · MIT · small/unmaintained but works perfectly
- **What:** Map any key sequence to a callback. Not just Konami — any string like `'k r i s t j a n'` or `'i s l a n d'`.
- **CDN:** `https://cdn.rawgit.com/namuol/cheet.js/master/cheet.min.js`
- **Embed:**
  ```html
  <script src="https://cdn.rawgit.com/namuol/cheet.js/master/cheet.min.js"></script>
  <script>cheet('↑ ↑ ↓ ↓ ← → ← → b a', () => { /* fire confetti + unlock terminal */ })</script>
  ```
- **Brand fit:** Very high. Combine with canvas-confetti and the ttty terminal for a full hidden layer easter egg. One-night project, MIT, no deps.

---

### konami-js — https://github.com/georgemandis/konami-js
- **Stars:** 968 · last release: Dec 2024 (v1.7.0), MIT
- **What:** The classic Konami code listener, also supports touch gestures on mobile.
- **CDN:** Available via npm/unpkg
- **Brand fit:** Medium — simpler than cheet.js (Konami only). Use cheet.js if you want custom sequences too.

---

## Scroll / UX

### scrollProgress (jeremenichelli) — https://github.com/jeremenichelli/scrollProgress
- **Stars:** moderate · CDNjs available · MIT
- **What:** Tiny library — observe viewport scroll position, fires callback with 0–1 progress value. No visual output by default (you build the UI).
- **CDN:** https://cdnjs.com/libraries/scrollprogress
- **Brand fit:** Low-medium — GSAP ScrollTrigger already handles this natively. Skip unless you specifically don't want ScrollTrigger for a reading-progress bar.
- **Note:** Redundant with GSAP. Flagged.

---

## Marquee

### dynamic-marquee — https://github.com/tjenkinson/dynamic-marquee
- **Stars:** 156 · last commit: Dec 2024 (v2.6.5), Apache-2.0
- **What:** Tiny marquee library — append items dynamically, control rate on the fly, horizontal or vertical scroll.
- **CDN:** `https://cdn.jsdelivr.net/npm/dynamic-marquee@2`
- **Embed:** Create instance, call `.appendItem(el)` and `.setRate(px/s)`
- **Brand fit:** Medium — a credits-style horizontal ticker (film/music credits aesthetic) could work. The Apache-2.0 license is permissive.

---

## Audio / Last.fm Now Playing

### aidenwallis/lastfm-now-playing — https://github.com/aidenwallis/lastfm-now-playing
- **Stars:** small (<100) · vanilla JS · uses public Last.fm API (no auth needed)
- **What:** Tiny widget — fetches your Last.fm recent/current track via the public API and displays it.
- **Embed:** Drop HTML/CSS/JS, set `username` + Last.fm API key in config
- **Brand fit:** Medium-high — a subtle "now listening: X by Y" in the footer could reinforce the music dimension of Kristján's work. Requires a free Last.fm API key.

---

## Top 6 to Actually Try

Ranked by **cool × low-effort × on-brand**:

| # | Name | Stars | Why ship it |
|---|------|-------|-------------|
| 1 | **cursor-effects** | 4k | Ghost cursor or emoji rain (`🎵 🎬 🇮🇸`) drops in with one CDN tag + one line. Zero config. Instantly distinctive. |
| 2 | **canvas-confetti** | 12.6k | Pair with cheet.js Konami code for a reward burst. 14 KB, no deps, rock-solid. The payoff for the easter egg layer. |
| 3 | **ttty** | 77 | Hidden site terminal with custom commands (`whoami`, `play`, `contact`). IIFE CDN, dependency-free, Aug 2024 active. Perfect for a code-literate portfolio. |
| 4 | **cheet.js** | 1.3k | The glue: map `↑ ↑ ↓ ↓ ← → ← → b a` (or `k r i s t j a n`) → open terminal + confetti. Tiny, MIT, no build. |
| 5 | **Splitting.js** | 1.8k | CDN drop-in char splitter enabling CSS variable text animations. Works alongside existing GSAP setup. Zero overlap issue. |
| 6 | **wavesurfer.js** | 10.3k | If the music section exists — a waveform player is immediately credible for a musician/composer. Actively maintained in 2026, CDN loadable. |

**Single best "ship it" pick:** `cursor-effects` — one CDN line, works in vanilla HTML, no config required, immediately sets a playful tone for the site, maintained Dec 2024, MIT, 4k stars, zero deps. `new emojiCursor({ emoji: ['🎵', '🎬', '🇮🇸', '🎸'] })` and you're done.

---

## Rejected / Flagged

- **Blotter.js** — visually stunning but requires Three.js + Underscore (~300 KB); last commit ~2019. Reserve for a single isolated hero experiment.
- **scrollProgress libs** — redundant with GSAP ScrollTrigger. Skip.
- **magnet-mouse** — only 114 stars, last updated 2019. The effect is ~30 lines of vanilla JS; write it by hand.
- **Wave.js** — wavesurfer.js is strictly better maintained if audio is a priority.
- **konami-js** — cheet.js is a superset; use that instead.
- **js-confetti** — emoji confetti is cute but last commit 2021; canvas-confetti (actively maintained) is the safer pick.
- **mouse-follower (Cuberto)** — requires GSAP; redundant dependency.
