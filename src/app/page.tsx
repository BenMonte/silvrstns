import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const featured = products.filter((p) => p.featured);

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center px-6 py-36 text-center sm:py-48 md:py-56">
        <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-text-muted">
          SILVRSTNS
        </p>
        <p className="mt-8 max-w-md text-[11px] uppercase tracking-[0.4em] text-text-muted">
          Goth jewelry, crafted with intention. Designed to be worn every day.
        </p>
        <Link
          href="/shop"
          className="mt-12 inline-block border border-border px-10 py-4 text-[13px] uppercase tracking-[0.2em] text-text transition-all duration-300 hover:border-accent hover:text-accent-hover"
        >
          Shop the Collection
        </Link>
      </section>

      <SectionWrapper className="py-24 sm:py-32">
        <div className="mb-14 flex items-end justify-between sm:mb-16">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-text-muted">
              Featured
            </p>
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
              Selected Pieces
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-[13px] text-text-muted transition-colors duration-300 hover:text-text sm:block"
          >
            View all &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/shop"
            className="text-[13px] text-text-muted transition-colors duration-300 hover:text-text"
          >
            View all &rarr;
          </Link>
        </div>
      </SectionWrapper>

      <section className="border-t border-border">
        <SectionWrapper className="py-28 sm:py-40">
          <div className="mx-auto max-w-xl text-center">
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-text-muted">
              Our Philosophy
            </p>
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl md:text-4xl">
              Less, but better.
            </h2>
            <p className="mt-8 text-base leading-[1.8] text-text-muted">
              SilvrStns started with a simple idea: jewelry shouldn&apos;t compete
              for attention — it should complete what you&apos;re already wearing.
              Every piece is designed to be quiet, durable, and intentionally
              minimal.
            </p>
            <Link
              href="/about"
              className="mt-10 inline-block text-[13px] text-accent transition-colors duration-300 hover:text-accent-hover"
            >
              Read more about us &rarr;
            </Link>
          </div>
        </SectionWrapper>
      </section>
    </>
  );
}
