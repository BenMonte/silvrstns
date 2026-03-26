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
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-text-muted">
              {hasMultipleSizes ? "Size (in.)" : "Size"}
            </span>
            {hasMultipleSizes ? (
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="appearance-none bg-transparent text-right text-[13px] text-text outline-none cursor-pointer border border-border px-3 py-1.5 transition-colors hover:border-accent focus:border-accent"
              >
                {sizes.map((s) => (
                  <option key={s} value={s} className="bg-bg text-text">
                    {s}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-text">{sizes[0]}</span>
            )}
          </div>
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
