import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEvents } from '../_layout';
import { UNT_EVENTS } from '@/data/events';

export default function CurrentEventsScreen() {
  const router = useRouter();
  const { toggleSaveEvent, isEventSaved } = useEvents();

  // Get the next 6 upcoming events
  const today = new Date();
  const upcomingEvents = UNT_EVENTS
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Popular Events',
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
        <Text style={styles.header}>Popular Events</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {upcomingEvents.map((event) => {
            const isSaved = isEventSaved(event.id);
            
            return (
              <View key={event.id} style={styles.eventCard}>
                <TouchableOpacity
                  onPress={() => router.push({ pathname: '/event/[id]', params: { id: event.id } })}
                >
                  <Image 
                    source={{ uri: event.image }} 
                    style={styles.eventImage}
                    resizeMode="cover"
                  />
                  <View style={styles.eventContent}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDescription} numberOfLines={3}>
                      {event.description}
                    </Text>
                    <View style={styles.eventMeta}>
                      <Ionicons name="calendar-outline" size={14} color="#666" />
                      <Text style={styles.metaText}>{event.date}</Text>
                      <Ionicons name="time-outline" size={14} color="#666" style={{marginLeft: 12}} />
                      <Text style={styles.metaText}>{event.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                
                {/* Like Button */}
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => toggleSaveEvent(event)}
                >
                  <Ionicons 
                    name={isSaved ? 'heart' : 'heart-outline'} 
                    size={28} 
                    color={isSaved ? '#FF0000' : '#fff'} 
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        <TouchableOpacity 
          style={styles.categoriesButton}
          onPress={() => router.push('/events/categories' as any)}
        >
          <Text style={styles.categoriesButtonText}>Browse by Categories</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00853E',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 20,
    paddingBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    width: 300,
    marginRight: 15,
    overflow: 'visible',
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#ddd',
  },
  eventContent: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  likeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 133, 62, 0.9)',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  categoriesButton: {
    backgroundColor: '#006B32',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  categoriesButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});