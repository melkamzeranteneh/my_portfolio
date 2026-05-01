"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, FileText } from "lucide-react";

export type Certificate = {
  id: string;
  name: string;
  previewUrl: string;
  thumbnailUrl?: string | null;
  updatedAt?: string | null;
};

type CertificatesPreviewProps = {
  certificates: Certificate[];
};

export function CertificatesPreview({ certificates }: CertificatesPreviewProps) {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
        return;
      }
      if (window.innerWidth < 1024) {
        setCardsPerView(2);
        return;
      }
      setCardsPerView(3);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxStartIndex = Math.max(0, certificates.length - cardsPerView);

  const visibleCertificates = useMemo(
    () => certificates.slice(startIndex, startIndex + cardsPerView),
    [certificates, startIndex, cardsPerView]
  );

  useEffect(() => {
    if (!selectedCertificate) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedCertificate(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedCertificate]);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
          Nodes {startIndex + 1}-{Math.min(startIndex + cardsPerView, certificates.length)}
        </p>
        <div className="flex gap-1">
          <button
            className="p-2 border border-white/5 bg-black hover:border-accent disabled:opacity-20 transition rounded-sm"
            onClick={() => setStartIndex((i) => Math.max(0, i - 1))}
            disabled={startIndex === 0}
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <button
            className="p-2 border border-white/5 bg-black hover:border-accent disabled:opacity-20 transition rounded-sm"
            onClick={() => setStartIndex((i) => Math.min(maxStartIndex, i + 1))}
            disabled={startIndex >= maxStartIndex}
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleCertificates.map((cert, index) => (
          <motion.article
            key={cert.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="game-panel group flex flex-col p-5 border border-white/5 rounded-sm hover:border-accent/40 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <FileText className="w-3 h-3 text-accent/60" />
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-accent/60">
                  Technical Spec
                </span>
              </div>
              <h3 className="text-sm font-bold tracking-tight text-white mt-1 line-clamp-2">
                {cert.name}
              </h3>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
              <span className="text-[8px] font-medium text-muted uppercase">
                {cert.updatedAt ? new Date(cert.updatedAt).toLocaleDateString() : "VALIDATED"}
              </span>
              <button
                className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-accent hover:underline"
                onClick={() => setSelectedCertificate(cert)}
              >
                <span>Access Node</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="relative flex h-full w-full max-w-5xl flex-col bg-black border border-white/10 rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                  {selectedCertificate.name}
                </span>
                <button
                  className="text-muted hover:text-white transition"
                  onClick={() => setSelectedCertificate(null)}
                >
                  ✕
                </button>
              </div>
              <div className="flex-grow bg-[#050505]">
                <iframe
                  title={selectedCertificate.name}
                  src={selectedCertificate.previewUrl}
                  className="h-full w-full border-none"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
