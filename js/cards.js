export async function initCards() {
    const container = document.querySelector('.cards-container');
    if (!container) return;

    let projects = [];
    try {
        const response = await fetch('projects.json');
        projects = await response.json();
    } catch (error) {
        console.error("Erreur lors du chargement des projets:", error);
        return;
    }

    container.innerHTML = projects.map(project => `
        <div class="card" data-project-id="${project.id}">
            <div class="card-screen">
                <img src="${project.cover}" alt="${project.title}">
                <div class="card-content">${project.title}</div>
            </div>
            <div class="card-base"></div>
        </div>
    `).join("");

    const contentWidth = container.scrollWidth;

    const originalContent = container.innerHTML;
    container.innerHTML = originalContent.repeat(4);

    let xPos = 0;
    let baseSpeed = 0.5;
    window.isProjectOpen = false;

    // Velocity-reactive skew on the marquee wrapper (physical, "alive" feel).
    // Skew the wrapper, not the cards, so device-mockup content stays crisp.
    const skewWrap = document.querySelector('.marquee-skew');
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setSkew = (skewWrap && !reduceMotion)
        ? gsap.quickTo(skewWrap, 'skewX', { duration: 0.5, ease: 'power3' })
        : null;


    function pick(field) {
        const lang = window.KEB_LANG || 'en';
        return (field && (field[lang] || field.en || field.is)) || '';
    }

    function renderProjectDetails(project) {
        document.getElementById("project-view-title").textContent = project.title;
        document.getElementById("project-view-img").alt = project.title;
        document.getElementById("project-view-meta").textContent =
            [project.role, project.year].filter(Boolean).join(' · ');
        document.getElementById("project-view-summary").textContent = pick(project.summary);
        // Fill each titled section, and hide it while its copy is empty so
        // unwritten projects don't show bare headings.
        const setSection = (id, text) => {
            const el = document.getElementById(id);
            el.textContent = text;
            const section = el.closest('.project-section');
            if (section) section.style.display = text ? '' : 'none';
        };
        setSection("project-view-problem", pick(project.problem));
        setSection("project-view-approach", pick(project.approach));
        setSection("project-view-outcome", pick(project.outcome));
        const videoEl = document.getElementById("project-view-video");
        videoEl.innerHTML = project.video
            ? `<iframe src="${project.video}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`
            : '';
        const links = Object.entries(project.links || {});
        document.getElementById("project-view-links").innerHTML = links
            .map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener">${label}</a></li>`).join('');
        document.getElementById("links-section").style.display = links.length ? '' : 'none';

        const scrollEl = document.querySelector('.project-info-scroll');
        if (scrollEl) scrollEl.scrollTop = 0;
        window.currentProject = project;
    }

    container.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        if (!card) return;

        window.isProjectOpen = true;
        if (window.lenis) window.lenis.stop();
        document.body.classList.add('project-open');
        ScrollTrigger.getAll().forEach(st => st.disable(false, false));

        const projectId = parseInt(card.dataset.projectId, 10);
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        const imgEl = document.getElementById("project-view-img");

        const allCards = Array.from(container.querySelectorAll(".card"));
        const clickedIndex = allCards.indexOf(card);
        const groupStart = Math.floor(clickedIndex / projects.length) * projects.length;
        const groupCards = allCards.slice(groupStart, groupStart + projects.length);

        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const targetX = (window.innerWidth / 2) - cardCenter;

        const tl = gsap.timeline();

        allCards.forEach(c => {
            if (!groupCards.includes(c)) {
                gsap.to(c, { opacity: 0, scale: 0.8, duration: 0.5, pointerEvents: "none" });
            } else {
                c.style.pointerEvents = "auto";
                if (c === card) {
                    c.classList.add("is-selected");
                    gsap.to(c, { opacity: 1, scale: 1.2, duration: 1.2, ease: "power4.inOut" });
                } else {
                    c.classList.remove("is-selected");
                    gsap.to(c, { opacity: 0.5, scale: 0.9, duration: 1.2, ease: "power4.inOut" });
                }
            }
        });

        gsap.to(container, {
            x: targetX,
            duration: 1.2,
            ease: "power4.inOut",
            onUpdate: function() {
                xPos = gsap.getProperty(container, "x");
            }
        });

        container.dataset.isOpen = "true";

        if (container.dataset.dockActive === "true" && imgEl.src.endsWith(project.cover.split('/').pop())) {
            const swapTl = gsap.timeline();
            const infoEls = ["#project-view-title", "#project-view-meta", "#project-view-summary", "#project-view-problem", "#project-view-approach", "#project-view-outcome", "#project-view-video", "#project-view-links"];
            swapTl
                .to([imgEl, ...infoEls], { opacity: 0, duration: 0.3, y: 15 })
                .call(() => {
                    imgEl.src = project.cover;
                    renderProjectDetails(project);
                })
                .to([imgEl, ...infoEls], { opacity: 1, duration: 0.3, y: 0 });
            return;
        }

        if (container.dataset.dockActive === "true") {
            const swapTl = gsap.timeline();
            const infoEls = ["#project-view-title", "#project-view-meta", "#project-view-summary", "#project-view-problem", "#project-view-approach", "#project-view-outcome", "#project-view-video", "#project-view-links"];
            swapTl
                .to([imgEl, ...infoEls], { opacity: 0, duration: 0.3, y: 15 })
                .call(() => {
                    imgEl.src = project.cover;
                    renderProjectDetails(project);
                })
                .to([imgEl, ...infoEls], { opacity: 1, duration: 0.3, y: 0 });
            return;
        }

        container.dataset.dockActive = "true";
        imgEl.src = project.cover;
        renderProjectDetails(project);

        tl.to(["#hero-name", ".bio-section"], {
            y: "-15vh",
            opacity: 0,
            duration: 1.2,
            ease: "power4.inOut"
        }, 0);

        tl.to(".portfolio-wrapper", {
            y: "-45vh",
            scale: 0.4,
            transformOrigin: "center top",
            duration: 1.2,
            ease: "power4.inOut"
        }, 0);

        tl.to("#project-view", {
            y: "0vh",
            duration: 1.2,
            ease: "power4.inOut"
        }, 0);

        tl.to([".top-nav-container", ".logos-fixed-wrapper"], {
            y: "-15vh",
            opacity: 0,
            pointerEvents: "none",
            duration: 1.2,
            ease: "power4.inOut"
        }, 0);
    });

    document.getElementById("close-project").addEventListener("click", () => {
        window.isProjectOpen = false;
        document.body.classList.remove('project-open');
        ScrollTrigger.getAll().forEach(st => st.enable(false, false));
        if (window.lenis) {
            window.lenis.start();
            window.lenis.scrollTo(window.innerHeight * 4.7, { immediate: true }); // back to the work band
        }
        container.dataset.dockActive = "false";
        const allCards = Array.from(container.querySelectorAll(".card"));

        const tl = gsap.timeline();

        allCards.forEach(c => {
            c.classList.remove("is-selected");
            c.style.pointerEvents = "auto";
            gsap.to(c, { opacity: 1, scale: 1, duration: 1, ease: "power4.inOut" });
        });

        tl.to("#project-view", {
            y: "100vh",
            duration: 1,
            ease: "power4.inOut"
        }, 0);

        tl.to(".portfolio-wrapper", {
            y: "0vh",
            scale: 1,
            duration: 1,
            ease: "power4.inOut"
        }, 0);

        tl.to(["#hero-name", ".bio-section"], {
            y: "0vh",
            opacity: 1,
            duration: 1,
            ease: "power4.inOut"
        }, 0);

        tl.to([".top-nav-container", ".logos-fixed-wrapper"], {
            y: "0vh",
            opacity: 1,
            pointerEvents: "auto",
            duration: 1,
            ease: "power4.inOut"
        }, 0);
    });

    function render() {
        if (window.preloaderFinished) {
            if (setSkew && window.lenis) {
                setSkew(gsap.utils.clamp(-5, 5, (window.lenis.velocity || 0) * -0.12));
            }
            if (!window.isProjectOpen) {
                let currentSpeed = baseSpeed;

                if (window.lenis && window.lenis.velocity) {
                    currentSpeed += window.lenis.velocity * 0.4;
                }

                xPos -= currentSpeed;

                if (xPos <= -contentWidth) {
                    xPos += contentWidth;
                }
                if (xPos > 0) {
                    xPos -= contentWidth;
                }

                gsap.set(container, { x: xPos });
            }
        }

        requestAnimationFrame(render);
    }
    document.addEventListener('langchange', () => {
        if (window.isProjectOpen && window.currentProject) renderProjectDetails(window.currentProject);
    });

    requestAnimationFrame(render);
}
