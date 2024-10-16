import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // for the send arrow icon
import Header from '../../components/Header';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! How are you?', sent: false },
    { text: 'I am good, thanks! And you?', sent: true },
    { text: 'What are you up to today?', sent: false },
    { text: 'Just working on some projects.', sent: true },
    { text: 'Sounds interesting!', sent: false },
  ]);
  const [keyboardVisible, setKeyboardVisible] = useState(false); // Track keyboard visibility
  const scrollViewRef = useRef(); // Reference for scrolling to the latest message

  // Handle keyboard show and hide events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sent: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(''); // Clear the input after sending

      // Scroll to the bottom when a new message is sent
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    }
  };

  return (
    <>
      <Header />
      <View className="flex-1 bg-gray-100">
        {/* Chat message bubbles */}
        <ScrollView
          className="flex-1 p-4"
          ref={scrollViewRef}
          contentContainerStyle={{ paddingBottom: 100 }} // Added padding to the bottom to avoid overlap with input
          onContentSizeChange={() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollToEnd({ animated: true });
            }
          }} // Automatically scroll to the latest message
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              className={`max-w-[80%] p-3 rounded-lg my-1 ${
                msg.sent ? 'self-end bg-blue-500' : 'self-start bg-gray-300'
              } shadow-md`}
              style={{
                borderTopLeftRadius: msg.sent ? 20 : 5,
                borderTopRightRadius: msg.sent ? 5 : 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <Text className={`${msg.sent ? 'text-white' : 'text-black'}`}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input and send button */}
        <View
          className={`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300 ${
            keyboardVisible ? 'mb-0' : ''
          }`} // Adjust bottom margin based on keyboard visibility
          style={{ marginBottom: keyboardVisible ? (Platform.OS === 'ios' ? 20 : 0) : 0 }}
        >
          <View className="flex-row items-center p-4">
            <TextInput
              className="flex-1 p-3 rounded-full bg-gray-200"
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              multiline // Allow multiple lines
              style={{ 
                maxHeight: 80, // Set a max height for the input
                flexGrow: 1, // Allow it to grow with content
                minHeight: 40, // Set a minimum height for better appearance
              }}
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
