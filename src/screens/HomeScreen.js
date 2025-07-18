import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Linking,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useAuth} from '../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';

export default function HomeScreen({navigation}) {
  const {user, logout} = useAuth();

  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('databaseUser');
        if (storedUsers !== null) {
          setListUsers(JSON.parse(storedUsers));
        }
      } catch (e) {
        console.error('Failed to load users:', e);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.info}>Name: {user?.name || user}</Text>
        <Text style={styles.info}>Email: {user?.email || user}</Text>
        <Button
          title="Logout"
          onPress={() => {
            logout();
          }}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.title}>List user</Text>
        <FlatList
          data={listUsers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.listItemContainer}>
              <Text style={styles.email}>Email: {item.email}</Text>
              <Text style={styles.name}>Name: {item.name}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerIcon}
          onPress={() =>
            Linking.openURL(
              'https://www.linkedin.com/in/muhammad-firdaus-65bb48212',
            )
          }>
          <Image
            source={require('../assets/icons/linkedin.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIcon}
          onPress={() =>
            Linking.openURL('https://firdausaziz93.github.io/React-Deploy')
          }>
          <Image
            source={require('../assets/icons/resume.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text
        style={styles.footerText}
        onPress={() => Linking.openURL('https://your-resume-url.com')}
        color="#0077b5">
        View Online Resume
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {fontSize: 24, marginBottom: 24},
  info: {fontSize: 18, marginBottom: 12},

  listContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  listItemContainer: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
    width: 300,
  },
  email: {
    fontWeight: 'bold',
  },
  name: {
    color: 'gray',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 40,
    height: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  footerIcon: {
    paddingHorizontal: 10,
  },
  footerText: {backgroundColor: '#0077b5', textAlign: 'center'},
});
