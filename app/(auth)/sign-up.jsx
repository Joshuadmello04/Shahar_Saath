// sign-up.jsx
import React from 'react';
import { View } from 'react-native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import SignupForm from './SignupForm'; // Import the SignupForm component
import { Alert } from 'react-native';

export default function SignUp({ name, email, phone, password, confirmPassword, setName, setEmail, setPhone, setPassword, setConfirmPassword }) {
  const StyledLinearGradient = styled(LinearGradient);
  
  const handleSignUp = async () => {
    // Validation before sending data to the backend
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Send data to the backend
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If the sign-up is successful, navigate to the login page
        Alert.alert("Success", data.message);
        router.push('/login');
      } else {
        // Handle errors from the backend (e.g., user already exists)
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

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
