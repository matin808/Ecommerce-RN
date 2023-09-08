/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import OnboardingScreen from '../Screens/Auth/Onboarding';
import Login from '../Screens/Auth/Login';

const Auth = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const storage = new MMKV();

  useEffect(() => {
    const value = storage.getBoolean('alreadyLaunch');
    if (value === undefined) {
      storage.set('alreadyLaunch', true);
      setIsFirstLaunch(true);
    } else {
      setIsFirstLaunch(false);
    }
  }, []);

  return (
    <Auth.Navigator>
      {!isFirstLaunch ? (
        <Auth.Screen
          options={{headerShown: false}}
          name="Onboarding"
          component={OnboardingScreen}
        />
      ) : (
        <Auth.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
      )}
    </Auth.Navigator>
  );
};

export default AuthStack;
