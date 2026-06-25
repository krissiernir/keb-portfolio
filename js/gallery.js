/* ─── gallery.js ────────────────────────────────────────────────────────────
   Stillur — standalone image gallery for keb.is
   Vanilla JS, no dependencies.
   Expects window.KEB_LANG (set by i18n.js) and listens for 'langchange'.
   gallery.json schema (fixed — another worker fills it):
   [{ "src": "…", "title": {"is":"…","en":"…"}, "tags": ["…"], "year": "2024" }]
   ─────────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────────────────────
  let allItems       = [];
  let filteredItems  = [];
  let activeTag      = 'all';
  let lightboxIndex  = 0;
  let lightboxOpen   = false;

  // ── DOM refs ─────────────────────────────────────────────────────────────
  const gridEl       = document.getElementById('gallery-grid');
  const tagBarEl     = document.getElementById('gallery-tag-bar');
  const lightboxEl   = document.getElementById('gallery-lightbox');
  const backdropEl   = document.getElementById('lightbox-backdrop');
  const closeBtnEl   = document.getElementById('lightbox-close');
  const prevBtnEl    = document.getElementById('lightbox-prev');
  const nextBtnEl    = document.getElementById('lightbox-next');
  const lbImgEl      = document.getElementById('lightbox-img');
  const lbTitleEl    = document.getElementById('lightbox-title');
  const lbYearEl     = document.getElementById('lightbox-year');
  const lbTagsEl     = document.getElementById('lightbox-tags');

  // ── Helpers ───────────────────────────────────────────────────────────────
  function lang() {
    return (typeof window.KEB_LANG === 'string') ? window.KEB_LANG : 'is';
  }

  function itemTitle(item) {
    const l = lang();
    if (item.title && typeof item.title === 'object') {
      return item.title[l] || item.title['is'] || item.title['en'] || '';
    }
    return String(item.title || '');
  }

  // ── Fetch ─────────────────────────────────────────────────────────────────
  async function loadGallery() {
    renderSkeletons(8);
    try {
      const res = await fetch('gallery.json');
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) throw new Error('empty');
      allItems = data;
    } catch {
      allItems = [];
    }
    buildTagBar();
    applyFilter();
  }

  // ── Skeleton placeholders ──────────────────────────────────────────────────
  function renderSkeletons(count) {
    if (!gridEl) return;
    gridEl.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const div = document.createElement('div');
      div.className = 'gallery-skeleton';
      const screen = document.createElement('div');
      screen.className = 'gallery-skeleton-screen';
      const inner = document.createElement('div');
      inner.className = 'gallery-skeleton-img';
      screen.appendChild(inner);
      const base = document.createElement('div');
      base.className = 'gallery-skeleton-base';
      div.appendChild(screen);
      div.appendChild(base);
      gridEl.appendChild(div);
    }
  }

  // ── Tag bar ───────────────────────────────────────────────────────────────
  function buildTagBar() {
    if (!tagBarEl) return;
    const tagSet = new Set();
    allItems.forEach(item => {
      if (Array.isArray(item.tags)) item.tags.forEach(t => tagSet.add(t));
    });
    const tags = Array.from(tagSet).sort();
    tagBarEl.innerHTML = '';

    const allBtn = makeTagButton('all', lang() === 'is' ? 'Allt' : 'All', activeTag === 'all');
    tagBarEl.appendChild(allBtn);
    tags.forEach(tag => {
      const btn = makeTagButton(tag, tag, activeTag === tag);
      tagBarEl.appendChild(btn);
    });
  }

  function makeTagButton(value, label, isActive) {
    const btn = document.createElement('button');
    btn.className = 'tag-btn' + (isActive ? ' active' : '');
    btn.dataset.tag = value;
    btn.textContent = label;
    btn.addEventListener('click', () => {
      activeTag = value;
      tagBarEl.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter();
    });
    return btn;
  }

  // ── Filter + render ───────────────────────────────────────────────────────
  function applyFilter() {
    if (activeTag === 'all') {
      filteredItems = allItems.slice();
    } else {
      filteredItems = allItems.filter(item =>
        Array.isArray(item.tags) && item.tags.includes(activeTag)
      );
    }
    renderGrid();
  }

  function renderGrid() {
    if (!gridEl) return;
    gridEl.innerHTML = '';

    if (allItems.length === 0) {
      const msg = document.createElement('p');
      msg.className = 'gallery-empty';
      msg.textContent = lang() === 'is' ? 'Engar stillur enn.' : 'No stills yet.';
      gridEl.appendChild(msg);
      return;
    }

    if (filteredItems.length === 0) {
      const msg = document.createElement('p');
      msg.className = 'gallery-empty';
      msg.textContent = lang() === 'is' ? 'Engar myndir í þessum flokki.' : 'No images in this category.';
      gridEl.appendChild(msg);
      return;
    }

    filteredItems.forEach((item, index) => {
      const el = createGalleryItem(item, index);
      gridEl.appendChild(el);
    });

    setupLazyLoad();
  }

  function createGalleryItem(item, index) {
    // Outer wrapper — the full device unit
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-item';
    wrapper.setAttribute('tabindex', '0');
    wrapper.setAttribute('role', 'button');
    const title = itemTitle(item);
    wrapper.setAttribute('aria-label', title);

    // Screen bezel — contains top bar (::before), image, and overlay
    const screen = document.createElement('div');
    screen.className = 'gallery-item-screen';

    const img = document.createElement('img');
    img.dataset.src = item.src;
    img.alt = title;
    img.setAttribute('loading', 'lazy');

    const overlay = document.createElement('div');
    overlay.className = 'gallery-item-overlay';

    const info = document.createElement('div');
    info.className = 'gallery-item-info';

    const titleEl = document.createElement('span');
    titleEl.className = 'gallery-item-title';
    titleEl.textContent = title;

    const tagsEl = document.createElement('div');
    tagsEl.className = 'gallery-item-tags';
    if (Array.isArray(item.tags)) {
      item.tags.forEach(tag => {
        const chip = document.createElement('span');
        chip.className = 'gallery-item-tag';
        chip.textContent = tag;
        tagsEl.appendChild(chip);
      });
    }

    info.appendChild(titleEl);
    info.appendChild(tagsEl);
    overlay.appendChild(info);
    screen.appendChild(img);
    screen.appendChild(overlay);

    // Deck/base bar beneath the screen
    const base = document.createElement('div');
    base.className = 'gallery-item-base';

    wrapper.appendChild(screen);
    wrapper.appendChild(base);

    wrapper.addEventListener('click', () => openLightbox(index));
    wrapper.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });

    return wrapper;
  }

  // ── Lazy load via IntersectionObserver ────────────────────────────────────
  function setupLazyLoad() {
    const imgs = gridEl ? gridEl.querySelectorAll('img[data-src]') : [];
    if (!imgs.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
          img.addEventListener('error', () => img.classList.add('loaded'), { once: true });
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    imgs.forEach(img => observer.observe(img));
  }

  // ── Lightbox ──────────────────────────────────────────────────────────────
  function openLightbox(index) {
    lightboxIndex = index;
    lightboxOpen = true;
    populateLightbox();
    lightboxEl.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtnEl.focus();
  }

  function closeLightbox() {
    lightboxOpen = false;
    lightboxEl.hidden = true;
    document.body.style.overflow = '';
  }

  function populateLightbox() {
    const item = filteredItems[lightboxIndex];
    if (!item) return;

    const title = itemTitle(item);
    lbImgEl.src = item.src;
    lbImgEl.alt = title;
    lbTitleEl.textContent = title;
    lbYearEl.textContent = item.year || '';

    lbTagsEl.innerHTML = '';
    if (Array.isArray(item.tags)) {
      item.tags.forEach(tag => {
        const chip = document.createElement('span');
        chip.className = 'lightbox-tag';
        chip.textContent = tag;
        lbTagsEl.appendChild(chip);
      });
    }

    prevBtnEl.disabled = lightboxIndex === 0;
    nextBtnEl.disabled = lightboxIndex === filteredItems.length - 1;
    prevBtnEl.style.visibility = lightboxIndex === 0 ? 'hidden' : 'visible';
    nextBtnEl.style.visibility = lightboxIndex === filteredItems.length - 1 ? 'hidden' : 'visible';
  }

  function goToNext() {
    if (lightboxIndex < filteredItems.length - 1) {
      lightboxIndex++;
      populateLightbox();
    }
  }

  function goToPrev() {
    if (lightboxIndex > 0) {
      lightboxIndex--;
      populateLightbox();
    }
  }

  // ── Events ────────────────────────────────────────────────────────────────
  if (closeBtnEl) closeBtnEl.addEventListener('click', closeLightbox);
  if (backdropEl) backdropEl.addEventListener('click', closeLightbox);
  if (prevBtnEl)  prevBtnEl.addEventListener('click', goToPrev);
  if (nextBtnEl)  nextBtnEl.addEventListener('click', goToNext);

  document.addEventListener('keydown', e => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'ArrowLeft')  goToPrev();
  });

  // ── Language change ───────────────────────────────────────────────────────
  document.addEventListener('langchange', () => {
    // Rebuild tag bar labels (Allt/All)
    buildTagBar();
    // Re-render grid so titles update
    renderGrid();
    // Update open lightbox if visible
    if (lightboxOpen) populateLightbox();
  });

  // ── Boot ──────────────────────────────────────────────────────────────────
  // Wait for i18n to initialise (script loads after i18n module via defer),
  // so window.KEB_LANG is already set by the time we run.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGallery);
  } else {
    loadGallery();
  }

})();
