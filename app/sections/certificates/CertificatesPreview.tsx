"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { DriveCertificate } from "@/app/lib/gdrive";

type CertificatesPreviewProps = {
  certificates: DriveCertificate[];
};

export function CertificatesPreview({ certificates }: CertificatesPreviewProps) {
  const [selectedCertificate, setSelectedCertificate] =
    useState<DriveCertificate | null>(null);

  useEffect(() => {
    if (!selectedCertificate) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCertificate(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedCertificate]);

  return (
    <>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {certificates.map((cert) => (
          <article
            key={cert.id}
            className="min-w-[260px] snap-start rounded-2xl border border-white/10 bg-white/5 p-5 text-foreground"
          >
            {cert.thumbnailUrl ? (
              <Image
                src={cert.thumbnailUrl}
                alt={cert.name}
                className="h-40 w-full rounded-xl object-cover"
                width={320}
                height={160}
                sizes="(max-width: 768px) 260px, 320px"
              />
            ) : (
              <div className="flex h-40 w-full items-center justify-center rounded-xl border border-white/10 text-xs text-foreground/50">
                PDF preview unavailable
              </div>
            )}
            <h3 className="mt-4 text-lg font-semibold">{cert.name}</h3>
            {cert.updatedAt ? (
              <p className="mt-2 text-xs text-foreground/60">
                Updated {new Date(cert.updatedAt).toLocaleDateString()}
              </p>
            ) : null}
            <button
              type="button"
              className="mt-4 rounded-full border border-accent/50 px-4 py-2 text-xs font-semibold text-accent hover:border-accent"
              onClick={() => setSelectedCertificate(cert)}
            >
              Preview PDF
            </button>
          </article>
        ))}
      </div>

      {selectedCertificate ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-10"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview ${selectedCertificate.name}`}
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-black"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="truncate text-sm font-semibold text-foreground">
                {selectedCertificate.name}
              </p>
              <button
                type="button"
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-foreground/80 hover:border-white/40"
                onClick={() => setSelectedCertificate(null)}
              >
                Close
              </button>
            </div>
            <iframe
              title={`Preview ${selectedCertificate.name}`}
              src={selectedCertificate.previewUrl}
              className="h-full w-full"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
