import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/data/products";

type CartLineItem = {
  productId: string;
  size: string;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const { items } = (await request.json()) as { items: CartLineItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty." },
        { status: 400 }
      );
    }

    const lineItems = items.map((item) => {
      if (!item.quantity || item.quantity < 1 || !Number.isInteger(item.quantity)) {
        throw new Error("Invalid quantity");
      }
      // look up real product so we never trust client-side prices
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error("Product not found");
      }
      const size = item.size || "One Size";
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: `${product.shortDescription} , Size: ${size}`,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      };
    });

    // generate a short order number: SS + 5 random digits
    const orderNumber = `SS${String(Math.floor(10000 + Math.random() * 90000))}`;

    // build a compact sizes summary for metadata
    const sizesSummary = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return `${product?.name ?? item.productId}: ${item.size || "One Size"}`;
    }).join(" | ");

    // need the origin for redirect urls , falls back to env var for production
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      metadata: { order_number: orderNumber, sizes: sizesSummary },
      client_reference_id: orderNumber,
      automatic_tax: { enabled: true },
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 599, currency: "usd" },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 999, currency: "usd" },
            display_name: "Priority Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 3 },
            },
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
