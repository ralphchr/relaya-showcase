import { ArrowRight, Mic, Sparkles } from "lucide-react";
import { Brand } from "../components/Brand";

export function ShowcasePage() {
  return (
    <main className="showcase landing-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" id="top">
        <div className="site-header-inner">
          <Brand />
          <nav className="showcase-header-nav" aria-label="Main navigation"><a href="/" aria-current="page">HOME</a><a href="/demo.html">FEATURES</a></nav>
        </div>
      </header>
      <section className="hero" id="main-content" aria-labelledby="hero-title">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="landing-accents" aria-hidden="true">
              <Sparkles className="landing-spark landing-spark-top" />
              <span className="landing-voice"><Mic size={16} /><span className="landing-voice-bars">{[8,15,22,12,18,9].map((height,index) => <i key={index} style={{height}} />)}</span></span>
              <Sparkles className="landing-spark landing-spark-bottom" />
              <i className="landing-dot landing-dot-one" /><i className="landing-dot landing-dot-two" />
            </div>
            <h1 id="hero-title">Speak clearly,<em>in your own words.</em></h1>
            <p className="hero-lead">Say it the way it comes to you. Relaya turns it into clear English for your meeting, and nothing is said until you approve it.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="/demo.html">Explore demo <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-visual">
            <img
              className="hero-app-snapshot"
              src="/screenshots/relaya-new-session-live.png"
              width={1140}
              height={640}
              alt="Relaya's New Session screen with Say it yourself and Speak for me modes, tone selection, names, and Start session controls."
              fetchPriority="high"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
