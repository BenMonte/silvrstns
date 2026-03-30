import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createShippingLabel } from "@/lib/shippo";

export async function POST(request: Request) {
  try {
    const { session_id } = (await request.json()) as { session_id: string };

    if (!session_id) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    // If label was already created for this session, return the stored info
    if (session.metadata?.tracking_number) {
      return NextResponse.json({
        order_number: session.metadata.order_number ?? null,
        tracking_number: session.metadata.tracking_number,
        tracking_url: session.metadata.tracking_url ?? null,
        label_url: session.metadata.label_url ?? null,
        carrier: session.metadata.carrier ?? null,
      });
    }

    // Get shipping address from the checkout session
    const shipping = session.collected_information?.shipping_details;
    if (!shipping?.address) {
      return NextResponse.json(
        { error: "No shipping address found on this session." },
        { status: 400 },
      );
    }

    const addr = shipping.address;

    const label = await createShippingLabel({
      name: shipping.name ?? "Customer",
      street1: addr.line1 ?? "",
      street2: addr.line2 ?? undefined,
      city: addr.city ?? "",
      state: addr.state ?? "",
      zip: addr.postal_code ?? "",
      country: addr.country ?? "US",
      email: session.customer_details?.email ?? undefined,
    });

    // Store tracking info in Stripe metadata so you can see it in your dashboard
    await stripe.checkout.sessions.update(session_id, {
      metadata: {
        ...session.metadata,
        tracking_number: label.tracking_number,
        tracking_url: label.tracking_url ?? "",
        label_url: label.label_url,
        carrier: label.carrier,
        shipping_service: label.service,
        shipping_rate: label.rate_amount,
      },
    });

    return NextResponse.json({
      order_number: session.metadata?.order_number ?? null,
      tracking_number: label.tracking_number,
      tracking_url: label.tracking_url,
      label_url: label.label_url,
      carrier: label.carrier,
      service: label.service,
      rate: label.rate_amount,
      eta_days: label.eta,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Shippo label error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
