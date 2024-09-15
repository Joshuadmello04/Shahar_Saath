import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { styled } from 'nativewind';
import Header from '../../components/Header';
export default class Profile extends Component {
  render() {
    const StyledText = styled(Text);
    const StyledView = styled(View);
    return (
    <StyledView className='flex-1'>
        <Header/>
        <StyledView className='flex-1 items-center justify-center'>
            <StyledText className='font-bold text-xl'>Profile</StyledText>
        </StyledView>
    </StyledView>
    
    )
  }
}