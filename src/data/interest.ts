/** Shareable interest survey link. */
export const interestForm = {
  embedUrl: "",
  openUrl: "https://forms.gle/Z9F4tvDdGTXo46it6",
};

export function googleFormLinks(config: { embedUrl: string; openUrl: string }) {
  let embed: URL | null = null;
  let open: URL | null = null;
  try {
    const candidate = new URL(config.embedUrl);
    if (candidate.protocol === "https:" && candidate.hostname === "docs.google.com" && candidate.pathname.startsWith("/forms/") && candidate.pathname.endsWith("/viewform")) {
      candidate.searchParams.set("embedded", "true");
      embed = candidate;
    }
  } catch { /* An empty URL intentionally displays the survey placeholder. */ }
  try {
    const candidate = new URL(config.openUrl);
    if (candidate.protocol === "https:" && ((candidate.hostname === "docs.google.com" && candidate.pathname.startsWith("/forms/")) || candidate.hostname === "forms.gle")) open = candidate;
  } catch { /* Derive the fallback from a configured embed when possible. */ }
  if (!open && embed) { open = new URL(embed); open.searchParams.delete("embedded"); }
  return { embedUrl: embed?.href ?? null, openUrl: open?.href ?? null };
}
