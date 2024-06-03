import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

const MenuComponent: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${backendUrl}/menu`);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Failed to fetch menu items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuTransitionerromBackend();
  }, []);

  if (loading) {
    return <Text>Loading menu...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  menuItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  menuItemName: {
    fontWeight: 'bold',
  }
});

export default MenuComponent;