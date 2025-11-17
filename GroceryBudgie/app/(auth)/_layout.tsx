import { Redirect, Slot } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../auth-context";

export default function AuthLayout() {
  const { loggedIn } = useContext(AuthContext);

  if (loggedIn) return <Redirect href="/(tabs)" />;

  return <Slot />;
}