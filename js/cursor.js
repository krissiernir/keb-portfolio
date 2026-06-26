// Custom cursor (dot + trailing ring) + magnetic buttons + nav micro-interactions.
// Desktop only: bails on touch / coarse pointer / reduced-motion, leaving the
// native cursor untouched. Inspired by the feel of trionn.com.

export function initCursor() {
    if (window.__cursorReady) return;
    const fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    window.__cursorReady = true;

    // ── Dot + ring ───────────────────────────────────────────────────────
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.documentElement.classList.add('has-custom-cursor');

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener('pointermove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate(${mx}px, ${my}px)`;
    });

    (function loop() {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        requestAnimationFrame(loop);
    })();

    // ── Hover / press states ─────────────────────────────────────────────
    const root = document.documentElement;
    const hoverSel = 'a, button, .card, .skill-row-head, [data-magnetic]';
    document.addEventListener('pointerover', (e) => {
        if (e.target.closest && e.target.closest(hoverSel)) root.classList.add('cursor-hover');
    });
    document.addEventListener('pointerout', (e) => {
        if (e.target.closest && e.target.closest(hoverSel) &&
            !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(hoverSel))) {
            root.classList.remove('cursor-hover');
        }
    });
    window.addEventListener('pointerdown', () => root.classList.add('cursor-down'));
    window.addEventListener('pointerup', () => root.classList.remove('cursor-down'));

    // ── Magnetic buttons ─────────────────────────────────────────────────
    const hasGsap = typeof gsap !== 'undefined';
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
        const strength = parseFloat(el.dataset.magnetic) || 0.35;
        el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            const x = (e.clientX - (r.left + r.width / 2)) * strength;
            const y = (e.clientY - (r.top + r.height / 2)) * strength;
            if (hasGsap) gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' });
            else el.style.transform = `translate(${x}px, ${y}px)`;
        });
        el.addEventListener('pointerleave', () => {
            if (hasGsap) gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
            else el.style.transform = '';
        });
    });
}
