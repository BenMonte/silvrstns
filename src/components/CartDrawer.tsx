"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { trackBeginCheckout } from "@/lib/analytics";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
    isDrawerOpen,
    closeDrawer,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleCheckout() {
    trackBeginCheckout(
      items.map((i) => ({ id: i.productId, name: i.name, price: i.price, quantity: i.quantity })),
      subtotal
    );
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            size: i.size,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-bg border-l border-border transition-transform duration-500 ease-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-6">
          <h2 className="text-[13px] font-normal uppercase tracking-[0.2em]">
            Cart{itemCount > 0 && ` (${itemCount})`}
          </h2>
          <button
            onClick={closeDrawer}
            className="text-text-muted transition-colors hover:text-text"
            aria-label="Close cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-sm text-text-muted">Your cart is empty.</p>
            <Link
              href="/shop"
              onClick={closeDrawer}
              className="mt-8 text-[13px] text-accent transition-colors duration-300 hover:text-accent-hover"
            >
              Browse the collection &rarr;
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-6">
                {items.map((item) => {
                  const product = getProductById(item.productId);
                  const maxQty = product?.inventory ?? 0;
                  const atMax = item.quantity >= maxQty;

                  return (
                  <li key={`${item.productId}-${item.size}`} className="flex gap-4">
                    {/* Image placeholder */}
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={closeDrawer}
                      className="block h-20 w-16 flex-shrink-0 rounded-sm bg-surface"
                    />

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={closeDrawer}
                          className="text-sm font-medium text-text transition-colors hover:text-accent-hover"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-text-muted">
                          {item.material} · {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              item.quantity <= 1
                                ? removeItem(item.productId, item.size)
                                : updateQuantity(
                                    item.productId,
                                    item.size,
                                    item.quantity - 1
                                  )
                            }
                            className="flex h-7 w-7 items-center justify-center border border-border text-xs text-text-muted transition-colors hover:border-accent hover:text-text"
                            aria-label="Decrease quantity"
                          >
                            &minus;
                          </button>
                          <span className="w-4 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            disabled={atMax}
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center border border-border text-xs text-text-muted transition-colors hover:border-accent hover:text-text disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-muted"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                          {atMax && (
                            <span className="text-[10px] text-text-muted/60">Max</span>
                          )}
                        </div>

                        <p className="text-sm text-text">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="self-start text-text-muted/50 transition-colors hover:text-text"
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-border px-6 py-8 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-text-muted">Subtotal</span>
                <span className="text-lg font-light tracking-tight">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-text-muted/50">
                Shipping &amp; taxes calculated at checkout.
              </p>
              {error && (
                <p className="text-[11px] text-red-400/80">
                  Checkout failed — please try again.
                </p>
              )}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-text py-4 text-[13px] uppercase tracking-[0.2em] text-bg transition-opacity duration-300 hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Redirecting…" : "Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
