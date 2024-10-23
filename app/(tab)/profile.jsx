import {
  View,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import { Avatar, IconButton } from "react-native-paper";
import Header from "../../components/Header";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For JWT

export default function Profile() {
  const [imageUri, setImageUri] = useState(null); // Stores the URI of the selected profile picture
  const [userInfo, setUserInfo] = useState(null); // State for user info
  const [loading, setLoading] = useState(true); // State for loading

  const StyledText = styled(Text);
  const StyledView = styled(View);

  // Fetch user profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem('token'); // Retrieve JWT from storage
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      try {
        const response = await fetch(`${apiUrl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token in header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Function to handle picking or taking a new profile picture
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access camera roll is required!"
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Make the image square
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      // TODO: Send updated image to backend
      await updateProfileImage(result.assets[0].uri);
    }
  };

  const updateProfileImage = async (uri) => {
    const token = await AsyncStorage.getItem('token'); // Retrieve JWT from storage
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  
    const formData = new FormData();
    formData.append('profileImage', {
      uri,
      type: 'image/jpeg', // Update if you allow different types
      name: 'profile.jpg',
    });
  
    try {
      const response = await fetch(`${apiUrl}/api/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Required for FormData
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to update profile image');
      }
  
      const updatedUser = await response.json();
      setUserInfo(updatedUser); // Update local user info state with the updated user data
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update profile image.');
    }
  };


  if (loading) {
    return <ActivityIndicator size="large" color="#0e7490" />;
  }

  return (
    <>
      <Header />
      <StyledView className="flex-1 items-center justify-center p-2 mb-16 bg-white">
        <StyledView className="mb-11 items-center">
          <Avatar.Image
            style={{ backgroundColor: "#f3f4f6" }}
            size={200} // Profile picture size
            source={
              imageUri
                ? { uri: imageUri }
                : { uri: userInfo?.profileImage ? `${process.env.EXPO_PUBLIC_API_URL}${userInfo?.profileImage}` : "https://www.example.com/your-dp-url" }

            }
          />
          <IconButton
            icon="camera"
            size={25}
            onPress={pickImage}
            style={{
              position: "absolute",
              bottom: 5,
              right: -2,
              backgroundColor: "white",
              borderRadius: 15,
            }}
          />
        </StyledView>

        {/* Display User Info */}
        <StyledView className="w-[350] h-[50] bg-gray-100 p-3 rounded-xl mb-5 shadow-sm shadow-black">
          <StyledText className="text-lg">{userInfo?.name || 'John Doe'}</StyledText>
        </StyledView>
        <StyledView className="w-[350] h-[50] bg-gray-100 p-3 rounded-xl mb-5 shadow-sm shadow-black">
          <StyledText className="text-md">{userInfo?.email || 'johndoe@example.com'}</StyledText>
        </StyledView>
        <StyledView className="w-[350] h-[50] bg-gray-100 p-3 rounded-xl mb-5 shadow-sm shadow-black">
          <StyledText className="text-md">{userInfo?.phone || '(+91) 1111111111'}</StyledText>
        </StyledView>
      </StyledView>
    </>
  );
}
