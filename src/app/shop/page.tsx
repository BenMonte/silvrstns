import type { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop — SilvrStns",
  description: "Browse the full SilvrStns collection of silver and stone jewelry.",
};

export default function ShopPage() {
  return (
    <SectionWrapper className="py-24 sm:py-32">
      {/* Page header */}
      <div className="mb-16 max-w-xl sm:mb-20">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-text-muted">
          Collection
        </p>
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
          All Pieces
        </h1>
        <p className="mt-5 text-base leading-[1.8] text-text-muted">
          Each piece is designed to be worn daily — quiet, durable, and
          intentionally simple.
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionWrapper>
  );
}
