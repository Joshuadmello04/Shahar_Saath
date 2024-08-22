import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { styled } from 'nativewind';
import { Button } from 'react-native-paper';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logocontainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 200, // Adjusted to ensure it’s below the header
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: '#000',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#000',
  },
});
