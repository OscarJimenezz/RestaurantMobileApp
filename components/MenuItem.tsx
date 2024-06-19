import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string; // Optional imageUrl property
}

const MenuItem: React.FC<MenuItemProps> = ({name, description, price, category, imageUrl}) => {
  return (
    <View style={styles.container}>
      {imageUrl && <Image source={{uri: imageUrl}} style={styles.image} />} {/* Display the image if imageUrl is provided */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{`$${price.toFixed(2)}`}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Adjust layout to accommodate image
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center', // Align items in the center vertically
  },
  textContainer: {
    flex: 1, // Take up remaining space after image
  },
  image: {
    width: 60, // Set image width
    height: 60, // Set image height
    borderRadius: 30, // Make the image round
    marginRight: 20, // Space between image and text
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  category: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 5,
  },
});

export default MenuItem;