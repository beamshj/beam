import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // SSR-safe initial value
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return; // server: do nothing

    const mql = window.matchMedia(query);

    // update handler (works with both MediaQueryListEvent and older MediaQueryList)
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setMatches("matches" in e ? e.matches : mql.matches);

    // ensure initial value is correct (helps avoid hydration mismatch)
    setMatches(mql.matches);

    // modern API: addEventListener('change'), fallback to addListener for older browsers
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler as EventListener);
    } else if (typeof (mql as any).addListener === "function") {
      (mql as any).addListener(handler);
    }

    return () => {
      if (typeof mql.removeEventListener === "function") {
        mql.removeEventListener("change", handler as EventListener);
      } else if (typeof (mql as any).removeListener === "function") {
        (mql as any).removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}
