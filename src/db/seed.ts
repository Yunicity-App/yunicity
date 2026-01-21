import "dotenv/config";
import { db } from "../lib/db";
import { partners } from "./schema";

const REIMS_PARTNERS = [
    {
        nom: "Belga Queen",
        description: "Cuisine belge raffinée au cœur de Reims.",
        logoUrl: "https://placehold.co/100x100?text=Belga+Queen",
        category: "Restaurant",
        address: "Place d'Erlon, 51100 Reims",
        latitude: 49.2568,
        longitude: 4.0278,
    },
    {
        nom: "Eat Night",
        description: "Restauration rapide nocturne de qualité.",
        logoUrl: "https://placehold.co/100x100?text=Eat+Night",
        category: "Restauration Rapide",
        address: "Rue Colbert, 51100 Reims",
        latitude: 49.2555,
        longitude: 4.0321,
    },
    {
        nom: "As Barber",
        description: "Le barbier de référence pour un style impeccable.",
        logoUrl: "https://placehold.co/100x100?text=As+Barber",
        category: "Bien-être",
        address: "Cours Langlet, 51100 Reims",
        latitude: 49.2542,
        longitude: 4.0295,
    },
    {
        nom: "Tacos Gourmands",
        description: "Les meilleurs tacos de la ville.",
        logoUrl: "https://placehold.co/100x100?text=Tacos+Gourmands",
        category: "Restauration Rapide",
        address: "Avenue de Laon, 51100 Reims",
        latitude: 49.2612,
        longitude: 4.0215,
    },
    {
        nom: "Dai Bōken",
        description: "Une aventure culinaire japonaise authentique.",
        logoUrl: "https://placehold.co/100x100?text=Dai+Boken",
        category: "Restaurant",
        address: "Rue de Vesle, 51100 Reims",
        latitude: 49.2531,
        longitude: 4.0254,
    },
    {
        nom: "Marcel & Jane",
        description: "Concept store et café tendance.",
        logoUrl: "https://placehold.co/100x100?text=Marcel+Jane",
        category: "Shopping",
        address: "Rue de l'Étape, 51100 Reims",
        latitude: 49.2575,
        longitude: 4.0289,
    },
    {
        nom: "Le Gaulois",
        description: "Bar traditionnel et ambiance conviviale.",
        logoUrl: "https://placehold.co/100x100?text=Le+Gaulois",
        category: "Bar",
        address: "Boulevard Foch, 51100 Reims",
        latitude: 49.2589,
        longitude: 4.0263,
    },
    {
        nom: "Les Garçons Barbier",
        description: "Soins pour hommes et rasage à l'ancienne.",
        logoUrl: "https://placehold.co/100x100?text=Les+Garçons+Barbier",
        category: "Bien-être",
        address: "Rue de Tambour, 51100 Reims",
        latitude: 49.2562,
        longitude: 4.0312,
    },
];

async function seed() {
  console.log("🌱 Seeding database...\n");

  try {
    console.log("📍 Inserting partners...");
    for (const partner of REIMS_PARTNERS) {
      await db.insert(partners).values(partner).onConflictDoNothing();
      console.log(`   ✓ ${partner.nom}`);
    }
    console.log("\n✅ Seed completed!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
