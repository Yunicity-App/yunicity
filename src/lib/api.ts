import type { Partner } from "@/db/schema";

// Mock data for development - mirrors the seeded database
const MOCK_PARTNERS: Partner[] = [
  {
    id: "1",
    nom: "Belga Queen",
    description: "Cuisine belge raffinée au cœur de Reims.",
    logoUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    category: "Restaurant",
    address: "Place d'Erlon, 51100 Reims",
    latitude: 49.2568,
    longitude: 4.0278,
    createdAt: new Date(),
  },
  {
    id: "2",
    nom: "Eat Night",
    description: "Restauration rapide nocturne de qualité.",
    logoUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    category: "Restauration Rapide",
    address: "Rue Colbert, 51100 Reims",
    latitude: 49.2555,
    longitude: 4.0321,
    createdAt: new Date(),
  },
  {
    id: "3",
    nom: "As Barber",
    description: "Le barbier de référence pour un style impeccable.",
    logoUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800",
    category: "Bien-être",
    address: "Cours Langlet, 51100 Reims",
    latitude: 49.2542,
    longitude: 4.0295,
    createdAt: new Date(),
  },
  {
    id: "4",
    nom: "Tacos Gourmands",
    description: "Les meilleurs tacos de la ville.",
    logoUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800",
    category: "Restauration Rapide",
    address: "Avenue de Laon, 51100 Reims",
    latitude: 49.2612,
    longitude: 4.0215,
    createdAt: new Date(),
  },
  {
    id: "5",
    nom: "Dai Bōken",
    description: "Une aventure culinaire japonaise authentique.",
    logoUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    category: "Restaurant",
    address: "Rue de Vesle, 51100 Reims",
    latitude: 49.2531,
    longitude: 4.0254,
    createdAt: new Date(),
  },
  {
    id: "6",
    nom: "Marcel & Jane",
    description: "Concept store et café tendance.",
    logoUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
    category: "Shopping",
    address: "Rue de l'Étape, 51100 Reims",
    latitude: 49.2575,
    longitude: 4.0289,
    createdAt: new Date(),
  },
  {
    id: "7",
    nom: "Le Gaulois",
    description: "Bar traditionnel et ambiance conviviale.",
    logoUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    category: "Bar",
    address: "Boulevard Foch, 51100 Reims",
    latitude: 49.2589,
    longitude: 4.0263,
    createdAt: new Date(),
  },
  {
    id: "8",
    nom: "Les Garçons Barbier",
    description: "Soins pour hommes et rasage à l'ancienne.",
    logoUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800",
    category: "Bien-être",
    address: "Rue de Tambour, 51100 Reims",
    latitude: 49.2562,
    longitude: 4.0312,
    createdAt: new Date(),
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async getPartners(): Promise<Partner[]> {
    await delay(500); // Simulate loading
    return MOCK_PARTNERS;
  },

  async getPartner(id: string): Promise<Partner | null> {
    await delay(300);
    return MOCK_PARTNERS.find((p) => p.id === id) || null;
  },

  async getPartnersByCategory(category: string): Promise<Partner[]> {
    await delay(400);
    return MOCK_PARTNERS.filter((p) => p.category === category);
  },
};
