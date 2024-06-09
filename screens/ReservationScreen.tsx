import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';

interface ReservationFormState {
  name: string;
  date: string;
  time: string;
  partySize: string; // Changed to string to optimize TextInput handling
  contactInfo: string;
}

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormState>({
    name: '',
    date: '',
    time: '',
    partySize: '1', // Changed to string
    contactInfo: '',
  });

  // Use useCallback to prevent unnecessary function recreation
  const handleChange = useCallback((name: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const handleSubmit = async () => {
    try {
      // Convert partySize back to number before sending
      const submissionData = {
        ...formData,
        partySize: parseInt(formData.partySize, 10),
      };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/reservations`, submissionData);
      alert('Reservation successful');
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('Failed to make reservation');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={formData.date}
        onChangeText={(text) => handleChange('date', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={formData.time}
        onChangeText={(text) => handleChange('time', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Party Size"
        keyboardType="numeric"
        value={formData.partySize}
        onChangeText={(text) => handleChange('partySize', text.replace(/[^0-9]/g, ''))}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Info"
        value={formData.contactInfo}
        onChangeText={(text) => handleChange('contactInfo', text)}
      />
      <Button title="Submit Reservation" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ReservationForm;