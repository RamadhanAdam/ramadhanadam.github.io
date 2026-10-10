import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Glide, ThemeToggle, ease } from "./ui";

const sections = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const home = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link to="/" className="group flex items-center gap-3" aria-label="Ramadhan Adam Zome, home">
          <img src="/images/me.jpg" alt="" className="h-8 w-8 rounded-full object-cover object-top ring-1 ring-line transition group-hover:ring-accent" />
          <span className="font-display text-sm font-semibold tracking-tight">Ramadhan Adam Zome</span>
        </Link>

        <div className="hidden items-center gap-7 text-sm text-muted md:flex">
          {sections.map((s) => (
            <Glide key={s.id} href={href(s.id)} className="hover:text-ink">
              {s.label}
            </Glide>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line"
            aria-expanded={open}
            aria-label="Menu"
          >
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="border-b border-line bg-bg/95 backdrop-blur-md md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col px-5 py-4">
              {sections.map((s) => (
                <a key={s.id} href={href(s.id)} onClick={() => setOpen(false)} className="py-2.5 font-display text-lg font-semibold">
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
