import { useCallback, useEffect, useRef, useState } from "react";

export function useFeatureTour(length: number) {
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const activeIndex = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReducedMotion(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    if (reducedMotion || selected === activeIndex.current) {
      activeIndex.current = selected;
      setActive(selected);
      setPhase("idle");
      return;
    }
    setPhase("exiting");
    const swap = window.setTimeout(() => {
      activeIndex.current = selected;
      setActive(selected);
      setPhase("entering");
    }, 280);
    const finish = window.setTimeout(() => setPhase("idle"), 620);
    return () => { window.clearTimeout(swap); window.clearTimeout(finish); };
  }, [selected, reducedMotion]);

  const select = useCallback((index: number) => setSelected(((index % length) + length) % length), [length]);
  const move = useCallback((direction: number) => setSelected((index) => (index + direction + length) % length), [length]);
  return { selected, active, phase, select, move };
}
