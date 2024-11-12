import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  
} from "react-native";
import { styled } from "nativewind";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For JWT

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [grievanceType, setGrievanceType] = useState("");
  const [input, setInput] = useState("");
  const [displayedCaption, setDisplayedCaption] = useState("");
  const [error, setError] = useState("");

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
      setDisplayedCaption("");
      setInput("");
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
  
    console.log("Sending image to backend...");
    try {
      const response = await axios.post(
        "http://192.168.1.6:8000/generate", // Make sure this URL is correct for your environment
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000, // Increased timeout
        }
      );
      console.log("Response received:", response);
      if (response.data && response.data.grievance_type && response.data.caption) {
        setGrievanceType(response.data.grievance_type);
        setCaption(response.data.caption);

        // After successful generation, send data to backend
        submitGrievance(response.data.grievance_type, response.data.caption);
      } else {
        setError("No grievance type or caption received from the server.");
      }
    } catch (error) {
      console.error("Error generating caption:", error);
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          setError("Request timed out. Please try again.");
        } else {
          setError("Network error or server timeout. Please try again.");
        }
      } else {
        setError(error.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const submitGrievance = async (grievanceType, caption) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.15:5000";

      const formData = new FormData();
      formData.append("file", {
        uri: selectedImage,
        name: "grievance_image.jpg",
        type: "image/jpeg",
      });

      formData.append("title", grievanceType);
      formData.append("description", caption);

      const response = await axios.post(`${apiUrl}/api/grievances`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Send form data with image
        },
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

  useEffect(() => {
    if (caption) {
      let index = 0;
      setDisplayedCaption(""); // Reset displayed caption
      const interval = setInterval(() => {
        if (index < caption.length) {
          setDisplayedCaption((prev) => prev + caption[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Adjust typing speed here
      return () => clearInterval(interval);
    }
  }, [caption]);

  return (
    <>
      <Header />
      <LinearGradient colors={["#1c1c6b", "#4b0082", "#8a2be2"]} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <StyledView className="flex-1 items-center justify-center p-4">
            <StyledText className="font-extrabold text-4xl text-white animate-pulse tracking-wider">
              Image Captioner
            </StyledText>

            <StyledView className="mt-6">
              <TouchableOpacity
                onPress={pickImage}
                className="bg-white rounded-full px-6 py-4 shadow-lg flex-row items-center transform transition-transform hover:scale-105"
              >
                <AntDesign name="picture" size={24} color="black" />
                <Text className="ml-3 text-lg font-semibold">Pick an image</Text>
              </TouchableOpacity>
            </StyledView>

            {selectedImage && (
              <StyledView className="mt-6">
                <Image
                  source={{ uri: selectedImage }}
                  className="rounded-lg shadow-lg w-64 h-64 transition-opacity opacity-90 hover:opacity-100"
                  resizeMode="cover"
                />
              </StyledView>
            )}

            {error && <StyledText className="text-red-500 mt-4">{error}</StyledText>}

            <TouchableOpacity
              onPress={submitImage}
              disabled={loading}
              className={`mt-6 bg-green-600 rounded-full px-6 py-4 w-full transform transition-transform hover:scale-105 ${loading ? "opacity-50" : "opacity-100"}`}
            >
              <Text className="text-center text-white text-lg font-semibold">Generate Caption</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#00ff00" className="mt-4" />}

            {displayedCaption && (
              <StyledView className="mt-6 w-full px-6">
                <StyledText className="font-bold text-2xl text-white">Generated Caption:</StyledText>
                <StyledText
                  className="text-white bg-black/30 p-4 rounded-lg mt-2 leading-relaxed"
                  style={{ fontFamily: "monospace", fontSize: 18 }}
                >
                  {displayedCaption}
                </StyledText>
              </StyledView>
            )}

            {grievanceType && (
              <StyledView className="mt-6 w-full px-6">
                <StyledText className="font-bold text-xl text-white">Grievance Type:</StyledText>
                <StyledText className="text-white bg-black/30 p-4 rounded-lg mt-2">{grievanceType}</StyledText>
              </StyledView>
            )}
          </StyledView>
        </ScrollView>
      </LinearGradient>
    </>
  );
}
