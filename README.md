# ramadhanam.github.io

Personal research site. Built with plain HTML/CSS/JS, hosted on GitHub Pages.

## Structure

```
ramadhanam.github.io/
├── index.html          ← Home + news
├── about.html
├── publications.html
├── projects.html
├── certifications.html ← Certificate index (loaded from certificates/index.json)
├── writing.html        ← Article index (loaded from articles/index.json)
├── article.html        ← Single article reader (reads .md files)
├── contact.html
├── cv.pdf              ← Add your CV here
├── css/style.css
├── js/
│   ├── main.js         ← Theme toggle, nav active state
│   └── md-render.js    ← Markdown loader + writing index builder
├── articles/
│   ├── index.json      ← Article registry — update this when adding articles
│   └── *.md            ← Article files
├── certificates/
│   ├── index.json      ← Certificate registry — update this when adding certificates
│   └── *.pdf/*.png     ← Uploaded certificate files
└── images/             ← Images for articles and site
```

## Adding an article

1. Write your article as `articles/your-slug.md` with front matter:

```markdown
---
title: "Your Title"
date: 2026-05-01
tags: [tag1, tag2]
image: optional-cover.png
---

Your content here...
```

2. Add an entry to `articles/index.json`:

```json
{
  "slug": "your-slug",
  "title": "Your Title",
  "date": "2026-05-01",
  "tags": ["tag1", "tag2"],
  "external": false
}
```

3. `git add . && git commit -m "add article: your title" && git push`

That's it. The article appears on the writing page automatically.

## Adding a Medium article (link only)

In `articles/index.json`, add:

```json
{
  "title": "Article Title",
  "date": "2026-01-01",
  "tags": ["tag"],
  "external": true,
  "url": "https://medium.com/your-article-url"
}
```

## Adding a certification

1. Put the certificate file inside `certificates/`.

Examples:

```text
certificates/google-data-analytics.pdf
certificates/aws-cloud-practitioner.png
```

2. Add an entry to `certificates/index.json`:

```json
[
  {
    "title": "Certificate Name",
    "issuer": "Issuer Name",
    "date": "2026",
    "file": "certificate-file.pdf",
    "description": "Optional short note."
  }
]
```

Use `file` for certificates uploaded into the `certificates/` folder. Use `url` instead of `file` when the certificate is hosted somewhere else:

```json
[
  {
    "title": "Certificate Name",
    "issuer": "Issuer Name",
    "date": "2026",
    "url": "https://example.com/certificate"
  }
]
```

3. Commit and push:

```bash
git add certificates/index.json certificates/certificate-file.pdf
git commit -m "Add certificate: Certificate Name"
git push
```

The certificate appears automatically on `certifications.html`.

## Deployment

Hosted on GitHub Pages. Push to `main` → live in ~30 seconds.

To enable: GitHub repo → Settings → Pages → Source: Deploy from branch → `main` / `/ (root)`.
