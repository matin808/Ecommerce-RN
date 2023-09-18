import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import AuthStack from './AuthStack';
import CategoryItems from '../Screens/CategoryItems';
import ProductDetails from '../Screens/ProductDetails';

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
          name="CategoryItems"
          options={({route}) => ({
            title: route.params.name,
            headerBackTitleVisible: false, // for disbale
          })}
          component={CategoryItems}
        />
        <RootStack.Screen
          name="ProductDetails"
          options={({route}) => ({
            title: route.params.name,
            headerBackTitleVisible: false,
          })}
          component={ProductDetails}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
