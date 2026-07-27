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
    container.innerHTML = '';
    const res = await fetch('articles/index.json');
    if (!res.ok) throw new Error('Article index not found');
    const articles = (await res.json()).filter(a => !a.external);
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (!articles.length) {
      container.innerHTML = '<p class="muted-note">Site essays coming soon.</p>';
      container.appendChild(buildMediumCallout());
      return;
    }

    const featured = articles.find(a => a.featured) || articles[0];
    container.appendChild(buildFeaturedArticle(featured));
    const articleList = articles.filter(article => article !== featured);

    // Collect unique tags
    const tagSet = new Set();
    articles.forEach(a => {
      if (Array.isArray(a.tags)) a.tags.forEach(t => tagSet.add(t));
    });
    const tags = ['all', ...Array.from(tagSet).sort()];

    // Filter bar
    const filterBar = document.createElement('div');
    filterBar.className = 'tag-filter';
    tags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'tag-btn' + (tag === 'all' ? ' active' : '');
      btn.textContent = tag;
      btn.dataset.tag = tag;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const selected = btn.dataset.tag;
        document.querySelectorAll('.writing-entry').forEach(entry => {
          const entryTags = entry.dataset.tags ? entry.dataset.tags.split(',') : [];
          entry.style.display = (selected === 'all' || entryTags.includes(selected)) ? '' : 'none';
        });
      });
      filterBar.appendChild(btn);
    });
    container.appendChild(filterBar);

    if (articleList.length) {
      const h2 = document.createElement('h2');
      h2.className = 'writing-section-heading';
      h2.textContent = 'More essays on this site';
      container.appendChild(h2);
      container.appendChild(buildArticleList(articleList));
    }
    container.appendChild(buildMediumCallout());

  } catch (e) {
    container.innerHTML = '<p>Could not load articles.</p>';
  }
}

function buildFeaturedArticle(article) {
  const section = document.createElement('section');
  section.className = 'featured-article writing-entry';
  section.dataset.tags = Array.isArray(article.tags) ? article.tags.join(',') : '';

  const label = document.createElement('div');
  label.className = 'article-kicker';
  label.textContent = 'Featured essay';

  const title = document.createElement('a');
  title.className = 'featured-title';
  title.href = `article.html?slug=${article.slug}`;
  title.textContent = article.title;

  const meta = document.createElement('div');
  meta.className = 'article-card-meta';
  meta.textContent = [article.date, article.category].filter(Boolean).join(' · ');

  const summary = document.createElement('p');
  summary.className = 'article-summary';
  summary.textContent = article.summary || '';

  section.appendChild(label);
  section.appendChild(title);
  section.appendChild(meta);
  if (article.summary) section.appendChild(summary);
  section.appendChild(buildTagRow(article.tags));

  return section;
}

function buildArticleList(items) {
  const ul = document.createElement('ul');
  ul.className = 'article-list article-list-detailed';

  items.forEach(article => {
    const li = document.createElement('li');
    li.className = 'article-item writing-entry';
    li.dataset.tags = Array.isArray(article.tags) ? article.tags.join(',') : '';

    const meta = document.createElement('div');
    meta.className = 'article-card-meta';
    meta.textContent = [article.date, article.category].filter(Boolean).join(' · ');

    const title = document.createElement('a');
    title.className = 'article-title';
    title.href = `article.html?slug=${article.slug}`;
    title.textContent = article.title;

    li.appendChild(meta);
    li.appendChild(title);

    if (article.summary) {
      const summary = document.createElement('p');
      summary.className = 'article-summary';
      summary.textContent = article.summary;
      li.appendChild(summary);
    }

    li.appendChild(buildTagRow(article.tags));
    ul.appendChild(li);
  });

  return ul;
}

function buildTagRow(tags) {
  const row = document.createElement('div');
  row.className = 'article-tags';
  if (!Array.isArray(tags)) return row;

  tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    row.appendChild(span);
  });

  return row;
}

function buildMediumCallout() {
  const section = document.createElement('section');
  section.className = 'medium-callout';

  const h2 = document.createElement('h2');
  h2.className = 'writing-section-heading';
  h2.textContent = 'On Medium';

  const p = document.createElement('p');
  p.textContent = 'I also publish shorter notes, malware-analysis writeups, and AI from first-principles essays on Medium.';

  const link = document.createElement('a');
  link.className = 'medium-link';
  link.href = 'https://medium.com/@ramadhanzome4';
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = 'Read my Medium articles ↗';

  section.appendChild(h2);
  section.appendChild(p);
  section.appendChild(link);
  return section;
}
