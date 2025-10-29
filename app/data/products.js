export const CATEGORIES = ["necklaces", "rings", "bangles", "earrings", "pendants", "sets"];

export const PRODUCTS = [
  {
    id: "necklace-aurora",
    slug: "necklace-aurora",
    title: "Aurora Pastel Necklace",
    category: "necklaces",
    price: 14999,
    material: "18K Gold Plated, Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&crop=center"
    ],
    description: "Soft rose and mint accents with gold highlights for an elegant neckline.",
  },
  {
    id: "ring-luna",
    slug: "ring-luna",
    title: "Luna Stacking Ring",
    category: "rings",
    price: 7999,
    material: "Sterling Silver",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&crop=center"
    ],
    description: "Minimal silver band with a subtle pastel sheen for everyday wear.",
  },
  {
    id: "bangle-eden",
    slug: "bangle-eden",
    title: "Eden Bangle",
    category: "bangles",
    price: 12999,
    material: "Gold Plated Brass",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&crop=center"
    ],
    description: "Classic bangle reimagined with a gentle gold gradient finish.",
  },
  {
    id: "earring-ivy",
    slug: "earring-ivy",
    title: "Ivy Drop Earrings",
    category: "earrings",
    price: 9999,
    material: "Sterling Silver, Zircon",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&crop=center"
    ],
    description: "Delicate drops that shimmer with silver and pastel highlights.",
  },
];

export function getProducts(category) {
  if (!category) return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}


