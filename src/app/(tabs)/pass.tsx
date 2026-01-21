import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ticket } from "lucide-react-native";

export default function PassScreen() {
  return (
    <SafeAreaView className="flex-1 bg-yunicity-white">
      <View className="border-b border-gray-100 px-6 py-4">
        <Text className="text-2xl font-bold text-yunicity-black">Mes Pass</Text>
        <Text className="text-yunicity-black/60">Vos avantages exclusifs</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Ticket size={48} color="#1E40AF" />
        <Text className="mt-4 text-yunicity-black/40">Aucun pass actif</Text>
      </View>
    </SafeAreaView>
  );
}
