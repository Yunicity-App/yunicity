/**
 * Yunicity Constants
 */

// Couleurs Yurpass Design System
export const COLORS = {
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  BLUE: "#1E40AF",
} as const;

// Coordonnées de Reims (centre-ville)
export const REIMS_COORDINATES = {
  latitude: 49.2583,
  longitude: 4.0317,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
} as const;

// Configuration API
export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_COUNT: 3,
} as const;

// Catégories de partenaires
export const PARTNER_CATEGORIES = [
  "restaurant",
  "bar",
  "culture",
  "shopping",
  "sport",
  "beaute",
] as const;

export type PartnerCategory = (typeof PARTNER_CATEGORIES)[number];
