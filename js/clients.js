// Static client list — file names must exist under assets/img/clients/.
const CLIENTS = [
  { name: 'RÚV', file: 'ruvlogo.png' },
  { name: 'Icelandair', file: 'icelandair.png' },
  { name: 'Þjóðleikhúsið', file: 'thjodleikhusid.png' },
  { name: 'Harpa', file: 'harpalogo.png' },
  { name: 'Iceland Airwaves', file: 'iceland-airwaves-vector-logo.png' },
  { name: 'Sentio', file: 'sentio_logo.png' },
  { name: 'Samfés', file: 'Samfés-LOGO.png' },
  { name: 'RIFF', file: 'rifflogo.png' }
];

const grid = document.getElementById('clients-grid');
if (grid) {
  grid.innerHTML = CLIENTS.map(c =>
    `<div class="client-logo"><img src="assets/img/clients/${c.file}" alt="${c.name}" loading="lazy"></div>`
  ).join('');
}

const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
