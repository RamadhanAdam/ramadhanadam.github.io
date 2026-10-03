# ramadhanadam.github.io

Source of my website, [ramadhanadam.github.io](https://ramadhanadam.github.io).

Plain HTML and CSS with a little JavaScript, hosted on GitHub Pages. There is no build step:
whatever is on `main` is what's online.

## Layout

- `index.html`: the home page
- `writing.html`: my notes and Medium articles
- `article.html`: shows one note from `articles/`
- `write.html`: opens a new note in GitHub's editor
- `articles/`: the notes, in Markdown
- `css/`, `js/`: styles, the light/dark toggle, note rendering
- `cv_research.pdf`, `cv_industry.pdf`

## Notes

A note is a Markdown file in `articles/` that starts with a short header:

```markdown
---
title: "Title"
date: 2026-10-03
summary: One line for the writing page.
---
```

A GitHub Action rebuilds `articles/index.json` on every push, so a new note shows up on the
writing page by itself.

## Running it locally

```bash
python3 -m http.server
```

Then open http://localhost:8000.
