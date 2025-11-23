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
import { UNT_EVENTS } from '../../data/events';

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
      <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
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
                      size={24}
                      color={isSaved ? '#FF0000' : '#666'}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>

          {/* Browse by Categories Button */}
          <TouchableOpacity 
            style={styles.categoriesButton}
            onPress={() => router.push('/events/categories')}
          >
            <Text style={styles.categoriesButtonText}>Browse by Categories</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
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
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 20,
    paddingBottom: 10,
  },
  scrollContent: {
    padding: 20,
    gap: 15,
  },
  eventCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  eventContent: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  categoriesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  categoriesButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
});