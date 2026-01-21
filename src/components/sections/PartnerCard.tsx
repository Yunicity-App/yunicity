import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Partner } from "../../db/schema";
import { MapPin } from "lucide-react-native";

interface PartnerCardProps {
    partner: Partner;
    onPress?: () => void;
}

export const PartnerCard = ({ partner, onPress }: PartnerCardProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                { opacity: pressed ? 0.9 : 1 },
            ]}
            className="mb-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100"
        >
            <View className="aspect-[16/9] w-full bg-gray-100">
                <Image
                    source={{ uri: partner.logoUrl || "https://placehold.co/600x400?text=" + partner.nom }}
                    className="h-full w-full"
                    contentFit="cover"
                    transition={200}
                    cachePolicy="disk"
                />
                <View className="absolute right-4 top-4 rounded-full bg-yunicity-blue px-3 py-1">
                    <Text className="text-xs font-semibold text-white">
                        {partner.category}
                    </Text>
                </View>
            </View>

            <View className="p-4">
                <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-bold text-yunicity-black">
                        {partner.nom}
                    </Text>
                </View>

                <Text className="mt-1 text-sm text-gray-500" numberOfLines={2}>
                    {partner.description}
                </Text>

                <View className="mt-3 flex-row items-center">
                    <MapPin size={14} color="#6B7280" />
                    <Text className="ml-1 text-xs text-gray-400">
                        {partner.address}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
    },
});
