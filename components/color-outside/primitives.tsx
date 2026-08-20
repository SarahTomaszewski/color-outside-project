import Image from "next/image";
import type { ReactNode } from "react";

import type { Img } from "@/lib/content/color-outside";

/* ------------------------------------------------------- section label */

export function SectionLabel({
  children,
  number,
  marker = true,
  className = "",
}: {
  children: ReactNode;
  number?: string;
  /** The small filled square. Off for standalone eyebrows. */
  marker?: boolean;
  className?: string;
}) {
  return (
    <p className={`co-micro flex items-center gap-3 ${className}`}>
      {marker ? (
        <span aria-hidden="true" className="inline-block h-2 w-2 bg-current" />
      ) : null}
      <span>{children}</span>
      {number ? (
        <>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
          <span className="opacity-70">{number}</span>
        </>
      ) : null}
    </p>
  );
}

/* --------------------------------------------------------------- rule */

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-current ${className}`} />;
}

/* ----------------------------------------------------------- CTA link */

type CTAProps = {
  href: string;
  children: ReactNode;
  /** Pastel fill. Every tone inverts to its complement on hover. */
  tone?: keyof typeof CTA_TONES;
  className?: string;
  size?: "md" | "lg";
  /** Stretch to the container and centre the label, arrow pinned right. */
  block?: boolean;
};

const CTA_TONES = {
  blush: "bg-blush text-cobalt hover:bg-cobalt hover:text-blush",
  butter: "bg-butter text-cobalt hover:bg-cobalt hover:text-butter",
  mint: "bg-mint text-cobalt hover:bg-cobalt hover:text-mint",
  peach: "bg-peach text-cobalt hover:bg-cobalt hover:text-peach",
  lilac: "bg-lilac text-ink hover:bg-ink hover:text-lilac",
  cream: "bg-cream text-cobalt hover:bg-cobalt hover:text-cream",
};

/** The CTA's visual, shared by link CTAs and the registration submit button. */
export function ctaClassName({
  tone = "blush",
  size = "md",
  block = false,
}: {
  tone?: keyof typeof CTA_TONES;
  size?: "md" | "lg";
  block?: boolean;
} = {}) {
  return `co-focus group relative inline-flex items-center justify-center rounded-full font-bold uppercase tracking-[0.1em] transition-colors duration-300 ${
    size === "lg"
      ? "px-14 py-6 text-lg md:px-20 md:py-8 md:text-2xl"
      : "px-10 py-4 text-base md:px-14 md:py-5 md:text-lg"
  } ${block ? "flex w-full" : ""} ${CTA_TONES[tone]}`;
}

/** The arrow that rides on every CTA. */
export function CTAArrow({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`absolute transition-transform duration-300 group-hover:translate-x-1.5 ${
        size === "lg"
          ? "right-6 h-6 w-6 md:right-9 md:h-8 md:w-8"
          : "right-5 h-5 w-5 md:right-7 md:h-6 md:w-6"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function CTAButton({
  href,
  children,
  tone = "blush",
  size = "md",
  block = false,
  className = "",
}: CTAProps) {
  return (
    <a
      href={href}
      className={`co-focus group relative inline-flex items-center justify-center rounded-full font-bold uppercase tracking-[0.1em] transition-colors duration-300 ${
        size === "lg"
          ? "px-14 py-6 text-lg md:px-20 md:py-8 md:text-2xl"
          : "px-10 py-4 text-base md:px-14 md:py-5 md:text-lg"
      } ${block ? "flex w-full" : ""} ${CTA_TONES[tone]} ${className}`}
    >
      <span className="transition-transform duration-300 group-hover:-translate-x-1">
        {children}
      </span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`absolute transition-transform duration-300 group-hover:translate-x-1.5 ${
          size === "lg" ? "right-6 h-6 w-6 md:right-9 md:h-8 md:w-8" : "right-5 h-5 w-5 md:right-7 md:h-6 md:w-6"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

/* ------------------------------------------------------ editorial image */

const TINTS: Record<string, string> = {
  butter: "bg-butter",
  cobalt: "bg-cobalt",
  mint: "bg-mint",
  peach: "bg-peach",
  blush: "bg-blush",
  lilac: "bg-lilac",
  ink: "bg-ink",
};

/**
 * A photograph with an optional duotone wash that lifts on hover, so the
 * grid reads as one art-directed set rather than assorted stock.
 */
export function EditorialImage({
  image,
  className = "",
  tint,
  rotate = 0,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  caption,
}: {
  image: Img;
  className?: string;
  tint?: string;
  rotate?: number;
  priority?: boolean;
  sizes?: string;
  caption?: string;
}) {
  return (
    <figure
      className={`group/img relative overflow-hidden ${className}`}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-all duration-700 ease-out group-hover/img:scale-[1.04] ${
          tint ? "grayscale contrast-[0.9] brightness-125 group-hover/img:grayscale-0 group-hover/img:contrast-100 group-hover/img:brightness-100" : ""
        }`}
      />
      {tint ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 mix-blend-multiply opacity-85 transition-opacity duration-700 group-hover/img:opacity-0 ${
            TINTS[tint] ?? "bg-cobalt"
          }`}
        />
      ) : null}
      {caption ? (
        <figcaption className="co-micro absolute bottom-0 left-0 bg-ink px-3 py-2 text-cream">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* -------------------------------------------------------------- marquee */

/**
 * Seamless looping marquee. The track holds the items twice and slides
 * exactly -50%, so the seam never shows.
 */
export function Marquee({
  items,
  className = "",
  duration = 34,
  direction = "normal",
  separator = "✦",
}: {
  items: readonly string[];
  className?: string;
  duration?: number;
  direction?: "normal" | "reverse";
  separator?: string;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={`co-marquee-viewport relative overflow-hidden ${className}`}
      // The loop is decorative repetition of copy stated elsewhere.
      aria-hidden="true"
    >
      <div
        className="co-marquee"
        data-direction={direction}
        style={{ ["--co-marquee-duration" as string]: `${duration}s` }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="co-display flex shrink-0 items-center whitespace-nowrap text-[clamp(28px,5vw,68px)]"
          >
            <span className="px-6">{item}</span>
            <span className="opacity-70">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------- spinning sticker */

const SPIN_TONES: Record<string, string> = {
  butter: "bg-butter text-cobalt hover:bg-cobalt hover:text-butter",
  blush: "bg-blush text-cobalt hover:bg-cobalt hover:text-blush",
  mint: "bg-mint text-cobalt hover:bg-cobalt hover:text-mint",
  cream: "bg-cream text-cobalt hover:bg-cobalt hover:text-cream",
};

/**
 * A round sticker whose label runs right around the edge and turns.
 * The ring is decorative; the accessible name comes from the sr-only label.
 */
export function SpinButton({
  href,
  text,
  label,
  tone = "butter",
  className = "",
}: {
  href: string;
  /** Ring copy. Repeat it so it wraps the full circle. */
  text: string;
  /** What the link is actually called. */
  label: string;
  tone?: keyof typeof SPIN_TONES;
  className?: string;
}) {
  const chars = text.split("");
  const step = 360 / chars.length;

  return (
    <a
      href={href}
      className={`co-focus group relative grid shrink-0 place-items-center rounded-full transition-colors duration-300 ${SPIN_TONES[tone]} ${className}`}
    >
      <span className="sr-only">{label}</span>

      <span
        aria-hidden="true"
        className="co-spin absolute inset-0 transition-transform duration-300 group-hover:scale-105"
      >
        {chars.map((char, i) => (
          <span
            key={i}
            className="co-micro absolute left-1/2 top-1/2 origin-[0_0] font-bold leading-none"
            style={{
              transform: `rotate(${i * step}deg) translate(0, calc(var(--co-badge-r) * -1))`,
            }}
          >
            {char === "\u2605" ? (
              <Star className="inline-block h-[1.15em] w-[1.15em] align-middle" />
            ) : (
              char
            )}
          </span>
        ))}
      </span>

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="relative h-7 w-7 transition-transform duration-300 group-hover:translate-x-1 md:h-9 md:w-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

/* ------------------------------------------------------------- blob */

/**
 * An eight-lobe scalloped blob. Square for icon links; stretched with
 * `preserveAspectRatio="none"` for the sticker pills, where the lobes
 * elongate with the label. The stroke is non-scaling so it stays an even
 * weight however the shape is stretched.
 *
 * Fill and stroke come from the caller's `fill-*` / `stroke-*` classes —
 * the path inherits both from the svg.
 */
const BLOB_PATH =
  "M62.63 19.51Q83.94 16.06 80.49 37.37Q98 50 80.49 62.63Q83.94 83.94 62.63 80.49Q50 98 37.37 80.49Q16.06 83.94 19.51 62.63Q2 50 19.51 37.37Q16.06 16.06 37.37 19.51Q50 2 62.63 19.51Z";

/** 24x24 glyph paths, shared by the footer and the speaker cards. */
export const GLYPH = {
  email: "M3.5 6.2h17v11.6h-17V6.2Zm1.9 1.6L12 12.4l6.6-4.6H5.4Z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95 4 0 4.4 2.5 4.4 5.8V21h-4v-5.6c0-1.35-.03-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.7h-4V9Z",
} as const;

/** Ten-point starburst — the "View" sticker shape. */
export const STAR_PATH =
  "M59.58 20.52Q77.63 11.98 75.08 31.78Q94.7 35.48 81 50Q94.7 64.52 75.08 68.22Q77.63 88.02 59.58 79.48Q50 97 40.42 79.48Q22.37 88.02 24.92 68.22Q5.3 64.52 19 50Q5.3 35.48 24.92 31.78Q22.37 11.98 40.42 20.52Q50 3 59.58 20.52Z";

export function BlobShape({
  className = "",
  stretch = false,
  strokeWidth = 2,
  shape = "blob",
}: {
  className?: string;
  stretch?: boolean;
  strokeWidth?: number;
  shape?: "blob" | "star";
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio={stretch ? "none" : "xMidYMid meet"}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <path
        d={shape === "star" ? STAR_PATH : BLOB_PATH}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * A social/icon link: an outlined blob whose stroke turns, with the glyph
 * held still in the middle. Hover floods the shape cobalt.
 */
export function IconLink({
  href,
  label,
  path,
  className = "h-14 w-14",
}: {
  href: string;
  label: string;
  /** 24x24 glyph path — see `GLYPH`. */
  path: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`co-focus group/icon relative grid shrink-0 place-items-center ${className}`}
    >
      <BlobShape
        className="co-turn fill-transparent stroke-ink transition-colors duration-300 group-hover/icon:fill-cobalt group-hover/icon:stroke-cobalt"
      />
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="relative h-5 w-5 text-ink transition-colors duration-300 group-hover/icon:text-cream"
      >
        <path d={path} fill="currentColor" />
      </svg>
    </a>
  );
}

/* ------------------------------------------------- decorative graphics */

/** Filled eight-point star used inside the wordmark. */
export function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M50 0 58 34 88 14 68 44 100 50 68 56 88 86 58 66 50 100 42 66 12 86 32 56 0 50 32 44 12 14 42 34Z" />
    </svg>
  );
}

/**
 * The Color Outside lockup. The star is set in `em` so it scales with
 * whatever type size the wordmark is used at.
 */
export function Wordmark({
  className = "",
  starClassName = "text-cobalt",
}: {
  className?: string;
  starClassName?: string;
}) {
  return (
    <span className={`co-wordmark inline-flex items-center ${className}`}>
      Color
      <Star className={`mx-[0.02em] h-[0.66em] w-[0.66em] shrink-0 ${starClassName}`} />
      Outside
    </span>
  );
}

export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path d="M20 4v32M6.7 11.5l26.6 17M33.3 11.5l-26.6 17" />
    </svg>
  );
}

export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="20" cy="20" r="11" />
      <path d="M20 0v40M0 20h40" />
    </svg>
  );
}

/**
 * Rotating "award badge" ring of text.
 *
 * The ring radius comes from `--co-badge-r` (a length, set responsively by
 * the caller) rather than a fixed em, so the text hugs the edge at every
 * badge size instead of bunching in the middle of a large circle.
 */
export function SpinBadge({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const chars = text.split("");
  const step = 360 / chars.length;

  return (
    <div
      className={`relative [--co-badge-r:2.4rem] ${className}`}
      aria-hidden="true"
    >
      <div className="co-spin absolute inset-0">
        {chars.map((char, i) => (
          <span
            key={i}
            className="co-micro absolute left-1/2 top-1/2 origin-[0_0] leading-none"
            style={{
              transform: `rotate(${i * step}deg) translate(0, calc(var(--co-badge-r) * -1))`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none"
        style={{ fontSize: "calc(var(--co-badge-r) * 0.62)" }}
      >
        ✦
      </span>
    </div>
  );
}
