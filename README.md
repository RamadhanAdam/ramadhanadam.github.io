# ramadhanadam.github.io

Personal research site of Ramadhan Adam Zome. Plain HTML, CSS and a little JavaScript, hosted on GitHub Pages.

## Structure

```
ramadhanadam.github.io/
├── index.html          Home: about, news, research, talks, projects, writing, contact
├── writing.html        Medium articles and the reading notes kept in articles/
├── article.html        Reader for one note (renders articles/<slug>.md)
├── about.html, publications.html, projects.html, contact.html, certifications.html
│                       Redirects to sections of the home page, so old links keep working
├── cv_research.pdf     Research CV (cv.pdf is the same file, for old links)
├── cv_industry.pdf     One-page resume
├── css/style.css       The only stylesheet: EB Garamond and IBM Plex Mono, light and dark
├── js/main.js          Theme toggle, footer year
├── js/md-render.js     Note loader and notes index
├── articles/           Notes as Markdown with front matter; index.json is generated
```

## Updating the CVs

The CV sources live outside this repository (`~/Documents/Applications/CV_2026`). Build them with
`pdflatex cv_research.tex` and `pdflatex cv_industry.tex`, then copy the PDFs here (and `cv_research.pdf` to `cv.pdf`).

## Adding news or a project

Edit the `News` or `Projects` list in `index.html`; each entry is one `<li>`.

## Adding an article

1. Write your article as `articles/your-slug.md` with front matter:

```markdown
---
title: "Your Title"
date: 2026-05-01
category: research notes
tags: [tag1, tag2]
summary: A one-sentence description for the writing index.
featured: false
image: optional-cover.png
---

Your content here...
```

2. Regenerate the article index:

```bash
python build_index.py
```

3. `git add . && git commit -m "add article: your title" && git push`

That's it. The article appears on the writing page automatically.

## Medium articles

Medium articles are not copied into `articles/index.json`. The writing page links to the Medium profile directly.

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
