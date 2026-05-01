import type { Metadata } from "next";
import { Inter, Geist_Mono, Caveat } from "next/font/google";
import { Header } from "./components/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ULTRA DEV | Technical Portfolio",
  description: "Minimalist, high-performance digital engineering by ULTRA DEV.",
};

import { Github, Linkedin, Dribbble, Send } from "lucide-react";

const socials = [
  { name: "GitHub", href: "https://github.com/melkamzeranteneh", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/melkamzer-anteneh-987b2b36a/", icon: Linkedin },
  { name: "Dribbble", href: "https://dribbble.com/melkamzer", icon: Dribbble },
  { name: "Telegram", href: "https://t.me/Mshabka", icon: Send },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${caveat.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-[#f0f0f0]">
        <Header />
        <main className="flex-grow">{children}</main>
        <footer className="border-t border-white/5 py-12">
          <div className="mx-auto max-w-7xl px-6 flex flex-col items-center gap-6">
            <div className="flex gap-8">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-accent transition"
                  title={social.name}
                >
                  <social.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{social.name}</span>
                </a>
              ))}
            </div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted/30">
              © 2026 • ULTRA DEV • BUILT FOR PERFORMANCE
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
