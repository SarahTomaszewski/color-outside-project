import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { EVENT } from "@/lib/content/color-outside";

export const alt =
  "Color Outside — a creative festival, Saturday October 17, Presidio Park, San Francisco";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Mirrors the hero: blush ground, the same 45px bar field, the eyebrow line
   and where/when up top, and the wordmark running full bleed along the
   bottom. Satori has no CSS variables, so the palette is repeated here. */
const BLUSH = "#f2a8ec";
const INK = "#1b1830";
const COBALT = "#2233d6";

/** Matches the hero's `CELL_W` — 45px bar, 45px gap. */
const BAR_W = 45;

/** The wordmark's eight-point star, drawn inline so no asset is needed. */
const STAR =
  "M50 0 58 34 88 14 68 44 100 50 68 56 88 86 58 66 50 100 42 66 12 86 32 56 0 50 32 44 12 14 42 34Z";

export default async function OpengraphImage() {
  const [display, body] = await Promise.all([
    readFile(join(process.cwd(), "assets/BigShouldersDisplay-Black.ttf")),
    readFile(join(process.cwd(), "assets/ArchivoNarrow-Regular.ttf")),
  ]);

  const micro = {
    fontFamily: "Archivo",
    fontSize: 24,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
    color: INK,
  };

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BLUSH,
          color: INK,
          padding: "52px 48px 40px",
        }}
      >
        {/* the hero's bar field, flattened to static bars */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
          }}
        >
          {Array.from({ length: Math.ceil(size.width / (BAR_W * 2)) }).map(
            (_, i) => (
              <div
                key={i}
                style={{
                  width: BAR_W,
                  height: "100%",
                  marginRight: BAR_W,
                  background: INK,
                  opacity: 0.055,
                }}
              />
            ),
          )}
        </div>

        {/* eyebrow left, where/when right — the hero's two columns */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              maxWidth: 640,
              fontFamily: "BigShoulders",
              fontSize: 58,
              lineHeight: 0.95,
              letterSpacing: -1,
              textTransform: "uppercase",
            }}
          >
            {EVENT.eyebrow}
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "right" }}
          >
            <div style={micro}>{EVENT.date}</div>
            <div style={micro}>{EVENT.time}</div>
            <div style={micro}>{EVENT.place}</div>
          </div>
        </div>

        {/* the hero's tagline, holding the middle of the frame */}
        <div
          style={{
            display: "flex",
            maxWidth: 760,
            fontFamily: "Archivo",
            fontSize: 32,
            lineHeight: 1.35,
            color: INK,
            opacity: 0.85,
          }}
        >
          {EVENT.tagline}
        </div>

        {/* full-bleed wordmark, as in the hero */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "BigShoulders",
            fontSize: 196,
            lineHeight: 0.78,
            letterSpacing: -7,
            textTransform: "uppercase",
          }}
        >
          <div>Color</div>
          <svg width={124} height={124} viewBox="0 0 100 100" style={{ margin: "0 4px" }}>
            <path d={STAR} fill={COBALT} />
          </svg>
          <div>Outside</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "BigShoulders", data: display, style: "normal", weight: 900 },
        { name: "Archivo", data: body, style: "normal", weight: 400 },
      ],
    },
  );
}
