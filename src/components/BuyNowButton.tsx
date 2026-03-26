"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  material: string;
  inventory: number;
};

export default function BuyNowButton({
  productId,
  slug,
  name,
  price,
  material,
  inventory,
}: Props) {
  const { addItem, items } = useCart();
  const [loading, setLoading] = useState(false);

  const soldOut = inventory === 0;

  async function handleBuyNow() {
    // ensure item is in cart
    const inCart = items.find((i) => i.productId === productId);
    if (!inCart) {
      addItem({ productId, slug, name, price, material });
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ productId, quantity: inCart ? inCart.quantity : 1 }],
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // silent fail — user can retry
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      disabled={soldOut || loading}
      onClick={handleBuyNow}
      className="w-full bg-text py-4 text-[13px] uppercase tracking-[0.2em] text-bg transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto sm:px-16"
    >
      {loading ? "Redirecting…" : "Check Out Now"}
    </button>
  );
}
