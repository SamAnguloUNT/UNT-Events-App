import { Ionicons } from '@expo/vector-icons';
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
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useEvents } from '@/app/_layout';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';

export default function ContactUsScreen() {
  const router = useRouter();
  const { user } = useEvents();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate inputs
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Save message to Firestore
      const messagesRef = collection(db, 'contactMessages');
      await addDoc(messagesRef, {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        userId: user?.uid || null,
        status: 'unread', // Can be: unread, read, replied
        createdAt: serverTimestamp(),
      });

      setLoading(false);

      Alert.alert(
        'Message Sent!',
        "Thank you for contacting us. We'll get back to you within 24–48 hours.",
        [
          {
            text: 'OK',
            onPress: () => {
              // Clear form
              setName('');
              setEmail('');
              setSubject('');
              setMessage('');
              // Go back to settings
              router.back();
            },
          },
        ]
      );
    } catch (error: any) {
      setLoading(false);
      console.error('Error submitting contact form:', error);
      Alert.alert(
        'Error',
        'Failed to send message. Please try again or contact us directly at support@unt.edu'
      );
    }
  };

  // Pre-fill email if user is logged in
  React.useEffect(() => {
    if (user && user.email && !email) {
      setEmail(user.email);
    }
    if (user && user.displayName && !name) {
      setName(user.displayName);
    }
  }, [user]);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Contact Us',
          headerStyle: { backgroundColor: '#00853E' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header section */}
          <View style={styles.header}>
            <Ionicons name="mail-outline" size={48} color="#00853E" />
            <Text style={styles.headerTitle}>Get in Touch</Text>
            <Text style={styles.headerSubtitle}>
              Have a question or feedback? We&apos;d love to hear from you!
            </Text>
          </View>

          {/* Contact methods card */}
          <View style={styles.contactMethodsContainer}>
            <View style={styles.contactMethod}>
              <Ionicons name="mail" size={24} color="#00853E" />
              <View style={styles.contactMethodText}>
                <Text style={styles.contactMethodLabel}>Email</Text>
                <Text style={styles.contactMethodValue}>support@unt.edu</Text>
              </View>
            </View>

            <View style={styles.contactMethod}>
              <Ionicons name="call" size={24} color="#00853E" />
              <View style={styles.contactMethodText}>
                <Text style={styles.contactMethodLabel}>Phone</Text>
                <Text style={styles.contactMethodValue}>(940) 565-2000</Text>
              </View>
            </View>

            <View style={styles.contactMethod}>
              <Ionicons name="location" size={24} color="#00853E" />
              <View style={styles.contactMethodText}>
                <Text style={styles.contactMethodLabel}>Office</Text>
                <Text style={styles.contactMethodValue}>
                  University Union, Room 330
                </Text>
              </View>
            </View>
          </View>

          {/* Contact form card */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Send us a message</Text>

            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                editable={!loading}
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="your.email@my.unt.edu"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
            </View>

            {/* Subject */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                style={styles.input}
                placeholder="What is this about?"
                placeholderTextColor="#999"
                value={subject}
                onChangeText={setSubject}
                editable={!loading}
              />
            </View>

            {/* Message */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tell us more..."
                placeholderTextColor="#999"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                editable={!loading}
              />
            </View>

            {/* Submit button */}
            <TouchableOpacity 
              style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Send Message</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              We typically respond within 24–48 hours
            </Text>
            {user && (
              <Text style={styles.footerSubtext}>
                ✓ Logged in as {user.email}
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00853E',
  },
  scrollContent: {
    paddingBottom: 40, // Extra padding at bottom
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00853E',
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  contactMethodsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    padding: 16,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactMethodText: {
    marginLeft: 16,
    flex: 1,
  },
  contactMethodLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  contactMethodValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  formContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00853E',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#00853E',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#fff',
    marginTop: 8,
    opacity: 0.8,
  },
});