# ramadhanadam.github.io

Source of my website, [ramadhanadam.github.io](https://ramadhanadam.github.io).

Plain HTML, CSS and JavaScript, hosted on GitHub Pages. There is no build step and no
dependency: whatever is on `main` is what's online.

## Layout

- `index.html`: the home page (intro, thesis, projects, experience, writing, a bit more, contact)
- `writing.html`: my notes and Medium articles
- `article.html`: shows one note from `articles/`
- `write.html`: opens a new note in GitHub's editor (not linked from the site)
- `thesis/`: the thesis explainer, a separate page with its own styles
- `articles/`: the notes, in Markdown
- `css/style.css`: the whole design (colours, type, layout, light and dark)
- `js/main.js`: theme, top bar, scroll progress, reveal on scroll, the photo, the clock
- `js/md-render.js`: loads the notes and renders one as an article
- `images/me.jpg`: my photo (top bar and the home page); `images/projects/`: screenshots of my work
- `cv_research.pdf`, `cv_industry.pdf`

## My photo

`images/me.jpg` is shown in the top bar of every page and next to the intro. To change it, replace
the file with a portrait (3:4, at least 720 x 960 pixels, a JPEG under about 300 KB). The face
should sit in the upper half: the picture is cropped from the top. If the file is missing, a plain
"R" is shown instead.

## Look

Colours come from the photo: sand for the page, olive for links and the accent, dark brown for text,
a little terracotta for the underline. The dark theme is the same colours turned down. They are the
variables at the top of `css/style.css`. Fonts are Fraunces for headings and Source Sans 3 for
text, loaded from Google Fonts. The things that move are small: the underline under my name draws
itself, sections rise into place as you scroll, the photo leans a little toward the pointer, and the
top bar follows where you are. Visitors who ask for reduced motion get none of it.

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
