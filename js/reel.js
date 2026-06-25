(function () {
  const link = document.getElementById('intro-reel-link');
  const modal = document.getElementById('reel-modal');
  const overlay = modal && modal.querySelector('.reel-modal-overlay');
  const content = modal && modal.querySelector('.reel-modal-content');
  const closeBtn = document.getElementById('reel-modal-close');
  const video = document.getElementById('reel-video');
  if (!link || !modal || !video) return;

  function open(e) {
    if (e) e.preventDefault();
    gsap.set(modal, { visibility: 'visible', pointerEvents: 'auto' });
    gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    gsap.fromTo(content, { opacity: 0, y: '4vh' }, { opacity: 1, y: '0vh', duration: 0.5, ease: 'power4.out' });
    video.currentTime = 0;
    video.play().catch(() => {});
  }
  function close() {
    video.pause();
    gsap.to(content, { opacity: 0, y: '4vh', duration: 0.3, ease: 'power3.in' });
    gsap.to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.in',
      onComplete: () => gsap.set(modal, { visibility: 'hidden', pointerEvents: 'none' }) });
  }
  link.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  overlay && overlay.addEventListener('click', close);
})();
