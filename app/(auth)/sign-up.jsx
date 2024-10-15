// sign-up.jsx
import React from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import SignupForm from './SignupForm'; // Import the SignupForm component

export default function SignUp({ name, email, phone, password, confirmPassword, setName, setEmail, setPhone, setPassword, setConfirmPassword }) {
  const StyledLinearGradient = styled(LinearGradient);
  
  return (
    <StyledLinearGradient 
      className="flex-1 justify-center items-center" 
      colors={['#b0e0e6', '#87ceeb', '#4682b4', '#1e90ff']}
    >
      <StyledLinearGradient 
        colors={['#a3d5e6', '#5fa8d3', '#3b5998']} 
        className='w-[300] h-[460] pt-[20] rounded-xl shadow-black' 
        style={{ elevation: 10 }}
      >
        <StyledLinearGradient 
          colors={['#ffffff00', '#ffffff20']} 
          className='flex-1 rounded-xl'
        >
          <SignupForm 
            name={name} 
            email={email} 
            phone={phone} 
            password={password} 
            confirmPassword={confirmPassword} 
            setName={setName} 
            setEmail={setEmail} 
            setPhone={setPhone} 
            setPassword={setPassword} 
            setConfirmPassword={setConfirmPassword} 
          />
        </StyledLinearGradient>
      </StyledLinearGradient>
    </StyledLinearGradient>
  );
}
