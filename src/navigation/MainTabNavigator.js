import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {Image} from 'react-native';
import SettingsScreen from '../screens/SettingsScreen';

const ICONS = {
  Home: require('../assets/icons/home.png'),
  Settings: require('../assets/icons/setting.png'),
};

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => (
        <Image
          source={ICONS[route.name]}
          style={{width: size, height: size, tintColor: color}}
        />
      ),
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default MainTabNavigator;
