import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
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
      <View style={styles.profileCard}>
        <Text style={styles.title}>👋 Welcome!</Text>
        <Text style={styles.label}>
          Name: <Text style={styles.value}>{user?.name}</Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.value}>{user?.email}</Text>
        </Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>👥 User List</Text>
        <FlatList
          data={listUsers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.userCard}>
              <Text style={styles.email}>📧 {item.email}</Text>
              <Text style={styles.name}>👤 {item.name}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.linkedin.com/in/muhammad-firdaus-65bb48212',
              )
            }>
            <Image
              source={require('../assets/icons/linkedin.png')}
              style={styles.logo}
            />
            <Text style={styles.iconLabel}>LinkedIn</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://firdausaziz93.github.io/React-Deploy')
            }>
            <Image
              source={require('../assets/icons/resume.png')}
              style={styles.logo}
            />
            <Text style={styles.iconLabel}>Resume</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {fontSize: 24, marginBottom: 24},
  listContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  email: {
    fontWeight: 'bold',
  },
  name: {
    color: 'gray',
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
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#0077b5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  userCard: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    padding: 10,
  },
  iconLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#444',
  },
});
