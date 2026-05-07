/* ─── Theme ──────────────────────────────────────────────── */
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (toggleBtn) toggleBtn.textContent = theme === 'dark' ? '☀ light' : '◑ dark';
}

// Init theme
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (prefersDark ? 'dark' : 'light'));

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* ─── Active nav link ────────────────────────────────────── */
document.querySelectorAll('nav a').forEach(link => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const href = link.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
