import { useEffect, useRef, useState } from 'react';

/** Reveal once by default; `once: false` tracks entry and exit for replayable motion. */
export function useInView({ rootMargin = '0px 0px -10% 0px', threshold = 0.1, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || (once && inView)) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once && !entry.isIntersecting) {
          setInView(false);
        }
      },
      { rootMargin, threshold: once ? threshold : [0, threshold] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin, threshold, once]);

  return [ref, inView];
}
