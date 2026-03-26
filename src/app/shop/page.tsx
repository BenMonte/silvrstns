import type { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import ShopContent from "@/components/ShopContent";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop — SilvrStns",
  description: "Browse the full SilvrStns collection of silver and stone jewelry.",
};

export default function ShopPage() {
  return (
    <SectionWrapper className="py-24 sm:py-32">
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

      <ShopContent products={products} />
    </SectionWrapper>
  );
}
