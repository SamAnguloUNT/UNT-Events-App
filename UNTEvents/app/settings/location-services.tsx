import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useEvents } from '@/app/_layout';
import { updateUserPreferences, getUserPreferences } from '@/services/databaseService';

export default function LocationServicesScreen() {
  const { user } = useEvents();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<string>('');

  // Load saved preference from Firebase
  useEffect(() => {
    loadLocationPreference();
  }, [user]);

  const loadLocationPreference = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const result = await getUserPreferences(user.uid);
    
    if (result.success && result.preferences?.locationEnabled !== undefined) {
      setEnabled(result.preferences.locationEnabled);
      
      // If location is enabled, get current location
      if (result.preferences.locationEnabled) {
        await getCurrentLocation();
      }
    }
    
    setLoading(false);
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      
      // Reverse geocode to get readable address
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address[0]) {
        const locationStr = `${address[0].city || ''}, ${address[0].region || ''}`.trim();
        setCurrentLocation(locationStr);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const toggle = async (value: boolean) => {
    if (value) {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to show events near you. Please enable it in your device settings.'
        );
        return;
      }

      // Get current location
      await getCurrentLocation();
    } else {
      setCurrentLocation('');
    }

    setEnabled(value);

    // Save to Firebase if user is logged in
    if (user) {
      const result = await updateUserPreferences(user.uid, {
        locationEnabled: value,
      });

      if (!result.success) {
        Alert.alert('Error', 'Failed to save location preference');
        setEnabled(!value); // Revert on error
        return;
      }
    }

    Alert.alert(
      'Location Access',
      value 
        ? 'Location services enabled. You\'ll see events near you!' 
        : 'Location services disabled.'
    );
  };

  if (loading) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Location Services',
            headerStyle: { backgroundColor: '#00853E' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackTitle: 'Back',
          }}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00853E" />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Location Services',
          headerStyle: { backgroundColor: '#00853E' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitle: 'Back',
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.text}>
            Allow the UNT Events App to access your location to show events near you.
          </Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>
              Location Access: {enabled ? 'Enabled' : 'Disabled'}
            </Text>
            <Switch 
              value={enabled} 
              onValueChange={toggle}
              trackColor={{ false: '#767577', true: '#00853E' }}
              thumbColor={enabled ? '#000' : '#000'}
            />
          </View>

          {enabled && currentLocation && (
            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>Current Location:</Text>
              <Text style={styles.locationText}>{currentLocation}</Text>
              <Text style={styles.helperText}>
                We'll show you events happening nearby first!
              </Text>
            </View>
          )}

          {!user && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                ⚠️ Sign in to save your location preference across devices
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#00853E' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  text: { fontSize: 16, color: '#000', marginBottom: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: { fontWeight: '600', fontSize: 16, color: '#000' },
  locationInfo: {
    backgroundColor: '#f0f9f4',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00853E',
    marginTop: 10,
  },
  locationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00853E',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  warningBox: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffc107',
    marginTop: 20,
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
  },
});