import { useState, useCallback } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import { MapPin } from "lucide-react-native";
import { Button, Input, SocialButton } from "@/components/ui";

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startAppleOAuth } = useOAuth({ strategy: "oauth_apple" });
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const handleSignIn = useCallback(async () => {
    if (!isLoaded) return;

    // Reset errors
    setErrors({});

    // Validation
    if (!email.trim()) {
      setErrors({ email: "L'email est requis" });
      return;
    }
    if (!password) {
      setErrors({ password: "Le mot de passe est requis" });
      return;
    }

    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ code: string; message: string }> };
      const clerkError = error.errors?.[0];

      if (clerkError?.code === "form_identifier_not_found") {
        setErrors({ email: "Aucun compte trouvé avec cet email" });
      } else if (clerkError?.code === "form_password_incorrect") {
        setErrors({ password: "Mot de passe incorrect" });
      } else {
        setErrors({ general: clerkError?.message || "Une erreur est survenue" });
      }
    } finally {
      setLoading(false);
    }
  }, [isLoaded, email, password, signIn, setActive, router]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive: setOAuthActive } = await startGoogleOAuth();
      if (createdSessionId && setOAuthActive) {
        await setOAuthActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.error("Google OAuth error:", err);
    }
  }, [startGoogleOAuth, router]);

  const handleAppleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive: setOAuthActive } = await startAppleOAuth();
      if (createdSessionId && setOAuthActive) {
        await setOAuthActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.error("Apple OAuth error:", err);
    }
  }, [startAppleOAuth, router]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-8 pb-6">
            {/* Logo & Header */}
            <View className="items-center mb-10">
              <View className="w-16 h-16 items-center justify-center rounded-2xl bg-yunicity-blue mb-4">
                <MapPin size={32} color="#FFFFFF" />
              </View>
              <Text className="text-3xl font-bold text-yunicity-black">
                Yunicity
              </Text>
              <Text className="text-gray-500 mt-1">
                Connexion à votre compte
              </Text>
            </View>

            {/* Error Banner */}
            {errors.general && (
              <View className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <Text className="text-red-600 text-center">{errors.general}</Text>
              </View>
            )}

            {/* Form */}
            <View className="gap-4 mb-6">
              <Input
                label="Email"
                placeholder="votre@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={errors.email}
              />

              <Input
                label="Mot de passe"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
                error={errors.password}
              />

              <Link href="/(auth)/forgot-password" asChild>
                <Pressable className="self-end">
                  <Text className="text-yunicity-blue font-medium">
                    Mot de passe oublié ?
                  </Text>
                </Pressable>
              </Link>
            </View>

            {/* Sign In Button */}
            <Button
              onPress={handleSignIn}
              loading={loading}
              fullWidth
              size="lg"
            >
              Se connecter
            </Button>

            {/* Divider */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="mx-4 text-gray-400 text-sm">ou</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social Login */}
            <View className="gap-3">
              <SocialButton provider="google" onPress={handleGoogleSignIn} />
              {Platform.OS === "ios" && (
                <SocialButton provider="apple" onPress={handleAppleSignIn} />
              )}
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-500">Pas encore de compte ? </Text>
              <Link href="/(auth)/register" asChild>
                <Pressable>
                  <Text className="text-yunicity-blue font-semibold">
                    S'inscrire
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
