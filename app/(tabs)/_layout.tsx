import CustomTabBar from "@/components/CustomTabBar";
import { Tabs } from "expo-router";
import React from "react";
import { CopilotProvider } from "react-native-copilot";

export default function TabLayoutWithCopilot() {
  return (
    <CopilotProvider
      verticalOffset={-30}
      stopOnOutsideClick
      androidStatusBarVisible
    >
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      </Tabs>
    </CopilotProvider>
  );
}
