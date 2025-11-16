import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ChangePasswordScreen() {   // 👈 default export
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleChange = () => {
    if (!current || !newPass || !confirm) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    if (newPass !== confirm) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }
    Alert.alert('Success', 'Your password has been updated.');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Change Password',
          headerStyle: { backgroundColor: '#00853E' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={current}
            onChangeText={setCurrent}
          />

          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={newPass}
            onChangeText={setNewPass}
          />

          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />

          <TouchableOpacity style={styles.button} onPress={handleChange}>
            <Text style={styles.buttonText}>Update Password</Text>
          </TouchableOpacity>
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
  label: { fontWeight: '600', marginBottom: 8, color: '#000' },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00853E',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    padding: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
