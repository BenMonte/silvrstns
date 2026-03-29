import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-normal tracking-[0.35em] text-text">
              SILVRSTNS
            </p>
            <p className="mt-2 text-xs leading-relaxed text-text-muted/50">
              Handcrafted sterling silver jewelry.
            </p>
          </div>

          <div className="flex gap-10">
            <Link href="/shop" className="text-xs uppercase tracking-[0.15em] text-text-muted transition-colors duration-300 hover:text-text">
              Shop
            </Link>
            <Link href="/about" className="text-xs uppercase tracking-[0.15em] text-text-muted transition-colors duration-300 hover:text-text">
              About
            </Link>
            <Link href="/contact" className="text-xs uppercase tracking-[0.15em] text-text-muted transition-colors duration-300 hover:text-text">
              Contact
            </Link>
            <Link href="/shipping" className="text-xs uppercase tracking-[0.15em] text-text-muted transition-colors duration-300 hover:text-text">
              Shipping
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8 text-center">
          <div className="mb-4 flex justify-center gap-6">
            <Link href="/privacy-policy" className="text-[11px] tracking-wide text-text-muted/40 transition-colors duration-300 hover:text-text-muted">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-[11px] tracking-wide text-text-muted/40 transition-colors duration-300 hover:text-text-muted">
              Terms of Service
            </Link>
          </div>
          <p className="text-[11px] tracking-wide text-text-muted/40">
            &copy; {new Date().getFullYear()} SilvrStns. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
