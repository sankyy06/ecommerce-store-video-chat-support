import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { products } from "../src/db/schema.js";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const CATALOG = [
  {
    slug: "ceramic-coffee-mug",
    name: "Ceramic Coffee Mug",
    category: "Home",
    description:
      "A stylish ceramic coffee mug designed for everyday tea and coffee. Durable, comfortable to hold, and easy to clean.",
    priceCents: 39900,
    imageUrl:
    "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=800&q=80",
  },
  {
    slug: "ceramic-coffee-mug-pack-of-2",
    name: "Ceramic Coffee Mug Pack of 2",
    category: "Home",
    description:
      "A pack of two stylish ceramic coffee mugs designed for everyday tea and coffee. Durable, comfortable to hold, and easy to clean.",
    priceCents: 69900,
    imageUrl:
    "https://images.unsplash.com/photo-1525972757199-cf2ad7cc4f4b?auto=format&fit=crop&fm=jpg&q=80&w=800",
  },
  {
    slug: "laptop-backpack",
    name: "Laptop Backpack",
    category: "Travel",
    description:
      "A practical laptop backpack with spacious compartments for your laptop, accessories, books, and everyday essentials.",
    priceCents: 149900,
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  },
  {
    slug: "laptop-backpack-pack-of-2",
    name: "Laptop Backpack Pack of 2",
    category: "Travel",
    description:
      "A practical laptop backpack with spacious compartments for your laptop, accessories, books, and everyday essentials.",
    priceCents: 239900,
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  },
  {
    slug: "mechanical-gaming-keyboard",
    name: "Mechanical Gaming Keyboard",
    category: "Gaming",
    description:
      "A responsive mechanical gaming keyboard designed for comfortable gaming and everyday typing, with a durable build and satisfying key response.",
    priceCents: 299900,
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
  },
  {
    slug: "mens-casual-cotton-t-shirt",
    name: "Men's Casual Cotton T-Shirt",
    category: "Men's Wear",
    description:
      "A comfortable casual cotton T-shirt made for everyday wear, with a simple design suitable for casual outings and daily use.",
    priceCents: 79900,
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
  },
  {
    slug: "portable-bluetooth-speaker",
    name: "Portable Bluetooth Speaker",
    category: "Audio",
    description:
      "A compact portable Bluetooth speaker delivering clear sound for music, travel, parties, and everyday entertainment.",
    priceCents: 179900,
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
  },
  {
    slug: "smart-fitness-band",
    name: "Smart Fitness Band",
    category: "Wearables",
    description:
      "A smart fitness band for tracking daily activity, workouts, steps, and other useful fitness information.",
    priceCents: 199900,
    imageUrl:
      "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=800&q=80",
  },
  {
    slug: "smart-led-desk-lamp",
    name: "Smart LED Desk Lamp",
    category: "Home",
    description:
      "A modern smart LED desk lamp providing adjustable lighting for studying, working, reading, and everyday desk use.",
    priceCents: 129900,
    imageUrl:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
  },
  {
    slug: "stainless-steel-water-bottle",
    name: "Stainless Steel Water Bottle",
    category: "Travel",
    description:
      "A durable stainless steel water bottle designed for everyday hydration at home, work, college, and while travelling.",
    priceCents: 69900,
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
  },
  {
    slug: "usb-c-fast-charging-cable",
    name: "USB-C Fast Charging Cable",
    category: "Accessories",
    description:
      "A reliable USB-C fast charging cable designed for charging compatible smartphones, tablets, laptops, and other devices.",
    priceCents: 49900,
    imageUrl:
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=800&q=80",
  },
  {
    slug: "wireless-bluetooth-headphones",
    name: "Wireless Bluetooth Headphones",
    category: "Audio",
    description:
      "Enjoy clear sound and comfortable listening with these wireless Bluetooth headphones. Featuring a lightweight design, reliable wireless connectivity, and long-lasting battery life, they are perfect for music, calls, travel, and everyday use.",
    priceCents: 249900,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
];

async function main() {
  await db.delete(products);
  const rows = CATALOG.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    priceCents: p.priceCents,
    currency: "inr",
    imageUrl: p.imageUrl,
    active: true,
  }));

  for (const row of rows) {
    await db
      .insert(products)
      .values(row)
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          name: row.name,
          category: row.category,
          description: row.description,
          priceCents: row.priceCents,
          currency: row.currency,
          imageUrl: row.imageUrl,
          active: row.active,
        },
      });
  }
  console.log(`Seed complete (${CATALOG.length} products upserted).`);
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
