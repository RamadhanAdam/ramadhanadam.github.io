# ramadhanadam.github.io

My website: **[ramadhanadam.github.io](https://ramadhanadam.github.io)**

I'm Ramadhan Adam Zome, a master's student in AI and Machine Learning at PAUSTI (Nairobi) and a
special research student at Hiroshima University until January 2027. I work on machine learning,
security and low-level systems: malware detection on raw program bytes, federated intrusion
detection for vehicles, and the security of the hardware AI runs on.

The site is plain HTML and CSS with a little JavaScript, served by GitHub Pages. Anything pushed to
`main` is live about a minute later.

## Writing a note

Go to [ramadhanadam.github.io/write.html](https://ramadhanadam.github.io/write.html) (not linked from
the site). "Start a new note" opens GitHub's editor in `articles/` with this header filled in:

```markdown
---
title: "Title"
date: 2026-10-03
category: notes
summary: One sentence for the writing page.
---

The note, in Markdown.
```

Give the file a short name of letters, numbers and hyphens (it becomes the address,
`article.html?slug=<name>`), write, and commit. A GitHub Action
(`.github/workflows/build-index.yml`) rebuilds `articles/index.json`, and the note appears on the
writing page. The same page links to every existing note for editing. Pictures go in `images/` and
are used as `![what it shows](images/name.png)`.

From a laptop it's the same thing: add `articles/<name>.md`, commit, push.

## What's here

```
index.html          home: intro, news, research, projects, recent writing, scholarships
writing.html        my notes (from articles/) and the list of Medium articles
article.html        shows one note
write.html          my page for writing and editing notes
404.html            sends old links (about.html, cv.pdf, ...) to the right place
cv_research.pdf     research CV
cv_industry.pdf     one-page résumé
css/style.css       the only stylesheet: EB Garamond and IBM Plex Mono, light and dark
js/main.js          theme toggle
js/md-render.js     loads and renders the notes
articles/           notes in Markdown; index.json is built by the Action
.github/            the Action and the script it runs (scripts/build_index.py)
```

## Keeping it up to date

- **News, projects, research:** edit the lists in `index.html`. Each entry is one `<li>`.
- **A new Medium article:** add a line at the top of the list in `writing.html`, and swap it into
  "Writing" on `index.html` if it should be one of the three shown there.
- **CVs:** the LaTeX sources are in `~/Documents/Applications/CV_2026`. Build with
  `pdflatex cv_research.tex` and `pdflatex cv_industry.tex`, copy the two PDFs here, commit.
- **The picture at the top:** the hex dump is the first 32 bytes of a Windows executable. To use a
  photo instead, put it in `images/` and follow the comment above it in `index.html`.
