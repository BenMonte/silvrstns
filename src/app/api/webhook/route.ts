import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createShippingLabel } from "@/lib/shippo";
import { sendOrderConfirmation, sendAdminOrderNotification } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Invalid signature";
    console.error("Webhook signature verification failed:", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      await handleCompletedCheckout(session);
    } catch (err) {
      console.error("Webhook handler error:", err);
      // Still return 200 so Stripe doesn't retry
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCompletedCheckout(session: Stripe.Checkout.Session) {
  const orderNumber = session.metadata?.order_number ?? "N/A";
  const customerEmail = session.customer_details?.email;
  const customerName = session.customer_details?.name ?? undefined;
  const items = session.metadata?.sizes ?? "N/A";
  const totalAmount = session.amount_total
    ? `$${(session.amount_total / 100).toFixed(2)}`
    : "N/A";
  const subtotal = session.amount_subtotal
    ? `$${(session.amount_subtotal / 100).toFixed(2)}`
    : undefined;
  const shippingCost = session.shipping_cost?.amount_total
    ? `$${(session.shipping_cost.amount_total / 100).toFixed(2)}`
    : undefined;
  const tax = session.total_details?.amount_tax
    ? `$${(session.total_details.amount_tax / 100).toFixed(2)}`
    : undefined;

  // Skip if label already created (idempotency)
  if (session.metadata?.tracking_number) {
    // Still send email if it hasn't been sent
    if (customerEmail && !session.metadata?.email_sent) {
      await sendConfirmationEmail(session.id, orderNumber, items, totalAmount, customerEmail, {
        trackingNumber: session.metadata.tracking_number,
        trackingUrl: session.metadata.tracking_url ?? undefined,
        carrier: session.metadata.carrier ?? undefined,
      });
    }
    return;
  }

  // Get the full session with shipping details
  const fullSession = await stripe.checkout.sessions.retrieve(session.id);
  const shipping = fullSession.collected_information?.shipping_details;

  let trackingNumber: string | undefined;
  let trackingUrl: string | undefined;
  let carrier: string | undefined;
  let shippingService: string | undefined;
  let labelUrl: string | undefined;

  if (shipping?.address) {
    try {
      const label = await createShippingLabel({
        name: shipping.name ?? "Customer",
        street1: shipping.address.line1 ?? "",
        street2: shipping.address.line2 ?? undefined,
        city: shipping.address.city ?? "",
        state: shipping.address.state ?? "",
        zip: shipping.address.postal_code ?? "",
        country: shipping.address.country ?? "US",
        email: customerEmail ?? undefined,
      });

      trackingNumber = label.tracking_number;
      trackingUrl = label.tracking_url;
      carrier = label.carrier;
      shippingService = label.service;
      labelUrl = label.label_url;

      // Store label info in Stripe metadata
      await stripe.checkout.sessions.update(session.id, {
        metadata: {
          ...fullSession.metadata,
          tracking_number: label.tracking_number,
          tracking_url: label.tracking_url ?? "",
          label_url: label.label_url,
          carrier: label.carrier,
          shipping_service: label.service,
          shipping_rate: label.rate_amount,
        },
      });
    } catch (err) {
      console.error("Webhook: Shippo label creation failed:", err);
    }
  }

  // Send confirmation email to customer
  if (customerEmail) {
    await sendConfirmationEmail(
      session.id,
      orderNumber,
      items,
      totalAmount,
      customerEmail,
      { trackingNumber, trackingUrl, carrier },
    );
  }

  // Send admin notification to silvrstns@gmail.com
  if (customerEmail) {
    try {
      if (!process.env.RESEND_API_KEY) {
        console.error("Webhook: RESEND_API_KEY not set. Cannot send admin notification.");
      } else {
        await sendAdminOrderNotification({
          orderNumber,
          customerEmail,
          customerName,
          items,
          totalAmount,
          subtotal,
          shippingCost,
          tax,
          shipping: shipping?.address
            ? {
                name: shipping.name ?? undefined,
                street1: shipping.address.line1 ?? undefined,
                street2: shipping.address.line2 ?? undefined,
                city: shipping.address.city ?? undefined,
                state: shipping.address.state ?? undefined,
                zip: shipping.address.postal_code ?? undefined,
                country: shipping.address.country ?? undefined,
              }
            : undefined,
          trackingNumber,
          trackingUrl,
          carrier,
          shippingService,
          labelUrl,
        });
        console.log(`✅ Admin notification sent for order #${orderNumber}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      console.error(`Webhook: Failed to send admin notification: ${msg}`);
    }
  }
}

async function sendConfirmationEmail(
  sessionId: string,
  orderNumber: string,
  items: string,
  totalAmount: string,
  to: string,
  tracking: { trackingNumber?: string; trackingUrl?: string; carrier?: string },
) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error(
        `Webhook: RESEND_API_KEY not set. Cannot send order confirmation to ${to}`,
      );
      return;
    }

    await sendOrderConfirmation({
      to,
      orderNumber,
      items,
      totalAmount,
      trackingNumber: tracking.trackingNumber,
      trackingUrl: tracking.trackingUrl,
      carrier: tracking.carrier,
    });

    console.log(`✅ Confirmation email sent to ${to} for order #${orderNumber}`);

    // Mark email as sent
    await stripe.checkout.sessions.update(sessionId, {
      metadata: { email_sent: "true" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : JSON.stringify(err);
    console.error(`Webhook: Failed to send confirmation email to ${to}: ${msg}`);
  }
}
