import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug, getRelatedProducts, LOW_STOCK_THRESHOLD } from "@/data/products";
import SectionWrapper from "@/components/SectionWrapper";
import ProductCard from "@/components/ProductCard";
import ProductActions from "@/components/ProductActions";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductViewTracker from "@/components/ProductViewTracker";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found , SilvrStns" };

  return {
    title: `${product.name} , SilvrStns`,
    description: product.shortDescription,
  };
}

function InventoryBadge({ count }: { count: number }) {
  if (count === 0) {
    return <span className="text-[11px] uppercase tracking-[0.2em] text-red-400/80">Sold out</span>;
  }
  if (count <= LOW_STOCK_THRESHOLD) {
    return <span className="text-[11px] uppercase tracking-[0.2em] text-amber-400/80">Low stock , {count} left</span>;
  }
  return <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted">In stock</span>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <>
      <ProductViewTracker
        id={product.id}
        name={product.name}
        price={product.price}
        category={product.category}
      />

      <SectionWrapper className="py-20 sm:py-28">
        <nav className="mb-12 text-[11px] uppercase tracking-[0.15em] text-text-muted sm:mb-16">
          <Link href="/shop" className="transition-colors duration-300 hover:text-text">
            Shop
          </Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-text">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <ProductImageGallery images={product.images} name={product.name} />

          <div className="flex flex-col justify-center lg:py-8">
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-text-muted">
              {product.category}
            </p>

            <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-5 text-2xl font-light tracking-tight">${product.price}</p>

            <div className="mt-4">
              <InventoryBadge count={product.inventory} />
            </div>

            <p className="mt-10 text-[15px] leading-[1.8] text-text-muted">
              {product.fullDescription}
            </p>

            <ProductActions product={product} />
          </div>
        </div>
      </SectionWrapper>

      {related.length > 0 && (
        <section className="border-t border-border">
          <SectionWrapper className="py-24 sm:py-32">
            <div className="mb-14 sm:mb-16">
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-text-muted">
                You may also like
              </p>
              <h2 className="text-2xl font-light tracking-tight">
                Related Pieces
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </SectionWrapper>
        </section>
      )}
    </>
  );
}
