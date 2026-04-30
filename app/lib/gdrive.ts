export type DriveCertificate = {
  id: string;
  name: string;
  previewUrl: string;
  thumbnailUrl?: string | null;
  updatedAt?: string | null;
};

type DriveFile = {
  id: string;
  name: string;
  thumbnailLink?: string | null;
  webViewLink?: string | null;
  modifiedTime?: string | null;
};

const FOLDER_ID = "1Qo8n7Hn84v62aHmHkJ9GQH330M8Ggi_Y";

export async function fetchCertificates(): Promise<DriveCertificate[]> {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return [];
  }

  const query = encodeURIComponent(`'${FOLDER_ID}' in parents and trashed=false`);
  const fields = encodeURIComponent(
    "files(id,name,thumbnailLink,webViewLink,modifiedTime)"
  );
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&key=${apiKey}`;

  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as { files?: DriveFile[] };

  return (data.files ?? []).map((file) => ({
    id: file.id,
    name: file.name,
    previewUrl: `https://drive.google.com/file/d/${file.id}/preview`,
    thumbnailUrl: file.thumbnailLink ?? null,
    updatedAt: file.modifiedTime ?? null,
  }));
}
