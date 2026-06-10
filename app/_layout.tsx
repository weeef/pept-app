import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import { WelcomeModal } from "../components/WelcomeModal";
import { useAppStore } from "../store/useAppStore";
import { useColorScheme } from "nativewind";
import "../global.css";

export default function RootLayout() {
  const hasCompletedOnboarding = useAppStore(state => state.hasCompletedOnboarding);
  const debugReset = useAppStore(state => state.debugReset);
  const theme = useAppStore(state => state.theme);
  const { setColorScheme, colorScheme } = useColorScheme();

  // Sync store theme with NativeWind colorScheme
  useEffect(() => {
    if (theme === 'system') {
      setColorScheme('system');
    } else {
      setColorScheme(theme as 'light' | 'dark');
    }
  }, [theme]);

  // TEMPORARY: Reset state to simulate a new user
  // You can remove this useEffect once the app has reset
  useEffect(() => {
    debugReset();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <View style={{ flex: 1 }} className="bg-background dark:bg-background-dark">
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
          
          {!hasCompletedOnboarding && (
            <BlurView 
              intensity={Platform.OS === 'ios' ? 90 : 100} 
              tint={colorScheme === 'dark' ? "dark" : "light"} 
              style={[StyleSheet.absoluteFill, { zIndex: 1000 }]} 
            />
          )}
          
          <WelcomeModal />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
