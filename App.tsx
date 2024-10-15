import React,{useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {StyleSheet ,TouchableOpacity, Text,Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo'; 
import LoginScreen from './src/components/LoginScreen';
import SignupScreen from './src/components/SignupScreen';
import TaskListScreen from './src/components/TaskListScreen';
import { DatabaseService } from './src/Services/DatabaseService';
const Stack = createStackNavigator();
const AppNavigator = ({ isLoggedIn, onLogout }) => {
  useEffect(() => {
    DatabaseService.initDatabase().then(() => { });
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          'No Internet Connection',
          'Please check your internet settings.',
          [{ text: 'OK' }] 
        );
      } else {
        Alert.alert(
          'Internet Connected',
          'You are back online.',
          [{ text: 'OK' }] 
        );
      } });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'TaskList'}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen 
          name="TaskList" 
          component={TaskListScreen} 
          options={{
            headerRight: () => (
              <TouchableOpacity 
                style={styles.button}
                onPress={onLogout}
                disabled={!isLoggedIn} 
              >
                <Text style={styles.buttonText}>LOGOUT</Text>
              </TouchableOpacity>
            )
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200ee', 
    borderRadius: 1,
    marginRight: 15, 
  },
  buttonText: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
  },
});

export default AppNavigator;

