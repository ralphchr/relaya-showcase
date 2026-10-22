import type { ScreenId } from "./showcase";

export type TourPosition = "top-left" | "top-right" | "upper-left" | "bottom-right" | "right-center" | "bottom-left" | "upper-right";
export type TourComposition = "center" | "preview-right" | "preview-left";

/** Position and composition can be adjusted independently for every feature. */
export const tourDescriptions: Record<ScreenId, {
  position: TourPosition;
  composition: TourComposition;
  description: string;
  accent: "pink" | "green" | "gold";
}> = {
  setup: { position: "top-left", composition: "preview-right", description: "Choose how you’ll speak, set your tone, and add names for the conversation.", accent: "pink" },
  sentence: { position: "top-right", composition: "center", description: "Your thought becomes clear English. Read the suggestion and approve it when it feels right.", accent: "green" },
  guard: { position: "upper-left", composition: "center", description: "Check names, numbers, and uncertainty. Here, keeping “might” preserves what “siguro” means.", accent: "gold" },
  "say-output": { position: "bottom-right", composition: "center", description: "Unmute in your call and read the approved sentence in your own voice. Choose Done when you finish.", accent: "green" },
  "meet-output": { position: "right-center", composition: "preview-left", description: "Your labeled AI guest says the approved sentence in Google Meet. You can stop playback at any time.", accent: "pink" },
  workspace: { position: "bottom-left", composition: "preview-right", description: "Pick one of six voices, adjust the speaking speed, and give your AI guest a name.", accent: "pink" },
  preferences: { position: "upper-right", composition: "preview-left", description: "Make it yours: default mode, tone, languages, voice profile, and push-to-talk key.", accent: "gold" },
};
