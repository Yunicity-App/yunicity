import { useState, useCallback } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react-native";
import { Button, Input } from "@/components/ui";

export default function ForgotPasswordScreen() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "code" | "success">("email");
  const [errors, setErrors] = useState<{
    email?: string;
    code?: string;
    password?: string;
    general?: string;
  }>({});

  const handleSendCode = useCallback(async () => {
    if (!isLoaded) return;

    setErrors({});

    if (!email.trim()) {
      setErrors({ email: "L'email est requis" });
      return;
    }

    setLoading(true);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setStep("code");
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ code: string; message: string }> };
      const clerkError = error.errors?.[0];

      if (clerkError?.code === "form_identifier_not_found") {
        setErrors({ email: "Aucun compte trouvé avec cet email" });
      } else {
        setErrors({ general: clerkError?.message || "Une erreur est survenue" });
      }
    } finally {
      setLoading(false);
    }
  }, [isLoaded, email, signIn]);

  const handleResetPassword = useCallback(async () => {
    if (!isLoaded) return;

    setErrors({});

    if (!code.trim()) {
      setErrors({ code: "Le code est requis" });
      return;
    }
    if (!newPassword) {
      setErrors({ password: "Le nouveau mot de passe est requis" });
      return;
    }
    if (newPassword.length < 8) {
      setErrors({ password: "Le mot de passe doit contenir au moins 8 caractères" });
      return;
    }

    setLoading(true);

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        setStep("success");
      }
    } catch (err: unknown) {
      const error = err as { errors?: Array<{ code: string; message: string }> };
      const clerkError = error.errors?.[0];

      if (clerkError?.code === "form_code_incorrect") {
        setErrors({ code: "Code incorrect" });
      } else if (clerkError?.code === "form_password_pwned") {
        setErrors({ password: "Ce mot de passe est trop commun" });
      } else {
        setErrors({ general: clerkError?.message || "Une erreur est survenue" });
      }
    } finally {
      setLoading(false);
    }
  }, [isLoaded, code, newPassword, signIn]);

  // Success Screen
  if (step === "success") {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6 justify-center items-center">
          <View className="w-20 h-20 items-center justify-center rounded-full bg-green-100 mb-6">
            <CheckCircle size={40} color="#22C55E" />
          </View>
          <Text className="text-2xl font-bold text-yunicity-black text-center mb-2">
            Mot de passe réinitialisé
          </Text>
          <Text className="text-gray-500 text-center mb-8">
            Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
          </Text>
          <Button
            onPress={() => router.replace("/(auth)/login")}
            fullWidth
            size="lg"
          >
            Se connecter
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  // Code & New Password Screen
  if (step === "code") {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          {/* Header */}
          <View className="px-6 pt-4">
            <Pressable
              onPress={() => setStep("email")}
              className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
            >
              <ArrowLeft size={20} color="#000000" />
            </Pressable>
          </View>

          <View className="flex-1 px-6 pt-8 pb-6">
            <View className="items-center mb-8">
              <View className="w-16 h-16 items-center justify-center rounded-full bg-yunicity-blue/10 mb-4">
                <Mail size={32} color="#1E40AF" />
              </View>
              <Text className="text-2xl font-bold text-yunicity-black text-center">
                Vérifiez votre email
              </Text>
              <Text className="text-gray-500 mt-2 text-center">
                Entrez le code envoyé à{"\n"}
                <Text className="font-medium text-yunicity-black">{email}</Text>
              </Text>
            </View>

            {errors.general && (
              <View className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <Text className="text-red-600 text-center">{errors.general}</Text>
              </View>
            )}

            <View className="gap-4 mb-6">
              <Input
                label="Code de vérification"
                placeholder="123456"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                autoComplete="one-time-code"
                error={errors.code}
              />

              <Input
                label="Nouveau mot de passe"
                placeholder="Minimum 8 caractères"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                autoComplete="new-password"
                error={errors.password}
              />
            </View>

            <Button
              onPress={handleResetPassword}
              loading={loading}
              fullWidth
              size="lg"
            >
              Réinitialiser
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Email Screen
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="px-6 pt-4">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
          >
            <ArrowLeft size={20} color="#000000" />
          </Pressable>
        </View>

        <View className="flex-1 px-6 pt-8 pb-6">
          <View className="items-center mb-8">
            <View className="w-16 h-16 items-center justify-center rounded-full bg-yunicity-blue/10 mb-4">
              <Mail size={32} color="#1E40AF" />
            </View>
            <Text className="text-2xl font-bold text-yunicity-black text-center">
              Mot de passe oublié
            </Text>
            <Text className="text-gray-500 mt-2 text-center">
              Entrez votre email pour recevoir{"\n"}un code de réinitialisation
            </Text>
          </View>

          {errors.general && (
            <View className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <Text className="text-red-600 text-center">{errors.general}</Text>
            </View>
          )}

          <Input
            label="Email"
            placeholder="votre@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
            containerClassName="mb-6"
          />

          <Button
            onPress={handleSendCode}
            loading={loading}
            fullWidth
            size="lg"
          >
            Envoyer le code
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
