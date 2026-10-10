import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import { motion } from "framer-motion";
import { niceDate, parseFrontMatter } from "../lib/notes";
import { ease } from "../components/ui";

type State = { status: "loading" } | { status: "missing" } | { status: "ok"; meta: Record<string, string>; html: string };

export default function Article() {
  const { slug = "" } = useParams();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!/^[a-z0-9-]+$/i.test(slug)) {
      setState({ status: "missing" });
      return;
    }
    let live = true;
    fetch(`/articles/${slug}.md`)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error("missing"))))
      .then(async (raw) => {
        // The notes are my own files in this repository, rendered as written.
        const { meta, body } = parseFrontMatter(raw);
        // A note usually opens with its own "# Title", which the page already shows.
        const html = await marked.parse(body.replace(/^\s*#\s+[^\n]*\n/, ""));
        if (live) {
          setState({ status: "ok", meta, html });
          document.title = `${meta.title || "Note"} | Ramadhan Adam Zome`;
        }
      })
      .catch(() => live && setState({ status: "missing" }));
    return () => {
      live = false;
    };
  }, [slug]);

  return (
    <main className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
      <Link to="/writing" className="font-display text-sm font-bold text-muted hover:text-accent">
        ← all writing
      </Link>
      {state.status === "loading" && <p className="mt-10 text-muted">Loading…</p>}
      {state.status === "missing" && <p className="mt-10 text-muted">I couldn't find that note.</p>}
      {state.status === "ok" && (
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <p className="mt-10 text-sm text-faint">
            {[state.meta.date && niceDate(state.meta.date), state.meta.category].filter(Boolean).join(" · ")}
          </p>
          <h1 className="display mt-3 text-4xl font-black sm:text-6xl">{state.meta.title}</h1>
          {state.meta.image && /^[\w.-]+$/.test(state.meta.image) && (
            <img src={`/images/${state.meta.image}`} alt={state.meta.title || ""} className="mt-8 rounded-2xl border border-line" />
          )}
          <div className="prose-note mt-10" dangerouslySetInnerHTML={{ __html: state.html }} />
        </motion.article>
      )}
    </main>
  );
}
