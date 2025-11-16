import { View, Text, StyleSheet, Image, ScrollView, Pressable} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function StoreDetails() {
  const { storeName } = useLocalSearchParams();

  const sampleItems = [
    { item: "Spinach", price: 0.99 },
    { item: "Milk", price: 3.49 },
    { item: "Eggs", price: 2.99 },
  ];
  const storeLogos: Record<string, any> = {
    Target: require('./(tabs)/assets/target.png'),
    Wegmans: require('./(tabs)/assets/wegmans.png'),
    "Trader Joe's": require('./(tabs)/assets/trader-joes-logo.png'),
    "Harris Teeter": require('./(tabs)/assets/harris-teeter.png'),
  };
  const logo = storeLogos[storeName as string];
  const router = useRouter();

  return (
    <ScrollView style={styles.scrollBackground} contentContainerStyle={styles.scrollContent}>
    <Pressable
            onPress={() => router.back()} 
            style={{
              backgroundColor: '#BDE1B4',
              padding: 10,
              borderRadius: 8,
              marginBottom: 20,
              alignSelf: 'flex-start',
            }}
          >
            <Text style={{ color: '#000', fontWeight: 'bold' }}>← Back</Text>
          </Pressable>

    <View style={styles.container}> 
    {logo && <Image source={logo} style={styles.storeLogo} />}
    <Text style={styles.title}>{storeName}</Text>
    <View style={styles.budgieBubbleRow}>
        <Image source={require('../assets/images/budgie.png')} style={styles.logo} />
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>You should buy...</Text>
          <View style={styles.bubbleTail} />
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.rowHeader}>
          <Text style={styles.cellHeader}>Store</Text>
          <Text style={styles.cellHeader}>Item</Text>
          <Text style={styles.cellHeader}>Price</Text>
        </View>

        {sampleItems.map((entry, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{storeName}</Text>
            <Text style={styles.cell}>{entry.item}</Text>
            <Text style={styles.cell}>${entry.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollBackground: { flex: 1, backgroundColor: '#D1E9F0' },
  scrollContent: { paddingTop: 40, paddingHorizontal: 20, paddingBottom: 40 },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#D1E9F0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
  },
  rowHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
  },
  cellHeader: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  storeLogo: {
  width: 50,
  height: 50,
  resizeMode: 'contain',
  alignSelf: 'center',  
  marginTop: 20,       
  marginBottom: 10,  
},
  budgieBubbleRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20, justifyContent: 'flex-start' },
  logo: { width: 80, height: 80, resizeMode: 'contain', marginRight: -25, marginTop: 60 },
  bubble: { backgroundColor: '#ffffff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, maxWidth: '70%', borderWidth: 1, borderColor: '#104911', position: 'relative' },
  bubbleText: { fontFamily: Fonts.rounded, fontSize: 20, color: '#000000' },
  bubbleTail: { width: 0, height: 0, borderLeftWidth: 12, borderRightWidth: 12, borderTopWidth: 15, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#ffffff', position: 'absolute', left: 20, bottom: -13 },
});
