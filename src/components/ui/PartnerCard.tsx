import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";
import type { Partner } from "@/db/schema";

interface PartnerCardProps {
  partner: Partner;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/partner/${partner.id}` as any);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="bg-white rounded-xl overflow-hidden mb-4 shadow-sm active:opacity-90"
    >
      {/* Image 16/9 */}
      <View className="relative">
        <Image
          source={{ uri: partner.logoUrl || "https://placehold.co/400x225?text=Partner" }}
          style={{ width: "100%", aspectRatio: 16 / 9 }}
          contentFit="cover"
          transition={200}
          className="rounded-t-xl"
        />

        {/* Category badge */}
        <View className="absolute top-3 right-3 bg-yunicity-blue px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-semibold">
            {partner.category}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Name */}
        <Text className="text-black text-lg font-bold mb-1">
          {partner.nom}
        </Text>

        {/* Address */}
        <View className="flex-row items-center">
          <MapPin size={14} color="#6B7280" />
          <Text className="text-gray-500 text-sm ml-1 flex-1" numberOfLines={1}>
            {partner.address}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
