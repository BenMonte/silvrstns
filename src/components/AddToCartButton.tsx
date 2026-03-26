"use client";

import { useCart } from "@/context/CartContext";
import { trackAddToCart } from "@/lib/analytics";

type Props = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  material: string;
  inventory: number;
};

export default function AddToCartButton({
  productId,
  slug,
  name,
  price,
  material,
  inventory,
}: Props) {
  const { addItem, items } = useCart();

  const soldOut = inventory === 0;
  const inCart = items.find((i) => i.productId === productId)?.quantity ?? 0;
  const atMax = inCart >= inventory; // don't let them add more than what's in stock

  let label = "Add to Cart";
  if (soldOut) label = "Sold Out";
  else if (atMax) label = "Max in Cart";

  return (
    <button
      disabled={soldOut || atMax}
      onClick={() => {
        addItem({ productId, slug, name, price, material });
        trackAddToCart({ id: productId, name, price });
      }}
      className="mt-12 w-full border border-border py-4 text-[13px] uppercase tracking-[0.2em] text-text transition-all duration-300 hover:border-accent hover:text-accent-hover disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text sm:w-auto sm:px-16"
    >
      {label}
    </button>
  );
}
