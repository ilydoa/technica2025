import { ScrollView, StyleSheet, View, Pressable, Button, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Fonts } from '@/constants/theme';
import StoreCard from '@/components/store-card';
import { useRouter } from "expo-router";
import { ThemedText } from '@/components/themed-text';


export default function TabTwoScreen() {
  const router = useRouter();


  return (
    <ScrollView style={styles.scrollBackground} contentContainerStyle={styles.scrollContent}>
      <ThemedText
        type="title"
        style={{ flexDirection: 'row', fontFamily: Fonts.rounded, color: '#000000', fontSize: 20, justifyContent: 'center', textAlign: 'center' }}
      >
        Which store are you visiting?
      </ThemedText>

      <View style={styles.container}>
        <View style={styles.cardWrapper}>
          <TouchableOpacity
            onPress={() => router.push({
              pathname: "/storeDetails",
              params: { storeName: "Target" }
            })}
          >
            <StoreCard storeName="Target" storeLogo={require('./assets/target.png')} price="15.21" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardWrapper}>
          <TouchableOpacity
            onPress={() => router.push({
              pathname: "/storeDetails",
              params: { storeName: "Wegmans" }
            })}
          >
            <StoreCard storeName="Wegmans" storeLogo={require('./assets/wegmans.png')} price="12.89" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardWrapper}>
          <TouchableOpacity
          onPress={() => router.push({
              pathname: "/storeDetails",
              params: { storeName: "Trader Joe's" }
            })}>
            <StoreCard storeName="Trader Joe's" storeLogo={require('./assets/trader-joes-logo.png')} price="13.95" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardWrapper}>
          <TouchableOpacity
          onPress={() => router.push({
              pathname: "/storeDetails",
              params: { storeName: "Harris Teeter" }
            })}>
            <StoreCard storeName="Harris Teeter" storeLogo={require('./assets/harris-teeter.png')} price="16.64" />
          </TouchableOpacity>
        </View>
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
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    fontFamily: Fonts.rounded,
    fontSize: 18,
  },
  boxContainer: {
    marginTop: 10,
    marginBottom: 10
  },
  groceryItemBox: {
    backgroundColor: '#ECF5FD',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  groceryItemText: {
    color: '#000000',
    fontSize: 25,
    fontFamily: Fonts.rounded,
    lineHeight: 25,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },

});