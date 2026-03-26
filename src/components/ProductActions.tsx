"use client";

import { useState } from "react";
import { getSizesForCategory, type Product } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";
import BuyNowButton from "@/components/BuyNowButton";

type Props = {
  product: Product;
};

export default function ProductActions({ product }: Props) {
  const sizes = getSizesForCategory(product.category);
  const hasMultipleSizes = sizes.length > 1;
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <>
      <div className="mt-10 border-t border-border pt-8">
        <div className="space-y-4">
          <div className="flex justify-between text-[13px]">
            <span className="text-text-muted">Material</span>
            <span className="text-text">{product.material}</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-text-muted">Category</span>
            <span className="capitalize text-text">{product.category}</span>
          </div>
        </div>
      </div>

      {/* Size selector */}
      <div className="mt-8">
        <label className="mb-2 block text-[13px] text-text-muted">
          {hasMultipleSizes ? "Sizes (in.)" : "Size"}
        </label>
        <div className="relative">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full appearance-none border border-border bg-surface px-4 py-3 pr-10 text-[13px] text-text outline-none cursor-pointer transition-colors hover:border-accent focus:border-accent"
          >
            {sizes.map((s) => (
              <option key={s} value={s} className="bg-surface text-text">
                {s}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      <AddToCartButton
        productId={product.id}
        slug={product.slug}
        name={product.name}
        price={product.price}
        material={product.material}
        size={selectedSize}
        inventory={product.inventory}
      />

      <BuyNowButton
        productId={product.id}
        slug={product.slug}
        name={product.name}
        price={product.price}
        material={product.material}
        size={selectedSize}
        inventory={product.inventory}
      />
    </>
  );
}
