import { View } from 'react-native';
import React from 'react';
import { router } from "expo-router";
import { styled } from 'nativewind';
import { Button, TextInput, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

export default function Login() {
  const StyledView = styled(View);
  const StyledInput = styled(TextInput);
  const StyledText = styled(Text);
  const StyledButton = styled(Button);
  const StyledLinearGradient = styled(LinearGradient);
  const StyledImage = styled(Image)
  return (
    <StyledLinearGradient className='flex-1 justify-center items-center' colors={['#b0e0e6', '#87ceeb', '#4682b4', '#1e90ff']}>
        <StyledLinearGradient colors={['#a3d5e6', '#5fa8d3', '#3b5998']} className='w-[300] h-[400] pt-[20]  rounded-xl shadow-black' style={{ elevation: 10 }}>
          <StyledLinearGradient colors={['#ffffff00', '#ffffff20']} className='flex-1 rounded-xl'>
            <StyledView className='flex-1 justify-center items-center'>
              <StyledView className="w-[100] h-[100] rounded-full items-center justify-center mb-5">
                {/* <StyledText className='font-bold text-white text-sm text-center'>Shahar Saath</StyledText> */}
                <StyledImage className='w-[310] h-[310]' source={require('./assets/images/mainlogo.png')} />
              </StyledView>
              <StyledInput className='mb-5 text-black bg-white w-60 h-8' mode='outlined' label='Name' placeholder="Enter Name" placeholderTextColor={'black'} activeOutlineColor='#0e7490'/>
              <StyledInput className='mb-5 text-black bg-white w-60 h-8' mode='outlined' label='Password' secureTextEntry placeholder="Enter Password" placeholderTextColor={'black'} activeOutlineColor='#0e7490' right={<TextInput.Icon icon="eye" color={'#0ea5e9'}/>}/>
              <StyledButton className='' mode='text' textColor='white' rippleColor="#075985" onPress={() => router.push('/sign-up')}>
                New User? <StyledText className='font-black text-cyan-300'>Sign Up</StyledText>
              </StyledButton>
              <StyledButton className='w-40 h-11 mt-5' mode='elevated' buttonColor='#0891b2' textColor='#ffff' onPress={() => router.push('/home')}>Login</StyledButton>
            </StyledView>
          </StyledLinearGradient>
        </StyledLinearGradient>
    </StyledLinearGradient>
  );
}
