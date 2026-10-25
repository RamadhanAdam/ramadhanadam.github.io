import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import { LuFileText } from "react-icons/lu";
import { FaMediumM } from "react-icons/fa";
import { SiGithub, SiHuggingface } from "react-icons/si";
import { about, certificates, greetings, intro, links, path, projects, research, rightNow, role, skills, socials, writing, type Project, type Research, type Shot, type Stop } from "../data";
import { gsap, reducedMotion, scrollToTarget, useReveals } from "../lib/motion";
import { Magnetic, scramble } from "../components/fx";
import { Arrow } from "../components/ui";

const NetworkScene = lazy(() => import("../components/NetworkScene"));

export default function Home() {
  const root = useRef<HTMLElement>(null);
  useReveals(root);
  return (
    <main ref={root}>
      <Hero />
      <About />
      <ResearchSection />
      <Path />
      <Skills />
      <Projects />
      <Writing />
      <Contact />
    </main>
  );
}

function Heading({ n, title, aside }: { n: string; title: string; aside?: React.ReactNode }) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="serif text-2xl text-accent sm:text-3xl" data-rise>
          ({n})
        </p>
        <h2 data-split className="display mt-1 text-5xl font-black sm:text-7xl lg:text-8xl">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}

/* ================================================================== hero */

function Greeting() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (reducedMotion()) return;
    let i = 0;
    let stop = () => {};
    const id = setInterval(() => {
      i = (i + 1) % greetings.length;
      if (ref.current) stop = scramble(ref.current, greetings[i], 650);
    }, 2600);
    return () => {
      clearInterval(id);
      stop();
    };
  }, []);
  return (
    <span ref={ref} className="serif font-normal text-accent">
      {greetings[0]}
    </span>
  );
}

function Hero() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion() || !box.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", { yPercent: 115, duration: 1.3, ease: "expo.out", stagger: 0.08, delay: 0.15 });
      gsap.from(".hero-fade", { opacity: 0, y: 24, duration: 1.1, ease: "expo.out", stagger: 0.1, delay: 0.6 });
    }, box);
    return () => ctx.revert();
  }, []);
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <Suspense fallback={null}>
        <NetworkScene className="absolute inset-y-0 right-[-10%] -z-10 w-[85%] opacity-90 max-lg:inset-x-0 max-lg:right-0 max-lg:w-full max-lg:opacity-40" />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_20%_60%,var(--bg)_30%,transparent)]" />
      <div ref={box} className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-24 sm:px-8">
        <p className="hero-fade font-display text-base font-medium text-muted">{role}</p>
        <h1 className="display mt-6 text-[3.6rem] font-black sm:text-8xl lg:text-[8.5rem]">
          <span className="block overflow-hidden pb-2">
            <span className="hero-word inline-block">
              <Greeting />,
            </span>
          </span>
          <span className="block overflow-hidden pb-3">
            {["I'm", "Ramadhan."].map((w) => (
              <span key={w} className="hero-word mr-[0.22em] inline-block">
                {w}
              </span>
            ))}
          </span>
        </h1>
        <p className="hero-fade mt-8 max-w-xl text-xl leading-relaxed text-muted">{intro}</p>
        <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollToTarget("#research")}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm font-bold text-accent-ink transition hover:brightness-110"
            >
              See my research <span>↓</span>
            </button>
          </Magnetic>
          <Magnetic>
            <a href={links.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-7 py-3.5 font-display text-sm font-bold backdrop-blur transition hover:border-accent">
              CV <Arrow />
            </a>
          </Magnetic>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-faint sm:flex">
        <span>Scroll</span>
        <span className="scroll-cue block h-10 w-px bg-faint" />
      </div>
    </section>
  );
}

/* ================================================================== about */

function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-32 sm:px-8">
      <Heading n="01" title="About" />
      <div className="grid gap-16 lg:grid-cols-[1.35fr_0.65fr] lg:gap-24">
        <div>
          <p data-split className="text-3xl leading-snug text-ink sm:text-4xl">
            {about[0]}
          </p>
          {about.slice(1).map((t) => (
            <p key={t} data-split className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              {t}
            </p>
          ))}
        </div>
        <div className="lg:pt-3">
          <p className="serif text-2xl text-accent" data-rise>
            Right now
          </p>
          <div data-line className="mt-4 h-px bg-line" />
          <dl>
            {rightNow.map((o, k) => (
              <div key={o.label} data-rise={k * 0.06} className="border-b border-line py-5">
                <dt className="text-sm text-faint">{o.label}</dt>
                <dd className="mt-1 font-display text-lg font-bold leading-snug">{o.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== research */

function ResearchCard({ r }: { r: Research }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-surface p-8 transition-colors duration-500 hover:border-accent/50 sm:p-10">
      <span className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl transition duration-700 group-hover:scale-150 group-hover:bg-accent/20" />
      <span className="relative inline-flex w-fit items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        {r.tag}
      </span>
      <h3 className="display relative mt-8 text-3xl font-black sm:text-4xl">{r.title}</h3>
      <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-10">
        {r.areas.map((a) => (
          <span key={a} className="rounded-full bg-surface-2 px-3 py-1 text-sm text-muted">
            {a}
          </span>
        ))}
        {r.links?.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1.5 font-display text-sm font-bold text-accent">
            {l.label} <Arrow />
          </a>
        ))}
      </div>
    </div>
  );
}

function ResearchSection() {
  return (
    <section id="research" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-32 sm:px-8">
        <Heading n="02" title="Research" />
        <div className="grid gap-6 lg:grid-cols-2">
          {research.map((r, k) => (
            <div key={r.title} data-rise={k * 0.12}>
              <ResearchCard r={r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== experience and education */

function Timeline({ stops }: { stops: Stop[] }) {
  const line = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion() || !line.current) return;
    const t = gsap.fromTo(line.current, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: line.current.parentElement, start: "top 75%", end: "bottom 60%", scrub: true } });
    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, []);
  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-0 h-full w-px bg-line" />
      <div ref={line} className="absolute left-0 top-0 h-full w-px origin-top bg-accent" />
      <ol className="space-y-12">
        {stops.map((s, k) => (
          <li key={s.title} className="relative" data-rise={k * 0.05}>
            <span className={`absolute -left-[2.3rem] top-1.5 h-3 w-3 rounded-full border-2 border-bg ${s.kind === "Work" ? "bg-ink" : "bg-accent"}`} />
            <p className="flex flex-wrap items-center gap-3 text-sm text-faint">
              {s.when}
              <span className={`rounded-full border px-2.5 py-0.5 text-xs ${s.kind === "Exchange" ? "border-accent/60 text-accent" : "border-line text-muted"}`}>{s.kind}</span>
            </p>
            <h3 className="display mt-2 text-2xl font-black leading-tight">{s.title}</h3>
            <p className="mt-1 text-muted">{s.org}</p>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Path() {
  return (
    <section id="experience" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-32 sm:px-8">
        <Heading n="03" title="Experience & education" />
        <div className="grid gap-20 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <div className="space-y-20">
            <div>
              <p className="serif mb-10 text-3xl text-accent" data-rise>
                Experience
              </p>
              <Timeline stops={path.filter((s) => s.kind !== "Study")} />
            </div>
            <div>
              <p className="serif mb-10 text-3xl text-accent" data-rise>
                Education
              </p>
              <Timeline stops={path.filter((s) => s.kind === "Study")} />
            </div>
          </div>
          <div className="self-start lg:sticky lg:top-28">
            <p className="serif text-3xl text-accent" data-rise>
              Certificates
            </p>
            <ul className="mt-6 border-t border-line">
              {certificates.map((c, k) => (
                <li key={c.name} data-rise={k * 0.05} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <span className="font-display font-bold">{c.name}</span>
                  <span className="shrink-0 text-sm text-faint">
                    {c.by}, {c.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== skills */

/** A card with a soft light that follows the pointer across it. */
function Spotlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={move} className="group relative h-full overflow-hidden rounded-[1.5rem] border border-line bg-surface p-7 transition-colors duration-500 hover:border-accent/40">
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(360px circle at var(--x) var(--y), color-mix(in srgb, var(--accent) 13%, transparent), transparent 70%)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-32 sm:px-8">
        <Heading n="04" title="Skills" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g, k) => (
            <div key={g.group} data-rise={k * 0.06}>
              <Spotlight>
                <p className="serif text-2xl text-accent">{g.group}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <li key={t} className="rounded-full border border-line bg-bg/40 px-3 py-1.5 text-sm text-muted transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== projects */

// Photos under a project's row: one after another with a caption, paused while the pointer is on them.
function Gallery({ shots }: { shots: Shot[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reducedMotion() || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % shots.length), 4000);
    return () => clearInterval(t);
  }, [shots.length, paused]);
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative aspect-[10/7] max-w-2xl overflow-hidden rounded-2xl border border-line bg-black"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={shots[i].src}
          src={shots[i].src}
          alt={shots[i].caption}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-black/80 to-transparent p-4 pt-16 sm:p-5 sm:pt-20">
        <p className="text-sm leading-snug text-white sm:text-base">{shots[i].caption}</p>
        <div className="flex shrink-0 gap-2 pb-1">
          {shots.map((s, k) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Photo ${k + 1}: ${s.caption}`}
              onClick={() => setI(k)}
              className={`h-2 rounded-full transition-all duration-300 ${k === i ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Preview({ p }: { p: Project }) {
  if (p.preview === "image") return <img src={p.image} alt="" className="h-full w-full object-cover object-top" />;
  if (p.preview === "hex")
    return (
      <div className="grid h-full grid-cols-8 content-center gap-x-2 gap-y-1 bg-[#0b0d0a] p-5 font-mono text-[13px] text-[#9be36d]/50">
        {"4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00 B8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00 50 45 00 00 64 86 02 00".split(" ").map((b, i) => (
          <span key={i} className={i < 2 || (i >= 32 && i < 34) ? "font-medium text-[#9be36d]" : ""}>
            {b}
          </span>
        ))}
        <span className="col-span-8 mt-3 font-sans text-xs text-white/50">MZ … PE: the first bytes, written by hand</span>
      </div>
    );
  if (p.preview === "swahili")
    return (
      <div className="flex h-full flex-col justify-center bg-[#0d0f14] p-6 font-mono text-sm leading-relaxed text-white/80">
        <span className="text-white/40">prompt ›</span>
        <span>Habari za leo. Serikali imetangaza</span>
        <span className="text-[#7fb3ff]">
          mpango mpya wa elimu kwa vijana<span className="animate-pulse">▍</span>
        </span>
      </div>
    );
  return (
    <div className="flex h-full flex-col justify-center gap-4 bg-[#140d0d] p-6">
      <div className="truncate rounded-full bg-white/10 px-4 py-2 font-mono text-xs text-white/70">https://paypa1-secure-login.co/verify</div>
      <div className="rounded-xl border border-[#ff8e8e]/40 bg-[#ff8e8e]/10 p-4 text-sm text-[#ffb3b3]">⚠ This link looks like phishing. Think before you click.</div>
    </div>
  );
}

function Projects() {
  const [hover, setHover] = useState<number | null>(null);
  const card = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!card.current || !window.matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(card.current, "x", { duration: 0.6, ease: "power3.out" });
    const y = gsap.quickTo(card.current, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      x(e.clientX + 28);
      y(e.clientY - 120);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <section id="projects" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-32 sm:px-8">
        <Heading
          n="05"
          title="Selected projects"
          aside={
            <a href={links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-display font-bold text-accent" data-rise>
              More on GitHub <Arrow />
            </a>
          }
        />
        <div data-line className="h-px bg-line" />
        <ul onMouseLeave={() => setHover(null)}>
          {projects.map((p, k) => (
            <li key={p.title} data-rise={k * 0.06}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                onMouseEnter={() => setHover(p.shots ? null : k)}
                className={`group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-6 gap-y-2 py-9 lg:grid-cols-[3rem_1.1fr_1.4fr_0.9fr] ${p.shots ? "" : "border-b border-line"}`}
              >
                <span className="serif text-xl text-faint">0{k + 1}</span>
                <span className="display text-3xl font-black transition duration-500 group-hover:translate-x-3 group-hover:text-accent sm:text-4xl">{p.title}</span>
                <span className="col-start-2 text-muted lg:col-start-auto">{p.what}</span>
                <span className="col-start-2 text-sm text-faint lg:col-start-auto lg:text-right">{p.stack}</span>
              </a>
              {p.shots && (
                <div className="border-b border-line pb-9 lg:pl-[4.5rem]">
                  <Gallery shots={p.shots} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* the preview that follows the pointer over a row */}
      <div ref={card} className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-56 w-80 lg:block">
        <AnimatePresence>
          {hover !== null && (
            <motion.div
              key={hover}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 overflow-hidden rounded-2xl border border-line shadow-2xl"
            >
              <Preview p={projects[hover]} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ================================================================== writing and talks */

function Writing() {
  return (
    <section id="writing" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-32 sm:px-8">
        <Heading
          n="06"
          title="Writing & talks"
          aside={
            <a href={links.medium} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-display font-bold text-accent" data-rise>
              All of it on Medium <Arrow />
            </a>
          }
        />
        <div className="grid gap-5 md:grid-cols-2">
          {writing.map((w, k) => (
            <a
              key={w.title}
              href={w.href}
              target="_blank"
              rel="noreferrer"
              data-rise={k * 0.08}
              data-cursor={w.kind === "Talk" ? "Details" : "Read"}
              className={`group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-[2rem] border p-8 transition-colors duration-500 ${
                w.kind === "Talk" ? "border-transparent bg-accent text-accent-ink md:row-span-2" : "border-line bg-surface hover:border-accent/50"
              }`}
            >
              <div className="flex items-center justify-between text-sm">
                <span className={w.kind === "Talk" ? "font-bold" : "text-accent"}>{w.kind}</span>
                <span className={w.kind === "Talk" ? "" : "text-faint"}>
                  {w.when} · {w.where}
                </span>
              </div>
              <h3 className={`display mt-10 font-black leading-tight ${w.kind === "Talk" ? "text-4xl sm:text-5xl" : "text-2xl"}`}>{w.title}</h3>
              <Arrow className="mt-6 h-6 w-6 transition duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== contact */

const icons: Record<string, IconType> = { GitHub: SiGithub, LinkedIn: FaLinkedinIn, "Hugging Face": SiHuggingface, Medium: FaMediumM, CV: LuFileText };

function Contact() {
  const [copied, setCopied] = useState(false);
  const big = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (reducedMotion() || !big.current) return;
    const t = gsap.fromTo(big.current, { xPercent: 10 }, { xPercent: -8, ease: "none", scrollTrigger: { trigger: big.current, start: "top bottom", end: "bottom top", scrub: true } });
    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, []);
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
    <section id="contact" className="relative overflow-hidden border-t border-line pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="serif text-3xl text-accent">(07) Say hi</p>
      </div>
      <h2 ref={big} className="display mt-6 whitespace-nowrap pb-[4vw] text-[19vw] font-black leading-none">
        Let's talk<span className="text-accent">.</span>
      </h2>
      <div className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <p className="mt-2 text-lg text-muted">About models, malware, memory, or anything else. Write, or find me here.</p>
        <div className="mt-12">
          <Magnetic strength={0.25}>
            <button
              type="button"
              onClick={copy}
              data-cursor={copied ? "Copied" : "Copy"}
              className="rounded-full border border-line px-8 py-5 font-display text-xl font-bold transition hover:border-accent hover:bg-accent hover:text-accent-ink sm:text-3xl"
            >
              {copied ? "Copied to clipboard" : links.email}
            </button>
          </Magnetic>
        </div>
        <ul className="mt-10 flex flex-wrap gap-3">
          {socials.map((l, k) => {
            const Icon = icons[l.name];
            return (
              <li key={l.name} data-rise={k * 0.05}>
                <Magnetic strength={0.4}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    title={l.handle}
                    className="group relative flex items-center gap-2.5 overflow-hidden rounded-full border border-line px-5 py-3 font-display font-bold transition-colors duration-500 hover:border-accent hover:text-accent-ink"
                  >
                    <span className="absolute inset-0 translate-y-full rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:translate-y-0" />
                    {Icon && <Icon className="relative h-[1.1em] w-[1.1em] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />}
                    <span className="relative">{l.name}</span>
                  </a>
                </Magnetic>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
