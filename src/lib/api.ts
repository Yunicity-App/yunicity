import type { Partner, Post, User } from "@/db/schema";

// ============================================
// MOCK USERS
// ============================================
const MOCK_USERS: User[] = [
  {
    id: "user-1",
    clerkId: "clerk_mock_1",
    email: "admin@yunicity.fr",
    firstName: "Admin",
    lastName: "Yunicity",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    role: "admin",
    points: 500,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "user-2",
    clerkId: "clerk_mock_2",
    email: "partner@belgaqueen.fr",
    firstName: "Jean",
    lastName: "Dupont",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    role: "partner",
    points: 250,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
];

// ============================================
// MOCK POSTS (La Voix de la Ville)
// ============================================
const MOCK_POSTS: Post[] = [
  {
    id: "post-1",
    authorId: "user-2",
    partnerId: "1",
    title: "Soirée Moules-Frites ce vendredi !",
    description: "Rejoignez-nous pour notre traditionnelle soirée moules-frites. Ambiance garantie avec musique live.",
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800",
    eventDate: new Date("2024-02-15"),
    isPublished: true,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "post-2",
    authorId: "user-1",
    partnerId: null,
    title: "Nouveau partenaire : Dai Bōken",
    description: "Découvrez notre nouveau partenaire japonais ! -20% sur votre première visite avec le Yurpass.",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    eventDate: null,
    isPublished: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "post-3",
    authorId: "user-2",
    partnerId: "7",
    title: "Quiz Musical au Gaulois",
    description: "Testez vos connaissances musicales ! Lots à gagner pour les gagnants. Inscription gratuite.",
    imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
    eventDate: new Date("2024-02-20"),
    isPublished: true,
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05"),
  },
];

// ============================================
// MOCK PARTNERS
// ============================================
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
  // ============================================
  // PARTNERS
  // ============================================
  async getPartners(): Promise<Partner[]> {
    await delay(500);
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

  // ============================================
  // USERS
  // ============================================
  async getUser(clerkId: string): Promise<User | null> {
    await delay(200);
    return MOCK_USERS.find((u) => u.clerkId === clerkId) || null;
  },

  async createUser(userData: Partial<User>): Promise<User> {
    await delay(300);
    const newUser: User = {
      id: `user-${Date.now()}`,
      clerkId: userData.clerkId || "",
      email: userData.email || "",
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      imageUrl: userData.imageUrl || null,
      role: "user",
      points: 100, // Signup bonus
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_USERS.push(newUser);
    return newUser;
  },

  async updateUserPoints(userId: string, points: number): Promise<User | null> {
    await delay(200);
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (user) {
      user.points += points;
      user.updatedAt = new Date();
    }
    return user || null;
  },

  // ============================================
  // POSTS (La Voix de la Ville)
  // ============================================
  async getPosts(): Promise<Post[]> {
    await delay(400);
    return MOCK_POSTS.filter((p) => p.isPublished).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  },

  async getPost(id: string): Promise<Post | null> {
    await delay(200);
    return MOCK_POSTS.find((p) => p.id === id) || null;
  },

  async createPost(postData: Partial<Post>): Promise<Post> {
    await delay(400);
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: postData.authorId || "",
      partnerId: postData.partnerId || null,
      title: postData.title || "",
      description: postData.description || null,
      imageUrl: postData.imageUrl || null,
      eventDate: postData.eventDate || null,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_POSTS.push(newPost);
    return newPost;
  },

  async getPostsByPartner(partnerId: string): Promise<Post[]> {
    await delay(300);
    return MOCK_POSTS.filter((p) => p.partnerId === partnerId && p.isPublished);
  },
};
