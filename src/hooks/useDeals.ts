import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { db } from "@/lib/db";
import { deals, partners } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Deal, Partner } from "@/db/schema";

export type DealWithPartner = Deal & {
  partner: Partner;
};

/**
 * Hook to fetch all deals with their partner info
 */
export function useDeals() {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["deals"],
    enabled: !!isSignedIn,
    queryFn: async (): Promise<DealWithPartner[]> => {
      const result = await db
        .select({
          deal: deals,
          partner: partners,
        })
        .from(deals)
        .innerJoin(partners, eq(deals.partnerId, partners.id))
        .orderBy(desc(deals.createdAt));

      return result.map((row) => ({
        ...row.deal,
        partner: row.partner,
      }));
    },
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook to fetch deals for a specific partner
 */
export function useDealsByPartner(partnerId: string | undefined) {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["deals", "partner", partnerId],
    enabled: !!isSignedIn && !!partnerId,
    queryFn: async (): Promise<Deal[]> => {
      if (!partnerId) return [];
      const result = await db
        .select()
        .from(deals)
        .where(eq(deals.partnerId, partnerId))
        .orderBy(desc(deals.createdAt));
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook to fetch a single deal by ID
 */
export function useDeal(id: string | undefined) {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["deal", id],
    enabled: !!isSignedIn && !!id,
    queryFn: async (): Promise<DealWithPartner | null> => {
      if (!id) return null;
      const result = await db
        .select({
          deal: deals,
          partner: partners,
        })
        .from(deals)
        .innerJoin(partners, eq(deals.partnerId, partners.id))
        .where(eq(deals.id, id))
        .limit(1);

      if (!result[0]) return null;

      return {
        ...result[0].deal,
        partner: result[0].partner,
      };
    },
    staleTime: 1000 * 60 * 10,
  });
}
