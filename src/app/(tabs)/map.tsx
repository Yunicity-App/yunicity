import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MapPin, Navigation } from "lucide-react-native";
import { useRouter } from "expo-router";
import { usePartners } from "@/hooks/usePartners";
import type { Partner } from "@/db/schema";

/**
 * Map Screen - Liste view des partenaires
 * Note: react-native-maps nécessite un development build.
 * Pour le MVP avec Expo Go, on affiche une liste des partenaires par localisation.
 */
export default function MapScreen() {
  const router = useRouter();
  const { data: partners, isLoading } = usePartners();

  const handlePartnerPress = (partner: Partner) => {
    router.push(`/partner/${partner.id}` as any);
  };

  // Group partners by category
  const partnersByCategory = partners?.reduce((acc, partner) => {
    if (!acc[partner.category]) {
      acc[partner.category] = [];
    }
    acc[partner.category].push(partner);
    return acc;
  }, {} as Record<string, Partner[]>) || {};

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="px-6 py-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-black">Exploration</Text>
        <Text className="text-gray-500 mt-1">
          Découvre les partenaires à Reims
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Info banner */}
        <View className="mx-6 mt-4 p-4 bg-yunicity-blue/10 rounded-xl flex-row items-center">
          <Navigation size={24} color="#1E40AF" />
          <View className="ml-3 flex-1">
            <Text className="text-yunicity-blue font-semibold">
              {partners?.length || 0} partenaires
            </Text>
            <Text className="text-gray-500 text-sm">
              Carte interactive bientôt disponible
            </Text>
          </View>
        </View>

        {/* Partners by category */}
        {Object.entries(partnersByCategory).map(([category, categoryPartners]) => (
          <View key={category} className="mt-6">
            <Text className="px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {category}
            </Text>

            {categoryPartners.map((partner) => (
              <Pressable
                key={partner.id}
                onPress={() => handlePartnerPress(partner)}
                className="mx-6 mb-3 p-4 bg-gray-50 rounded-xl flex-row items-center active:bg-gray-100"
              >
                <View className="h-12 w-12 rounded-full bg-yunicity-blue items-center justify-center">
                  <MapPin size={20} color="#FFFFFF" />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-black font-semibold">{partner.nom}</Text>
                  <Text className="text-gray-500 text-sm" numberOfLines={1}>
                    {partner.address}
                  </Text>
                </View>
                <View className="bg-white px-3 py-1 rounded-full border border-gray-200">
                  <Text className="text-xs text-gray-600">Voir</Text>
                </View>
              </Pressable>
            ))}
          </View>
        ))}

        {isLoading && (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400">Chargement...</Text>
          </View>
        )}

        {!isLoading && partners?.length === 0 && (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400">Aucun partenaire trouvé</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
