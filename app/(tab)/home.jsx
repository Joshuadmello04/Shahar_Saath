import { View, Text } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';
import Header from '../../components/Header';

export default function Home() {
  const StyledView = styled(View);
  const StyledText = styled(Text);
  return (
    <>
      <Header />
      <StyledView className='flex-1 items-center justify-center'>
        <StyledText className='font-bold text-xl'>Home</StyledText>
      </StyledView>
    </>  
  )
}