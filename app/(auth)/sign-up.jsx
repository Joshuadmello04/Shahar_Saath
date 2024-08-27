import { View } from 'react-native';
import React from 'react';
import { router } from "expo-router";
import { styled } from 'nativewind';
import { Button, Text, TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function Signup() {
  const StyledView = styled(View);
  const StyledInput = styled(TextInput);
  const StyledText = styled(Text);
  const StyledButton = styled(Button);
  const StyledLinearGradient = styled(LinearGradient);

  return (
    <StyledLinearGradient className="flex-1 justify-center items-center" colors={['#b0e0e6', '#87ceeb', '#4682b4', '#1e90ff']}>
        <StyledLinearGradient colors={['#a3d5e6', '#5fa8d3', '#3b5998']} className='w-[300] h-[400] pt-[20]  rounded-xl shadow-black' style={{ elevation: 10 }}>
          <StyledLinearGradient colors={['#ffffff00', '#ffffff20']} className='flex-1 rounded-xl'>
            <StyledView className="flex-col p-4 items-center">
              <StyledInput className="mb-5 text-black w-60 h-8" mode="outlined" label="Name" placeholder="Enter Name" placeholderTextColor={'black'} activeOutlineColor="#0e7490" />
              <StyledInput className="mb-5 text-black bg-white w-60 h-8" mode="outlined" label="Email" placeholder="Enter Email" placeholderTextColor={'black'} activeOutlineColor="#0e7490" />
              <StyledInput className="mb-5 text-black bg-white w-60 h-8" mode="outlined" label="Password" secureTextEntry placeholder="Enter Password" placeholderTextColor={'black'} activeOutlineColor="#0e7490" right={<TextInput.Icon icon="eye" color={'#0ea5e9'}/>} />
              <StyledInput className="mb-5 text-black bg-white w-60 h-8" mode="outlined" label="Confirm Password" secureTextEntry placeholder="Confirm Password" placeholderTextColor={'black'} activeOutlineColor="#0e7490" right={<TextInput.Icon icon="eye" color={'#0ea5e9'}/>} />
              <StyledButton className="" mode="text" textColor="white" rippleColor="#075985" onPress={() => router.push('/login')}>
                Already have an account? <StyledText className="font-black text-cyan-300">Login</StyledText>
              </StyledButton>
              <StyledButton className="w-40 h-15 mt-5" mode="elevated" buttonColor='#0891b2' textColor="#ffff">SignUp</StyledButton>
            </StyledView>
          </StyledLinearGradient>
        </StyledLinearGradient>
    </StyledLinearGradient>
  );
}
