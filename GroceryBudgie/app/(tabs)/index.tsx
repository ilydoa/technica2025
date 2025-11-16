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
        <Text style={styles.textStyle}>Went shopping? Go to camera and upload the receipt!</Text>
        <Text></Text>
        <Text style={styles.textStyle}>Going shopping? </Text>
        <Text></Text>
        <View style={styles.container}>
          <View style={styles.cardWrapper}>
            <StoreCard storeName="Target" storeLogo={require('./assets/target.png')} price="15.21" />
          </View>

          <View style={styles.cardWrapper}>
            <StoreCard storeName="Wegmans" storeLogo={require('./assets/wegmans.png')} price="12.89" />
          </View>

          <View style={styles.cardWrapper}>
            <StoreCard storeName="Trader Joe's" storeLogo={require('./assets/trader-joes-logo.png')} price="13.95" />
          </View>

          <View style={styles.cardWrapper}>
            <StoreCard storeName="Harris Teeter" storeLogo={require('./assets/harris-teeter.png')} price="16.64" />
          </View>
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
    textAlign: 'center',
    fontSize: 20, 
    fontFamily: Fonts.rounded,
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
  cardWrapper: {
    width: '48%',   
    marginBottom: 16,  
  },
});
