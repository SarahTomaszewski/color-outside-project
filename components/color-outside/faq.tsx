"use client";

import { useEffect, useRef, useState } from "react";

import { FAQS } from "@/lib/content/color-outside";

import { Reveal, RevealLines } from "./motion";
import { SectionLabel } from "./primitives";

type ItemProps = {
  q: string;
  a: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqItem({ q, a, index, isOpen, onToggle }: ItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Animate an explicit pixel height: `grid-template-rows: 0fr/1fr` is the
  // tidier trick but its interpolation stalls here, leaving panels stuck open.
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
    <div className="border-b border-ink/15">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${index}`}
          id={`faq-trigger-${index}`}
          className="co-focus group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-cobalt md:py-8"
        >
          <span className="co-display text-[clamp(21px,3.2vw,50px)] leading-[1.02]">
            {q}
          </span>

          {/* plus rotating into minus */}
          <span
            aria-hidden="true"
            className="relative mt-1 block h-6 w-6 shrink-0 md:h-8 md:w-8"
          >
            <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-current" />
            <span
              className={`absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-current transition-transform duration-300 ${
                isOpen ? "rotate-90 scale-y-0" : "rotate-0"
              }`}
            />
          </span>
        </button>
      </h3>

      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        inert={!isOpen}
        style={{ height: isOpen ? height : 0 }}
        className="overflow-hidden transition-[height] duration-300 ease-out"
      >
        <div ref={contentRef}>
          <p
            className={`max-w-3xl pb-8 pr-10 text-base leading-relaxed transition-opacity duration-300 md:text-lg ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="co-grain relative bg-cream text-ink"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-32">
        <Reveal anim="fade">
          <SectionLabel number="09">FAQ</SectionLabel>
        </Reveal>
        <RevealLines
          lines={["Questions?", "Probably."]}
          className="co-display mt-12 md:mt-16 text-[clamp(44px,8.5vw,150px)]"
        />
        <h2 id="faq-heading" className="sr-only">
          Questions? Probably.
        </h2>

        <div className="mt-14 border-t border-ink/15 md:mt-20">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              q={item.q}
              a={item.a}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
