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
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const scrollViewRef = useRef();
  const socket = useRef(null);

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decodedToken = decodeJWT(token);
          setCurrentUserId(decodedToken.id);
          setUserName(decodedToken.name);
        }
      } catch (error) {
        console.error('Error fetching user ID from token:', error);
      }
    };

    fetchCurrentUserId();

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/chat`);
        setMessages(response.data.reverse());
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.current = io(apiUrl);
    socket.current.on('new_message', (newMessage) => {
      setMessages((prevMessages) => {
        if (!prevMessages.find((msg) => msg._id === newMessage._id)) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    });

    socket.current.on('message_upvoted', (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg._id === updatedMessage._id ? updatedMessage : msg))
      );
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.post(
          `${apiUrl}/api/chat`,
          { text: message },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages((prevMessages) => [...prevMessages, response.data]);
        socket.current.emit('new_message', response.data);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const toggleUpvote = async (messageId) => {
    try {
      console.log('Sending messageId:', messageId);
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${apiUrl}/api/chat/${messageId}/upvote`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId
            ? { ...msg, upvotes: response.data.upvotes } // Update the upvotes for the specific message
            : msg
        )
      );
      socket.current.emit('message_upvoted', response.data);
    } catch (error) {
      console.error('Error upvoting message:', error);
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
      <View className="flex-row items-center mt-1">
        <TouchableOpacity
          onPress={msg.userId._id === currentUserId ? null : () => toggleUpvote(msg._id)} // Disable onPress for own messages
          disabled={msg.userId._id === currentUserId} // Disable the button for own messages
          className="mr-2"
        >
          <Ionicons
            name="thumbs-up"
            size={20}
            color={
              msg.userId._id === currentUserId
                ? 'gray' // Gray color for the user's own messages
                : (msg.upvotes || []).includes(currentUserId) // Fallback to empty array if upvotes is undefined
                ? 'red' // Red color if the user has upvoted
                : 'gray' // Gray color if the user hasn't upvoted
            }
          />
        </TouchableOpacity>
        <Text>{(msg.upvotes || []).length}</Text> 
      </View>
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
