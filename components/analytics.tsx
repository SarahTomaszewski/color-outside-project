/**
 * Happily's analytics tag. Rendered in the <head> of both root layouts —
 * the festival group and the starter group — so every route is counted.
 * Kept in one component so the website id lives in a single place.
 */
export function Analytics() {
  return (
    <script
      defer
      src="https://hx.happily.events/script.js"
      data-host-url="https://hx.happily.events"
      data-website-id="9be3dd04-cbae-41b3-b697-0aa3ef3e4222"
    />
  );
}
