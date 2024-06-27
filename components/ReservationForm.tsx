import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface ReservationFormState {
  name: string;
  date: string;
  time: string;
  partySize: string; // Changed to string to handle input directly
  contactInfo: string;
}

export const ReservationForm = () => {
  const [formData, setFormData] = useState<ReservationFormState>({
    name: '',
    date: '',
    time: '',
    partySize: '1', // Changed to a string to match the input type
    contactInfo: '',
  });

  const handleInputChange = useCallback((inputName: keyof ReservationFormState, value: string) => {
    setFormData(prevFormData => ({ ...prevFormData, [inputName]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    const submissionData = { ...formData, partySize: parseInt(formData.partySize, 10) || 1 };
    console.log('Form data submitted:', submissionData);
    // Here, before final submission or further process, convert partySize back to number if necessary
  }, [formData]);

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
        value={formData.partySize}
        onChangeText={(value) => handleInputChange('partySize', value)}
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