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

    // ── Scroll-driven reveal ─────────────────────────────────────────────
    if (typeof ScrollTrigger === 'undefined' || typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.set('#skills', { autoAlpha: 0 });
    gsap.set('.skill-row', { autoAlpha: 0, y: 40 });

    const anchor = document.getElementById('skills-anchor');
    if (!anchor) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: anchor,
            start: 'top top',
            end: () => '+=' + (window.innerHeight * 0.85),
            scrub: 1,
            onUpdate: (self) => {
                // Only capture pointer events once the section is mostly visible,
                // so it never blocks the intro/marquee underneath it.
                skills.classList.toggle('is-active', self.progress > 0.45);
            }
        }
    });

    tl.to(['.portfolio-wrapper', '#hero-name', '.bio-section'], {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power1.in'
    }, 0)
    .to('#skills', {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power1.out'
    }, 0.15)
    .to('.skill-row', {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out'
    }, 0.3);

    ScrollTrigger.refresh();
}
