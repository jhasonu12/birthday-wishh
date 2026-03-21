import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://happy-birthday-pallavi-beta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Happy Birthday Pallavi 🎂💖",
  description: "A special birthday surprise for Pallavi, made with love 💖",
  openGraph: {
    title: "Happy Birthday Pallavi 🎂💖",
    description: "A special birthday surprise for Pallavi, made with love 💖",
    url: BASE_URL,
    siteName: "Happy Birthday Pallavi",
    images: [
      {
        url: `${BASE_URL}/photos/ayesha/puzzle.jpg`,
        width: 1200,
        height: 630,
        alt: "Happy Birthday Pallavi",
        type: "image/jpeg",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday Pallavi 🎂💖",
    description: "A special birthday surprise for Pallavi, made with love 💖",
    images: [
      {
        url: `${BASE_URL}/photos/ayesha/puzzle.jpg`,
        width: 1200,
        height: 630,
        alt: "Happy Birthday Pallavi",
      },
    ],
  },
  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content={`${BASE_URL}/photos/ayesha/puzzle.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:image" content={`${BASE_URL}/photos/ayesha/puzzle.jpg`} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
