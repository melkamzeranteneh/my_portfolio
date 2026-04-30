import { fetchCertificates } from "@/app/lib/gdrive";
import { CertificatesPreview } from "./CertificatesPreview";

export async function CertificatesSection() {
  const { certificates, error } = await fetchCertificates();

  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Certificates
          </h2>
        </div>
        {error ? (
          <p className="text-sm text-rose-300/90">{error}</p>
        ) : certificates.length === 0 ? (
          <p className="text-sm text-foreground/60">
            No PDF certificates found in your Drive folder yet.
          </p>
        ) : (
          <CertificatesPreview certificates={certificates} />
        )}
      </div>
    </section>
  );
}
