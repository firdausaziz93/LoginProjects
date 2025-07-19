import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../components/LoginScreen';
import SignupScreen from '../components/SignupScreen';
import {useAuth} from '../context/AuthContext';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const {user} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
