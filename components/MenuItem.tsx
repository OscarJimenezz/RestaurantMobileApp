import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  category: string;
}

const MenuItem: React.FC<MenuItemProps> = ({name, description, price, category}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{`$${price.toFixed(2)}`}</Text>
      <Text style={styles.category}>{category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
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