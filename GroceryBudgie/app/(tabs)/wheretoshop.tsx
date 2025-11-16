import { ScrollView, StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { Fonts } from '@/constants/theme';
import StoreCard from '@/components/store-card';

export default function TabTwoScreen() {
  const groceryItems = ['Apples', 'Bananas', 'Milk', 'Bread'];

  const storePrices: Record<string, Record<string, number>> = {
    Target: { Apples: 4.49, Bananas: 3.99, Milk: 3.25, Bread: 3.48 },
    Wegmans: { Apples: 2.99, Bananas: 2.65, Milk: 3.57, Bread: 3.68 },
    "Trader Joe's": { Apples: 4.83, Bananas: 2.10, Milk: 4.21, Bread: 2.81 },
    "Harris Teeter": { Apples: 3.50, Bananas: 2.99, Milk: 5.99, Bread: 4.16 },
  };

  const storeLogos: Record<string, any> = {
    Target: require('./assets/target.png'),
    Wegmans: require('./assets/wegmans.png'),
    "Trader Joe's": require('./assets/trader-joes-logo.png'),
    "Harris Teeter": require('./assets/harris-teeter.png'),
  };

  const stores = Object.keys(storePrices);
  const [showAll, setShowAll] = useState(false);

  const lowestStore = stores.reduce((prev, curr) => {
    const prevTotal = Object.values(storePrices[prev]).reduce((a, b) => a + b, 0);
    const currTotal = Object.values(storePrices[curr]).reduce((a, b) => a + b, 0);
    return currTotal < prevTotal ? curr : prev;
  }, stores[0]);

  const displayedStores = showAll ? stores : [lowestStore];

  return (
    <ScrollView style={styles.scrollBackground} contentContainerStyle={styles.scrollContent}>
      {/* Budgie + Bubble */}
      <View style={styles.budgieBubbleRow}>
        <Image source={require('../../assets/images/budgie.png')} style={styles.logo} />
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>You should shop at...</Text>
          <View style={styles.bubbleTail} />
        </View>
      </View>

      {/* Stores */}
      {displayedStores.map((store) => {
        const prices = storePrices[store];
        const total = Object.values(prices).reduce((sum, price) => sum + price, 0);
        return (
          <View key={store} style={styles.storeSection}>
            <StoreCard
              storeName={store}
              storeLogo={storeLogos[store]}
              price={total.toFixed(2)}
            />
            <View style={styles.table}>
              <Text style={styles.tableTitle}>Items at {store}</Text>
              {groceryItems.map((item) => (
                <View key={item} style={styles.row}>
                  <Text style={styles.cell}>{item}</Text>
                  <Text style={styles.cell}>${prices[item].toFixed(2)}</Text>
                </View>
              ))}
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        );
      })}

      <View style={{ marginTop: 10, alignItems: 'center' }}>
        <Pressable
          onPress={() => setShowAll(!showAll)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#a0d7a0' : '#BDE1B4', // changes color when pressed
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            },
          ]}
        >
          <Text style={{ fontFamily: Fonts.rounded, fontSize: 16, color: '#000', textAlign: 'center' }}>
            {showAll ? "Show Only Lowest Store" : "Show All Stores"}
          </Text>
        </Pressable>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollBackground: { flex: 1, backgroundColor: '#D1E9F0' },
  scrollContent: { paddingTop: 40, paddingHorizontal: 20, paddingBottom: 40 },
  budgieBubbleRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 30, justifyContent: 'flex-start' },
  logo: { width: 80, height: 80, resizeMode: 'contain', marginRight: -25, marginTop: 60 },
  bubble: { backgroundColor: '#ffffff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, maxWidth: '70%', borderWidth: 1, borderColor: '#104911', position: 'relative' },
  bubbleText: { fontFamily: Fonts.rounded, fontSize: 20, color: '#000000' },
  bubbleTail: { width: 0, height: 0, borderLeftWidth: 12, borderRightWidth: 12, borderTopWidth: 15, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#ffffff', position: 'absolute', left: 20, bottom: -13 },
  storeSection: { marginBottom: 20, alignItems: 'center' },
  table: { backgroundColor: '#ffffff', padding: 12, borderRadius: 12, marginTop: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2, width: '90%', alignSelf: 'center' },
  tableTitle: { fontSize: 18, fontFamily: Fonts.rounded, fontWeight: 'bold', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  cell: { fontSize: 16, fontFamily: Fonts.rounded },
  totalRow: { borderTopWidth: 1, borderTopColor: '#ccc', marginTop: 6, paddingTop: 4, alignItems: 'flex-end' },
  totalText: { fontSize: 16, fontWeight: 'bold', fontFamily: Fonts.rounded },
});
