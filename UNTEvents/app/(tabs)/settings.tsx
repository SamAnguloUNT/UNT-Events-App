import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
}

const SettingsItem = ({ icon, title, onPress }: SettingsItemProps) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={20} color="#000" />
    </View>
    <Text style={styles.settingsText}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="#666" />
  </TouchableOpacity>
);

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <SettingsItem 
          icon="person-circle-outline" 
          title="Edit Profile"
          onPress={() => console.log('Edit Profile')}
        />
        <SettingsItem 
          icon="mail-outline" 
          title="Linked UNT Email"
          onPress={() => console.log('Linked UNT Email')}
        />
        <SettingsItem 
          icon="lock-closed-outline" 
          title="Change Password"
          onPress={() => console.log('Change Password')}
        />
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <SettingsItem 
          icon="notifications-outline" 
          title="Turn On/Off Notifications"
          onPress={() => console.log('Notifications')}
        />
        <SettingsItem 
          icon="people-outline" 
          title="Club Updates"
          onPress={() => console.log('Club Updates')}
        />
        <SettingsItem 
          icon="calendar-outline" 
          title="Event Reminders"
          onPress={() => console.log('Event Reminders')}
        />
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <SettingsItem 
          icon="help-circle-outline" 
          title="FAQs"
          onPress={() => console.log('FAQs')}
        />
        <SettingsItem 
          icon="call-outline" 
          title="Contact Us"
          onPress={() => console.log('Contact Us')}
        />
      </View>

      {/* Privacy & Permissions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Permissions</Text>
        <SettingsItem 
          icon="location-outline" 
          title="Location Services"
          onPress={() => console.log('Location Services')}
        />
        <SettingsItem 
          icon="shield-checkmark-outline" 
          title="Privacy Policy"
          onPress={() => console.log('Privacy Policy')}
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