import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import { WelcomeModal } from "../components/WelcomeModal";
import { useAppStore } from "../store/useAppStore";
import "../global.css";

export default function RootLayout() {
  const hasCompletedOnboarding = useAppStore(state => state.hasCompletedOnboarding);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
          
          {!hasCompletedOnboarding && (
            <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFill} />
          )}
          
          <WelcomeModal />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
