import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, Alert } from 'react-native';

const menuItems = [
  { label: 'Pizza', value: 'pizza' },
  { label: 'Burger', value: 'burger' },
  { label: 'Sushi', value: 'sushi' }, 
];

interface OrderFormData {
  customerName: string;
  deliveryAddress: string;
  selectedItem: string;
}

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    deliveryAddress: '',
    selectedItem: menuItems[0].value // Fixed typo here
  });

  const validateForm = () => {
    if (!formData.customerName) return 'Please enter your name.';
    if (!formData.deliveryAddress) return 'Please enter your delivery address.';
    // Add additional validations as needed
    return '';
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError !== '') {
      Alert.alert('Validation Error', validationError);
      return;
    }
    
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Order placed successfully!');
      } else {
        const errorData = await response.json();
        Alert.alert('Failed', `Failed to place order: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Menu Item</Text>
      <Picker
        selectedValue={formData.selectedItem}
        onValueChange={(itemValue) =>
          setFormData({ ...formData, selectedItem: itemValue })
        }>
        {menuItems.map((item) => (
          <Picker.Item label={item.label} value={item.value} key={item.value} />
        ))}
      </Picker>

      <Text style={styles.label}>Customer Name</Text>
      <TextInput
        style={styles.input}
        value={formData.customerName}
        onChangeText={(text) => setFormData({ ...formData, customerName: text })}
      />

      <Text style={styles.label}>Delivery Address</Text>
      <TextInput // Fixed this line
        style={styles.input}
        value={formData.deliveryAddress}
        onChangeText={(text) =>
          setFormData({ ...formData, deliveryAddress: text })
        }
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
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginTop: 10,
  },
});

export default OrderForm;