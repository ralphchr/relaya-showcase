import { ArrowRight, AudioLines, Check, ShieldCheck, Sparkles } from "lucide-react";
import { Brand } from "../components/Brand";
import { MediaPreview } from "../components/MediaPreview";

export function ShowcasePage() {
  return (
    <main className="showcase landing-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" id="top">
        <div className="site-header-inner">
          <Brand />
          <a className="header-demo" href="/demo.html">Explore demo <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
      </header>
      <section className="hero" id="main-content" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-pill"><Sparkles size={15} aria-hidden="true" />Taglish in. Clear English out.</span>
            <h1 id="hero-title">Speak clearly,<em>in your own words.</em></h1>
            <div className="hero-actions">
              <a className="button button-primary" href="/demo.html">Explore demo <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-label"><span className="status-dot" /> PRODUCT PREVIEW <span className="label-divider" /> SAMPLE DATA</div>
            <MediaPreview screen="sentence" alt="Relaya sentence review screen with a sample English suggestion" className="hero-screen" />
            <div className="hero-float float-guard"><span><ShieldCheck size={16} /></span><b>Meaning checked</b><small>“Siguro” kept as “might”</small></div>
            <div className="hero-float float-approve"><span><Check size={15} /></span>You approve first</div>
            <span className="hero-sticker" aria-hidden="true"><AudioLines size={19} /> Hear<br />yourself</span>
          </div>
        </div>
      </section>
    </main>
  );
}
