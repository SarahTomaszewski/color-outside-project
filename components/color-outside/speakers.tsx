"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { SPEAKERS } from "@/lib/content/color-outside";

import { Reveal, RevealLines } from "./motion";
import { EditorialImage, GLYPH, IconLink, SectionLabel } from "./primitives";

export function Speakers() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="speakers"
      className="co-grain relative bg-lilac text-ink"
      aria-labelledby="speakers-heading"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-32">
        <Reveal anim="fade">
          <SectionLabel number="04">Lineup</SectionLabel>
        </Reveal>
        <RevealLines
          lines={["People who make", "interesting things."]}
          className="co-display mt-12 text-[clamp(42px,7.5vw,132px)] text-ink md:mt-16"
        />
        <h2 id="speakers-heading" className="sr-only">
          People who make interesting things
        </h2>

        {/* Four across, all on the same baseline — no staggered offsets. */}
        <div className="mt-16 grid items-start gap-y-8 md:mt-24 md:gap-y-10 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-14">
          {SPEAKERS.map((s, i) => (
            <Reveal key={s.name} anim="up" delay={(i % 4) * 90}>
              {/*
                The whole card opens the dialog for pointer users. "View more"
                stays a real button so keyboard and screen-reader users have a
                proper control, and the LinkedIn link stops the click from
                bubbling so it still goes to LinkedIn.
              */}
              {/*
                Horizontal below md so the four fit on a phone without a long
                scroll; stacked from md up. The card opens the dialog for
                pointer users — the "View" sticker cursor is the affordance —
                and the name is a real button so keyboard and screen-reader
                users still have a control. The LinkedIn link stops the click
                bubbling so it still goes to LinkedIn.
              */}
              <article
                data-cursor-sticker="View"
                className="group flex cursor-pointer gap-4 md:gap-6 xl:block"
                onClick={() => setActive(i)}
              >
                <EditorialImage
                  image={s.image}
                  sizes="(max-width: 640px) 40vw, (max-width: 1280px) 25vw, 23vw"
                  className="aspect-square w-2/5 shrink-0 self-start rounded-[1.25rem] border border-ink/15 bg-cream sm:w-1/3 md:w-1/4 xl:w-full"
                />

                <div className="min-w-0 flex-1 xl:mt-6 xl:border-t xl:border-ink/15 xl:pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="co-display text-[clamp(24px,3vw,44px)] leading-none text-ink transition-transform duration-300 group-hover:translate-x-1.5">
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        className="co-focus text-left"
                      >
                        {s.name}
                        <span className="sr-only"> — view details</span>
                      </button>
                    </h3>
                    <span
                      aria-hidden="true"
                      className="co-display shrink-0 text-2xl text-ink/40"
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <p className="co-micro mt-3 text-ink">{s.role}</p>

                  {/* The card is tight on a phone — name, role and LinkedIn
                      carry it there, and the note returns from md up. */}
                  <p className="mt-4 hidden text-sm leading-relaxed opacity-80 md:block md:text-base">
                    {s.note}
                  </p>

                  <span
                    onClick={(e) => e.stopPropagation()}
                    className="mt-5 inline-block"
                  >
                    <IconLink
                      href={s.social.href}
                      label={`${s.name} on LinkedIn`}
                      path={GLYPH.linkedin}
                      className="h-11 w-11"
                    />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <SpeakerDialog
        index={active}
        onClose={() => setActive(null)}
      />
    </section>
  );
}

/**
 * Detail view for one speaker. Uses a native <dialog> so the browser handles
 * the focus trap, Escape, and inerting the page behind it.
 */
function SpeakerDialog({
  index,
  onClose,
}: {
  index: number | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const speaker = index === null ? null : SPEAKERS[index];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (index !== null && !el.open) el.showModal();
    if (index === null && el.open) el.close();
  }, [index]);

  // Backdrop clicks land on the dialog itself, not its contents.
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === ref.current) onClose();
    },
    [onClose],
  );

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={onClick}
      aria-labelledby="speaker-dialog-name"
      className="co-dialog"
    >
      {speaker ? (
        <div className="co-grain relative grid gap-6 bg-cream p-6 text-ink md:grid-cols-12 md:gap-10 md:p-10">
          <div className="md:col-span-5">
            <EditorialImage
              image={speaker.image}
              sizes="(max-width: 768px) 45vw, 40vw"
              className="aspect-square w-40 rounded-[1.25rem] bg-cream sm:w-52 md:w-full"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="co-focus absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-ink text-cream transition-colors duration-200 hover:bg-cobalt md:right-6 md:top-6"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <div className="md:col-span-7 md:pr-14">
            <h3
              id="speaker-dialog-name"
              className="co-display text-[clamp(34px,5vw,68px)] leading-none"
            >
              {speaker.name}
            </h3>
            <p className="co-micro mt-3 text-cobalt">{speaker.role}</p>

            <p className="mt-6 text-base leading-relaxed md:text-lg">
              {speaker.bio}
            </p>
            <p className="mt-4 text-base leading-relaxed opacity-80 md:text-lg">
              {speaker.note}
            </p>

            <div className="mt-8">
              <IconLink
                href={speaker.social.href}
                label={`${speaker.name} on LinkedIn`}
                path={GLYPH.linkedin}
                className="h-11 w-11"
              />
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
