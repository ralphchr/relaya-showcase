import { useState } from "react";
import { CirclePlay, Expand, Mic, Play, ShieldCheck, Sparkles, Volume2 } from "lucide-react";
import { DemoHeader } from "./DemoPage";
import { demoVideo } from "../data/showcase";

export function VideoPage() {
  const [videoFailed, setVideoFailed] = useState(false);
  const selectedVideo = Boolean(demoVideo.src && !videoFailed);
  return <main className="lp showcase demo-page video-page">
    <DemoHeader video />
    <section className="video-page-content" aria-label="Video demonstration">
        <div className="video-demo" data-reveal>
          <div className="video-copy"><p className="eyebrow"><span />Video demonstration</p><h3>{demoVideo.title}</h3><p>{demoVideo.description}</p>{!selectedVideo && <div className="video-coming"><span><CirclePlay size={16} /></span><b>Demo video coming soon</b><small>A recorded walkthrough of the review and delivery flow will appear here.</small></div>}</div>
          <div className="video-frame">
            {selectedVideo ? <video controls playsInline preload="metadata" poster={demoVideo.poster ?? undefined} src={demoVideo.src!} aria-label={demoVideo.title} onError={() => setVideoFailed(true)} /> : <><div className="video-art" aria-hidden="true"><div className="video-art-window"><div className="video-art-bar"><i /><i /><i /><span>Relaya · sample session</span></div><div className="video-art-wave"><span><Mic size={14} /> TAGLISH THOUGHT</span><div>{[20, 34, 15, 28, 42, 23, 38, 18, 31, 16, 36, 22, 42, 17, 29, 38, 20, 32, 16, 25, 39].map((height, i) => <i key={i} style={{ height }} />)}</div></div><div className="video-art-card"><span><Sparkles size={12} /> RELAYA SUGGESTS</span><p>It <mark>might take about three more days</mark> before we can deliver it.</p><small><ShieldCheck size={12} /> Review before you approve</small></div></div><span className="video-preview-label"><span /> A LOOK INSIDE A SAMPLE SESSION</span></div><span className="video-play-overlay" aria-hidden="true"><span className="play-button"><Play size={19} fill="currentColor" /></span></span><div className="video-controls" aria-hidden="true"><span><Play size={12} fill="currentColor" /></span><i><b /></i><small>Demo video placeholder</small><Volume2 size={14} /><Expand size={14} /></div></>}
          </div>
        </div>
    </section>
  </main>;
}
