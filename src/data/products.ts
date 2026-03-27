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
    images: ["/products/necklaces/dagger-necklace-1.jpeg", "/products/necklaces/dagger-necklace-2.jpeg", "/products/necklaces/dagger-necklace-3.jpeg", "/products/necklaces/dagger-necklace-4.jpeg"],
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
    images: ["/products/necklaces/lily-chain-1.jpeg", "/products/necklaces/lily-chain-2.jpeg"],
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
    images: ["/products/necklaces/rolo-chain-1.jpeg", "/products/necklaces/rolo-chain-2.jpeg"],
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
    images: ["/products/necklaces/knight-chain-1.jpeg", "/products/necklaces/knight-chain-2.jpeg"],
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
    images: ["/products/necklaces/star-chain-1.jpeg", "/products/necklaces/star-chain-2.jpeg"],
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
    images: ["/products/necklaces/grave-chain-1.jpeg", "/products/necklaces/grave-chain-2.jpeg"],
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
    images: ["/products/necklaces/box-chain-1.jpeg", "/products/necklaces/box-chain-2.jpeg"],
    inventory: 22,
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
    images: ["/products/necklaces/heart-necklace-1.jpeg", "/products/necklaces/heart-necklace-2.jpeg"],
    inventory: 11,
    featured: true,
  },
  {
    id: "tongue-pendant",
    slug: "tongue-pendant",
    name: "Tongue Pendant",
    price: 60,
    shortDescription:
      "A sculpted tongue pendant with a rebellious edge.",
    fullDescription:
      "A sterling silver pendant shaped into a curled, outstretched tongue — provocative without being cartoonish. The surface carries subtle texture that mimics the organic detail of the form. Hung from a 20-inch cable chain with a secure clasp. A piece that speaks before you do.",
    category: "pendants",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/pendants/tongue-pendant-1.jpeg", "/products/pendants/tongue-pendant-2.jpeg"],
    inventory: 10,
    featured: true,
  },
  {
    id: "lily-pendant",
    slug: "lily-pendant",
    name: "Lily Pendant",
    price: 60,
    shortDescription:
      "A delicate lily bloom cast in sterling silver.",
    fullDescription:
      "A sterling silver pendant sculpted into a single lily flower with softly curving petals that fan out from a central point. The detail is botanical but restrained — enough to read as a flower without being decorative. Hung from a 20-inch fine chain. Sits at the collarbone with quiet, dark-romantic presence.",
    category: "pendants",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/pendants/lily-pendant-1.jpeg", "/products/pendants/lily-pendant-2.jpeg"],
    inventory: 12,
    featured: true,
  },
  {
    id: "dice-pendant",
    slug: "dice-pendant",
    name: "Dice Pendant",
    price: 60,
    shortDescription:
      "A miniature silver die with recessed pips.",
    fullDescription:
      "A sterling silver pendant in the shape of a single die with recessed pips on each face. The cube is cast with sharp edges and a satisfying weight that hangs with intention. Each pip is darkened with oxidation for contrast against the polished faces. Hung from a 20-inch chain — luck as an accessory.",
    category: "pendants",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/pendants/dice-pendant-1.jpeg", "/products/pendants/dice-pendant-2.jpeg"],
    inventory: 14,
    featured: false,
  },
  {
    id: "bullet-pendant",
    slug: "bullet-pendant",
    name: "Bullet Pendant",
    price: 60,
    shortDescription:
      "A bullet-shaped pendant with a cold, clean finish.",
    fullDescription:
      "A sterling silver pendant modeled after a rifle cartridge — tapered at the tip with a flat base and a smooth cylindrical body. The proportions are exact enough to read immediately but scaled down to pendant size. Polished to a cold sheen and hung from a 20-inch cable chain. Carries weight in every sense.",
    category: "pendants",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/pendants/bullet-pendant-1.jpeg", "/products/pendants/bullet-pendant-2.jpeg", "/products/pendants/bullet-pendant-3.jpeg"],
    inventory: 10,
    featured: true,
  },
  {
    id: "dogtag-pendant",
    slug: "dogtag-pendant",
    name: "Dogtag Pendant",
    price: 60,
    shortDescription:
      "A classic dogtag silhouette in solid silver.",
    fullDescription:
      "A sterling silver dogtag pendant with a flat, smooth face and notched corner — faithful to the military original. The surface is left blank and polished, carrying presence through shape alone. Hung from a 20-inch ball chain that matches the utilitarian aesthetic. A staple piece with built-in gravity.",
    category: "pendants",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/pendants/dogtag-pendant-1.jpeg", "/products/pendants/dogtag-pendant-2.jpeg", "/products/pendants/dogtag-pendant-3.jpeg"],
    inventory: 16,
    featured: false,
  },
  {
    id: "heart-pendant",
    slug: "heart-pendant",
    name: "Heart Pendant",
    price: 60,
    shortDescription:
      "A dark-finished heart pendant with raw detail.",
    fullDescription:
      "A sterling silver heart pendant with an anatomical lean — textured surface, oxidized recesses, and enough dimension to cast shadow. Not sentimental, not simple. Hung from a 20-inch cable chain with a lobster clasp. A romantic symbol recast through a darker lens.",
    category: "pendants",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/pendants/heart-pendant-1.jpeg", "/products/pendants/heart-pendant-2.jpeg"],
    inventory: 11,
    featured: true,
  },
  {
    id: "dagger-pendant",
    slug: "dagger-pendant",
    name: "Dagger Pendant",
    price: 60,
    shortDescription:
      "A sharp miniature dagger pendant in silver.",
    fullDescription:
      "A sterling silver dagger pendant with a center-ridged blade and detailed crossguard. The proportions are slim and tapered — aggressive in form but refined in scale. Hung from a 20-inch cable chain, it sits flat against the chest with controlled weight. Edge without excess.",
    category: "pendants",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/pendants/dagger-pendant-1.jpeg", "/products/pendants/dagger-pendant-2.jpeg", "/products/pendants/dagger-pendant-3.jpeg"],
    inventory: 13,
    featured: true,
  },
  {
    id: "skullman-pendant",
    slug: "skullman-pendant",
    name: "Skullman Pendant",
    price: 60,
    shortDescription:
      "A detailed skull pendant with hollow eyes.",
    fullDescription:
      "A sterling silver skull pendant with deep-set hollow eye sockets and defined bone structure. The jaw is slightly open, and the cranium carries fine surface detail that rewards a closer look. Oxidized in the recesses for depth and hung from a 20-inch chain. Dark, deliberate, and unapologetically bold.",
    category: "pendants",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/pendants/skullman-pendant-1.jpeg", "/products/pendants/skullman-pendant-2.jpeg", "/products/pendants/skullman-pendant-3.jpeg"],
    inventory: 8,
    featured: true,
  },
  {
    id: "hexora-pendant",
    slug: "hexora-pendant",
    name: "Hexora Pendant",
    price: 60,
    shortDescription:
      "A hexagonal pendant with occult geometry.",
    fullDescription:
      "A sterling silver pendant built around a hexagonal frame with intersecting lines that form a geometric sigil. The pattern is precise and deliberate — esoteric without being literal. Flat-cast with a polished face and darkened edges that give the design dimension. Hung from a 20-inch chain. Quiet power in a clean shape.",
    category: "pendants",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/pendants/hexora-pendant-1.jpeg", "/products/pendants/hexora-pendant-2.jpeg", "/products/pendants/hexora-pendant-3.jpeg"],
    inventory: 10,
    featured: false,
  },
  {
    id: "cross-pendant",
    slug: "cross-pendant",
    name: "Cross Pendant",
    price: 60,
    shortDescription:
      "A solid silver cross with a heavy, gothic presence.",
    fullDescription:
      "A sterling silver cross pendant with squared-off arms and a deliberate weight that hangs with authority. The surface is lightly textured with oxidized detailing in the recesses — gothic in character but clean in execution. Hung from a 20-inch cable chain with a lobster clasp. A symbol worn with intention.",
    category: "pendants",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/pendants/cross-pendant-1.jpeg", "/products/pendants/cross-pendant-2.jpeg", "/products/pendants/cross-pendant-3.jpeg"],
    inventory: 15,
    featured: true,
  },
  {
    id: "snow-bracelet",
    slug: "snow-bracelet",
    name: "Snow Bracelet",
    price: 80,
    shortDescription:
      "A bright link bracelet with a clean, icy finish.",
    fullDescription:
      "Sterling silver links arranged in a compact pattern that catches and scatters light from every angle. The polished surface reflects with an almost white intensity — cold, clean, and deliberately bright. Each link is solid and smooth, with no excess detail to distract from the material itself. Adjustable fit across standard wrist sizes.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/snow-bracelet-1.jpeg", "/products/bracelets/snow-bracelet-2.jpeg", "/products/bracelets/snow-bracelet-3.jpeg"],
    inventory: 12,
    featured: true,
  },
  {
    id: "obsidian-bracelet",
    slug: "obsidian-bracelet",
    name: "Obsidian Bracelet",
    price: 80,
    shortDescription:
      "A darkened bracelet with a volcanic, heavy presence.",
    fullDescription:
      "A heavily oxidized sterling silver bracelet with a deep black finish inspired by volcanic obsidian. The links are thick and deliberately dense, giving the piece a weight that anchors the wrist. The dark surface absorbs rather than reflects — presence without flash. A piece built for those who wear their darkness with intention.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/obsidian-bracelet-1.jpeg", "/products/bracelets/obsidian-bracelet-2.jpeg"],
    inventory: 10,
    featured: false,
  },
  {
    id: "cuban-bracelet",
    slug: "cuban-bracelet",
    name: "Cuban Bracelet",
    price: 80,
    shortDescription:
      "A thick Cuban link bracelet in solid silver.",
    fullDescription:
      "A sterling silver bracelet built from interlocking Cuban links — wide, flat, and tightly connected. The silhouette is classic and familiar but executed in pure silver for a colder, more refined look. Each link is polished to a high sheen with beveled edges that catch light cleanly. Heavy gauge. Built to be noticed.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/cuban-bracelet-1.jpeg", "/products/bracelets/cuban-bracelet-2.jpeg", "/products/bracelets/cuban-bracelet-3.jpeg"],
    inventory: 15,
    featured: true,
  },
  {
    id: "ironveil-bracelet",
    slug: "ironveil-bracelet",
    name: "Ironveil Bracelet",
    price: 80,
    shortDescription:
      "A layered bracelet with an industrial, veiled texture.",
    fullDescription:
      "A sterling silver bracelet with an open-weave structure that creates a layered, mesh-like appearance. The oxidized finish gives the metal a dark, iron-like quality — worn and intentional. The links are irregular enough to look handcrafted but polished enough to stay refined. Sits flat on the wrist with a controlled drape.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/ironveil-bracelet-1.jpeg", "/products/bracelets/ironveil-bracelet-2.jpeg"],
    inventory: 9,
    featured: false,
  },
  {
    id: "knight-bracelet",
    slug: "knight-bracelet",
    name: "Knight Bracelet",
    price: 80,
    shortDescription:
      "A chain bracelet with medieval chainmail character.",
    fullDescription:
      "Sterling silver links shaped and interlocked to evoke the flat-linked chainmail of medieval armor. The links are wide and structured, giving the bracelet a rigid drape that sits close to the wrist. Finished with a matching toggle clasp that completes the piece without interrupting it. Heavy without being cumbersome.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/knight-bracelet-1.jpeg", "/products/bracelets/knight-bracelet-2.jpeg"],
    inventory: 11,
    featured: true,
  },
  {
    id: "star-bracelet",
    slug: "star-bracelet",
    name: "Star Bracelet",
    price: 80,
    shortDescription:
      "A bracelet with small star-cut links along its length.",
    fullDescription:
      "A sterling silver bracelet built from star-shaped links that catch and scatter light as they move. Each star is flat-cut with defined points and a smooth face — the same design as the Star Chain necklace, scaled for the wrist. Lightweight and easy to stack or wear solo. Closes with a spring-ring clasp.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/star-bracelet-1.jpeg", "/products/bracelets/star-bracelet-2.jpeg"],
    inventory: 14,
    featured: false,
  },
  {
    id: "cross-bracelet",
    slug: "cross-bracelet",
    name: "Cross Bracelet",
    price: 80,
    shortDescription:
      "A silver bracelet with recurring cross detail.",
    fullDescription:
      "A sterling silver bracelet featuring cross motifs embedded across interlocking links. The crosses are flat-cast and flush with the link surface, creating depth through shadow rather than height. The bracelet has a solid weight and a gothic character without being theatrical. Closed with a secure barrel clasp.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/cross-bracelet-1.jpeg", "/products/bracelets/cross-bracelet-2.jpeg"],
    inventory: 13,
    featured: true,
  },
  {
    id: "fishtail-cuff",
    slug: "fishtail-cuff",
    name: "Fishtail Cuff",
    price: 80,
    shortDescription:
      "An open cuff with a sculpted fishtail silhouette.",
    fullDescription:
      "A sterling silver open cuff with a band that fans out at the center into a split fishtail form. The forked shape tapers back into a narrow band on each side — structured and sculptural without excess. The outside is polished to a soft sheen while the inner surface is brushed for comfort against the wrist. Adjustable fit.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/fishtail-cuff-1.jpeg", "/products/bracelets/fishtail-cuff-2.jpeg"],
    inventory: 10,
    featured: false,
  },
  {
    id: "dragon-cuff",
    slug: "dragon-cuff",
    name: "Dragon Cuff",
    price: 80,
    shortDescription:
      "A scaled cuff with a dragon-inspired relief texture.",
    fullDescription:
      "A sterling silver open cuff with a scale-pattern relief across its face — each scale uniform and defined, stacked edge to edge like armored hide. The texture is cast directly into the metal and oxidized in the recesses to give each scale depth and definition. Wide gauge with a firm shape that holds its form on the wrist. Dark and deliberate.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/dragon-cuff-1.jpeg", "/products/bracelets/dragon-cuff-2.jpeg"],
    inventory: 8,
    featured: true,
  },
  {
    id: "nail-cuff",
    slug: "nail-cuff",
    name: "Nail Cuff",
    price: 80,
    shortDescription:
      "An open cuff with a bold nail-head detail.",
    fullDescription:
      "A sterling silver open cuff with a prominent nail-head motif at its center — flat, circular, and anchored into the band like a rivet driven into metal. The rest of the cuff is smooth and unadorned, letting the detail carry the piece. Polished finish with sharp edges. Industrial in origin, refined in execution.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/nail-cuff-1.jpeg", "/products/bracelets/nail-cuff-2.jpeg", "/products/bracelets/nail-cuff-3.jpeg"],
    inventory: 16,
    featured: false,
  },
  {
    id: "hollow-cuff",
    slug: "hollow-cuff",
    name: "Hollow Cuff",
    price: 80,
    shortDescription:
      "A wide cuff with a hollow, open-faced structure.",
    fullDescription:
      "A sterling silver open cuff with a hollow architectural cross-section — the outer face is smooth and wide while the internal cavity keeps the weight controlled. The result is a cuff that looks substantial without feeling heavy on the wrist. Clean edges and a polished finish give it a modern, structural quality. Adjustable fit across most wrist sizes.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/hollow-cuff-1.jpeg", "/products/bracelets/hollow-cuff-2.jpeg"],
    inventory: 7,
    featured: false,
  },
  {
    id: "spear-cuff",
    slug: "spear-cuff",
    name: "Spear Cuff",
    price: 80,
    shortDescription:
      "A bold open cuff tapering to spear-point ends.",
    fullDescription:
      "A sterling silver open cuff with ends that taper to sharp spear-point tips, framing the wrist with controlled aggression. The band is smooth along its length with the detail entirely concentrated at the terminals. Polished to a cold sheen. The tapered ends make sizing simple — press to fit or open slightly to remove.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/spear-cuff-1.jpeg", "/products/bracelets/spear-cuff-2.jpeg"],
    inventory: 11,
    featured: true,
  },
  {
    id: "krice-bracelet",
    slug: "krice-bracelet",
    name: "Krice Bracelet",
    price: 80,
    shortDescription:
      "A wavy-link bracelet with a blade-like rhythm.",
    fullDescription:
      "A sterling silver bracelet with an undulating link pattern inspired by the wavy blade of a kris dagger. The links follow a serpentine path that gives the bracelet a restless, kinetic quality when worn. The surface is polished smooth with oxidized detail in the wave troughs. Closes with a tight fold-over clasp.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/krice-bracelet-1.jpeg", "/products/bracelets/krice-bracelet-2.jpeg"],
    inventory: 9,
    featured: false,
  },
  {
    id: "armour-bracelet",
    slug: "armour-bracelet",
    name: "Armour Bracelet",
    price: 80,
    shortDescription:
      "A plate-style bracelet inspired by armor segments.",
    fullDescription:
      "A sterling silver bracelet built from flat, overlapping plate segments that move with the wrist like articulated armor. Each segment is polished on the outer face with brushed edges that reference the craft of metalwork. The clasp is integrated into the last segment for a seamless profile. Substantial in weight and presence — worn like protection.",
    category: "bracelets",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/bracelets/armour-bracelet-1.jpeg", "/products/bracelets/armour-bracelet-2.jpeg", "/products/bracelets/armour-bracelet-3.jpeg"],
    inventory: 12,
    featured: true,
  },
  {
    id: "avern-earrings",
    slug: "avern-earrings",
    name: "Avern Earrings",
    price: 60,
    shortDescription:
      "Minimalist drop earrings with clean geometry.",
    fullDescription:
      "A pair of sterling silver drop earrings with a simple geometric form. The sleek silhouette catches light while maintaining an understated presence. Lightweight and comfortable for all-day wear with secure posts and backs.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/avern-earrings-1.jpeg", "/products/earrings/avern-earrings-2.jpeg"],
    inventory: 18,
    featured: false,
  },
  {
    id: "bullet-earrings",
    slug: "bullet-earrings",
    name: "Bullet Earrings",
    price: 60,
    shortDescription:
      "Miniature silver bullets as statement earrings.",
    fullDescription:
      "A pair of sterling silver earrings modeled after rifle cartridges — tapered at the tip with flat bases and smooth cylindrical bodies. The proportions are exact enough to read immediately but scaled down to earring size. Hung from secure posts that sit comfortably on the ear.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/bullet-earrings-1.jpeg", "/products/earrings/bullet-earrings-2.jpeg", "/products/earrings/bullet-earrings-3.jpeg"],
    inventory: 12,
    featured: true,
  },
  {
    id: "cinder-earrings",
    slug: "cinder-earrings",
    name: "Cinder Earrings",
    price: 60,
    shortDescription:
      "Dark drop earrings with a textured surface.",
    fullDescription:
      "A pair of oxidized sterling silver drop earrings with a deliberately weathered, ash-like finish. The textured surface catches minimal light, creating a dark, understated presence. Elegant simplicity with an edge.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/cinder-earrings-1.jpeg", "/products/earrings/cinder-earrings-2.jpeg"],
    inventory: 14,
    featured: false,
  },
  {
    id: "cross-earrings",
    slug: "cross-earrings",
    name: "Cross Earrings",
    price: 60,
    shortDescription:
      "Gothic cross earrings with squared-off detail.",
    fullDescription:
      "A pair of sterling silver earrings featuring small raised crosses on each piece. The crosses have squared-off arms and oxidized detailing that adds depth and shadow. A subtle gothic statement for the ear.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/cross-earrings-1.jpeg", "/products/earrings/cross-earrings-2.jpeg"],
    inventory: 10,
    featured: true,
  },
  {
    id: "crowne-earrings",
    slug: "crowne-earrings",
    name: "Crowne Earrings",
    price: 60,
    shortDescription:
      "Crown-inspired earrings with regal geometry.",
    fullDescription:
      "A pair of sterling silver earrings shaped like miniature crowns with pointed peaks. The form is geometric and precise, with a polished finish that catches light. A piece that carries presence without excess.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/crowne-earrings-1.jpeg", "/products/earrings/crowne-earrings-2.jpeg"],
    inventory: 15,
    featured: false,
  },
  {
    id: "crucifer-earrings",
    slug: "crucifer-earrings",
    name: "Crucifer Earrings",
    price: 60,
    shortDescription:
      "Raised cross earrings with a dark gothic edge.",
    fullDescription:
      "A pair of sterling silver earrings featuring prominent raised crosses. The crosses have squared-off ends and deliberate weight — gothic without being theatrical. Oxidized detailing in the recesses adds dimension.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/crucifer-earrings-1.jpeg", "/products/earrings/crucifer-earrings-2.jpeg"],
    inventory: 12,
    featured: true,
  },
  {
    id: "fishtail-earrings",
    slug: "fishtail-earrings",
    name: "Fishtail Earrings",
    price: 60,
    shortDescription:
      "Sculpted earrings with a split fishtail form.",
    fullDescription:
      "A pair of sterling silver earrings featuring a tapered split band that fans out into a subtle fishtail shape. The forked ends create a sense of movement while keeping the profile slim. Polished with clean edges that catch light.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/fishtail-earrings-1.jpeg", "/products/earrings/fishtail-earrings-2.jpeg"],
    inventory: 14,
    featured: false,
  },
  {
    id: "gloam-earrings",
    slug: "gloam-earrings",
    name: "Gloam Earrings",
    price: 60,
    shortDescription:
      "Twilight-inspired earrings with soft oxidation.",
    fullDescription:
      "A pair of sterling silver earrings with an oxidized finish that mimics the dim light of twilight. The surface has a matte quality that barely reflects — present but not bright. A subtle, contemplative piece.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/gloam-earrings-1.jpeg", "/products/earrings/gloam-earrings-2.jpeg"],
    inventory: 11,
    featured: true,
  },
  {
    id: "heart-earrings",
    slug: "heart-earrings",
    name: "Heart Earrings",
    price: 60,
    shortDescription:
      "Dark-finished heart earrings with anatomical detail.",
    fullDescription:
      "A pair of sterling silver heart earrings with an anatomical lean — textured surface and oxidized recesses that give them depth. Not sentimental, not simple. A romantic symbol recast through a darker lens.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/heart-earrings-1.jpeg", "/products/earrings/heart-earrings-2.jpeg"],
    inventory: 13,
    featured: false,
  },
  {
    id: "lily-earrings",
    slug: "lily-earrings",
    name: "Lily Earrings",
    price: 60,
    shortDescription:
      "Delicate lily flower earrings in sterling silver.",
    fullDescription:
      "A pair of sterling silver earrings sculpted into lily flowers with softly curving petals that fan out from a central point. The detail is botanical but restrained — enough to read as a flower without being decorative. Quiet, dark-romantic presence.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/lily-earrings-1.jpeg", "/products/earrings/lily-earrings-2.jpeg"],
    inventory: 16,
    featured: true,
  },
  {
    id: "skull-earrings",
    slug: "skull-earrings",
    name: "Skull Earrings",
    price: 60,
    shortDescription:
      "Miniature skull earrings with clean details.",
    fullDescription:
      "A pair of sterling silver earrings shaped into miniature skulls with defined bone structure and hollow eye sockets. The form is deliberately bold — dark and unapologetic without being cartoonish. A classic statement piece.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/skull-earrings-1.jpeg", "/products/earrings/skull-earrings-2.jpeg"],
    inventory: 10,
    featured: false,
  },
  {
    id: "skullman-earrings",
    slug: "skullman-earrings",
    name: "Skullman Earrings",
    price: 60,
    shortDescription:
      "Detailed skull earrings with hollow eyes.",
    fullDescription:
      "A pair of sterling silver skull earrings with deep-set hollow eye sockets and defined bone structure. The jaw is slightly open, and the cranium carries fine surface detail that rewards a closer look. Oxidized in the recesses for depth. Dark, deliberate, and unapologetically bold.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/skullman-earrings-1.jpeg", "/products/earrings/skullman-earrings-2.jpeg"],
    inventory: 8,
    featured: true,
  },
  {
    id: "star-earrings",
    slug: "star-earrings",
    name: "Star Earrings",
    price: 60,
    shortDescription:
      "Star-shaped earrings with flat-cut detail.",
    fullDescription:
      "A pair of sterling silver earrings shaped into stars with flat-cut faces that catch and scatter light. Each star is polished to a high sheen with defined points. Lightweight and easy to wear — a subtle cosmic touch.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/star-earrings-1.jpeg", "/products/earrings/star-earrings-2.jpeg"],
    inventory: 17,
    featured: false,
  },
  {
    id: "thorn-earrings",
    slug: "thorn-earrings",
    name: "Thorn Earrings",
    price: 60,
    shortDescription:
      "Sharp thorn-shaped earrings with pointed tips.",
    fullDescription:
      "A pair of sterling silver earrings shaped like thorns with sharp, tapered points. The form is sleek and aggressive but remains refined in scale. Polished to a cold sheen with clean edges — nature's edge in wearable form.",
    category: "earrings",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/earrings/thorn-earrings-1.jpeg", "/products/earrings/thorn-earrings-2.jpeg"],
    inventory: 12,
    featured: false,
  },
  {
    id: "ash-glasses",
    slug: "ash-glasses",
    name: "Ash Glasses",
    price: 150,
    shortDescription:
      "Minimalist sunglasses with ash-grey frames.",
    fullDescription:
      "A pair of sterling silver-tinted sunglasses with a clean, geometric frame design. The ash-grey tone gives the lenses a cool, neutral quality that works with any outfit. UV-protective lenses set into sleek metal frames designed to sit comfortably and look intentional.",
    category: "glasses",
    material: "Sterling Silver, Zinc, Copper, Glass",
    images: ["/products/glasses/ash-glasses-1.jpeg", "/products/glasses/ash-glasses-2.jpeg", "/products/glasses/ash-glasses-3.jpeg", "/products/glasses/ash-glasses-4.jpeg"],
    inventory: 8,
    featured: true,
  },
  {
    id: "slate-glasses",
    slug: "slate-glasses",
    name: "Slate Glasses",
    price: 150,
    shortDescription:
      "Sunglasses with slate-dark tinted lenses.",
    fullDescription:
      "A pair of sunglasses with deep slate-grey lenses and metal frames. The dark lens color provides excellent UV protection while maintaining a minimalist aesthetic. The frame design is architectural and precise — modern without being minimal.",
    category: "glasses",
    material: "Sterling Silver, Zinc, Copper, Glass",
    images: ["/products/glasses/slate-glasses-1.jpeg", "/products/glasses/slate-glasses-2.jpeg", "/products/glasses/slate-glasses-3.jpeg", "/products/glasses/slate-glasses-4.jpeg"],
    inventory: 10,
    featured: false,
  },
  {
    id: "stone-glasses",
    slug: "stone-glasses",
    name: "Stone Glasses",
    price: 150,
    shortDescription:
      "Sunglasses with stone-grey lens tint.",
    fullDescription:
      "A pair of sunglasses featuring stone-grey tinted lenses with a neutral, earthy tone. The lenses provide full UV protection while maintaining excellent visibility. The frame is constructed from lightweight metal with a comfortable fit designed for extended wear.",
    category: "glasses",
    material: "Sterling Silver, Zinc, Copper, Glass",
    images: ["/products/glasses/stone-glasses-1.jpeg", "/products/glasses/stone-glasses-2.jpeg", "/products/glasses/stone-glasses-3.jpeg"],
    inventory: 12,
    featured: true,
  },
  {
    id: "chrome-hairclip",
    slug: "chrome-hairclip",
    name: "Chrome Hairclip",
    price: 40,
    shortDescription:
      "Metallic hairclip with a polished chrome finish.",
    fullDescription:
      "A sleek hairclip with a polished chrome finish that reflects light cleanly. The design is minimalist and geometric, holding hair securely while maintaining an aesthetic edge. A small accessory that carries intention.",
    category: "accessories",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/accessories/chrome-hairclip-1.jpeg", "/products/accessories/chrome-hairclip-2.jpeg"],
    inventory: 16,
    featured: false,
  },
  {
    id: "crowne-hairtie",
    slug: "crowne-hairtie",
    name: "Crowne Hairtie",
    price: 35,
    shortDescription:
      "Hair tie with crown-inspired metallic detail.",
    fullDescription:
      "A hair tie featuring a crown-shaped metallic accent in sterling silver. The geometric crown design adds a touch of regal detail to an otherwise simple accessory. Functional and decorative — a small statement piece.",
    category: "accessories",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/accessories/crowne-hairtie-1.jpeg", "/products/accessories/crowne-hairtie-2.jpeg"],
    inventory: 20,
    featured: true,
  },
  {
    id: "riven-keychain",
    slug: "riven-keychain",
    name: "Riven Keychain",
    price: 40,
    shortDescription:
      "A split-form keychain in sterling silver.",
    fullDescription:
      "A small sterling silver keychain with a split, tapered form inspired by broken stone. The design is sculptural and minimal — functional enough to hold keys while carrying aesthetic weight. A piece that works as well as it looks.",
    category: "accessories",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/accessories/riven-keychain-1.jpeg", "/products/accessories/riven-keychain-2.jpeg"],
    inventory: 14,
    featured: false,
  },
  {
    id: "skullman-keychain",
    slug: "skullman-keychain",
    name: "Skullman Keychain",
    price: 45,
    shortDescription:
      "A detailed skull keychain with hollow eyes.",
    fullDescription:
      "A sterling silver keychain shaped into a detailed skull with deep-set hollow eye sockets and defined bone structure. The jaw is slightly open, and the cranium carries fine surface detail. Oxidized in the recesses for depth. Dark and deliberate — a keychain that makes a statement.",
    category: "accessories",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/accessories/skullman-keychain-1.jpeg", "/products/accessories/skullman-keychain-2.jpeg", "/products/accessories/skullman-keychain-3.jpeg"],
    inventory: 11,
    featured: true,
  },
  {
    id: "star-hairtie",
    slug: "star-hairtie",
    name: "Star Hairtie",
    price: 35,
    shortDescription:
      "Hair tie with star-shaped metallic accent.",
    fullDescription:
      "A hair tie featuring a star-shaped metallic accent in polished sterling silver. The star design catches light as it moves through hair, adding subtle sparkle to an everyday accessory. Functional and decorative without being overdone.",
    category: "accessories",
    material: "Sterling Silver, Zinc, Copper",
    images: ["/products/accessories/star-hairtie-1.jpeg", "/products/accessories/star-hairtie-2.jpeg"],
    inventory: 18,
    featured: false,
  },
];
