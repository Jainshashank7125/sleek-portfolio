'use client';

import ReactLenis from 'lenis/react';
import { useEffect, useState } from 'react';

// Lenis hijacks native scrolling for its smoothing effect, which conflicts
// with the OS-level "reduce motion" accessibility setting. Skip it entirely
// for those users instead of trying to tune it down.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  if (reducedMotion) {
    return children;
  }

  return <ReactLenis root>{children}</ReactLenis>;
}
