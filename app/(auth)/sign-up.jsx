import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React from 'react';

export default function Signup() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.formContainer}>
              {/* Input Field for Name */}
              <TextInput 
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#888"
              />
              {/* Input Field for Email */}
              <TextInput 
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
              />
              {/* Input Field for Password */}
              <TextInput 
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
              />
              {/* Input Field for Confirm Password */}
              <TextInput 
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                secureTextEntry
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.button} 
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
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
