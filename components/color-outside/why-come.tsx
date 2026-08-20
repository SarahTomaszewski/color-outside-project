"use client";

import { useCallback, useRef, useState } from "react";

import { WHY_COME } from "@/lib/content/color-outside";

import { Reveal, RevealLines } from "./motion";
import { SectionLabel } from "./primitives";

/**
 * Where each note rests, plus its lean.
 *
 * `x`/`y` are percentages of the *free track* — the board minus one note —
 * so 0 sits flush left/top and 100 flush right/bottom whatever the note or
 * board is currently sized at. That keeps the arrangement inside the board
 * at every width.
 *
 * The wide row reads right to left: the first line of copy lands on the
 * right. A phone can't fit five across, so `sm` is a taller zigzag instead.
 * Both go out as CSS variables and a media query picks between them, which
 * keeps the server and client markup identical — dragging then writes
 * `left`/`top` inline, and inline wins over the stylesheet.
 */
const NOTES = [
  { tone: "bg-butter", rot: -4, x: 100, y: 0, sx: 100, sy: 0 },
  { tone: "bg-blush", rot: 3, x: 75, y: 100, sx: 4, sy: 25 },
  { tone: "bg-mint", rot: -2, x: 50, y: 0, sx: 96, sy: 50 },
  { tone: "bg-peach", rot: 4, x: 25, y: 100, sx: 0, sy: 75 },
  { tone: "bg-lilac", rot: -3, x: 0, y: 0, sx: 92, sy: 100 },
];

type Pos = { x: number; y: number };

export function WhyCome() {
  const boardRef = useRef<HTMLDivElement>(null);
  // null until a note has been dragged — the resting arrangement is CSS.
  const [pos, setPos] = useState<(Pos | null)[]>(() => NOTES.map(() => null));
  const [dragging, setDragging] = useState<number | null>(null);
  const [top, setTop] = useState<number | null>(null);
  // Pointer offset inside the note, so it doesn't jump to the cursor.
  const grab = useRef({ dx: 0, dy: 0 });

  const onPointerDown = useCallback(
    (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
      const board = boardRef.current;
      if (!board) return;
      // offsetLeft/Top are the untransformed layout position; the note is
      // rotated, and its bounding rect would sit outside its real corner.
      const b = board.getBoundingClientRect();
      const el = e.currentTarget;
      grab.current = {
        dx: e.clientX - (b.left + el.offsetLeft),
        dy: e.clientY - (b.top + el.offsetTop),
      };
      setDragging(i);
      setTop(i);
      el.setPointerCapture(e.pointerId);
    },
    [],
  );

  const onPointerMove = useCallback(
    (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragging !== i) return;
      const board = boardRef.current;
      if (!board) return;
      const b = board.getBoundingClientRect();

      // Layout size, not the rotated bounding box.
      const maxX = Math.max(board.offsetWidth - e.currentTarget.offsetWidth, 0);
      const maxY = Math.max(board.offsetHeight - e.currentTarget.offsetHeight, 0);
      const x = Math.min(Math.max(e.clientX - b.left - grab.current.dx, 0), maxX);
      const y = Math.min(Math.max(e.clientY - b.top - grab.current.dy, 0), maxY);

      // Store against the free track, matching how NOTES is written.
      setPos((prev) =>
        prev.map((p, idx) =>
          idx === i
            ? { x: maxX ? (x / maxX) * 100 : 0, y: maxY ? (y / maxY) * 100 : 0 }
            : p,
        ),
      );
    },
    [dragging],
  );

  const endDrag = useCallback(() => setDragging(null), []);

  return (
    <section
      id="why-come"
      className="co-grain relative overflow-hidden bg-cream text-ink"
      aria-labelledby="why-heading"
    >
      {/* Bars run the whole section; the cream panel below covers the middle,
          leaving them as a frame — down each edge and across top and bottom. */}
      <div aria-hidden="true" className="co-stripes absolute inset-0" />

      {/* The side gutters step up in whole stripe periods (70px from md), so
          the frame shows complete bars rather than a clipped sliver. */}
      <div className="relative px-5 py-14 md:px-10 md:py-20 lg:px-[70px] xl:px-[140px]">
        <div className="mx-auto max-w-[1600px] bg-cream px-5 pb-12 pt-16 text-center md:px-14 md:pb-16 md:pt-24">
          <Reveal anim="fade">
            <SectionLabel number="05" className="justify-center">
              Why come
            </SectionLabel>
          </Reveal>
          <RevealLines
            lines={["Maybe you need…"]}
            className="co-display mt-12 text-center text-[clamp(42px,8vw,140px)] md:mt-16"
          />
          <h2 id="why-heading" className="sr-only">
            Maybe you need
          </h2>

          <Reveal anim="up" delay={140}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed md:mt-10 md:text-2xl">
              A day where the goal is simply to leave more creatively awake than
              you arrived.{" "}
              <span className="font-semibold text-cobalt">
                That&apos;s what this is for.
              </span>
            </p>
          </Reveal>

          {/* The board. Notes are draggable at every width. */}
          <div
            ref={boardRef}
            className="relative mt-10 h-[calc(var(--co-note)*3.4)] text-left [--co-note:clamp(150px,43vw,200px)] md:mt-14 md:h-[calc(var(--co-note)+110px)] md:[--co-note:clamp(210px,19vw,250px)]"
          >
            {WHY_COME.map((line, i) => {
              const p = pos[i];
              return (
                <div
                  key={line}
                  data-cursor-sticker="Drag"
                  onPointerDown={onPointerDown(i)}
                  onPointerMove={onPointerMove(i)}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  style={{
                    ["--co-x" as string]: NOTES[i].x / 100,
                    ["--co-y" as string]: NOTES[i].y / 100,
                    ["--co-sx" as string]: NOTES[i].sx / 100,
                    ["--co-sy" as string]: NOTES[i].sy / 100,
                    ...(p
                      ? {
                          left: `calc((100% - var(--co-note)) * ${p.x / 100})`,
                          top: `calc((100% - var(--co-note)) * ${p.y / 100})`,
                        }
                      : null),
                    rotate: dragging === i ? "0deg" : `${NOTES[i].rot}deg`,
                    // A note's copy sits at its top-left, which is exactly
                    // where its left-hand neighbour overlaps. Stacking by x
                    // keeps every line readable, and survives a drag.
                    zIndex: top === i ? 30 : 10 + Math.round((p?.x ?? NOTES[i].x) / 10),
                  }}
                  className={`co-sticky absolute flex aspect-square h-(--co-note) w-(--co-note) cursor-grab touch-none select-none items-start rounded-[2px] p-4 shadow-[0_10px_24px_-14px_rgb(0_0_0/0.5)] transition-[rotate,box-shadow] duration-200 active:cursor-grabbing md:p-6 ${
                    NOTES[i].tone
                  } ${dragging === i ? "shadow-[0_22px_40px_-18px_rgb(0_0_0/0.55)] cursor-grabbing" : ""}`}
                >
                  <p className="font-grotesk text-[clamp(14px,3.6vw,21px)] font-semibold leading-snug">
                    {line}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
