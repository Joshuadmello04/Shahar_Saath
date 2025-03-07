import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from "expo-router";
import { styled } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default class Header extends Component {
  state = {
    menuVisible: false,
  };

  toggleMenu = () => {
    this.setState((prevState) => ({ menuVisible: !prevState.menuVisible }));
  };

  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');  // Clear the stored token
      console.log('User logged out');
      this.toggleMenu();  // Close the menu after logout
      router.replace('/login');  // Navigate back to login screen
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  };

  render() {
    const _handleMore = () => console.log('Shown more');

    return (
      <SafeAreaView style={{ flex: 0, backgroundColor: 'black' }} edges={['top', 'right', 'left']}>
        <Appbar.Header
          mode="center-aligned"
          style={{
            backgroundColor: '#54bbff',
            elevation: 0, // Remove shadow on Android
            margin: 0, // No margin around the Appbar
            padding: 0, // No padding around the Appbar
          }}
        >
          <Appbar.Content title="Shahar Saath" titleStyle={{ fontWeight: 'bold' }} />
          <Appbar.Action
            color="black"
            icon="dots-vertical"
            onPress={this.toggleMenu}
          />
        </Appbar.Header>
        {this.state.menuVisible && (
          <View style={{ position: 'absolute', right: 0, bottom: 0,}}> 
          <StyledView className="bg-white rounded-lg shadow-lg p-2 border border-gray-300">
            <StyledTouchableOpacity onPress={this.handleLogout}>
              <StyledText className="text-black p-2">Logout</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </View>
        )}
      </SafeAreaView>
    );
  }
}
