import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: true,
        headerStyle: { backgroundColor: '#00853E' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitle: 'Back', // This shows "Back" instead of folder name
      }}
    >
      {/* Account screens */}
      <Stack.Screen name="edit-profile" options={{ title: 'Edit Profile' }} />
      <Stack.Screen name="linked-email" options={{ title: 'Linked Email' }} />
      <Stack.Screen name="change-password" options={{ title: 'Change Password' }} />

      {/* Notification screens */}
      <Stack.Screen name="notification-preferences" options={{ title: 'Notification Settings' }} />

      {/* Support screens */}
      <Stack.Screen name="faqs" options={{ title: 'FAQs' }} />
      <Stack.Screen name="contact" options={{ title: 'Contact Us' }} />

      {/* Privacy screens */}
      <Stack.Screen name="location-services" options={{ title: 'Location Services' }} />
      <Stack.Screen name="privacy-policy" options={{ title: 'Privacy Policy' }} />
    </Stack>
  );
}