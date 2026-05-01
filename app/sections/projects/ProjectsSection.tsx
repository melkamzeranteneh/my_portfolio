"use client";

import { motion } from "framer-motion";

import { Github, ExternalLink, Code2 } from "lucide-react";

const projects = [
  {
    name: "RAG Assistant",
    description: "Vector-search enabled document assistant with optimized UX.",
    repositoryUrl: "https://github.com/melkamzeranteneh/RAG",
    stack: "Next.js + Pinecone",
    previewUrl: "",
  },
  {
    name: "VineForge",
    description: "Product infrastructure focused on high-speed visuals and performance.",
    repositoryUrl: "https://github.com/melkamzeranteneh/vinefordge",
    stack: "React + UI Engineering",
    previewUrl: "",
  },
  {
    name: "BetterPhone",
    description: "Architectural experiments in mobile interface design.",
    repositoryUrl: "https://github.com/melkamzeranteneh/betterphone",
    stack: "Mobile-first Architecture",
    previewUrl: "https://betterphone.vercel.app/",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full px-6 py-24 bg-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            Selected Builds
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase">
            Engineering <span className="text-muted">Portfolio</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="game-panel group border border-white/5 p-6 rounded-sm flex flex-col hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-3.5 h-3.5 text-accent/60" />
                <h3 className="text-sm font-bold tracking-tight text-white group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
              </div>
              <p className="flex-grow text-[13px] leading-relaxed text-muted">
                {project.description}
              </p>
              <div className="mt-4">
                <span className="game-badge border-white/10 rounded-xs">
                  {project.stack}
                </span>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                <a
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent hover:underline transition"
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="w-2.5 h-2.5" />
                  <span>Source</span>
                </a>
                {project.previewUrl ? (
                  <a
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-white transition"
                    href={project.previewUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Demo</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                ) : (
                  <span className="text-[9px] uppercase tracking-tighter text-white/10 italic">
                    Deployment Pending
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
