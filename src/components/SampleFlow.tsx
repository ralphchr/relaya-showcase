import { useEffect, useState } from "react";
import { Check, Languages, Mic, Play, RotateCcw, TextCursorInput } from "lucide-react";

const stages = [
  { title: "Speak", detail: "Hold to record your thought.", icon: Mic, style: "hold", text: "“Siguro mga three days pa bago ma-deliver.”", label: "Your thought · Taglish" },
  { title: "Transcribe", detail: "Release to turn speech into text.", icon: TextCursorInput, style: "guard", text: "Siguro mga three days pa bago ma-deliver.", label: "What you said" },
  { title: "Translate", detail: "Shape it into clear English.", icon: Languages, style: "hold", text: "It might take about three more days before we can deliver it.", label: "Relaya’s suggested English" },
  { title: "Understand", detail: "Check, approve, then deliver.", icon: Check, style: "ok", text: "It might take about three more days before we can deliver it.", label: "Your meaning, ready to share" },
];

export function SampleFlow() {
  const [active, setActive] = useState(3);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (active === 3) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setActive((step) => step + 1), 1300);
    return () => window.clearTimeout(timer);
  }, [active, playing]);
  const current = stages[active]!;
  return <section className="lp-how sc-how" id="how-it-works" aria-labelledby="how-title">
    <svg className="lp-wave-top" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 C 240 0 480 80 720 40 S 1200 0 1440 40 V0 H0 Z" /></svg>
    <h2 className="lp-h2" id="how-title" data-lp-reveal>From thought <em>to clear English.</em></h2>
    <ol className="lp-steps sc-four-steps" data-lp-reveal>{stages.map(({ title, detail, icon: Icon, style },index) => <li key={title} className={playing && active === index ? "sc-step-active" : ""}><span className={`lp-step-art lp-step-${style}`}><Icon aria-hidden="true" /></span><b>{title}</b><small>{detail}</small></li>)}</ol>
    <div className="lp-price sc-flow-example" data-lp-reveal>
      <div className="sc-flow-top"><span className="lp-tag">Illustrative sample</span><button className="lp-cta" type="button" disabled={playing} onClick={() => { setActive(0); setPlaying(true); }}>{playing ? "Playing example…" : <><span>Replay the example</span>{active === 3 ? <RotateCcw className="lp-i" /> : <Play className="lp-i" />}</>}</button></div>
      <div className="sc-flow-result" aria-live="polite" aria-atomic="true"><span>{current.label}</span><p key={active}>{current.text}</p></div>
      <p className="sc-section-note">An animated example of the flow. Your microphone stays off. In the app, you review every sentence before either delivery mode uses it.</p>
    </div>
  </section>;
}
