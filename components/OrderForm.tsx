import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

interface OrderFormValues {
  customerName: string;
  deliveryAddress: string;
  menuItem: string;
  quantity: number; // Adding quantity
  totalPrice: number; // Adding totalPrice for summary
}

const OrderForm: React.FC = () => {
  const [formValues, setFormValues] = useState<OrderFormValues>({
    customerName: '',
    deliveryAddress: '',
    menuItem: '',
    quantity: 1, // Initialize quantity as 1
    totalPrice: 0, // Initialize totalPrice as 0
  });

  // Function to calculate prices for demonstration
  const calculatePrice = useCallback((menuItem: string, quantity: number): number => {
    const prices: { [key: string]: number } = {
      Pizza: 10,
      Burger: 5,
      Sushi: 15,
      Salad: 7,
    };

    return (prices[menuItem] || 0) * quantity;
  }, []);

  const handleInputChange = useCallback((field: keyof OrderformValues, value: string | number) => {
    setFormValues((currentValues) => {
      const newValues = {
        ...currentValues,
        [field]: value,
      };

      // If the field changed is menuItem or quantity, we update the totalPrice accordingly
      if (field === 'menuItem' || field === 'quantity') {
        const quantity = field === 'quantity' ? value as number : currentValues.quantity;
        const menuItem = field === 'menuItem' ? value as string : currentValues.menuItem;
        newValues.totalPrice = calculatePrice(menuItem, quantity);
      }

      return newValues;
    });
  }, [calculatePrice]);

  const validateForm = (): boolean => {
    const { customerName, deliveryAddress, menuItem, quantity } = formValues;
    if (!customerName || !deliveryAddress || !menuItem || quantity < 1) {
      Alert.alert('Error', 'Please fill in all fields and ensure quantity is at least 1.');
      return false;
    }
    return true;
  }

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      Alert.alert('Order Submitted', `Thank you, ${formValues.customerName}! Your order for ${formValues.quantity}x ${formValues.menuItem} will be delivered to ${formValues.deliveryAddress}. Total Price: $${formValues.totalPrice}`);
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
      <TextInput // Adding a TextInput for quantity
        style={styles.input}
        placeholder="Quantity"
        keyboardType="number-pad"
        value={formValues.quantity.toString()}
        onChangeText={(text) => handleInputChange('quantity', parseInt(text) || 1)}
      />
      {/* Displaying Order Summary */}
      <Text style={styles.summary}>Order Summary:</Text>
      <Text>{`${formValues.quantity}x ${formValues.menuItem} - Total: $${formValues.totalPrice}`}</Text>
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
  summary: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default OrderForm;