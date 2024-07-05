import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

interface OrderFormValues {
  customerName: string;
  deliveryAddress: string;
  menuItem: string;
}

const OrderForm: React.FC = () => {
  const [formValues, setFormValues] = useState<OrderOlues>({
    customerName: '',
    deliveryAddress: '',
    menuItem: '',
  });

  const handleInputChange = useCallback((field: keyof OrderFormValues, value: string) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }, []);

  const validateForm = (): boolean => {
    const { customerName, deliveryAddress, menuItem } = formValues;
    if (!customerName || !deliveryAddress || !menuItem) {
      Alert.alert('Error', 'Please fill in all fields.');
      return false;
    }
    return true;
  }

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      Alert.alert('Order Submitted', `Thank you, ${formValues.customerName}! Your order for ${formValues.menuItem} will be delivered to ${formValues.deliveryAddress}.`);
    }
  }, [formValues]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={formValues.customerName}
        onChangeText={(text) => handleInputChange('customerName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Delivery Address"
        value={formValues.deliveryAddress}
        onChangeText={(text) => handleInputChange('deliveryAddress', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Menu Item"
        value={formValues.menuItem}
        onChangeText={(text) => handleInputChange('menuItem', text)}
      />
      <Button title="Submit Order" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
});

export default OrderForm;