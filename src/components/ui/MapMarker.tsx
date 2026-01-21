import React from "react";
import { View, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import { Utensils, Coffee, ShoppingBag, Dumbbell, Scissors, Beer, Store } from "lucide-react-native";

interface MapMarkerProps {
    coordinate: {
        latitude: number;
        longitude: number;
    };
    title: string;
    category: string;
    onPress?: () => void;
    children?: React.ReactNode;
}

const getCategoryIcon = (category: string) => {
    const iconProps = { size: 16, color: "white" };
    const cat = category.toLowerCase();

    if (cat.includes("restau")) return <Utensils {...iconProps} />;
    if (cat.includes("café") || cat.includes("coffee")) return <Coffee {...iconProps} />;
    if (cat.includes("shop") || cat.includes("boutique")) return <ShoppingBag {...iconProps} />;
    if (cat.includes("sport") || cat.includes("gym")) return <Dumbbell {...iconProps} />;
    if (cat.includes("barber") || cat.includes("être") || cat.includes("coiffeur")) return <Scissors {...iconProps} />;
    if (cat.includes("bar")) return <Beer {...iconProps} />;

    return <Store {...iconProps} />;
};

export const MapMarker = ({ coordinate, title, category, onPress, children }: MapMarkerProps) => {
    return (
        <Marker
            coordinate={coordinate}
            title={title}
            onPress={onPress}
            tracksViewChanges={false}
        >
            <View style={styles.markerContainer}>
                <View style={styles.circle}>
                    {getCategoryIcon(category)}
                </View>
                <View style={styles.arrow} />
            </View>
            {children}
        </Marker>
    );
};

const styles = StyleSheet.create({
    markerContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#1E40AF", // Yurpass Blue
        borderWidth: 3,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    arrow: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 8,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "white",
        marginTop: -2,
    },
});
