/**
 * Yunicity Type Definitions
 */

// User
export interface User {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

// Partner (Commerce partenaire)
export interface Partner {
  id: string;
  name: string;
  description: string | null;
  address: string;
  latitude: number;
  longitude: number;
  coverImage: string | null;
  category: string;
  createdAt: string;
}

// Pass (Offre/Avantage)
export interface Pass {
  id: string;
  partnerId: string;
  title: string;
  description: string | null;
  conditions: string | null;
  maxUses: number;
  validUntil: string | null;
  createdAt: string;
}

// UserPass (Pass obtenu par un utilisateur)
export interface UserPass {
  id: string;
  userId: string;
  passId: string;
  qrToken: string;
  usedAt: string | null;
  createdAt: string;
  // Relations
  pass?: Pass;
}

// Post (Feed)
export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  partnerId: string | null;
  category: string;
  likesCount: number;
  createdAt: string;
  // Relations
  partner?: Partner;
}
