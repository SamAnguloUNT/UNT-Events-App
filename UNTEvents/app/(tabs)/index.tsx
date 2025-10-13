import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>UNT</Text>
        <Text style={styles.title}>Events</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/images/unt-campus.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/events/current' as any)}
        >
          <Text style={styles.buttonText}>Current Events</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/events/planned' as any)}
        >
          <Text style={styles.buttonText}>My Planned Events</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00853E',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 80,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 3,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: '#ddd',
  },
  buttonContainer: {
    gap: 30,
  },
  button: {
    backgroundColor: '#00853E',
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 12,
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
});