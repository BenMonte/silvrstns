import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed — SilvrStns",
};

export default function CheckoutSuccessPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-36 text-center sm:py-48">
      <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-text-muted">
        Thank you
      </p>
      <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
        Order Confirmed
      </h1>
      <p className="mt-8 max-w-md text-base leading-[1.8] text-text-muted">
        Your payment was successful. We&apos;ll start preparing your order
        shortly. You should receive a confirmation email from Stripe.
      </p>
      <Link
        href="/shop"
        className="mt-12 inline-block border border-border px-10 py-4 text-[13px] uppercase tracking-[0.2em] text-text transition-all duration-300 hover:border-accent hover:text-accent-hover"
      >
        Continue Shopping
      </Link>
    </section>
  );
}
