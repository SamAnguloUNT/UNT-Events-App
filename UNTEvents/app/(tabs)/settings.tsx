import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useEvents } from '../_layout';
import { logOut } from '@/services/authService';

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
}

const SettingsItem = ({ icon, title, onPress }: SettingsItemProps) => (
  <TouchableOpacity
    style={styles.settingsItem}
    onPress={() => {
      console.log('Pressed settings item:', title);
      if (onPress) {
        onPress();
      }
    }}
  >
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={20} color="#000" />
    </View>
    <Text style={styles.settingsText}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="#666" />
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useEvents();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const result = await logOut();
            if (result.success) {
              router.replace('/login');
            } else {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Info Section */}
      {user && (
        <View style={styles.userSection}>
          <View style={styles.userIcon}>
            <Ionicons name="person-circle" size={60} color="#fff" />
          </View>
          <Text style={styles.userName}>{user.displayName || 'User'}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      )}

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <SettingsItem
          icon="person-circle-outline"
          title="Edit Profile"
          onPress={() => router.push('/settings/edit-profile')}
        />

        <SettingsItem
          icon="mail-outline"
          title="Linked UNT Email"
          onPress={() => router.push('/settings/linked-email')}
        />

        <SettingsItem
          icon="lock-closed-outline"
          title="Change Password"
          onPress={() => router.push('/settings/change-password')}
        />
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.notificationToggle}>
          <View style={styles.toggleLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="notifications-outline" size={20} color="#000" />
            </View>
            <Text style={styles.settingsText}>
              Notifications {notificationsEnabled ? 'On' : 'Off'}
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={(value) => {
              if (value) {
                Alert.alert(
                  'Enable Notifications',
                  'You will receive notifications about upcoming events, reminders, and club updates.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Enable',
                      onPress: () => setNotificationsEnabled(true),
                    },
                  ]
                );
              } else {
                Alert.alert(
                  'Disable Notifications',
                  'You will no longer receive notifications about events. You can turn them back on anytime.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Disable',
                      style: 'destructive',
                      onPress: () => setNotificationsEnabled(false),
                    },
                  ]
                );
              }
            }}
            trackColor={{ false: '#fff', true: '#000' }}
            thumbColor={notificationsEnabled ? '#fff' : '#666'}
          />
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <SettingsItem
          icon="help-circle-outline"
          title="FAQs"
          onPress={() => router.push('/settings/faqs')}
        />

        <SettingsItem
          icon="call-outline"
          title="Contact Us"
          onPress={() => router.push('/settings/contact')}
        />
      </View>

      {/* Privacy & Permissions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Permissions</Text>

        <SettingsItem
          icon="location-outline"
          title="Location Services"
          onPress={() => router.push('/settings/location-services')}
        />

        <SettingsItem
          icon="shield-checkmark-outline"
          title="Privacy Policy"
          onPress={() => router.push('/settings/privacy-policy')}
        />
      </View>

      {/* Logout Section */}
      {user && (
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#FF0000" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Version Info */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00853E',
  },
  userSection: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  userIcon: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    marginLeft: 4,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00853E',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  notificationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#00853E',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 24,
    marginRight: 12,
  },
  settingsText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 8,
    padding: 16,
    marginBottom: 30,
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
});