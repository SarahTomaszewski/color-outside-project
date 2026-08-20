import type { Metadata } from "next";
import { Archivo_Narrow, Big_Shoulders, Open_Sans } from "next/font/google";

import "../globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

/* Only the Arrived credit uses this — it's their lockup, not the festival's. */
const openSans = Open_Sans({
  variable: "--font-open-sans-src",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Color Outside — A creative festival, October 17",
  description:
    "A one-day creative festival for people who make things differently. Talks, workshops, and unexpected collaborations at Presidio Park, San Francisco.",
  openGraph: {
    title: "Color Outside",
    description:
      "A creative festival for people who make things differently. October 17, Presidio Park, San Francisco.",
    type: "website",
  },
};

export default function ColorOutsideLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${archivoNarrow.variable} ${openSans.variable} scroll-smooth antialiased`}
      // The inline script below adds `js` before hydration, so the server and
      // client class lists differ by design.
      suppressHydrationWarning
    >
      <head>
        {/*
          Marks the document as script-capable before first paint. The reveal
          animations hide their content only under `.js`, so if this never
          runs the page renders fully visible instead of blank.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="co-page bg-cream font-grotesk text-ink">{children}</body>
    </html>
  );
}
