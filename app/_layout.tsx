import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import { WelcomeModal } from "../components/WelcomeModal";
import { useAppStore } from "../store/useAppStore";
import "../global.css";

export default function RootLayout() {
  const hasCompletedOnboarding = useAppStore(state => state.hasCompletedOnboarding);
  const debugReset = useAppStore(state => state.debugReset);

  // TEMPORARY: Reset state to simulate a new user
  // You can remove this useEffect once the app has reset
  useEffect(() => {
    debugReset();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
          
          {!hasCompletedOnboarding && (
            <BlurView 
              intensity={Platform.OS === 'ios' ? 90 : 100} 
              tint="light" 
              style={[StyleSheet.absoluteFill, { zIndex: 1000 }]} 
            />
          )}
          
          <WelcomeModal />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
