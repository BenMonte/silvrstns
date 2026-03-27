"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

const PLANNED_CATEGORIES = [
  "rings",
  "pendants",
  "necklaces",
  "bracelets",
  "earrings",
  "glasses",
  "accessories",
] as const;

function ComingSoonCard({ category }: { category: string }) {
  return (
    <div className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted/30">
            {category}
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-text-muted/50">
            Coming Soon
          </span>
        </div>
      </div>
      <div className="mt-5 space-y-1.5">
        <h3 className="text-sm font-normal text-text-muted/40">
          Coming Soon
        </h3>
        <p className="text-[13px] text-text-muted/30">&mdash;</p>
      </div>
    </div>
  );
}

export default function ShopContent({ products }: { products: Product[] }) {
  const [active, setActive] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high" | "best-seller">("newest");

  const populatedCategories = new Set(products.map((p) => p.category));
  const emptyCategories = PLANNED_CATEGORIES.filter(
    (c) => !populatedCategories.has(c),
  );

  // Filter by category
  let filtered = products.filter((p) => {
    return active === "All" || p.category === active.toLowerCase();
  });

  // Sort
  filtered = filtered.sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "best-seller") return a.inventory - b.inventory;
    // "newest" - maintain order from products array (or reverse for true newest first)
    return 0;
  });

  const showComingSoon =
    active === "All"
      ? emptyCategories
      : !populatedCategories.has(active.toLowerCase() as (typeof PLANNED_CATEGORIES)[number])
        ? [active.toLowerCase()]
        : [];

  const heading = active === "All" ? "All Pieces" : active;

  return (
    <>
      <h1 className="mb-10 text-3xl font-light tracking-tight sm:mb-12 sm:text-4xl md:text-5xl">
        {heading}
      </h1>

      <nav className="mb-14 flex flex-wrap gap-x-6 gap-y-3 sm:mb-16 sm:gap-x-8">
        {["All", ...PLANNED_CATEGORIES.map((c) => c.charAt(0).toUpperCase() + c.slice(1))].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                active === cat
                  ? "text-text"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {cat}
              {active === cat && (
                <span className="mt-1.5 block h-px w-full bg-text" />
              )}
            </button>
          ),
        )}
      </nav>

      <div className="mb-8 flex flex-wrap items-center gap-4 sm:mb-10 sm:gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.3em] text-text-muted">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="border border-border bg-transparent px-3 py-2 text-[12px] text-text transition-colors duration-300 hover:border-text"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="best-seller">Best Seller</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {showComingSoon.map((cat) => (
          <ComingSoonCard key={`coming-soon-${cat}`} category={cat} />
        ))}
      </div>
    </>
  );
}
