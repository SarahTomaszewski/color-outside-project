/**
 * Content for the Color Outside festival site.
 *
 * Everything the page renders lives here so sections stay presentational.
 * Images are local files under `public/` — swap `src` for new art without
 * touching a component.
 */

export type Img = {
  src: string;
  alt: string;
};

export const EVENT = {
  name: "Color Outside",
  tagline: "A creative festival for people who make things differently.",
  eyebrow:
    "One day for big ideas, weird experiments & better creative work",
  date: "Saturday, October 17",
  time: "10:00 AM - 6:00 PM",
  /** Doors. The full range lives in `time`. */
  startTime: "10:00 AM",
  place: "Presidio Park, San Francisco",
  host: "Bright Hours Studio",
  ticketHref: "#register",
} as const;

// Tickets is deliberately absent — the CTA button already covers it.
export const NAV = [
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#schedule" },
  { label: "Lineup", href: "#speakers" },
  { label: "Location", href: "#location" },
  { label: "Host", href: "#host" },
  { label: "FAQ", href: "#faq" },
] as const;

/* ---------------------------------------------------------- principles */

export const PRINCIPLES = [
  {
    n: "01",
    title: "Experiment",
    body: "Try the version you normally talk yourself out of making.",
  },
  {
    n: "02",
    title: "Connect",
    body: "Meet creative people outside your usual feed, team, or discipline.",
  },
  {
    n: "03",
    title: "Make",
    body: "Leave with something you actually created—not just pages of notes.",
  },
  {
    n: "04",
    title: "Reset",
    body: "Step outside your normal workflow and remember why you liked making things in the first place.",
  },
] as const;

/* ------------------------------------------------------------ schedule */

export const SCHEDULE = [
  {
    time: "10:00 AM",
    title: "Doors + Coffee + Creative Warm-Up",
    type: "Welcome",
    body: "Grab your badge, find a seat, meet somebody new, and ease into the day with a quick collaborative prompt.",
  },
  {
    time: "10:45 AM",
    title: "Opening Talk — Stop Making the Obvious Version",
    type: "Talk",
    body: "A conversation about taste, experimentation, and why your first idea probably shouldn't be your final one.",
  },
  {
    time: "11:30 AM",
    title: "The Inspiration Remix",
    type: "Workshop",
    body: "Turn one unexpected reference into five completely different visual directions.",
  },
  {
    time: "12:30 PM",
    title: "Lunch + Open Studio",
    type: "Break",
    body: "Food, music, mini installations, sketch tables, and room to wander.",
  },
  {
    time: "2:00 PM",
    title: "Good Work Can Be a Little Wrong",
    type: "Talk",
    body: "Why personality, friction, imperfection, and surprise still matter in a world of optimized creative tools.",
  },
  {
    time: "2:45 PM",
    title: "Make It Bigger",
    type: "Workshop",
    body: "Take an existing idea and push it past the version you would normally ship.",
  },
  {
    time: "4:00 PM",
    title: "Creative Roulette",
    type: "Session",
    body: "Rapid-fire prompts. Random teams. Thirty minutes. No overthinking.",
  },
  {
    time: "5:00 PM",
    title: "What Are You Making Next?",
    type: "Panel",
    body: "A candid discussion about keeping creative momentum alive after the event ends.",
  },
  {
    time: "5:45 PM",
    title: "Drinks + Show & Tell",
    type: "Social",
    body: "Hang out, share what you made, and meet the people behind the work.",
  },
] as const;

/* ------------------------------------------------------------ speakers */

export const SPEAKERS = [
  {
    name: "Nia Brooks",
    social: { href: "#" },
    role: "Independent Creative Director",
    bio: "Nia works across identity, editorial, and cultural projects with a focus on expressive visual systems and unexpected storytelling.",
    note: "Her philosophy: if an idea feels completely comfortable, it probably isn't finished yet.",
    image: {
      src: "/image-woman-1.webp",
      alt: "Portrait of Nia Brooks",
    },
  },
  {
    name: "Julian Park",
    social: { href: "#" },
    role: "Designer + Image Maker",
    bio: "Julian blends photography, collage, typography, and digital experimentation to create work that sits somewhere between graphic design and visual chaos.",
    note: "He'll be talking about building a personal visual language without turning yourself into a “brand.”",
    image: {
      src: "/image-man-1.webp",
      alt: "Portrait of Julian Park",
    },
  },
  {
    name: "Maya Chen",
    social: { href: "#" },
    role: "Creative Technologist",
    bio: "Maya creates playful digital experiences that mix interaction design, code, and emerging technology.",
    note: "Her work explores how new tools can create more room for curiosity—not just more efficiency.",
    image: {
      src: "/image-woman-2.webp",
      alt: "Portrait of Maya Chen",
    },
  },
  {
    name: "Ellis Monroe",
    social: { href: "#" },
    role: "Illustrator + Educator",
    bio: "Ellis is known for bold shapes, strange characters, and a process built around sketching badly until something good appears.",
    note: "Their session is about letting go of the need to make every creative decision look intentional.",
    image: {
      src: "/image-man-2.webp",
      alt: "Portrait of Ellis Monroe",
    },
  },
] as const;

/* ------------------------------------------------------------ why come */

export const WHY_COME = [
  "A new reference.",
  "A weird idea.",
  "A conversation outside your industry.",
  "Permission to make something pointless.",
  "A reminder that not everything needs to become a case study.",
] as const;

/* ------------------------------------------------------------- tickets */

/** One pass, free on registration. */
export const TICKET = {
  name: "Festival Pass",
  price: "Free",
  blurb:
    "Full access to the festival at Presidio Park, San Francisco. Tell us who you are and it's yours.",
  features: [
    "All talks",
    "All workshops",
    "Creative materials",
    "Lunch + snacks",
    "After-hours drinks",
    "Event goodies",
  ],
  cta: "Get your ticket",
  tone: "blush",
  button: "butter",
} as const;

/* ------------------------------------------------------------ location */

/** Venue detail. Address and travel notes are still placeholders. */
export const LOCATION = {
  venue: "Presidio Park",
  city: "San Francisco, CA",
  address: "Presidio of San Francisco, CA 94129",
  mapQuery: "Presidio of San Francisco",
  /* Local files from `public/`. Next runs with `unoptimized: true`, so these
     ship at their source size — export them at the size they render. The
     high-res masters live in `image-sources/`, which git ignores. */
  images: [
    {
      src: "/presidio-park-2.webp",
      alt: "Presidio Park, San Francisco",
    },
    {
      src: "/presidio-park-3.webp",
      alt: "Trees and pathways in the Presidio",
    },
    {
      src: "/presidio-park-1.jpeg",
      alt: "Open parkland at the Presidio",
    },
  ],
  notes: [
    {
      label: "Getting there",
      body: "Muni and the Presidio Go shuttle both stop a few minutes' walk from the entrance. If you're coming from downtown, allow about half an hour.",
    },
    {
      label: "Parking + bikes",
      body: "There is paid parking on site and covered bike racks by the main doors. We'd nudge you towards the bike racks.",
    },
    {
      label: "Access",
      body: "Step-free entry throughout, accessible bathrooms on every floor, and a quiet room off the main hall. Tell us what you need when you register.",
    },
  ],
} as const;

/* ------------------------------------------------------------ partners */

export const PARTNERS = [
  { name: "Paper Jam Press", role: "Print Partner", style: "serif" },
  { name: "Odd Hours", role: "Creative Tools Partner", style: "display" },
  { name: "Open Studio LA", role: "Community Partner", style: "mono" },
  { name: "Dayglow Coffee", role: "Coffee Partner", style: "italic" },
] as const;

/* ----------------------------------------------------------------- faq */

export const FAQS = [
  {
    q: "Do I need to be a professional designer?",
    a: "No. If you make things—or simply enjoy the process of making things—you'll have plenty to do here.",
  },
  {
    q: "Do I need to bring anything?",
    a: "Bring a laptop or tablet if you want, but you won't need one for most activities. We'll provide basic creative materials. Bring your favorite notebook if you have one.",
  },
  {
    q: "Are workshops included?",
    a: "Yes. All workshops and activities are included with your ticket. Some sessions may have limited capacity and will be first come, first served.",
  },
  {
    q: "What should I wear?",
    a: "Whatever makes you feel like yourself. Bright colors encouraged. Weird accessories appreciated. Comfort highly recommended.",
  },
  {
    q: "Is food included?",
    a: "Yes. Lunch, snacks, coffee, and non-alcoholic drinks are all available for purchase.",
  },
] as const;
