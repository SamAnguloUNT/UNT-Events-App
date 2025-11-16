import { Ionicons } from '@expo/vector-icons';
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

export default function ContactUsScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Validate inputs
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    Alert.alert(
      'Message Sent!',
      "Thank you for contacting us. We'll get back to you within 24–48 hours.",
      [
        {
          text: 'OK',
          onPress: () => {
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
          },
        },
      ]
    );
  };

  return (
    <>
      {/* (Optional) navigation header styling – safe to leave here */}
      <Stack.Screen
        options={{
          title: 'Contact Us',
          headerStyle: { backgroundColor: '#00853E' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      <ScrollView style={styles.container}>
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
            />
          </View>

          {/* Submit button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            We typically respond within 24–48 hours
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00853E',
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
    color: '#000',
    textAlign: 'center',
  },
});
