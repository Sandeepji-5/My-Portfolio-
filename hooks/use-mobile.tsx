"use client";

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Generic media query hook
 * @param query - media query string (e.g., "(max-width: 768px)")
 * @returns {boolean} - true if media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);

    updateMatch(); // Check immediately
    media.addEventListener("change", updateMatch);

    return () => media.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}

/**
 * Shortcut hook for detecting mobile view (<768px)
 * @returns {boolean} - true if on a mobile screen
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
}
