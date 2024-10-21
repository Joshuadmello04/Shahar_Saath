// LoginForm.jsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';
import { Button, TextInput, Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { router } from "expo-router";
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyledView = styled(View);
const StyledInput = styled(TextInput);
const StyledText = styled(Text);
const StyledButton = styled(Button);
const StyledImage = styled(Image)

const LoginForm = () => {
  // State variables for input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        Alert.alert("Success", data.message);
        // Redirect to home or another page after successful login
        router.push('/home');
      } else {
        Alert.alert("Error", data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  return (
    <StyledView className='flex-1 justify-center items-center'>
      <StyledView className="w-[100] h-[100] rounded-full items-center justify-center mb-5">
        <StyledImage className='w-[310] h-[310]' source={require('./assets/images/mainlogo.png')} />
      </StyledView>
      <StyledInput 
        className='mb-5 text-black bg-white w-60 h-8' 
        mode='outlined' 
        label='Email' 
        placeholder="Enter Email" 
        placeholderTextColor={'black'} 
        activeOutlineColor='#0e7490'
        value={email}
        onChangeText={setEmail} // Update name state
      />
      <StyledInput 
        className='mb-5 text-black bg-white w-60 h-8' 
        mode='outlined' 
        label='Password' 
        secureTextEntry 
        placeholder="Enter Password" 
        placeholderTextColor={'black'} 
        activeOutlineColor='#0e7490' 
        value={password}
        onChangeText={setPassword} // Update password state
        right={<TextInput.Icon icon="eye" color={'#0ea5e9'}/>}
      />
      <StyledButton 
        className='' 
        mode='text' 
        textColor='white' 
        rippleColor="#075985" 
        onPress={() => router.push('/sign-up')}
      >
        New User? <StyledText className='font-black text-cyan-300'>Sign Up</StyledText>
      </StyledButton>
      <StyledButton 
        className='w-40 h-11 mt-5' 
        mode='elevated' 
        buttonColor='#0891b2' 
        textColor='#ffff' 
        onPress={handleLogin}
      >
        Login
      </StyledButton>
    </StyledView>
  );
};

export default LoginForm;
