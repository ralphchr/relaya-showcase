import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { ArrowLeft, ArrowRight, Expand, ShieldCheck, X } from "lucide-react";
import { ShowcaseHeader } from "../components/ShowcaseHeader";
import { MediaPreview } from "../components/MediaPreview";
import { FloatingFeatureDescription } from "../components/FloatingFeatureDescription";
import { useFeatureTour } from "../components/useFeatureTour";
import { gallery } from "../data/showcase";
import { tourDescriptions } from "../data/tour";

export function DemoHeader({ video = false }: { video?: boolean }) {
  return <ShowcaseHeader compact video={video} />;
}

export function DemoSection({ embedded = false, requestedStep = null }: { embedded?: boolean; requestedStep?: { index: number; request: number } | null }) {
  const { selected, active, phase, select, move } = useFeatureTour(gallery.length);
  const [viewerOpen, setViewerOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = gallery[active]!;
  const composition = tourDescriptions[current.screen];
  const count = `${String(active + 1).padStart(2, "0")} / ${String(gallery.length).padStart(2, "0")}`;

  useEffect(() => { if (requestedStep) select(requestedStep.index); }, [requestedStep, select]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (viewerOpen && !element.open) element.showModal();
    if (!viewerOpen && element.open) element.close();
  }, [viewerOpen]);

  const dismissViewer = (event?: MouseEvent<HTMLDialogElement>) => {
    if (!event || event.target === dialog.current) setViewerOpen(false);
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.defaultPrevented) return;
    const target = event.target as HTMLElement;
    if (target.closest("select,input,textarea,[contenteditable=true]")) return;
    if (event.key === "ArrowLeft") move(-1);
    else if (event.key === "ArrowRight") move(1);
    else if (event.key === "Home") select(0);
    else if (event.key === "End") select(gallery.length - 1);
    else return;
    event.preventDefault();
  };

  return <section className="demo-section" id={embedded ? "interactive-tour" : "demo"} aria-labelledby={embedded ? "tour-heading" : "demo-title"} onKeyDown={handleKeyboard}>
    <div className="section-wrap demo-inner">
      <div className="demo-intro"><h1 id="demo-title">Relaya <em>in action.</em></h1><p>From your first thought to your final words.</p></div>
      <div className="demo-gallery" id="demo-gallery">
        <div className="gallery-toolbar">
          <label className="demo-screen-picker"><span>Explore the app</span><select aria-label="Choose a demo screen" value={selected} onChange={(event) => select(Number(event.target.value))}>{gallery.map((item,index) => <option key={item.id} value={index}>{String(index + 1).padStart(2,"0")} · {item.title}</option>)}</select></label>
          <button className="expand-button lp-cta" type="button" onClick={() => setViewerOpen(true)}><Expand size={16} />Expand preview</button>
        </div>
        <div className={`gallery-stage tour-stage tour-composition-${composition.composition}`} id="gallery-panel" role="region" data-feature={current.screen} data-phase={phase} aria-labelledby="demo-screen-title" aria-busy={phase !== "idle"} tabIndex={0}>
          <div className="gallery-image-area tour-preview-stack">
            {gallery.map((item,index) => <div className="tour-screen-layer" key={item.id} data-active={index === active} aria-hidden={index !== active}>
              <MediaPreview src={item.src} screen={item.screen} alt={item.caption} className="gallery-screen" />
            </div>)}
          </div>
          <div className="tour-description-announcement" aria-live="polite" aria-atomic="true">
            <FloatingFeatureDescription screen={current.screen} title={current.title} index={active} total={gallery.length} />
          </div>
          <nav className="tour-navigation" aria-label="Feature navigation">
            <button type="button" className="tour-previous lp-cta" aria-label="Previous demo step" onClick={() => move(-1)}><ArrowLeft size={16} />Previous</button>
            <span className="tour-navigation-count" aria-hidden="true">{count}<span>Use ← → to explore</span></span>
            <button type="button" className="tour-next lp-cta" aria-label="Next demo step" onClick={() => move(1)}>Next<ArrowRight size={16} /></button>
          </nav>
        </div>
        <div className="gallery-replace-note"><ShieldCheck size={15} /><span>Offline demo · microphone off · no meeting connected.</span></div>
      </div>
    </div>
    <dialog className="viewer-dialog" ref={dialog} aria-label={`Expanded preview: ${current.title}`} onClose={() => setViewerOpen(false)} onClick={dismissViewer}>
      <div className="viewer-content" onClick={(event) => event.stopPropagation()}>
        <div className="viewer-top"><div><span className="eyebrow">SCREEN {count}</span><h2>{current.title}</h2></div><button type="button" aria-label="Close full screen preview" onClick={() => setViewerOpen(false)}><X size={20} /></button></div>
        <div className="viewer-stage" data-phase={phase}><MediaPreview src={current.src} screen={current.screen} alt={current.caption} className="viewer-screen" /></div>
        <div className="viewer-bottom"><button className="lp-cta" type="button" aria-label="Previous sample screen" onClick={() => move(-1)}><ArrowLeft size={18} /></button><p className="viewer-caption">{current.caption}</p><button className="lp-cta" type="button" aria-label="Next sample screen" onClick={() => move(1)}><ArrowRight size={18} /></button></div>
      </div>
    </dialog>
  </section>;
}

export function DemoPage() {
  return <main className="lp showcase demo-page app-demo-page sc-focused"><a className="skip-link" href="#demo-content">Skip to content</a><DemoHeader /><div id="demo-content"><DemoSection /></div></main>;
}
