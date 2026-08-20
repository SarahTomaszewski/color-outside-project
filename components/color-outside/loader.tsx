"use client";

import { useEffect, useState } from "react";

import { Star } from "./primitives";

/**
 * First-paint splash: the wordmark closes in around a spinning star, then the
 * whole panel slides away.
 *
 * The markup is hidden by default and only shown under `.js` (set before
 * first paint), so a script failure can never leave the page behind a
 * permanent overlay.
 */
export function Loader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    let cancelled = false;
    let exitTimer: ReturnType<typeof setTimeout>;

    // Hold long enough to read, but never longer than the fonts need.
    const minimum = new Promise((resolve) => setTimeout(resolve, 1100));
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();

    Promise.all([minimum, fonts]).then(() => {
      if (cancelled) return;
      setPhase("out");
      exitTimer = setTimeout(() => {
        if (!cancelled) setPhase("done");
      }, 750);
    });

    return () => {
      cancelled = true;
      clearTimeout(exitTimer);
    };
  }, []);

  // Freeze the page underneath while the panel is up.
  useEffect(() => {
    if (phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`co-loader ${phase === "out" ? "is-out" : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading Color Outside</span>

      <span aria-hidden="true" className="co-loader-mark co-wordmark">
        <span className="co-loader-word co-loader-word-l">Color</span>
        <Star className="co-loader-star text-cobalt" />
        <span className="co-loader-word co-loader-word-r">Outside</span>
      </span>
    </div>
  );
}
