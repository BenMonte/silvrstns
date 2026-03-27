export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  category: "necklaces" | "pendants" | "rings" | "earrings" | "bracelets" | "glasses" | "accessories";
  material: string;
  images: string[];
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
      return ["7", "8", "9", "10"];
    case "bracelets":
      return ["7", "8"];
    case "necklaces":
      return ["20"];
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
    id: "fishtail-ring",
    slug: "fishtail-ring",
    name: "Fishtail Ring",
    price: 60,
    shortDescription:
      "A sculpted ring with a split fishtail silhouette.",
    fullDescription:
      "A sterling silver ring with a tapered split band that fans out into a subtle fishtail shape. The forked ends create a sense of movement while keeping the profile slim and wearable. Polished to a soft sheen with clean edges that catch light from every angle. Sits naturally on the index or ring finger.",
    category: "rings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/rings/fishtail-ring-1.jpeg", "/products/rings/fishtail-ring-2.jpeg", "/products/rings/fishtail-ring-3.jpeg"],
    inventory: 12,
    featured: true,
  },
  {
    id: "protector-ring",
    slug: "protector-ring",
    name: "Protector Ring",
    price: 60,
    shortDescription:
      "A bold shield-inspired ring with sharp geometry.",
    fullDescription:
      "A statement ring built around a raised shield motif — angular lines and a flat face that commands attention without excess. Cast in sterling silver with a weighted feel that sits solid on the finger. The surface is lightly brushed for a matte-industrial finish. Designed to be worn daily as a quiet armor.",
    category: "rings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/rings/protector-ring-1.jpeg", "/products/rings/protector-ring-2.jpeg", "/products/rings/protector-ring-3.jpeg"],
    inventory: 10,
    featured: true,
  },
  {
    id: "seal-ring",
    slug: "seal-ring",
    name: "Seal Ring",
    price: 60,
    shortDescription:
      "A flat-faced seal ring with old-world character.",
    fullDescription:
      "Inspired by traditional signet seals, this ring features a flat oval face and a tapered band. The surface is left smooth and unmarked — made to carry presence, not symbols. Sterling silver with a polished finish that deepens with wear. Looks best on the pinky or middle finger.",
    category: "rings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/rings/seal-ring-1.jpeg", "/products/rings/seal-ring-2.jpeg", "/products/rings/seal-ring-3.jpeg"],
    inventory: 14,
    featured: false,
  },
  {
    id: "cruciferous-ring",
    slug: "cruciferous-ring",
    name: "Cruciferous Ring",
    price: 60,
    shortDescription:
      "A cross-detailed ring with layered texture.",
    fullDescription:
      "A sterling silver ring featuring an embedded cruciform pattern across the band. The cross detail is recessed into the metal, creating depth through shadow rather than height. The band is slightly wider than standard for a bolder presence on the hand. Finished with a semi-matte texture that resists fingerprints.",
    category: "rings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/rings/cruciferous-ring-1.jpeg", "/products/rings/cruciferous-ring-2.jpeg", "/products/rings/cruciferous-ring-3.jpeg"],
    inventory: 11,
    featured: false,
  },
  {
    id: "thin-chain-necklace",
    slug: "thin-chain-necklace",
    name: "Thin Chain Necklace",
    price: 80,
    shortDescription:
      "Delicate silver chain with a minimal clasp.",
    fullDescription:
      "An ultra-fine cable chain in sterling silver, finished at 20 inches with a small lobster clasp. The links are tight enough to feel solid but light enough to forget you're wearing it. Layers well under collars or pairs with a pendant. The kind of necklace you never take off.",
    category: "necklaces",
    material: "Sterling Silver, Zinc, Copper",
    images: [],
    inventory: 24,
    featured: true,
  },
  {
    id: "flat-cuff-bracelet",
    slug: "flat-cuff-bracelet",
    name: "Flat Cuff Bracelet",
    price: 80,
    shortDescription:
      "A slim polished cuff with a soft curve.",
    fullDescription:
      "A sleek open cuff bracelet with a flat profile and gently curved ends. Polished to a mirror-like finish on the outside, brushed matte on the inside for comfort. The opening allows for an adjustable fit that works across wrist sizes. Stacks well or wears alone as a quiet statement.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: [],
    inventory: 8,
    featured: true,
  },
  {
    id: "stone-drop-earrings",
    slug: "stone-drop-earrings",
    name: "Stone Drop Earrings",
    price: 60,
    shortDescription:
      "Small drop earrings with a natural grey stone.",
    fullDescription:
      "Miniature teardrop earrings featuring a natural grey labradorite stone set in a thin silver bezel. The stones are hand-selected for their subtle color shift — a flash of blue-grey when they catch the light. Lightweight enough to wear all day with a secure push-back closure.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: [],
    inventory: 3,
    featured: false,
  },
  {
    id: "hollow-ring",
    slug: "hollow-ring",
    name: "Hollow Ring",
    price: 60,
    shortDescription:
      "A lightweight ring with an open hollow center.",
    fullDescription:
      "A minimal sterling silver ring with a hollowed-out center section that keeps the look substantial while the weight stays light. The outer walls are polished smooth while the inner cavity adds a subtle architectural quality. Comfortable for all-day wear on any finger.",
    category: "rings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/rings/hollow-ring-1.jpeg", "/products/rings/hollow-ring-2.jpeg", "/products/rings/hollow-ring-3.jpeg"],
    inventory: 15,
    featured: false,
  },
  {
    id: "round-nail-ring",
    slug: "round-nail-ring",
    name: "Round Nail Ring",
    price: 60,
    shortDescription:
      "A wraparound ring inspired by a bent nail.",
    fullDescription:
      "A sterling silver ring shaped like a nail bent into a circle — the head and tip overlap slightly where they meet. The round cross-section gives it a smooth, industrial feel without sharp edges. A simple concept executed cleanly. Fits naturally on the index or middle finger.",
    category: "rings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/rings/round-nail-ring-1.jpeg", "/products/rings/round-nail-ring-2.jpeg", "/products/rings/round-nail-ring-3.jpeg"],
    inventory: 18,
    featured: true,
  },
  {
    id: "crucifer-ring",
    slug: "crucifer-ring",
    name: "Crucifer Ring",
    price: 60,
    shortDescription:
      "A raised cross ring with a dark, gothic edge.",
    fullDescription:
      "A sterling silver ring featuring a prominent raised cross that extends slightly above the band. The cross has squared-off ends and a deliberate weight to it — gothic without being theatrical. The band narrows toward the back for comfort. Oxidized detailing in the recesses adds depth and shadow.",
    category: "rings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/rings/crucifer-ring-1.jpeg", "/products/rings/crucifer-ring-2.jpeg", "/products/rings/crucifer-ring-3.jpeg"],
    inventory: 9,
    featured: true,
  },
  {
    id: "spear-ring",
    slug: "spear-ring",
    name: "Spear Ring",
    price: 60,
    shortDescription:
      "A sharp-tipped ring with a pointed silhouette.",
    fullDescription:
      "A sterling silver ring with an elongated spearhead shape that extends along the finger. The pointed tip is softened just enough to avoid catching but keeps its aggressive line. The band tapers toward the back for a balanced fit. A piece that adds edge without saying too much.",
    category: "rings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/rings/spear-ring-1.jpeg", "/products/rings/spear-ring-2.jpeg"],
    inventory: 13,
    featured: false,
  },
  {
    id: "flat-nail-ring",
    slug: "flat-nail-ring",
    name: "Flat Nail Ring",
    price: 60,
    shortDescription:
      "A flat-profile nail ring with clean industrial lines.",
    fullDescription:
      "A sterling silver ring modeled after a flattened nail, wrapped into a band. The head sits flush against the finger while the tapered end tucks underneath. The flat cross-section gives it a modern, architectural quality — industrial without being heavy. Pairs well with other rings or stands on its own.",
    category: "rings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/rings/flat-nail-ring-1.jpeg", "/products/rings/flat-nail-ring-2.jpeg", "/products/rings/flat-nail-ring-3.jpeg"],
    inventory: 16,
    featured: false,
  },
  {
    id: "bar-pendant-necklace",
    slug: "bar-pendant-necklace",
    name: "Bar Pendant Necklace",
    price: 80,
    shortDescription:
      "A short silver bar on a fine chain.",
    fullDescription:
      "A 25mm horizontal bar pendant on a 20-inch fine cable chain. The bar has a polished front face and softly rounded edges that feel smooth against the skin. The proportions are deliberately understated — visible but never loud. Works equally well on its own or layered with the Thin Chain Necklace.",
    category: "necklaces",
    material: "Sterling Silver, Zinc, Copper",
    images: [],
    inventory: 18,
    featured: true,
  },
];
