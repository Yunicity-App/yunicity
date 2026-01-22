import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import type { User } from "@/db/schema";

const SIGNUP_BONUS_POINTS = 100;

/**
 * Hook to sync Clerk user with our database
 * Creates user on first login with signup bonus points
 */
export function useUserSync() {
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isUserLoaded || !isSignedIn || !clerkUser) {
      setIsLoading(false);
      return;
    }

    syncUser();
  }, [isUserLoaded, isSignedIn, clerkUser?.id]);

  const syncUser = async () => {
    if (!clerkUser) return;

    setIsLoading(true);
    setError(null);

    try {
      // For now, we use mock data since we can't call Neon directly from client
      // This will be replaced with an API call later
      const mockUser: User = {
        id: crypto.randomUUID(),
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
        role: "user",
        points: SIGNUP_BONUS_POINTS,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setDbUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sync user");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user: dbUser,
    clerkUser,
    isLoading,
    error,
    isSignedIn,
    refetch: syncUser,
  };
}

/**
 * Points reason codes
 */
export const POINTS_REASONS = {
  SIGNUP_BONUS: "signup_bonus",
  DEAL_REDEEMED: "deal_redeemed",
  REFERRAL: "referral",
  POST_CREATED: "post_created",
  PROFILE_COMPLETE: "profile_complete",
} as const;

export type PointsReason = typeof POINTS_REASONS[keyof typeof POINTS_REASONS];
