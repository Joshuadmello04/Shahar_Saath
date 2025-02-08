import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = useWindowDimensions(); // Get screen width and height

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        router.replace('(tab)/home'); // Navigate to home tab if token exists
      } else {
        setIsLoading(false); // Show the UI if no token is found
      }
    };
    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Dynamic sizes based on screen width
  const imageSize = width * 0.6; // 60% of screen width
  const buttonWidth = width * 0.4; // 40% of screen width
  const buttonHeight = height * 0.06; // 6% of screen height

  return (
    <LinearGradient className="flex-1 justify-center items-center px-6" colors={['#b0e0e6', '#87ceeb', '#4682b4', '#1e90ff']}>
      {/* Title */}
      <Text className="text-3xl font-bold text-white mb-6">Shahar Saath</Text>

      {/* Responsive Image */}
      <View style={{ width: imageSize, height: imageSize, borderRadius: imageSize / 2, marginBottom: height * 0.05 }}>
        <Image style={{ width: '100%', height: '100%' }} source={require('../assets/images/mainlogo.png')} />
      </View>

      {/* Buttons - Side by Side with Responsive Size */}
      <View className="w-full flex-row justify-center gap-x-4 px-6">
        <Button 
          style={{ width: buttonWidth, height: buttonHeight, borderRadius: 10 }}
          mode="contained" 
          buttonColor="#0891b2" 
          textColor="#ffffff"
          onPress={() => router.push('/login')}
        >
          Login
        </Button>
        <Button 
          style={{ width: buttonWidth, height: buttonHeight, borderRadius: 10 }}
          mode="contained" 
          buttonColor="#0891b2" 
          textColor="#ffffff"
          onPress={() => router.push('/sign-up')}
        >
          Sign Up
        </Button>
      </View>
    </LinearGradient>
  );
}
