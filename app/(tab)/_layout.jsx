import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './home';
import Profile from './profile';
import Course from './course';
import Chat from './chat'
import GrievanceTable from './GrievanceTable';

const Tab = createMaterialBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#0051ff"
      barStyle={{ backgroundColor: '#54bbff' }}
      theme={{colors: {secondaryContainer: '#54bbff'}}}
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
      name='Course'
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
      name='Chat'
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
        component={GrievanceTable}  // Set GrievanceTable as a new tab
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