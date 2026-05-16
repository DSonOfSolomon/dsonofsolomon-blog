const PREVIEW_CHARACTER_LIMIT = 220;

function truncatePreview(text: string) {
  if (text.length <= PREVIEW_CHARACTER_LIMIT) {
    return text;
  }

  const shortened = text.slice(0, PREVIEW_CHARACTER_LIMIT);
  const lastSpaceIndex = shortened.lastIndexOf(" ");

  if (lastSpaceIndex <= 0) {
    return shortened.trim();
  }

  return shortened.slice(0, lastSpaceIndex).trim();
}

function stripTrailingPreviewPunctuation(text: string) {
  return text.replace(/[.!?,:;\u2026]+$/u, "").trimEnd();
}

export function getPostPreview(excerpt: string | null, content: string) {
  const normalizedContent = content
    .trim()
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(" ");

  const previewSource = excerpt?.trim() || normalizedContent || "";

  return stripTrailingPreviewPunctuation(
    truncatePreview(previewSource.replace(/\s+/g, " ")),
  );
}
