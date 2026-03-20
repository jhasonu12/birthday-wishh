"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { SITE_ENTRY_CODE, SITE_GATE_STORAGE_KEY } from "@/lib/siteAuth";

type CodeGateProps = {
  title: string;
  children: ReactNode;
  onUnlocked?: () => void;
};

export default function CodeGate({ title, children, onUnlocked }: CodeGateProps) {
  const [isReady, setIsReady] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const didNotifyUnlock = useRef(false);

  const notifyUnlockedOnce = () => {
    if (didNotifyUnlock.current) return;
    didNotifyUnlock.current = true;
    onUnlocked?.();
  };

  useEffect(() => {
    const ok = localStorage.getItem(SITE_GATE_STORAGE_KEY) === "1";
    setIsUnlocked(ok);
    setIsReady(true);
    if (ok) {
      notifyUnlockedOnce();
    }
  }, []);

  const unlock = () => {
    if (code.trim() === SITE_ENTRY_CODE) {
      localStorage.setItem(SITE_GATE_STORAGE_KEY, "1");
      setError("");
      setIsUnlocked(true);
      notifyUnlockedOnce();
      return;
    }

    setError("Wrong secret code. Try again.");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    unlock();
  };

  if (!isReady) {
    return null;
  }

  if (!isUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur"
        >
          <h1 className="mb-4 text-2xl font-bold text-white">{title}</h1>
          <p className="mb-4 text-sm text-white/70">Enter the global secret code to continue.</p>
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) setError("");
            }}
            placeholder="Secret code"
            className="w-full rounded-xl border border-white/20 bg-black/50 px-4 py-3 text-white outline-none ring-fuchsia-400/50 placeholder:text-white/40 focus:ring"
          />
          {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-fuchsia-500 px-4 py-3 font-semibold text-white transition hover:bg-fuchsia-400"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
