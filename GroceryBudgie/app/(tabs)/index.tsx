import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Header } from '@/components/header';
import StoreCard from '@/components/store-card';

export default function HomeScreen() {
  return (
    <>
      <Header />
      <ScrollView style={styles.scrollBackground} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.textStyle}>You've Saved:</Text>
        <Text style={styles.dollar}>$</Text>
        <Text>74</Text>
        <Text>Went shopping?</Text>
        <TouchableOpacity><Text>Upload Receipt</Text></TouchableOpacity>
        <Text>Going shopping?</Text>
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
    backgroundColor: '#ECF5FD'
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
  dollar: {
    flexDirection: 'row'
  },
  container: {
    flexDirection: 'row', // Align children in a row
    flexWrap: 'wrap', // Allow items to wrap into a new row if needed
    justifyContent: 'space-between', // Add space between the items
  },
});
