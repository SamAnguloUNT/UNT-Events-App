import { Stack } from 'expo-router';

export default function EventsLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false, // Pages handle their own headers
        headerBackTitle: 'Back',
        headerStyle: { backgroundColor: '#00853E' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
  );
}