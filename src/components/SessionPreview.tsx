import { ArrowRight, Check, ChevronDown } from "lucide-react";
import "./session-preview.css";

/** A compact, static illustration of the real /new interface. */
export function SessionPreview() {
  return (
    <figure className="session-preview" role="img" aria-label="Relaya New Session preview: choose Say it yourself or Speak for me, select a tone, add names, and start your session.">
      <div className="session-preview-bar">
        <img src="/assets/relaya-logo.png" alt="" width="24" height="24" />
        <span>New Session</span>
        <small>PREVIEW</small>
      </div>
      <div className="session-preview-body">
        <h3>Ready for your call?</h3>
        <p className="session-preview-lead">Pick how you’ll speak. Relaya handles the English.</p>
        <div className="session-preview-modes">
          <div className="session-preview-mode is-selected">
            <span className="session-preview-art"><img src="/assets/say.svg" alt="" width="118" height="74" /></span>
            <span className="session-preview-mode-copy"><b>Say it yourself</b><small>You read it aloud · no AI in the call</small></span>
            <span className="session-preview-radio"><Check size={12} strokeWidth={3} /></span>
          </div>
          <div className="session-preview-mode">
            <span className="session-preview-art"><img src="/assets/speak.svg" alt="" width="118" height="74" /></span>
            <span className="session-preview-mode-copy"><b>Speak for me</b><small>Your labeled Relaya says it for you</small></span>
            <span className="session-preview-radio" />
          </div>
        </div>
        <div className="session-preview-settings">
          <div className="session-preview-tone"><span>Professional</span><span>Casual</span></div>
          <div className="session-preview-names"><span>Names</span><b>Add names</b><ChevronDown size={13} /></div>
        </div>
        <div className="session-preview-start">Start session <ArrowRight size={17} /></div>
      </div>
    </figure>
  );
}
