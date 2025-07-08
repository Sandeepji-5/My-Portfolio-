"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure `window` is available (important for Next.js or SSR)
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    const updateMatch = () => setMatches(media.matches);

    updateMatch(); // Check initially
    media.addEventListener("change", updateMatch);

    return () => {
      media.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return matches;
}
