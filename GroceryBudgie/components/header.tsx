import { Text, View, StyleSheet, Image } from "react-native";
import { useFonts, GamjaFlower_400Regular } from '@expo-google-fonts/gamja-flower';

export function Header() {

  const [fontsLoaded] = useFonts({
    GamjaFlower_400Regular,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <View style={styles.headerContainer}>
      <Image source={require('./budgie.png')} style={styles.logo} />
      <Text style={styles.headerText}>Grocery Budgie</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    paddingTop: 50,        
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    elevation: 4,         
    shadowColor: "#000",  
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  headerText: {
    fontFamily: "GamjaFlower_400Regular",
    fontSize: 28,
  },
});

