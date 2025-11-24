import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEvents } from '../_layout';

export default function PlannedEventsScreen() {
  const router = useRouter();
  const { savedEvents, toggleSaveEvent } = useEvents();

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
          headerBackTitle: 'Back',
        }}
      />
      <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
        <View style={styles.container}>
          {savedEvents.length > 0 ? (
            <ScrollView style={styles.scrollView}>
              <Text style={styles.header}>Your Saved Events</Text>
              {savedEvents.map((event) => (
                <View key={event.id} style={styles.eventCard}>
                  <TouchableOpacity
                    onPress={() => router.push({ pathname: '/event/[id]', params: { id: event.id } })}
                  >
                    <Image 
                      source={{ uri: event.image }} 
                      style={styles.eventImage}
                      resizeMode="cover"
                    />
                    <View style={styles.eventInfo}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{event.category}</Text>
                      </View>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <View style={styles.eventMeta}>
                        <Ionicons name="calendar-outline" size={14} color="#fff" />
                        <Text style={styles.metaText}>{event.date}</Text>
                      </View>
                      <View style={styles.eventMeta}>
                        <Ionicons name="time-outline" size={14} color="#fff" />
                        <Text style={styles.metaText}>{event.time}</Text>
                      </View>
                      <View style={styles.eventMeta}>
                        <Ionicons name="location-outline" size={14} color="#fff" />
                        <Text style={styles.metaText} numberOfLines={1}>
                          {event.location}
                        </Text>
                      </View>
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
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={80} color="#a8d5a8" />
              <Text style={styles.emptyText}>No planned events yet</Text>
              <Text style={styles.emptySubtext}>
                Events you save will appear here
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00853E',
  },
  container: {
    flex: 1,
    backgroundColor: '#00853E',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 20,
    paddingBottom: 10,
  },
  eventCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  eventInfo: {
    padding: 15,
    backgroundColor: '#00853E',
  },
  categoryBadge: {
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 6,
    flex: 1,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
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