import { forwardRef, useEffect, useRef, useState, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { experience, facts, honours, intro, links, medium, more, projects, rotating, skills, work, type Project } from "../data";
import { fetchNotes, niceDate, type Note } from "../lib/notes";
import { Arrow, CountUp, Glide, JstClock, Reveal, RiseWords, SectionHead, ease } from "../components/ui";

export default function Home() {
  return (
    <main>
      <Hero />
      <Facts />
      <WorkSection />
      <Projects />
      <Experience />
      <Writing />
      <More />
      <Contact />
    </main>
  );
}

/* ------------------------------------------------------------------ hero */

function Rotator() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((k) => (k + 1) % rotating.length), 2800);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <span className="relative block h-[1.3em] overflow-hidden" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          className="absolute left-0 top-0 whitespace-nowrap text-accent max-sm:whitespace-normal"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease }}
        >
          {rotating[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <section ref={ref} onPointerMove={onMove} className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <div className="spotlight absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-mono text-xs uppercase tracking-[0.18em] text-faint"
          >
            Machine learning for security <span className="text-accent">·</span> Nairobi and Hiroshima
          </motion.p>

          <h1 className="display mt-5 text-5xl font-extrabold sm:text-6xl lg:text-7xl">
            <RiseWords text="Hi, I'm Ramadhan." delay={0.1} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="display mt-5 text-2xl font-semibold text-muted sm:text-3xl"
          >
            I build machine learning that
            <Rotator />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
            className="mt-7 max-w-xl space-y-4 text-[1.05rem] leading-relaxed text-muted"
          >
            {intro.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.85 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition hover:brightness-110">
              What I'm working on
              <span className="transition group-hover:translate-y-0.5">↓</span>
            </a>
            <a href={links.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition hover:border-accent">
              My CV <Arrow />
            </a>
            <div className="ml-1 flex items-center gap-5 text-sm text-muted">
              <Glide href={links.github} className="hover:text-ink">GitHub</Glide>
              <Glide href={links.huggingface} className="hover:text-ink">Hugging Face</Glide>
              <Glide href={links.medium} className="hover:text-ink">Medium</Glide>
            </div>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="group relative overflow-hidden rounded-[2rem] border border-line bg-surface">
            <img
              src="/images/me.jpg"
              alt="Ramadhan Adam Zome"
              className="aspect-[3/4] w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <motion.figcaption
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.1 }}
            className="absolute -bottom-5 -left-3 rounded-2xl border border-line bg-surface/90 px-4 py-3 text-sm shadow-xl backdrop-blur sm:-left-8"
          >
            <span className="flex items-center gap-2 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Higashi-Hiroshima, <JstClock /> JST
            </span>
            <span className="mt-1 block text-xs text-faint">On exchange until January 2027</span>
          </motion.figcaption>
          <motion.a
            href={links.talk}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.25 }}
            className="absolute -right-3 top-6 rounded-2xl border border-line bg-surface/90 px-4 py-3 text-sm shadow-xl backdrop-blur transition hover:border-accent sm:-right-8"
          >
            <span className="block font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">Next up</span>
            <span className="font-medium">Talk in Hiroshima, 17 Oct</span>
          </motion.a>
        </motion.figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ facts */

function Facts() {
  return (
    <section className="border-y border-line bg-surface/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 py-10 sm:px-8 lg:grid-cols-4">
        {facts.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.08} className="pr-6">
            <p className="display text-3xl font-bold sm:text-4xl">
              {f.text ?? <CountUp to={f.value ?? 0} decimals={f.decimals} suffix={f.suffix} />}
            </p>
            <p className="mt-2 max-w-[16rem] text-sm leading-snug text-muted">{f.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ work */

function WorkSection() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHead n="01" label="work" title="What I work on" aside={<p className="text-sm text-muted">My thesis, and one project on the side.</p>} />
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        {work.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.1}>
            <article className="h-full rounded-3xl border border-line bg-surface p-7 transition hover:border-accent/60 sm:p-9">
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {w.tag}
              </span>
              <h3 className="display mt-5 text-2xl font-bold sm:text-[1.7rem]">{w.title}</h3>
              {w.subtitle && <p className="mt-2 text-sm italic text-faint">{w.subtitle}</p>}
              <div className="mt-5 space-y-4 leading-relaxed text-muted">
                {w.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              {w.footnote && <p className="mt-6 border-t border-line pt-5 text-sm text-faint">{w.footnote}</p>}
              {w.link && (
                <a href={w.link.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  {w.link.label} <Arrow />
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ projects */

const KINDS = ["All", "ML", "Security", "Systems"] as const;

const ProjectCard = forwardRef<HTMLElement, { p: Project }>(function ProjectCard({ p }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease }}
      className={`group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/60 ${
        p.image ? "sm:col-span-2 md:flex-row lg:col-span-3" : ""
      }`}
    >
      {p.image && (
        <div className="overflow-hidden border-b border-line md:w-[52%] md:shrink-0 md:border-r md:border-b-0">
          <img src={p.image} alt={`${p.title} screenshot`} className="h-full min-h-56 w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]" />
        </div>
      )}
      <div className={`flex flex-1 flex-col p-6 ${p.image ? "md:justify-center md:p-9" : ""}`}>
        {p.image && <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">Featured · live demo</p>}
        <div className="flex items-center justify-between gap-3">
          <h3 className="display text-xl font-bold">{p.title}</h3>
          <span className="rounded-full bg-surface-2 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">{p.kind}</span>
        </div>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{p.blurb}</p>
        <p className="mt-4 font-mono text-xs text-faint">{p.stack}</p>
        <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
              {l.label} <Arrow />
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
});

function Projects() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("All");
  const shown = projects.filter((p) => kind === "All" || p.kind === kind);
  return (
    <section id="projects" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHead
          n="02"
          label="projects"
          title="Things I've built"
          aside={
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
              {KINDS.map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={kind === k}
                  onClick={() => setKind(k)}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition ${kind === k ? "text-accent-ink" : "text-muted hover:text-ink"}`}
                >
                  {kind === k && <motion.span layoutId="chip" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ duration: 0.4, ease }} />}
                  <span className="relative">{k}</span>
                </button>
              ))}
            </div>
          }
        />
        <p className="-mt-6 mb-8 text-sm text-muted">Mostly to understand something.</p>
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ experience */

function Experience() {
  return (
    <section id="experience" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHead n="03" label="experience" title="Where I've been" aside={<p className="text-sm text-muted">Work and study, newest first.</p>} />
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          {experience.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.1}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{g.group}</p>
              <ol className="mt-5 space-y-8 border-l border-line pl-6">
                {g.roles.map((r) => (
                  <li key={r.title} className="relative">
                    <span className="absolute -left-[1.83rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent" />
                    <p className="font-mono text-xs text-faint">{r.when}</p>
                    <h3 className="display mt-1.5 text-lg font-bold leading-snug">{r.title}</h3>
                    <p className="text-sm text-muted">{r.org}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{r.body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ writing */

type Item = { date: string; title: string; href: string; where: "Medium" | "Note"; internal: boolean };

function Writing() {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    fetchNotes().then(setNotes).catch(() => setNotes([]));
  }, []);
  const items: Item[] = [
    ...medium.slice(0, 4).map((m) => ({ ...m, where: "Medium" as const, internal: false })),
    ...notes.slice(0, 2).map((n) => ({ date: n.date, title: n.title, href: `/writing/${n.slug}`, where: "Note" as const, internal: true })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section id="writing" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHead
          n="04"
          label="writing"
          title="Things I've written"
          aside={
            <Link to="/writing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              Everything I've written <Arrow />
            </Link>
          }
        />
        <p className="-mt-6 mb-6 text-sm text-muted">About PE files, GPU memory and transformers.</p>
        <ul className="divide-y divide-line border-y border-line">
          {items.map((it, i) => (
            <Reveal key={it.href + it.title} delay={i * 0.05}>
              <li>
                {it.internal ? (
                  <Link to={it.href} className="group grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-4 py-5 sm:grid-cols-[8rem_1fr_auto]">
                    <WritingRow it={it} />
                  </Link>
                ) : (
                  <a href={it.href} target="_blank" rel="noreferrer" className="group grid grid-cols-[6.5rem_1fr_auto] items-baseline gap-4 py-5 sm:grid-cols-[8rem_1fr_auto]">
                    <WritingRow it={it} />
                  </a>
                )}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WritingRow({ it }: { it: Item }) {
  return (
    <>
      <span className="font-mono text-xs text-faint">{niceDate(it.date)}</span>
      <span className="font-display text-lg font-semibold transition group-hover:text-accent">{it.title}</span>
      <span className="hidden items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-faint sm:inline-flex">
        {it.where} <Arrow className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </>
  );
}

/* ------------------------------------------------------------------ more */

function More() {
  return (
    <section className="border-t border-line bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHead n="05" label="more" title="A bit more" />
          <Reveal>
            <p className="-mt-4 text-lg leading-relaxed text-muted">{more}</p>
            <ul className="mt-8 space-y-3 text-sm text-muted">
              {honours.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sand" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="space-y-7 lg:pt-20">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.06}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">{g.group}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="rounded-full border border-line bg-surface px-3 py-1 text-sm transition hover:border-accent hover:text-accent">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ contact */

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };
  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-line">
      <div className="dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_100%,black,transparent)]" />
      <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
          <span className="text-accent">06</span> / contact
        </p>
        <Reveal>
          <h2 className="display mt-4 text-5xl font-extrabold sm:text-7xl">Say hi.</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-4">
          <a href={`mailto:${links.email}`} className="display text-2xl font-semibold underline decoration-line decoration-2 underline-offset-8 transition hover:decoration-accent sm:text-3xl">
            {links.email}
          </a>
          <button type="button" onClick={copy} className="rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-accent">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copied ? "y" : "n"} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.25 }} className="block">
                {copied ? "Copied" : "Copy"}
              </motion.span>
            </AnimatePresence>
          </button>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-muted">
            Or {links.emailHiroshima} while I'm at Hiroshima University. I'm in Higashi-Hiroshima until January 2027, then back in Nairobi.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted">
            <Glide href={links.github} className="hover:text-ink">GitHub</Glide>
            <Glide href={links.huggingface} className="hover:text-ink">Hugging Face</Glide>
            <Glide href={links.medium} className="hover:text-ink">Medium</Glide>
            <Glide href={links.cv} className="hover:text-ink">CV (research)</Glide>
            <Glide href={links.cvIndustry} className="hover:text-ink">CV (industry)</Glide>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
