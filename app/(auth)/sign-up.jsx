import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React from 'react';
import { styled } from 'nativewind';
import { Button, Card } from 'react-native-paper';
export default function Signup() {
  const StyledView = styled(View)
  const StyledCard = styled(Card)
  const StyledInput = styled(TextInput)
  const StyledText = styled(Text)
  const StyledButtom = styled(Button)
  return (
    <StyledView className='flex-1 justify-center items-center bg-white'>
      <StyledCard className='w-[300] h-[400] pt-[60] bg-slate-100'>
        <Card.Actions className='flex-col'>
          
          <StyledInput className='mb-5 pl-2 text-black bg-white w-60 h-8 rounded-md border-black border-2' mode='outlined' label='Name' placeholder="Enter Name" placeholderTextColor={'black'} />
          <StyledInput className='mb-5 pl-2 text-black bg-white w-60 h-8 rounded-md border-black border-2' mode='outlined' label='Email' placeholder="Enter Email" placeholderTextColor={'black'}/>
          <StyledInput className='mb-5 pl-2 text-black bg-white w-60 h-8 rounded-md border-black border-2' mode='outlined' label='Password' secureTextEntry placeholder="Enter Pasword" placeholderTextColor={'black'}/>
          <StyledInput className='mb-5 pl-2 text-black bg-white w-60 h-8 rounded-md border-black border-2' mode='outlined' label='Password' secureTextEntry placeholder="Confirm Password" placeholderTextColor={'black'} />
          <Button className='bg-black w-40 h-10 mt-5' mode='elevated' textColor='#ffff'>SignUp</Button>
        </Card.Actions>
      </StyledCard>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Added padding to avoid content being too close to edges
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    width: 320, // Increased width
    borderRadius: 8,
    backgroundColor: '#c5ccd4',
    padding: 20,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom:25,
    marginTop:10
  },
  input: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    width: '80%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
    backgroundColor: '#000',
    marginTop: 20,
    width: '50%',
    marginBottom:-14
  },
  buttonText: {
    color: '#fff',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
