import React from "react";
import { View, Text, Pressable, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  User,
  Settings,
  ChevronRight,
  Star,
  Bell,
  HelpCircle,
  Shield,
  LogOut,
  Plus,
} from "lucide-react-native";

// Mock user points
const USER_POINTS = 150;

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert(
      "Deconnexion",
      "Etes-vous sur de vouloir vous deconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Deconnexion",
          style: "destructive",
          onPress: () => signOut(),
        },
      ]
    );
  };

  const menuSections = [
    {
      title: "Mon compte",
      items: [
        {
          icon: Star,
          label: "Mes points",
          value: `${USER_POINTS} pts`,
          color: "#1E40AF",
          onPress: () => {},
        },
        {
          icon: Bell,
          label: "Notifications",
          onPress: () => {},
        },
        {
          icon: Settings,
          label: "Parametres",
          onPress: () => {},
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Aide & FAQ",
          onPress: () => {},
        },
        {
          icon: Shield,
          label: "Confidentialite",
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-black">Profil</Text>
        </View>

        {/* User Card */}
        <View className="mx-6 bg-gray-50 rounded-2xl p-6 mb-6">
          <View className="flex-row items-center">
            {user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                style={{ width: 72, height: 72, borderRadius: 36 }}
              />
            ) : (
              <View className="h-18 w-18 items-center justify-center rounded-full bg-yunicity-blue/10">
                <User size={32} color="#1E40AF" />
              </View>
            )}
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-black">
                {user?.firstName || "Utilisateur"} {user?.lastName || ""}
              </Text>
              <Text className="text-gray-500 text-sm">
                {user?.primaryEmailAddress?.emailAddress}
              </Text>
              <View className="flex-row items-center mt-2">
                <View className="bg-yunicity-blue/10 px-3 py-1 rounded-full flex-row items-center">
                  <Star size={14} color="#1E40AF" fill="#1E40AF" />
                  <Text className="text-yunicity-blue font-semibold text-sm ml-1">
                    {USER_POINTS} points
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Create Post Button (for partners/admins) */}
        <Pressable
          onPress={() => router.push("/post/create" as any)}
          className="mx-6 mb-6 bg-yunicity-blue rounded-xl py-4 flex-row items-center justify-center"
        >
          <Plus size={20} color="#FFFFFF" />
          <Text className="text-white font-semibold ml-2">
            Creer une annonce
          </Text>
        </Pressable>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mb-6">
            <Text className="px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {section.title}
            </Text>
            <View className="mx-6 bg-gray-50 rounded-xl overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <Pressable
                  key={itemIndex}
                  className={`flex-row items-center px-4 py-4 bg-white ${
                    itemIndex < section.items.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                  onPress={item.onPress}
                >
                  <View
                    className="w-10 h-10 items-center justify-center rounded-full mr-3"
                    style={{
                      backgroundColor: item.color
                        ? `${item.color}15`
                        : "#F3F4F6",
                    }}
                  >
                    <item.icon size={20} color={item.color || "#6B7280"} />
                  </View>
                  <Text className="flex-1 text-base text-black">
                    {item.label}
                  </Text>
                  {item.value && (
                    <Text className="text-yunicity-blue font-semibold mr-2">
                      {item.value}
                    </Text>
                  )}
                  <ChevronRight size={20} color="#9CA3AF" />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out Button */}
        <Pressable
          onPress={handleSignOut}
          className="mx-6 mb-8 bg-red-50 rounded-xl py-4 flex-row items-center justify-center"
        >
          <LogOut size={20} color="#EF4444" />
          <Text className="text-red-500 font-semibold ml-2">Deconnexion</Text>
        </Pressable>

        {/* App Version */}
        <Text className="text-center text-gray-400 text-sm mb-6">
          Yunicity v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
