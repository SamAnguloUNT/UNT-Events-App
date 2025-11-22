import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfx6NAJ6Pv2z-tKcMc86t52zaD-VjFHpQ",
  authDomain: "unt-events-app.firebaseapp.com",
  projectId: "unt-events-app",
  storageBucket: "unt-events-app.firebasestorage.app",
  messagingSenderId: "1084320267766",
  appId: "1:1084320267766:web:fdb5db74f82da6541f5bd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;