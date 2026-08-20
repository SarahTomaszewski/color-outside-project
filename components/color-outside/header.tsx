"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { EVENT, NAV } from "@/lib/content/color-outside";

import { Star, Wordmark } from "./primitives";

export function Header({
  /**
   * "full" is the site header. "wordmark" keeps only the lockup — used on
   * pages that shouldn't invite navigating away mid-flow.
   */
  variant = "full",
}: {
  variant?: "full" | "wordmark";
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel on Escape, and stop the page scrolling behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-cream"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`relative mx-auto flex max-w-[1600px] items-center px-5 py-4 md:px-10 ${
          variant === "wordmark" ? "justify-center" : "justify-between"
        }`}
      >
        {variant === "wordmark" ? (
          <Link
            href="/"
            className="co-focus text-ink"
            aria-label="Color Outside — home"
          >
            <Wordmark className="text-3xl leading-none md:text-4xl" />
          </Link>
        ) : (
          <>
            {/* Desktop: links left. Mobile keeps the full lockup here. */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-8 lg:flex"
            >
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="co-micro co-focus py-1 text-ink underline decoration-transparent decoration-dotted decoration-2 underline-offset-[6px] transition-colors duration-200 hover:text-cobalt hover:decoration-cobalt"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#top"
              className="co-focus text-ink lg:hidden"
              aria-label="Color Outside — home"
            >
              <Wordmark className="text-3xl leading-none md:text-4xl" />
            </a>

            {/* Desktop: just the star, optically centred on the bar. */}
            <a
              href="#top"
              aria-label="Color Outside — home"
              className="co-focus absolute left-1/2 hidden -translate-x-1/2 lg:block"
            >
              <Star className="h-9 w-9 text-cobalt transition-transform duration-500 hover:rotate-90" />
            </a>

            <div className="flex items-center gap-3">
              <a
                href={EVENT.ticketHref}
                className="co-micro co-focus hidden rounded-full bg-butter px-6 py-3 font-bold text-cobalt transition-colors duration-200 hover:bg-cobalt hover:text-butter sm:inline-block"
              >
                Get tickets
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="co-mobile-nav"
                className="co-focus flex items-center gap-2 rounded-full bg-mint px-5 py-3 text-cobalt lg:hidden"
              >
                <span className="co-micro font-bold">
                  {open ? "Close" : "Menu"}
                </span>
                <span aria-hidden="true" className="relative block h-3 w-4">
                  <span
                    className={`absolute left-0 block h-0.5 w-4 bg-cobalt transition-transform duration-200 ${
                      open ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-0.5 w-4 bg-cobalt transition-transform duration-200 ${
                      open ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile panel — omitted entirely on the wordmark variant, so its
          links aren't sitting in the DOM behind a `hidden` attribute. */}
      {variant === "full" ? (
        <div
          id="co-mobile-nav"
          hidden={!open}
          className="border-t border-ink/15 bg-cream lg:hidden"
        >
          <nav aria-label="Primary mobile" className="flex flex-col">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="co-display co-focus border-b border-ink/15 px-5 py-5 text-4xl text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href={EVENT.ticketHref}
              onClick={() => setOpen(false)}
              className="co-display co-focus bg-butter px-5 py-5 text-4xl text-cobalt"
            >
              Get tickets →
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
