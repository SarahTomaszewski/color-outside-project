import type { Metadata } from "next";

import { AddToCalendar } from "@/components/color-outside/add-to-calendar";
import { Cursor } from "@/components/color-outside/cursor";
import { Footer } from "@/components/color-outside/footer";
import { Header } from "@/components/color-outside/header";
import { Reveal, RevealLines } from "@/components/color-outside/motion";
import { SectionLabel } from "@/components/color-outside/primitives";
import { text } from "@/components/helpers";
import { EVENT } from "@/lib/content/color-outside";
import type { CalendarEvent } from "@/lib/happily/calendar";
import { getEventEnv, getEventId } from "@/lib/happily/config";
import { getPublicAttendees, getPublicEvent } from "@/lib/happily/queries";

export const metadata: Metadata = {
  title: "You're in — Color Outside",
  description: "Your festival pass is confirmed. See you on October 17.",
  robots: "noindex",
};

/**
 * The event record carries a start but no end, so the calendar entry needs a
 * length. The festival runs 10:00 AM – 6:00 PM per `EVENT.time`; set an end
 * date in Happily and this stops being used.
 */
const FALLBACK_DURATION_HOURS = 8;

export default async function ConfirmationPage() {
  const eventId = getEventId();
  const env = getEventEnv();
  const eventData = await getPublicEvent({ eventId, env });
  const { event } = eventData;
  const content = event.content;

  const attendees =
    content.displayAttendeesList === true
      ? await getPublicAttendees({
          eventId,
          env,
          pageSize: content.attendeesPageSize ?? 12,
        })
      : null;

  const endDate =
    event.end_date ??
    (event.start_date
      ? new Date(
          new Date(event.start_date).getTime() +
            FALLBACK_DURATION_HOURS * 60 * 60 * 1000,
        ).toISOString()
      : null);

  const calendarEvent: CalendarEvent | null =
    event.display_add_to_calendar && event.start_date && endDate
      ? {
          title: event.name,
          description: text(content.aboutDescription),
          startDate: event.start_date,
          endDate,
          timezone: event.timezone ?? "UTC",
          location: event.location ?? undefined,
        }
      : null;

  return (
    <>
      <a
        href="#main"
        className="co-focus sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-ink focus:bg-cream focus:px-4 focus:py-3"
      >
        Skip to content
      </a>

      <Cursor />
      {/* Just the lockup — nothing here should pull you back into the site
          before the ticket is in a calendar. */}
      <Header variant="wordmark" />

      <main id="main">
        <section
          className="co-grain relative overflow-hidden bg-cream text-ink"
          aria-labelledby="confirmation-heading"
        >
          {/* Blush bars rather than the cobalt the rest of the site uses. */}
          <div
            aria-hidden="true"
            className="co-stripes absolute inset-0 [--co-stripe-color:var(--color-blush)]"
          />

          <div className="relative px-5 py-14 md:px-10 md:py-20 lg:px-[70px] xl:px-[140px]">
            <div className="mx-auto max-w-[1600px] bg-cream px-5 pb-16 pt-16 text-center md:px-14 md:pb-24 md:pt-24">
              <Reveal anim="fade">
                <SectionLabel marker={false} className="justify-center">
                  {`${EVENT.date} · ${EVENT.startTime} · ${EVENT.place}`}
                </SectionLabel>
              </Reveal>

              <RevealLines
                lines={[text(content.confirmationTitle, "You're in.")]}
                className="co-display mt-8 text-center text-[clamp(48px,10vw,180px)] md:mt-10"
              />
              <h1 id="confirmation-heading" className="sr-only">
                {text(content.confirmationTitle, "You're in.")}
              </h1>

              <Reveal anim="up" delay={140}>
                <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed md:text-2xl">
                  Your pass is confirmed. Bring a notebook, an unfinished idea,
                  and{" "}
                  <span className="font-semibold text-cobalt">
                    something you&apos;d normally talk yourself out of.
                  </span>
                </p>
              </Reveal>

              {calendarEvent ? (
                <Reveal anim="up" delay={220}>
                  <AddToCalendar event={calendarEvent} className="mt-12" />
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>

        {attendees?.attendees.length ? (
          <section
            className="co-grain relative bg-lilac text-ink"
            aria-labelledby="attendees-heading"
          >
            <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
              <Reveal anim="fade">
                <SectionLabel>
                  {text(content.attendeesListTitle, "Who's attending")}
                </SectionLabel>
              </Reveal>
              <h2 id="attendees-heading" className="sr-only">
                {text(content.attendeesListTitle, "Who's attending")}
              </h2>

              <ul className="mt-10 flex flex-wrap gap-3 md:mt-14">
                {attendees.attendees.map((a) => {
                  const name = [a.first_name, a.last_name]
                    .filter(Boolean)
                    .join(" ");
                  const role = [a.job_title, a.company]
                    .filter(Boolean)
                    .join(", ");
                  return (
                    <li
                      key={a.id}
                      className="rounded-full border border-ink/20 bg-cream px-5 py-3"
                    >
                      <span className="font-grotesk font-semibold">{name}</span>
                      {role ? (
                        <span className="co-micro ml-2 opacity-70">{role}</span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ) : null}
      </main>

      {/* Just the bottom bar — no second set of links to wander off into. */}
      <Footer variant="minimal" />
    </>
  );
}
