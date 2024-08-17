import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React from 'react';
import { router } from "expo-router";

export default function Login() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          <View style={styles.card}>
            <View style={styles.logoContainer}>
                <View style={styles.circle}>
                    <Text style={{ color: '#ffff' }}>Logo</Text>
                </View>
            </View>
            <View style={styles.formContainer}>
              {/* Input Field for Username */}
              <TextInput 
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
              />
              {/* Input Field for Password */}
              <TextInput 
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
              />
              {/* Signup Link */}
              <TouchableOpacity 
                style={styles.link} 
                activeOpacity={0.7} 
                onPress={() => router.push('/sign-up')}
              >
                <Text style={styles.linkText}>New User? Sign Up</Text>
              </TouchableOpacity>
              {/* Login Button */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.button} 
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
