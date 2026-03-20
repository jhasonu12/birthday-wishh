"use client";

import { useRef, useState } from "react";

type MusicPlayerProps = {
  src: string;
};

export default function MusicPlayer({ src }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const start = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.75;
    audio.muted = false;

    try {
      await audio.play();
      setIsStarted(true);
      setIsMuted(false);
    } catch {
      setIsStarted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="fixed bottom-5 right-5 z-40">
        {!isStarted ? (
          <button
            onClick={start}
            className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/85 px-5 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:bg-fuchsia-400"
          >
            Start Surprise
          </button>
        ) : (
          <button
            onClick={toggleMute}
            className="rounded-full border border-white/20 bg-black/55 px-5 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:bg-black/75"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
        )}
      </div>
    </>
  );
}
