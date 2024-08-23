import {View} from 'react-native';
import { router } from 'expo-router';
import { styled } from 'nativewind';
import { Button,Text} from 'react-native-paper';
export default function Index() {
  const StyledView = styled(View)
  const StyledButton = styled(Button)
  const StyledText = styled(Text)
  return (
    <StyledView className="flex-1 bg-white ">
    <StyledView className="flex-1 items-center justify-center bg-white mt-[150]">
    <StyledView className="w-64 h-64 rounded-full bg-black items-center justify-center">
          <StyledText className='font-bold text-white text-xl'>Shahar Saath</StyledText>
        </StyledView>
      </StyledView>
      <StyledView className='flex-1 flex-row justify-between mx-5 mt-20'>
        
        <StyledButton className='bg-black w-40 h-[43]' mode='elevated'  textColor='#ffff' onPress={()=> router.push('/login')}>
          Login
        </StyledButton>
        <StyledButton className='bg-black w-40 h-[43]' mode='elevated' textColor='#ffff' onPress={()=> router.push('/sign-up')}>
          SignUp
        </StyledButton>
      </StyledView>
    </StyledView>
  );
}