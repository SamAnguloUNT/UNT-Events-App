import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';

export default function CategoryDetailScreen() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: name as string,
          headerStyle: {
            backgroundColor: '#00853E',
          },
          headerTintColor: '#fff',
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Events in {name}</Text>
        <Text style={styles.subtext}>Coming soon...</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00853E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 16,
    color: '#a8d5a8',
  },
});