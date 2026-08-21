import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../globals.css";

import { Analytics } from "@/components/analytics";
import { EventShell } from "@/components/event-shell";
import { styleValue } from "@/components/helpers";
import { getPublicEvent } from "@/lib/happily/queries";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { event } = await getPublicEvent();
  const { metadata } = event;

  return {
    title: metadata.title || event.name,
    description: metadata.description || "",
    ...(metadata.allow_search_engine_indexing === false && {
      robots: "noindex, nofollow",
    }),
    openGraph: {
      ...(metadata.image_url && { images: [metadata.image_url] }),
    },
  };
}

export default async function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const eventData = await getPublicEvent();
  const styles = eventData.event.styles;

  const eventVars = {
    "--event-primary-bg": styleValue(styles, "primaryBg", "#171717"),
    "--event-primary-text": styleValue(styles, "primaryText", "#ffffff"),
    "--event-secondary-bg": styleValue(styles, "secondaryBg", "#f4f4f5"),
    "--event-secondary-text": styleValue(styles, "secondaryText", "#171717"),
    "--event-accent-bg": styleValue(styles, "accentBg", "#171717"),
    "--event-accent-text": styleValue(styles, "accentText", "#ffffff"),
    "--event-base-bg": styleValue(styles, "baseBg", "#ffffff"),
    "--event-base-text": styleValue(styles, "baseText", "#171717"),
    "--event-border-radius": styleValue(styles, "borderRadius", "8px"),
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={`${openSans.variable} ${openSans.className} h-full antialiased`}
    >
      <head>
        <Analytics />
      </head>
      <body style={eventVars} className="min-h-full flex flex-col">
        <EventShell eventData={eventData}>{children}</EventShell>
      </body>
    </html>
  );
}
