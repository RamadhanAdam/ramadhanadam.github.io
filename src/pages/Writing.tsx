import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { medium, links } from "../data";
import { fetchNotes, niceDate, type Note } from "../lib/notes";
import { Arrow, Reveal, RiseWords } from "../components/ui";

export default function Writing() {
  const [notes, setNotes] = useState<Note[] | null>(null);
  useEffect(() => {
    document.title = "Writing | Ramadhan Adam Zome";
    fetchNotes().then(setNotes).catch(() => setNotes([]));
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
        <span className="text-accent">✎</span> / writing
      </p>
      <h1 className="display mt-4 text-5xl font-extrabold sm:text-6xl">
        <RiseWords text="Things I've written" />
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted">Notes I keep here, and the longer pieces I publish on Medium: PE files, GPU memory, transformers.</p>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Notes</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {notes === null && <li className="py-5 text-muted">Loading…</li>}
          {notes?.length === 0 && <li className="py-5 text-muted">No notes yet.</li>}
          {notes?.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.05}>
              <li>
                <Link to={`/writing/${n.slug}`} className="group block py-6">
                  <span className="font-mono text-xs text-faint">
                    {niceDate(n.date)} · {n.category}
                  </span>
                  <span className="display mt-1.5 block text-xl font-bold transition group-hover:text-accent">{n.title}</span>
                  {n.summary && <span className="mt-2 block text-muted">{n.summary}</span>}
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">On Medium</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {medium.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.04}>
              <li>
                <a href={m.href} target="_blank" rel="noreferrer" className="group grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-4 py-5 sm:grid-cols-[8rem_1fr_auto]">
                  <span className="font-mono text-xs text-faint">{niceDate(m.date)}</span>
                  <span className="font-display text-lg font-semibold transition group-hover:text-accent">{m.title}</span>
                  <Arrow className="text-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
        <a href={links.medium} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          All of them on Medium <Arrow />
        </a>
      </section>
    </main>
  );
}
