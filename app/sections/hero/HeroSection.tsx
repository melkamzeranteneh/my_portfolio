"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Terminal, Cpu, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 pt-20"
    >
      {/* Industrial Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        {/* Floating 3D Element (CSS Cube) */}
        <motion.div
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative mb-10 h-10 w-10 perspective-[1000px] preserve-3d"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[0, 90, 180, 270, "top", "bottom"].map((face, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-accent/20 bg-accent/5"
              style={{
                transform: 
                  face === "top" ? "rotateX(90deg) translateZ(20px)" :
                  face === "bottom" ? "rotateX(-90deg) translateZ(20px)" :
                  `rotateY(${face}deg) translateZ(20px)`
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-3">
            <Cpu className="w-3 h-3 text-accent/40" />
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-accent">
              Architecture / Engineering
            </p>
            <Zap className="w-3 h-3 text-accent/40" />
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-[0.9] tracking-tighter text-white sm:text-6xl xl:text-7xl uppercase">
            ULTRA <span className="text-accent italic">DEV</span> <span className="font-handwritten text-3xl sm:text-5xl lowercase tracking-normal text-white/60">systems</span>
          </h1>

          <div className="relative mt-8 w-full max-w-4xl">
            <div className="absolute left-1/2 top-1/2 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[80px]" />
            
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted tracking-tight">
              Precision-built digital products. Specializing in high-performance engineering, minimalist architecture, and technical interface design.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#projects"
                className="game-button px-7 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-sm"
              >
                Access Projects
              </a>
              <a
                href="#contact"
                className="game-button-secondary px-7 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-sm"
              >
                Init Link
              </a>
            </div>
          </div>
        </motion.div>

        {/* Hero Image - Color on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mt-16 h-[250px] w-full max-w-md sm:h-[400px] group cursor-crosshair"
        >
          <div className="relative h-full w-full border-x border-white/5 overflow-hidden">
            <Image
              src="/hero_section.png"
              alt="Ultra Dev Hero"
              fill
              priority
              className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:opacity-100 opacity-50 transition-all duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          </div>
          
          {/* Technical Metadata Overlay with Handwritten notes */}
          <div className="absolute bottom-10 left-[-60px] hidden flex-col items-start sm:flex">
            <div className="flex items-center gap-2">
              <Terminal className="w-2.5 h-2.5 text-accent/60" />
              <p className="text-[8px] font-bold text-accent uppercase tracking-widest">Stack: React/TS</p>
            </div>
            <p className="font-handwritten text-lg text-white/40 mt-1 rotate-[-4deg]">optimized for speed</p>
          </div>
          <div className="absolute top-10 right-[-60px] hidden flex-col items-end sm:flex">
            <p className="text-[8px] font-bold text-accent uppercase tracking-widest">UID: UD-2026</p>
            <p className="font-handwritten text-lg text-white/40 mt-1 rotate-[4deg]">v.0.1.0-alpha</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
