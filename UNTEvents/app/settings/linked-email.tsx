import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LinkedEmailScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Linked UNT Email',
          headerStyle: { backgroundColor: '#00853E' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Your Linked Email</Text>
          <Text style={styles.email}>your.name@my.unt.edu</Text>
          <Text style={styles.text}>
            This email is used for account access and notifications. To change
            your linked email, please contact UNT IT support or update your
            university account settings.
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
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#00853E',
  },
  text: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
