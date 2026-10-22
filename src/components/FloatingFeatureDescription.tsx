import { Sparkles } from "lucide-react";
import type { ScreenId } from "../data/showcase";
import { tourDescriptions } from "../data/tour";

export function FloatingFeatureDescription({ screen, title, index, total }: { screen: ScreenId; title: string; index: number; total: number }) {
  const feature = tourDescriptions[screen];
  return <div className={`tour-description-entry tour-position-${feature.position}`} key={screen}>
    <article className={`tour-description tour-accent-${feature.accent}`} aria-labelledby="demo-screen-title">
      <div className="tour-description-kicker"><span>{String(index + 1).padStart(2,"0")} <i>/ {String(total).padStart(2,"0")}</i></span><Sparkles size={15} aria-hidden="true" /></div>
      <h2 id="demo-screen-title">{title}</h2>
      <p>{feature.description}</p>
    </article>
  </div>;
}
