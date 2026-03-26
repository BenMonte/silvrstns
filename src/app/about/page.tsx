import type { Metadata } from "next";
import SectionWrapper from "@/components/SectionWrapper";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — SilvrStns",
  description:
    "The story behind SilvrStns — minimal silver and stone jewelry designed to last.",
};

export default function AboutPage() {
  return (
    <SectionWrapper className="py-24 sm:py-32">
      {/* Header */}
      <div className="mb-20 max-w-xl sm:mb-24">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-text-muted">
          About
        </p>
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
          The Brand
        </h1>
      </div>

      {/* Content — two-column on desktop */}
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Image placeholder */}
        <div className="aspect-[4/5] bg-surface" />

        {/* Story */}
        <div className="flex flex-col justify-center lg:py-8">
          <h2 className="text-xl font-light tracking-tight sm:text-2xl md:text-3xl">
            Made to wear, not to show off.
          </h2>
          <div className="mt-8 space-y-6 text-[15px] leading-[1.8] text-text-muted">
            <p>
              SilvrStns was born out of frustration with jewelry that tries too
              hard. We wanted pieces that disappear into your look instead of
              dominating it — simple forms in silver and natural stone that feel
              as good as they look.
            </p>
            <p>
              Every design starts with restraint. We strip away anything
              unnecessary until only the essential shape remains. The result is
              jewelry you reach for every morning without thinking twice.
            </p>
            <p>
              We&apos;re a small independent brand — no massive catalog, no
              seasonal trends. Just a focused collection that grows slowly and
              deliberately.
            </p>
          </div>
          <Link
            href="/shop"
            className="mt-12 inline-block text-[13px] text-accent transition-colors duration-300 hover:text-accent-hover"
          >
            Browse the collection &rarr;
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
