// Vanilla i18n: loads lang/{is,en}.json, applies data-i18n, persists choice.
const STORAGE_KEY = 'keb-lang';
const SUPPORTED = ['is', 'en'];
const dicts = {};
let current = 'en';

function detectDefault() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (SUPPORTED.includes(saved)) return saved;
  return (navigator.language || 'en').toLowerCase().startsWith('is') ? 'is' : 'en';
}

async function loadDict(lang) {
  if (dicts[lang]) return dicts[lang];
  const res = await fetch(`lang/${lang}.json`);
  dicts[lang] = await res.json();
  return dicts[lang];
}

export function t(key) {
  return (dicts[current] && dicts[current][key]) || key;
}

function apply() {
  document.documentElement.lang = current;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  window.KEB_LANG = current;
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: current } }));
}

export async function setLang(lang) {
  if (!SUPPORTED.includes(lang)) return;
  current = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  await loadDict(lang);
  apply();
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = lang === 'is' ? 'EN' : 'IS';
}

export async function initI18n() {
  await setLang(detectDefault());
  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => setLang(current === 'is' ? 'en' : 'is'));
  }
}

window.t = t;
