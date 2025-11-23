import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Request permission and get push token
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#00853E',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Permission for notifications was denied. You can enable it in Settings.');
      return;
    }
    
    // Skip getting push token for now - local notifications don't need it
    console.log('Notification permissions granted');
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

// Schedule a notification for an event
export async function scheduleEventNotification(
  eventTitle: string,
  eventDate: string,
  eventTime: string,
  eventId: string,
  minutesBefore: number = 60 // Default: 1 hour before
) {
  try {
    console.log('=== Scheduling Notification ===');
    console.log('Event Title:', eventTitle);
    console.log('Event Date:', eventDate);
    console.log('Event Time:', eventTime);
    console.log('Minutes Before:', minutesBefore);
    
    // Parse the date and time
    const [year, month, day] = eventDate.split('-').map(Number);
    const [time, period] = eventTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    console.log('Parsed date:', year, month, day);
    console.log('Parsed time:', hours, minutes, period);
    
    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    console.log('24-hour format:', hours, minutes);
    
    // Create event date
    const eventDateTime = new Date(year, month - 1, day, hours, minutes);
    console.log('Event DateTime:', eventDateTime.toString());
    
    // Calculate notification time (minutesBefore before event)
    const notificationTime = new Date(eventDateTime.getTime() - minutesBefore * 60 * 1000);
    console.log('Notification Time:', notificationTime.toString());
    console.log('Current Time:', new Date().toString());
    
    // Check if notification time is in the future
    if (notificationTime.getTime() <= Date.now()) {
      console.log('❌ Event is too soon or has passed, no notification scheduled');
      console.log('Time difference (ms):', notificationTime.getTime() - Date.now());
      return null;
    }
    
    console.log('✅ Notification time is in the future!');
    
    // Schedule the notification
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎉 Event Reminder',
        body: `${eventTitle} starts in ${minutesBefore} minutes!`,
        data: { eventId },
        sound: true,
      },
      trigger: {
        type: 'date',
        date: notificationTime,
      },
    });
    
    console.log('✅ Notification scheduled with ID:', notificationId);
    console.log('=================================');
    return notificationId;
  } catch (error) {
    console.error('❌ Error scheduling notification:', error);
    return null;
  }
}

// Cancel a specific notification
export async function cancelEventNotification(notificationId: string) {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log('Notification cancelled:', notificationId);
  } catch (error) {
    console.error('Error cancelling notification:', error);
  }
}

// Cancel all notifications for a specific event
export async function cancelAllEventNotifications(eventId: string) {
  try {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    
    for (const notification of scheduledNotifications) {
      if (notification.content.data?.eventId === eventId) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
      }
    }
    
    console.log('All notifications cancelled for event:', eventId);
  } catch (error) {
    console.error('Error cancelling event notifications:', error);
  }
}

// Get all scheduled notifications
export async function getAllScheduledNotifications() {
  try {
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    console.log('Scheduled notifications:', notifications);
    return notifications;
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
}

// Send an immediate test notification
export async function sendTestNotification() {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎉 UNT Events',
        body: 'Notifications are working! You\'ll get reminders for your saved events.',
        data: { test: true },
      },
      trigger: null, // Send immediately
    });
  } catch (error) {
    console.error('Error sending test notification:', error);
  }
}