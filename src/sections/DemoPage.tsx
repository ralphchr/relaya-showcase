import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { ArrowLeft, ArrowRight, Maximize, Play, X } from "lucide-react";
import { Brand } from "../components/Brand";
import { MediaPreview } from "../components/MediaPreview";
import { SectionHeading } from "../components/SectionHeading";
import { demoVideo, gallery } from "../data/showcase";

export function DemoSection() {
  const [selected, setSelected] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = gallery[selected]!;
  const selectedVideo = Boolean(demoVideo.src && !videoFailed);
  const videoRef = useRef<HTMLVideoElement>(null);
  const changeSlide = (direction: number) => setSelected((index) => (index + direction + gallery.length) % gallery.length);
  // Swipe left or right on the screen to change it (phones have no tab row).
  const touchX = useRef<number | null>(null);
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => { touchX.current = event.touches[0]?.clientX ?? null; };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchX.current; touchX.current = null;
    const end = event.changedTouches[0]?.clientX;
    if (start === null || end === undefined || Math.abs(end - start) < 40) return;
    changeSlide(end < start ? 1 : -1);
  };

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (viewerOpen && !element.open) element.showModal();
    if (!viewerOpen && element.open) element.close();
  }, [viewerOpen]);

  // Keep the chosen tab in view when the row scrolls sideways.
  useEffect(() => {
    const tab = document.getElementById(`gallery-tab-${gallery[selected]!.id}`);
    const row = tab?.parentElement;
    if (!tab || !row) return;
    // Scroll only the tab row, never the page.
    const left = tab.offsetLeft - row.offsetLeft, right = left + tab.offsetWidth;
    if (left < row.scrollLeft) row.scrollTo({ left: left - 8, behavior: "smooth" });
    else if (right > row.scrollLeft + row.clientWidth) row.scrollTo({ left: right - row.clientWidth + 8, behavior: "smooth" });
  }, [selected]);

  useEffect(() => {
    if (!selectedVideo || !videoRef.current) return;
    if (videoPlaying) void videoRef.current.play().catch(() => setVideoPlaying(false));
    else videoRef.current.pause();
  }, [videoPlaying, selectedVideo]);

  const dismissViewer = (event?: MouseEvent<HTMLDialogElement>) => {
    if (!event || event.target === dialog.current) setViewerOpen(false);
  };

  return (
    <section className="demo-section" id="demo">
      <div className="section-wrap demo-inner">
        <SectionHeading title={<>See <em>Relaya</em> in action.</>} description="From setting up a session to saying it in your meeting." />
        <div className="demo-gallery" id="demo-gallery" data-reveal>
          <div className="gallery-toolbar"><div className="gallery-tabs" role="tablist" aria-label="Relaya sample screens">
            {gallery.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={index === selected} aria-controls="gallery-panel" id={`gallery-tab-${item.id}`} className={index === selected ? "active" : ""} onClick={() => setSelected(index)}>{item.title}</button>)}
          </div><button className="expand-button" type="button" aria-label="Expand preview" onClick={() => setViewerOpen(true)}><Maximize size={14} strokeWidth={2.25} /><span className="expand-label">Expand preview</span></button></div>
          <div className="gallery-stage" id="gallery-panel" role="tabpanel" aria-labelledby={`gallery-tab-${current.id}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <MediaPreview key={current.id} src={current.src} screen={current.screen} alt={current.caption} className="gallery-screen" />
            <button className="gallery-arrow prev" type="button" aria-label="Previous sample screen" onClick={() => changeSlide(-1)}><ArrowLeft size={18} /></button><button className="gallery-arrow next" type="button" aria-label="Next sample screen" onClick={() => changeSlide(1)}><ArrowRight size={18} /></button>
            <div className="gallery-caption"><div><h3>{current.title}</h3><p>{current.caption}</p></div><div className="gallery-dots" aria-label="Choose a sample screen">{gallery.map((item, index) => <button type="button" key={item.id} className={index === selected ? "active" : ""} aria-label={`Show ${item.title}`} aria-pressed={index === selected} onClick={() => setSelected(index)} />)}</div></div>
          </div>
        </div>
        <div className="video-demo" data-reveal>
          <div className="video-copy"><h3>{demoVideo.title}</h3><p>{demoVideo.description}</p></div>
          <div className="video-frame">
            {selectedVideo
              ? <video ref={videoRef} controls playsInline preload="metadata" poster={demoVideo.poster ?? undefined} src={demoVideo.src!} aria-label={demoVideo.title} onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)} onError={() => setVideoFailed(true)} />
              : <div className="video-soon"><span className="video-soon-play"><Play size={26} fill="currentColor" aria-hidden="true" /></span><b>Demo video coming soon</b></div>}
          </div>
        </div>
      </div>
      <dialog className="viewer-dialog" ref={dialog} aria-label={`Expanded preview: ${current.title}`} onClose={() => setViewerOpen(false)} onClick={dismissViewer}>
        <div className="viewer-content" onClick={(event) => event.stopPropagation()}>
          <div className="viewer-top"><div><h2>{current.title}</h2></div><button type="button" aria-label="Close full screen preview" onClick={() => setViewerOpen(false)}><X size={20} /></button></div>
          <div className="viewer-stage"><MediaPreview src={current.src} screen={current.screen} alt={current.caption} className="viewer-screen" /><button className="gallery-arrow prev" type="button" aria-label="Previous sample screen" onClick={() => changeSlide(-1)}><ArrowLeft size={18} /></button><button className="gallery-arrow next" type="button" aria-label="Next sample screen" onClick={() => changeSlide(1)}><ArrowRight size={18} /></button></div>
          <p className="viewer-caption">{current.caption}</p>
        </div>
      </dialog>
    </section>
  );
}

export function DemoPage() {
  return (
    <main className="showcase demo-page">
      <a className="skip-link" href="#demo-content">Skip to content</a>
      <header className="site-header">
        <div className="site-header-inner">
          <Brand />
          <a className="header-demo demo-back" href="/">
            <ArrowLeft size={16} aria-hidden="true" /> Back
          </a>
        </div>
      </header>
      <div id="demo-content"><DemoSection /></div>
    </main>
  );
}
