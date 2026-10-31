const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const renderFullLesson = (day: string, source: string) => `
  <details class="lesson-source">
    <summary>Read the complete ${escapeHtml(day)} source material</summary>
    <div class="lesson-source-content">${escapeHtml(source)}</div>
  </details>
`;
