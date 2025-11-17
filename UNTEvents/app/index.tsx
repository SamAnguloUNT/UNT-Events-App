import { Redirect } from 'expo-router';

export default function Index() {
  // For now, always redirect to login
  // Later with backend, you'd check if user is logged in
  const isLoggedIn = false;

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/login" />;
}