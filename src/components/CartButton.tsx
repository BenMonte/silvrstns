"use client";

import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { itemCount, openDrawer } = useCart();

  return (
    <button
      onClick={openDrawer}
      className="relative text-text-muted transition-colors duration-300 hover:text-text"
      aria-label="Open cart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>

      {itemCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-text text-[10px] font-semibold text-bg">
          {itemCount}
        </span>
      )}
    </button>
  );
}
