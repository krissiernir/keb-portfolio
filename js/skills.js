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
    // Work marquee stays hidden until the work band reveals it (it used to be
    // revealed at the end of the intro in story.js).
    gsap.set('.portfolio-wrapper', { autoAlpha: 0 });

    const skillsAnchor = document.getElementById('skills-anchor');
    const workAnchor = document.getElementById('work-anchor');
    if (!skillsAnchor || !workAnchor) return;

    // 1) KUNNÁTTA — the second section: fades the hero/bio out and itself in,
    //    right after the intro choreography ends.
    const kt = gsap.timeline({
        scrollTrigger: {
            trigger: skillsAnchor,
            start: 'top top',
            end: () => '+=' + (window.innerHeight * 0.85),
            scrub: 1,
            onUpdate: (self) => skills.classList.toggle('is-active', self.progress > 0.45),
            onLeave: () => skills.classList.add('is-active')
        }
    });
    kt.to(['#hero-name', '.bio-section'], {
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

    // 2) WORK — the third section: fades Kunnátta out and the marquee in.
    const wt = gsap.timeline({
        scrollTrigger: {
            trigger: workAnchor,
            start: 'top top',
            end: () => '+=' + (window.innerHeight * 0.85),
            scrub: 1,
            // Hand interactivity from Kunnátta to the marquee as it takes over.
            onUpdate: (self) => skills.classList.toggle('is-active', self.progress < 0.05),
            onLeaveBack: () => skills.classList.add('is-active')
        }
    });
    wt.to('#skills', {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power1.in'
    }, 0)
    .to('.portfolio-wrapper', {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
    }, 0.15);

    ScrollTrigger.refresh();
}
