import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, AudioLines, Check, ChevronDown, CirclePlay, Expand, Menu, Mic, Play, ShieldCheck, Sparkles, Users, Volume2, X } from "lucide-react";
import { Brand } from "../components/Brand";
import { MediaPreview } from "../components/MediaPreview";
import { SectionHeading } from "../components/SectionHeading";
import { demoVideo, features, gallery, navigation, project, useCases, walkthrough } from "../data/showcase";

const prefersReducedMotion = () => typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header" id="top">
      <div className="site-header-inner">
        <Brand />
        <nav className={`site-nav${menuOpen ? " is-open" : ""}`} id="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        </nav>
        <a className="header-demo" href="/demo.html">Explore demo <ArrowRight size={16} aria-hidden="true" /></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-orb orb-a" aria-hidden="true" /><div className="hero-orb orb-b" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy" data-reveal>
          <span className="hero-pill"><Sparkles size={15} aria-hidden="true" /> Taglish in. Clear English out.</span>
          <h1 id="hero-title">Speak clearly,<br /><em>in your own words.</em></h1>
          <p>Find the English for what you want to say in a meeting. Review the sentence, then choose how it gets delivered.</p>
          <div className="hero-actions"><a className="button button-primary" href="/demo.html">Explore demo <ArrowRight size={17} /></a></div>
          <div className="hero-proof"><span><Check size={14} /> You review before it is said</span><i aria-hidden="true" /><span><Check size={14} /> Two ways to speak</span></div>
        </div>
        <div className="hero-visual" data-reveal>
          <div className="visual-glow" aria-hidden="true" />
          <div className="visual-label"><span className="status-dot" /> PRODUCT PREVIEW <span className="label-divider" /> SAMPLE DATA</div>
          <MediaPreview screen="sentence" alt="Recreated Relaya sentence review screen showing a Taglish thought and an English suggestion" className="hero-screen" />
          <div className="hero-float float-guard"><span><ShieldCheck size={16} /></span><b>Meaning checked</b><small>“Siguro” kept as “might”</small></div>
          <div className="hero-float float-approve"><span><Check size={15} /></span>You approve first</div>
          <span className="hero-sticker" aria-hidden="true"><AudioLines size={19} /> Hear<br />yourself</span>
        </div>
      </div>
      <svg className="hero-wave" viewBox="0 0 1440 92" preserveAspectRatio="none" aria-hidden="true"><path d="M0,42 C188,76 313,5 515,38 C727,72 858,83 1041,44 C1197,11 1308,16 1440,39 L1440,92 L0,92 Z" /></svg>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section section-wrap" id="about">
      <SectionHeading eyebrow="A little more room to speak" title={<>A thought in Taglish.<br /><em>A reply that feels like you.</em></>} description="Meetings move quickly. Sometimes the thought is clear, but the English takes a moment. Relaya helps bridge that gap while keeping you in charge." />
      <div className="about-grid">
        <article className="about-story" data-reveal>
          <span className="story-icon"><Mic size={20} /></span>
          <h3>For the moment you want to join in.</h3>
          <p>Relaya is a Tagalog–English meeting communication assistant. Speak naturally, get a clear English suggestion, and decide whether you want to say it yourself or use a labeled agent in Google Meet.</p>
          <a className="text-link" href="#walkthrough">See how it works <ArrowRight size={15} /></a>
        </article>
        <div className="about-sample" data-reveal>
          <div className="sample-label"><span>FROM THOUGHT</span><i /><span>TO A CLEAR REPLY</span></div>
          <div className="sample-bubble"><span className="language-chip">TAGLISH</span><p>“Siguro mga three days pa bago ma-deliver…”</p><span className="sample-tail" /></div>
          <div className="sample-arrow"><ArrowDown size={19} /></div>
          <div className="sample-result"><div><span className="sample-brand-dot"><Sparkles size={13} /></span><b>Relaya</b><span className="clear-chip"><Check size={12} /> Clear</span></div><p>It <mark>might take about three more days</mark> before we can deliver it.</p></div>
          <div className="sample-foot"><ShieldCheck size={14} /> Uncertainty kept in the sentence</div>
        </div>
      </div>
    </section>
  );
}

function FeatureExplorer() {
  const [activeId, setActiveId] = useState(features[0]?.id ?? "");
  const active = features.find((feature) => feature.id === activeId) ?? features[0]!;
  return (
    <section className="feature-section" id="features">
      <div className="section-wrap feature-inner">
        <SectionHeading eyebrow="Made for real conversations" title={<>Small moments make<br /><em>a big difference.</em></>} description="Explore the tools that help you find a clear reply and stay in control of how it is said." />
        <div className="feature-explorer" data-reveal>
          <div className="feature-list" role="tablist" aria-label="Relaya product features">
            {features.map(({ id, eyebrow, title, icon: Icon }, index) => (
              <button className={`feature-tab${activeId === id ? " selected" : ""}`} type="button" role="tab" id={`tab-${id}`} aria-selected={activeId === id} aria-controls="feature-panel" tabIndex={activeId === id ? 0 : -1} key={id} onClick={() => setActiveId(id)} onKeyDown={(event) => {
                if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const indexNow = features.findIndex((feature) => feature.id === activeId);
                const next = event.key === "Home" ? 0 : event.key === "End" ? features.length - 1 : (indexNow + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1) + features.length) % features.length;
                setActiveId(features[next]!.id);
                document.getElementById(`tab-${features[next]!.id}`)?.focus();
              }}>
                <span className="feature-tab-icon"><Icon size={17} /></span><span><small>{eyebrow}</small><b>{title}</b></span><span className="feature-tab-number">0{index + 1}</span>
              </button>
            ))}
          </div>
          <article className="feature-detail" role="tabpanel" id="feature-panel" aria-labelledby={`tab-${active.id}`} key={active.id}>
            <div className="feature-detail-copy"><p className="eyebrow"><span />{active.eyebrow}</p><h3>{active.title}</h3><p>{active.description}</p><div className="feature-benefit"><span><Check size={15} /></span><p>{active.benefit}</p></div><a href="#walkthrough" className="text-link">See this in the walkthrough <ArrowRight size={15} /></a></div>
            <div className="feature-screen-wrap"><span className="feature-screen-caption"><span className="status-dot" /> Interface recreation <span>•</span> Sample data</span><MediaPreview src={active.src} screen={active.screen} alt={`Relaya ${active.eyebrow.toLowerCase()} interface recreation`} className="feature-screen" /></div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Walkthrough() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = walkthrough[activeIndex]!;
  const setStep = (index: number) => setActiveIndex((index + walkthrough.length) % walkthrough.length);
  return (
    <section className="walkthrough-section section-wrap" id="walkthrough">
      <SectionHeading eyebrow="A typical session" title={<>From thought to reply,<br /><em>one step at a time.</em></>} description="Take a guided look at the flow. This preview uses sample content and has no live meeting connection." />
      <div className="walkthrough" data-reveal>
        <div className="walkthrough-side">
          <div className="walkthrough-progress"><span>{active.number}</span><i /><small>04</small></div>
          <ol className="step-list">
            {walkthrough.map((step, index) => (
              <li key={step.number}>
                <button className={`step-button${index === activeIndex ? " active" : ""}`} type="button" aria-current={index === activeIndex ? "step" : undefined} onClick={() => setStep(index)}>
                  <span className="step-index">{index < activeIndex ? <Check size={14} /> : step.number}</span><span><small>{step.label}</small><b>{step.title}</b></span><ChevronDown className="step-chevron" size={16} />
                </button>
              </li>
            ))}
          </ol>
          <div className="step-detail" aria-live="polite"><p>{active.instruction}</p><span><Check size={14} />{active.result}</span></div>
          <div className="step-controls"><button type="button" onClick={() => setStep(activeIndex - 1)} aria-label="Previous step"><ArrowLeft size={16} /></button><span>Use arrows or choose a step</span><button type="button" onClick={() => setStep(activeIndex + 1)} aria-label="Next step"><ArrowRight size={16} /></button></div>
        </div>
        <div className="walkthrough-preview"><div className="preview-topline"><span><span className="preview-pulse" /> STEP {active.number}</span><span>{active.label}</span></div><MediaPreview key={active.screen} src={active.src} screen={active.screen} alt={`Step ${active.number}: ${active.label} interface recreation`} className="walkthrough-screen" /><div className="preview-note"><ShieldCheck size={14} /><span>Illustrative interface with sample details. The full product is not running here.</span></div></div>
      </div>
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
          <div className="gallery-replace-note"><ShieldCheck size={14} /><span>Interface recreations are shown until real screenshots are added. Replace them from one media list in the showcase configuration.</span></div>
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

function UseCases() {
  return (
    <section className="usecase-section section-wrap" id="use-cases">
      <SectionHeading eyebrow="In the moment" title={<>Made for the replies<br /><em>that move things forward.</em></>} description="A few everyday meeting moments where finding the right sentence can help." />
      <div className="usecase-grid" data-reveal>
        {useCases.map((item) => <article className="usecase-card" key={item.number}><div className="usecase-top"><span>{item.number}</span><MediaPreview src={item.src} screen={item.screen} alt="" className="usecase-screen" /></div><div className="usecase-content"><h3>{item.title}</h3><div className="usecase-flow"><small>YOUR MOMENT</small><p>{item.before}</p><ArrowDown size={15} aria-hidden="true" /><small>WITH RELAYA</small><p className="usecase-after">{item.after}</p></div><p className="usecase-detail">{item.detail}</p></div></article>)}
      </div>
    </section>
  );
}

function ProjectSection() {
  return (
    <section className="project-section" id="project">
      <div className="section-wrap project-inner">
        <div className="project-heading"><SectionHeading eyebrow="A work in progress" title={<>Built around people,<br /><em>one conversation at a time.</em></>} description={project.background} align="left" /><p className="project-objective">{project.objective}</p></div>
        <div className="project-details" data-reveal>
          <div className="project-card project-status"><span className="project-icon"><Sparkles size={18} /></span><div><small>PROJECT STATUS</small><p>{project.status}</p></div></div>
          <div className="project-card project-stack"><span className="project-icon"><AudioLines size={18} /></span><div><small>TECHNOLOGY</small><ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div></div>
          <div className="project-card project-team"><span className="project-icon"><Users size={18} /></span><div><small>THE TEAM</small><p>{project.team}</p></div></div>
          <p className="privacy-fact"><ShieldCheck size={16} /><span>The voice pipeline is designed not to store recordings or transcript text. This showcase runs on sample data and is not connected to the live app.</span></p>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main"><div className="footer-brand"><Brand compact /><p>Find your words.<br />Keep your voice.</p></div><div className="footer-nav"><div><small>EXPLORE</small><a href="#about">The idea</a><a href="#features">Features</a><a href="#walkthrough">Walkthrough</a><a href="/demo.html">Product demo</a></div><div><small>ABOUT RELAYA</small><a href="#project">Project details</a><a href="#use-cases">Ways to use it</a><a href="#top">Back to top ↑</a></div><div><small>CONTACT</small>{project.contact.href ? <a href={project.contact.href}>Contact the project team</a> : <span className="footer-placeholder">{project.contact.label}</span>}</div></div><a className="footer-cta" href="/demo.html">Take a look around <ArrowRight size={16} /></a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Relaya · Product showcase</span><span>Made for clearer Tagalog–English conversations.</span><a href="#top" aria-label="Back to top">↑</a></div>
    </footer>
  );
}

export function ShowcasePage() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -32px 0px" });
    targets.forEach((target) => observer.observe(target));
    return () => { observer.disconnect(); document.documentElement.classList.remove("motion-ready"); };
  }, []);

  return (
    <main className="showcase">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <div id="main-content"><Hero /><AboutSection /><FeatureExplorer /><Walkthrough /><UseCases /><ProjectSection /></div>
      <section className="closing-section"><span className="closing-mark"><Sparkles size={20} /></span><h2>Let’s find <em>your words.</em></h2><p>Take a look at how Relaya can help the next time you have something to say.</p><a className="button button-light" href="/demo.html">Explore the demo <ArrowRight size={16} /></a><svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 42 C240 80 480 0 720 40 S1200 80 1440 30V0H0Z" /></svg></section>
      <SiteFooter />
    </main>
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
