import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeScreen from '../screens/HomeScreen';

import { getCredentials } from '../utills/secureStorage';
import CustomLoader from '../utills/CustomLoader';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home'>('Login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const credentials = await getCredentials();

      if (credentials?.email && credentials?.password) {
        setInitialRoute('Home');
      } else {
        setInitialRoute('Login');
      }
    } catch (error:any) {
      setInitialRoute('Login');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <CustomLoader
        visible={true}
        text="Please wait..."
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{
            title: 'Create Account',
          }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;