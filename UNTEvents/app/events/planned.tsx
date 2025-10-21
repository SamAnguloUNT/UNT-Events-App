import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEvents } from '../_layout';
export default function PlannedEventsScreen() {
  const { savedEvents, toggleSaveEvent } = useEvents();
  const router = useRouter();

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
          headerBackTitleVisible: false,
        }}
      />
      <View style={styles.container}>
        {savedEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={80} color="#a8d5a8" />
            <Text style={styles.emptyText}>No planned events yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the heart icon on events to save them here
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.header}>My Planned Events ({savedEvents.length})</Text>
            {savedEvents.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <TouchableOpacity
                  onPress={() => router.push({ pathname: '/event/[id]', params: { id: event.id } })}
                  style={styles.eventTouchable}
                >
                  <Image 
                    source={{ uri: event.image }} 
                    style={styles.eventImage}
                    resizeMode="cover"
                  />
                  <View style={styles.eventContent}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDescription} numberOfLines={2}>
                      {event.description}
                    </Text>
                    {event.date && (
                      <View style={styles.detailRow}>
                        <Ionicons name="calendar-outline" size={14} color="#666" />
                        <Text style={styles.detailText}>{event.date}</Text>
                      </View>
                    )}
                    {event.time && (
                      <View style={styles.detailRow}>
                        <Ionicons name="time-outline" size={14} color="#666" />
                        <Text style={styles.detailText}>{event.time}</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                
                {/* Remove Button */}
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => toggleSaveEvent(event)}
                >
                  <Ionicons name="heart" size={24} color="#FF0000" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
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
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    marginBottom: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  eventTouchable: {
    flexDirection: 'row',
  },
  eventImage: {
    width: 100,
    height: 120,
    backgroundColor: '#ddd',
  },
  eventContent: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
});