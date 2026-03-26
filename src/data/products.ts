export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  category: "necklaces" | "pendants" | "rings" | "earrings" | "bracelets" | "glasses" | "accessories";
  material: string;
  inventory: number;
  featured: boolean;
};

export const LOW_STOCK_THRESHOLD = 5;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getSizesForCategory(category: Product["category"]): string[] {
  switch (category) {
    case "rings":
      return ["7 in.", "8 in.", "9 in.", "10 in."];
    case "bracelets":
      return ["7 in.", "8 in."];
    case "necklaces":
      return ["20 in."];
    default:
      return ["One Size"];
  }
}

// tries same category first, then fills with other products if needed
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .concat(products.filter((p) => p.category !== product.category))
    .slice(0, limit);
}

export const products: Product[] = [
  {
    id: "signet-ring-matte",
    slug: "matte-signet-ring",
    name: "Matte Signet Ring",
    price: 78,
    shortDescription:
      "A clean matte-finished signet ring in sterling silver.",
    fullDescription:
      "A classic signet shape reimagined with a smooth matte finish. Cast in solid sterling silver and hand-polished to a soft texture that catches light without glare. The flat face is left intentionally blank — no engraving, no emblem — just clean geometry you can wear every day. Fits comfortably on the pinky or ring finger.",
    category: "rings",
    material: "Sterling Silver, Zinc, Copper",
    inventory: 12,
    featured: true,
  },
  {
    id: "thin-chain-necklace",
    slug: "thin-chain-necklace",
    name: "Thin Chain Necklace",
    price: 64,
    shortDescription:
      "Delicate silver chain with a minimal clasp.",
    fullDescription:
      "An ultra-fine cable chain in sterling silver, finished at 20 inches with a small lobster clasp. The links are tight enough to feel solid but light enough to forget you're wearing it. Layers well under collars or pairs with a pendant. The kind of necklace you never take off.",
    category: "necklaces",
    material: "Sterling Silver, Zinc, Copper",
    inventory: 24,
    featured: true,
  },
  {
    id: "flat-cuff-bracelet",
    slug: "flat-cuff-bracelet",
    name: "Flat Cuff Bracelet",
    price: 92,
    shortDescription:
      "A slim polished cuff with a soft curve.",
    fullDescription:
      "A sleek open cuff bracelet with a flat profile and gently curved ends. Polished to a mirror-like finish on the outside, brushed matte on the inside for comfort. The opening allows for an adjustable fit that works across wrist sizes. Stacks well or wears alone as a quiet statement.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    inventory: 8,
    featured: true,
  },
  {
    id: "stone-drop-earrings",
    slug: "stone-drop-earrings",
    name: "Stone Drop Earrings",
    price: 56,
    shortDescription:
      "Small drop earrings with a natural grey stone.",
    fullDescription:
      "Miniature teardrop earrings featuring a natural grey labradorite stone set in a thin silver bezel. The stones are hand-selected for their subtle color shift — a flash of blue-grey when they catch the light. Lightweight enough to wear all day with a secure push-back closure.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    inventory: 3,
    featured: false,
  },
  {
    id: "double-band-ring",
    slug: "double-band-ring",
    name: "Double Band Ring",
    price: 68,
    shortDescription:
      "Two thin bands joined by a subtle bridge.",
    fullDescription:
      "Two parallel bands connected by a slender bridge, creating a layered look in a single ring. Each band is individually rounded and polished. The gap between them adds visual depth without bulk. Designed to sit comfortably on the index or middle finger.",
    category: "rings",
    material: "Sterling Silver, Zinc, Copper",
    inventory: 15,
    featured: false,
  },
  {
    id: "bar-pendant-necklace",
    slug: "bar-pendant-necklace",
    name: "Bar Pendant Necklace",
    price: 72,
    shortDescription:
      "A short silver bar on a fine chain.",
    fullDescription:
      "A 25mm horizontal bar pendant on a 20-inch fine cable chain. The bar has a polished front face and softly rounded edges that feel smooth against the skin. The proportions are deliberately understated — visible but never loud. Works equally well on its own or layered with the Thin Chain Necklace.",
    category: "necklaces",
    material: "Sterling Silver, Zinc, Copper",
    inventory: 18,
    featured: true,
  },
];
