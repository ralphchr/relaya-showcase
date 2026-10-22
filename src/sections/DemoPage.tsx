import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowLeft, ArrowRight, CirclePlay, Expand, Mic, Play, ShieldCheck, Sparkles, Volume2, X } from "lucide-react";
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

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (viewerOpen && !element.open) element.showModal();
    if (!viewerOpen && element.open) element.close();
  }, [viewerOpen]);

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
        <SectionHeading eyebrow="Take a closer look" title={<>A closer look at<br /><em>Relaya in action.</em></>} description="Browse the app preview and a sample session. This is a guided demonstration, not a connected Relaya account." />
        <div className="demo-gallery" id="demo-gallery" data-reveal>
          <div className="gallery-toolbar"><div className="gallery-tabs" role="tablist" aria-label="Relaya sample screens">
            {gallery.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={index === selected} aria-controls="gallery-panel" id={`gallery-tab-${item.id}`} className={index === selected ? "active" : ""} onClick={() => setSelected(index)}>{item.title}</button>)}
          </div><button className="expand-button" type="button" onClick={() => setViewerOpen(true)}><Expand size={15} /> Expand preview</button></div>
          <div className="gallery-stage" id="gallery-panel" role="tabpanel" aria-labelledby={`gallery-tab-${current.id}`}>
            <div className="gallery-stage-wash" aria-hidden="true" />
            <MediaPreview key={current.id} src={current.src} screen={current.screen} alt={current.caption} className="gallery-screen" />
            <div className="gallery-badge"><span className="status-dot" /> SAMPLE SCREEN <i /> OFFLINE DEMO</div>
            <button className="gallery-arrow prev" type="button" aria-label="Previous sample screen" onClick={() => changeSlide(-1)}><ArrowLeft size={18} /></button><button className="gallery-arrow next" type="button" aria-label="Next sample screen" onClick={() => changeSlide(1)}><ArrowRight size={18} /></button>
            <div className="gallery-caption"><div><span>SCREEN 0{selected + 1} / 0{gallery.length}</span><h3>{current.title}</h3><p>{current.caption}</p></div><div className="gallery-dots" aria-label="Choose a sample screen">{gallery.map((item, index) => <button type="button" key={item.id} className={index === selected ? "active" : ""} aria-label={`Show ${item.title}`} aria-pressed={index === selected} onClick={() => setSelected(index)} />)}</div></div>
          </div>
          <div className="gallery-replace-note"><ShieldCheck size={14} /><span>Sample preview only. Your microphone stays off and no meeting is connected.</span></div>
        </div>
        <div className="video-demo" data-reveal>
          <div className="video-copy"><p className="eyebrow"><span />Video demonstration</p><h3>{demoVideo.title}</h3><p>{demoVideo.description}</p>{!selectedVideo && <div className="video-coming"><span><CirclePlay size={16} /></span><b>Demo video coming soon</b><small>Drop an MP4 or WebM into <code>public/videos/</code> and add its path in <code>src/data/showcase.ts</code>.</small></div>}</div>
          <div className="video-frame">
            {selectedVideo ? <video ref={videoRef} controls playsInline preload="metadata" poster={demoVideo.poster ?? undefined} src={demoVideo.src!} aria-label={demoVideo.title} onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)} onError={() => setVideoFailed(true)} /> : <><div className="video-art" aria-hidden="true"><div className="video-art-window"><div className="video-art-bar"><i /><i /><i /><span>Relaya · sample session</span></div><div className="video-art-wave"><span><Mic size={14} /> TAGLISH THOUGHT</span><div>{[20, 34, 15, 28, 42, 23, 38, 18, 31, 16, 36, 22, 42, 17, 29, 38, 20, 32, 16, 25, 39].map((height, i) => <i key={i} style={{ height }} />)}</div></div><div className="video-art-card"><span><Sparkles size={12} /> RELAYA SUGGESTS</span><p>It <mark>might take about three more days</mark> before we can deliver it.</p><small><ShieldCheck size={12} /> Review before you approve</small></div></div><span className="video-preview-label"><span /> A LOOK INSIDE A SAMPLE SESSION</span></div><span className="video-play-overlay" aria-hidden="true"><span className="play-button"><Play size={19} fill="currentColor" /></span></span><div className="video-controls" aria-hidden="true"><span><Play size={12} fill="currentColor" /></span><i><b /></i><small>Demo video placeholder</small><Volume2 size={14} /><Expand size={14} /></div></>}
          </div>
        </div>
      </div>
      <dialog className="viewer-dialog" ref={dialog} aria-label={`Expanded preview: ${current.title}`} onClose={() => setViewerOpen(false)} onClick={dismissViewer}>
        <div className="viewer-content" onClick={(event) => event.stopPropagation()}>
          <div className="viewer-top"><div><span className="eyebrow"><span />SAMPLE SCREEN 0{selected + 1}</span><h2>{current.title}</h2></div><button type="button" aria-label="Close full screen preview" onClick={() => setViewerOpen(false)}><X size={20} /></button></div>
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
            <ArrowLeft size={16} aria-hidden="true" /> Back to showcase
          </a>
        </div>
      </header>
      <div id="demo-content"><DemoSection /></div>
    </main>
  );
}
