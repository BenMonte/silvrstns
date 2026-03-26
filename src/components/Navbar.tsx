import Link from "next/link";
import CartButton from "@/components/CartButton";

export default function Navbar() {
  return (
    <nav className="border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
        {/* Logo / Brand */}
        <Link href="/" className="text-base font-normal tracking-[0.35em] text-text">
          SILVRSTNS
        </Link>

        {/* Navigation links + cart */}
        <div className="flex items-center gap-10">
          <Link
            href="/shop"
            className="hidden text-[13px] uppercase tracking-[0.15em] text-text-muted transition-colors duration-300 hover:text-text sm:block"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="hidden text-[13px] uppercase tracking-[0.15em] text-text-muted transition-colors duration-300 hover:text-text sm:block"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hidden text-[13px] uppercase tracking-[0.15em] text-text-muted transition-colors duration-300 hover:text-text sm:block"
          >
            Contact
          </Link>
          <CartButton />
        </div>
      </div>
    </nav>
  );
}
