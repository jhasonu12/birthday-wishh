"use client";

import { useCallback, useState } from "react";
import type { BirthdayPage } from "@/lib/birthdays";
import CodeGate from "@/components/CodeGate";
import UnlockLoader from "@/components/UnlockLoader";
import MusicPlayer from "@/components/MusicPlayer";

type BirthdayVaultPageProps = {
  slug: string;
  page: BirthdayPage;
};

export default function BirthdayVaultPage({ slug, page }: BirthdayVaultPageProps) {
  const [didPassGate, setDidPassGate] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleUnlocked = useCallback(() => {
    setDidPassGate(true);
    setShowLoader(true);
  }, []);

  return (
    <CodeGate title="Birthday Vault" onUnlocked={handleUnlocked}>
      <main className={`min-h-screen ${page.theme.gradientBg} px-4 py-10 md:px-8`}>
        <div className="mx-auto max-w-5xl space-y-8">
          <header
            className={`rounded-3xl border border-white/15 bg-black/35 p-8 backdrop-blur ${page.theme.glowShadow}`}
          >
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/60">Vault ID: {slug}</p>
            <h1 className={`text-4xl font-black md:text-5xl ${page.theme.accentText}`}>
              {page.headline}
            </h1>
            {page.subheadline ? (
              <p className="mt-3 text-lg text-white/80">{page.subheadline}</p>
            ) : null}
          </header>

          <section className="rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur">
            <h2 className="mb-4 text-xl font-semibold text-white">Memory Frames</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.photos.map((photo) => (
                <div
                  key={photo}
                  className="group overflow-hidden rounded-2xl border border-white/15 bg-white/5 transition-transform hover:scale-[1.03]"
                >
                  <img
                    src={photo}
                    alt="Memory"
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur">
            <h2 className="mb-4 text-xl font-semibold text-white">Birthday Notes</h2>
            <div className="space-y-3">
              {page.messages.map((message, index) => (
                <article
                  key={`${message.from}-${index}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-white/90">“{message.text}”</p>
                  <p className={`mt-2 text-sm font-semibold ${page.theme.accentText}`}>— {message.from}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <MusicPlayer src={page.musicSrc} />
      </main>

      <UnlockLoader
        active={didPassGate && showLoader}
        durationMs={3000}
        onComplete={() => setShowLoader(false)}
      />
    </CodeGate>
  );
}
