import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";
import { ArrowLeft, ArrowRight, Maximize, Play, X } from "lucide-react";
import { Brand } from "../components/Brand";
import { MediaPreview } from "../components/MediaPreview";
import { SectionHeading } from "../components/SectionHeading";
import { demoVideo, gallery, interestForm } from "../data/showcase";

/** After the video: a short invitation and one button to the team's Google Form. */
function InterestSection() {
  return (
    <section className="interest" id="interest" aria-labelledby="interest-title" data-reveal>
      <h2 id="interest-title">Would you use <em>Relaya?</em></h2>
      <p>Tell us how you speak in meetings and what would help you most. It only takes a couple of minutes.</p>
      <a className="interest-button" href={interestForm.link} target="_blank" rel="noreferrer">I'm interested <ArrowRight size={18} aria-hidden="true" /></a>
    </section>
  );
}

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
    <section className="demo-section" id="demo">
      <div className="section-wrap demo-inner">
        <SectionHeading title={<>See <em>Relaya</em> in action.</>} description="Follow one thought from setting up a session to saying it in your meeting." />
        <div className="demo-gallery" id="demo-gallery" data-reveal>
          <div className="gallery-stage" id="gallery-panel" aria-roledescription="carousel" aria-label="Relaya sample screens" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <button className="expand-button" type="button" aria-label="Expand preview" title="Expand preview" onClick={() => setViewerOpen(true)}><Maximize size={22} strokeWidth={2.25} aria-hidden="true" /></button>
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
        <InterestSection />
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
          <a className="header-demo demo-back" href="/"><ArrowLeft size={16} aria-hidden="true" /> Back</a>
        </div>
      </header>
      <div id="demo-content"><DemoSection /></div>
    </main>
  );
}
