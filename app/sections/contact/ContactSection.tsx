"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

type SubmitState =
  | { type: "idle"; message: string }
  | { type: "loading"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

import { SendHorizontal, Phone, MessageSquare, Globe } from "lucide-react";

export function ContactSection() {
  const [submitState, setSubmitState] = useState<SubmitState>({
    type: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    setSubmitState({ type: "loading", message: "Broadcasting..." });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        setSubmitState({ type: "error", message: result.error ?? "Failed." });
        return;
      }
      form.reset();
      setSubmitState({ type: "success", message: "Transmission complete." });
    } catch {
      setSubmitState({ type: "error", message: "Network error." });
    }
  }

  return (
    <section id="contact" className="w-full px-6 pb-32 pt-24 bg-black">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1fr_1fr]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-accent/60" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              Channel / Contact
            </p>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase">
            Let&apos;s <span className="text-muted">Connect</span>
          </h2>
          <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted">
            Ready for technical deployment? Send a brief and I&apos;ll respond with a strategic build direction.
          </p>
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 group">
              <SendHorizontal className="w-3.5 h-3.5 text-accent/40 group-hover:text-accent transition-colors" />
              <p className="text-[10px] font-bold tracking-widest text-white uppercase">TG: @Mshabka</p>
            </div>
            <div className="flex items-center gap-3 group">
              <Phone className="w-3.5 h-3.5 text-accent/40 group-hover:text-accent transition-colors" />
              <p className="text-[10px] font-bold tracking-widest text-white uppercase">TEL: 0952005270</p>
            </div>
            <div className="flex items-center gap-3 group">
              <Globe className="w-3.5 h-3.5 text-accent/40 group-hover:text-accent transition-colors" />
              <p className="text-[10px] font-bold tracking-widest text-white uppercase">Remote / Ops</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="game-panel p-8 rounded-sm border border-white/5"
        >
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-accent rounded-sm transition"
                placeholder="NAME / ID"
                name="name"
                required
                maxLength={120}
              />
              <input
                className="w-full bg-black/40 border border-white/5 px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-accent rounded-sm transition"
                placeholder="EMAIL / COORDS"
                name="email"
                type="email"
                required
              />
              <textarea
                className="min-h-[120px] w-full bg-black/40 border border-white/5 px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-accent rounded-sm transition"
                placeholder="MESSAGE DATA"
                name="message"
                required
                maxLength={5000}
              />
            </div>
            
            <button
              type="submit"
              disabled={submitState.type === "loading"}
              className="game-button w-full py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm transition flex items-center justify-center gap-2"
            >
              <span>{submitState.type === "loading" ? "BROADCASTING..." : "TRANSMIT"}</span>
              <SendHorizontal className="w-3 h-3" />
            </button>
            
            {submitState.message && (
              <p className={`mt-2 text-center text-[9px] font-bold uppercase tracking-widest ${
                submitState.type === "success" ? "text-accent" : "text-rose-500"
              }`}>
                {submitState.message}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
