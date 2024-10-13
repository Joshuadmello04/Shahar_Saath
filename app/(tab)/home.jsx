import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styled } from "nativewind";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Header from "../../components/Header";
import { LinearGradient } from "expo-linear-gradient";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
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

    // Append the image file
    formData.append("file", {
        uri: selectedImage,
        name: "photo.jpg",
        type: "image/jpeg",
    });

    // Append the input text, it can be null if the user didn't provide it
    formData.append("input", input || ""); // Pass an empty string if input is empty

    console.log("FormData being sent:", formData);

    try {
      const response = await axios.post(
        "http://<insert_your_ipv4>:8000/generate", // Your local server's IP
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            timeout: 30000,
        }
    );
    

        // Process the response in a separate try-catch block
        try {
            if (response.data && response.data.caption) {
                setCaption(response.data.caption);
            } else {
                throw new Error("No caption received from the server.");
            }

            setError(""); // Clear any previous error messages
            setInput("");
            setSelectedImage(null); // Reset selected image to allow a new selection
        } catch (processError) {
            console.error("Error processing caption:", processError);
            setError(processError.message || "An error occurred while processing the caption.");
        }
    } catch (error) {
        console.error("Error generating caption:", error);
        
        // Differentiate between Axios errors and other errors
        if (axios.isAxiosError(error)) {
            setError("Network error or server timeout. Please try again.");
        } else {
            setError(error.message || "An unexpected error occurred.");
        }
    } finally {
        setLoading(false);
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
      }, 50);
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
              <Pressable
                onPress={pickImage}
                className="bg-white rounded-full px-6 py-4 shadow-lg flex-row items-center transform transition-transform hover:scale-105"
              >
                <AntDesign name="picture" size={24} color="black" />
                <Text className="ml-3 text-lg font-semibold">Pick an image</Text>
              </Pressable>
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

            <StyledView className="mt-6 w-full px-6">
              <Text className="text-white text-lg">Enter a text prompt:</Text>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Give some Context"
                placeholderTextColor="#D3D3D3"
                className="border border-gray-400 bg-white/90 rounded-lg p-4 mt-3 w-full"
                multiline={true}
                rows={4} 
                textAlignVertical="top"
                style={{ maxHeight: 120, fontSize: 16 }}
                editable={!loading}
              />
            </StyledView>

            <TouchableOpacity
              onPress={submitImage}
              disabled={loading}
              className={`mt-6 bg-green-600 rounded-full px-6 py-4 w-full transform transition-transform hover:scale-105 ${loading ? "opacity-50" : "opacity-100"}`}
            >
              <Text className="text-center text-white text-lg font-semibold">Generate Caption</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#00ff00" className="mt-4" />}

            {error && (
              <StyledText className="text-red-500 mt-4">{error}</StyledText>
            )}

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
          </StyledView>
        </ScrollView>
      </LinearGradient>
    </>
  );
}
