// Smooth scrolling (Lenis) on GSAP's clock, so ScrollTrigger animations and the scroll never drift apart.
// Visitors who ask for reduced motion get native scrolling and no reveal animations.
import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
 * Inside `root`: [data-split] text rises in line by line as it scrolls into view, [data-rise] blocks lift in,
 * and [data-line] rules draw themselves across.
 */
export function useReveals(root: RefObject<HTMLElement>, deps: unknown[] = []) {
  useEffect(() => {
    if (!root.current || reducedMotion()) return;
    const splits: SplitText[] = [];
    let cancelled = false;
    // Lines are measured only after the fonts have loaded, and measured again if the layout changes.
    document.fonts.ready.then(() => {
      if (cancelled || !root.current) return;
      root.current.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        splits.push(
          SplitText.create(el, {
            type: "lines,words",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.words, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.035, scrollTrigger: { trigger: el, start: "top 88%" } }),
          }),
        );
      });
      ScrollTrigger.refresh();
    });
    const ctx = gsap.context(() => {
      root.current!.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          delay: Number(el.dataset.rise) || 0,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
      root.current!.querySelectorAll<HTMLElement>("[data-line]").forEach((el) => {
        gsap.from(el, { scaleX: 0, transformOrigin: "left center", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 92%" } });
      });
    }, root);
    return () => {
      cancelled = true;
      splits.forEach((sp) => sp.revert());
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
