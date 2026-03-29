import type { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import ShopContent from "@/components/ShopContent";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop , SilvrStns",
  description: "Browse the full SilvrStns collection of silver jewelry.",
};

export default function ShopPage() {
  return (
    <SectionWrapper className="py-24 sm:py-32">
      <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-text-muted">
        Collection
      </p>

      <ShopContent products={products} />
    </SectionWrapper>
  );
}
