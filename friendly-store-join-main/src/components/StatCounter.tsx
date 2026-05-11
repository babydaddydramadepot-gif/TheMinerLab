import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: string; // e.g. "1.2K+", "100%", "48hr", "24/7"
  duration?: number;
}

/**
 * Parses a display value into a numeric target + prefix/suffix wrappers,
 * so we can animate the numeric part smoothly. Non-numeric strings (e.g. "24/7")
 * fall back to a soft fade-in with no counting.
 */
function parse(value: string): { prefix: string; target: number; suffix: string; decimals: number } | null {
  const m = value.match(/^([^\d.-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const numStr = m[2];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix: m[1], target: parseFloat(numStr), suffix: m[3], decimals };
}

export function StatCounter({ value, duration = 1600 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState<string>(() => {
    const p = parse(value);
    return p ? `${p.prefix}0${p.suffix}` : value;
  });
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parsed = parse(value);
    if (!parsed || reduce) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        const v = parsed.target * ease(t);
        setDisplay(`${parsed.prefix}${v.toFixed(parsed.decimals)}${parsed.suffix}`);
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            start();
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
