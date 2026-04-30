export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactEmail(_payload: ContactPayload) {
  return { ok: true, received: _payload };
}
