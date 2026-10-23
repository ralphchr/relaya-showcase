import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { ArrowLeft, ArrowRight, Maximize, Play, X, ZoomOut } from "lucide-react";
import { Brand } from "../components/Brand";
import { MediaPreview } from "../components/MediaPreview";
import { SectionHeading } from "../components/SectionHeading";
import { demoVideo, gallery, interestForm } from "../data/showcase";

/** After the video: a short invitation and one button to the team's Google Form. */
function InterestSection() {
  return (
    <section className="interest" id="interest" aria-labelledby="interest-title" data-reveal>
      <h2 id="interest-title">Help shape <em>Relaya.</em></h2>
      <p>Share how you communicate in meetings and what would make speaking easier. It takes just two minutes.</p>
      <a className="interest-button" href={interestForm.link} target="_blank" rel="noreferrer">I'm interested <ArrowRight size={18} aria-hidden="true" /></a>
    </section>
  );
}

export function DemoSection() {
  const [selected, setSelected] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerZoomed, setViewerZoomed] = useState(false);
  const zoomViewport = useRef<HTMLDivElement>(null);
  const zoomPointer = useRef<{ x: number; y: number } | null>(null);
  const suppressZoomClick = useRef(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = gallery[selected]!;
  const selectedVideo = Boolean(demoVideo.src && !videoFailed);
  const videoRef = useRef<HTMLVideoElement>(null);
  const changeSlide = (direction: number) => {
    setViewerZoomed(false);
    setSlideDirection(direction < 0 ? "previous" : "next");
    setSelected((index) => (index + direction + gallery.length) % gallery.length);
  };
  const selectSlide = (index: number) => {
    setViewerZoomed(false);
    setSlideDirection(index < selected ? "previous" : "next");
    setSelected(index);
  };
  // Swipe left or right on the screen to change it (phones have no tab row).
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const suppressPreviewClick = useRef(false);
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const point = event.touches[0];
    touchStart.current = point ? { x: point.clientX, y: point.clientY } : null;
    suppressPreviewClick.current = false;
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current; touchStart.current = null;
    const end = event.changedTouches[0];
    if (!start || !end) return;
    const dx = end.clientX - start.x;
    const dy = end.clientY - start.y;
    suppressPreviewClick.current = Math.max(Math.abs(dx), Math.abs(dy)) > 10;
    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy)) return;
    changeSlide(dx < 0 ? 1 : -1);
  };
  const openPicture = () => {
    if (suppressPreviewClick.current) { suppressPreviewClick.current = false; return; }
    setViewerOpen(true);
  };
  const toggleViewerZoom = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.detail > 0 && suppressZoomClick.current) return;
    setViewerZoomed((zoomed) => !zoomed);
  };

  useEffect(() => {
    const viewport = zoomViewport.current;
    if (!viewport) return;
    viewport.scrollLeft = viewerZoomed ? (viewport.scrollWidth - viewport.clientWidth) / 2 : 0;
    viewport.scrollTop = viewerZoomed ? (viewport.scrollHeight - viewport.clientHeight) / 2 : 0;
  }, [viewerZoomed]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (viewerOpen && !element.open) element.showModal();
    if (!viewerOpen) {
      if (element.open) element.close();
      setViewerZoomed(false);
    }
  }, [viewerOpen]);

  // Fetch every screen as the page opens, so switching never waits on a download.
  useEffect(() => {
    for (const item of gallery) if (item.src) { const image = new Image(); image.src = item.src; }
  }, []);

  useEffect(() => {
    if (!selectedVideo || !videoRef.current) return;
    if (videoPlaying) void videoRef.current.play().catch(() => setVideoPlaying(false));
    else videoRef.current.pause();
  }, [videoPlaying, selectedVideo]);

  const dismissViewer = (event?: MouseEvent<HTMLDialogElement>) => {
    if (!event || event.target === dialog.current) setViewerOpen(false);
  };

  return (
    <section className="demo-section" id="demo" data-slide-direction={slideDirection}>
      <div className="section-wrap demo-inner">
        <SectionHeading title={<>See <em>Relaya</em> in action.</>} description="Follow one thought from setting up a session to saying it in your meeting." />
        <div className="demo-gallery" id="demo-gallery" data-reveal>
          <div className="gallery-stage" id="gallery-panel" aria-roledescription="carousel" aria-label="Relaya sample screens" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="gallery-picture">
              <MediaPreview key={current.id} src={current.src} screen={current.screen} alt={current.caption} className="gallery-screen" />
              <button className="gallery-picture-open" type="button" aria-label={`Open ${current.title} in expanded preview`} aria-haspopup="dialog" onClick={openPicture} />
            </div>
            <button className="gallery-arrow prev" type="button" aria-label="Previous sample screen" onClick={() => changeSlide(-1)}><ArrowLeft size={18} /></button><button className="gallery-arrow next" type="button" aria-label="Next sample screen" onClick={() => changeSlide(1)}><ArrowRight size={18} /></button>
            <div className="gallery-caption"><div className="gallery-caption-copy" key={current.id} aria-live="polite" aria-atomic="true"><h3>{current.title}</h3><p>{current.caption}</p></div><div className="gallery-controls"><div className="gallery-dots" aria-label="Choose a sample screen">{gallery.map((item, index) => <button type="button" key={item.id} className={index === selected ? "active" : ""} aria-label={`Show ${item.title}`} aria-pressed={index === selected} onClick={() => selectSlide(index)} />)}</div><button className="expand-button" type="button" aria-label="Expand preview" title="Expand preview" onClick={() => setViewerOpen(true)}><Maximize size={22} strokeWidth={2.25} aria-hidden="true" /></button></div></div>
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
        <InterestSection />
      </div>
      <dialog className="viewer-dialog" ref={dialog} aria-label={`Expanded preview: ${current.title}`} onClose={() => setViewerOpen(false)} onClick={dismissViewer}>
        <div className="viewer-content" onClick={(event) => event.stopPropagation()}>
          <div className="viewer-top"><div><h2>{current.title}</h2></div><button type="button" aria-label="Close full screen preview" onClick={() => setViewerOpen(false)}><X size={20} /></button></div>
          <div className={`viewer-stage${viewerZoomed ? " viewer-is-zoomed" : ""}`}>
            <div className="viewer-picture-viewport" ref={zoomViewport}
              onPointerDown={(event) => { zoomPointer.current = { x: event.clientX, y: event.clientY }; suppressZoomClick.current = false; }}
              onPointerMove={(event) => { const start = zoomPointer.current; if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 10) suppressZoomClick.current = true; }}
              onPointerUp={() => { zoomPointer.current = null; }}
              onPointerCancel={() => { zoomPointer.current = null; suppressZoomClick.current = true; }}>
              <div className="viewer-zoom-canvas">
                <MediaPreview key={current.id} src={current.src} screen={current.screen} alt={current.caption} className="viewer-screen" />
                <button className="viewer-picture-zoom" type="button" aria-label={viewerZoomed ? "Zoom out picture" : "Zoom in picture"} aria-pressed={viewerZoomed} onClick={toggleViewerZoom} />
              </div>
            </div>
            <button className="viewer-zoom-reset" type="button" aria-label="Fit picture to screen" onClick={() => setViewerZoomed(false)}><ZoomOut size={18} />Fit</button>
            <button className="gallery-arrow prev" type="button" aria-label="Previous sample screen" onClick={() => changeSlide(-1)}><ArrowLeft size={18} /></button><button className="gallery-arrow next" type="button" aria-label="Next sample screen" onClick={() => changeSlide(1)}><ArrowRight size={18} /></button>
          </div>
          <p className="viewer-zoom-hint">{viewerZoomed ? "Drag to explore · tap the picture to zoom out" : "Tap the picture to zoom in"}</p>
          <p className="viewer-caption" key={current.id}>{current.caption}</p>
        </div>
      </dialog>
    </section>
  );
}

export function DemoPage() {
  const page = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = page.current;
    if (!root || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: "0px 0px -16px 0px" });
    root.classList.add("motion-ready");
    root.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => { observer.disconnect(); root.classList.remove("motion-ready"); };
  }, []);
  return (
    <main className="showcase demo-page" ref={page}>
      <a className="skip-link" href="#demo-content">Skip to content</a>
      <header className="site-header">
        <div className="site-header-inner">
          <Brand />
          <nav className="showcase-header-nav" aria-label="Main navigation"><a href="/">HOME</a><a href="/demo.html" aria-current="page">DEMO</a></nav>
        </div>
      </header>
      <div id="demo-content"><DemoSection /></div>
    </main>
  );
}
