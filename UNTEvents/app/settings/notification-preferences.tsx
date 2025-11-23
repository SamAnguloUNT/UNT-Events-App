import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEvents } from '../_layout';
import { saveUserPreferences, getUserPreferences } from '@/services/databaseService';

function NotificationPreferencesScreen() {
  const { user } = useEvents();
  const [selectedTime, setSelectedTime] = useState(15); // Default: 15 minutes before
  const [loading, setLoading] = useState(true);

  // Load saved preference when screen loads
  useEffect(() => {
    const loadPreferences = async () => {
      if (user) {
        const result = await getUserPreferences(user.uid);
        if (result.success && result.preferences?.notificationTime) {
          setSelectedTime(result.preferences.notificationTime);
        }
      }
      setLoading(false);
    };
    
    loadPreferences();
  }, [user]);

  const timeOptions = [
    { label: '15 minutes before', value: 15, icon: 'time-outline' },
    { label: '30 minutes before', value: 30, icon: 'time-outline' },
    { label: '1 hour before', value: 60, icon: 'time-outline' },
    { label: '2 hours before', value: 120, icon: 'time-outline' },
    { label: '1 day before', value: 1440, icon: 'calendar-outline' },
  ];

  const handleSelectTime = async (value: number) => {
    setSelectedTime(value);
    
    // Save to Firebase if user is logged in
    if (user) {
      await saveUserPreferences(user.uid, {
        notificationTime: value
      });
    }
    
    const selectedOption = timeOptions.find(t => t.value === value);
    Alert.alert('Preference Saved', `You'll be notified ${selectedOption?.label}`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Notification Preferences',
          headerStyle: { backgroundColor: '#00853E' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="notifications" size={48} color="#fff" />
          <Text style={styles.headerTitle}>When should we remind you?</Text>
          <Text style={styles.headerSubtitle}>
            Choose when you'd like to receive notifications for saved events
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Reminder Time</Text>
          
          {timeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                selectedTime === option.value && styles.optionButtonSelected
              ]}
              onPress={() => handleSelectTime(option.value)}
            >
              <Ionicons 
                name={option.icon as any} 
                size={24} 
                color={selectedTime === option.value ? '#00853E' : '#666'} 
              />
              <Text style={[
                styles.optionText,
                selectedTime === option.value && styles.optionTextSelected
              ]}>
                {option.label}
              </Text>
              {selectedTime === option.value && (
                <Ionicons name="checkmark-circle" size={24} color="#00853E" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={24} color="#00853E" />
          <Text style={styles.infoText}>
            Notifications will be sent to your device at the selected time before each saved event starts.
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

export default NotificationPreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00853E',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  optionButtonSelected: {
    borderColor: '#00853E',
    backgroundColor: '#e8f5e9',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
  },
  optionTextSelected: {
    color: '#00853E',
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    lineHeight: 20,
  },
});