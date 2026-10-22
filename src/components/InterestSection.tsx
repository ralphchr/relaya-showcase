import { ArrowUpRight } from "lucide-react";
import { googleFormLinks, interestForm } from "../data/interest";

export function InterestSection() {
  const links = googleFormLinks(interestForm);
  return <section className="lp-close sc-interest" id="interest" aria-labelledby="interest-title">
    <svg className="lp-wave-top lp-wave-light" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C 240 80 480 0 720 40 S 1200 80 1440 30 V0 H0 Z" /></svg>
    <div className="sc-interest-intro" data-lp-reveal><h2 id="interest-title">Interested in <em>Relaya?</em></h2><p>We’d love to know how Relaya could help you communicate better.</p></div>
    {links.openUrl && <a className="lp-btn lp-btn-ghost" href={links.openUrl} target="_blank" rel="noopener noreferrer" data-lp-reveal>Take the interest survey<ArrowUpRight className="lp-i" /></a>}
  </section>;
}
