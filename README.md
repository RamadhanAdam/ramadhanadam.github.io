# ramadhanadam.github.io

Source of my website, [ramadhanadam.github.io](https://ramadhanadam.github.io).

React and TypeScript, built with Vite, styled with Tailwind, animated with Framer Motion, and hosted
on GitHub Pages. A GitHub Action builds the site on every push to `main` and publishes it.

## Layout

- `src/data.ts`: everything the site says (intro, work, projects, experience, writing, skills). Edit
  the words here; the layout doesn't need to change.
- `src/pages/Home.tsx`: the home page (intro, facts, work, projects, experience, writing, a bit more, contact)
- `src/pages/Writing.tsx`: my notes and Medium articles
- `src/pages/Article.tsx`: shows one note from `public/articles/`
- `src/components/`: the top bar, the footer, and small pieces (gliding links, reveal on scroll, the clock)
- `src/index.css`: colours for light and dark, fonts, and the reading style for notes
- `public/`: copied as it is: `images/`, the CVs, the notes, and `thesis/` (the thesis explainer, a
  separate page with its own styles); `write.html` opens a new note in GitHub's editor (not linked)
- `public/article.html` and `public/writing.html` send old links to the new pages

## My photo

`public/images/me.jpg` is shown in the top bar and next to the intro. To change it, replace the file
with a portrait (3:4, at least 720 x 960 pixels, a JPEG under about 300 KB). The face should sit in
the upper half: the picture is cropped from the top.

## Look

Dark by default, light if your system asks for it, and a switch in the top bar. Green for the accent,
a nod to home. Plus Jakarta Sans for headings, Inter for text and JetBrains Mono for the small labels,
from Google Fonts. The things that move: the greeting rises word by word, the line under it cycles
through what I build, links glide to a green copy of themselves on hover, sections rise into place as
you scroll, the numbers count up, and the project filter rearranges the cards. Visitors who ask for
reduced motion get none of it.

## Notes

A note is a Markdown file in `public/articles/` that starts with a short header:

```markdown
---
title: "Title"
date: 2026-10-03
summary: One line for the writing page.
---
```

A GitHub Action rebuilds `public/articles/index.json` on every push, so a new note shows up on the
writing page by itself.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173. `npm run build` writes the site to `dist/`.

## Publishing

The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`. It needs
one setting, once: Settings, Pages, Build and deployment, Source: GitHub Actions.
