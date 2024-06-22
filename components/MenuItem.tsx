import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface MenuItemDetails {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

const MenuItemCard: React.FC<MenuItemDetails> = ({
  name,
  description,
  price,
  category,
  imageUrl,
}) => {
  return (
    <View style={styles.cardContainer}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.menuItemImage} />}
      <View style={styles.textBlock}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
        <Text style={styles.itemPrice}>{`$${price.toFixed(2)}`}</Text>
        <Text style={styles.itemCategory}>{category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  textBlock: {
    flex: 1,
  },
  menuItemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  itemCategory: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 5,
  },
});

export default MenuItemCard;