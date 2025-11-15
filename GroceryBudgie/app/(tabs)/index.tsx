import {ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.scrollBackground} contentContainerStyle={styles.scrollContent}>
          <ThemedText
            type="title"
            style={{ fontFamily: Fonts.rounded, color: '#000000', fontSize: 32 }}
          >
            Grocery Budgie
          </ThemedText>
    </ScrollView>
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
});
