import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Ionicons } from '@expo/vector-icons';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Toggle password visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = async () => {
    // Validation
    if (!current || !newPass || !confirm) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    if (newPass !== confirm) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }
    if (newPass.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      
      if (!user || !user.email) {
        Alert.alert('Error', 'No user is currently signed in.');
        setLoading(false);
        return;
      }

      // Step 1: Re-authenticate the user with their current password
      const credential = EmailAuthProvider.credential(user.email, current);
      await reauthenticateWithCredential(user, credential);

      // Step 2: Update to the new password
      await updatePassword(user, newPass);

      setLoading(false);
      
      Alert.alert(
        'Success', 
        'Your password has been updated successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
      
      // Clear fields
      setCurrent('');
      setNewPass('');
      setConfirm('');
      
    } catch (error: any) {
      setLoading(false);
      console.error('Password change error:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Current password is incorrect.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'New password is too weak. Please choose a stronger password.');
      } else if (error.code === 'auth/requires-recent-login') {
        Alert.alert('Error', 'For security reasons, please log out and log back in before changing your password.');
      } else {
        Alert.alert('Error', 'Failed to update password. Please try again.');
      }
    }
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
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showCurrent}
              value={current}
              onChangeText={setCurrent}
              placeholder="Enter current password"
              editable={!loading}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowCurrent(!showCurrent)}
            >
              <Ionicons
                name={showCurrent ? 'eye-off' : 'eye'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showNew}
              value={newPass}
              onChangeText={setNewPass}
              placeholder="Enter new password (min 6 characters)"
              editable={!loading}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowNew(!showNew)}
            >
              <Ionicons
                name={showNew ? 'eye-off' : 'eye'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showConfirm}
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Confirm new password"
              editable={!loading}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirm(!showConfirm)}
            >
              <Ionicons
                name={showConfirm ? 'eye-off' : 'eye'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleChange}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Update Password</Text>
            )}
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
  label: { fontWeight: '600', marginBottom: 8, color: '#000', marginTop: 8 },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 12,
  },
  button: {
    backgroundColor: '#00853E',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});