import React, { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";

function AuthGuard({ children } : { children: React.ReactNode }) {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inProtectedGroup = segments[0] === "(protected)";

    if (!session && inProtectedGroup){
      router.replace("/(auth)/signin");
    } else if (session && inAuthGroup) {
      router.replace("/(protected)/home");
    }
  }, [session, isLoading, segments]);

  if (isLoading) {
    return(
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C084FC" />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return(
    <AuthProvider>
      <AuthGuard>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthGuard>
    </AuthProvider>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0F0F10",
    alignItems: "center",
    justifyContent: "center",
  },
});