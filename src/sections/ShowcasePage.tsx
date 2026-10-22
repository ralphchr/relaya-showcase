import { ArrowRight, Sparkles } from "lucide-react";
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
            <div className="visual-label"><span className="status-dot" /> PRODUCT PREVIEW</div>
            <img
              className="hero-app-snapshot"
              src="/screenshots/relaya-new-session-live.png"
              width={965}
              height={631}
              alt="Relaya's New Session screen with Say it yourself and Speak for me modes, tone selection, names, and Start session controls."
              fetchPriority="high"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
