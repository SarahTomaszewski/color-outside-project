import { About } from "@/components/color-outside/about";
import { Cursor } from "@/components/color-outside/cursor";
import { WhyCome } from "@/components/color-outside/why-come";
import { Faq } from "@/components/color-outside/faq";
import {
  FinalCta,
  FooterMarquee,
  HeroMarquee,
} from "@/components/color-outside/final-cta";
import { Footer } from "@/components/color-outside/footer";
import { Header } from "@/components/color-outside/header";
import { Hero } from "@/components/color-outside/hero";
import { Location } from "@/components/color-outside/location";
import { Loader } from "@/components/color-outside/loader";
import { Principles } from "@/components/color-outside/principles";
import { Schedule } from "@/components/color-outside/schedule";
import { Speakers } from "@/components/color-outside/speakers";
import { Host, Tickets } from "@/components/color-outside/tickets";
import { getEventEnv, getEventId } from "@/lib/happily/config";
import { getPublicEvent } from "@/lib/happily/queries";

export default async function ColorOutsidePage() {
  const eventId = getEventId();
  const env = getEventEnv();
  const { form } = await getPublicEvent({ eventId, env });

  return (
    <>
      <a
        href="#main"
        className="co-focus sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-ink focus:bg-cream focus:px-4 focus:py-3"
      >
        Skip to content
      </a>

      <Loader />
      <Cursor />

      <Header />

      <main id="main">
        <Hero />
        <HeroMarquee />
        <About />
        <Principles />
        <Schedule />
        <Speakers />
        <WhyCome />
        <Tickets eventId={eventId} env={env} form={form ?? null} />
        <Location />
        <Host />
        <Faq />
        <FinalCta />
      </main>

      <FooterMarquee />
      <Footer />
    </>
  );
}
