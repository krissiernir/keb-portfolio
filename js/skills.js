// Skills / Kunnátta section — accordion behaviour + scroll-driven reveal.
// The site is a fixed-overlay scrollytelling layout (see js/main.js, story.js),
// so this section is a fixed overlay that fades in over its own scroll band
// (#skills-anchor sits at 450vh inside #main-content) while the work marquee,
// hero name and bio fade out, then stays put through the dwell that follows.

export function initSkills() {
    const skills = document.getElementById('skills');
    if (!skills || window.__skillsReady) return;
    window.__skillsReady = true;

    // ── Accordion (single-open) ──────────────────────────────────────────
    const rows = Array.from(skills.querySelectorAll('.skill-row'));
    rows.forEach((row) => {
        const head = row.querySelector('.skill-row-head');
        if (!head) return;
        head.addEventListener('click', () => {
            const wasOpen = row.classList.contains('is-open');
            rows.forEach((r) => r.classList.remove('is-open'));
            if (!wasOpen) row.classList.add('is-open');
        });
    });

    // ── Contact CTA → reuse the info-modal button ────────────────────────
    const cta = document.getElementById('skills-contact');
    if (cta) {
        cta.addEventListener('click', () => {
            const infoBtn = document.getElementById('info-btn');
            if (infoBtn) infoBtn.click();
        });
    }

    // ── Scroll-driven reveal — order is intro → kunnátta → work ──────────
    if (typeof ScrollTrigger === 'undefined' || typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('#skills', { autoAlpha: 0 });
    gsap.set('.skill-row', { autoAlpha: 0, y: 40 });
    gsap.set('.skills-statement-inner', { yPercent: 110 }); // big-type slide-up reveal
    // Work marquee stays hidden until the work band reveals it (it used to be
    // revealed at the end of the intro in story.js).
    gsap.set('.portfolio-wrapper', { autoAlpha: 0 });

    const skillsAnchor = document.getElementById('skills-anchor');
    if (!skillsAnchor) return;

    // ONE timeline owns the whole post-intro sequence so no two scrubbed
    // timelines fight over the same property (e.g. #skills opacity). The range
    // covers: kunnátta reveal → hold → work reveal.
    //   ~0.00–0.90  KUNNÁTTA in (hero/bio out, section + big statement + rows in)
    //   ~0.90–1.70  hold (kunnátta is the front, interactive section)
    //   ~1.70–2.45  WORK in (kunnátta out, marquee rises from a slight zoom)
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: skillsAnchor,
            start: 'top top',
            end: () => '+=' + (window.innerHeight * 2.0),
            scrub: 1,
            // Kunnátta captures pointer events only while it's the front section.
            onUpdate: (self) => skills.classList.toggle('is-active', self.progress > 0.22 && self.progress < 0.70)
        }
    });

    // KUNNÁTTA in
    tl.to('#hero-name', { autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, 0)
      .to('.bio-section', { autoAlpha: 0, y: -50, duration: 0.4, ease: 'power2.in' }, 0)
      .to('#skills', { autoAlpha: 1, duration: 0.4, ease: 'power1.out' }, 0.12)
      .fromTo('.skills-inner', { y: 60 }, { y: 0, duration: 0.6, ease: 'power3.out' }, 0.15)
      .to('.skills-statement-inner', { yPercent: 0, duration: 0.6, ease: 'power4.out' }, 0.25)
      .to('.skill-row', { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out' }, 0.34)
    // WORK in (after a hold)
      .to('.skills-inner', { y: -50, duration: 0.5, ease: 'power2.in' }, 1.7)
      .to('#skills', { autoAlpha: 0, duration: 0.4, ease: 'power1.in' }, 1.75)
      .fromTo('.portfolio-wrapper',
          { autoAlpha: 0, y: '45vh', scale: 1.04 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }, 1.85);

    // Keep the big-type statement in sync if the language toggles after reveal.
    document.addEventListener('langchange', () => {
        if (skills.classList.contains('is-active')) {
            gsap.set('.skills-statement-inner', { yPercent: 0 });
        }
    });

    ScrollTrigger.refresh();
}
