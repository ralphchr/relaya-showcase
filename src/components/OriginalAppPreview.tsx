import { useEffect, useRef, useState } from "react";
import type { ScreenId } from "../data/showcase";
import "./original-app-preview.css";

/** Preserve the original app's 1440×900 viewport and scale the whole screen. */
export function OriginalAppPreview({ screen, className = "", alt }: { screen: ScreenId; className?: string; alt: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ scale: 0, left: 0, top: 0 });
  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const resize = () => {
      const scale = Math.min(element.clientWidth / 1440, element.clientHeight / 900);
      setLayout({ scale, left: (element.clientWidth - 1440 * scale) / 2, top: (element.clientHeight - 900 * scale) / 2 });
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`original-app-preview ${className}`} ref={frame} role="img" aria-label={alt}>
      <iframe src={`/app-preview.html?screen=${screen}`} title={alt} width="1440" height="900" tabIndex={-1} aria-hidden="true" style={{ transform: `scale(${layout.scale})`, left: layout.left, top: layout.top }} />
    </div>
  );
}
