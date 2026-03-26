"use client";

import { useEffect } from "react";
import { trackViewItem } from "@/lib/analytics";

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
