import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { createContext, useContext, useState, ReactNode } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Event Context (inline for now)
interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date?: string;
  time?: string;
  location?: string;
}

interface EventContextType {
  savedEvents: Event[];
  toggleSaveEvent: (event: Event) => void;
  isEventSaved: (eventId: string) => boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within EventProvider');
  }
  return context;
};

function EventProvider({ children }: { children: ReactNode }) {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);

  const toggleSaveEvent = (event: Event) => {
    setSavedEvents((prev) => {
      const isAlreadySaved = prev.some((e) => e.id === event.id);
      if (isAlreadySaved) {
        return prev.filter((e) => e.id !== event.id);
      } else {
        return [...prev, event];
      }
    });
  };

  const isEventSaved = (eventId: string) => {
    return savedEvents.some((e) => e.id === eventId);
  };

  return (
    <EventContext.Provider value={{ savedEvents, toggleSaveEvent, isEventSaved }}>
      {children}
    </EventContext.Provider>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <EventProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerBackTitle: 'Back',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </EventProvider>
  );
}