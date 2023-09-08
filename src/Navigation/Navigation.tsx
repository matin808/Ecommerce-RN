import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../Screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import AuthStack from './AuthStack';
import Login from '../Screens/Auth/Login';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          options={{headerShown: false}}
          name="AuthStack"
          component={AuthStack}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
