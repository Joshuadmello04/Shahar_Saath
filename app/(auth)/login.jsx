import {View} from 'react-native';
import React from 'react';
import { router } from "expo-router";
import { styled } from 'nativewind';
import { Button, Card, TextInput, Text} from 'react-native-paper';

export default function Login() {
  const StyledView = styled(View)
  const StyledCard = styled(Card)
  const StyledInput = styled(TextInput)
  const StyledText = styled(Text)
  const StyledButtom = styled(Button)

  return (
    <StyledView className='flex-1 justify-center items-center bg-white'>
      <StyledCard className='w-[300] h-[400] pt-[30] bg-slate-100'>
        <Card.Actions className='flex-col'>
          <StyledView className="w-[100] h-[100] rounded-full bg-black items-center justify-center mb-5">
            <StyledText className='font-bold  text-white text-sm text-center'>Shahar Saath</StyledText>
          </StyledView>
          <StyledInput className='mb-5 pl-2 text-black bg-white w-60 h-8' mode='outlined' label='Name' placeholder="Enter Name" placeholderTextColor={'black'} activeOutlineColor='black'/>
          <StyledInput className='mb-5 pl-2 text-black bg-white w-60 h-8' mode='outlined' label='Password' secureTextEntry placeholder="Enter Pasword" placeholderTextColor={'black'} activeOutlineColor='black' right={<TextInput.Icon icon="eye" />}/>
          <Button className='' mode='text' textColor='black' rippleColor="#f8fafc" onPress={()=> router.push('/sign-up')}>New User? Sign Up</Button>
          <Button className='bg-black w-40 h-11 mt-5' mode='elevated' textColor='#ffff'>Login</Button>
        </Card.Actions>
      </StyledCard>
    </StyledView>
  );
}

