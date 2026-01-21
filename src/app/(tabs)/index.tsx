import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";
import { Bell, Search } from "lucide-react-native";
import { usePartners } from "@/hooks/usePartners";
import { PartnerCard } from "@/components/ui/PartnerCard";
import { PartnerCardSkeleton } from "@/components/ui/Skeleton";
import type { Partner } from "@/db/schema";

const TypedFlashList = FlashList as any;

export default function FeedScreen() {
  const { user } = useUser();
  const { data: partners, isLoading, refetch } = usePartners();

  const renderItem = ({ item }: { item: Partner }) => (
    <PartnerCard partner={item} />
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <View>
          <Text className="text-gray-400 font-medium">Salut !</Text>
          <Text className="text-xl font-bold text-yunicity-black">
            {user?.firstName || "Explorateur"} 👋
          </Text>
        </View>
        <View className="flex-row items-center gap-4">
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-gray-50">
            <Search size={22} color="#1F2937" />
          </Pressable>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-gray-50">
            <Bell size={22} color="#1F2937" />
          </Pressable>
        </View>
      </View>

      <View className="flex-1 px-6">
        <Text className="mb-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Partenaires à Reims
        </Text>

        {isLoading ? (
          <View className="flex-1">
            {[1, 2, 3].map((i) => (
              <PartnerCardSkeleton key={i} />
            ))}
          </View>
        ) : (
          <TypedFlashList
            data={partners || []}
            renderItem={renderItem}
            estimatedItemSize={280}
            showsVerticalScrollIndicator={false}
            onRefresh={refetch}
            refreshing={isLoading}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center py-20">
                <Text className="text-gray-400">Aucun partenaire trouvé</Text>
              </View>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
