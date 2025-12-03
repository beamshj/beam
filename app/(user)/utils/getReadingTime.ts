export function getReadingTimeFromHTML(
  html: string | null | undefined,
  isArabic: boolean = false
): number | string {
  if (!html) return isArabic ? "٠" : 0;

  let text = "";

  // Browser
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = html;
    text = div.textContent || div.innerText || "";
  }
  // Server
  else {
    text = html.replace(/<[^>]*>/g, " ");
  }

  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const wordsPerMinute = 200;

  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Convert to Arabic digits if requested
  if (isArabic) {
    return convertToArabicNumber(minutes);
  }

  return minutes;
}

// Helper: Convert normal numbers → Arabic numerals
function convertToArabicNumber(num: number): string {
  const arabicDigits = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];
  return num
    .toString()
    .split("")
    .map((digit) => arabicDigits[Number(digit)] ?? digit)
    .join("");
}
