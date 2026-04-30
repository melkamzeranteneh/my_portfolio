import Image from "next/image";
import { fetchCertificates } from "@/app/lib/gdrive";

export async function CertificatesSection() {
  const certificates = await fetchCertificates();

  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Certificates
          </h2>
          <span className="text-sm text-foreground/60">
            Drive sync active
          </span>
        </div>
        {certificates.length === 0 ? (
          <p className="text-sm text-foreground/60">
            Add `GOOGLE_API_KEY` to load certificates from Drive.
          </p>
        ) : (
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
                    Preview loading
                  </div>
                )}
                <h3 className="mt-4 text-lg font-semibold">{cert.name}</h3>
                {cert.updatedAt ? (
                  <p className="mt-2 text-xs text-foreground/60">
                    Updated {new Date(cert.updatedAt).toLocaleDateString()}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
