const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderTextWithLinks = (value: string) => {
  const urlPattern = /(?:https?:\/\/|www\.)[^\s<>"']+/gi;
  let html = "";
  let textStart = 0;

  for (const match of value.matchAll(urlPattern)) {
    const rawUrl = match[0];
    const punctuation = rawUrl.match(/[.,!?;:)\]]+$/)?.[0] ?? "";
    const url = rawUrl.slice(0, rawUrl.length - punctuation.length);
    const index = match.index ?? 0;

    if (!url) continue;

    const href = /^www\./i.test(url) ? `https://${url}` : url;
    html +=
      escapeHtml(value.slice(textStart, index)) +
      `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a>` +
      escapeHtml(punctuation);
    textStart = index + rawUrl.length;
  }

  return html + escapeHtml(value.slice(textStart));
};

const isBullet = (line: string) => /^(?:[●•▪◦○\u0000]|o\s+|-\s+)/.test(line);

const minorHeadingWords = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "by",
  "for",
  "from",
  "in",
  "into",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
]);

const isTitleCaseHeading = (line: string) => {
  const words = line.match(/[A-Za-z][A-Za-z'-]*/g) ?? [];

  return (
    words.length >= 2 &&
    words.length <= 9 &&
    words.every(
      (word, index) =>
        index === 0 ||
        minorHeadingWords.has(word.toLowerCase()) ||
        word[0] === word[0].toUpperCase()
    )
  );
};

const isHeading = (line: string) =>
  line.length <= 100 &&
  (/^\d+[.)]\s+\S/.test(line) ||
    /^(?:Topic\s+\d+:|Basic \(Mandatory\)|Advanced \(Optional\)|Key takeaways|Learning outcomes|Day \d+:)/i.test(
      line
    ) ||
    (!/[.!?]$/.test(line) &&
      (/^[A-Z][^.!?]{2,58}:$/.test(line) || isTitleCaseHeading(line))));

export const renderFullLesson = (day: string, source: string) => {
  const dayNumber = day.match(/\d+/)?.[0];
  const dayHeading = dayNumber
    ? new RegExp(`^Day[-\\s]*0?${dayNumber}\\b`, "i")
    : null;

  const cleanSource = source
    .replace(/\(\s*sources?\s*\)/gi, "")
    .replace(/\[(?:R\d+)(?:\]\[R\d+)*\]/g, "")
    .replace(
      /Sources are cited in the text[\s\S]{0,180}?document\./gi,
      ""
    );
  const lines = cleanSource
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => !/^Page\s+\d+$/i.test(line));
  const lessonStartIndex = lines.findIndex((line) => dayHeading?.test(line));
  const lessonLines =
    lessonStartIndex === -1
      ? lines
      : lines.slice(lessonStartIndex + 1);
  const referenceIndex = lessonLines.findIndex((line) =>
    /^(?:References|Ref Source Link)$/i.test(line)
  );
  const lessonBody =
    referenceIndex === -1 ? lessonLines : lessonLines.slice(0, referenceIndex);
  const lessonBlocks = lessonBody
    .join("\n")
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean))
    .filter((block) => block.length > 0);
  let contentStarted = lessonStartIndex !== -1;
  let skippingReadingList = false;
  const content: string[] = [];

  for (const block of lessonBlocks) {
    const lines = block.filter((line) => {
      if (
        !contentStarted &&
        (/^Module(?::\s*\d+|\s+\d+\s*:)/i.test(line) ||
          /^Days?\s+[\d,\s–—-]+$/i.test(line) ||
          (dayHeading && dayHeading.test(line)))
      ) {
        return false;
      }

      contentStarted = true;
      return true;
    });

    if (lines.length === 0) continue;

    let paragraph: string[] = [];
    let list: string[] = [];

    const flushParagraph = () => {
      if (paragraph.length) {
        content.push(`<p>${renderTextWithLinks(paragraph.join(" "))}</p>`);
        paragraph = [];
      }
    };
    const flushList = () => {
      if (list.length) {
        content.push(
          `<ul>${list.map((item) => `<li>${renderTextWithLinks(item)}</li>`).join("")}</ul>`
        );
        list = [];
      }
    };

    for (const line of lines) {
      const heading = line.replace(/^[●•▪◦○\u0000]\s*/, "");
      if (/^Learning pathway for\b/i.test(heading)) {
        skippingReadingList = true;
        continue;
      }

      if (skippingReadingList) {
        if (!isHeading(heading)) continue;
        skippingReadingList = false;
      }

      if (isHeading(heading)) {
        flushParagraph();
        flushList();
        content.push(`<h4>${escapeHtml(heading)}</h4>`);
        continue;
      }

      if (isBullet(line)) {
        flushParagraph();
        list.push(line.replace(/^(?:[●•▪◦○\u0000]|o\s+|-\s+)/, "").trim());
        continue;
      }

      if (list.length) {
        list[list.length - 1] += ` ${line}`;
        continue;
      }

      paragraph.push(line);
    }

    flushParagraph();
    flushList();
  }

  return `<div class="lesson-material">${content.join("")}</div>`;
};
