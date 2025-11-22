import { Stack } from 'expo-router';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { getUserSavedEvents, saveEventToUser, removeEventFromUser } from '@/services/databaseService';
import { UNT_EVENTS } from '@/data/events';

// Event type
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  image: string;
  organizer: string;
  contactEmail: string;
}

// Context type
interface EventsContextType {
  savedEvents: Event[];
  toggleSaveEvent: (event: Event) => void;
  isEventSaved: (eventId: string) => boolean;
  user: User | null;
  loading: boolean;
}

const EventsContext = createContext<EventsContextType>({
  savedEvents: [],
  toggleSaveEvent: () => {},
  isEventSaved: () => false,
  user: null,
  loading: true,
});

export const useEvents = () => useContext(EventsContext);

export default function RootLayout() {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Load user's saved event IDs from Firebase
        const result = await getUserSavedEvents(currentUser.uid);
        if (result.success && result.savedEvents && Array.isArray(result.savedEvents)) {
          // Convert event IDs to full event objects
          const eventIds = result.savedEvents as string[];
          const fullEvents = eventIds
            .map(id => UNT_EVENTS.find(event => event.id === id))
            .filter((event): event is Event => event !== undefined);
          
          setSavedEvents(fullEvents);
        }
      } else {
        setSavedEvents([]);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleSaveEvent = async (event: Event) => {
    const isCurrentlySaved = savedEvents.some(e => e.id === event.id);

    if (isCurrentlySaved) {
      // Remove event
      setSavedEvents(savedEvents.filter(e => e.id !== event.id));
      
      // If user is logged in, update Firebase
      if (user) {
        await removeEventFromUser(user.uid, event.id);
      }
    } else {
      // Add event
      setSavedEvents([...savedEvents, event]);
      
      // If user is logged in, update Firebase
      if (user) {
        await saveEventToUser(user.uid, event.id);
      }
    }
  };

  const isEventSaved = (eventId: string): boolean => {
    return savedEvents.some(event => event.id === eventId);
  };

  return (
    <EventsContext.Provider 
      value={{ 
        savedEvents, 
        toggleSaveEvent, 
        isEventSaved,
        user,
        loading
      }}
    >
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="event/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="events/current" options={{ headerShown: false }} />
        <Stack.Screen name="events/planned" options={{ headerShown: false }} />
        <Stack.Screen name="events/categories" options={{ headerShown: false }} />
        <Stack.Screen name="events/category/[name]" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
      </Stack>
    </EventsContext.Provider>
  );
}