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

// Sample events data
const POPULAR_EVENTS = [
  {
    id: '1',
    title: 'Book Club',
    description: 'Every Monday at 7:30 pm, located at the UNT Library. Come join us as we discuss and enjoy reading!',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    category: 'Academic',
    date: '2025-10-20',
    time: '7:30 PM',
    location: 'UNT Library',
  },
  {
    id: '2',
    title: 'Career Fair',
    description: 'Every Friday at 2:00 PM come join us at the union for the annual UNT career fair. We will have free food and SWAG for students !!',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400',
    category: 'Professional',
    date: '2025-10-22',
    time: '2:00 PM',
    location: 'University Union',
  },
  {
    id: '3',
    title: 'Mean Green Racing',
    description: 'Every Sunday at 7:00 PM at the rec center. Come learn about what we do and become a part of the Mean Green Racing Crew',
    image: 'https://images.unsplash.com/photo-1471479917193-f00955256257?w=400',
    category: 'Sports',
    date: '2025-10-24',
    time: '7:00 PM',
    location: 'Rec Center',
  },
  {
    id: '4',
    title: 'Rugby Club',
    description: 'Come join the Rugby club! We meet every Thursdays at 6:00 PM',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    category: 'Sports',
    date: '2025-10-25',
    time: '6:00 PM',
    location: 'Sports Complex',
  },
];

export default function CurrentEventsScreen() {
  const router = useRouter();
  const { toggleSaveEvent, isEventSaved } = useEvents();

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
          {POPULAR_EVENTS.map((event) => {
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
                    <Text style={styles.eventDescription}>{event.description}</Text>
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