const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const renderFullLesson = (day: string, source: string) => `
  <details style="margin:2rem 0 0; overflow:hidden; border:1px solid rgba(253,191,104,.35); border-radius:1rem; background:rgba(15,23,42,.65);">
    <summary style="cursor:pointer; padding:1rem 1.25rem; color:#fdbf68; font-weight:700;">Read the complete ${escapeHtml(day)} source material</summary>
    <div style="border-top:1px solid rgba(255,255,255,.12); padding:1.25rem; color:#e2e8f0; font-size:.95rem; line-height:1.75; white-space:pre-wrap; overflow-wrap:anywhere;">${escapeHtml(source)}</div>
  </details>
`;
