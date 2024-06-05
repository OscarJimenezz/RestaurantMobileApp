import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TextInput, RefreshControl } from 'react-native';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL; // Ensure the environment variable is set

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

const MenuComponent: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]); // For Search
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // For error handling
  const [refreshing, setRefreshing] = React.useState(false); // For refresh control

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${backendUrl}/menu`);
      setMenuItems(response.data);
      setFilteredItems(response.data); // Initially, filtered items are the same as all items
      setError(null); // Reset error state on successful fetch
    } catch (error) {
      console.error("Failed to fetch menu items", error);
      setError("Failed to fetch menu items. Please try again."); // Set error state
    } finally {
      setLoading(false);
      setRefreshing(false); // Reset refreshing state
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMenuItems();
  }, []);

  const searchFilter = (text: string) => {
    if (text) {
      const newData = menuItems.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredItems(newData);
    } else {
      setFilteredItems(menuItems);
    }
  };

  if (loading) {
    return <Text>Loading menu...</Text>;
  }

  if (error) {
    return (<View style={styles.container}><Text>{error}</Text></View>);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Menu..."
        onChangeText={(text) => searchFilter(text)}
      />
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  },
  searchBar: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#f0eeee',
  },
});

export default MenuComponent;