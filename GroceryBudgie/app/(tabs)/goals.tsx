import { ScrollView, StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const saved = 74;

  const [goal, setGoal] = useState('100');   // Default goal = $100
  const [editing, setEditing] = useState(false);

  const numericGoal = Number(goal);
  const progress = numericGoal > 0 ? Math.min(saved / numericGoal, 1) : 0;

  return (
    <ScrollView style={styles.scrollBackground} contentContainerStyle={styles.scrollContent}>

      <ThemedText
        type="title"
        style={{ fontFamily: Fonts.rounded, color: '#000000', fontSize: 32 }}
      >
        Your Goals
      </ThemedText>

      {!editing && (
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
          <Text style={styles.editButtonText}>Edit Goal </Text>
        </TouchableOpacity>
      )}

      {editing && (
        <View>
          <Text style={styles.label}>Set new savings goal:</Text>
          <TextInput
            style={styles.goalInput}
            placeholder="e.g., 150"
            keyboardType="numeric"
            value={goal}
            onChangeText={setGoal}
          />

          <TouchableOpacity style={styles.saveButton} onPress={() => setEditing(false)}>
            <Text style={styles.saveButtonText}>Save Goal</Text>
          </TouchableOpacity>
        </View>
      )}
    
      <Text style={styles.savedText}>You've saved: ${saved}</Text>

      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>

      {numericGoal > 0 && (
        <Text style={styles.percentText}>
          {Math.round(progress * 100)}% of your goal reached
        </Text>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollBackground: { flex: 1, backgroundColor: '#D1E9F0' },
  scrollContent: { paddingTop: 30, paddingHorizontal: 20, paddingBottom: 40 },

  editButton: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  editButtonText: {
    fontFamily: Fonts.rounded,
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },

  label: {
    fontFamily: Fonts.rounded,
    fontSize: 18,
    color: '#000000',
    marginTop: 20,
    marginBottom: 8,
  },
  goalInput: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    fontFamily: Fonts.rounded,
    fontSize: 20,
  },
  saveButton: {
    backgroundColor: '#104911',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  saveButtonText: {
    fontFamily: Fonts.rounded,
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },

  savedText: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: Fonts.rounded,
    color: '#000000',
  },

  progressBarBackground: {
    marginTop: 20,
    width: '100%',
    height: 28,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#104911',
    borderRadius: 14,
  },

  percentText: {
    marginTop: 8,
    fontSize: 18,
    fontFamily: Fonts.rounded,
    color: '#000000',
  },
});
