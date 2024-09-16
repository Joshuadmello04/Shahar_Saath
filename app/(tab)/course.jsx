import { View, Text } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';
import Header from '../../components/Header';

export default function Course() {
    const StyledText = styled(Text);
    const StyledView = styled(View);
    return (
      <>
      <Header />
      <StyledView className='flex-1 items-center justify-center'>
        <StyledText className='font-bold text-xl'>Course</StyledText>
      </StyledView>
      </>  
    )
}