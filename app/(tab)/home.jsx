import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { styled } from 'nativewind';
import Header from '../../components/Header';
export default class Home extends Component {
  render() {
    const StyledView = styled(View);
    const StyledText = styled(Text);
    return (
    <StyledView className='flex-1'>
    <Header/>
    <StyledView className='flex-1 items-center justify-center'>
        <StyledText className='font-bold text-xl text-black'>Home</StyledText>
      </StyledView>
    </StyledView>
    )
  }
}