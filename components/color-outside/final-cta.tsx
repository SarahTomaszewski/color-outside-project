import { EVENT } from "@/lib/content/color-outside";

import { Reveal, RevealLines } from "./motion";
import { BlobShape, Marquee, SectionLabel, SpinButton } from "./primitives";

/** The banner copy, shared by the band under the hero and the one above
 *  the footer so the two loops read identically. */
const BANNER = [
  "Color Outside",
  "Make something weird",
  "October 17",
  "San Francisco",
  "No perfect ideas required",
];

/* --------------------------------------------------- sticker pills ---- */

/*
  One tone per sticker — each gets its own fill and its own label colour.
  Every pastel sits within 1.4:1 of the blush ground, so each keeps a stroke
  to hold its edge; the ink sticker takes a cream one instead.
*/
const PILL_TONE: Record<string, { shape: string; label: string }> = {
  mint: { shape: "fill-mint stroke-cobalt", label: "text-cobalt" },
  cobalt: { shape: "fill-cobalt stroke-butter", label: "text-butter" },
  butter: { shape: "fill-butter stroke-ink", label: "text-ink" },
  ink: { shape: "fill-ink stroke-mint", label: "text-mint" },
};

/**
 * A scalloped sticker. It sits still until the pointer reaches it, then
 * flicks once each way — the idle drift is gone.
 */
function Pill({
  children,
  tone,
  className = "",
  rotate = 0,
}: {
  children: string;
  tone: keyof typeof PILL_TONE;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={`co-wiggle absolute z-10 grid select-none place-items-center px-6 py-4 md:px-14 md:py-9 ${className}`}
      style={{ ["--co-rot" as string]: `${rotate}deg`, transform: `rotate(${rotate}deg)` }}
    >
      <BlobShape stretch shape="star" strokeWidth={1.5} className={PILL_TONE[tone].shape} />
      <span
        className={`co-display relative text-xs leading-none md:text-2xl ${PILL_TONE[tone].label}`}
      >
        {children}
      </span>
    </span>
  );
}

/* ------------------------------------------------------- final CTA ---- */

/* Mirrors the hero's grid field so both grounds move at the same pace. */
const GRID_ROWS = 4;
const CELL_W = "45px";
const ROW_DUR = "5s";

export function FinalCta() {
  return (
    <section
      className="co-grain relative overflow-hidden bg-blush text-ink"
      aria-labelledby="final-heading"
    >
      {/* Same ground as the hero: rows of narrow rectangles sliding in
          alternating directions. */}
      <div aria-hidden="true" className="co-grid-field">
        {Array.from({ length: GRID_ROWS }).map((_, i) => (
          <div
            key={i}
            className="co-grid-row"
            data-dir={i % 2 ? "right" : "left"}
            style={{
              ["--co-cell-w" as string]: CELL_W,
              ["--co-row-dur" as string]: ROW_DUR,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 pb-10 pt-20 md:px-10 md:pb-14 md:pt-28">
        <Reveal anim="fade">
          <SectionLabel marker={false} className="justify-center">
            October 17 · 10:00 AM · Presidio Park, San Francisco
          </SectionLabel>
        </Reveal>

        {/*
          The stage keeps a clear band above and below the type, and the
          stickers anchor to those bands rather than to tuned percentages —
          so they can't ride over the headline at any width. The bands clear
          the stickers' *rotated* extent (h·cos + w·sin), not just their
          upright height, which is what a tilted corner eats into. The badge is the
          one thing meant to sit on the type, so it stays with the text.
        */}
        <div className="relative mt-6 pb-10 pt-16 md:mt-10 md:pb-16 md:pt-[120px]">
          <div className="relative">
            <RevealLines
              as="h2"
              lines={["Your weird idea deserves"]}
              className="co-display text-center text-[clamp(30px,5.6vw,96px)]"
            />
            <h2 id="final-heading" className="sr-only">
              Your weird idea deserves a day out
            </h2>

            <Reveal anim="scale" delay={140}>
              <p className="co-display mt-1 text-center text-[clamp(58px,20.5vw,330px)] leading-[0.82]">
                A day out.
              </p>
            </Reveal>

            <SpinButton
              href={EVENT.ticketHref}
              label="Get your ticket"
              text="★ GET YOUR TICKET ★ OCTOBER 17 "
              tone="butter"
              className="top-[44%] z-10 mx-auto h-28 w-28 [--co-badge-r:2.75rem] md:h-48 md:w-48 md:[--co-badge-r:5rem]"
            />
          </div>

          {/* stickers, held in the clear bands */}
          <Pill tone="mint" rotate={-4} className="left-0 top-0 md:left-[5%]">
            Experiment
          </Pill>
          <Pill tone="cobalt" rotate={4} className="right-0 top-0 md:right-[5%]">
            Make
          </Pill>
          <Pill tone="butter" rotate={-6} className="bottom-0 left-0 md:left-[3%]">
            Play
          </Pill>
          <Pill tone="ink" rotate={9} className="bottom-0 right-0 md:right-[3%]">
            Reset
          </Pill>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- marquees --- */

export function HeroMarquee() {
  return (
    <div className="bg-cobalt py-4 text-butter md:py-6">
      <Marquee items={BANNER} duration={38} />
    </div>
  );
}

/**
 * The band above the footer: same copy as the hero banner, tilted and
 * bleeding past both edges so it cuts across the page.
 */
export function FooterMarquee({
  /** The colour the band carries down from the section above it. */
  carry = "blush",
}: {
  carry?: "blush" | "cream";
} = {}) {
  return (
    <div className="co-grain relative overflow-hidden bg-cream py-10 md:py-16">
      {/*
        Hard split: blush carries down from the CTA, cream picks up for the
        footer. The tilted band straddles the seam, so the join reads as the
        band's own edge rather than a straight rule. The blush half runs the
        same moving rectangles as the CTA — a single row, so the bars stand
        at roughly the height they do above — otherwise it reads as a flat
        panel sitting under the section.
      */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-1/2 overflow-hidden ${
          carry === "cream" ? "bg-cream" : "bg-blush"
        }`}
      >
        <div className="co-grid-field">
          <div
            className="co-grid-row"
            style={{
              ["--co-cell-w" as string]: CELL_W,
              ["--co-row-dur" as string]: ROW_DUR,
            }}
          />
        </div>
      </div>

      <div className="relative -rotate-[3deg] scale-110 bg-cobalt py-3 text-butter md:py-5">
        <Marquee items={BANNER} duration={30} />
      </div>
    </div>
  );
}
