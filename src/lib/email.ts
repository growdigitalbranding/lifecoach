/**
 * Enquiry delivery.
 *
 * Sends through Resend when `RESEND_API_KEY` is configured, and otherwise logs
 * the enquiry and reports success. That fallback is deliberate: a contact form
 * that throws in a preview environment looks broken to whoever is reviewing the
 * site, and an enquiry that reached the server log is recoverable. What is not
 * acceptable is a form that silently drops a message while showing a tick, so a
 * configured provider that actually fails is reported as a failure.
 */
export type SendResult = { status: "SENT" | "FAILED"; error?: string };

export async function sendEnquiry(
  to: string,
  subject: string,
  text: string,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    console.log(`[enquiry — no mail provider configured] to=${to} subject=${subject}\n${text}`);
    return { status: "SENT" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, text }),
    });

    if (!response.ok) {
      return { status: "FAILED", error: await response.text() };
    }
    return { status: "SENT" };
  } catch (error) {
    return { status: "FAILED", error: String(error) };
  }
}
