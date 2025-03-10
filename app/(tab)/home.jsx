import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { styled } from "nativewind";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import axios from "axios";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Svg, Text as SvgText } from "react-native-svg"; // Importing react-native-svg for overlay
import { router } from "expo-router";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [grievanceType, setGrievanceType] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);

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
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access location was denied.");
      return;
    }

    let locationData = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: locationData.coords.latitude.toFixed(6),
      longitude: locationData.coords.longitude.toFixed(6),
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setError("Permission to access the camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setCaption("");
      setGrievanceType("");
      setError("");
    } else {
      setError("Image selection was canceled.");
    }
  };

  const submitImage = async () => {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", {
      uri: selectedImage,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post(
        "http://172.20.10.14:8000/generate",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 60000,
        }
      );

      if (response.data?.grievance_type && response.data?.caption) {
        setGrievanceType(response.data.grievance_type);
        setCaption(response.data.caption);
        submitGrievance(response.data.grievance_type, response.data.caption);
      } else {
        setError("No grievance type or caption received from the server.");
      }
    } catch (error) {
      console.error("Error generating caption:", error);
      setError("Network error or server timeout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitGrievance = async (grievanceType, caption) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://172.20.10.14:5000";

      const formData = new FormData();
      formData.append("file", {
        uri: selectedImage,
        name: "grievance_image.jpg",
        type: "image/jpeg",
      });

      formData.append("title", grievanceType);
      formData.append("description", caption);
      formData.append("latitude", location?.latitude || "Unknown");
      formData.append("longitude", location?.longitude || "Unknown");

      const response = await axios.post(`${apiUrl}/api/grievances`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        Alert.alert("Success", "Grievance submitted successfully.");
      } else {
        setError("Failed to submit grievance.");
      }
    } catch (error) {
      console.error("Error submitting grievance:", error);
      setError("An error occurred while submitting the grievance.");
    }
  };

  return (
    <>
      <Header />
      <LinearGradient colors={["#0f172a", "#1e293b", "#334155"]} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <StyledView className="items-center justify-center flex-1 p-4">
            <StyledText className="mb-6 text-4xl font-extrabold tracking-wider text-white">
              Smart Captioner
            </StyledText>

            <TouchableOpacity
              onPress={pickImage}
              className="flex-row items-center px-6 py-4 bg-blue-600 rounded-full shadow-lg active:scale-95"
            >
              <AntDesign name="picture" size={24} color="white" />
              <Text className="ml-3 text-lg font-semibold text-white">Pick an Image</Text>
            </TouchableOpacity>

            {selectedImage && (
              <StyledView className="relative mt-6">
                {/* Display the image */}
                <Image source={{ uri: selectedImage }} className="w-64 h-64 rounded-lg shadow-lg" resizeMode="cover" />
                {/* Overlay location on the image */}
                {location && (
                  <Svg height="100%" width="100%" style={{ position: "absolute", top: 10, left: 10 }}>
                    <SvgText
                      x="10"
                      y="30"
                      fontSize="14"
                      fill="white"
                      fontWeight="bold"
                      stroke="black"
                      strokeWidth="1"
                    >
                      Lat: {location.latitude}, Lng: {location.longitude}
                    </SvgText>
                  </Svg>
                )}
              </StyledView>
            )}

            {error && <StyledText className="mt-4 text-center text-red-500">{error}</StyledText>}

            <TouchableOpacity
              onPress={submitImage}
              disabled={loading}
              className={`mt-6 bg-green-600 rounded-full px-6 py-4 w-full ${loading ? "opacity-50" : "opacity-100"}`}
            >
              <Text className="text-lg font-semibold text-center text-white">
                {loading ? "Generating..." : "Generate Caption"}
              </Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#00ff00" className="mt-4" />}

            {caption && (
              <StyledView className="w-full px-6 mt-6">
                <StyledText className="mb-2 text-2xl font-bold text-white">Generated Caption:</StyledText>
                <StyledText className="p-4 text-lg leading-relaxed text-white rounded-lg bg-white/20">
                  {caption}
                </StyledText>
              </StyledView>
            )}

            {grievanceType && (
              <StyledView className="w-full px-6 mt-6">
                <StyledText className="mb-2 text-xl font-bold text-white">Grievance Type:</StyledText>
                <StyledText className="p-4 text-lg text-white rounded-lg bg-white/20">
                  {grievanceType}
                </StyledText>
              </StyledView>
            )}

            {location && (
              <StyledView className="w-full px-6 mt-6">
                <StyledText className="mb-2 text-xl font-bold text-white">Location:</StyledText>
                <StyledView className="p-4 rounded-lg bg-white/20">
                  <StyledText className="text-lg text-white">
                    📍 Lat: {location.latitude}, Lng: {location.longitude}
                  </StyledText>
                </StyledView>
              </StyledView>
            )}
          </StyledView>
        </ScrollView>
      </LinearGradient>
    </>
  );
}
