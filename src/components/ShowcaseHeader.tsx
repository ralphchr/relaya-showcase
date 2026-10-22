import { ArrowLeft, ArrowRight } from "lucide-react";

export function ShowcaseBrand({ size = 34 }: { size?: number }) {
  return <a className="lp-brand" href="/" aria-label="Relaya home" onClick={(event) => {
    if (window.location.pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }}><img src="/assets/relaya-logo.png" alt="" width={size} height={size} /><span>RELAYA</span></a>;
}

export function ShowcaseHeader({ compact = false, video = false }: { compact?: boolean; video?: boolean }) {
  return <header className="lp-bar"><div className="lp-bar-in">
    <ShowcaseBrand />
    {!compact && <nav className="lp-nav" aria-label="Main navigation"><a href="#demo">Explore the demo</a><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#use-cases">Use cases</a></nav>}
    {compact ? <nav className="sc-compact-links" aria-label="Demo navigation"><a className="lp-cta" href={video ? "/demo.html" : "/video.html"}>{video ? "App demo" : "Video demo"}<ArrowRight className="lp-i" /></a><a className="lp-cta sc-back" href="/" aria-label="Back to showcase"><ArrowLeft className="lp-i" /><span>Showcase</span></a></nav> : <a className="lp-cta header-cta" href="#interest">I’m interested<ArrowRight className="lp-i" aria-hidden="true" /></a>}
  </div></header>;
}
