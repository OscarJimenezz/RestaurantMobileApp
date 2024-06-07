import React, { useState, useEffect, useCallback } from 'react';
import { View, Flat Twext, StyleSheet, TextInput, RefreshControl } from 'react-native';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL; // Ensure the environment variable is set

interface MenuItem {
  id: string;
  name: string;
  description: string;
}

const MenuComponent: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${backendUrl}/menu`);
      setMenuItems(response.data);
      setFilteredItems(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch menu items", error);
      setError("Failed to fetch menu items. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMenuItems();
  }, []);

  // Simple caching for search results
  const searchResultsCache = useRef<{[key: string]: MenuItem[]}>({});

  const searchFilter = useCallback((text: string) => {
    const cacheKey = text.toUpperCase();
    if (searchResultsCache.current[cacheKey]) {
      setFilteredItems(searchResultsCache.current[cacheKey]);
      return;
    }

    if (text) {
      const newData = menuItems.filter(item => {
        const itemData = item.name.toUpperCase();
        return itemData.includes(cacheKey);
      });
      searchResultsCache.current[cacheKey] = newData;
      setFilteredItems(newData);
    } else {
      setFilteredItems(menuItems);
    }
  }, [menuItems]);

  if (loading) {
    return <Text>Loading menu...</Text>;
  }

  if (error) {
    return <View style={styles.container}><Text>{error}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Menu..."
        onChangeText={searchFilter}
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
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