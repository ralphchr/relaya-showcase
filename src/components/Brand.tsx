export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand${compact ? " brand-compact" : ""}`} href="#top" aria-label="Relaya home">
      <img src="/assets/relaya-logo.png" width="38" height="38" alt="" />
      <span>RELAYA</span>
    </a>
  );
}
