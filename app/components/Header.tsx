"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Credentials", href: "#certificates" },
  { name: "Writing", href: "#writing" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2 group"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white group-hover:text-accent transition-colors">
              ULTRA DEV
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted transition hover:text-accent"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className="game-button px-4 py-1.5 text-[10px] uppercase tracking-widest rounded-sm"
            >
              Contact
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="flex flex-col gap-1 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`h-0.5 w-4 bg-white transition-all ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <div className={`h-0.5 w-4 bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <div className={`h-0.5 w-4 bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-0 top-full bg-black border-b border-white/10 p-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
