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
    id: "dagger-necklace",
    slug: "dagger-necklace",
    name: "Dagger Necklace",
    price: 80,
    shortDescription:
      "A sharp dagger pendant on a fine silver chain.",
    fullDescription:
      "A miniature dagger pendant cast in sterling silver, hung from a 20-inch cable chain. The blade is detailed with a center ridge and tapered point, while the hilt features a subtle crossguard. The pendant sits flat against the chest with enough weight to stay in place. A piece that carries edge without excess.",
    category: "necklaces",
    material: "Sterling Silver, Zinc, Copper",
    images: [],
    inventory: 14,
    featured: true,
  },
  {
    id: "lily-necklace",
    slug: "lily-necklace",
    name: "Lily Necklace",
    price: 80,
    shortDescription:
      "A delicate lily pendant with organic silver detail.",
    fullDescription:
      "A sterling silver lily pendant with softly curved petals that fan out from a central stem. The flower is sculpted with just enough detail to read as botanical without being literal. Hung from a 20-inch fine chain with a lobster clasp. Sits gracefully at the collarbone — feminine with a dark-romantic edge.",
    category: "necklaces",
    material: "Sterling Silver, Zinc, Copper",
    images: [],
    inventory: 12,
    featured: true,
  },
  {
    id: "rolo-chain",
    slug: "rolo-chain",
    name: "Rolo Chain",
    price: 80,
    shortDescription:
      "A classic rolo-link chain with uniform round links.",
    fullDescription:
      "A 20-inch rolo chain in sterling silver with evenly spaced circular links. Each link is soldered closed for durability and polished to a soft sheen. The gauge is heavy enough to wear alone but slim enough to layer under a collar. A foundational piece that works with everything.",
    category: "necklaces",
    material: "Sterling Silver, Zinc, Copper",
    images: [],
    inventory: 20,
    featured: false,
  },
  {
    id: "knight-chain",
    slug: "knight-chain",
    name: "Knight Chain",
    price: 80,
    shortDescription:
      "A heavy-linked chain with a medieval presence.",
    fullDescription:
      "A sterling silver chain with elongated interlocking links that evoke chainmail armor. The links are flat and wide, giving the chain a structured drape that sits close to the neck. Finished at 20 inches with a heavy-duty clasp built to match the chain's weight. Designed to be seen, not hidden.",
    category: "necklaces",
    material: "Sterling Silver, Zinc, Copper",
    images: [],
    inventory: 10,
    featured: true,
  },
  {
    id: "star-chain",
    slug: "star-chain",
    name: "Star Chain",
    price: 80,
    shortDescription:
      "A fine chain with small star-shaped links.",
    fullDescription:
      "A 20-inch sterling silver chain with tiny star-shaped links spaced evenly along its length. The stars are flat-cut and catch light as they move, creating a subtle shimmer against the skin. Lightweight and easy to layer or wear alone. Closes with a small spring-ring clasp.",
    category: "necklaces",
    material: "Sterling Silver, Zinc, Copper",
    images: [],
    inventory: 16,
    featured: false,
  },
  {
    id: "grave-chain",
    slug: "grave-chain",
    name: "Grave Chain",
    price: 80,
    shortDescription:
      "A dark, heavy chain with a somber weight.",
    fullDescription:
      "A sterling silver chain with thick, deliberately oxidized links that give it a weathered, aged character. The dark patina sits in the recesses while the outer faces are lightly polished — creating contrast that deepens with wear. 20 inches with a robust toggle clasp. A chain with presence and gravity.",
    category: "necklaces",
    material: "Sterling Silver, Zinc, Copper",
    images: [],
    inventory: 8,
    featured: true,
  },
  {
    id: "box-chain",
    slug: "box-chain",
    name: "Box Chain",
    price: 80,
    shortDescription:
      "A square-linked box chain with a crisp profile.",
    fullDescription:
      "A 20-inch box chain in sterling silver with square-cut links that create a smooth, geometric line. The flat faces reflect light sharply, giving the chain a clean, modern edge. Stronger than round-link chains of the same gauge — built to hold a pendant or wear solo. Finished with a lobster clasp.",
    category: "necklaces",
    material: "Sterling Silver, Zinc, Copper",
    images: [],
    inventory: 22,
    featured: false,
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
    id: "heart-necklace",
    slug: "heart-necklace",
    name: "Heart Necklace",
    price: 80,
    shortDescription:
      "A sculpted heart pendant with a dark silver finish.",
    fullDescription:
      "A sterling silver heart pendant with an anatomical edge — not a Valentine's heart but something with more weight and detail. The surface has subtle texture and oxidized recesses that give it depth and shadow. Hung from a 20-inch cable chain with a secure clasp. A romantic piece filtered through a darker lens.",
    category: "necklaces",
    material: "Sterling Silver, Zinc, Copper",
    images: [],
    inventory: 11,
    featured: true,
  },
];
