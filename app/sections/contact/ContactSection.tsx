export function ContactSection() {
  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Let us build something sharp
          </h2>
          <p className="mt-4 text-sm text-foreground/70">
            Drop a line and I will reply with a proposal, timeline, and next
            steps.
          </p>
          <div className="mt-8 space-y-3 text-sm text-foreground/60">
            <p>Email: hello@yourdomain.com</p>
            <p>Location: Remote / Global</p>
          </div>
        </div>
        <form className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4">
            <input
              className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
              placeholder="Name"
              name="name"
            />
            <input
              className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
              placeholder="Email"
              name="email"
              type="email"
            />
            <textarea
              className="min-h-[120px] rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
              placeholder="Tell me about your idea"
              name="message"
            />
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-full bg-accent py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(0,255,127,0.35)]"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
