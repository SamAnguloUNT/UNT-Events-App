import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

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
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <ScrollView style={styles.container}>
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
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#fff', true: '#000' }}
            thumbColor={notificationsEnabled ? '#fff' : '#000'}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00853E',
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
});
