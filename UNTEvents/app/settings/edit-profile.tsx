import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditProfileScreen() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    Alert.alert('Profile Updated', 'Your changes have been saved.');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Edit Profile',
          headerStyle: { backgroundColor: '#00853E' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
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
