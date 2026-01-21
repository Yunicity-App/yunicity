import React from "react";
import { View, Animated } from "react-native";

export const PartnerSkeleton = () => {
    const animatedValue = React.useRef(new Animated.Value(0.3)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 0.7,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0.3,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [animatedValue]);

    return (
        <View className="mb-4 overflow-hidden rounded-2xl bg-white border border-gray-100">
            <Animated.View
                className="aspect-[16/9] w-full bg-gray-200"
                style={{ opacity: animatedValue }}
            />
            <View className="p-4">
                <Animated.View
                    className="h-6 w-1/2 rounded bg-gray-200"
                    style={{ opacity: animatedValue }}
                />
                <Animated.View
                    className="mt-2 h-4 w-full rounded bg-gray-200"
                    style={{ opacity: animatedValue }}
                />
                <Animated.View
                    className="mt-1 h-4 w-3/4 rounded bg-gray-200"
                    style={{ opacity: animatedValue }}
                />
                <View className="mt-4 flex-row items-center">
                    <Animated.View
                        className="h-3 w-24 rounded bg-gray-200"
                        style={{ opacity: animatedValue }}
                    />
                </View>
            </View>
        </View>
    );
};
