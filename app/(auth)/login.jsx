import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React from 'react';
import { router } from "expo-router";
import { styled } from 'nativewind';
import { Button, Card } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';

export default function Login() {
  const StyledView = styled(View)
  const StyledCard = styled(Card)
  const StyledInput = styled(TextInput)
  const StyledText = styled(Text)
  const StyledButtom = styled(Button)
  return (
    <PaperProvider
    settings={{
      rippleEffectEnabled: false
    }}>
    <StyledView className='flex-1 justify-center items-center bg-white'>
      <StyledCard className='w-[300] h-[400] pt-[30] bg-slate-100'>
        <Card.Actions className='flex-col'>
          <StyledView className="w-[100] h-[100] rounded-full bg-black items-center justify-center mb-5">
            <StyledText className='font-bold  text-white text-sm text-center'>Shahar Saath</StyledText>
          </StyledView>
          <StyledInput className='mb-5 pl-2 text-black bg-white w-60 h-8 rounded-md border-black border-2' mode='outlined' label='Name' placeholder="Enter Name" placeholderTextColor={'black'} />
          <StyledInput className='mb-5 pl-2 text-black bg-white w-60 h-8 rounded-md border-black border-2' mode='outlined' label='Password' secureTextEntry placeholder="Enter Pasword" placeholderTextColor={'black'}/>
          <Button className='' mode='text' textColor='black'  onPress={()=> router.push('/sign-up')}>New User? Sign Up</Button>
          <Button className='bg-black w-40 h-11 mt-5' mode='elevated' textColor='#ffff'>Login</Button>
        </Card.Actions>
      </StyledCard>
    </StyledView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50, // Adjust this value based on HeaderBar height
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    width: 300,
    borderRadius: 8,
    backgroundColor: '#c5ccd4',
    padding: 20,
  },
  formContainer: {
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 25,
    backgroundColor: '#fff',
    width: '100%',
  },
  link: {
    marginVertical: 10,
  },
  linkText: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
    backgroundColor: '#000',
    width: 100,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  logoContainer:{
    alignItems:'center'
  }
});
