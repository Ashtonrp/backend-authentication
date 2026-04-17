import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
    const { user, signOut } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const handleSignOut = async () => {
        try {
            setAuthError(null);
            setIsSubmitting(true);
            await signOut();
        } catch (e) {
            setAuthError(e instanceof Error ? e.message : "Sign out failed.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return(
        <View style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.title}>Hello</Text>
                <Text style={styles.subtitle}>
                    This is the protected area
                </Text>

                 {authError && <Text style={styles.errorText}>{authError}</Text>}

                <Pressable 
                    style={[styles.button, isSubmitting && styles.buttonDisabled]} 
                    onPress={handleSignOut}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Sign Out</Text>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#0F0F10",
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
        marginBottom: 24,
    },
    errorText: {
        color: "#FF6B6B",
        fontSize: 13,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#7C3AED",
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: "center",
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});