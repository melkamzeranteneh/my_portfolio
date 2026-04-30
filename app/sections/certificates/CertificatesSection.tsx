import { CertificatesPreview } from "./CertificatesPreview";

const certificates = [
  {
    id: "cert-1",
    name: "Certificate 01",
    previewUrl: "https://drive.google.com/file/d/FILE_ID_1/preview",
    thumbnailUrl: null,
    updatedAt: null,
  },
  {
    id: "cert-2",
    name: "Certificate 02",
    previewUrl: "https://drive.google.com/file/d/FILE_ID_2/preview",
    thumbnailUrl: null,
    updatedAt: null,
  },
];

export function CertificatesSection() {

  return (
    <section className="w-full px-6 py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Certificates
          </h2>
        </div>
        {certificates.length === 0 ? (
          <p className="text-sm text-foreground/60">
            No certificates added yet.
          </p>
        ) : (
          <CertificatesPreview certificates={certificates} />
        )}
      </div>
    </section>
  );
}
