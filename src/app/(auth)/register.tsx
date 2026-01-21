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
import { useSignUp, useOAuth } from "@clerk/clerk-expo";
import { MapPin } from "lucide-react-native";
import { Button, Input, SocialButton } from "@/components/ui";

export default function RegisterScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startAppleOAuth } = useOAuth({ strategy: "oauth_apple" });
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    code?: string;
    general?: string;
  }>({});

  const handleSignUp = useCallback(async () => {
    if (!isLoaded) return;

    // Reset errors
    setErrors({});

    // Validation
    if (!fullName.trim()) {
      setErrors({ fullName: "Le nom est requis" });
      return;
    }
    if (!email.trim()) {
      setErrors({ email: "L'email est requis" });
      return;
    }
    if (!password) {
      setErrors({ password: "Le mot de passe est requis" });
      return;
    }
    if (password.length < 8) {
      setErrors({ password: "Le mot de passe doit contenir au moins 8 caractères" });
      return;
    }
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Les mots de passe ne correspondent pas" });
      return;
    }

    setLoading(true);

    try {
      await signUp.create({
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ").slice(1).join(" ") || undefined,
        emailAddress: email,
        password,
      });

      // Send email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ code: string; message: string; longMessage?: string }> };
      const clerkError = error.errors?.[0];

      if (clerkError?.code === "form_identifier_exists") {
        setErrors({ email: "Un compte existe déjà avec cet email" });
      } else if (clerkError?.code === "form_password_pwned") {
        setErrors({ password: "Ce mot de passe est trop commun" });
      } else {
        setErrors({ general: clerkError?.longMessage || clerkError?.message || "Une erreur est survenue" });
      }
    } finally {
      setLoading(false);
    }
  }, [isLoaded, fullName, email, password, confirmPassword, signUp]);

  const handleVerification = useCallback(async () => {
    if (!isLoaded) return;

    setErrors({});
    setLoading(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ code: string; message: string }> };
      const clerkError = error.errors?.[0];

      if (clerkError?.code === "form_code_incorrect") {
        setErrors({ code: "Code incorrect" });
      } else {
        setErrors({ general: clerkError?.message || "Une erreur est survenue" });
      }
    } finally {
      setLoading(false);
    }
  }, [isLoaded, verificationCode, signUp, setActive, router]);

  const handleGoogleSignUp = useCallback(async () => {
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

  const handleAppleSignUp = useCallback(async () => {
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

  // Verification Screen
  if (pendingVerification) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="flex-1 px-6 pt-8 pb-6 justify-center">
            <View className="items-center mb-10">
              <View className="w-16 h-16 items-center justify-center rounded-2xl bg-yunicity-blue mb-4">
                <MapPin size={32} color="#FFFFFF" />
              </View>
              <Text className="text-2xl font-bold text-yunicity-black text-center">
                Vérifiez votre email
              </Text>
              <Text className="text-gray-500 mt-2 text-center">
                Nous avons envoyé un code à{"\n"}
                <Text className="font-medium text-yunicity-black">{email}</Text>
              </Text>
            </View>

            {errors.general && (
              <View className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <Text className="text-red-600 text-center">{errors.general}</Text>
              </View>
            )}

            <Input
              label="Code de vérification"
              placeholder="123456"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
              autoComplete="one-time-code"
              error={errors.code}
              containerClassName="mb-6"
            />

            <Button
              onPress={handleVerification}
              loading={loading}
              fullWidth
              size="lg"
            >
              Vérifier
            </Button>

            <Pressable
              className="mt-4"
              onPress={() => setPendingVerification(false)}
            >
              <Text className="text-yunicity-blue text-center font-medium">
                Modifier l'email
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

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
            <View className="items-center mb-8">
              <View className="w-16 h-16 items-center justify-center rounded-2xl bg-yunicity-blue mb-4">
                <MapPin size={32} color="#FFFFFF" />
              </View>
              <Text className="text-3xl font-bold text-yunicity-black">
                Créer un compte
              </Text>
              <Text className="text-gray-500 mt-1">
                Rejoignez la communauté Yunicity
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
                label="Nom complet"
                placeholder="Jean Dupont"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoComplete="name"
                error={errors.fullName}
              />

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
                placeholder="Minimum 8 caractères"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="new-password"
                error={errors.password}
              />

              <Input
                label="Confirmer le mot de passe"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoComplete="new-password"
                error={errors.confirmPassword}
              />
            </View>

            {/* Sign Up Button */}
            <Button
              onPress={handleSignUp}
              loading={loading}
              fullWidth
              size="lg"
            >
              S'inscrire
            </Button>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="mx-4 text-gray-400 text-sm">ou</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            {/* Social Login */}
            <View className="gap-3">
              <SocialButton provider="google" onPress={handleGoogleSignUp} />
              {Platform.OS === "ios" && (
                <SocialButton provider="apple" onPress={handleAppleSignUp} />
              )}
            </View>

            {/* Sign In Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-500">Déjà un compte ? </Text>
              <Link href="/(auth)/login" asChild>
                <Pressable>
                  <Text className="text-yunicity-blue font-semibold">
                    Se connecter
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
