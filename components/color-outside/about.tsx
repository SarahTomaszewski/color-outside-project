import { Reveal, RevealLines } from "./motion";
import { SectionLabel } from "./primitives";

const BODY = [
  "The best creative work rarely starts with a perfect plan. It starts with a strange reference, a half-finished sketch, a question you can't stop thinking about, or an idea that probably shouldn't work—but somehow does.",
  "Color Outside is a one-day creative festival built around experimentation. We're bringing together designers, artists, makers, and creative thinkers for a day of talks, hands-on sessions, unexpected collaborations, and the kind of conversations that make you want to go home and immediately start something new.",
];

export function About() {
  return (
    <section
      id="about"
      className="co-grain relative overflow-hidden bg-cream text-ink"
    >
      <div className="mx-auto max-w-[1600px] px-5 pb-14 pt-20 md:px-10 md:pb-20 md:pt-32">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Reveal anim="fade">
              <SectionLabel number="01">About</SectionLabel>
            </Reveal>
            <RevealLines
              lines={["Make something", "unexpected."]}
              className="co-display mt-12 md:mt-16 text-[clamp(48px,8.5vw,148px)]"
            />
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            {BODY.map((para, i) => (
              <Reveal key={i} anim="up" delay={i * 110}>
                <p className="mb-5 text-base leading-relaxed md:text-lg">
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal anim="up" delay={240}>
              <p className="mt-2 text-base font-semibold md:text-lg">
                Just good people making interesting things.
              </p>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  );
}
