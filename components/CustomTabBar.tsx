import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CopilotStep, walkthroughable } from "react-native-copilot";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? "light"].tint;
  const WalkthroughableView = walkthroughable(View);

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const color = isFocused ? activeColor : "#888";

        const onPress = () => {
          if (!isFocused) navigation.navigate(route.name);
        };

        // Home Tab
        if (route.name === "index") {
          return (
            <CopilotStep
              key={route.key}
              text="Expo Video showcase is here!"
              order={2}
              name="homeTab"
            >
              <WalkthroughableView collapsable={false} style={styles.tabItem}>
                <TouchableOpacity onPress={onPress} style={styles.tabButton}>
                  <Ionicons size={28} name="play" color={color} />
                  <Text style={[styles.tabLabel, { color }]}>Expo Video</Text>
                </TouchableOpacity>
              </WalkthroughableView>
            </CopilotStep>
          );
        }

        // Explore Tab
        if (route.name === "explore") {
          return (
            <CopilotStep
              key={route.key}
              text="Explore React Native Copilot showcase in here!"
              order={3}
              name="exploreTab"
            >
              <WalkthroughableView style={styles.tabItem}>
                <TouchableOpacity onPress={onPress} style={styles.tabButton}>
                  <Ionicons size={28} name="accessibility" color={color} />
                  <Text style={[styles.tabLabel, { color }]}>
                    React Native Copilot
                  </Text>
                </TouchableOpacity>
              </WalkthroughableView>
            </CopilotStep>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={onPress}
          >
            <Text style={{ color }}>{route.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
    paddingBottom: 5,
    marginBottom: 60,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  tabLabel: {
    fontSize: 11,
  },
});
