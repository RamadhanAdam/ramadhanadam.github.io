/**
 * Lightweight markdown renderer + article loader.
 * Depends on: marked.js (loaded via CDN in article.html)
 */

/* ─── Parse front matter ─────────────────────────────────── */
function parseFrontMatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) meta[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '');
  });

  return { meta, body: match[2] };
}

/* ─── Load and render a single article ──────────────────── */
async function loadArticle() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (!slug) { document.getElementById('article-content').innerHTML = '<p>Article not found.</p>'; return; }

  try {
    const res = await fetch(`articles/${slug}.md`);
    if (!res.ok) throw new Error('Not found');
    const raw = await res.text();
    const { meta, body } = parseFrontMatter(raw);

    // Header
    document.title = `${meta.title || 'Article'} — Ramadhan Adam`;
    document.getElementById('article-title').textContent = meta.title || '';
    document.getElementById('article-date').textContent = meta.date || '';
    document.getElementById('article-tags').textContent = meta.tags ? meta.tags.replace(/[\[\]]/g, '') : '';

    // Cover image
    if (meta.image) {
      const img = document.createElement('img');
      img.src = `images/${meta.image}`;
      img.alt = meta.title || '';
      img.style.cssText = 'max-width:100%;margin-bottom:1.5rem;border:1px solid var(--border)';
      document.getElementById('article-image').appendChild(img);
    }

    // Body — rendered via marked
    document.getElementById('article-body').innerHTML = marked.parse(body);

  } catch (e) {
    document.getElementById('article-content').innerHTML = '<p>Could not load article.</p>';
  }
}

/* ─── Build the writing index page ──────────────────────── */
async function loadWritingIndex() {
  const container = document.getElementById('writing-list');
  if (!container) return;

  try {
    const res = await fetch('articles/index.json');
    const articles = await res.json();

    // Sort newest first
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    const ul = document.createElement('ul');
    ul.className = 'article-list';

    articles.forEach(a => {
      const li = document.createElement('li');
      li.className = 'article-item';

      const date = document.createElement('span');
      date.className = 'article-date';
      date.textContent = a.date;

      const title = document.createElement('a');
      title.className = 'article-title';
      // External (Medium) vs internal
      if (a.external) {
        title.href = a.url;
        title.target = '_blank';
        title.rel = 'noopener';
      } else {
        title.href = `article.html?slug=${a.slug}`;
      }
      title.textContent = a.title;

      const source = document.createElement('span');
      source.className = 'article-source';
      source.textContent = a.external ? 'medium ↗' : 'site';

      li.appendChild(date);
      li.appendChild(title);
      li.appendChild(source);
      ul.appendChild(li);
    });

    container.appendChild(ul);
  } catch (e) {
    container.innerHTML = '<p>Could not load articles.</p>';
  }
}