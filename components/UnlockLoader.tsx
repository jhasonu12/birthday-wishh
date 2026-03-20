"use client";

import { useEffect, useState } from "react";

type UnlockLoaderProps = {
  active: boolean;
  durationMs?: number;
  onComplete?: () => void;
};

export default function UnlockLoader({
  active,
  durationMs = 3000,
  onComplete,
}: UnlockLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      return;
    }

    const startedAt = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 30);

    return () => clearInterval(timer);
  }, [active, durationMs, onComplete]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 px-6 text-white">
      <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur">
        <p className="mb-3 text-center text-sm uppercase tracking-[0.2em] text-white/70">
          Scanning QR memory signature…
        </p>

        <div className="relative mb-4 h-44 overflow-hidden rounded-xl border border-cyan-300/40 bg-gradient-to-b from-cyan-500/10 to-transparent">
          <div className="animate-scan absolute left-0 right-0 h-10 bg-gradient-to-b from-cyan-300/25 via-cyan-300/55 to-transparent" />
        </div>

        <div className="mb-2 h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-300 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-right text-sm text-cyan-200">{progress}%</p>
      </div>
    </div>
  );
}
