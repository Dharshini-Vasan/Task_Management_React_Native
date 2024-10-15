// src/screens/SignupScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    if (username && password) {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        // Check if the username already exists
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
          setErrorMessage('Username already exists');
          return;
        }
        // Add new user to the users array
        users.push({ username, password });
        // Store the updated user array in AsyncStorage
        await AsyncStorage.setItem('users', JSON.stringify(users));
        // Navigate to the login screen
        navigation.navigate('Login');
      } catch (error) {
        setErrorMessage('Error signing up. Try again.');
      }
    } else {
      setErrorMessage('Please fill in all fields.');
    }
  };
  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Already have an account? Log In" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};
export default SignupScreen;
