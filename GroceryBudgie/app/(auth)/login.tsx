import { View, Text, Pressable } from "react-native";
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <Pressable
        onPress={handleLogin}
        style={{ padding: 12, backgroundColor: "black" }}
      >
        <Text style={{ color: "white" }}>Login</Text>
      </Pressable>
    </View>
  );
}