export type DriveCertificate = {
  id: string;
  name: string;
  previewUrl: string;
  thumbnailUrl?: string | null;
  updatedAt?: string | null;
};

export type DriveCertificatesResult = {
  certificates: DriveCertificate[];
  error: string | null;
};

type DriveFile = {
  id: string;
  name: string;
  mimeType?: string | null;
  thumbnailLink?: string | null;
  webViewLink?: string | null;
  modifiedTime?: string | null;
};

const FOLDER_ID = "1Qo8n7Hn84v62aHmHkJ9GQH330M8Ggi_Y";

type DriveApiResponse = {
  files?: DriveFile[];
  error?: {
    code?: number;
    message?: string;
  };
};

export async function fetchCertificates(): Promise<DriveCertificatesResult> {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return {
      certificates: [],
      error: "Missing GOOGLE_API_KEY in environment variables.",
    };
  }

  const params = new URLSearchParams({
    q: `'${FOLDER_ID}' in parents and trashed=false and mimeType='application/pdf'`,
    fields: "files(id,name,mimeType,thumbnailLink,webViewLink,modifiedTime)",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
    orderBy: "modifiedTime desc",
    pageSize: "30",
    key: apiKey,
  });
  const url = `https://www.googleapis.com/drive/v3/files?${params.toString()}`;

  const response = await fetch(url, { next: { revalidate: 3600 } });
  const data = (await response.json()) as DriveApiResponse;

  if (!response.ok) {
    return {
      certificates: [],
      error:
        data.error?.message ??
        "Google Drive API request failed. Confirm API key access and folder sharing settings.",
    };
  }

  return {
    certificates: (data.files ?? []).map((file) => ({
      id: file.id,
      name: file.name,
      previewUrl: `https://drive.google.com/file/d/${file.id}/preview`,
      thumbnailUrl: file.thumbnailLink ?? null,
      updatedAt: file.modifiedTime ?? null,
    })),
    error: null,
  };
}
