import { useEffect, useRef } from "react";
import { ArrowRight, Check, Languages, Mic, Pencil, ShieldCheck, Sparkles, Volume2 } from "lucide-react";
import { DemoSection } from "./DemoPage";
import { InterestSection } from "../components/InterestSection";
import { SampleFlow } from "../components/SampleFlow";
import { ShowcaseBrand, ShowcaseHeader } from "../components/ShowcaseHeader";

const capabilities = [
  { title: "Mixed-language speech", detail: "Speak in Tagalog, Bisaya, English, or a mix. Choose your usual languages in Preferences.", icon: Mic },
  { title: "Clear English suggestions", detail: "Turn a recorded thought into a sentence you can review, with your meaning kept intact.", icon: Languages },
  { title: "Code-switch naturally", detail: "Start with the words that come naturally. You don’t need to translate in your head first.", icon: Sparkles },
  { title: "Context Guard", detail: "Look closely at names, numbers, and uncertainty. Keep “maybe” when that’s what you meant.", icon: ShieldCheck },
  { title: "Your final say", detail: "Edit the suggested sentence and approve it before you read it or the agent speaks.", icon: Pencil },
  { title: "A voice in Google Meet", detail: "An admitted, clearly labeled AI guest speaks only your approved sentences. Stop it anytime.", icon: Volume2 },
];
const situations = [
  { title: "A project update", before: "“Siguro mga three days pa bago ma-deliver.”", after: "“It might take about three more days before we can deliver it.”", detail: "Keep uncertainty in a deadline instead of accidentally making a promise." },
  { title: "A class discussion", before: "“May idea ako, pero hindi ko ma-explain in English.”", after: "Start with your own words. Review the English before you share it.", detail: "Use Say it yourself to read a prepared sentence in your own voice." },
  { title: "An online meeting", before: "A thought in Taglish. A reply your team understands.", after: "Let your labeled Relaya guest say the sentence you approved.", detail: "Choose Speak for me for Google Meet, then pick the voice and pace." },
];

export function ShowcasePage() {
  const page = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = page.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-lp-reveal]"));
    if (!("IntersectionObserver" in window)) return;
    root.classList.add("lp-motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .16, rootMargin: "0px 0px -36px 0px" });
    targets.forEach((target) => observer.observe(target));
    return () => { observer.disconnect(); root.classList.remove("lp-motion-ready"); };
  }, []);

  return <main className="lp demo-page sc-page" ref={page}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <ShowcaseHeader />
    <section className="lp-hero" id="main-content" aria-labelledby="showcase-title">
      <i className="lp-blob lp-blob-a" aria-hidden="true" /><i className="lp-blob lp-blob-b" aria-hidden="true" />
      <div className="lp-hero-in">
        <div className="lp-hero-copy" data-lp-hero-copy>
          <span className="lp-pill"><Sparkles className="lp-i" aria-hidden="true" />A closer look at Relaya.</span>
          <h1 id="showcase-title">See Relaya <em>in action.</em></h1>
          <p className="sc-hero-lead">From a thought in Taglish to clear English. Explore the app, follow a sentence, and see how you stay in control.</p>
          <div className="lp-actions"><a className="lp-btn lp-btn-coral" href="#demo">Explore the demo<ArrowRight className="lp-i" aria-hidden="true" /></a><a className="lp-btn lp-btn-ghost" href="#interest">I’m interested</a></div>
        </div>
        <div className="lp-stage sc-hero-preview" data-lp-hero-stage>
          <div className="sc-preview-art">
            <img src="/screenshots/relaya-new-session-live.png" alt="Relaya’s New Session screen with speaking mode and tone options" width={965} height={631} />
            <div className="sc-preview-float sc-preview-language" aria-hidden="true"><span className="sc-preview-icon"><Languages /></span><span>Taglish <ArrowRight /> <strong>Clear English</strong></span></div>
            <div className="sc-preview-float sc-preview-voice" aria-hidden="true"><Mic /><span className="sc-preview-wave">{[10,18,26,14,30,22,12].map((height,index) => <i key={index} style={{height}} />)}</span></div>
            <div className="sc-preview-float sc-preview-approval" aria-hidden="true"><span className="sc-preview-icon"><Check /></span><span>Your words.<br /><strong>Your final say.</strong></span></div>
            <Sparkles className="sc-preview-spark sc-preview-spark-top" aria-hidden="true" />
            <Sparkles className="sc-preview-spark sc-preview-spark-bottom" aria-hidden="true" />
          </div>
        </div>
      </div>
      <svg className="lp-wave-edge" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 34 C 180 72 350 12 540 32 C 720 52 880 72 1060 38 C 1210 10 1320 16 1440 38 V90 H0 Z" /></svg>
    </section>

    <section className="sc-product" id="demo" aria-labelledby="tour-heading">
      <div className="sc-section-intro" data-lp-reveal><span className="lp-pill"><Sparkles className="lp-i" />Explore the product</span><h2 className="lp-h2" id="tour-heading">The app, <em>step by step.</em></h2><p>Choose a screen. Follow a thought all the way to delivery, then make the voice and preferences your own.</p></div>
      <div className="sc-tour-shell"><DemoSection embedded /></div>
      <div className="sc-demo-disclosure"><p>Guided preview with sample data. New Session uses an original app screenshot; the other screens use Relaya’s app styles. Google Meet is illustrated.</p><a className="lp-cta" href="/demo.html">Open focused demo<ArrowRight className="lp-i" /></a></div>
    </section>

    <section className="sc-features lp-pricing" id="features" aria-labelledby="features-title">
      <svg className="lp-pricing-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 34 C 180 5 360 66 545 35 C 730 5 910 11 1080 35 C 1220 55 1330 54 1440 28 V60 H0 Z" /></svg>
      <div className="lp-pricing-intro" data-lp-reveal><h2 className="lp-h2" id="features-title">A little help. <em>At every step.</em></h2><p className="sc-section-lead">Record a thought. Review the English. Choose how it’s heard.</p></div>
      <div className="lp-price-grid" data-lp-reveal>{capabilities.map(({title,detail,icon:Icon}) => <article className="lp-price sc-feature" key={title}><span className="lp-mode-ic"><Icon className="lp-i" aria-hidden="true" /></span><h3>{title}</h3><p>{detail}</p></article>)}</div>
      <p className="sc-section-note sc-capability-note">The app processes a recorded thought after you release push-to-talk. This showcase uses sample text; it doesn’t run live speech recognition or join a call.</p>
    </section>

    <SampleFlow />

    <section className="lp-modes sc-delivery" aria-labelledby="delivery-title">
      <h2 className="lp-h2" id="delivery-title" data-lp-reveal>Two ways to <em>share the result.</em></h2>
      <div className="lp-mode-grid" data-lp-reveal>
        <article className="lp-mode lp-mode-say"><img src="/assets/say.svg" alt="Person reading a prepared sentence beside a video call" /><div className="lp-mode-foot"><span className="lp-mode-ic"><Mic className="lp-i" /></span><div><h3>Say it yourself</h3><p>Read the approved English in your own voice.</p></div></div></article>
        <article className="lp-mode lp-mode-speak"><img src="/assets/speak.svg" alt="A clearly labeled Relaya AI guest speaking in a video call" /><div className="lp-mode-foot"><span className="lp-mode-ic"><Volume2 className="lp-i" /></span><div><h3>Speak for me</h3><p>Your labeled AI guest speaks in Google Meet.</p></div></div></article>
      </div>
    </section>

    <section className="lp-pricing sc-use-cases" id="use-cases" aria-labelledby="use-cases-title">
      <div className="lp-pricing-intro" data-lp-reveal><h2 className="lp-h2" id="use-cases-title">Real moments. <em>Your own words.</em></h2><p className="sc-section-lead">A few ways the same flow can help. These are illustrative examples.</p></div>
      <div className="lp-price-grid" data-lp-reveal>{situations.map(item => <article className="lp-price sc-use-case" key={item.title}><h3>{item.title}</h3><blockquote>{item.before}</blockquote><ArrowRight className="sc-case-arrow" aria-hidden="true" /><p className="sc-case-result">{item.after}</p><p>{item.detail}</p></article>)}</div>
    </section>

    <InterestSection />
    <footer className="lp-foot"><div className="lp-foot-in"><ShowcaseBrand size={28} /><nav className="lp-foot-links" aria-label="Footer"><a href="/video.html">Video demo</a><a href="#interest">Interest survey</a><span>© 2026 Relaya</span></nav></div></footer>
  </main>;
}
