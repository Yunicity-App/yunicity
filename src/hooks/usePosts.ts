import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { api } from "@/lib/api";
import type { Post } from "@/db/schema";

/**
 * Hook to fetch all published posts
 */
export function usePosts() {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["posts"],
    enabled: !!isSignedIn,
    queryFn: async (): Promise<Post[]> => {
      return api.getPosts();
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to fetch a single post
 */
export function usePost(id: string | undefined) {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["post", id],
    enabled: !!isSignedIn && !!id,
    queryFn: async (): Promise<Post | null> => {
      if (!id) return null;
      return api.getPost(id);
    },
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook to create a new post
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: Partial<Post>) => {
      return api.createPost(postData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

/**
 * Hook to fetch posts by partner
 */
export function usePostsByPartner(partnerId: string | undefined) {
  const { isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["posts", "partner", partnerId],
    enabled: !!isSignedIn && !!partnerId,
    queryFn: async (): Promise<Post[]> => {
      if (!partnerId) return [];
      return api.getPostsByPartner(partnerId);
    },
    staleTime: 1000 * 60 * 2,
  });
}
