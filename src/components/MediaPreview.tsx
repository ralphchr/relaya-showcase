import { useEffect, useState } from "react";
import { ScreenPreview } from "./ScreenPreview";
import type { ScreenId } from "../data/showcase";

export function MediaPreview({ src, screen, alt, className = "" }: {
  src?: string | null;
  screen: ScreenId;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (src && !failed) {
    return <div className={`media-preview ${className}`}><img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} /></div>;
  }
  return <ScreenPreview screen={screen} className={className} alt={alt} />;
}
