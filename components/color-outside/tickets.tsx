import { EVENT, PARTNERS, TICKET } from "@/lib/content/color-outside";
import type { HappilyEnv, PublicForm } from "@/lib/happily/types";

import { TicketForm } from "./ticket-form";

import { Reveal, RevealLines } from "./motion";
import { CTAButton, SectionLabel } from "./primitives";

/** Each partner mark keeps its own typographic voice. */
const MARK_STYLE: Record<string, string> = {
  serif: "font-serif italic tracking-tight",
  display: "co-display tracking-normal",
  mono: "font-mono uppercase tracking-[0.14em]",
  italic: "font-grotesk font-black italic tracking-tight",
};

const CARD_TONE: Record<string, string> = {
  blush: "bg-blush",
  mint: "bg-mint",
  butter: "bg-butter",
  lilac: "bg-lilac",
  peach: "bg-peach",
};

export function Tickets({
  eventId,
  env,
  form,
}: {
  eventId: string;
  env: HappilyEnv;
  form: PublicForm | null;
}) {
  return (
    <section
      id="tickets"
      className="co-grain relative bg-cream text-ink"
      aria-labelledby="tickets-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-32">
        <h2 id="tickets-heading" className="sr-only">
          One ticket. It&apos;s free.
        </h2>

        <Reveal anim="up">
          {/*
            Every "get tickets" link points here. The scroll margin clears the
            sticky header *and* leaves air above the card, so the anchor never
            parks the pink container's top edge under the bar.
          */}
          <article
            id="register"
            className={`scroll-mt-32 rounded-[2rem] p-7 text-ink md:scroll-mt-44 md:p-10 ${CARD_TONE[TICKET.tone]}`}
          >
            {form ? (
              <TicketForm
                eventId={eventId}
                env={env}
                form={form}
                cta={TICKET.cta}
                intro={<TicketIntro />}
              />
            ) : (
              <>
                <TicketIntro />
                <div className="mt-8">
                  <CTAButton href={EVENT.ticketHref} tone={TICKET.button} block>
                    {TICKET.cta}
                  </CTAButton>
                </div>
              </>
            )}

            {/*
              What's included, as one looping row along the bottom of the card.
              The track holds the list twice and slides exactly -50%, so the
              seam never shows; spacing is trailing padding rather than `gap`,
              which would add an extra step at the join and break the loop.
              The loop is decorative repetition — the real list is below it,
              for screen readers.
            */}
            <div
              aria-hidden="true"
              className="co-marquee-viewport co-fade-x -mx-7 mt-8 md:-mx-10 md:mt-10"
            >
              <div
                className="co-marquee"
                style={{ ["--co-marquee-duration" as string]: "24s" }}
              >
                {[...TICKET.features, ...TICKET.features].map((f, i) => (
                  <span
                    key={`${f}-${i}`}
                    className="flex shrink-0 items-center gap-2 pr-8 text-sm md:text-base"
                  >
                    <span>✦</span>
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <ul className="sr-only">
              {TICKET.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/** Label, headline and blurb — the copy that introduces the form. */
function TicketIntro() {
  return (
    <>
      <SectionLabel number="06">Tickets</SectionLabel>
      <RevealLines
        lines={["One ticket.", "It's free."]}
        className="co-display mt-5 text-[clamp(44px,6.4vw,104px)] text-ink"
      />
      <p className="mt-6 max-w-xl text-base leading-relaxed md:text-lg">
        {TICKET.blurb}
      </p>
    </>
  );
}

/* =============================================================
   Host
   ============================================================= */

export function Host() {
  return (
    <section
      id="host"
      className="co-grain relative overflow-hidden bg-cream text-ink"
      aria-labelledby="host-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-6">
            <Reveal anim="fade">
              <SectionLabel number="08">Your host</SectionLabel>
            </Reveal>
            <RevealLines
              lines={["Bright Hours", "Studio"]}
              stagger={100}
              className="co-display mt-12 text-[clamp(42px,8vw,140px)] text-ink md:mt-16"
            />
            <h2 id="host-heading" className="sr-only">
              Bright Hours Studio
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-8">
            <Reveal anim="up" delay={120}>
              <p className="text-base leading-relaxed md:text-lg">
                Bright Hours is an independent creative studio and learning
                platform built around experimentation, collaboration, and making
                work with personality.
              </p>
              <p className="mt-5 text-base leading-relaxed md:text-lg">
                We create workshops, gatherings, and creative projects for people
                who want to spend less time chasing the “right” answer and more
                time discovering something unexpected.
              </p>
              <p className="mt-5 text-base font-semibold leading-relaxed text-cobalt md:text-lg">
                Color Outside is our excuse to bring that philosophy into one
                very loud room.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Partners ride along the bottom of the host section: title held on
          the left, marks streaming past and fading out at both edges. */}
      <div className="bg-cobalt text-cream">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:gap-10 md:px-10 md:py-14">
          <h2 className="co-display shrink-0 text-[clamp(28px,3.4vw,52px)] leading-[0.9]">
            Friends of
            <br />
            Color Outside
          </h2>

          <div
            className="co-marquee-viewport co-fade-x min-w-0 flex-1"
            data-pause="off"
            aria-hidden="true"
          >
            <div className="co-marquee" style={{ ["--co-marquee-duration" as string]: "32s" }}>
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <span
                  key={`${p.name}-${i}`}
                  className={`shrink-0 whitespace-nowrap px-10 text-3xl opacity-80 md:text-4xl ${MARK_STYLE[p.style]}`}
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>

          <ul className="sr-only">
            {PARTNERS.map((p) => (
              <li key={p.name}>
                {p.name} — {p.role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

