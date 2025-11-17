import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../auth-context";

export default function LoginScreen() {
  const { setLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  function handleLogin() {
    setLoggedIn(true);
    router.replace("/(tabs)");
  }

  return (

    <ScrollView style={styles.scrollBackground} contentContainerStyle={styles.scrollContent}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

        <Pressable
            onPress={handleLogin}
            style={{ padding: 12, backgroundColor: "#D1E9F0" }}
        >
            <Text style={{ color: "black" }}>Login</Text>
        </Pressable>
        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    scrollBackground: {
      flex: 1,
      backgroundColor: '#D1E9F0'
    },
    scrollContent: {
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
});