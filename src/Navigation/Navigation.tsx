import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Onboarding from '../Screens/Onboarding';
import Home from '../Screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          options={{headerShown: false}}
          name="Onboarding"
          component={Onboarding}
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
