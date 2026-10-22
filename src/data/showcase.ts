import type { LucideIcon } from "lucide-react";
import { AudioLines, CheckCheck, Languages, ShieldCheck } from "lucide-react";

export type ScreenId = "setup" | "sentence" | "guard" | "say-output" | "meet-output" | "workspace" | "preferences";

export const navigation = [
  { label: "The idea", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Walkthrough", href: "#walkthrough" },
  { label: "Demo", href: "/demo.html" },
];

export const features: Array<{
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  benefit: string;
  screen: ScreenId;
  src: string | null;
  icon: LucideIcon;
}> = [
  {
    id: "natural-english",
    eyebrow: "A clear next sentence",
    title: "Keep your meaning. Find the words.",
    description: "Say your thought naturally in Taglish. Relaya shapes it into a clear English sentence that still sounds like what you meant.",
    benefit: "Join the conversation without rehearsing every sentence first.",
    screen: "sentence",
    src: null,
    icon: Languages,
  },
  {
    id: "context-guard",
    eyebrow: "Careful with the details",
    title: "Check the parts that matter.",
    description: "Context Guard checks names, numbers, and uncertainty before a sentence is ready to use.",
    benefit: "Review the wording and approve it before it is delivered.",
    screen: "guard",
    src: null,
    icon: ShieldCheck,
  },
  {
    id: "delivery-modes",
    eyebrow: "Choose how it comes out",
    title: "Your voice, or a labeled agent.",
    description: "Read the approved sentence yourself, or ask the clearly labeled Relaya agent to say it in a Google Meet call.",
    benefit: "Pick the way of speaking that feels right for that moment.",
    screen: "setup",
    src: null,
    icon: AudioLines,
  },
  {
    id: "you-decide",
    eyebrow: "You stay in control",
    title: "Nothing goes out until you say so.",
    description: "Use push-to-talk, review the proposed sentence, then approve it. You can stop the speaking agent mid-sentence.",
    benefit: "Keep the final say over what gets said in the meeting.",
    screen: "sentence",
    src: null,
    icon: CheckCheck,
  },
];

export const walkthrough: Array<{
  number: string;
  title: string;
  instruction: string;
  result: string;
  screen: ScreenId;
  src: string | null;
  label: string;
}> = [
  {
    number: "01",
    title: "Choose your way to speak",
    instruction: "Start a session and choose whether you will read the sentence yourself or have the Relaya agent speak for you.",
    result: "A session opens in the mode you picked.",
    screen: "setup",
    src: null,
    label: "Session setup",
  },
  {
    number: "02",
    title: "Set up the conversation",
    instruction: "Choose a tone, add names Relaya should recognize, and check your microphone. Speak for me also asks for a Google Meet link.",
    result: "Your session is ready with the right call context.",
    screen: "setup",
    src: null,
    label: "Tone and names",
  },
  {
    number: "03",
    title: "Say your thought naturally",
    instruction: "Hold the push-to-talk key while you speak. Release it when you are done, in Tagalog, English, or a mix of both.",
    result: "Relaya prepares a clear English sentence for you to review.",
    screen: "sentence",
    src: null,
    label: "A sentence to review",
  },
  {
    number: "04",
    title: "Review, then deliver",
    instruction: "Check names, numbers, and words like “maybe”. Edit if needed, then approve the sentence to read it or have the labeled agent say it.",
    result: "Your approved sentence is delivered in the mode you selected.",
    screen: "guard",
    src: null,
    label: "Context Guard review",
  },
];

// Register real screenshots here as they arrive. `screen` supplies the accurate
// interface recreation until a file is available; no broken-image state is shown.
export const gallery = [
  { id: "session-setup", title: "New Session", caption: "Pick how you'll speak, your tone, and the names Relaya should get right.", screen: "setup" as const, src: "/screens/setup.webp" as string | null },
  { id: "sentence-review", title: "Review your sentence", caption: "Read the suggested English before it is delivered.", screen: "sentence" as const, src: "/screens/sentence.webp" as string | null },
  { id: "context-guard", title: "Check the details", caption: "See how names, numbers, and uncertainty are reviewed.", screen: "guard" as const, src: "/screens/guard.webp" as string | null },
  { id: "say-output", title: "Say it yourself", caption: "Once you approve, the sentence shows in large type. Unmute and read it in your own voice.", screen: "say-output" as const, src: "/screens/say-output.webp" as string | null },
  { id: "meet-output", title: "Through Google Meet", caption: "Relaya joins your Google Meet as a labeled AI guest and says your approved sentence. Stop it anytime.", screen: "meet-output" as const, src: "/screens/meet-output.webp" as string | null },
  { id: "workspace-settings", title: "Voice options", caption: "Pick the voice and speed Relaya speaks with in your meetings.", screen: "workspace" as const, src: "/screens/workspace.webp" as string | null },
  { id: "session-preferences", title: "Preferences", caption: "Set your usual mode, tone, languages, and push-to-talk key.", screen: "preferences" as const, src: "/screens/preferences.webp" as string | null },
];

// Add the video path when a demonstration is ready. A designed placeholder is
// shown until then, so visitors never encounter a blank player.
export const demoVideo = {
  title: "A meeting moment, from thought to reply",
  description: "Relaya speaking for someone in a live Google Meet call, after they approve the sentence.",
  src: null as string | null,
  poster: null as string | null,
  screen: "sentence" as const,
};

export const useCases = [
  {
    number: "01",
    title: "Share an update",
    before: "“Siguro mga three days pa bago ma-deliver…”",
    after: "“It might take about three more days before we can deliver it.”",
    detail: "Keep a little uncertainty in your answer when the timing is not yet final.",
    screen: "sentence" as const,
    src: null as string | null,
  },
  {
    number: "02",
    title: "Get a detail right",
    before: "“I’ll send it to Ma’am Liza by Friday.”",
    after: "Check the name and the date before you approve.",
    detail: "Review a person’s name and a deadline before the sentence is said in the call.",
    screen: "guard" as const,
    src: null as string | null,
  },
  {
    number: "03",
    title: "Choose your speaking mode",
    before: "A thought in Taglish, said out loud.",
    after: "Read it yourself, or let the labeled agent speak.",
    detail: "Use the mode that feels comfortable for this meeting and this moment.",
    screen: "setup" as const,
    src: null as string | null,
  },
];

export const project = {
  background: "Relaya is designed for Tagalog–English speakers who want a little more room to find their words in meetings.",
  objective: "Make it easier to contribute in English while keeping the speaker in charge of the message and how it is delivered.",
  status: "In active development. The main session screens and voice flow are implemented; some account and workspace services are still in progress.",
  technologies: ["React", "TypeScript", "Vite", "Hono", "Supabase"],
  // Replace this clearly marked placeholder with approved names and roles.
  team: "Team names and roles to be added by the project owners.",
  // Replace these with an approved public contact link and its display text.
  contact: { href: null as string | null, label: "Contact details to be added by the project owners." },
};

/** The interest survey the demo page links to after the video. */
export const interestForm = {
  link: "https://docs.google.com/forms/d/e/1FAIpQLSfOrebAwLjNw-ICqqiTWSolZFm2N42TrPcBYeyCcFe6XXsCkg/viewform?usp=header",
};
