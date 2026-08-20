import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { EVENT } from "@/lib/content/color-outside";

export const alt =
  "Color Outside — a creative festival, Saturday October 17, Presidio Park, San Francisco";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Palette mirrors app/color-outside.css. Satori has no CSS-variable support,
   so the values are repeated here rather than referenced. */
const CREAM = "#fdf8f5";
const INK = "#1b1830";
const COBALT = "#2233d6";
const BUTTER = "#ffe372";

/** The wordmark's eight-point star, drawn inline so no asset is needed. */
const STAR =
  "M50 0 58 34 88 14 68 44 100 50 68 56 88 86 58 66 50 100 42 66 12 86 32 56 0 50 32 44 12 14 42 34Z";

export default async function OpengraphImage() {
  const [display, body] = await Promise.all([
    readFile(join(process.cwd(), "assets/BigShouldersDisplay-Black.ttf")),
    readFile(join(process.cwd(), "assets/ArchivoNarrow-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CREAM,
          color: INK,
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {/* the striped frame, as flat bars */}
        {/* Satori doesn't resolve the `inset` shorthand — offsets are explicit. */}
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
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 32,
                height: "100%",
                marginRight: 38,
                background: COBALT,
                opacity: 0.16,
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: "Archivo",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 18, height: 18, background: COBALT }} />
          <div>{`${EVENT.date} · ${EVENT.startTime} · ${EVENT.place}`}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "BigShoulders",
              fontSize: 190,
              lineHeight: 0.84,
              letterSpacing: -6,
              textTransform: "uppercase",
            }}
          >
            <div>Color</div>
            <svg width={118} height={118} viewBox="0 0 100 100" style={{ margin: "0 6px" }}>
              <path d={STAR} fill={COBALT} />
            </svg>
            <div>Outside</div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontFamily: "Archivo",
              fontSize: 34,
              color: INK,
              opacity: 0.85,
            }}
          >
            {EVENT.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              background: COBALT,
              color: BUTTER,
              fontFamily: "BigShoulders",
              fontSize: 34,
              letterSpacing: 1,
              textTransform: "uppercase",
              padding: "16px 34px",
              borderRadius: 999,
            }}
          >
            Get your ticket — it&apos;s free
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Archivo",
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            {`Hosted by ${EVENT.host}`}
          </div>
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
