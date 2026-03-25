import { useEffect, useRef } from "react";

/**
 * Attaches IntersectionObserver(s) to [data-stagger] children inside
 * the returned ref container.
 *
 * individual: false (default) — all items reveal together when the
 *   container enters the viewport, with a staggered delay per index.
 *
 * individual: true — each item is observed independently and reveals
 *   as it scrolls into view, with no inter-item delay.
 */
export function useStaggerReveal({ threshold = 0.1, individual = false } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll("[data-stagger]"));

    if (individual) {
      const observers = items.map((el) => {
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.classList.add("stagger-visible");
              obs.disconnect();
            }
          },
          { threshold },
        );
        obs.observe(el);
        return obs;
      });
      return () => observers.forEach((obs) => obs.disconnect());
    }

    // Grouped: all items fire together when container enters viewport
    items.forEach((el, i) => el.style.setProperty("--stagger-i", i));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((el) => el.classList.add("stagger-visible"));
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold, individual]);

  return ref;
}
