export function getPostPreview(excerpt: string | null, content: string) {
  const normalizedContent = content
    .trim()
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(" ");

  return normalizedContent || excerpt?.trim() || "";
}
