export async function shareBlog(options?: {
  title?: string;
  url?: string;
}): Promise<void> {
  if (typeof window === "undefined") return;

  const shareUrl = options?.url || window.location.href;
  const shareTitle = options?.title || document.title;

  try {
    //  Modern browsers (Web Share API)
    if (navigator.share) {
      await navigator.share({
        title: shareTitle,
        url: shareUrl,
      });
    }
    //  Fallback: copy to clipboard
    else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
    //  Double fallback
    else {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Link copied to clipboard!");
    }
  } catch (error) {
    console.error("Error sharing blog:", error);
  }
}
