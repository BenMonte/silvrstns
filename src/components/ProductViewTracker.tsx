"use client";

import { useEffect } from "react";
import { trackViewItem } from "@/lib/analytics";

// Fires a GA4 view_item event when a product page mounts.
// Kept as a separate client component so the product page stays a server component.

type Props = {
  id: string;
  name: string;
  price: number;
  category: string;
};

export default function ProductViewTracker({ id, name, price, category }: Props) {
  useEffect(() => {
    trackViewItem({ id, name, price, category });
  }, [id, name, price, category]);

  return null;
}
