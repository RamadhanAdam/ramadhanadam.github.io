import { useEffect, useRef, useState, type MouseEvent as RMouseEvent } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { floors, interests, links, path, type Floor, type FloorId, type Item } from "../data";
import { FloorMotif } from "../components/Motifs";
import { Arrow, Glide, JstClock, Reveal, RiseWords, ease } from "../components/ui";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stack />
      <Journey />
      <Contact />
    </main>
  );
}

function goToFloor(id: FloorId) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  el.animate([{ boxShadow: `inset 4px 0 0 var(--${id})` }, { boxShadow: "inset 0 0 0 transparent" }], { duration: 1800, easing: "ease-out" });
}

/* ================================================================== hero */

// Where each chip floats on a wide screen (left %, top %). On a phone they sit in a cloud under the text.
const SPOTS: [number, number][] = [
  [52, 14], [74, 9], [91, 36], [91, 57], [86, 84], [68, 91], [52, 88], [35, 93], [12, 92], [54, 71], [36, 8], [14, 9],
];

function Chip({ label, floor, i, spot }: { label: string; floor: FloorId; i: number; spot?: [number, number] }) {
  const drag = useRef(false);
  return (
    <motion.button
      type="button"
      drag={!!spot}
      dragMomentum={false}
      dragElastic={0.15}
      onDragStart={() => (drag.current = true)}
      onDragEnd={() => setTimeout(() => (drag.current = false), 0)}
      onClick={() => !drag.current && goToFloor(floor)}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease, delay: 0.6 + i * 0.06 }}
      whileHover={{ scale: 1.08 }}
      whileDrag={{ scale: 1.12, cursor: "grabbing" }}
      className={`${spot ? "absolute" : ""} z-10 cursor-grab touch-none select-none`}
      style={spot ? { left: `${spot[0]}%`, top: `${spot[1]}%` } : undefined}
      title={`See it on the ${floor} floor`}
    >
      <span
        className="bob flex items-center gap-2 whitespace-nowrap rounded-full border bg-surface/80 px-3.5 py-1.5 font-display text-sm font-medium shadow-lg backdrop-blur-md"
        style={{ borderColor: `color-mix(in srgb, var(--${floor}) 45%, transparent)`, animationDelay: `${(i * 0.7) % 6}s` }}
      >
        <span className="h-2 w-2 rounded-full" style={{ background: `var(--${floor})` }} />
        {label}
      </span>
    </motion.button>
  );
}

function TiltPhoto() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });
  const onMove = (e: RMouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <div className="relative mx-auto w-full max-w-[22rem] [perspective:1000px]" onMouseMove={onMove} onMouseLeave={() => (mx.set(0), my.set(0))}>
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative">
        <motion.img
          src="/images/me.jpg"
          alt="Ramadhan Adam Zome"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.25 }}
          className="aspect-[3/4] w-full rounded-[2.2rem] border border-line object-cover object-top shadow-2xl"
        />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.0 }}
          className="absolute -left-6 bottom-10 sm:-left-10"
        >
          <div className="bob rounded-2xl border border-line bg-surface/85 px-4 py-3 text-sm shadow-xl backdrop-blur-md" style={{ animationDelay: "1s" }}>
            <span className="flex items-center gap-2 font-display font-bold">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Higashi-Hiroshima · <JstClock />
            </span>
            <span className="mt-0.5 block text-xs text-muted">10,632 km from home in Nairobi</span>
          </div>
        </motion.div>
        <motion.a
          href={links.talk}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.15 }}
          className="absolute -right-4 top-8 sm:-right-8"
        >
          <span className="bob block rounded-2xl border border-line bg-surface/85 px-4 py-3 text-sm shadow-xl backdrop-blur-md transition hover:border-accent" style={{ animationDelay: "2.5s" }}>
            <span className="block text-xs text-muted">Next up</span>
            <span className="font-display font-bold">My talk in Hiroshima, 17 Oct ↗</span>
          </span>
        </motion.a>
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 75% 35%, color-mix(in srgb, var(--models) 10%, transparent), transparent), radial-gradient(40% 40% at 15% 80%, color-mix(in srgb, var(--binaries) 8%, transparent), transparent)",
        }}
      />
      {/* the chips float over the whole hero on wide screens */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="relative mx-auto h-full max-w-6xl px-8">
          <div className="pointer-events-auto relative h-full">
            {interests.map((c, i) => (
              <Chip key={c.label} {...c} i={i} spot={SPOTS[i]} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-14 px-5 pt-28 pb-20 sm:px-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="font-display text-base font-medium text-muted">
            Ramadhan Adam Zome · machine learning for security
          </motion.p>
          <h1 className="display mt-5 text-[3.4rem] font-black sm:text-7xl lg:text-[5.6rem]">
            <RiseWords text="I like going" delay={0.1} />
            <br />
            <span className="inline-flex items-baseline" aria-hidden="true">
              {"down".split("").map((ch, k) => (
                <motion.span
                  key={k}
                  initial={{ y: "-60%", opacity: 0 }}
                  animate={{ y: `${k * 0.07}em`, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.5 + k * 0.12 }}
                  className="inline-block text-accent"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <span className="sr-only">down</span> <RiseWords text="the stack." delay={0.9} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1.1 }} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            I build machine learning for security, and I like knowing what sits underneath it: from transformers, down through Windows programs
            read byte by byte, to the cells of GPU memory. I'm a master's student at PAUSTI in Nairobi, on exchange at Hiroshima University until
            January.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1.25 }} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#stack" className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold text-accent-ink transition hover:brightness-110">
              Take the stairs down
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                ↓
              </motion.span>
            </a>
            <a href={links.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-display text-sm font-bold transition hover:border-accent">
              My CV <Arrow />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full px-4 py-3 font-display text-sm font-bold text-muted transition hover:text-ink">
              Say hi
            </a>
          </motion.div>
          {/* on smaller screens the chips sit here */}
          <div className="mt-10 flex flex-wrap gap-2.5 lg:hidden">
            {interests.map((c, i) => (
              <Chip key={c.label} {...c} i={i} />
            ))}
          </div>
        </div>
        <TiltPhoto />
      </div>
    </section>
  );
}

/* ================================================================== the stack */

function useActiveFloor() {
  const [active, setActive] = useState<FloorId | null>(null);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id as FloorId)), {
      rootMargin: "-45% 0px -50% 0px",
    });
    floors.forEach((f) => {
      const el = document.getElementById(f.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

function Rail({ active }: { active: FloorId | null }) {
  return (
    <nav className="sticky top-28 hidden self-start xl:block" aria-label="Floors">
      <p className="font-display text-sm font-bold text-muted">Floors</p>
      <ol className="relative mt-4 border-l border-line">
        {floors.map((f) => {
          const on = active === f.id;
          return (
            <li key={f.id}>
              <button type="button" onClick={() => goToFloor(f.id)} className="group relative flex w-full items-center gap-3 py-2.5 pl-5 text-left">
                {on && <motion.span layoutId="rail" className="absolute -left-px top-0 h-full w-0.5" style={{ background: `var(--${f.id})` }} transition={{ duration: 0.4, ease }} />}
                <span className="font-display text-sm font-bold tabular-nums" style={{ color: on ? `var(--${f.id})` : "var(--faint)" }}>
                  {f.n}
                </span>
                <span className={`font-display text-sm font-medium transition ${on ? "text-ink" : "text-muted group-hover:text-ink"}`}>{f.name}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 max-w-[10rem] text-xs leading-relaxed text-faint">From the top, where ideas live, down to the silicon.</p>
    </nav>
  );
}

function Card({ item, floor, onOpen }: { item: Item; floor: FloorId; onOpen: (i: Item) => void }) {
  const opens = !item.href;
  const body = (
    <>
      {item.image && (
        <div className="overflow-hidden rounded-2xl border border-line">
          <img src={item.image} alt="" className="h-44 w-full object-cover object-top transition duration-700 group-hover:scale-[1.04] sm:h-52" />
        </div>
      )}
      <div className="flex items-center gap-2 text-xs font-medium">
        <span style={{ color: `var(--${floor})` }} className="font-display font-bold">
          {item.kind}
        </span>
        {item.status && <span className="rounded-full border border-line px-2 py-0.5 text-muted">{item.status}</span>}
      </div>
      <h4 className={`font-display font-bold leading-snug tracking-tight ${item.wide ? "text-2xl" : "text-lg"}`}>{item.title}</h4>
      <p className="text-[0.95rem] leading-relaxed text-muted">{item.line}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-1 font-display text-sm font-bold" style={{ color: `var(--${floor})` }}>
        {opens ? "Open" : item.kind === "Writing" ? "Read on Medium" : "Read"}
        <Arrow className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </>
  );
  const cls = "group relative flex h-full w-full flex-col gap-3 rounded-3xl border border-line bg-surface p-6 text-left transition duration-300 hover:-translate-y-1";
  const hover = { boxShadow: `0 18px 50px -24px var(--${floor})` };
  if (opens)
    return (
      <motion.button layoutId={`card-${item.title}`} type="button" onClick={() => onOpen(item)} className={cls} whileHover={hover}>
        {body}
      </motion.button>
    );
  if (item.href!.startsWith("/"))
    return (
      <motion.div whileHover={hover} className="h-full rounded-3xl">
        <Link to={item.href!} className={cls}>
          {body}
        </Link>
      </motion.div>
    );
  return (
    <motion.a href={item.href} target="_blank" rel="noreferrer" className={cls} whileHover={hover}>
      {body}
    </motion.a>
  );
}

function FloorSection({ floor, onOpen }: { floor: Floor; onOpen: (i: Item, f: FloorId) => void }) {
  return (
    <section id={floor.id} className="relative scroll-mt-24 rounded-[2rem] py-14">
      <div className="relative mb-10 md:min-h-[15rem]">
        <FloorMotif id={floor.id} />
        <Reveal className="relative max-w-md">
          <p className="font-display text-sm font-bold" style={{ color: `var(--${floor.id})` }}>
            Floor {floor.n} of {floors.length}
          </p>
          <h3 className="display mt-3 text-6xl font-black sm:text-7xl">{floor.name}</h3>
          <p className="mt-4 text-lg leading-relaxed text-muted">{floor.tagline}</p>
        </Reveal>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {floor.items.map((it, k) => (
          <Reveal key={it.title} delay={(k % 3) * 0.06} className={it.wide ? "sm:col-span-2" : ""}>
            <Card item={it} floor={floor.id} onOpen={(i) => onOpen(i, floor.id)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Detail({ item, floor, onClose }: { item: Item; floor: FloorId; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-[70] grid place-items-center p-4 sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.article
        layoutId={`card-${item.title}`}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-line bg-surface p-7 sm:p-10"
        style={{ boxShadow: `0 40px 120px -40px var(--${floor})` }}
      >
        <button type="button" onClick={onClose} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:text-ink" aria-label="Close">
          ✕
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-display font-bold" style={{ color: `var(--${floor})` }}>
            {item.kind}
          </span>
          {item.status && <span className="rounded-full border border-line px-2.5 py-0.5 text-muted">{item.status}</span>}
        </div>
        <h3 className="display mt-3 pr-10 text-3xl font-black sm:text-4xl">{item.title}</h3>
        {item.image && <img src={item.image} alt="" className="mt-6 rounded-2xl border border-line" />}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5, ease }}>
          <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-muted">
            {item.details?.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          {item.footnote && <p className="mt-6 border-t border-line pt-5 text-sm text-faint">{item.footnote}</p>}
          {item.tags && (
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="rounded-full bg-surface-2 px-3 py-1 text-sm text-muted">
                  {t}
                </span>
              ))}
            </div>
          )}
          {item.links && (
            <div className="mt-7 flex flex-wrap gap-3">
              {item.links.map((l, k) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-bold transition ${k === 0 ? "text-accent-ink hover:brightness-110" : "border border-line hover:border-accent"}`}
                  style={k === 0 ? { background: `var(--${floor})` } : undefined}
                >
                  {l.label} <Arrow />
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </motion.article>
    </motion.div>
  );
}

function Stack() {
  const active = useActiveFloor();
  const [open, setOpen] = useState<{ item: Item; floor: FloorId } | null>(null);
  return (
    <section id="stack" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 xl:max-w-7xl">
        <Reveal className="max-w-2xl xl:ml-[13.5rem]">
          <h2 className="display text-6xl font-black sm:text-8xl">The stack</h2>
          <p className="mt-6 text-xl leading-relaxed text-muted">
            Five floors, from ideas down to silicon. Everything I've built or written lives on one of them. Open anything to read more, or just keep
            going down.
          </p>
        </Reveal>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 sm:px-8 xl:max-w-7xl xl:grid-cols-[11rem_1fr]">
        <Rail active={active} />
        <div>
          {floors.map((f) => (
            <FloorSection key={f.id} floor={f} onOpen={(item, floor) => setOpen({ item, floor })} />
          ))}
        </div>
      </div>
      <AnimatePresence>{open && <Detail item={open.item} floor={open.floor} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

/* ================================================================== journey */

function Journey() {
  const [sel, setSel] = useState(path.length - 1);
  const stop = path[sel];
  return (
    <section id="path" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="display text-5xl font-black sm:text-7xl">How I got here</h2>
          <p className="mt-5 text-xl text-muted">Nairobi to Higashi-Hiroshima, by way of statistics, toll booths and a lot of GPUs.</p>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-[1.1rem] right-[calc(25%-1.1rem)] top-[1.15rem] hidden h-px bg-line sm:block" />
          <motion.div
            className="absolute left-[1.1rem] top-[1.15rem] hidden h-px bg-accent sm:block"
            initial={false}
            animate={{ width: `${(sel / (path.length - 1)) * 75}%` }}
            transition={{ duration: 0.7, ease }}
          />
          <ol className="relative grid gap-4 sm:grid-cols-4">
            {path.map((p, k) => (
              <li key={p.place}>
                <button type="button" onClick={() => setSel(k)} className="group flex w-full flex-col items-start text-left">
                  <span
                    className={`relative grid h-9 w-9 place-items-center rounded-full border-2 transition ${k <= sel ? "border-accent bg-accent text-accent-ink" : "border-line bg-bg text-faint group-hover:border-accent"}`}
                  >
                    <span className="font-display text-sm font-bold">{k + 1}</span>
                  </span>
                  <span className="mt-4 text-sm text-faint">{p.when}</span>
                  <span className={`font-display text-lg font-bold transition ${k === sel ? "text-ink" : "text-muted group-hover:text-ink"}`}>{p.place}</span>
                  <span className="text-sm text-faint">{p.city}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease }}
            className="mt-10 max-w-3xl rounded-3xl border border-line bg-surface p-7 sm:p-9"
          >
            <p className="font-display text-sm font-bold text-accent">{stop.when}</p>
            <h3 className="display mt-2 text-3xl font-black">{stop.role}</h3>
            <p className="mt-1 text-muted">
              {stop.place}, {stop.city}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">{stop.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ================================================================== contact */

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
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(50% 60% at 50% 100%, color-mix(in srgb, var(--accent) 12%, transparent), transparent)" }} />
      <div className="mx-auto max-w-6xl px-5 py-32 text-center sm:px-8">
        <Reveal>
          <h2 className="display text-7xl font-black sm:text-9xl">Say hi.</h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted">
            About security, models, PE files, Swahili, or the next floor down. I'm in Higashi-Hiroshima until January 2027, then back in Nairobi.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href={`mailto:${links.email}`} className="display text-2xl font-bold underline decoration-line decoration-2 underline-offset-8 transition hover:decoration-accent sm:text-4xl">
            {links.email}
          </a>
          <button type="button" onClick={copy} className="rounded-full border border-line px-5 py-2.5 font-display text-sm font-bold transition hover:border-accent">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={copied ? "y" : "n"} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.25 }} className="block">
                {copied ? "Copied" : "Copy"}
              </motion.span>
            </AnimatePresence>
          </button>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-sm text-faint">Or {links.emailHiroshima} while I'm at Hiroshima University.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-7 font-display text-sm font-bold text-muted">
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
