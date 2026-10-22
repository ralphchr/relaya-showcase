import type { ReactNode } from "react";
import { ArrowRight, Bell, BookOpenText, Check, ChevronDown, ChevronUp, CircleHelp, LogOut, Mic, PanelLeft, Pencil, PictureInPicture2, Play, Plus, RotateCcw, Search, Settings, ShieldAlert, ShieldCheck, Volume2 } from "lucide-react";
import type { ScreenId } from "../data/showcase";

function Mark({ size = 30 }: { size?: number }) {
  return <img className="brand-logo" src="/assets/relaya-logo.png" width={size} height={size} alt="" />;
}

function WorkspaceShell({ title, children }: { title: string; children: ReactNode }) {
  const navigation = [{ title: "New Session", icon: Plus }, { title: "Glossary", icon: BookOpenText }, { title: "Voice", icon: Volume2 }, { title: "Settings", icon: Settings }];
  return (
    <div className="app">
      <aside className="side" aria-label="Sidebar">
        <div className="side-top">
          <span className="side-brand"><span className="brand"><Mark size={32} /><span className="wordmark">RELAYA</span></span></span>
          <span className="side-ic side-search"><Search className="icon" /></span>
          <span className="side-ic side-toggle"><PanelLeft className="icon" /></span>
        </div>
        <nav className="nav">{navigation.map(({ title: label, icon: Icon }) => <span key={label} className={`nav-i${title === label ? " on" : ""}`}><Icon className="icon" /><span className="nav-label">{label}</span></span>)}</nav>
        <div className="recents">
          <div className="rec-l"><span>Recents</span><span className="rec-all">See all</span></div>
          <div className="rec-g"><div className="rec-day">Today</div>{["11:35 AM", "10:26 AM", "10:03 AM"].map(time => <div className="rec-i" key={time}><span className="rec-mode">Say it yourself</span><small className="rec-when">{time}</small></div>)}</div>
        </div>
        <div className="account-anchor"><div className="me"><span className="av">D</span><span className="me-text is-ready"><b>Dana Dela Cruz</b><small>Free plan · 8 of 8 sessions left</small></span><ChevronUp className="me-chev" /></div></div>
      </aside>
      <section className="app-main">
        <header className="topbar"><h1 className="pt">{title}</h1><div className="tb-r"><span className="tb-ic"><CircleHelp className="icon" /></span><span className="tb-ic"><Bell className="icon" /></span></div></header>
        <main className="app-body"><div className="col">{children}</div></main>
      </section>
    </div>
  );
}

function SetupScreen() {
  return (
    <WorkspaceShell title="New Session">
      <div className="launch">
        <div className="launch-glow" aria-hidden="true"><i /><i /></div>
        <p className="launch-date">Magandang Gabi, Tara Na!</p>
        <h2 className="launch-title">Ready for your call, Dana?</h2>
        <p className="launch-lead">Pick how you’ll speak. Relaya handles the English.</p>
        <div className="launch-card">
          <div className="launch-modes">
            {[{ id: "say", title: "Say it yourself", description: "You read it aloud · no AI in the call" }, { id: "speak", title: "Speak for me", description: "Your labeled Relaya says it for you" }].map(mode => (
              <button className={`ln-mode${mode.id === "say" ? " on" : ""}`} type="button" key={mode.id}>
                <span className="ln-art"><img src={`/assets/${mode.id}.svg`} alt="" /></span>
                <span className="ln-text"><b>{mode.title}</b><small>{mode.description}</small></span>
                <span className="ln-radio">{mode.id === "say" && <Check className="icon" strokeWidth={3} />}</span>
              </button>
            ))}
          </div>
          <div className="ln-row">
            <div className="ln-tone"><button className="on" type="button">Professional</button><button type="button">Casual</button></div>
            <div className="names-dd"><button className="ln-field names-trigger" type="button"><small>Names</small><b className="muted">Add names</b><ChevronDown className="icon" /></button></div>
            <button type="button" className="ln-mic is-ready">Mic ready<span className="mic-bars"><i /><i /><i /><i /><i /></span></button>
            <button type="button" className="btn btn-coral ln-go">Start session<ArrowRight className="icon" /></button>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
}

function ReviewScreen({ flagged = false }: { flagged?: boolean }) {
  return (
    <div className="session-page">
      <aside className="rpanel" aria-label="Relaya panel">
        <header className="rp-top">
          <Mark /><span className="mode-pill"><Mic className="icon" />Say it yourself</span><span className="spacer" />
          <div className="tone-picker tone"><button className="tone-picker-trigger" type="button"><span>Professional</span><ChevronDown className="icon" /></button></div>
          <button type="button" className="icon-btn sm" aria-label="Pop out beside your meeting"><PictureInPicture2 className="icon" /></button>
          <button type="button" className="icon-btn sm danger" aria-label="End session"><LogOut className="icon" /></button>
        </header>
        <div className="rp-body">
          <div className="guest-preview-banner">Guest preview · sample responses</div>
          <section className={`draft${flagged ? " warn" : ""}`} aria-label="Context Guard">
            <div className="draft-said">
              <div className="draft-said-head"><span className="ibadge in"><Mic className="icon" /></span><span className="mini-tag">Tagalog</span><span className="mini-tag">English</span><button className="draft-edit" type="button"><Pencil className="icon" />Edit</button></div>
              <div className="said">Siguro mga three days pa bago ma-deliver.</div>
            </div>
            <div className="draft-say">
              <div className="draft-say-head"><span className="l"><Mark size={26} /></span><span className="draft-say-tools">{!flagged && <button className="draft-edit" type="button"><Pencil className="icon" />Edit</button>}<span className={`g-badge${flagged ? " warn" : ""}`}>{flagged ? <ShieldAlert className="icon" /> : <ShieldCheck className="icon" />}{flagged ? "1 to check" : "Checked"}</span></span></div>
              <p className="willsay">It <span className={flagged ? "mark-warn" : "diff"}>{flagged ? "will" : "might"} take about three more days</span> before we can deliver it.</p>
              {flagged && <div className="flag"><div className="f-top">You said “siguro” (maybe)</div><div className="opts"><button type="button" className="opt rec"><Check className="icon" strokeWidth={3} /><b>Keep “might”</b></button><button type="button" className="opt"><ArrowRight className="icon" /><b>Use as is</b></button><button type="button" className="opt"><RotateCcw className="icon" /><b>Re-record</b></button></div></div>}
            </div>
          </section>
        </div>
        <div className="rp-foot"><div className={`actions${flagged ? "" : " approve-focus"}`}><button type="button" className="icon-btn" aria-label="Record again"><RotateCcw className="icon" /></button><button type="button" className={`btn btn-green${flagged ? " is-waiting" : ""}`}>{flagged ? "Check the highlight first" : <><Check className="icon" />Approve &amp; say it</>}</button></div></div>
      </aside>
    </div>
  );
}

function VoiceScreen() {
  const voices = [{ name: "Heart", accent: "American", gender: "female" }, { name: "Bella", accent: "American", gender: "female" }, { name: "Emma", accent: "British", gender: "female" }, { name: "Michael", accent: "American", gender: "male" }, { name: "Fenrir", accent: "American", gender: "male" }, { name: "George", accent: "British", gender: "male" }];
  return (
    <WorkspaceShell title="Voice">
      <div className="workspace-page">
        <div className="workspace-intro"><p className="workspace-eyebrow">SPEAK FOR ME</p><div className="workspace-intro-row"><div><h2>Your agent’s voice and name</h2><p>Pick how your Relaya sounds and what people see when it joins a meeting.</p></div></div></div>
        <section className="workspace-card settings-card">
          <h3>Voice</h3>
          <div className="voice-grid">{voices.map((voice, index) => <div key={voice.name} className={`voice-option${index === 0 ? " selected" : ""}`}><button className="voice-pick" type="button"><span className="voice-check">{index === 0 && <Check size={14} strokeWidth={3} />}</span><span><b>{voice.name}</b><small>{voice.accent} · {voice.gender}</small></span></button><button className="icon-action" type="button" aria-label={`Play ${voice.name}`}><Play size={16} /></button></div>)}</div>
          <label className="workspace-field"><span>Speaking speed <b>1.00×</b></span><small>The samples play at this speed too.</small><input type="range" className="speed-range" min="0.8" max="1.2" defaultValue="1" step="0.05" /><span className="speed-scale"><span>Slower</span><span>Natural</span><span>Faster</span></span></label>
          <label className="workspace-field"><span>Agent name</span><small>People in the meeting see <b>Dana’s Relaya (AI)</b>. The AI label is always added. If the agent signs in with its own Google account, Meet shows that account’s name instead.</small><input defaultValue="Dana’s Relaya" /></label>
          <div className="workspace-actions"><button type="button" className="wp-button wp-button-primary">Save</button></div>
          <p className="workspace-local-note">You’re in the preview workspace, so this is saved in this browser only. Sign in to keep it in your account.</p>
        </section>
      </div>
    </WorkspaceShell>
  );
}

export function OriginalScreens({ screen }: { screen: ScreenId }) {
  if (screen === "sentence") return <ReviewScreen />;
  if (screen === "guard") return <ReviewScreen flagged />;
  if (screen === "workspace") return <VoiceScreen />;
  return <SetupScreen />;
}
