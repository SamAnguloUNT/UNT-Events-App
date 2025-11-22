import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Save event to user's saved events
export const saveEventToUser = async (userId: string, eventId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    await setDoc(userRef, {
      savedEvents: arrayUnion(eventId)
    }, { merge: true });
    
    return { success: true };
  } catch (error: any) {
    console.error('Save event error:', error);
    return { success: false, error: error.message };
  }
};

// Remove event from user's saved events
export const removeEventFromUser = async (userId: string, eventId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    await updateDoc(userRef, {
      savedEvents: arrayRemove(eventId)
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Remove event error:', error);
    return { success: false, error: error.message };
  }
};

// Get user's saved events
export const getUserSavedEvents = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      return { success: true, savedEvents: data.savedEvents || [] };
    } else {
      return { success: true, savedEvents: [] };
    }
  } catch (error: any) {
    console.error('Get saved events error:', error);
    return { success: false, error: error.message, savedEvents: [] };
  }
};

// Save user preferences
export const saveUserPreferences = async (userId: string, preferences: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    await setDoc(userRef, {
      preferences: preferences
    }, { merge: true });
    
    return { success: true };
  } catch (error: any) {
    console.error('Save preferences error:', error);
    return { success: false, error: error.message };
  }
};

// Get user preferences
export const getUserPreferences = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      return { success: true, preferences: data.preferences || {} };
    } else {
      return { success: true, preferences: {} };
    }
  } catch (error: any) {
    console.error('Get preferences error:', error);
    return { success: false, error: error.message, preferences: {} };
  }
};

// Create or update user profile
export const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    await setDoc(userRef, {
      ...profileData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    
    return { success: true };
  } catch (error: any) {
    console.error('Update profile error:', error);
    return { success: false, error: error.message };
  }
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return { success: true, profile: userDoc.data() };
    } else {
      return { success: true, profile: null };
    }
  } catch (error: any) {
    console.error('Get profile error:', error);
    return { success: false, error: error.message, profile: null };
  }
};