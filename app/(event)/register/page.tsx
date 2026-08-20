import { EventPage } from "@/components/event-page";
import { getEventEnv, getEventId } from "@/lib/happily/config";
import { getPublicEvent } from "@/lib/happily/queries";

export default async function Home() {
  const eventId = getEventId();
  const env = getEventEnv();
  const eventData = await getPublicEvent({ eventId, env });

  return <EventPage eventData={eventData} eventId={eventId} env={env} />;
}
