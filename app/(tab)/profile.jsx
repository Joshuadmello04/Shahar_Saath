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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function Profile() {
  const [imageUri, setImageUri] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const StyledText = styled(Text);
  const StyledView = styled(View);

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
  
  // Run checkAuth on mount
  useEffect(() => {
    checkAuth();
  }, []);
  

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem("token");
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://172.20.10.14:5000";
      try {
        const response = await fetch(`${apiUrl}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      await updateProfileImage(result.assets[0].uri);
    }
  };

  const updateProfileImage = async (uri) => {
    const token = await AsyncStorage.getItem("token");
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://172.20.10.14:5000";

    const formData = new FormData();
    formData.append("profileImage", {
      uri,
      type: "image/jpeg",
      name: "profile.jpg",
    });

    try {
      const response = await fetch(`${apiUrl}/api/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile image");
      }

      const updatedUser = await response.json();
      setUserInfo(updatedUser);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update profile image.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0e7490" />;
  }

  return (
    <LinearGradient colors={["#E0F7FA", "#B2EBF2"]} style={{ flex: 1 }}>
      <Header />
      <StyledView className="flex-1 items-center justify-center p-4">
        <StyledView className="mb-11 items-center relative">
          <Avatar.Image
            style={{ backgroundColor: "#4FC3F7" }}
            size={120}
            source={
              imageUri
                ? { uri: imageUri }
                : { uri: userInfo?.profileImage || "https://www.example.com/your-dp-url" }
            }
          />
          <IconButton
            icon="camera"
            size={25}
            onPress={pickImage}
            style={{
              position: "absolute",
              bottom: 5,
              right: -10,
              backgroundColor: "#29B6F6",
              borderRadius: 15,
            }}
          />
        </StyledView>

        <StyledView className="w-full max-w-sm bg-white p-4 rounded-lg mb-4 shadow-md border border-gray-300">
          <StyledText className="text-lg text-gray-900 text-center font-semibold">{userInfo?.name || "John Doe"}</StyledText>
        </StyledView>
        <StyledView className="w-full max-w-sm bg-white p-4 rounded-lg mb-4 shadow-md border border-gray-300">
          <StyledText className="text-md text-gray-600 text-center">{userInfo?.email || "johndoe@example.com"}</StyledText>
        </StyledView>
        <StyledView className="w-full max-w-sm bg-white p-4 rounded-lg mb-4 shadow-md border border-gray-300">
          <StyledText className="text-md text-gray-600 text-center">{userInfo?.phone || "(+91) 1111111111"}</StyledText>
        </StyledView>
      </StyledView>
    </LinearGradient>
  );
}