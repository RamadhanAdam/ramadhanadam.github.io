import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, reducedMotion } from "../lib/motion";

const HEX = "0123456789ABCDEF";

/** Resolve `el` into `text` through random hex characters, left to right, like bytes being decoded. */
export function scramble(el: HTMLElement, text: string, duration = 700) {
  if (reducedMotion()) {
    el.textContent = text;
    return () => {};
  }
  const start = performance.now();
  let raf = 0;
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const settled = Math.floor(t * text.length);
    el.textContent = text
      .split("")
      .map((ch, i) => (i < settled || ch === " " ? ch : HEX[Math.floor(Math.random() * 16)]))
      .join("");
    if (t < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

/** A label that decodes itself again when hovered. */
export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span ref={ref} className={className} onMouseEnter={() => ref.current && scramble(ref.current, text, 450)} aria-label={text}>
      {text}
    </span>
  );
}

/** Pulls its child gently toward the pointer while the pointer is near. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * strength);
      y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => (x(0), y(0));
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  );
}

/** A dot that follows the pointer and a ring that trails it; the ring grows over links and shows a word over [data-cursor]. */
export function Cursor() {
  const layer = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [big, setBig] = useState(false);
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      layer.current?.classList.add("cursor-on");
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      setLabel(t?.dataset.cursor ?? "");
      setBig(!!t);
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);
  return (
    <div ref={layer} aria-hidden="true" className="cursor-layer pointer-events-none fixed inset-0 z-[100] hidden opacity-0 transition-opacity duration-300 [&.cursor-on]:opacity-100">
      <div ref={dot} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent mix-blend-difference" />
      <div
        ref={ring}
        className={`absolute grid place-items-center rounded-full border border-accent/70 font-display text-[0.7rem] font-bold uppercase tracking-wider text-accent-ink transition-[width,height,margin,background-color] duration-300 ${
          label ? "-ml-12 -mt-12 h-24 w-24 bg-accent" : big ? "-ml-7 -mt-7 h-14 w-14" : "-ml-5 -mt-5 h-10 w-10"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

/** First visit only: the first bytes of a Windows program decode into my name, a counter runs to 100, and the curtain lifts. */
export function Loader() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem("intro") && !reducedMotion();
    } catch {
      return false;
    }
  });
  const root = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bytes = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem("intro", "1");
    } catch {
      /* private mode */
    }
    document.documentElement.style.overflow = "hidden";
    const n = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        setShow(false);
      },
    });
    tl.from(bytes.current!.children, { opacity: 0, y: 8, stagger: 0.03, duration: 0.3 })
      .to(
        n,
        {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(3, "0");
          },
        },
        0,
      )
      .add(() => {
        if (name.current) scramble(name.current, "RAMADHAN ADAM ZOME", 1000);
      }, 0.45)
      .to(bytes.current, { opacity: 0, duration: 0.3 }, 1.5)
      .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" }, 1.9);
    const skip = () => tl.progress(1);
    root.current?.addEventListener("click", skip);
    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, [show]);
  if (!show) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[90] flex flex-col justify-between bg-bg p-6 sm:p-10" style={{ clipPath: "inset(0 0 0 0)" }}>
      <div ref={bytes} className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm text-faint">
        {"4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00 B8 00 00 00 40 00 00 00 50 45 00 00".split(" ").map((b, i) => (
          <span key={i} className={b === "4D" || b === "5A" || b === "50" || b === "45" ? "text-accent" : ""}>
            {b}
          </span>
        ))}
      </div>
      <div ref={name} className="display text-4xl font-black text-ink sm:text-7xl">
        4D5A90000300 0000 04000000
      </div>
      <div className="flex items-end justify-between text-sm text-muted">
        <span>Loading, one byte at a time</span>
        <span ref={count} className="display text-6xl font-black tabular-nums text-ink sm:text-8xl">
          000
        </span>
      </div>
    </div>
  );
}

/** Words drifting sideways in a band, endlessly. */
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <span key={t} className="flex items-center gap-10 whitespace-nowrap">
          <span className="display text-4xl font-bold sm:text-6xl">{t}</span>
          <span className="serif text-4xl text-accent sm:text-6xl">✳</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee flex overflow-hidden border-y border-line py-7" aria-label={items.join(", ")}>
      <div className="marquee-track flex" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}
