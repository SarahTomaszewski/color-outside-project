import Image from "next/image";

import { EVENT, NAV } from "@/lib/content/color-outside";

import { GLYPH, IconLink, Wordmark } from "./primitives";

/* Every nav link appears down here too, plus the ticket anchor the header
   carries as its button. Deriving from NAV keeps the two in step. */
const FOOTER_LINKS = [...NAV, { label: "Tickets", href: "#tickets" }];
const SPLIT = Math.ceil(FOOTER_LINKS.length / 2);
const LINK_COLUMNS = [FOOTER_LINKS.slice(0, SPLIT), FOOTER_LINKS.slice(SPLIT)];

const SOCIALS = [
  {
    label: "Email",
    href: "mailto:arrived@teamhappily.com",
    path: GLYPH.email,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/happily",
    external: true,
    path: GLYPH.linkedin,
  },
];

export function Footer({
  /**
   * "full" is the site footer. "minimal" keeps only the bottom bar —
   * copyright, platform credit, socials — for pages that shouldn't offer a
   * second set of navigation.
   */
  variant = "full",
}: {
  variant?: "full" | "minimal";
} = {}) {
  const full = variant === "full";

  return (
    <footer className="co-grain relative bg-cream text-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
        {full ? (
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
            {/* lockup, line, and the where/when stack */}
            <div className="lg:col-span-6">
              <a
                href="#top"
                className="co-focus"
                aria-label="Color Outside — home"
              >
                <Wordmark className="text-4xl leading-none md:text-5xl" />
              </a>

              <p className="co-display mt-8 max-w-xl text-[clamp(22px,2.6vw,40px)] leading-[1.05]">
                A very serious event about not taking every idea too seriously.
              </p>

              <p className="co-micro mt-8 flex flex-col gap-1.5 opacity-70">
                <span>{EVENT.date}</span>
                <span>{EVENT.startTime}</span>
                <span>{EVENT.place}</span>
              </p>
            </div>

            {/* page links, two columns */}
            <nav
              aria-label="Footer"
              className="grid grid-cols-2 gap-x-8 lg:col-span-5 lg:col-start-8"
            >
              {LINK_COLUMNS.map((col, i) => (
                <ul key={i} className="space-y-3">
                  {col.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="co-micro co-focus underline decoration-transparent decoration-dotted decoration-2 underline-offset-[6px] transition-colors duration-200 hover:text-cobalt hover:decoration-cobalt"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </nav>
          </div>
        ) : null}

        {/* bottom row: copyright, platform credit, socials */}
        <div
          className={`flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between ${
            full ? "mt-16 border-t border-ink/15 pt-8" : ""
          }`}
        >
          <p className="co-micro opacity-70">
            © {new Date().getFullYear()} Bright Hours Studio
          </p>

          <a
            href="https://teamhappily.com/arrived?utm_source=sample-page&utm_medium=web&utm_campaign=design-magic&utm_content=sample003"
            target="_blank"
            rel="noopener noreferrer"
            className="co-focus shrink-0 transition-opacity duration-200 hover:opacity-70"
          >
            <Image
              src="/powered-by-happily-arrived-light.svg"
              width={292}
              height={55}
              alt="Powered by Happily Arrived"
              className="h-9 w-auto object-contain md:h-11"
              draggable={false}
            />
          </a>

          <ul className="flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <IconLink
                  href={s.href}
                  label={s.label}
                  path={s.path}
                  external={s.external}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
