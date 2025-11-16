import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function LocationServicesScreen() {   // 👈 default export
  const [enabled, setEnabled] = useState(false);

  const toggle = (value: boolean) => {
    setEnabled(value);
    Alert.alert('Location Access', value ? 'Enabled' : 'Disabled');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Location Services',
          headerStyle: { backgroundColor: '#00853E' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
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
            <Switch value={enabled} onValueChange={toggle} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#00853E' },
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
  },
  label: { fontWeight: '600', fontSize: 16, color: '#000' },
});
