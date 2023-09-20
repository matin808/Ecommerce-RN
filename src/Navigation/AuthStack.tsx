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
import MyTabs from './BottomNavigation';
import {useAppSelector} from '../Redux/store';

const Auth = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(-1);
  const storage = new MMKV();
  const data = useAppSelector(state => state.users);
  console.log('suthstack', data.users.length);

  useEffect(() => {
    if (storage.getBoolean('alreadyLaunched') === undefined) {
      storage.set('alreadyLaunched', true);
      setIsFirstLaunch(0);
    } else {
      setIsFirstLaunch(1);
    }
  }, []);

  let route: any;
  console.log(isFirstLaunch);
  if (isFirstLaunch === -1) {
    return null;
  } else if (isFirstLaunch === 0) {
    route = 'OnboardingScreen';
  } else if (data.users.length === 0) {
    route = 'Login';
  } else if (data.users[0].access_token) {
    route = 'Tabs';
  }

  return (
    <Auth.Navigator initialRouteName={route}>
      <Auth.Screen
        options={{headerShown: false}}
        name="Onboarding"
        component={OnboardingScreen}
      />
      <Auth.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />

      <Auth.Screen
        options={{headerShown: false}}
        name="Tabs"
        component={MyTabs}
      />
      <Auth.Screen
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
