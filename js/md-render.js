/**
 * Article loader and writing index for the notes kept in articles/*.md.
 * Depends on marked.js (loaded from a CDN in article.html).
 */

function parseFrontMatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  match[1].split("\n").forEach(line => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) meta[key.trim()] = rest.join(":").trim().replace(/^"|"$/g, "");
  });
  return { meta, body: match[2] };
}

async function loadArticle() {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const body = document.getElementById("article-body");
  if (!slug || !/^[a-z0-9-]+$/i.test(slug)) { body.innerHTML = "<p>Article not found.</p>"; return; }
  try {
    const res = await fetch(`articles/${slug}.md`);
    if (!res.ok) throw new Error("Not found");
    const { meta, body: text } = parseFrontMatter(await res.text());
    document.title = `${meta.title || "Article"} | Ramadhan Adam Zome`;
    document.getElementById("article-title").textContent = meta.title || "";
    const parts = [meta.date, meta.category].filter(Boolean);
    document.getElementById("article-meta").textContent = parts.join(" · ");
    if (meta.image && /^[\w.-]+$/.test(meta.image)) {
      const img = document.createElement("img");
      img.src = `images/${meta.image}`;
      img.alt = meta.title || "";
      document.getElementById("article-image").appendChild(img);
    }
    body.innerHTML = marked.parse(text);
  } catch (e) {
    body.innerHTML = "<p>Could not load this article.</p>";
  }
}

async function loadWritingIndex() {
  const list = document.getElementById("notes-list");
  if (!list) return;
  try {
    const res = await fetch("articles/index.json");
    if (!res.ok) throw new Error("Index not found");
    const items = (await res.json()).filter(a => !a.external)
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));
    list.innerHTML = "";
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    items.forEach(a => {
      const li = document.createElement("li");
      const d = document.createElement("span");
      d.className = "d";
      const m = String(a.date || "").match(/^(\d{4})-(\d{2})/);
      d.textContent = m ? `${months[Number(m[2]) - 1]} ${m[1]}` : (a.date || "");
      const body = document.createElement("span");
      const title = document.createElement("a");
      title.href = `article.html?slug=${encodeURIComponent(a.slug)}`;
      title.textContent = a.title;
      body.appendChild(title);
      if (a.summary) {
        const s = document.createElement("span");
        s.className = "summary";
        s.textContent = a.summary;
        body.appendChild(s);
      }
      li.appendChild(d);
      li.appendChild(body);
      list.appendChild(li);
    });
    if (!items.length) list.innerHTML = "<li>No notes yet.</li>";
  } catch (e) {
    list.innerHTML = "<li>Could not load the notes.</li>";
  }
}
