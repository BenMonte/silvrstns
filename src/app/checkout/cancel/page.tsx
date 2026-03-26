import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout Cancelled — SilvrStns",
};

export default function CheckoutCancelPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-36 text-center sm:py-48">
      <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-text-muted">
        Checkout
      </p>
      <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
        Payment Cancelled
      </h1>
      <p className="mt-8 max-w-md text-base leading-[1.8] text-text-muted">
        Your checkout was cancelled, you&apos;re payment method was not charged . Your cart items are
        still saved if you&apos;d like to try again.
      </p>
      <Link
        href="/shop"
        className="mt-12 inline-block border border-border px-10 py-4 text-[13px] uppercase tracking-[0.2em] text-text transition-all duration-300 hover:border-accent hover:text-accent-hover"
      >
        Back to Shop
      </Link>
    </section>
  );
}
