export type BirthdayMessage = {
  from: string;
  text: string;
};

export type BirthdayTheme = {
  gradientBg: string;
  accentText: string;
  glowShadow: string;
};

export type BirthdayPage = {
  headline: string;
  subheadline?: string;
  theme: BirthdayTheme;
  musicSrc: string;
  photos: string[];
  messages: BirthdayMessage[];
};

export const birthdays: Record<string, BirthdayPage> = {
  "ayesha-2026": {
    headline: "Happy Birthday, Ayesha!",
    subheadline: "A vault of moments, smiles, and sparkles just for you.",
    theme: {
      gradientBg:
        "bg-gradient-to-br from-fuchsia-950 via-violet-900 to-indigo-950",
      accentText: "text-fuchsia-300",
      glowShadow: "shadow-[0_0_40px_rgba(217,70,239,0.28)]",
    },
    musicSrc: "/music/ayesha-theme.mp3",
    photos: [
      "/photos/ayesha/eff8bcae-bbf1-454e-8698-05a863fb2d3c.png",
      "/photos/ayesha/puzzle.jpg",
      "/photos/ayesha/WhatsApp%20Image%202026-03-23%20at%203.53.06%20PM.jpeg",
      "/photos/ayesha/ayesha-03.jpeg",
      "/photos/ayesha/WhatsApp%20Image%202026-03-23%20at%205.14.08%20PM.jpeg",
      "/photos/ayesha/ayesha-05.jpeg",
      "/photos/ayesha/ayesha-06.jpeg",
      "/photos/ayesha/WhatsApp%20Image%202026-03-23%20at%205.14.09%20PM.jpeg",
      "/photos/ayesha/WhatsApp%20Image%202026-03-23%20at%205.14.10%20PM%20(1).jpeg",
      "/photos/ayesha/WhatsApp%20Image%202026-03-23%20at%205.14.10%20PM%20(2).jpeg",
      "/photos/ayesha/WhatsApp%20Image%202026-03-23%20at%205.14.10%20PM.jpeg",
    ],
    messages: [
      {
        from: "Your Crew",
        text: "May this year bring gentle magic, bold dreams, and endless laughter.",
      },
      {
        from: "Future You",
        text: "You are already becoming everything you hoped for. Keep glowing.",
      },
    ],
  },
  "rahul-25": {
    headline: "Rahul Turns 25!",
    subheadline: "Quarter-century unlocked. New levels begin now.",
    theme: {
      gradientBg:
        "bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950",
      accentText: "text-emerald-300",
      glowShadow: "shadow-[0_0_40px_rgba(16,185,129,0.26)]",
    },
    musicSrc: "/music/rahul-theme.mp3",
    photos: [
      "/photos/rahul/snapshot-1.jpg",
      "/photos/rahul/snapshot-2.jpg",
      "/photos/rahul/snapshot-3.jpg",
    ],
    messages: [
      {
        from: "Family",
        text: "To 25 years of kindness, courage, and a heart that lifts everyone.",
      },
      {
        from: "Friends",
        text: "More adventures, more wins, and more late-night laughs ahead!",
      },
    ],
  },
};
