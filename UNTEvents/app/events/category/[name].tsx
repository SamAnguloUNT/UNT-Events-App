import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEvents } from '../../_layout';
import { UNT_EVENTS } from '../../../data/events';

export default function CategoryDetailScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const { toggleSaveEvent, isEventSaved } = useEvents();

  // Normalize category name for matching
  const categoryName = typeof name === 'string' ? name.trim() : '';

  // Filter events by category
  const categoryEvents = UNT_EVENTS.filter(event => {
    // Match exact category or handle variations
    if (categoryName === 'Academic Events' || categoryName === 'Academic\nEvents') {
      return event.category === 'Academic';
    }
    if (categoryName === 'Arts & Culture' || categoryName === 'Arts &\nCulture') {
      return event.category === 'Arts & Culture';
    }
    if (categoryName === 'Student Life') {
      return event.category === 'Student Life';
    }
    if (categoryName === 'Athletics') {
      return event.category === 'Sports';
    }
    if (categoryName === 'Career') {
      return event.category === 'Career';
    }
    return event.category === categoryName;
  });

  const renderEventCard = ({ item }: { item: typeof UNT_EVENTS[0] }) => {
    const isSaved = isEventSaved(item.id);

    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => router.push({ pathname: '/event/[id]', params: { id: item.id } })}
      >
        <Image source={{ uri: item.image }} style={styles.eventImage} />

        {/* Like Button */}
        <TouchableOpacity
          style={styles.likeButton}
          onPress={(e) => {
            e.stopPropagation();
            toggleSaveEvent(item);
          }}
        >
          <Ionicons
            name={isSaved ? 'heart' : 'heart-outline'}
            size={24}
            color={isSaved ? '#FF0000' : '#fff'}
          />
        </TouchableOpacity>

        <View style={styles.eventInfo}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.eventTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.eventDescription} numberOfLines={3}>
            {item.description}
          </Text>
          <View style={styles.eventMeta}>
            <Ionicons name="calendar-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{item.date}</Text>
          </View>
          <View style={styles.eventMeta}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.metaText}>{item.time}</Text>
          </View>
          <View style={styles.eventMeta}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.metaText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: categoryName,
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
        {categoryEvents.length > 0 ? (
          <>
            <Text style={styles.resultCount}>
              {categoryEvents.length} {categoryEvents.length === 1 ? 'event' : 'events'} found
            </Text>
            <FlatList
              data={categoryEvents}
              renderItem={renderEventCard}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>No events found</Text>
            <Text style={styles.emptySubtext}>
              Check back later for events in this category
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  resultCount: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
    fontWeight: '600',
  },
  listContainer: {
    padding: 15,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  eventInfo: {
    padding: 15,
  },
  categoryBadge: {
    backgroundColor: '#00853E',
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
    color: '#333',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    flex: 1,
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
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});