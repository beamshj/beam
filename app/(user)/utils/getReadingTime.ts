export function getReadingTimeFromHTML(
  html: string | null | undefined
): number {
  if (!html) return 0;

  let text = "";

  // ✅ If running in browser
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = html;
    text = div.textContent || div.innerText || "";
  }
  // ✅ If running on server (Node.js / Next.js SSR)
  else {
    // Use regex to strip HTML tags safely
    text = html.replace(/<[^>]*>/g, " ");
  }

  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const wordsPerMinute = 200;

  return Math.ceil(wordCount / wordsPerMinute);
}
