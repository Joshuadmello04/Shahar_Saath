import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView, Animated, Dimensions } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import Header from "../../components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { router } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const { height } = Dimensions.get('window');

const GrievanceTable = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      router.replace('/login');
      return;
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/validate-token`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 200) {
        await AsyncStorage.removeItem('token');
        router.replace('/login');
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      await AsyncStorage.removeItem('token');
      router.replace('/login');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const fetchGrievances = async () => {
    const token = await AsyncStorage.getItem('token');
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://172.20.10.14:5000';

    try {
      const response = await axios.get(`${apiUrl}/api/grievances`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setGrievances(response.data);
      } else {
        setError('Failed to fetch grievances.');
      }
    } catch (err) {
      console.error("Error fetching grievances:", err);
      setError('An error occurred while fetching grievances.');
    } finally {
      setLoading(false);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fetchGrievances();
    getLocation();
  }, []);

  console.log("Grievances state:", grievances);
  console.log("User's Location:", location);

  return (
    <>
      <Header />
      <StyledView className="flex-1 p-4 bg-[#0A1929]"> {/* Dark blue background */}
        <View className="mb-6 px-4 py-3 bg-[#0D2139] rounded-2xl shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(30,64,110,0.2)]">
          <StyledText className="text-3xl font-extrabold text-center text-[#60A5FA]">
            Grievance Table
          </StyledText>
        </View>

        {loading ? (
          <View className="items-center justify-center flex-1">
            <View className="p-8 bg-[#0D2139] rounded-2xl shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(30,64,110,0.2)]">
              <ActivityIndicator size="large" color="#60A5FA" />
              <Text className="mt-4 text-[#60A5FA]">Loading grievances...</Text>
            </View>
          </View>
        ) : error ? (
          <View className="p-4 bg-[#1A1C2E] rounded-xl shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(30,64,110,0.2)]">
            <StyledText className="text-center text-red-400">{error}</StyledText>
          </View>
        ) : (
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              className="rounded-xl shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(30,64,110,0.2)]"
            >
              <View className="overflow-hidden rounded-xl bg-[#0D2139]">
                {/* Table Header */}
                <View className="flex-row p-4 bg-[#11294A] border-b border-[#1E406E]">
                  <StyledText className="flex-1 pr-4 font-bold text-center text-[#60A5FA] min-w-[150px]">Title</StyledText>
                  <StyledText className="px-4 font-bold text-center text-[#60A5FA] min-w-[300px] flex-2">Description</StyledText>
                  <StyledText className="flex-1 pl-4 font-bold text-center text-[#60A5FA] min-w-[120px]">Image</StyledText>
                  <StyledText className="flex-1 pl-4 font-bold text-center text-[#60A5FA] min-w-[150px]">Location</StyledText>
                </View>

                {/* Table Rows */}
                <ScrollView
                  className="max-h-[500px]"
                  showsVerticalScrollIndicator={true}
                >
                  {grievances.map((item) => {
                    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://172.20.10.14:5000';
                    const imageUrl = `${apiUrl}${item.file}`;

                    return (
                      <View
                        key={item._id}
                        className="flex-row p-4 bg-[#0D2139] border-b border-[#1E406E]"
                        style={{
                          shadowColor: '#000',
                          shadowOffset: { width: 1, height: 1 },
                          shadowOpacity: 0.2,
                          shadowRadius: 2,
                        }}
                      >
                        <Text className="flex-1 pr-4 text-center text-[#9BB6DE] border-r border-[#1E406E] min-w-[150px]">
                          {item.title}
                        </Text>
                        <Text className="flex-wrap px-4 text-justify text-[#9BB6DE] border-r border-[#1E406E] min-w-[300px] flex-2">
                          {item.description}
                        </Text>
                        <View className="flex-1 items-center border-r border-[#1E406E] min-w-[120px]">
                          <View className="p-1 bg-[#0D2139] rounded-xl shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(30,64,110,0.2)]">
                            <Image
                              source={{ uri: imageUrl }}
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                              }}
                              resizeMode="cover"
                            />
                          </View>
                        </View>
                        <Animated.View
                          style={{ opacity: fadeAnim }}
                          className="flex-1 min-w-[150px]"
                        >
                          <Text className="pr-4 text-center text-[#9BB6DE]">
                            📍{item.latitude},{item.longitude}
                          </Text>
                        </Animated.View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </ScrollView>
          </ScrollView>
        )}

        {/* Neumorphic Refresh Button */}
        <TouchableOpacity
          onPress={fetchGrievances}
          className="flex-row items-center justify-center px-6 py-4 mt-6 bg-[#11294A] rounded-xl"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <View className="absolute inset-0 rounded-xl" style={{
            backgroundColor: '#0D2139',
            shadowColor: '#1E406E',
            shadowOffset: { width: -4, height: -4 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
          }} />
          <AntDesign name="reload1" size={24} color="#60A5FA" />
          <StyledText className="ml-3 font-bold text-[#60A5FA] text-lg">Refresh</StyledText>
        </TouchableOpacity>
      </StyledView>
    </>
  );
};

export default GrievanceTable;