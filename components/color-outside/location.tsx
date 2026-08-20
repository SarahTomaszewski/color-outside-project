import { LOCATION } from "@/lib/content/color-outside";

import { Reveal, RevealLines } from "./motion";
import { EditorialImage, SectionLabel } from "./primitives";

const [wide, tall, lawn] = LOCATION.images;

export function Location() {
  return (
    <section
      id="location"
      className="co-grain relative overflow-hidden bg-mint text-ink"
      aria-labelledby="location-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-32">
        <Reveal anim="fade">
          <SectionLabel number="07">Location</SectionLabel>
        </Reveal>
        <RevealLines
          lines={[`${LOCATION.venue},`, LOCATION.city]}
          className="co-display mt-12 text-[clamp(42px,8vw,140px)] md:mt-16"
        />
        <h2 id="location-heading" className="sr-only">
          {LOCATION.venue}, {LOCATION.city}
        </h2>

        {/*
          Two columns on a fixed two-row track: photo over photo on the left,
          photo over map on the right. Explicit equal rows mean both columns
          end on the same line whatever the image ratios are.
        */}
        <div className="mt-14 grid gap-4 md:mt-20 md:gap-6 lg:h-[780px] lg:grid-cols-12 lg:grid-rows-2">
          <Reveal anim="clip" className="lg:col-span-7 lg:min-h-0">
            <EditorialImage
              image={wide}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="aspect-[16/11] w-full rounded-[1.25rem] lg:aspect-auto lg:h-full"
            />
          </Reveal>

          <Reveal anim="clip" delay={90} className="lg:col-span-5 lg:min-h-0">
            <EditorialImage
              image={tall}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-[16/10] w-full rounded-[1.25rem] lg:aspect-auto lg:h-full"
            />
          </Reveal>

          <Reveal anim="clip" delay={130} className="lg:col-span-5 lg:min-h-0">
            <EditorialImage
              image={lawn}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-[16/10] w-full rounded-[1.25rem] lg:aspect-auto lg:h-full"
            />
          </Reveal>

          {/* the map takes the fourth tile */}
          <Reveal anim="up" delay={170} className="lg:col-span-7 lg:min-h-0">
            <div className="h-full overflow-hidden rounded-[1.25rem] border border-ink/15">
              <iframe
                title={`Map showing ${LOCATION.venue}, ${LOCATION.city}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  LOCATION.mapQuery,
                )}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[300px] w-full border-0 lg:h-full"
              />
            </div>
          </Reveal>
        </div>

        <p className="co-micro mt-6 opacity-70">{LOCATION.address}</p>

        <dl className="mt-14 grid gap-x-10 md:mt-20 md:grid-cols-3">
          {LOCATION.notes.map((note, i) => (
            <Reveal key={note.label} anim="up" delay={i * 90}>
              <div className="border-t border-ink/15 px-2 py-6 md:py-8">
                <dt className="co-micro">{note.label}</dt>
                <dd className="mt-3 text-base leading-relaxed md:text-lg">
                  {note.body}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
