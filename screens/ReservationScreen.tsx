import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';

interface ReservationFormState {
  name: string;
  date: string;
  time: string;
  partySize: string;
  contactInfo: string;
}

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormState>({
    name: '',
    date: '',
    time: '',
    partySize: '1',
    contactInfo: '',
  });

  const handleChange = useCallback((fieldName: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: value }));
  }, []);

  const handleSubmit = async () => {
    try {
      const submissionData = {
        ...formData,
        partySize: parseInt(formData.partySize, 10),
      };
      await axios.post(`${process.env.REACT_APP_API_URL}/reservations`, submissionData);

      alert('Reservation successful');
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('Failed to make reservation');
    }
  };

  return (
    <View style={styles.container}>
      <TextInputField
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInputField
        placeholder="Date (YYYY-MM-DD)"
        value={formData.date}
        onChangeText={(text) => handleChange('date', text)}
      />
      <TextInputField
        placeholder="Time (HH:MM)"
        value={formData.time}
        onChangeText={(text) => handleChange('time', text)}
      />
      <TextInputField
        placeholder="Party Size"
        keyboardType="numeric"
        value={formData.partySize}
        onChangeText={(text) => handleChange('partySize', text.replace(/[^0-9]/g, ''))}
      />
      <TextInputField
        placeholder="Contact Info"
        value={formData.contactOne}
        onChangeText={(text) => handleChange('contactInfo', text)}
      />
      <Button title="Submit Reservation" onPress={handleSubmit} />
    </View>
  );
};

const TextInputField: React.FC<{
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric';
}> = ({ placeholder, value, onChangeText, keyboardType = 'default' }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    keyboardType={keyboardType}
  />
);

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