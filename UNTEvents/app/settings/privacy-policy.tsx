import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Privacy Policy',
          headerStyle: { backgroundColor: '#00853E' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>UNT Events App Privacy Policy</Text>
          <Text style={styles.text}>
            The UNT Events App respects your privacy. We only collect minimal data
            necessary for app functionality, such as saved events and user preferences.
          </Text>
          <Text style={styles.text}>
            We do not share personal information with third parties. Your data is
            securely stored and only accessible within the app.
          </Text>
          <Text style={styles.text}>
            For questions, contact UNT IT Support or use Settings → Support → Contact Us.
          </Text>
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
  title: { fontSize: 20, fontWeight: 'bold', color: '#00853E', marginBottom: 12 },
  text: { fontSize: 14, color: '#000', marginBottom: 12, lineHeight: 20 },
});
