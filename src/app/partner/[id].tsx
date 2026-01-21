import React from "react";
import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, MapPin, Navigation, Clock, Star } from "lucide-react-native";
import { usePartner } from "@/hooks/usePartners";
import { Skeleton } from "@/components/ui/Skeleton";

export default function PartnerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: partner, isLoading } = usePartner(id);

  const openMaps = () => {
    if (!partner) return;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${partner.latitude},${partner.longitude}`;
    Linking.openURL(url);
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-4">
          <Skeleton height={250} rounded="xl" className="mb-4" />
          <Skeleton width="60%" height={32} className="mb-2" />
          <Skeleton width="40%" height={24} className="mb-4" />
          <Skeleton height={100} className="mb-4" />
          <Skeleton height={56} rounded="xl" />
        </View>
      </SafeAreaView>
    );
  }

  if (!partner) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Partenaire non trouvé</Text>
        <Pressable
          onPress={() => router.back()}
          className="bg-yunicity-blue py-3 px-6 rounded-xl mt-4"
        >
          <Text className="text-white font-semibold">Retour</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Hero Image */}
      <View className="relative">
        <Image
          source={{ uri: partner.logoUrl || "https://placehold.co/800x400?text=Partner" }}
          style={{ width: "100%", height: 280 }}
          contentFit="cover"
          transition={200}
        />

        {/* Gradient overlay */}
        <View className="absolute inset-0 bg-black/20" />

        {/* Back button */}
        <SafeAreaView className="absolute top-0 left-0 right-0">
          <Pressable
            onPress={() => router.back()}
            className="m-4 h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm"
          >
            <ArrowLeft size={24} color="#000000" />
          </Pressable>
        </SafeAreaView>

        {/* Category badge */}
        <View className="absolute bottom-4 right-4 bg-yunicity-blue px-4 py-2 rounded-full">
          <Text className="text-white text-sm font-semibold">
            {partner.category}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          {/* Partner Name */}
          <Text className="text-2xl font-bold text-black mb-2">
            {partner.nom}
          </Text>

          {/* Address */}
          <Pressable
            onPress={openMaps}
            className="flex-row items-center mb-4"
          >
            <MapPin size={16} color="#6B7280" />
            <Text className="text-gray-500 ml-2 flex-1 underline">
              {partner.address}
            </Text>
          </Pressable>

          {/* Stats row */}
          <View className="flex-row items-center mb-6 pb-6 border-b border-gray-100">
            <View className="flex-row items-center mr-6">
              <Star size={16} color="#FBBF24" fill="#FBBF24" />
              <Text className="text-black font-semibold ml-1">4.8</Text>
              <Text className="text-gray-400 ml-1">(128 avis)</Text>
            </View>
            <View className="flex-row items-center">
              <Clock size={16} color="#6B7280" />
              <Text className="text-gray-500 ml-1">Ouvert</Text>
            </View>
          </View>

          {/* Description */}
          <Text className="text-lg font-semibold text-black mb-2">
            À propos
          </Text>
          <Text className="text-gray-600 leading-6 mb-6">
            {partner.description || "Découvrez ce partenaire Yunicity et profitez d'offres exclusives avec votre Yurpass !"}
          </Text>

          {/* Deals section placeholder */}
          <Text className="text-lg font-semibold text-black mb-3">
            Offres disponibles
          </Text>
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <Text className="text-gray-500 text-center">
              Bientôt disponible avec le Yurpass
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <SafeAreaView edges={["bottom"]} className="px-6 pb-4 pt-2 border-t border-gray-100 bg-white">
        <Pressable
          onPress={openMaps}
          className="bg-yunicity-blue py-4 px-6 rounded-xl flex-row items-center justify-center"
        >
          <Navigation size={20} color="#FFFFFF" />
          <Text className="text-white font-semibold ml-2">Y aller</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
