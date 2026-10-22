import { AudioLines, Check, CheckCheck, ChevronDown, CircleHelp, Headphones, Mic, MoreHorizontal, ShieldCheck, Sparkles, UserRound, Users, X } from "lucide-react";
import type { ScreenId } from "../data/showcase";

const nav = [
  { title: "New session", icon: Sparkles },
  { title: "Sessions", icon: Headphones },
  { title: "Names", icon: Users },
  { title: "Voice", icon: AudioLines },
];

function AppRail() {
  return (
    <aside className="mock-rail" aria-label="Sample app navigation">
      <div className="mock-mini-brand"><span className="mock-logo"><Sparkles size={14} /></span><b>Relaya</b></div>
      <div className="mock-nav-label">WORKSPACE</div>
      {nav.map(({ title, icon: Icon }, index) => (
        <div className={`mock-nav-item${index === 0 ? " active" : ""}`} key={title}><Icon size={14} /><span>{title}</span></div>
      ))}
      <div className="mock-rail-bottom"><div className="mock-user"><span>JD</span><i><b>Jamie Dela Cruz</b><small>Free plan</small></i><MoreHorizontal size={16} /></div></div>
    </aside>
  );
}

function SetupScreen() {
  return (
    <>
      <div className="mock-topbar"><span>New session</span><span className="mock-help"><CircleHelp size={13} /> Help</span></div>
      <div className="mock-content setup-content">
        <div className="mock-hello">GOOD MORNING, JAMIE</div>
        <h3>Find your words.</h3>
        <p className="mock-lead">How would you like to speak in this call?</p>
        <div className="mock-mode-grid">
          <div className="mock-mode-card"><img src="/assets/say.svg" alt="" /><div><b>Say it yourself</b><small>Read the sentence in your own voice.</small></div><span className="mock-radio checked"><i /></span></div>
          <div className="mock-mode-card"><img src="/assets/speak.svg" alt="" /><div><b>Speak for me</b><small>A labeled Relaya agent speaks in Google Meet.</small></div><span className="mock-radio" /></div>
        </div>
        <div className="mock-config-row"><span><small>TONE</small><b>Professional <ChevronDown size={12} /></b></span><span><small>PRONUNCIATION NAMES</small><b>Jamie, Liza <ChevronDown size={12} /></b></span></div>
        <div className="mock-start-row"><span className="mock-mic-ready"><Mic size={13} /> Microphone ready</span><span className="mock-start">Start session <span>→</span></span></div>
      </div>
    </>
  );
}

function SentenceScreen() {
  return (
    <>
      <div className="mock-topbar"><span>Say it yourself <span className="mock-tag">SAMPLE SESSION</span></span><span className="mock-stop"><X size={13} /> End session</span></div>
      <div className="mock-content sentence-content">
        <div className="mock-call-label"><span className="mock-live-dot" />SESSION READY <span>•</span> PROFESSIONAL TONE</div>
        <div className="mock-panel-title"><div><h3>Let’s get your thought out.</h3><p>Hold the key while you speak naturally.</p></div><span className="mock-key"><kbd>SPACE</kbd></span></div>
        <div className="mock-record-button"><Mic size={17} />Hold to speak<span className="mock-eq"><i /><i /><i /><i /><i /></span></div>
        <div className="mock-output-label">SUGGESTED SENTENCE <span><ShieldCheck size={13} /> Checked by Context Guard</span></div>
        <div className="mock-sentence-card"><div className="mock-sentence-brand"><span className="mock-logo"><Sparkles size={12} /></span><span>Relaya</span><b><Check size={11} /> Ready to review</b></div><p>It <mark>might take about three more days</mark> before we can deliver it.</p><div className="mock-actions"><span><span><X size={12} /> Edit</span><span><CheckCheck size={12} /> Approve &amp; say it</span></span><small>Space to record</small></div></div>
        <div className="mock-privacy-line"><ShieldCheck size={12} /> Your sentence is only delivered after you approve it.</div>
      </div>
    </>
  );
}

function GuardScreen() {
  return (
    <>
      <div className="mock-topbar"><span>Review sentence <span className="mock-tag">CONTEXT GUARD</span></span><span className="mock-draft">Draft 01</span></div>
      <div className="mock-content guard-content">
        <div className="mock-guard-intro"><span className="mock-shield"><ShieldCheck size={19} /></span><div><h3>Check the details.</h3><p>Make sure your meaning comes through.</p></div></div>
        <div className="mock-before"><small>YOUR THOUGHT</small><p>“Siguro mga three days pa bago ma-deliver, kay Ma’am Liza.”</p></div>
        <div className="mock-after"><div className="mock-after-head"><small>SUGGESTED ENGLISH</small><span><Check size={11} /> Ready for your review</span></div><p>It <mark>might take about three more days</mark> before we can deliver it to <b>Ma’am Liza.</b></p></div>
        <div className="mock-check-list"><span><i><Check size={11} /></i> “Siguro” kept as <b>might</b></span><span><i><Check size={11} /></i> Name kept as <b>Ma’am Liza</b></span><span><i><Check size={11} /></i> Timing kept as <b>three days</b></span></div>
        <div className="mock-guard-actions"><span className="mock-edit">Edit sentence</span><span className="mock-approve"><CheckCheck size={13} /> Approve sentence</span></div>
      </div>
    </>
  );
}

function WorkspaceScreen() {
  return (
    <>
      <div className="mock-topbar"><span>Personal settings</span><span className="mock-saved"><Check size={12} /> Saved on this device</span></div>
      <div className="mock-content workspace-content">
        <div className="mock-workspace-intro"><div className="mock-avatar"><UserRound size={16} /></div><div><h3>Set up your session.</h3><p>Small details make a sentence feel like yours.</p></div></div>
        <div className="mock-tabs"><span className="selected">Names &amp; words</span><span>Voice</span></div>
        <div className="mock-settings-card"><div className="mock-settings-heading"><div><b>Names for this call</b><small>Help Relaya keep names consistent.</small></div><span>Default list</span></div><div className="mock-name-chips"><span>Ma’am Liza <X size={10} /></span><span>Quezon City <X size={10} /></span><span className="mock-add-name">+ Add a name</span></div><div className="mock-note"><ShieldCheck size={12} /> Names are available to help with this session.</div></div>
      </div>
    </>
  );
}

export function ScreenPreview({ screen, className = "", alt }: { screen: ScreenId; className?: string; alt: string }) {
  const content = {
    setup: <SetupScreen />,
    sentence: <SentenceScreen />,
    guard: <GuardScreen />,
    workspace: <WorkspaceScreen />,
  }[screen];

  return (
    <div className={`screen-preview screen-${screen} ${className}`} role="img" aria-label={alt}>
      <AppRail />
      <div className="mock-app-main">{content}</div>
    </div>
  );
}
