import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { LOW_STOCK_THRESHOLD } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const soldOut = product.inventory === 0;
  const lowStock = product.inventory > 0 && product.inventory <= LOW_STOCK_THRESHOLD;
  const hasImage = product.images.length > 0;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={`group block ${soldOut ? "pointer-events-none opacity-50" : ""}`}
      aria-disabled={soldOut}
      tabIndex={soldOut ? -1 : undefined}
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        {hasImage ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <span className="text-[11px] uppercase tracking-[0.25em] text-text-muted/25">
              {product.category}
            </span>
          </div>
        )}

        {soldOut && (
          <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.2em] text-text-muted/70">
            Sold out
          </span>
        )}
        {lowStock && (
          <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.2em] text-text-muted/70">
            Low stock
          </span>
        )}
      </div>

      <div className="mt-5 space-y-1.5">
        <h3 className="text-sm font-normal text-text transition-colors duration-300 group-hover:text-accent-hover">
          {product.name}
        </h3>
        <p className="text-[13px] text-text-muted">${product.price}</p>
      </div>
    </Link>
  );
}
