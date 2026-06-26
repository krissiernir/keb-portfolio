// Ambient atmosphere — slow continuous drift of the warm glow pools.
// Scroll-tied reveals (ghost tagline, glow brighten, geo anchor, name weight)
// live in story.js since they ride the master scroll timeline. The cinematic
// letterbox iris fires from preloader.js on completion.

export function initAtmosphere() {
    if (typeof gsap === 'undefined' || window.__atmosphereReady) return;
    window.__atmosphereReady = true;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // CSS leaves the orbs in a calm static state

    // Each orb drifts on its own slow, looping path so the light feels alive
    // without ever drawing attention. Transform only (orb is the blend parent;
    // the blur lives on its child <i>, so this stays cheap and Safari-safe).
    gsap.utils.toArray('.glow-orb').forEach((orb, i) => {
        gsap.to(orb, {
            xPercent: gsap.utils.random(-12, 12),
            yPercent: gsap.utils.random(-10, 10),
            duration: gsap.utils.random(10, 16),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 1.5,
        });
    });
}
