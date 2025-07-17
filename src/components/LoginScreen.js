import React, {useState, useContext} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import {AuthContext} from '../context/AuthContext';

export default function LoginScreen({navigation}) {
  const {login, error: authError} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
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
});
