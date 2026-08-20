"use client";

import {
  type CalendarEvent,
  downloadIcsFile,
  generateICSContent,
} from "@/lib/happily/calendar";

import { CTAArrow, ctaClassName } from "./primitives";

/**
 * One yellow CTA that hands over an .ics file — every calendar app imports
 * it, so a single button covers Apple, Google, Outlook and the rest.
 *
 * The starter's `<AddToCalendar>` is themed with `--event-*` custom
 * properties this route group doesn't define, so this reuses the generator
 * from `lib/happily/calendar.ts` and wears the festival's palette instead.
 */
export function AddToCalendar({
  event,
  className = "",
}: {
  event: CalendarEvent;
  className?: string;
}) {
  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => downloadIcsFile(generateICSContent(event))}
        className={ctaClassName({ tone: "butter" })}
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          Add to calendar
        </span>
        <CTAArrow />
      </button>
    </div>
  );
}
