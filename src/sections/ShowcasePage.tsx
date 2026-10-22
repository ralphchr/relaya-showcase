import { ArrowRight, Check } from "lucide-react";
import { Brand } from "../components/Brand";

/** What Relaya already does today: plain, checkable claims. */
const proof = [
  "Works in Google Meet today",
  "Checks names, numbers and “maybe”",
  "Nothing is said until you approve",
];

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
            <h1 id="hero-title">Speak clearly,<em>in your own words.</em></h1>
            <p className="hero-lead">Think in Taglish. Relaya turns it into clear English for your meeting, and it can even say it for you in Google Meet.</p>
            <ul className="hero-proof" aria-label="What Relaya does today">
              {proof.map((item) => <li key={item}><span aria-hidden="true"><Check size={13} strokeWidth={3} /></span>{item}</li>)}
            </ul>
            <div className="hero-actions">
              <a className="button button-primary" href="/demo.html">See it in action <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className="hero-visual">
            <img
              className="hero-app-snapshot"
              src="/screens/meet-output.webp"
              width={2160}
              height={1350}
              alt="A Google Meet call where Janelle's Relaya (AI) is speaking her approved sentence, beside the Relaya panel showing the sentence and a Stop button."
              fetchPriority="high"
            />
            <figcaption>Relaya speaking an approved sentence in a Google Meet call</figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
