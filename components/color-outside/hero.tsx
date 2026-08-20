import { EVENT } from "@/lib/content/color-outside";

import { Reveal } from "./motion";
import { SpinButton } from "./primitives";

/**
 * Four tall rows of narrow cells, so each rectangle reads as a vertical bar
 * (~45x200) like the reference rather than a landscape tile. Every row shares
 * one cell width and duration, so rows travelling the same way stay locked in
 * step and only the two directions read as separate. 90px of travel over 5s
 * keeps the 18px/s pace measured off the reference.
 */
const GRID_ROWS = 4;
const CELL_W = "45px";
const ROW_DUR = "5s";

/** Date, time and place read as one block. */
const DETAILS = [
  { label: "Date", value: EVENT.date },
  { label: "Time", value: EVENT.time },
  { label: "Location", value: EVENT.place },
];

export function Hero() {
  return (
    <section
      id="top"
      className="co-grain relative flex min-h-[80vh] flex-col overflow-hidden bg-blush text-ink"
    >
      {/* Grid of rectangles in rows; every left row shares one phase and
          speed, every right row shares another. */}
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

      <div className="relative mx-auto w-full max-w-[1600px] flex-1 px-5 pt-8 md:px-10 md:pt-12">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal anim="up">
              <p className="co-display text-[clamp(26px,3.6vw,58px)] leading-[0.95]">
                One day for big ideas, weird experiments &amp; better creative
                work
              </p>
            </Reveal>

            <Reveal anim="scale" delay={220}>
              <div className="mt-10">
              <SpinButton
                href={EVENT.ticketHref}
                label="Get your ticket"
                text="★ GET YOUR TICKET ★ OCTOBER 17 "
                tone="butter"
                className="h-32 w-32 [--co-badge-r:3.2rem] md:h-44 md:w-44 md:[--co-badge-r:4.6rem]"
              />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-7">
            <Reveal anim="up" delay={120}>
              <p className="max-w-md text-base leading-relaxed md:text-lg">
                {EVENT.tagline} A day of talks, hands-on sessions and
                unexpected collaborations — no perfect ideas required.
              </p>

              <dl className="mt-7 flex flex-col gap-1.5">
                {DETAILS.map((d) => (
                  <div key={d.label}>
                    <dt className="sr-only">{d.label}</dt>
                    <dd className="co-micro">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

          </div>

        </div>
      </div>

      {/*
        Full-bleed wordmark.

        Both the gutter and the type are sized in vw, so the ratio between
        them is identical at every viewport width — the line fills the screen
        and never overflows. Sizes come from the measured advance width of
        the 900-weight face (5.4045x font-size for the full line), with ~1.5%
        held back so a fallback font can't push it over.
      */}
      <div className="relative w-full px-[4vw] pb-6 md:pb-8">
        <h1 className="co-wordmark mt-6 text-left md:mt-8 md:text-center">
          <span className="sr-only">{EVENT.name}</span>

          <span aria-hidden="true" className="block md:hidden">
            <span className="block whitespace-nowrap text-[38vw] leading-[0.82]">
              Color
            </span>
            <span className="block whitespace-nowrap text-[29.5vw] leading-[0.82]">
              Outside
            </span>
          </span>

          <span
            aria-hidden="true"
            className="hidden whitespace-nowrap text-[16.2vw] leading-[0.78] md:block"
          >
            Color Outside
          </span>
        </h1>
      </div>
    </section>
  );
}
