import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './Screens/MainScreen';
import OnboardScreen from './Screens/OnboardScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Onboard" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
}
