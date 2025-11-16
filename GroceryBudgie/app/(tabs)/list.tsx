import { ScrollView, StyleSheet, View, Pressable, Button, TextInput, Text } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function TabTwoScreen() {
  const [boxes, setBoxes] = useState<string[]>(['Apples', 'Bananas', 'Milk', 'Bread']);
  const [selectedItem, setSelectedItem] = useState<string>('Apples');  
  const [showInput, setShowInput] = useState(false);
  const router = useRouter();
  const removeBox = (index: number) => {
    setBoxes((prev) => prev.filter((_, i) => i !== index));
  };

  const addBox = () => {
    if (selectedItem) {
      setBoxes((prev) => [...prev, selectedItem]);
      setShowInput(false);
    }
  };

  const foodOptions = ['Apples', 'Bananas', 'Milk', 'Bread', 'Carrot', 'Potato', 'Swiss Cheese', 'Tortilla', 'Eggs'];

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
          <Picker
            selectedValue={selectedItem}
            style={styles.picker}
            itemStyle={{ color: '#000000', fontSize: 18, fontFamily: Fonts.rounded }} // picker text
            onValueChange={(itemValue) => setSelectedItem(itemValue)}
            mode="dropdown"
          >
            {foodOptions.map((food) => (
              <Picker.Item key={food} label={food} value={food} />
            ))}
          </Picker>
          <Pressable onPress={addBox} style={styles.addTextContainer}>
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        </View>
      )}
      <Pressable
      onPress={() => {
        router.push('/storeselection');
      }}
      style={{
        backgroundColor: '#BDE1B4',
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#000', fontWeight: 'bold' }}>Where should I shop?</Text>
    </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollBackground: { 
    flex: 1, 
    backgroundColor: '#D1E9F0' 
  },
  scrollContent: { 
    paddingTop: 20, 
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
  picker: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginRight: 10,
  },
  addTextContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  addText: {
    color: '#104911',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: Fonts.rounded,
  },
});
