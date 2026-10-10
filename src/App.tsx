import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Cursor, Loader } from "./components/fx";
import Home from "./pages/Home";
import Writing from "./pages/Writing";
import Article from "./pages/Article";
import { scrollToTarget, ScrollTrigger, useSmoothScroll } from "./lib/motion";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // wait a moment so the section exists when arriving from another page
      setTimeout(() => scrollToTarget(hash), 60);
    } else {
      scrollToTarget(0);
      window.scrollTo(0, 0);
      if (pathname === "/") document.title = "Ramadhan Adam Zome";
    }
    setTimeout(() => ScrollTrigger.refresh(), 300);
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 pt-40 pb-32 sm:px-8">
      <p className="serif text-2xl text-accent">404</p>
      <h1 className="display mt-4 text-6xl font-black">Nothing here.</h1>
      <p className="mt-5 text-muted">That page doesn't exist, or it moved.</p>
      <Link to="/" className="mt-8 inline-block font-semibold text-accent">
        Go home →
      </Link>
    </main>
  );
}

export default function App() {
  useSmoothScroll();
  return (
    <MotionConfig reducedMotion="user">
      <Loader />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <ScrollManager />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
        Skip to the content
      </a>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/:slug" element={<Article />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </MotionConfig>
  );
}
