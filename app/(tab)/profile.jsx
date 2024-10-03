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
  const [isEditing, setIsEditing] = useState(false); // To toggle between input and text
  const [phoneNumber, setPhoneNumber] = useState(""); // Stores the phone number
  const [imageUri, setImageUri] = useState(null); // Stores the URI of the selected profile picture

  const StyledText = styled(Text);
  const StyledView = styled(View);
  const StyledTextInput = styled(TextInput);

  // Phone number validation function using regex
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9-\s]*$/; // Only allows digits, spaces, and dashes
    return phoneRegex.test(number);
  };

  const handlePhoneNumberChange = (number) => {
    // Directly set the number without validation for now
    setPhoneNumber(number);
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Only validate when stopping edit mode
      if (phoneNumber === "") {
        Alert.alert("Phone number cannot be empty");
        return;
      } else if (!validatePhoneNumber(phoneNumber)) {
        Alert.alert(
          "Invalid input",
          "Only digits, spaces, and dashes are allowed."
        );
        return;
      }
    }
    setIsEditing(!isEditing);
    if (!isEditing) {
      Keyboard.dismiss(); // Dismiss keyboard when editing is done
    }
  };

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100} // Adjust for iOS keyboard
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always" // Keep the keyboard active
        >
          <StyledView className="flex-1 items-center justify-center p-2 mb-16 bg-white">
              <StyledView className="mb-11 items-center">
                <Avatar.Image
                  style={{ backgroundColor: "#f3f4f6" }}
                  size={200} // Profile picture size
                  source={
                    imageUri
                      ? { uri: imageUri }
                      : { uri: "https://www.example.com/your-dp-url" }
                  } // Display selected dp or default dp
                />
                <IconButton
                  icon="camera" // You can use any icon from the icon set
                  size={25} // Set the size of the icon
                  onPress={pickImage} // Use the same function to change the picture
                  style={{
                    position: "absolute",
                    bottom: 5, // Adjust this value for vertical positioning
                    right: -2, // Adjust this value for horizontal positioning
                    backgroundColor: "white", // Optional: add a background for better visibility
                    borderRadius: 15, // Optional: make it circular
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
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
