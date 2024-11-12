import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import Header from "../../components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage'; // For JWT

const StyledView = styled(View);
const StyledText = styled(Text);

const GrievanceTable = () => {
  const [grievances, setGrievances] = useState([]); // Store grievances
  const [loading, setLoading] = useState(true); // Show loading indicator while fetching
  const [error, setError] = useState(''); // Store error message

  // Fetch grievances from the backend
  const fetchGrievances = async () => {
    const token = await AsyncStorage.getItem('token'); // Get JWT from AsyncStorage
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.15:5000'; // API URL

    try {
      const response = await axios.get(`${apiUrl}/api/grievances`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token in header
        },
      });

      // Check if the response is successful
      if (response.status === 200) {
        setGrievances(response.data); // Update grievances state
      } else {
        setError('Failed to fetch grievances.');
      }
    } catch (err) {
      console.error("Error fetching grievances:", err); // Log the error
      setError('An error occurred while fetching grievances.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch grievances when the component mounts
  useEffect(() => {
    fetchGrievances();
  }, []);

  console.log("Grievances state:", grievances); // Debugging: log grievances state

  return (
    <>
      <Header />
      <StyledView className="flex-1 p-4">
        <StyledText className="font-extrabold text-3xl text-center mb-4">Grievance Table</StyledText>

        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : error ? (
          <StyledText className="text-red-500">{error}</StyledText>
        ) : (
          <ScrollView horizontal>
            <View className="border border-gray-300 rounded-lg overflow-hidden">
              <View className="flex-row bg-blue-500 p-4">
                <Text className="flex-1 text-white font-bold text-center pr-4">Title</Text>
                <Text className="flex-2 text-white font-bold text-center px-4">Description</Text>
                <Text className="flex-1 text-white font-bold text-center pl-4">Image</Text>
              </View>

              {grievances.map((item) => {
                const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.15:5000';
                const imageUrl = `${apiUrl}${item.file}`;

                return (
                  <View key={item._id} className="flex-row p-4 border-b border-gray-200">
                    <Text className="flex-1 text-center pr-4 border-r border-gray-300">{item.title}</Text>
                    <Text className="flex-2 px-4 border-r border-gray-300 flex-wrap text-justify">{item.description}</Text>
                    <Image
                      source={{ uri: imageUrl }}
                      style={{ width: 100, height: 100, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        )}

        <TouchableOpacity
          onPress={fetchGrievances}
          className="bg-blue-500 py-2 px-6 rounded-full mt-6 flex-row items-center justify-center"
        >
          <AntDesign name="reload1" size={20} color="white" />
          <Text className="text-white ml-2">Refresh</Text>
        </TouchableOpacity>
      </StyledView>
    </>
  );
};

export default GrievanceTable;
