import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { io } from 'socket.io-client';
import axios from 'axios';
import Header from '../../components/Header';
import AsyncStorage from "@react-native-async-storage/async-storage"; // For JWT

// JWT decode function
const decodeJWT = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
};

const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.15:5000';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null); // Use state to hold current user ID
  const [userName, setUserName] = useState(null); // Store the current user's name
  const scrollViewRef = useRef();
  const socket = useRef(null); // Initialize socket inside useRef

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Fetched token:', token); // Log the token
        if (token) {
          const decodedToken = decodeJWT(token);
          console.log('Decoded user ID from token:', decodedToken.id); // Log decoded user ID
          setCurrentUserId(decodedToken.id); // Set user ID after decoding the token
          setUserName(decodedToken.name); // Set the user name
        }
      } catch (error) {
        console.error('Error fetching user ID from token:', error);
      }
    };

    fetchCurrentUserId(); // Fetch user ID on mount

    // Fetch existing messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/chat`);
        console.log('Fetched messages:', response.data); // Log the fetched messages
        setMessages(response.data.reverse()); // Show older messages at the top
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages(); // Fetch messages on mount

    // Initialize socket connection once on mount
    socket.current = io(apiUrl);
    socket.current.on('new_message', (newMessage) => {
      console.log('New message received via socket:', newMessage); // Log the received message
      if (newMessage.userId && newMessage.userId.name) {
        setMessages((prevMessages) => {
          // Avoid duplicating the message
          if (!prevMessages.find((msg) => msg._id === newMessage._id)) {
            return [...prevMessages, newMessage]; // Add message only if it's not already in the state
          }
          return prevMessages;
        });
      }
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.current.disconnect(); 
    };
  }, []); // Empty dependency array ensures this runs only once after component mount

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.post(
          `${apiUrl}/api/chat`,
          { text: message },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Now, message has userId with the name populated, so use it directly
        setMessages((prevMessages) => [
          ...prevMessages,
          response.data, // Add the response which has populated userId
        ]);

        // Emit new message via WebSocket after updating state to avoid duplication
        socket.current.emit('new_message', response.data);

        setMessage(''); // Clear input field after sending message
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <>
      <Header />
      <View className="flex-1 bg-gray-100">
        <ScrollView
          className="flex-1 p-4"
          ref={scrollViewRef}
          contentContainerStyle={{ paddingBottom: 100 }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              className={`flex-row items-center my-1 ${msg.userId._id === currentUserId ? 'justify-end' : 'justify-start'}`}
            >
              <View
                className={`max-w-[80%] p-3 rounded-lg ${msg.userId._id === currentUserId ? 'bg-blue-500' : 'bg-gray-300'}`}
              >
                <Text className="font-semibold">{msg.userId?.name || 'Unknown'}</Text>
                <Text className={`${msg.userId._id === currentUserId ? 'text-white' : 'text-black'}`}>{msg.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300">
          <View className="flex-row items-center p-4">
            <TextInput
              className="flex-1 p-3 rounded-full bg-gray-200"
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity onPress={sendMessage} className="ml-3 bg-blue-500 p-3 rounded-full">
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
