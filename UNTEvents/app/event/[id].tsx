import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEvents } from '../_layout';
import { UNT_EVENTS } from '../../data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { toggleSaveEvent, isEventSaved } = useEvents();

  // Find the event by ID
  const event = UNT_EVENTS.find((e) => e.id === id);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }

  const isSaved = isEventSaved(event.id);

  const handleEmailContact = () => {
    Linking.openURL(`mailto:${event.contactEmail}`);
  };

  const handleShare = () => {
    Alert.alert(
      'Share Event',
      `Share "${event.title}" with friends!`,
      [{ text: 'OK' }]
    );
  };

  const handleCategoryPress = () => {
    // Navigate to the category detail screen
    router.push({
      pathname: '/events/category/[name]',
      params: { name: event.category }
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#00853E',
          },
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
              <Ionicons name="share-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView style={styles.container}>
        {/* Event Image */}
        <Image
          source={{ uri: event.image }}
          style={styles.eventImage}
          resizeMode="cover"
        />

        {/* Event Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.categoryBadge}
            onPress={handleCategoryPress}
            activeOpacity={0.7}
          >
            <Text style={styles.categoryText}>{event.category}</Text>
          </TouchableOpacity>
          
          <View style={styles.titleRow}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <TouchableOpacity
              onPress={() => toggleSaveEvent(event)}
              style={styles.likeButton}
            >
              <Ionicons
                name={isSaved ? 'heart' : 'heart-outline'}
                size={32}
                color={isSaved ? '#FF0000' : '#666'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Event Details Cards */}
        <View style={styles.detailsContainer}>
          {/* Date & Time */}
          <View style={styles.detailCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="calendar" size={24} color="#00853E" />
            </View>
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>{event.date}</Text>
              <Text style={styles.detailValue}>{event.time}</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.detailCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="location" size={24} color="#00853E" />
            </View>
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{event.location}</Text>
            </View>
          </View>

          {/* Organizer */}
          <View style={styles.detailCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="people" size={24} color="#00853E" />
            </View>
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Organizer</Text>
              <Text style={styles.detailValue}>{event.organizer}</Text>
              <TouchableOpacity onPress={handleEmailContact}>
                <Text style={styles.contactEmail}>{event.contactEmail}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>About This Event</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>


      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
      },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  headerButton: {
    marginRight: 15,
  },
  eventImage: {
    width: '100%',
    height: 300,
  },
  header: {
    padding: 20,
    paddingBottom: 15,
  },
  categoryBadge: {
    backgroundColor: '#00853E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  likeButton: {
    padding: 5,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 14,
    color: '#00853E',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  descriptionContainer: {
    padding: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});