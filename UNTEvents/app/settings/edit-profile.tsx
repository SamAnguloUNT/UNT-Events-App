import { Stack, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useEvents } from '../_layout';
import { updateProfile } from 'firebase/auth';
import { updateUserProfile, getUserProfile } from '@/services/databaseService';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, refreshUser } = useEvents();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load current user data when screen opens
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        // Set name from Firebase Auth
        setName(user.displayName || '');
        
        // Load bio from Firestore
        const result = await getUserProfile(user.uid);
        if (result.success && result.profile?.bio) {
          setBio(result.profile.bio);
        }
      }
      setLoading(false);
    };
    
    loadUserData();
  }, [user]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'You must be logged in to update your profile');
      return;
    }

    setSaving(true);

    try {
      // Update display name in Firebase Auth
      await updateProfile(user, {
        displayName: name.trim()
      });

      // Reload user to get fresh data
      await user.reload();

      // Update bio in Firestore
      await updateUserProfile(user.uid, {
        bio: bio.trim(),
        displayName: name.trim()
      });

      // Refresh user in context to update UI everywhere
      await refreshUser();

      Alert.alert('Success', 'Your profile has been updated!');
      router.back();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
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
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </>
    );
  }

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
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity 
            style={[styles.button, saving && styles.buttonDisabled]} 
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#00853E' 
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  label: { 
    fontWeight: '600', 
    marginBottom: 8, 
    color: '#000',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#00853E',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    padding: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16,
  },
});