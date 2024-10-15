// SignupForm.jsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { styled } from 'nativewind';
import { router } from "expo-router";

const StyledView = styled(View);
const StyledInput = styled(TextInput);
const StyledText = styled(Text);
const StyledButton = styled(Button);

const SignupForm = () => {
  // State variables for the signup form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <StyledView className="flex-col p-4 items-center">
      <StyledInput 
        className="mb-5 text-black w-60 h-8" 
        mode="outlined" 
        label="Name" 
        placeholder="Enter Name" 
        placeholderTextColor={'black'} 
        activeOutlineColor="#0e7490" 
        value={name}
        onChangeText={setName} // Update name state
      />
      <StyledInput 
        className="mb-5 text-black bg-white w-60 h-8" 
        mode="outlined" 
        label="Email" 
        placeholder="Enter Email" 
        placeholderTextColor={'black'} 
        activeOutlineColor="#0e7490" 
        value={email}
        onChangeText={setEmail} // Update email state
      />
      <StyledInput 
        className="mb-5 text-black bg-white w-60 h-8" 
        mode="outlined" 
        label="Phone Number" 
        keyboardType='phone-pad' 
        placeholder="Enter Phone Number" 
        placeholderTextColor={'black'} 
        activeOutlineColor="#0e7490" 
        value={phone}
        onChangeText={setPhone} // Update phone state
      />
      <StyledInput 
        className="mb-5 text-black bg-white w-60 h-8" 
        mode="outlined" 
        label="Password" 
        secureTextEntry 
        placeholder="Enter Password" 
        placeholderTextColor={'black'} 
        activeOutlineColor="#0e7490" 
        value={password}
        onChangeText={setPassword} // Update password state
        right={<TextInput.Icon icon="eye" color={'#0ea5e9'}/>} 
      />
      <StyledInput 
        className="mb-5 text-black bg-white w-60 h-8" 
        mode="outlined" 
        label="Confirm Password" 
        secureTextEntry 
        placeholder="Confirm Password" 
        placeholderTextColor={'black'} 
        activeOutlineColor="#0e7490" 
        value={confirmPassword}
        onChangeText={setConfirmPassword} // Update confirmPassword state
        right={<TextInput.Icon icon="eye" color={'#0ea5e9'}/>} 
      />
      <StyledButton 
        className="" 
        mode="text" 
        textColor="white" 
        rippleColor="#075985" 
        onPress={() => router.push('/login')}
      >
        Already have an account? <StyledText className="font-black text-cyan-300">Login</StyledText>
      </StyledButton>
      <StyledButton 
        className="w-40 h-15 mt-5" 
        mode="elevated" 
        buttonColor='#0891b2' 
        textColor="#ffff" 
        onPress={() => console.log("Sign Up")}
      >
        Sign Up
      </StyledButton>
    </StyledView>
  );
};

export default SignupForm;
