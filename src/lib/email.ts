import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "SilvrStns <orders@silvrstns.com>";

type OrderEmailData = {
  to: string;
  orderNumber: string;
  items: string; // sizes summary from metadata
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  totalAmount: string; // e.g. "$124.99"
};

export async function sendOrderConfirmation(data: OrderEmailData) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set in environment variables.");
  }

  const trackingHtml = data.trackingNumber
    ? `
      <tr>
        <td style="padding:24px 32px;background:#f8f8f8;border-radius:4px;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;">
            ${data.carrier ?? "Shipping"} Tracking
          </p>
          <p style="margin:0;font-size:14px;color:#222;">
            ${data.trackingUrl
              ? `<a href="${data.trackingUrl}" style="color:#222;text-decoration:underline;">${data.trackingNumber}</a>`
              : data.trackingNumber}
          </p>
        </td>
      </tr>`
    : `
      <tr>
        <td style="padding:24px 32px;background:#f8f8f8;border-radius:4px;">
          <p style="margin:0;font-size:13px;color:#888;">
            Your tracking number will be emailed once your order ships.
          </p>
        </td>
      </tr>`;

  const html = `
  <div style="max-width:520px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#222;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding:40px 0 24px;text-align:center;">
          <h1 style="margin:0;font-size:24px;font-weight:300;letter-spacing:0.08em;">SILVRSTNS</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 8px;text-align:center;">
          <p style="margin:0;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#888;">Order Confirmed</p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0 24px;text-align:center;">
          <p style="margin:0;font-size:13px;letter-spacing:0.2em;color:#555;">Order #${data.orderNumber}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 24px;text-align:center;">
          <p style="margin:0;font-size:15px;line-height:1.8;color:#555;">
            Thank you for your purchase. We're preparing your order now.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px;border-top:1px solid #eee;border-bottom:1px solid #eee;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;">Items</p>
          <p style="margin:0;font-size:14px;color:#222;">${data.items}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px;border-bottom:1px solid #eee;">
          <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#888;">Total</p>
          <p style="margin:0;font-size:14px;color:#222;">${data.totalAmount}</p>
        </td>
      </tr>
      ${trackingHtml}
      <tr>
        <td style="padding:32px 0;text-align:center;">
          <a href="https://silvrstns.com/shop" style="display:inline-block;padding:14px 32px;border:1px solid #222;color:#222;text-decoration:none;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">
            Continue Shopping
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 0;text-align:center;border-top:1px solid #eee;">
          <p style="margin:0;font-size:11px;color:#aaa;">
            Questions? Reply to this email or contact us at silvrstns@gmail.com
          </p>
        </td>
      </tr>
    </table>
  </div>`;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Order Confirmed — #${data.orderNumber}`,
      html,
    });

    if (result.error) {
      throw new Error(`Resend API error: ${result.error.message}`);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : JSON.stringify(err);
    throw new Error(`Failed to send order confirmation email to ${data.to}: ${msg}`);
  }
}
