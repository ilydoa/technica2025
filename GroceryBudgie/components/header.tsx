import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function Header() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/budgie.png')} 
        style={styles.icon} 
        resizeMode="contain"
      />
      <Text style={[styles.title]}>
        Grocery Budgie
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    backgroundColor: '#ECF5FD',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  title: {
    fontSize: 30,
    color: '#000000'
  },
});
