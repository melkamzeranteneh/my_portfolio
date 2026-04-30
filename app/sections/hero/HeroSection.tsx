export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] w-full items-center justify-center px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff7f22,transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">Portfolio</p>
        <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
          Edgy, minimal, and built for performance.
        </h1>
        <p className="max-w-xl text-base leading-7 text-foreground/70">
          This space is primed for 3D ambience, motion, and fast content delivery.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(0,255,127,0.35)]">
            View projects
          </button>
          <button className="rounded-full border border-accent/50 px-6 py-3 text-sm font-semibold text-accent hover:border-accent">
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}
