import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Account screens */}
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="linked-email" />
      <Stack.Screen name="change-password" />

      {/* Notification screens */}
      <Stack.Screen name="notification-preferences" />

      {/* Support screens */}
      <Stack.Screen name="faqs" />
      <Stack.Screen name="contact" />

      {/* Privacy screens */}
      <Stack.Screen name="location-services" />
      <Stack.Screen name="privacy-policy" />
    </Stack>
  );
}