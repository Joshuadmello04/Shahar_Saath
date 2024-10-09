import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { styled } from "nativewind";
import { Avatar, IconButton, TextInput } from "react-native-paper";
import Header from "../../components/Header";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const [imageUri, setImageUri] = useState(null); // Stores the URI of the selected profile picture

  const StyledText = styled(Text);
  const StyledView = styled(View);

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
    }
  };

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
                      : { uri: "https://www.example.com/your-dp-url" }
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
            <StyledView className="w-[350] h-[50] bg-gray-100 p-3 rounded-xl mb-5 shadow-sm shadow-black">
              <StyledText className="text-lg">John Doe</StyledText>
            </StyledView>
            <StyledView className="w-[350] h-[50] bg-gray-100 p-3 rounded-xl mb-5 shadow-sm shadow-black">
              <StyledText className="text-md">johndoe@example.com</StyledText>
            </StyledView>
            <StyledView className="w-[350] h-[50] bg-gray-100 p-3 rounded-xl mb-5 shadow-sm shadow-black">
              <StyledText className="text-md">(+91) 1111111111</StyledText>
            </StyledView>
          </StyledView>

    </>
  );
}
