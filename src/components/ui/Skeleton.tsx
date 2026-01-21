import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Skeleton({
  width = "100%",
  height = 20,
  className = "",
  rounded = "md",
}: SkeletonProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.7, { duration: 800 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const roundedClass = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  }[rounded];

  return (
    <Animated.View
      style={[
        animatedStyle,
        { width: width as any, height: height as any },
      ]}
      className={`bg-gray-200 ${roundedClass} ${className}`}
    />
  );
}

export function PartnerCardSkeleton() {
  return (
    <View className="bg-white rounded-xl overflow-hidden mb-4 shadow-sm">
      {/* Image skeleton 16/9 */}
      <Skeleton height={180} rounded="xl" className="rounded-b-none" />

      {/* Content */}
      <View className="p-4">
        {/* Category badge */}
        <View className="flex-row justify-end mb-2">
          <Skeleton width={80} height={24} rounded="full" />
        </View>

        {/* Name */}
        <Skeleton width="60%" height={24} className="mb-2" />

        {/* Address */}
        <View className="flex-row items-center">
          <Skeleton width={16} height={16} rounded="full" className="mr-2" />
          <Skeleton width="80%" height={16} />
        </View>
      </View>
    </View>
  );
}

export function FeedSkeleton() {
  return (
    <View className="px-4 pt-4">
      <PartnerCardSkeleton />
      <PartnerCardSkeleton />
      <PartnerCardSkeleton />
    </View>
  );
}
