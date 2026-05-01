"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sami Tadesse",
    role: "Product Manager, Fintech",
    quote:
      "Melkam translated our rough concept into a clean product experience that users understood instantly.",
  },
  {
    name: "Hana Kebede",
    role: "Founder, Learning Platform",
    quote:
      "The interface quality and speed were exceptional. Every screen felt intentional and premium.",
  },
  {
    name: "Noah Alemu",
    role: "Engineering Lead, Startup",
    quote:
      "Great collaboration from start to finish. We shipped faster with better UX than expected.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full px-6 py-24 bg-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            Validation / Reviews
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase">
            Client <span className="text-muted">Feedback</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="game-panel border border-white/5 p-6 rounded-sm flex flex-col"
            >
              <p className="flex-grow text-[13px] italic leading-relaxed text-muted">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white">
                  {item.name}
                </p>
                <p className="mt-0.5 text-[9px] font-medium uppercase tracking-tighter text-accent/60">
                  {item.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
