// LoginForm.jsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';
import { Button, TextInput, Text } from 'react-native-paper';
import { Image } from 'expo-image';
import { router } from "expo-router";

const StyledView = styled(View);
const StyledInput = styled(TextInput);
const StyledText = styled(Text);
const StyledButton = styled(Button);
const StyledImage = styled(Image)

const LoginForm = () => {
  // State variables for input
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <StyledView className='flex-1 justify-center items-center'>
      <StyledView className="w-[100] h-[100] rounded-full items-center justify-center mb-5">
        <StyledImage className='w-[310] h-[310]' source={require('./assets/images/mainlogo.png')} />
      </StyledView>
      <StyledInput 
        className='mb-5 text-black bg-white w-60 h-8' 
        mode='outlined' 
        label='Name' 
        placeholder="Enter Name" 
        placeholderTextColor={'black'} 
        activeOutlineColor='#0e7490'
        value={name}
        onChangeText={setName} // Update name state
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
        onPress={() => router.push('/home')}
      >
        Login
      </StyledButton>
    </StyledView>
  );
};

export default LoginForm;
