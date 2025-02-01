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

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [grievanceType, setGrievanceType] = useState("");
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);

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
          <StyledView className="flex-1 items-center justify-center p-4">
            <StyledText className="font-extrabold text-4xl text-white tracking-wider mb-6">
              Smart Captioner
            </StyledText>

            <TouchableOpacity
              onPress={pickImage}
              className="bg-blue-600 rounded-full px-6 py-4 flex-row items-center shadow-lg active:scale-95"
            >
              <AntDesign name="picture" size={24} color="white" />
              <Text className="ml-3 text-lg font-semibold text-white">Pick an Image</Text>
            </TouchableOpacity>

            {selectedImage && (
              <StyledView className="mt-6 relative">
                {/* Display the image */}
                <Image source={{ uri: selectedImage }} className="rounded-lg shadow-lg w-64 h-64" resizeMode="cover" />
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

            {error && <StyledText className="text-red-500 mt-4 text-center">{error}</StyledText>}

            <TouchableOpacity
              onPress={submitImage}
              disabled={loading}
              className={`mt-6 bg-green-600 rounded-full px-6 py-4 w-full ${loading ? "opacity-50" : "opacity-100"}`}
            >
              <Text className="text-center text-white text-lg font-semibold">
                {loading ? "Generating..." : "Generate Caption"}
              </Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#00ff00" className="mt-4" />}

            {caption && (
              <StyledView className="mt-6 w-full px-6">
                <StyledText className="font-bold text-2xl text-white mb-2">Generated Caption:</StyledText>
                <StyledText className="text-white bg-white/20 p-4 rounded-lg text-lg leading-relaxed">
                  {caption}
                </StyledText>
              </StyledView>
            )}

            {grievanceType && (
              <StyledView className="mt-6 w-full px-6">
                <StyledText className="font-bold text-xl text-white mb-2">Grievance Type:</StyledText>
                <StyledText className="text-white bg-white/20 p-4 rounded-lg text-lg">
                  {grievanceType}
                </StyledText>
              </StyledView>
            )}

            {location && (
              <StyledView className="mt-6 w-full px-6">
                <StyledText className="font-bold text-xl text-white mb-2">Location:</StyledText>
                <StyledView className="bg-white/20 p-4 rounded-lg">
                  <StyledText className="text-white text-lg">
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
