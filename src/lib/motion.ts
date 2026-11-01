// Smooth scrolling (Lenis) on GSAP's clock, so ScrollTrigger animations and the scroll never drift apart.
// Visitors who ask for reduced motion get native scrolling and no reveal animations.
import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis: Lenis | null = null;

export function useSmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

/** Scroll to an element (or the top), smoothly when Lenis is running. */
export function scrollToTarget(target: string | HTMLElement | number, offset = -72) {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 });
  else if (typeof target === "number") window.scrollTo(0, target);
  else (typeof target === "string" ? document.querySelector(target) : target)?.scrollIntoView();
}

/**
 * Inside `root`: [data-split] text and [data-rise] blocks fade in with a short lift as they scroll into view, and
 * [data-line] rules draw themselves across. Text appears as a whole block and early, so a reader never meets blank
 * space or a half-finished sentence.
 */
export function useReveals(root: RefObject<HTMLElement>, deps: unknown[] = []) {
  useEffect(() => {
    if (!root.current || reducedMotion()) return;
    const ctx = gsap.context(() => {
      root.current!.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        gsap.from(el, { y: 14, opacity: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 95%" } });
      });
      root.current!.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.from(el, {
          y: 16,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: Math.min(Number(el.dataset.rise) || 0, 0.15),
          scrollTrigger: { trigger: el, start: "top 95%" },
        });
      });
      root.current!.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => {
        gsap.from(el, { scaleX: 0, transformOrigin: "left center", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 92%" } });
      });
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
