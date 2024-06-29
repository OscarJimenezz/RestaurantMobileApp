import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface ReservationDetails {
  customerName: string;
  reservationDate: string;
  reservationTime: string;
  numberOfGuests: string;
  contactInformation: CalculatedNameType;
}

export const ReservationForm = () => {
  const [reservationData, setReservationData] = useState<ReservationDetails>({
    customerName: '',
    reservationDate: '',
    reservationTime: '',
    numberOfGuests: '1',
    contactInformation: '',
  });

  const updateReservationData = useCallback((detailKey: keyof ReservationDetails, detailValue: string) => {
    setReservationData(previousData => ({ ...previousData, [detailKey]: detailValue }));
  }, []);

  const submitReservation = useCallback(() => {
    const formattedSubmissionData = {
      ...reservationData, 
      numberOfGuests: parseInt(reservationData.numberOfGuests, 10) || 1 
    };
    console.log('Reservation data submitted:', formattedSubmissionData);
  }, [reservationData]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reservation Form</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={reservationData.customerName}
        onChangeText={(newValue) => updateReservationData('customerName', newValue)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={reservationData.reservationDate}
        onChangeText={(newValue) => updateReservationData('reservationDate', newValue)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={reservationData.reservationTime}
        onChangeText={(newValue) => updateReservationData('reservationTime', newValue)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Party Size"
        keyboardType="number-pad"
        value={reservationData.numberOfGuests}
        onChangeText={(newValue) => updateReservationData('numberOfGuests', newValue)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contact Info"
        value={reservationData.contactInformation}
        onChangeText={(newValue) => updateReservationData('contactInformation', newValue)}
      />
      
      <Button title="Submit" onPress={submitData} />
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