import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface ReservationFormState {
  name: string;
  date: string;
  time: string;
  partySize: number;
  contactInfo: string;
}

export const ReservationForm = () => {
  const [formData, setFormData] = useState<ReservationFormState>({
    name: '',
    date: '',
    time: '',
    partySize: 1,
    contactInfo: '',
  });

  const handleInputChange = (inputName: keyof ReservationFormState, value: string) => {
    setFormData({ ...formData, [inputName]: value });
  };

  const handleSubmit = () => {
    console.log('Form data submitted:', formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reservation Form</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={formData.date}
        onChangeText={(value) => handleInputChange('date', value)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={formData.time}
        onChangeText={(value) => handleInputChange('time', value)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Party Size"
        keyboardType="number-pad"
        value={formData.partySize.toString()}
        onChangeText={(add) => handleInputChange('partySize', value)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contact Info"
        value={formData.contactInfo}
        onChangeText={(value) => handleInputChange('contactInfo', value)}
      />
      
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
});