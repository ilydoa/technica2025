import { useContext } from "react";
import { AuthContext } from "../auth-context";
import { Redirect, Tabs } from "expo-router";
import { View } from "react-native";
import { Header } from "@/components/header";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { HapticTab } from "@/components/haptic-tab";
import AntDesign from "@expo/vector-icons/AntDesign";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
  const { loggedIn } = useContext(AuthContext);
  const colorScheme = useColorScheme();

  if (!loggedIn) return <Redirect href="/(auth)/login" />;

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: { justifyContent: "space-around" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="list"
          options={{
            title: "List",
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="bars" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="camera"
          options={{
            title: "Camera",
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="camera" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="goals"
          options={{
            title: "Goals",
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="bar-chart" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="wheretoshop"
          options={{
            title: "Shops",
            tabBarIcon: ({ color }) => (
              <AntDesign size={28} name="shopping-cart" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="storeselection"
          options={{
            title: "StoreSelection",
            tabBarButton: () => null,
          }}
        />
      </Tabs>
    </View>
  );
}
