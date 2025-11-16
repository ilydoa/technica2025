import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

interface StoreCardProps {
  storeName: string;
  storeLogo: any; // You can replace this with the appropriate image source
  price: string;
}

const StoreCard: React.FC<StoreCardProps> = ({ storeName, storeLogo, price }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={storeLogo} style={styles.storeLogo} />
      <Text style={styles.storeName}>{storeName}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width / 2 - 20, // Adjust width based on your design
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  storeLogo: {
    width: 50, // Adjust logo size
    height: 50,
    resizeMode: 'contain',
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default StoreCard;
