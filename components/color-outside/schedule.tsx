"use client";

import { useEffect, useRef, useState } from "react";

import { SCHEDULE } from "@/lib/content/color-outside";

import { Reveal, RevealLines } from "./motion";
import { SectionLabel } from "./primitives";

/** Each row claims its own colour on hover, so the table reads as a day. */
/** Hover fill per row — an open row simply keeps the colour it lit up with. */
const ROW_FILL = [
  { hover: "hover:bg-butter", open: "bg-butter" },
  { hover: "hover:bg-cobalt hover:text-cream", open: "bg-cobalt text-cream" },
  { hover: "hover:bg-mint", open: "bg-mint" },
  { hover: "hover:bg-peach", open: "bg-peach" },
];

type Session = (typeof SCHEDULE)[number];

function ScheduleRow({
  session,
  index,
  isOpen,
  onToggle,
}: {
  session: Session;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Animate an explicit pixel height, measured from the content, and keep it
  // in sync if the text reflows.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      className={`group border-b border-ink/15 transition-colors duration-300 ${
        isOpen
          ? ROW_FILL[index % ROW_FILL.length].open
          : ROW_FILL[index % ROW_FILL.length].hover
      }`}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`session-panel-${index}`}
          id={`session-trigger-${index}`}
          className="co-focus grid w-full grid-cols-12 items-center gap-x-4 px-2 py-6 text-left md:gap-x-6 md:py-8"
        >
          <span className="col-span-12 md:col-span-2">
            <span className="co-display block text-2xl leading-none transition-transform duration-300 group-hover:translate-x-1 md:text-[clamp(20px,2vw,34px)]">
              {session.time}
            </span>
          </span>

          <span className="col-span-8 mt-3 md:col-span-7 md:mt-0">
            <span className="block text-xl font-semibold leading-tight transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
              {session.title}
            </span>
          </span>

          <span className="col-span-4 mt-3 flex items-center justify-end md:col-span-3 md:mt-0">
            <span className="co-micro inline-block whitespace-nowrap border border-current/25 px-2.5 py-1.5">
              {session.type}
            </span>
          </span>
        </button>
      </h3>

      <div
        id={`session-panel-${index}`}
        role="region"
        aria-labelledby={`session-trigger-${index}`}
        inert={!isOpen}
        style={{ height: isOpen ? height : 0 }}
        className="overflow-hidden transition-[height] duration-300 ease-out"
      >
        <div ref={contentRef} className="grid grid-cols-12 gap-x-4 px-2 md:gap-x-6">
          <p
            className={`col-span-12 pb-7 text-base leading-relaxed transition-opacity duration-300 md:col-span-7 md:col-start-3 md:pb-9 md:text-lg ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {session.body}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Schedule() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="schedule"
      className="co-grain relative bg-cream text-ink"
      aria-labelledby="schedule-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-8">
            <Reveal anim="fade">
              <SectionLabel number="03">Schedule</SectionLabel>
            </Reveal>
            <RevealLines
              lines={["One day.", "A lot happening."]}
              className="co-display mt-12 text-[clamp(44px,8vw,140px)] md:mt-16"
            />
            <h2 id="schedule-heading" className="sr-only">
              One day. A lot happening.
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <Reveal anim="up" delay={160}>
              <p className="co-micro leading-relaxed opacity-70">
Nine sessions · Doors 10:00 AM
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 border-t border-ink/15 md:mt-20">
          {SCHEDULE.map((row, i) => (
            <Reveal key={row.time} anim="up" delay={(i % 4) * 60}>
              <ScheduleRow
                session={row}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
