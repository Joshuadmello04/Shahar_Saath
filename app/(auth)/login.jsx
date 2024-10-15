// login.jsx
import { View } from 'react-native';
import React from 'react';
import { router } from "expo-router";
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from './LoginForm'; // Import the LoginForm component

export default function Login() {
  const StyledView = styled(View);
  const StyledLinearGradient = styled(LinearGradient);

  return (
    <StyledLinearGradient 
      className='flex-1 justify-center items-center' 
      colors={['#b0e0e6', '#87ceeb', '#4682b4', '#1e90ff']}
    >
      <StyledLinearGradient 
        colors={['#a3d5e6', '#5fa8d3', '#3b5998']} 
        className='w-[300] h-[400] pt-[20] rounded-xl shadow-black' 
        style={{ elevation: 10 }}
      >
        <StyledLinearGradient 
          colors={['#ffffff00', '#ffffff20']} 
          className='flex-1 rounded-xl'
        >
          <StyledView className='flex-1 justify-center items-center'>
            <LoginForm /> 
          </StyledView>
        </StyledLinearGradient>
      </StyledLinearGradient>
    </StyledLinearGradient>
  );
}
