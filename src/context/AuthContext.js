import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
export const AuthContext = createContext();

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const databaseUser = await AsyncStorage.getItem('databaseUser');
    let items = databaseUser ? JSON.parse(databaseUser) : [];

    const matchedUser = items.find(
      (u) => u.email === username && u.password === password,
    );

    if (matchedUser) {
      const userObj = {name: matchedUser?.name, email: matchedUser?.email};
      setUser(userObj);
      await AsyncStorage.setItem('user', JSON.stringify(userObj));
      Alert.alert('Login Successful', `Welcome back ${matchedUser.name}!`);
      return true;
    } else {
      console.log('Invalid email or password.');
      return false;
    }
  };

  const signup = async (name, username, password) => {
    const userObj = {name: name, email: username, password: password};
    await pushNewItem(userObj);
    await AsyncStorage.setItem('user', JSON.stringify(userObj));
    setUser(userObj);
  };

  const pushNewItem = async (newItem) => {
    try {
      // 1. Get existing data
      const storedItemsString = await AsyncStorage.getItem('databaseUser');
      let items = storedItemsString ? JSON.parse(storedItemsString) : [];

      // 2. Add the new item
      items.push(newItem);

      // 3. Save the updated data
      await AsyncStorage.setItem('databaseUser', JSON.stringify(items));
      Alert.alert('Sign Up Successful', `Hi ${newItem.name}!`);
      console.log('Item pushed successfully!');
    } catch (error) {
      console.error('Error pushing item to AsyncStorage:', error);
      Alert.alert('Signup Failed', error);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{user, login, signup, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
