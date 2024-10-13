import {View} from 'react-native';
import { router } from 'expo-router';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { Button} from 'react-native-paper';
import { Image } from 'expo-image';

export default function Index() {
  const StyledView = styled(View)
  const StyledButton = styled(Button)
  const StyledLinearGradient = styled(LinearGradient)
  const StyleImage = styled(Image)
  return (
    <StyledLinearGradient className="flex-1"  colors={['#b0e0e6', '#87ceeb', '#4682b4', '#1e90ff']}>
      <StyledView className="flex-1 items-center justify-center mt-[150]">
        <StyledView className="w-64 h-64 rounded-full items-center justify-center">
            {/* <StyledText className='font-bold text-white text-xl'>Shahar Saath</StyledText> */}
            {/* <Avatar.Image source={require('../assets/images/mainlogo.png')} size={256} /> */}
            <StyleImage className='w-[700] h-[700]' source={require('../assets/images/mainlogo.png')} />
        </StyledView>
      </StyledView>
      <StyledView className='flex-1 flex-row justify-between mx-5 mt-20'>
        
        <StyledButton className=' w-40 h-[43]' mode='elevated' buttonColor='#0891b2' textColor='#ffff' onPress={()=> router.push('/login')}>
          Login
        </StyledButton>
        <StyledButton className='w-40 h-[43]' mode='elevated' buttonColor='#0891b2' textColor='#ffff' onPress={()=> router.push('/sign-up')}>
          SignUp
        </StyledButton>
      </StyledView>
    </StyledLinearGradient>
  );
}