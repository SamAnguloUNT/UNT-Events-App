import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function PlannedEventsScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Planned Events',
          headerStyle: {
            backgroundColor: '#00853E',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={80} color="#a8d5a8" />
          <Text style={styles.emptyText}>No planned events yet</Text>
          <Text style={styles.emptySubtext}>
            Events you RSVP to will appear here
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00853E',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#a8d5a8',
    textAlign: 'center',
  },
});