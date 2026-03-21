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

export const metadata: Metadata = {
  metadataBase: new URL("https://happy-birthday-pallavi-beta.vercel.app"),
  title: "Happy Birthday Pallavi 🎂💖",
  description: "A special birthday surprise for Pallavi, made with love 💖",
  openGraph: {
    title: "Happy Birthday Pallavi 🎂💖",
    description: "A special birthday surprise for Pallavi, made with love 💖",
    url: "https://happy-birthday-pallavi-beta.vercel.app",
    siteName: "Happy Birthday Pallavi",
    images: [
      {
        url: "https://happy-birthday-pallavi-beta.vercel.app/photos/ayesha/puzzle.jpg",
        width: 1200,
        height: 630,
        alt: "Happy Birthday Pallavi",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Birthday Pallavi 🎂💖",
    description: "A special birthday surprise for Pallavi, made with love 💖",
    images: ["https://happy-birthday-pallavi-beta.vercel.app/photos/ayesha/puzzle.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
