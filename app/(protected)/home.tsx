import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    const handleSignOut = () => {
        console.log("Sign out pressed")
    }

    return(
        <View style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.title}>Hello</Text>
                <Text style={styles.subtitle}>
                    This is the protected area
                </Text>

                <View style={styles.card}>
                    <Text style={styles.cardLabel}>Status</Text>
                    <Text style={styles.cardText}>Authenticated</Text>
                </View>

                <Pressable style={styles.signOutButton} onPress={handleSignOut}>
                    <Text style={styles.signOutButtonText}>Sign Out</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#0F0F10"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 8,
    },
    subtitle: {
        color: "#A1A1AA",
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 28,
    },
    card: {
        backgroundColor: "#1A1A1D",
        borderWidth: 1,
        borderColor: "#2A2A2E",
        borderRadius: 16,
        padding: 18,
        marginBottom: 24,
    },
    cardLabel: {
        color: "#A1A1AA",
        fontSize: 13,
        marginBottom: 6,
    },
    cardText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
    },
    signOutButton: {
        backgroundColor: "#2A2A2E",
        borderWidth: 1,
        borderColor: "#3A3A40",
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: "center",
    },
    signOutButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});