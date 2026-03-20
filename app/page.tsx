"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Baloo_2 } from "next/font/google";
import { motion } from "motion/react";
import { Heart, Gift, Star, Cake, Mail } from "lucide-react";
import { SITE_ENTRY_CODE, SITE_GATE_STORAGE_KEY } from "@/lib/siteAuth";

const cuteFont = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

type Screen = "loading" | "passkey" | "ready" | "decorate" | "candle" | "puzzle" | "balloons" | "album" | "message";
const PUZZLE_IMAGE_SRC = "/photos/ayesha/puzzle.jpg";
const BALLOON_WORDS = ["You", "are", "a", "Cutiee"];
const ALBUM_PHOTOS = [
  "/photos/ayesha/puzzle.jpg",
  "/photos/ayesha/puzzle.jpg",
  "/photos/ayesha/puzzle.jpg",
  "/photos/ayesha/puzzle.jpg",
  "/photos/ayesha/puzzle.jpg",
];
const LOVE_MESSAGES = [
  "You make ordinary days feel magical 💖",
  "I am so grateful to have you in my life 🌸",
  "Your smile is my favorite place to be ✨",
  "Happy birthday, my sweetest person 🫶",
];

const isSolved = (tiles: number[]) => tiles.every((tile, index) => tile === index);

const createShuffledTiles = () => {
  const tiles = Array.from({ length: 9 }, (_, i) => i);

  do {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (isSolved(tiles));

  return tiles;
};

function ThemeShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50 via-violet-50 to-amber-50 px-6 text-center">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY }}
        className="pointer-events-none absolute -left-2 top-10 text-rose-300"
      >
        <Heart className="h-12 w-12 fill-rose-200/60" />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 8, -8, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        className="pointer-events-none absolute right-8 top-20 text-violet-300"
      >
        <Star className="h-8 w-8 fill-violet-200/70" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY }}
        className="pointer-events-none absolute bottom-12 left-4 text-pink-300"
      >
        <Heart className="h-10 w-10 fill-pink-200/60" />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY }}
        className="pointer-events-none absolute bottom-10 right-7 text-rose-300"
      >
        <Star className="h-9 w-9 fill-rose-200/60" />
      </motion.div>
      {children}
    </section>
  );
}

function CakeArt({ lit = false, decorated = false }: { lit?: boolean; decorated?: boolean }) {
  return (
    <div className="relative mx-auto h-72 w-full max-w-[280px]">
      <div className="absolute bottom-2 left-1/2 z-0 h-8 w-64 -translate-x-1/2 rounded-full bg-white shadow-[0_8px_16px_rgba(0,0,0,0.08)]" />

      <div className="absolute bottom-10 left-1/2 z-10 h-12 w-60 -translate-x-1/2 rounded-full bg-gradient-to-b from-rose-100 to-rose-500 shadow-[inset_0_-7px_12px_rgba(190,24,93,0.35)]" />
      <div className="absolute bottom-[5.25rem] left-1/2 z-20 h-12 w-60 -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-100 to-rose-400 shadow-[inset_0_-7px_12px_rgba(190,24,93,0.3)]" />

      <div className="absolute bottom-[8.2rem] left-1/2 z-30 h-16 w-60 -translate-x-1/2 rounded-full bg-[#fff8df] shadow-[inset_0_-8px_12px_rgba(244,114,182,0.22)]" />
      <div className="absolute bottom-[7.1rem] left-[2.6rem] z-40 h-8 w-10 rounded-b-full bg-[#fff8df]" />
      <div className="absolute bottom-[7.05rem] left-1/2 z-40 h-10 w-12 -translate-x-1/2 rounded-b-full bg-[#fff8df]" />
      <div className="absolute bottom-[7.1rem] right-[2.6rem] z-40 h-8 w-10 rounded-b-full bg-[#fff8df]" />

      <div className="absolute left-1/2 top-2 z-50 h-16 w-4 -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-400 to-rose-500" />
      {lit ? (
        <div className="absolute left-1/2 top-[-10px] z-[60] h-5 w-5 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.9)] animate-pulse" />
      ) : null}

      {decorated ? (
        <>
          <div className="absolute bottom-[9.6rem] left-[4.2rem] z-[55] h-2.5 w-2.5 rounded-full bg-fuchsia-300" />
          <div className="absolute bottom-[9.9rem] left-[6.1rem] z-[55] h-2.5 w-2.5 rounded-full bg-amber-300" />
          <div className="absolute bottom-[9.45rem] left-[8.1rem] z-[55] h-2.5 w-2.5 rounded-full bg-violet-300" />
          <div className="absolute bottom-[9.9rem] left-[10.2rem] z-[55] h-2.5 w-2.5 rounded-full bg-rose-300" />
          <div className="absolute bottom-[9.55rem] right-[8.1rem] z-[55] h-2.5 w-2.5 rounded-full bg-cyan-300" />
          <div className="absolute bottom-[9.95rem] right-[6.1rem] z-[55] h-2.5 w-2.5 rounded-full bg-pink-300" />
          <div className="absolute bottom-[9.45rem] right-[4.2rem] z-[55] h-2.5 w-2.5 rounded-full bg-lime-300" />

          <div className="absolute left-3 top-12 z-[45] text-2xl text-pink-300">✦</div>
          <div className="absolute right-3 top-14 z-[45] text-2xl text-violet-300">✦</div>
          <div className="absolute left-10 top-28 z-[45] text-xl text-amber-300">•</div>
          <div className="absolute right-10 top-28 z-[45] text-xl text-fuchsia-300">•</div>
        </>
      ) : null}
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [candleLit, setCandleLit] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [tiles, setTiles] = useState<number[]>([]);
  const [dragSource, setDragSource] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState<boolean[]>(() => BALLOON_WORDS.map(() => false));
  const albumScrollerRef = useRef<HTMLDivElement | null>(null);
  const touchDragSourceRef = useRef<number | null>(null);
  const [messageStage, setMessageStage] = useState(0);

  useEffect(() => {
    if (localStorage.getItem(SITE_GATE_STORAGE_KEY) === "1") {
      setScreen("ready");
      return;
    }

    const duration = 3000;
    const startedAt = Date.now();

    setProgress(0);

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
    }, 30);

    const loadingTimer = setTimeout(() => {
      setProgress(100);
      setScreen("passkey");
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (code.trim() === SITE_ENTRY_CODE) {
      localStorage.setItem(SITE_GATE_STORAGE_KEY, "1");
      setError("");
      setScreen("ready");
      return;
    }
    setError("Wrong passkey. Try again.");
  };

  const startPuzzle = () => {
    setTiles(createShuffledTiles());
    setDragSource(null);
    setDragOver(null);
    setPuzzleSolved(false);
    setScreen("puzzle");
  };

  const handleDragStart = (index: number) => {
    if (puzzleSolved) return;
    setDragSource(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragSource !== null && dragSource !== index) {
      setDragOver(index);
    }
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragSource === null || dragSource === index || puzzleSolved) {
      setDragSource(null);
      setDragOver(null);
      return;
    }
    setTiles((current) => {
      const next = [...current];
      [next[dragSource], next[index]] = [next[index], next[dragSource]];
      if (isSolved(next)) setPuzzleSolved(true);
      return next;
    });
    setDragSource(null);
    setDragOver(null);
  };

  const handleDragEnd = () => {
    setDragSource(null);
    setDragOver(null);
  };

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    if (puzzleSolved) return;
    e.preventDefault();
    touchDragSourceRef.current = index;
    setDragSource(index);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
    const idx = el ? Number(el.dataset.puzzleIndex) : NaN;
    if (!isNaN(idx) && idx !== touchDragSourceRef.current) {
      setDragOver(idx);
    } else {
      setDragOver(null);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
    const targetIdx = el ? Number(el.dataset.puzzleIndex) : NaN;
    const sourceIdx = touchDragSourceRef.current;
    if (sourceIdx !== null && !isNaN(targetIdx) && targetIdx !== sourceIdx && !puzzleSolved) {
      setTiles((current) => {
        const next = [...current];
        [next[sourceIdx], next[targetIdx]] = [next[targetIdx], next[sourceIdx]];
        if (isSolved(next)) setPuzzleSolved(true);
        return next;
      });
    }
    touchDragSourceRef.current = null;
    setDragSource(null);
    setDragOver(null);
  };

  const startBalloonGame = () => {
    setPoppedBalloons(BALLOON_WORDS.map(() => false));
    setScreen("balloons");
  };

  const handleBalloonPop = (index: number) => {
    setPoppedBalloons((current) => {
      if (current[index]) return current;
      const next = [...current];
      next[index] = true;
      return next;
    });
  };

  const openAlbum = () => {
    setScreen("album");
    requestAnimationFrame(() => {
      albumScrollerRef.current?.scrollTo({ left: 0, behavior: "auto" });
    });
  };

  const openMessageSlider = () => {
    setMessageStage(0);
    setScreen("message");
  };

  const openNextMessageStage = () => {
    setMessageStage((current) => Math.min(LOVE_MESSAGES.length, current + 1));
  };

  const poppedCount = poppedBalloons.filter(Boolean).length;
  const allBalloonsPopped = poppedCount === BALLOON_WORDS.length;

  return (
    <main className="min-h-screen bg-black text-white">
      {screen === "loading" ? (
        <ThemeShell>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mx-auto flex max-w-2xl flex-col items-center rounded-[2rem] border border-rose-100 bg-white/55 px-8 py-16 shadow-[0_20px_60px_rgba(236,72,153,0.14)] backdrop-blur"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="mb-5"
            >
              <Cake className="h-14 w-14 text-fuchsia-500" strokeWidth={2.2} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-extrabold tracking-wide text-slate-700 md:text-4xl"
            >
              Loading your birthday surprise...
            </motion.p>
            <div className="mt-10 w-full max-w-md overflow-hidden rounded-full border-2 border-fuchsia-300 bg-white/80 p-1">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-fuchsia-500">{progress}%</p>
            <p className="mt-5 text-sm font-medium text-slate-500">Preparing memories, music, and wishes ✨</p>
          </motion.div>
        </ThemeShell>
      ) : null}

      {screen === "passkey" ? (
        <ThemeShell>
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-xl rounded-[2rem] border border-rose-100 bg-white/60 px-8 py-10 shadow-[0_20px_60px_rgba(236,72,153,0.14)] backdrop-blur"
          >
            <p className="text-5xl">🔐</p>
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 text-3xl font-black text-slate-800"
            >
              Enter Secret Passkey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-2 text-slate-600"
            >
              Use the birthday vault code to continue.
            </motion.p>

            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter passkey"
              className="mt-6 w-full rounded-xl border border-fuchsia-300 bg-white/90 px-4 py-3 text-center text-lg font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-fuchsia-300"
            />

            {error ? <p className="mt-3 text-sm font-semibold text-rose-500">{error}</p> : null}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-3 font-bold text-white transition hover:brightness-110"
            >
              Unlock Surprise
            </motion.button>
          </form>
        </ThemeShell>
      ) : null}

      {screen === "ready" ? (
        <ThemeShell>
          <div
            className={`mx-auto w-full max-w-md rounded-[2rem] border border-rose-100 bg-white/75 p-4 shadow-[0_18px_45px_rgba(236,72,153,0.16)] backdrop-blur ${cuteFont.className}`}
          >
            <div>
              <div className="rounded-[1.2rem] bg-gradient-to-b from-rose-100 via-pink-100 to-violet-100 px-4 py-7">
                <p className="text-6xl">🐼</p>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-5 text-[20px] font-extrabold leading-tight text-fuchsia-700 md:text-[22px]"
              >
                A Cutiepie was born today,
                <br />
                26 years ago!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="mt-3 text-[20px] font-medium text-slate-500"
              >
                Yes, it&apos;s YOU! A little surprise awaits...
              </motion.p>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setScreen("decorate");
                  }}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-200 to-pink-200 px-5 py-3 text-[20px] font-semibold text-fuchsia-700 shadow-[inset_0_-4px_8px_rgba(168,85,247,0.18)] transition hover:brightness-105"
                >
                  <Gift className="mr-2 h-5 w-5" />
                  Start the surprise
                </Link>
              </motion.div>

             
            </div>
          </div>
        </ThemeShell>
      ) : null}

      {screen === "decorate" ? (
        <ThemeShell>
          <div
            className={`mx-auto w-full max-w-md rounded-[2rem] border border-rose-100 bg-white/80 p-4 shadow-[0_20px_50px_rgba(236,72,153,0.2)] backdrop-blur ${cuteFont.className}`}
          >
            <div className="rounded-[1.5rem] bg-white p-4 shadow-inner">
              <div className="rounded-[1.3rem] bg-gradient-to-b from-rose-50 via-pink-50 to-pink-100 p-5">
                <CakeArt decorated />
              </div>

              <p className="mt-3 text-sm text-fuchsia-500">Add your magic touch ✨</p>

              <motion.button
                type="button"
                onClick={() => {
                  setScreen("candle");
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-200 to-pink-200 px-5 py-3 text-[20px] font-semibold text-fuchsia-700 shadow-[inset_0_-4px_8px_rgba(168,85,247,0.18)] transition hover:brightness-105"
              >
                🪄 Decorate
              </motion.button>
            </div>
          </div>
        </ThemeShell>
      ) : null}

      {screen === "candle" ? (
        <ThemeShell>
          {/* Static bunting */}
          <div className="pointer-events-none absolute inset-x-0 top-3 flex items-start justify-center gap-2 text-xl">
            <span className="text-pink-300">▼</span>
            <span className="text-yellow-300">▼</span>
            <span className="text-violet-300">▼</span>
            <span className="text-rose-300">▼</span>
            <span className="text-pink-300">▼</span>
            <span className="text-yellow-300">▼</span>
            <span className="text-violet-300">▼</span>
            <span className="text-rose-300">▼</span>
          </div>

          {/* Party poppers */}
          {candleLit ? (
            <>
              <div className="animate-popper-left pointer-events-none absolute left-4 top-16 text-5xl">🎉</div>
              <div className="animate-popper-right pointer-events-none absolute right-4 top-16 text-5xl">🎊</div>
            </>
          ) : (
            <>
              <div className="pointer-events-none absolute left-2 top-8 text-4xl text-fuchsia-200">🎉</div>
              <div className="pointer-events-none absolute right-2 top-8 text-4xl text-purple-200">🎉</div>
            </>
          )}

          {/* Confetti burst */}
          {candleLit ? (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {[
                { color: "bg-pink-400",   left: "15%",  delay: "0s",    dur: "1.2s", size: "w-2 h-3",   rot: "rotate-12" },
                { color: "bg-yellow-400", left: "25%",  delay: "0.1s",  dur: "1.0s", size: "w-2 h-2",   rot: "rotate-45" },
                { color: "bg-violet-400", left: "38%",  delay: "0.05s", dur: "1.3s", size: "w-3 h-2",   rot: "-rotate-12" },
                { color: "bg-rose-400",   left: "50%",  delay: "0.15s", dur: "1.1s", size: "w-2 h-3",   rot: "rotate-6" },
                { color: "bg-cyan-400",   left: "62%",  delay: "0s",    dur: "1.4s", size: "w-3 h-2",   rot: "-rotate-45" },
                { color: "bg-fuchsia-400",left: "74%",  delay: "0.08s", dur: "1.2s", size: "w-2 h-3",   rot: "rotate-30" },
                { color: "bg-amber-400",  left: "85%",  delay: "0.2s",  dur: "1.0s", size: "w-2 h-2",   rot: "-rotate-6" },
                { color: "bg-lime-400",   left: "10%",  delay: "0.12s", dur: "1.3s", size: "w-3 h-3",   rot: "rotate-45" },
                { color: "bg-pink-300",   left: "45%",  delay: "0.25s", dur: "1.1s", size: "w-2 h-2",   rot: "-rotate-12" },
                { color: "bg-violet-300", left: "90%",  delay: "0.07s", dur: "1.5s", size: "w-2 h-3",   rot: "rotate-6" },
                { color: "bg-rose-300",   left: "30%",  delay: "0.18s", dur: "1.2s", size: "w-3 h-2",   rot: "-rotate-30" },
                { color: "bg-yellow-300", left: "58%",  delay: "0.03s", dur: "1.4s", size: "w-2 h-3",   rot: "rotate-12" },
              ].map((c, i) => (
                <div
                  key={i}
                  className={`animate-confetti absolute top-0 rounded-sm ${c.color} ${c.size} ${c.rot}`}
                  style={{ left: c.left, animationDelay: c.delay, animationDuration: c.dur }}
                />
              ))}
            </div>
          ) : null}

          <div
            className={`relative mx-auto w-full max-w-md rounded-[2rem] border border-rose-100 bg-white/80 p-4 shadow-[0_20px_50px_rgba(236,72,153,0.2)] backdrop-blur ${cuteFont.className}`}
          >
            {/* Birthday text burst */}
            {candleLit ? (
              <div className="animate-birthday-text pointer-events-none absolute inset-x-0 -top-10 text-center">
                <p className="font-extrabold text-[22px] text-fuchsia-600 drop-shadow-[0_2px_8px_rgba(217,70,239,0.4)]">
                  🎂 Happy Birthday,<br />Cutiepie! 🎂
                </p>
              </div>
            ) : null}

            <div className="rounded-[1.5rem] bg-white p-4 shadow-inner">
              <div
                className={`rounded-[1.3rem] bg-gradient-to-b from-rose-50 via-pink-50 to-pink-100 p-5 transition-all duration-700 ${candleLit ? "shadow-[0_0_40px_rgba(251,191,36,0.4)]" : ""}`}
              >
                <CakeArt lit={candleLit} decorated />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                className="mt-3 text-sm text-fuchsia-500"
              >
                {candleLit ? "🌟 Wish made! Opening your surprise..." : "Ready to make a wish? 💖"}
              </motion.p>

              <motion.button
                type="button"
                disabled={candleLit || navigating}
                onClick={() => {
                  setCandleLit(true);
                  setNavigating(true);
                  setTimeout(() => {
                    startPuzzle();
                  }, 2200);
                }}
                whileHover={{ scale: candleLit ? 1 : 1.03 }}
                whileTap={{ scale: candleLit ? 1 : 0.97 }}
                className={`mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r px-5 py-3 text-[20px] font-semibold shadow-[inset_0_-4px_8px_rgba(168,85,247,0.18)] transition ${
                  candleLit
                    ? "from-amber-200 to-yellow-200 text-amber-700 brightness-110"
                    : "from-fuchsia-200 to-pink-200 text-fuchsia-700 hover:brightness-105"
                }`}
              >
                {candleLit ? "🔥 Candle is lit!" : "🔥 Light the Candle"}
              </motion.button>
            </div>
          </div>
        </ThemeShell>
      ) : null}

      {screen === "puzzle" ? (
        <ThemeShell>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`mx-auto w-full max-w-md rounded-[2rem] border border-rose-100 bg-white/85 p-4 shadow-[0_20px_50px_rgba(236,72,153,0.2)] backdrop-blur ${cuteFont.className}`}
          >
            <div className="rounded-[1.5rem] bg-white p-4 shadow-inner">
              <h3 className="text-[22px] font-extrabold text-fuchsia-700">Photo Puzzle Challenge 🧩</h3>
              <p className="mt-1 text-sm text-slate-500">Drag & drop tiles to swap. Arrange all 9 pieces correctly.</p>

              <div className="mx-auto mt-4 grid w-[300px] grid-cols-3 gap-1 rounded-xl bg-rose-100 p-1">
                {tiles.map((piece, index) => {
                  const row = Math.floor(piece / 3);
                  const col = piece % 3;
                  const isSource = dragSource === index;
                  const isTarget = dragOver === index;

                  return (
                    <div
                      key={`${piece}-${index}`}
                      data-puzzle-index={index}
                      draggable={!puzzleSolved}
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={() => setDragOver(null)}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                      onTouchStart={(e) => handleTouchStart(e, index)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      className={`h-[96px] w-[96px] cursor-grab overflow-hidden rounded-md border transition-all duration-150 active:cursor-grabbing ${
                        isSource
                          ? "scale-90 opacity-50 border-fuchsia-400 ring-2 ring-fuchsia-300"
                          : isTarget
                          ? "scale-105 border-fuchsia-500 ring-2 ring-fuchsia-400 brightness-110"
                          : "border-white/60"
                      }`}
                      style={{
                        backgroundImage: `url(${PUZZLE_IMAGE_SRC})`,
                        backgroundSize: "300% 300%",
                        backgroundPosition: `${col * 50}% ${row * 50}%`,
                        touchAction: "none",
                      }}
                    />
                  );
                })}
              </div>

              <p className="mt-3 text-xs text-slate-500">Tip: drag (or touch &amp; slide) a tile onto another to swap them.</p>

              {puzzleSolved ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <p className="mb-2 text-sm font-semibold text-emerald-600">Perfect! Puzzle solved 🎉</p>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      startBalloonGame();
                    }}
                    className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-300 to-pink-300 px-5 py-3 text-[20px] font-semibold text-fuchsia-700 shadow-[inset_0_-4px_8px_rgba(168,85,247,0.18)]"
                  >
                    Next Surprise 🎈
                  </motion.button>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        </ThemeShell>
      ) : null}

      {screen === "balloons" ? (
        <ThemeShell>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`mx-auto w-full max-w-md rounded-[2rem] border border-rose-100 bg-white/85 p-4 shadow-[0_20px_50px_rgba(236,72,153,0.2)] backdrop-blur ${cuteFont.className}`}
          >
            <div className="rounded-[1.5rem] bg-white p-4 shadow-inner">
              <h3 className="text-[22px] font-extrabold text-fuchsia-700">Pop all 4 balloons 🎈</h3>
              <p className="mt-1 text-sm text-slate-500">Pop one by one and reveal the hidden words.</p>

              <div className="relative mx-auto mt-4 h-[360px] w-full max-w-[290px] overflow-hidden rounded-[1.7rem] border border-rose-100 bg-gradient-to-b from-rose-50 via-pink-50 to-violet-50 p-3">
                <div className="pointer-events-none absolute inset-x-0 top-2 flex items-start justify-center gap-1 text-sm">
                  <span className="text-pink-300">▼</span>
                  <span className="text-yellow-300">▼</span>
                  <span className="text-violet-300">▼</span>
                  <span className="text-rose-300">▼</span>
                  <span className="text-pink-300">▼</span>
                  <span className="text-yellow-300">▼</span>
                  <span className="text-violet-300">▼</span>
                </div>

                <div className="absolute inset-x-0 top-14 grid grid-cols-4 px-1 text-center">
                  {BALLOON_WORDS.map((word, index) => (
                    <motion.span
                      key={word}
                      initial={false}
                      animate={{
                        opacity: poppedBalloons[index] ? 1 : 0,
                        y: poppedBalloons[index] ? 0 : 8,
                        scale: poppedBalloons[index] ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.28 }}
                      className="text-[22px] font-extrabold text-fuchsia-700 sm:text-[24px]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-5 top-24 grid grid-cols-4 items-start px-1">
                  {[
                    { gradient: "from-[#ffbfd8] via-[#ffa5ca] to-[#ff86bd]", knot: "bg-[#ff7ab7]" },
                    { gradient: "from-[#ffe0ec] via-[#ffd2e4] to-[#ffc2d8]", knot: "bg-[#ff97c2]" },
                    { gradient: "from-[#ffd7d7] via-[#ffc7cf] to-[#ffb0c0]", knot: "bg-[#ff93aa]" },
                    { gradient: "from-[#ead7ff] via-[#d8bcff] to-[#c79cff]", knot: "bg-[#c68bff]" },
                  ].map((style, index) => {
                    const popped = poppedBalloons[index];
                    const canPop = index === 0 || poppedBalloons[index - 1];

                    return (
                      <button
                        key={`${style.gradient}-${index}`}
                        type="button"
                        disabled={popped || !canPop}
                        onClick={() => handleBalloonPop(index)}
                        className={`group relative mx-auto h-[220px] w-[60px] ${popped || !canPop ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <motion.div
                          initial={false}
                          animate={
                            popped
                              ? { opacity: 0, scale: 0.35, y: -20, rotate: 0 }
                              : { opacity: 1, scale: 1, y: [0, -5, 0], rotate: [0, -2.4, 2.2, 0] }
                          }
                          transition={{ duration: popped ? 0.22 : 2.2, repeat: popped ? 0 : Number.POSITIVE_INFINITY }}
                          className={`absolute left-1/2 top-0 h-[98px] w-[60px] -translate-x-1/2 rounded-[999px] bg-gradient-to-b ${style.gradient} shadow-[inset_0_10px_16px_rgba(255,255,255,0.35),inset_0_-12px_16px_rgba(0,0,0,0.08),0_12px_18px_rgba(244,114,182,0.3)] ${!canPop && !popped ? "saturate-75 brightness-95" : ""}`}
                        >
                          <span className="absolute left-3 top-3 h-5 w-3 rotate-[-18deg] rounded-full bg-white/70 blur-[0.2px]" />
                          <span className="absolute left-2 top-8 h-8 w-2 rotate-[-18deg] rounded-full bg-white/35" />
                          <span className={`absolute bottom-[-7px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 ${style.knot}`} />
                        </motion.div>

                        <svg
                          className="pointer-events-none absolute left-1/2 top-[91px] h-[124px] w-[36px] -translate-x-1/2"
                          viewBox="0 0 36 124"
                          fill="none"
                          aria-hidden="true"
                        >
                          <motion.path
                            d="M18 2 C 12 30, 28 54, 17 82 C 12 95, 20 110, 18 122"
                            stroke="rgba(107,114,128,0.55)"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            initial={false}
                            animate={popped ? { opacity: 0.25 } : { opacity: 0.72 }}
                          />
                        </svg>

                        {popped ? (
                          <span className="pointer-events-none absolute left-1/2 top-7 -translate-x-1/2 text-[10px] text-pink-400">
                            ✦ ✦
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                {allBalloonsPopped ? (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          'url("https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3QwOGUzZ2V1aWplNDdjNXY1ZXM5bTR0eXB5NnNnMmR3djVycGVodyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lPoOHG39XAlV4it61H/giphy.gif")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    {[
                      { color: "bg-pink-400", left: "16%", delay: "0s", dur: "1.1s" },
                      { color: "bg-yellow-400", left: "27%", delay: "0.08s", dur: "1.2s" },
                      { color: "bg-violet-400", left: "38%", delay: "0.03s", dur: "1.05s" },
                      { color: "bg-rose-400", left: "50%", delay: "0.15s", dur: "1.2s" },
                      { color: "bg-cyan-400", left: "62%", delay: "0.05s", dur: "1.35s" },
                      { color: "bg-fuchsia-400", left: "74%", delay: "0.1s", dur: "1.15s" },
                      { color: "bg-amber-400", left: "85%", delay: "0.18s", dur: "1.25s" },
                    ].map((c, i) => (
                      <div
                        key={`${c.left}-${i}`}
                        className={`animate-confetti absolute top-0 h-2 w-2 rounded-sm ${c.color}`}
                        style={{ left: c.left, animationDelay: c.delay, animationDuration: c.dur }}
                      />
                    ))}



                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.08 }}
                      className="absolute inset-x-0 top-3 text-center"
                    >
                    
                    </motion.div>
                  </div>
                ) : null}
              </div>

              <p className="mt-3 text-sm font-medium text-fuchsia-500">
                {allBalloonsPopped ? "Yay! All words are revealed 💖" : `Balloons popped: ${poppedCount}/4`}
              </p>

              {allBalloonsPopped ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.08 }}
                  className="mt-3 rounded-2xl border border-fuchsia-100 bg-gradient-to-r from-rose-50 via-pink-50 to-violet-50 px-4 py-3 text-center"
                >
                  <p className="text-[18px] font-extrabold text-fuchsia-700 sm:text-[20px]">You are a Cuttie ✨</p>
                  <p className="mt-1 text-xs font-semibold text-fuchsia-500 sm:text-sm">So pretty, so special 💖</p>
                </motion.div>
              ) : null}

              {allBalloonsPopped ? (
                <motion.button
                  type="button"
                  onClick={() => {
                    openAlbum();
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-300 to-pink-300 px-5 py-3 text-[20px] font-semibold text-fuchsia-700 shadow-[inset_0_-4px_8px_rgba(168,85,247,0.18)]"
                >
                  Next →
                </motion.button>
              ) : null}
            </div>
          </motion.div>
        </ThemeShell>
      ) : null}

      {screen === "album" ? (
        <ThemeShell>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`mx-auto w-full max-w-md rounded-[2rem] border border-rose-100 bg-white/85 p-4 shadow-[0_20px_50px_rgba(236,72,153,0.2)] backdrop-blur ${cuteFont.className}`}
          >
            <div className="rounded-[1.5rem] bg-white p-4 shadow-inner">
              <div className="pointer-events-none flex items-center justify-center gap-1 text-xs">
                <span className="text-pink-300">▼</span>
                <span className="text-yellow-300">▼</span>
                <span className="text-violet-300">▼</span>
                <span className="text-rose-300">▼</span>
                <span className="text-pink-300">▼</span>
                <span className="text-yellow-300">▼</span>
                <span className="text-violet-300">▼</span>
              </div>

              <h3 className="mt-3 text-[30px] font-extrabold leading-none text-violet-700">Some Sweet Moments</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">(Swipe for more)</p>

              <div className="mt-4 rounded-[1.6rem] border border-violet-100 bg-gradient-to-b from-violet-100 to-violet-50 p-3">
                <div
                  ref={albumScrollerRef}
                  className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  {ALBUM_PHOTOS.map((photo, index) => (
                    <div key={`${photo}-${index}`} className="w-full min-w-full snap-center px-1">
                      <div className="rounded-[1.1rem] border border-white/80 bg-white p-2 shadow-[0_8px_20px_rgba(124,58,237,0.12)]">
                        <div
                          className="h-[290px] w-full rounded-[0.9rem] bg-cover bg-center"
                          style={{ backgroundImage: `url(${photo})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                type="button"
                onClick={() => {
                  openMessageSlider();
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-200 to-purple-200 px-5 py-3 text-[20px] font-semibold text-violet-700 shadow-[inset_0_-4px_8px_rgba(124,58,237,0.18)]"
              >
                <Mail className="mr-2 h-5 w-5" />
                Open My Message
              </motion.button>
            </div>
          </motion.div>
        </ThemeShell>
      ) : null}

      {screen === "message" ? (
        <ThemeShell>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`mx-auto w-full max-w-md rounded-[2rem] border border-rose-100 bg-white/85 p-4 shadow-[0_20px_50px_rgba(236,72,153,0.2)] backdrop-blur ${cuteFont.className}`}
          >
            <div className="rounded-[1.5rem] bg-white p-4 shadow-inner">
              <motion.button
                type="button"
                onClick={openNextMessageStage}
                disabled={messageStage >= LOVE_MESSAGES.length}
                whileHover={{ scale: messageStage >= LOVE_MESSAGES.length ? 1 : 1.01 }}
                whileTap={{ scale: messageStage >= LOVE_MESSAGES.length ? 1 : 0.98 }}
                className={`w-full text-left ${
                  messageStage >= LOVE_MESSAGES.length ? "cursor-default" : "cursor-pointer"
                } ${
                  messageStage > 0
                    ? "max-h-[430px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    : ""
                }`}
              >
                <motion.div
                  key={messageStage}
                  initial={{ opacity: 0, rotateX: -16, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                  transition={{ duration: 0.42, ease: "easeOut" }}
                  className="rounded-[1.4rem] border border-rose-100 bg-gradient-to-b from-rose-50 to-white p-4 text-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {messageStage === 0 ? (
                    <>
                      <h3 className="text-[32px] font-extrabold leading-none text-fuchsia-700">A Special Message</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-400">Tap to open</p>

                      <div className="relative mx-auto mt-4 h-[290px] w-full rounded-[1.3rem] border border-rose-100 bg-[#fff8f2] p-5">
                        <span className="absolute left-5 top-8 text-[42px] text-rose-300">🎈</span>
                        <span className="absolute right-5 top-8 text-[42px] text-pink-200">🎈</span>
                        <span className="absolute left-5 bottom-10 text-[40px] text-violet-200">🎈</span>
                        <span className="absolute right-5 bottom-10 text-[40px] text-purple-200">🎈</span>
                        <p className="mx-auto mt-8 max-w-[220px] text-[54px] font-extrabold leading-[0.92] text-rose-800">
                          Happy<br />Birthday<br />to you
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-[30px]">🎁</p>
                      <h4 className="mt-2 text-[28px] font-extrabold leading-none text-fuchsia-700">
                        Love Note {messageStage}
                      </h4>
                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        Tap card for next message
                      </p>

                      <div className="mt-5 rounded-2xl bg-white/85 px-4 py-5 text-[26px] font-semibold leading-tight text-violet-700">
                        {LOVE_MESSAGES[messageStage - 1]}
                        <br />
                        <br />
                        May your year be filled with peace, laughter, and endless cuddly moments together. 💫
                        <br />
                        <br />
                        Thank you for being the calm in chaos, the smile in silence, and the warmth in every single day. 🌷
                        <br />
                        <br />
                        I hope this birthday opens a year full of soft moments, sweet surprises, and everything your heart dreams of. ✨
                      </div>
                    </>
                  )}
                </motion.div>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => {
                  window.location.href = "/b/ayesha-2026";
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-200 to-pink-200 px-5 py-3 text-[20px] font-semibold text-fuchsia-700 shadow-[inset_0_-4px_8px_rgba(168,85,247,0.18)]"
              >
                Next →
              </motion.button>
            </div>
          </motion.div>
        </ThemeShell>
      ) : null}
    </main>
  );
}
