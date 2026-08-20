import { PRINCIPLES } from "@/lib/content/color-outside";

import { Reveal, RevealLines } from "./motion";
import { SectionLabel } from "./primitives";

export function Principles() {
  return (
    <section className="co-grain relative bg-mint text-ink" aria-labelledby="principles-heading">
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-32">
        <Reveal anim="fade">
          <SectionLabel number="02">The idea</SectionLabel>
        </Reveal>

        <RevealLines
          lines={["Less perfection.", "More play."]}
          className="co-display mt-12 md:mt-16 text-[clamp(48px,9vw,160px)]"
        />

        <h2 id="principles-heading" className="sr-only">
          Less perfection. More play.
        </h2>

        <div className="mt-16 border-t border-ink/15 md:mt-24">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} anim="up" delay={i * 80}>
              <article className="group grid grid-cols-12 items-baseline gap-x-4 border-b border-ink/15 px-2 py-8 transition-colors duration-300 hover:bg-ink hover:text-mint md:gap-x-6 md:py-12">
                <span
                  aria-hidden="true"
                  className="co-display col-span-2 overflow-hidden text-[clamp(36px,6vw,96px)] leading-none opacity-40 transition-opacity duration-300 group-hover:opacity-100 md:col-span-1"
                >
                  {p.n}
                </span>
                <h3 className="co-display col-span-10 text-[clamp(32px,6vw,92px)] leading-[0.9] transition-transform duration-300 group-hover:translate-x-2 md:col-span-6">
                  {p.title}
                </h3>
                <p className="col-span-12 mt-4 text-base leading-relaxed md:col-span-5 md:mt-0 md:text-lg">
                  {p.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
