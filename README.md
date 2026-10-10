# ramadhanadam.github.io

Source of my website, [ramadhanadam.github.io](https://ramadhanadam.github.io).

React and TypeScript, built with Vite, styled with Tailwind, animated with Framer Motion, and hosted
on GitHub Pages. A GitHub Action builds the site on every push to `main` and publishes it.

## Layout

- `src/data.ts`: everything the site says (interests, the five floors and their cards, the path). Edit
  the words here; the layout doesn't need to change.
- `src/pages/Home.tsx`: the home page (the greeting, the stack, how I got here, contact)
- `src/pages/Writing.tsx`: my notes and Medium articles
- `src/pages/Article.tsx`: shows one note from `public/articles/`
- `src/components/`: the top bar, the footer, the floors' drawings (`Motifs.tsx`), and small pieces (gliding links, reveal on scroll, the clock)
- `src/index.css`: colours for light and dark, fonts, and the reading style for notes
- `public/`: copied as it is: `images/`, the CVs, the notes, and `thesis/` (the thesis explainer, a
  separate page with its own styles); `write.html` opens a new note in GitHub's editor (not linked)
- `public/article.html` and `public/writing.html` send old links to the new pages

## My photo

`public/images/me.jpg` is shown in the top bar and next to the intro. To change it, replace the file
with a portrait (3:4, at least 720 x 960 pixels, a JPEG under about 300 KB). The face should sit in
the upper half: the picture is cropped from the top.

## Look

The page is built on a line of mine: I like going down the stack. My interests float around the
greeting as chips you can drag; clicking one takes you to its floor. Below is the stack itself, five
floors from ideas down to memory (Ideas, Models, Systems, Binaries, Memory), each with its own colour
and a small moving drawing taken from the work on it: a constellation, attention between Swahili
words, a window of CAN traffic, the first bytes of a Windows program, and DRAM cells flipping. Every
card shows one line, and opens to the rest. Then the path from Nairobi to Higashi-Hiroshima, and a
way to say hi.

Dark by default, light if your system asks for it, and a switch in the top bar. Satoshi for headings
and Inter for text; Geist Mono only for the bytes. Visitors who ask for reduced motion get none of the
movement.

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
