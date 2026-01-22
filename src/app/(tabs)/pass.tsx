import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import {
  Ticket,
  Star,
  Gift,
  TrendingUp,
  ChevronRight,
  QrCode,
} from "lucide-react-native";

const SIGNUP_BONUS = 100;

// Mock user points - will be replaced with real data
const USER_POINTS = 150;

const REWARDS = [
  {
    id: "1",
    title: "Cafe offert",
    points: 50,
    partner: "Marcel & Jane",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
  },
  {
    id: "2",
    title: "-20% sur l'addition",
    points: 100,
    partner: "Belga Queen",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
  },
  {
    id: "3",
    title: "Coupe gratuite",
    points: 200,
    partner: "As Barber",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400",
  },
];

export default function PassScreen() {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-black">Yurpass</Text>
          <Text className="text-gray-500">
            Ton pass pour profiter de Reims
          </Text>
        </View>

        {/* Points Card */}
        <View className="mx-6 bg-yunicity-blue rounded-2xl p-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-white/70 text-sm">Tes points</Text>
              <Text className="text-white text-4xl font-bold">
                {USER_POINTS}
              </Text>
            </View>
            <View className="h-16 w-16 rounded-full bg-white/20 items-center justify-center">
              <Star size={32} color="#FFFFFF" fill="#FFFFFF" />
            </View>
          </View>

          <View className="flex-row items-center">
            <TrendingUp size={16} color="#86EFAC" />
            <Text className="text-white/90 text-sm ml-2">
              +{SIGNUP_BONUS} points de bienvenue
            </Text>
          </View>

          {/* QR Code Button */}
          <Pressable className="mt-4 bg-white/20 rounded-xl py-3 flex-row items-center justify-center">
            <QrCode size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold ml-2">
              Afficher mon QR Code
            </Text>
          </Pressable>
        </View>

        {/* How to earn points */}
        <View className="mx-6 mb-6">
          <Text className="text-lg font-bold text-black mb-3">
            Comment gagner des points ?
          </Text>
          <View className="bg-gray-50 rounded-xl p-4">
            <PointsRow
              icon={<Gift size={20} color="#1E40AF" />}
              title="Inscription"
              points={100}
            />
            <PointsRow
              icon={<Ticket size={20} color="#1E40AF" />}
              title="Visite chez un partenaire"
              points={10}
            />
            <PointsRow
              icon={<Star size={20} color="#1E40AF" />}
              title="Parrainage d'un ami"
              points={50}
              isLast
            />
          </View>
        </View>

        {/* Available Rewards */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-6 mb-3">
            <Text className="text-lg font-bold text-black">
              Recompenses disponibles
            </Text>
            <Pressable>
              <Text className="text-yunicity-blue font-semibold">Voir tout</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {REWARDS.map((reward, index) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                userPoints={USER_POINTS}
                isLast={index === REWARDS.length - 1}
              />
            ))}
          </ScrollView>
        </View>

        {/* User Info */}
        <View className="mx-6 mb-6 bg-gray-50 rounded-xl p-4">
          <View className="flex-row items-center">
            <Image
              source={{
                uri:
                  user?.imageUrl ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
              }}
              style={{ width: 48, height: 48, borderRadius: 24 }}
            />
            <View className="ml-3 flex-1">
              <Text className="text-black font-semibold">
                {user?.firstName || "Utilisateur"} {user?.lastName || ""}
              </Text>
              <Text className="text-gray-500 text-sm">Membre Yunicity</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PointsRow({
  icon,
  title,
  points,
  isLast = false,
}: {
  icon: React.ReactNode;
  title: string;
  points: number;
  isLast?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center py-3 ${
        !isLast ? "border-b border-gray-200" : ""
      }`}
    >
      <View className="h-10 w-10 rounded-full bg-yunicity-blue/10 items-center justify-center">
        {icon}
      </View>
      <Text className="flex-1 ml-3 text-black">{title}</Text>
      <Text className="text-yunicity-blue font-bold">+{points}</Text>
    </View>
  );
}

function RewardCard({
  reward,
  userPoints,
  isLast,
}: {
  reward: (typeof REWARDS)[0];
  userPoints: number;
  isLast: boolean;
}) {
  const canRedeem = userPoints >= reward.points;

  return (
    <Pressable
      className={`w-44 bg-white rounded-xl overflow-hidden border border-gray-100 ${
        !isLast ? "mr-3" : ""
      }`}
    >
      <Image
        source={{ uri: reward.image }}
        style={{ width: "100%", height: 100 }}
        contentFit="cover"
      />
      <View className="p-3">
        <Text className="text-black font-semibold" numberOfLines={1}>
          {reward.title}
        </Text>
        <Text className="text-gray-500 text-xs" numberOfLines={1}>
          {reward.partner}
        </Text>
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
            <Star size={12} color="#1E40AF" fill="#1E40AF" />
            <Text className="text-yunicity-blue font-bold text-sm ml-1">
              {reward.points}
            </Text>
          </View>
          {canRedeem && (
            <View className="bg-green-100 px-2 py-1 rounded">
              <Text className="text-green-700 text-xs font-semibold">
                Disponible
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
