import { ArrowRight, Check, Mic, Sparkles } from "lucide-react";
import { Brand } from "../components/Brand";

export function ShowcasePage() {
  return (
    <main className="showcase landing-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" id="top">
        <div className="site-header-inner">
          <Brand />
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
            <div className="snapshot-atmosphere" aria-hidden="true">
              <span className="snapshot-halo" />
              <span className="snapshot-orbit" />
              <Sparkles className="snapshot-sparkle snapshot-sparkle-one" size={24} />
              <Sparkles className="snapshot-sparkle snapshot-sparkle-two" size={17} />
              <span className="snapshot-dot snapshot-dot-one" />
              <span className="snapshot-dot snapshot-dot-two" />
            </div>
            <div className="visual-label"><span className="status-dot" /> PRODUCT PREVIEW</div>
            <img
              className="hero-app-snapshot"
              src="/screenshots/relaya-new-session-live.png"
              width={965}
              height={631}
              alt="Relaya's New Session screen with Say it yourself and Speak for me modes, tone selection, names, and Start session controls."
              fetchPriority="high"
            />
            <div className="snapshot-float snapshot-language" aria-hidden="true">
              <span className="snapshot-float-icon"><Sparkles size={20} /></span>
              <span><small>Your words, only clearer</small><strong>Taglish <ArrowRight size={13} /> English</strong></span>
            </div>
            <div className="snapshot-float snapshot-voice" aria-hidden="true">
              <Mic size={22} />
              <span className="snapshot-wave"><i /><i /><i /><i /><i /></span>
            </div>
            <div className="snapshot-float snapshot-approval" aria-hidden="true">
              <span className="snapshot-float-icon"><Check size={20} /></span>
              <span><strong>You’re in control</strong><small>You approve first.</small></span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
