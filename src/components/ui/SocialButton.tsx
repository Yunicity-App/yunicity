import { Pressable, Text, View, type PressableProps } from "react-native";
import { cn } from "@/lib/utils";

type Provider = "google" | "apple";

interface SocialButtonProps extends Omit<PressableProps, "children"> {
  provider: Provider;
  className?: string;
}

const providerConfig: Record<Provider, { label: string; icon: string }> = {
  google: {
    label: "Continuer avec Google",
    icon: "G",
  },
  apple: {
    label: "Continuer avec Apple",
    icon: "",
  },
};

export function SocialButton({
  provider,
  className,
  disabled,
  ...props
}: SocialButtonProps) {
  const config = providerConfig[provider];

  return (
    <Pressable
      className={cn(
        "w-full flex-row items-center justify-center py-3.5 px-6 rounded-xl border-2 border-gray-200 bg-white",
        disabled && "opacity-50",
        className
      )}
      disabled={disabled}
      {...props}
    >
      <View className="mr-3">
        {provider === "google" ? (
          <Text className="text-lg font-bold text-red-500">G</Text>
        ) : (
          <Text className="text-lg font-bold text-yunicity-black"></Text>
        )}
      </View>
      <Text className="text-base font-medium text-yunicity-black">
        {config.label}
      </Text>
    </Pressable>
  );
}
