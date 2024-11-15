import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Correct import for icons

import Home from './home';
import Profile from './profile';
import Course from './course';
import Chat from './chat';
import GrievanceTable from './GrievanceTable';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // optional, if you don't want a header
        tabBarActiveTintColor: '#0051ff', // active icon color
        tabBarInactiveTintColor: '#00000', // inactive icon color
        tabBarStyle: {
          backgroundColor: '#54bbff', // tab bar background color
          height: 70, // Increase the height of the tab bar
          paddingBottom: 5, // Optional: To give some extra space at the bottom
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Course"
        component={Course}
        options={{
          tabBarLabel: 'Courses',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'book-open-variant' : 'book-open-page-variant'}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'chat' : 'chat-outline'}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="GrievanceTable"
        component={GrievanceTable}
        options={{
          tabBarLabel: 'Grievances',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'file-document' : 'file-document-outline'}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
