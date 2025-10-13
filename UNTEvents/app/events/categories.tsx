import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';

const CATEGORIES = [
  {
    id: '1',
    name: 'Academic &\nProfessional',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
  },
  {
    id: '2',
    name: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
  },
  {
    id: '3',
    name: 'Arts &\nEntertainment',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400',
  },
  {
    id: '4',
    name: 'Clubs',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
  },
  {
    id: '5',
    name: 'Other Events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
  },
];

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
  options={{
    title: 'Categories',
    headerStyle: {
      backgroundColor: '#00853E',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitleVisible: false,
  }}
/>
      <View style={styles.container}>
        <Text style={styles.header}>Categories</Text>
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => {
                // Navigation will be added later
                console.log('Selected category:', category.name);
              }}
            >
              <Image 
                source={{ uri: category.image }} 
                style={styles.categoryImage}
                resizeMode="cover"
              />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00853E',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 20,
    paddingBottom: 10,
  },
  scrollContent: {
    padding: 20,
    gap: 15,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: 100,
  },
  categoryImage: {
    width: 120,
    height: '100%',
    backgroundColor: '#ddd',
  },
  categoryText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 20,
  },
});