import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle, ease } from "./ui";
import { ScrambleText } from "./fx";
import { scrollToTarget } from "../lib/motion";

const sections = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 300 && y > last); // tucks away while scrolling down, returns when scrolling up
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const go = (e: MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    if (pathname === "/") scrollToTarget(`#${id}`);
    else navigate(`/#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? "-translate-y-full" : ""} ${
        scrolled ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link to="/" className="group flex items-center gap-3" aria-label="Ramadhan Adam Zome, home" onClick={() => pathname === "/" && scrollToTarget(0)}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-display text-sm font-black text-accent-ink transition group-hover:rotate-12">R</span>
          <span className="font-display text-[0.95rem] font-bold tracking-tight">Ramadhan Adam Zome</span>
        </Link>

        <div className="hidden items-center gap-7 font-display text-sm font-medium text-muted lg:flex">
          {sections.map((s) => (
            <a key={s.id} href={`/#${s.id}`} onClick={(e) => go(e, s.id)} className="transition hover:text-ink">
              <ScrambleText text={s.label} />
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button type="button" onClick={() => setOpen((o) => !o)} className="grid h-9 w-9 place-items-center rounded-full border border-line" aria-expanded={open} aria-label="Menu">
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 block h-0.5 w-4 bg-ink transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 block h-0.5 w-4 bg-ink transition ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}
            className="border-b border-line bg-bg lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col px-5 py-6">
              {sections.map((s, k) => (
                <a key={s.id} href={`/#${s.id}`} onClick={(e) => go(e, s.id)} className="flex items-baseline gap-3 py-2 font-display text-3xl font-black">
                  <span className="serif text-base font-normal text-accent">0{k + 1}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
