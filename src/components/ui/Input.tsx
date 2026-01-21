import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  type TextInputProps,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { cn } from "@/lib/utils";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  secureTextEntry,
  containerClassName,
  className,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = secureTextEntry !== undefined;

  return (
    <View className={cn("w-full", containerClassName)}>
      {label && (
        <Text className="mb-2 text-sm font-medium text-yunicity-black">
          {label}
        </Text>
      )}

      <View className="relative">
        <TextInput
          className={cn(
            "w-full px-4 py-3.5 rounded-xl border-2 text-base text-yunicity-black bg-white",
            isFocused ? "border-yunicity-blue" : "border-gray-200",
            error && "border-red-500",
            isPassword && "pr-12",
            className
          )}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {isPassword && (
          <Pressable
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            hitSlop={8}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color="#9CA3AF" />
            ) : (
              <Eye size={20} color="#9CA3AF" />
            )}
          </Pressable>
        )}
      </View>

      {error && (
        <Text className="mt-1.5 text-sm text-red-500">{error}</Text>
      )}
    </View>
  );
}
