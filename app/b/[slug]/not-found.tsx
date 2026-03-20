import Link from "next/link";

export default function BirthdayNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4">
      <section className="w-full max-w-lg rounded-3xl border border-white/15 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.2em] text-white/60">Birthday Vault</p>
        <h1 className="mt-2 text-3xl font-black text-fuchsia-300">Vault Page Not Found</h1>
        <p className="mt-3 text-white/80">
          This birthday link does not exist yet. Ask for the correct slug and try again.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-xl border border-white/20 bg-black/40 px-5 py-3 font-semibold text-white transition hover:bg-black/70"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
