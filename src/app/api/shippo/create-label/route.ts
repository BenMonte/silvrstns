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

    // Retrieve the Stripe session with shipping details
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const shipping = session.collected_information?.shipping_details;
    if (!shipping?.address) {
      return NextResponse.json(
        { error: "No shipping address on this session." },
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

    return NextResponse.json({
      order_number: session.metadata?.order_number ?? null,
      tracking_number: label.tracking_number,
      label_url: label.label_url,
      carrier: label.carrier,
      service: label.service,
      rate: label.rate_amount,
      eta_days: label.eta,
    });
  } catch (err) {
    console.error("Shippo label error:", err);
    return NextResponse.json(
      { error: "Failed to create shipping label." },
      { status: 500 },
    );
  }
}
