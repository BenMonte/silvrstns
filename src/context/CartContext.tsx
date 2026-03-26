"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { getProductById } from "@/data/products";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  material: string;
  size: string;
  quantity: number;
};

function cartKey(item: { productId: string; size: string }) {
  return `${item.productId}::${item.size}`;
}

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "silvrstns-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // localStorage might have stale/broken json, just ignore it
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, loaded]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, qty = 1) => {
      const product = getProductById(item.productId);
      const maxQty = product?.inventory ?? 0;
      if (maxQty <= 0) return;

      const key = cartKey(item);

      setItems((prev) => {
        const existing = prev.find((i) => cartKey(i) === key);
        if (existing) {
          const newQty = Math.min(existing.quantity + qty, maxQty);
          return prev.map((i) =>
            cartKey(i) === key ? { ...i, quantity: newQty } : i
          );
        }
        return [...prev, { ...item, quantity: Math.min(qty, maxQty) }];
      });
      setIsDrawerOpen(true);
    },
    []
  );

  const removeItem = useCallback((productId: string, size: string) => {
    const key = cartKey({ productId, size });
    setItems((prev) => prev.filter((i) => cartKey(i) !== key));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, qty: number) => {
    if (qty < 1) return;
    const product = getProductById(productId);
    const maxQty = product?.inventory ?? 0;
    const capped = Math.min(qty, maxQty);
    const key = cartKey({ productId, size });
    setItems((prev) =>
      prev.map((i) =>
        cartKey(i) === key ? { ...i, quantity: capped } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
