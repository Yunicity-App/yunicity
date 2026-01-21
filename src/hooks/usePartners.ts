import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { api } from "@/lib/api";
import type { Partner } from "@/db/schema";

/**
 * Hook to fetch all partners
 * Uses mock API for now - will be replaced with real API later
 */
export function usePartners() {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["partners"],
    enabled: !!isSignedIn,
    queryFn: async (): Promise<Partner[]> => {
      return api.getPartners();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch a single partner by ID
 */
export function usePartner(id: string | undefined) {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["partner", id],
    enabled: !!isSignedIn && !!id,
    queryFn: async (): Promise<Partner | null> => {
      if (!id) return null;
      return api.getPartner(id);
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to fetch partners filtered by category
 */
export function usePartnersByCategory(category: string | undefined) {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["partners", "category", category],
    enabled: !!isSignedIn && !!category,
    queryFn: async (): Promise<Partner[]> => {
      if (!category) return [];
      return api.getPartnersByCategory(category);
    },
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Available partner categories
 */
export const PARTNER_CATEGORIES = [
  { value: "restaurant", label: "Restaurant" },
  { value: "bar", label: "Bar" },
  { value: "beaute", label: "Beauté" },
  { value: "shopping", label: "Shopping" },
  { value: "culture", label: "Culture" },
  { value: "sport", label: "Sport" },
] as const;
