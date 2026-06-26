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

/* ─── Certifications ────────────────────────────────────── */
async function loadCertificates() {
  const container = document.getElementById('certifications-list');
  if (!container) return;

  try {
    const res = await fetch('certificates/index.json');
    if (!res.ok) throw new Error('Certificate index not found');
    const certificates = await res.json();

    if (!Array.isArray(certificates) || certificates.length === 0) return;

    const ul = document.createElement('ul');
    ul.className = 'certificate-list';

    certificates
      .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
      .forEach(cert => {
        const li = document.createElement('li');
        li.className = 'certificate-item';

        const date = document.createElement('span');
        date.className = 'certificate-date';
        date.textContent = cert.date || '';

        const body = document.createElement('span');
        body.className = 'certificate-body';

        const href = cert.url || (cert.file ? `certificates/${cert.file}` : '');
        const title = document.createElement(href ? 'a' : 'strong');
        title.className = 'certificate-title';
        title.textContent = cert.title || 'Certificate';
        if (href) {
          title.href = href;
          title.target = '_blank';
          title.rel = 'noopener';
        }

        const issuer = document.createElement('span');
        issuer.className = 'certificate-issuer';
        issuer.textContent = cert.issuer ? ` — ${cert.issuer}` : '';

        body.appendChild(title);
        body.appendChild(issuer);
        if (cert.description) {
          const description = document.createElement('span');
          description.className = 'certificate-description';
          description.textContent = cert.description;
          body.appendChild(description);
        }
        li.appendChild(date);
        li.appendChild(body);
        ul.appendChild(li);
      });

    container.innerHTML = '';
    container.appendChild(ul);
  } catch (e) {
    container.innerHTML = '<p class="muted-note">Certificates coming soon.</p>';
  }
}
