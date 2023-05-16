import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Filemanager from './Filemanager';
import ProfileScreen from './ProfileScreen';
import ScannerScreen from './ScannerScreen';

const Tab = createBottomTabNavigator();

const MainScreen = () => {  // Rename the component here
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Scanner') {
            iconName = 'camera';
          } else if (route.name === 'Files') {
            iconName = 'file';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
        {/* if (route.name === 'Home') {
            iconName = 'file'; */}
      
      
      <Tab.Screen name="Scanner" component={ScannerScreen} />
      <Tab.Screen name="Files" component={Filemanager} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainScreen;  // Export the renamed component
