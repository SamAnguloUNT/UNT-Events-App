import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Sample events with dates
const CALENDAR_EVENTS = [
  {
    id: '1',
    title: 'Football Game',
    time: '8pm',
    date: '2025-11-20',
    image: 'https://images.unsplash.com/photo-1471479917193-f00955256257?w=400',
  },
  {
    id: '2',
    title: 'Free Food',
    time: '5pm',
    date: '2025-11-20',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
  },
  {
    id: '3',
    title: 'Career Fair',
    time: '2:00 PM',
    date: '2025-11-22',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400',
  },
  {
    id: '4',
    title: 'Jazz Concert',
    time: '8:00 PM',
    date: '2025-11-25',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400',
  },
];

export default function CalendarScreen() {
  const router = useRouter();
  const today = new Date();
  const todayString = today.getFullYear() + '-' + 
                      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                      String(today.getDate()).padStart(2, '0');
  
  const [selectedDate, setSelectedDate] = useState(todayString);

  // Get events for selected date
  const eventsForDate = CALENDAR_EVENTS.filter(event => event.date === selectedDate);

  // Mark dates that have events
  const markedDates: any = {};
  CALENDAR_EVENTS.forEach(event => {
    markedDates[event.date] = { marked: true, dotColor: '#00853E' };
  });
  
  // Highlight selected date
  markedDates[selectedDate] = {
    ...markedDates[selectedDate],
    selected: true,
    selectedColor: '#00853E',
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      {/* Search and Filter Buttons */}
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#000" />
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#000" />
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <Calendar
        current={selectedDate}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#00853E',
          calendarBackground: '#00853E',
          textSectionTitleColor: '#fff',
          selectedDayBackgroundColor: '#00853E',
          selectedDayTextColor: '#fff',
          todayTextColor: '#FFD700',
          dayTextColor: '#fff',
          textDisabledColor: '#a8d5a8',
          dotColor: '#FFD700',
          selectedDotColor: '#fff',
          arrowColor: '#fff',
          monthTextColor: '#fff',
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
        }}
        style={styles.calendar}
      />

      {/* Events List */}
      <ScrollView style={styles.eventsList}>
        <Text style={styles.eventsHeader}>
          Events on {formatDate(selectedDate)}
        </Text>

        {eventsForDate.length > 0 ? (
          eventsForDate.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              onPress={() => router.push({ pathname: '/event/[id]', params: { id: event.id } })}
            >
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noEvents}>
            <Ionicons name="calendar-outline" size={48} color="#a8d5a8" />
            <Text style={styles.noEventsText}>No events on this day</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00853E',
  },
  topButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  searchButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    padding: 12,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    padding: 12,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  calendar: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
  },
  eventsList: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  eventsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    padding: 12,
    marginBottom: 12,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
  },
  noEvents: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noEventsText: {
    fontSize: 16,
    color: '#a8d5a8',
    marginTop: 12,
  },
});