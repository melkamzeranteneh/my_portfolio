import { fetchCertificates } from "@/app/lib/gdrive";
import { CertificatesPreview } from "./CertificatesPreview";

export async function CertificatesSection() {
  const { certificates, error } = await fetchCertificates();

  return (
    <section id="certificates" className="w-full px-6 py-24 bg-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            Verified / Specs
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase">
            Technical <span className="text-muted">Credentials</span>
          </h2>
        </div>
        {error ? (
          <p className="text-[10px] text-rose-500 font-mono italic">ERROR: {error}</p>
        ) : certificates.length === 0 ? (
          <p className="text-[10px] text-muted italic">
            Scanning for new data nodes...
          </p>
        ) : (
          <CertificatesPreview certificates={certificates} />
        )}
      </div>
    </section>
  );
}
