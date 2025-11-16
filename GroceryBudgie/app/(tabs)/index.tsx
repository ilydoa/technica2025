import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import StoreCard from '@/components/store-card';

export default function HomeScreen() {
  return (
    <>
     
      <ScrollView style={styles.scrollBackground} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.textStyle}>You've Saved:</Text>
        <Text style={styles.amount}>$74</Text>
        <Text>Went shopping? Go to camera and upload the receipt!</Text>
        <Text></Text>
        <Text>Going shopping?</Text>
        <Text></Text>
        <View style={styles.container}>
          <StoreCard storeName="Target" storeLogo={require('./assets/target.png')} price="67.95" />
          <StoreCard storeName="Wegmans" storeLogo={require('./assets/wegmans.png')} price="80.64" />
          <StoreCard storeName="Trader Joe's" storeLogo={require('./assets/trader-joes-logo.png')} price="98.95" />
          <StoreCard storeName="Harris Teeter" storeLogo={require('./assets/harris-teeter.png')} price="90.64" />
        </View>
      </ScrollView>
    </>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    color: '#0000000'
  },
  textStyle: {
    textAlign: 'center'
  },
  amount: {
    textAlign: 'center',
    fontFamily: "GamjaFlower_400Regular",
    fontSize: 100,
  },
  dollar: {
    flexDirection: 'row'
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
  },
});
