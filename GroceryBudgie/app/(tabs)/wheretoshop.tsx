import { ScrollView, StyleSheet, View, Pressable, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';

const groceryList = [
  'Apples',
  'Bananas',
  'Milk',
  'Bread',
  ];

export default function TabTwoScreen() {


  return (
    <ScrollView style={styles.scrollBackground} contentContainerStyle={styles.scrollContent}>
      <ThemedText
        type="title"
        style={{ fontFamily: Fonts.rounded, color: '#000000', fontSize: 32 }}
      >
        You should shop at...
      </ThemedText>
      
     
      <Button title="See All Options" color="BDE1B4"/>
      <Button title="Back to Groceries" color="BDE1B4"/>
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

});
