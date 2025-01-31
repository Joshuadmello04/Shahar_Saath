import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <LinearGradient className="flex-1" colors={['#b0e0e6', '#87ceeb', '#4682b4', '#1e90ff']}>
      <View className="flex-1 items-center justify-center mt-10">
        <Text className="text-2xl font-bold text-white">Shahar Saath</Text>
      </View>
      <View className="flex-1 items-center justify-center mt-[80]">
        <View className="w-64 h-64 rounded-full items-center justify-center">
          <Image className="w-[256] h-[256]" source={require('../assets/images/mainlogo.png')} />
        </View>
      </View>
      <View className="flex-1 flex-row justify-between mx-5 mt-20">
        <Button
          className="w-40 h-[43]"
          mode="elevated"
          buttonColor="#0891b2"
          textColor="#ffff"
          onPress={() => router.push('/login')}
        >
          Login
        </Button>
        <Button
          className="w-40 h-[43]"
          mode="elevated"
          buttonColor="#0891b2"
          textColor="#ffff"
          onPress={() => router.push('/sign-up')}
        >
          SignUp
        </Button>
      </View>
    </LinearGradient>
  );
}
