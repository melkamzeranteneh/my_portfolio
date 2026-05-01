export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

type ResendSuccessResponse = {
  id: string;
};

type ResendErrorResponse = {
  message?: string;
  error?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from =
    process.env.CONTACT_EMAIL_FROM ?? "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  if (!to) {
    throw new Error("Missing CONTACT_EMAIL_TO environment variable.");
  }

  const subject = `New portfolio message from ${payload.name}`;
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br/>");
  const text = `Name: ${payload.name}
Email: ${payload.email}

Message:
${payload.message}`;
  const html = `
    <div>
      <h2>New portfolio contact message</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as ResendErrorResponse;
    throw new Error(
      errorData.message ??
        errorData.error ??
        "Email service rejected the request."
    );
  }

  return (await response.json()) as ResendSuccessResponse;
}
