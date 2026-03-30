"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

function SuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState<string | null>(null);
  const [trackingUrl, setTrackingUrl] = useState<string | null>(null);
  const [carrier, setCarrier] = useState<string | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);

  useEffect(() => {
    clearCart();

    const sessionId = searchParams.get("session_id");
    if (!sessionId) return;

    // Get order number
    fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.order_number) setOrderNumber(data.order_number);
      })
      .catch(() => {});

    // Generate shipping label via Shippo
    fetch("/api/shippo/create-label", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setShippingError(data.error);
          return;
        }
        if (data.tracking_number) setTrackingNumber(data.tracking_number);
        if (data.tracking_url) setTrackingUrl(data.tracking_url);
        if (data.carrier) setCarrier(data.carrier);
      })
      .catch(() => setShippingError("Could not generate shipping label."));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-36 text-center sm:py-48">
      <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-text-muted">
        Thank you
      </p>
      <h1 className="text-4xl font-light tracking-tight sm:text-5xl">
        Order Confirmed
      </h1>
      {orderNumber && (
        <p className="mt-5 text-[13px] uppercase tracking-[0.25em] text-text-muted">
          Order #{orderNumber}
        </p>
      )}
      <p className="mt-8 max-w-md text-base leading-[1.8] text-text-muted">
        Your payment was successful. We&apos;ll start preparing your order
        shortly.
      </p>
      {trackingNumber && (
        <p className="mt-4 text-[13px] tracking-[0.15em] text-text-muted">
          {carrier && <span className="uppercase">{carrier} &middot; </span>}
          Tracking:{" "}
          {trackingUrl ? (
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-accent"
            >
              {trackingNumber}
            </a>
          ) : (
            trackingNumber
          )}
        </p>
      )}
      {shippingError && (
        <p className="mt-4 text-[12px] text-red-400">
          Shipping label pending &mdash; we&apos;ll email your tracking info
          shortly.
        </p>
      )}
      <Link
        href="/shop"
        className="mt-12 inline-block border border-border px-10 py-4 text-[13px] uppercase tracking-[0.2em] text-text transition-all duration-300 hover:border-accent hover:text-accent-hover"
      >
        Continue Shopping
      </Link>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
