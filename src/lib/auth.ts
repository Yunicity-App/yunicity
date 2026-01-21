/**
 * Authentication Configuration - Clerk
 *
 * Setup:
 * 1. Créer un compte sur https://clerk.com
 * 2. Créer une application
 * 3. Activer les providers (Email, Google, Apple)
 * 4. Récupérer la Publishable Key
 * 5. Ajouter dans .env.local:
 *    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
 *
 * Installation:
 * npx expo install @clerk/clerk-expo expo-secure-store
 */

import * as SecureStore from "expo-secure-store";

export const CLERK_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

/**
 * Token cache for Clerk (uses SecureStore)
 * Required for session persistence on mobile
 */
export const tokenCache = {
  async getToken(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {
      // Silently fail on web or unsupported platforms
    }
  },
  async clearToken(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch {
      // Silently fail
    }
  },
};

/**
 * Usage in _layout.tsx:
 *
 * import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
 * import { CLERK_PUBLISHABLE_KEY, tokenCache } from "@/lib/auth";
 *
 * export default function RootLayout() {
 *   return (
 *     <ClerkProvider
 *       publishableKey={CLERK_PUBLISHABLE_KEY}
 *       tokenCache={tokenCache}
 *     >
 *       <ClerkLoaded>
 *         <Stack />
 *       </ClerkLoaded>
 *     </ClerkProvider>
 *   );
 * }
 *
 *
 * Usage in components:
 *
 * import { useAuth, useUser, useSignIn, useSignUp } from "@clerk/clerk-expo";
 *
 * // Check if signed in
 * const { isSignedIn, signOut } = useAuth();
 *
 * // Get user info
 * const { user } = useUser();
 * console.log(user?.emailAddresses[0]?.emailAddress);
 *
 * // Sign in
 * const { signIn, setActive } = useSignIn();
 * await signIn.create({ identifier: email, password });
 * await setActive({ session: signIn.createdSessionId });
 *
 * // Sign up
 * const { signUp, setActive } = useSignUp();
 * await signUp.create({ emailAddress: email, password });
 * await setActive({ session: signUp.createdSessionId });
 */
