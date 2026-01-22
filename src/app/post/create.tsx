import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  ArrowLeft,
  ImagePlus,
  Calendar,
  Send,
  X,
} from "lucide-react-native";
import { useCreatePost } from "@/hooks/usePosts";
import { useUser } from "@clerk/clerk-expo";

export default function CreatePostScreen() {
  const router = useRouter();
  const { user } = useUser();
  const createPost = useCreatePost();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Erreur", "Le titre est obligatoire");
      return;
    }

    try {
      await createPost.mutateAsync({
        authorId: user?.id || "user-1",
        title: title.trim(),
        description: description.trim() || null,
        imageUrl: imageUrl.trim() || null,
        eventDate: eventDate ? new Date(eventDate) : null,
      });

      Alert.alert("Succes", "Votre annonce a ete publiee !", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de publier l'annonce");
    }
  };

  const isValid = title.trim().length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-gray-50"
          >
            <ArrowLeft size={24} color="#000000" />
          </Pressable>
          <Text className="text-lg font-bold text-black">Nouvelle annonce</Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="p-6">
            {/* Image Preview */}
            {imageUrl ? (
              <View className="relative mb-6">
                <Image
                  source={{ uri: imageUrl }}
                  style={{ width: "100%", height: 200, borderRadius: 16 }}
                  contentFit="cover"
                />
                <Pressable
                  onPress={() => setImageUrl("")}
                  className="absolute top-2 right-2 h-8 w-8 items-center justify-center rounded-full bg-black/50"
                >
                  <X size={16} color="#FFFFFF" />
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  // For MVP, use a placeholder image URL
                  Alert.prompt
                    ? Alert.prompt(
                        "Image URL",
                        "Entrez l'URL de l'image",
                        (url) => url && setImageUrl(url)
                      )
                    : setImageUrl(
                        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"
                      );
                }}
                className="h-48 bg-gray-50 rounded-2xl items-center justify-center mb-6 border-2 border-dashed border-gray-200"
              >
                <ImagePlus size={32} color="#9CA3AF" />
                <Text className="text-gray-400 mt-2">Ajouter une image</Text>
              </Pressable>
            )}

            {/* Title */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Titre *
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Ex: Soiree speciale ce week-end !"
                placeholderTextColor="#9CA3AF"
                className="bg-gray-50 rounded-xl px-4 py-4 text-black text-base"
                maxLength={100}
              />
              <Text className="text-xs text-gray-400 mt-1 text-right">
                {title.length}/100
              </Text>
            </View>

            {/* Description */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Description
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Decrivez votre evenement ou annonce..."
                placeholderTextColor="#9CA3AF"
                className="bg-gray-50 rounded-xl px-4 py-4 text-black text-base"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={{ minHeight: 120 }}
                maxLength={500}
              />
              <Text className="text-xs text-gray-400 mt-1 text-right">
                {description.length}/500
              </Text>
            </View>

            {/* Event Date */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Date de l'evenement (optionnel)
              </Text>
              <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4">
                <Calendar size={20} color="#6B7280" />
                <TextInput
                  value={eventDate}
                  onChangeText={setEventDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 ml-3 text-black text-base"
                  keyboardType="numbers-and-punctuation"
                />
              </View>
            </View>

            {/* Info Card */}
            <View className="bg-yunicity-blue/10 rounded-xl p-4 mb-6">
              <Text className="text-yunicity-blue font-semibold mb-1">
                La Voix de la Ville
              </Text>
              <Text className="text-gray-600 text-sm">
                Votre annonce sera visible par tous les utilisateurs de Yunicity
                a Reims. Partagez vos evenements, promotions et actualites !
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View className="px-6 pb-6 pt-2 border-t border-gray-100">
          <Pressable
            onPress={handleSubmit}
            disabled={!isValid || createPost.isPending}
            className={`py-4 px-6 rounded-xl flex-row items-center justify-center ${
              isValid && !createPost.isPending
                ? "bg-yunicity-blue"
                : "bg-gray-200"
            }`}
          >
            <Send size={20} color={isValid ? "#FFFFFF" : "#9CA3AF"} />
            <Text
              className={`font-semibold ml-2 ${
                isValid ? "text-white" : "text-gray-400"
              }`}
            >
              {createPost.isPending ? "Publication..." : "Publier l'annonce"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
