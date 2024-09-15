import { View } from 'react-native'
import React from 'react'
import { BottomNavigation, Text } from 'react-native-paper';
import Home from './home'
import Profile from './profile';

export default function _layout() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline'},

  ]);
    
    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        profile: Profile
      });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor='#0051ff'
      inactiveColor="#000000"
      barStyle={{ backgroundColor: '#54bbff'}}
      theme={{colors: {secondaryContainer: '#54bbff'}}}

    />
  )
}