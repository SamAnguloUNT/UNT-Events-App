import { Stack } from 'expo-router';

export default function EventLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false, // Page handles its own header
        headerBackTitle: 'Back',
        headerStyle: { backgroundColor: '#00853E' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
  );
}