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
    image: 'https://localist-images.azureedge.net/photos/38634541580877/card/a64add19c9d3ed2046a534737069f482cb18f776.jpg',
  },
  {
    id: '2',
    name: 'Sports',
    image: 'https://localist-images.azureedge.net/photos/38555966483930/card/c60d4c09e39290ad10f14e95d46259bed405a722.jpg',
  },
  {
    id: '3',
    name: 'Arts &\nEntertainment',
    image: 'https://localist-images.azureedge.net/photos/39131136456949/card/2dce9ed653365183e1e70b2e6d1b261dd09f486a.jpg',
  },
  {
    id: '4',
    name: 'Student Life',
    image: 'https://localist-images.azureedge.net/photos/50592626822705/card/211dcdc3d73670b4cf7617b243771a4d224ae5b7.jpg',
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
                router.push({
                  pathname: '/events/category/[name]' as any,
                  params: { name: category.name.replace('\n', ' ') }
                });
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