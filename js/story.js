export function initStory() {
    if (window.__storyReady) return;
    window.__storyReady = true;

    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

    const heroName = document.getElementById("hero-name");
    const introImg = document.getElementById("intro-img");

    const W = window.innerWidth;
    const H = window.innerHeight;
    const marginPx = W * 0.01;

    const textWidth = heroName.offsetWidth || 1;
    const textHeight = heroName.offsetHeight || 1;

    const scaleF = (W * 0.38) / textWidth;
    const scaledWF = textWidth * scaleF;
    const scaledHF = textHeight * scaleF;
    const leftFVW = (marginPx + (scaledWF / 2)) / W * 100;
    const topFVH = (marginPx + (scaledHF / 2)) / H * 100;

    const ar = (introImg.naturalWidth || 2000) / (introImg.naturalHeight || 1500);
    const finalImgH = (W * 0.40) / ar;     // hauteur rendue à 40vw de large (px)
    const finalImgTop = H - finalImgH;      // collée au bas de l'écran (px)

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: () => "+=" + (window.innerHeight * 2.5),
            scrub: 1
        }
    });

    tl.to("#intro-links", {
        opacity: 0,
        pointerEvents: "none",
        ease: "power1.in",
        duration: 0.15
    }, 0)
    .to(heroName, {
        top: topFVH + "vh",
        left: leftFVW + "vw",
        scale: scaleF,
        "--kweight": 330,   // Fraunces refines from heavy display to light as it migrates
        ease: "none",
        duration: 1
    }, 0)
    .to(introImg, {
        top: finalImgTop,
        width: "40vw",
        ease: "none",
        duration: 1
    }, 0)
    // La découpe de l'image morphe de la croix vers le quadrilatère
    // pendant le déplacement de l'image (même durée, même départ)
    .to("#intro-clip-path", {
        morphSVG: "#intro-clip-path-end",
        ease: "none",
        duration: 1
    }, 0)

    .to(".intro-word", {
        opacity: 1,
        y: 0,
        ease: "power1.out",
        stagger: { each: 0.025, from: "start" },
        duration: 0.6
    }, 1.05)

    .to(introImg, {
        opacity: 0,
        y: "12vh",
        duration: 0.45,
        ease: "power1.in"
    }, 2.0)
    .to(".intro-word", {
        opacity: 0,
        y: 20,
        stagger: { each: 0.01, from: "start" },
        duration: 0.4,
        ease: "power1.in"
    }, 2.45)

    .to([".top-nav-container", ".logos-fixed-wrapper"], {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power1.out"
    }, 3.2)
    // The work marquee is no longer revealed here — it now comes AFTER the
    // Kunnátta section (see js/skills.js work timeline), so the scroll order is
    // intro → kunnátta → work.
    // Hero statement reveals just after the name settles (was at the very end) —
    // it is now the opening line, not a trailing bio.
    .to(".bio-word", {
        opacity: 1,
        y: 0,
        stagger: { each: 0.09, from: "start" },
        duration: 0.7,
        ease: "power2.out"
    }, 1.15);

    // Oversized ghost tagline rises in to claim the empty lower-intro, then
    // settles back so it never competes with the bio; geo anchor joins the nav.
    tl.to("#intro-tagline-large", { opacity: 0.1, duration: 0.6, ease: "power1.out" }, 0.8)
      .to("#intro-tagline-large", { opacity: 0.055, duration: 1.0, ease: "power1.inOut" }, 2.6)
      .to(".geo-anchor", { opacity: 1, duration: 0.6, ease: "power1.out" }, 3.2);

    ScrollTrigger.refresh();
}
