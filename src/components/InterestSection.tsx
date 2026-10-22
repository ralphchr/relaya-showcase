import { ArrowUpRight, ClipboardList } from "lucide-react";
import { googleFormLinks, interestForm } from "../data/interest";

export function InterestSection() {
  const links = googleFormLinks(interestForm);
  return <section className="lp-close sc-interest" id="interest" aria-labelledby="interest-title">
    <svg className="lp-wave-top lp-wave-light" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C 240 80 480 0 720 40 S 1200 80 1440 30 V0 H0 Z" /></svg>
    <div className="sc-interest-intro" data-lp-reveal><h2 id="interest-title">Interested in <em>Relaya?</em></h2><p>We’d love to know how Relaya could help you communicate better.</p></div>
    <div className="lp-price sc-form-card" data-lp-reveal>
      {links.embedUrl ? <iframe className="sc-form-frame" title="Relaya interest survey" src={links.embedUrl} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /> : <div className="sc-form-placeholder"><span className="lp-mode-ic"><ClipboardList className="lp-i" aria-hidden="true" /></span><h3>Tell us where you’d use Relaya.</h3><p>Our interest survey is coming soon. Share the moments, languages, and conversations you’d like a little help with.</p><span className="lp-chip lp-chip-green">Google Forms survey · coming soon</span></div>}
      {links.openUrl ? <a className="lp-btn lp-btn-ghost" href={links.openUrl} target="_blank" rel="noopener noreferrer">Open survey in a new tab<ArrowUpRight className="lp-i" /></a> : <p className="sc-form-note">The survey link will appear here when it’s ready.</p>}
    </div>
  </section>;
}
