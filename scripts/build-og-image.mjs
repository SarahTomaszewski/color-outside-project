/**
 * Bakes the event details onto the supplied social artwork.
 *
 * `assets/og-base.png` is the artwork as delivered — wordmark on the striped
 * ground. This lays the date/time/place above it and the tagline below, then
 * writes the result to `app/(color-outside)/opengraph-image.png`, which Next
 * picks up by file convention.
 *
 * Run after changing the copy or replacing the base art:
 *   node scripts/build-og-image.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og.js";

const ROOT = process.cwd();
const OUT = join(ROOT, "app/(color-outside)/opengraph-image.png");

const INK = "#1b1830";

// Kept in step with lib/content/color-outside.ts by hand — this script runs
// outside the bundler, so it can't import the TS module directly.
const EVENT = {
  date: "Saturday, October 17",
  time: "10:00 AM – 6:00 PM",
  place: "Presidio Park, San Francisco",
  tagline: "A creative festival for people who make things differently.",
};

const [base, display, body] = await Promise.all([
  readFile(join(ROOT, "assets/og-base.png")),
  readFile(join(ROOT, "assets/BigShouldersDisplay-Black.ttf")),
  readFile(join(ROOT, "assets/ArchivoNarrow-Regular.ttf")),
]);

const response = new ImageResponse(
  {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundImage: `url(data:image/png;base64,${base.toString("base64")})`,
        backgroundSize: "1200px 630px",
      },
      children: [
        // where and when, sitting above the wordmark
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 176,
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              fontFamily: "Archivo",
              fontSize: 23,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: INK,
            },
            children: `${EVENT.date} · ${EVENT.time} · ${EVENT.place}`,
          },
        },
        // the tagline, below it
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 404,
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              fontFamily: "BigShoulders",
              fontSize: 42,
              letterSpacing: -0.5,
              textTransform: "uppercase",
              color: INK,
            },
            children: EVENT.tagline,
          },
        },
      ],
    },
  },
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: "BigShoulders", data: display, style: "normal", weight: 900 },
      { name: "Archivo", data: body, style: "normal", weight: 400 },
    ],
  },
);

await writeFile(OUT, Buffer.from(await response.arrayBuffer()));
console.log(`wrote ${OUT}`);
