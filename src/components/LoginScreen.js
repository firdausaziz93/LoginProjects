import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';

export default function LoginScreen({navigation}) {
  const {login, error: authError} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }
    const success = await login(email, password);
    if (!success) {
      Alert.alert('Login Failed', 'Invalid email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <View style={styles.container}>
            <Image
              source={
                passwordVisible
                  ? require('../assets/icons/eye.png')
                  : require('../assets/icons/eye-off.png')
              }
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
      {error || authError ? (
        <Text style={styles.error}>{error || authError}</Text>
      ) : null}
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.signup}>
        <Button
          title="Go to Signup"
          onPress={() => navigation.navigate('Signup')}
          style={styles.signup}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
  error: {color: 'red', marginBottom: 12},
  signup: {
    paddingTop: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
    paddingRight: 8,
    justifyContent: 'space-between',
  },
  containerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: 15,
    height: 15,
  },
});
