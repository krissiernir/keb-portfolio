import { initPreloader } from './preloader.js';
import { initCards } from './cards.js';
import { initModal } from './modal.js';
import { initWatercolorReveal } from './watercolor-reveal.js';
import { initSkills } from './skills.js';
import { initCursor } from './cursor.js';

function boot() {

    gsap.registerPlugin(ScrollTrigger);

    // Enregistré AVANT Lenis : bloque tous les wheel events hors du projet quand un projet est ouvert.
    // Capture phase + window = priorité maximale, stopImmediatePropagation empêche Lenis de recevoir l'event.
    window.addEventListener('wheel', (e) => {
        if (window.isProjectOpen && !e.target.closest('#project-view')) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }, { passive: false, capture: true });

    window.addEventListener('touchmove', (e) => {
        if (window.isProjectOpen && !e.target.closest('#project-view')) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }, { passive: false, capture: true });

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false, // scroll fini : nécessaire pour piloter la séquence storytelling
    })

    window.lenis = lenis;

    // Intégration Lenis <-> ScrollTrigger : un seul ticker, ScrollTrigger suit le scroll de Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        if (!window.isProjectOpen) lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // On bloque le scroll tant que l'intro (preloader) n'est pas terminée
    lenis.stop();

    // Liens en texte brut de l'intro
    const introInfos = document.getElementById("intro-infos");
    const introProjets = document.getElementById("intro-projets");
    if (introInfos) {
        introInfos.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("info-btn").click();
        });
    }
    if (introProjets) {
        introProjets.addEventListener("click", (e) => {
            e.preventDefault();
            lenis.scrollTo(window.innerHeight * 4.7, { duration: 2 }); // work (third section)
        });
    }
    const introSkills = document.getElementById("intro-skills");
    if (introSkills) {
        introSkills.addEventListener("click", (e) => {
            e.preventDefault();
            lenis.scrollTo(window.innerHeight * 3.6, { duration: 2 }); // kunnátta (second section)
        });
    }

    initModal();
    initWatercolorReveal();
    initCursor();
    initSkills();
    initCards().then(() => {
        initPreloader();
    });
}

// index.html awaits initI18n() before importing this module, so DOMContentLoaded has
// usually already fired by the time we get here — run boot() now if the DOM is ready,
// otherwise wait for the event. (A plain DOMContentLoaded listener would never fire.)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
