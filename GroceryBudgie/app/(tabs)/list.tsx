import { ScrollView, StyleSheet, View, Pressable, Button, TextInput, Text } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const [boxes, setBoxes] = useState<string[]>([
  'Apples',
  'Bananas',
  'Milk',
  'Bread',
  ]);
  const [inputText, setInputText] = useState('');  
  const [showInput, setShowInput] = useState(false);

  const removeBox = (index: number) => {
    setBoxes((prev) => prev.filter((_, i) => i !== index));
  };

  const addBox = () => {
    if (inputText.trim() !== '') {
      setBoxes((prev) => [...prev, inputText.trim()]);
      setInputText('');    
      setShowInput(false);
    }
  };

  return (
    <ScrollView style={styles.scrollBackground} contentContainerStyle={styles.scrollContent}>
      <ThemedText
        type="title"
        style={{ fontFamily: Fonts.rounded, color: '#000000', fontSize: 32 }}
      >
        Your Grocery List
      </ThemedText>
      
      {boxes.map((box, index) => (
        <View key={index} style={styles.boxContainer}>
          <View style={styles.groceryItemBox}>
            <Pressable style={styles.checkboxContainer} onPress={() => removeBox(index)}>
              <View style={styles.checkboxChecked} />
            </Pressable>
            <ThemedText style={styles.groceryItemText}>{box}</ThemedText>
          </View>
        </View>
      ))}

      {!showInput && (
        <View style={styles.addButtonContainer}>
          <Pressable onPress={() => setShowInput(true)} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Item</Text>
          </Pressable>
        </View>
      )}
      
      {showInput && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter item name"
            value={inputText}
            onChangeText={setInputText}
          />
          <View style={styles.addButtonContainer}>
            <Button title="Add" onPress={addBox} color="#104911" />
          </View>
        </View>
      )}

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
    fontSize: 20, 
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
  addButtonContainer: {
    marginVertical: 20,
    alignItems: 'flex-end',
    borderRadius: 10,
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: '#104911',
    borderWidth: 2,  
    borderRadius: 4,
  },
  addButtonText: {
    color: '#104911',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxChecked: { 
    width: 16,   
    height: 16,
    borderRadius: 2,
  },
});
