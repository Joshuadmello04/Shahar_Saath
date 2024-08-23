import {View} from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { Button, Card, Text, TextInput} from 'react-native-paper';
export default function Signup() {
  const StyledView = styled(View)
  const StyledCard = styled(Card)
  const StyledInput = styled(TextInput)
  const StyledButtom = styled(Button)
  return (
    <StyledView className='flex-1 justify-center items-center bg-white'>
      <StyledCard className='w-[300] h-[400] pt-[60] bg-slate-100'>
        <Card.Actions className='flex-col'>
          
          <StyledInput className='mb-5 pl-2 text-black bg-white w-60 h-8' mode='outlined' label='Name' placeholder="Enter Name" placeholderTextColor={'black'} activeOutlineColor='black'/>
          <StyledInput className='mb-5 pl-2 text-black bg-white w-60 h-8' mode='outlined' label='Email' placeholder="Enter Email" placeholderTextColor={'black'} activeOutlineColor='black'/>
          <StyledInput className='mb-5 pl-2 text-black bg-white w-60 h-8' mode='outlined' label='Password' secureTextEntry placeholder="Enter Pasword" placeholderTextColor={'black'} activeOutlineColor='black' right={<TextInput.Icon icon="eye" />}/>
          <StyledInput className='mb-5 pl-2 text-black bg-white w-60 h-8' mode='outlined' label='Password' secureTextEntry placeholder="Confirm Password" placeholderTextColor={'black'} activeOutlineColor='black' right={<TextInput.Icon icon="eye" />}/>
          <Button className='bg-black w-40 h-10 mt-5' mode='elevated' textColor='#ffff'>SignUp</Button>
        </Card.Actions>
      </StyledCard>
    </StyledView>
  );
}
