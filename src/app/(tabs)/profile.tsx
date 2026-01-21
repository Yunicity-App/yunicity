import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { User, Settings, ChevronRight } from "lucide-react-native";
import { Button } from "@/components/ui";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      "Déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Déconnexion",
          style: "destructive",
          onPress: () => signOut(),
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: Settings,
      label: "Paramètres",
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="border-b border-gray-100 px-6 py-4">
        <Text className="text-2xl font-bold text-yunicity-black">Profil</Text>
      </View>

      <View className="flex-1 px-6 pt-6">
        {/* User Info */}
        <View className="items-center mb-8">
          <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-yunicity-blue/10">
            {user?.imageUrl ? (
              <View className="h-24 w-24 rounded-full bg-yunicity-blue" />
            ) : (
              <User size={40} color="#1E40AF" />
            )}
          </View>
          <Text className="text-xl font-bold text-yunicity-black">
            {user?.fullName || "Utilisateur"}
          </Text>
          <Text className="text-gray-500 mt-1">
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        {/* Menu Items */}
        <View className="bg-gray-50 rounded-2xl overflow-hidden mb-8">
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              className="flex-row items-center px-4 py-4 bg-white border-b border-gray-100 last:border-b-0"
              onPress={item.onPress}
            >
              <View className="w-10 h-10 items-center justify-center rounded-full bg-gray-100 mr-3">
                <item.icon size={20} color="#6B7280" />
              </View>
              <Text className="flex-1 text-base text-yunicity-black">
                {item.label}
              </Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </Pressable>
          ))}
        </View>

        {/* Sign Out Button */}
        <Button
          variant="outline"
          fullWidth
          onPress={handleSignOut}
          className="border-red-200"
        >
          Déconnexion
        </Button>
      </View>
    </SafeAreaView>
  );
}
