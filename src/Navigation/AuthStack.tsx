/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import OnboardingScreen from '../Screens/Auth/Onboarding';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import {colors} from '../assets/colors/Colors';
import ForgetPassword from '../Screens/Auth/ForgetPassword';

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

  // let screenToShow: any = isFirstLaunch ? 'Login' : 'Onboarding';
  // let ComponentToShow: any = isFirstLaunch ? Login : OnboardingScreen;
  let screenToShow: any = isFirstLaunch ? 'Onboarding' : 'Login';
  let ComponentToShow: any = isFirstLaunch ? OnboardingScreen : Login;

  return (
    <Auth.Navigator>
      <Auth.Screen
        options={{headerShown: false}}
        name={screenToShow}
        component={ComponentToShow}
      />
      {screenToShow === 'Login' ? null : (
        <Auth.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
      )}

      <Auth.Screen
        // options={{headerShown: false}}
        name="Register"
        component={Register}
        options={{
          title: 'Register Yourself',
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: colors.ACTIONCOLOR,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            fontSize: 18,
          },
        }}
      />
      <Auth.Screen
        options={{
          title: 'Forget Password',
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: colors.ACTIONCOLOR,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Roboto-Medium',
            fontSize: 18,
          },
        }}
        name="ForgetPassword"
        component={ForgetPassword}
      />
    </Auth.Navigator>
  );
};

export default AuthStack;
