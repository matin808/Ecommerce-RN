import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import AuthStack from './AuthStack';
import CategoryItems from '../Screens/CategoryItems';
import ProductDetails from '../Screens/ProductDetails';
import Cart from '../Screens/Cart';
import Checkout from '../Screens/Checkout';
import UpdateProfile from '../Screens/UpdateProfile';
import Profile from '../Screens/Profile';
import OrderDetails from '../Screens/OrderDetails';
import ChangePassword from '../Screens/Auth/ChangePassword';

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
          name="Profile"
          options={() => ({
            title: 'My Account',
            headerBackTitleVisible: false, // for disbale
          })}
          component={Profile}
        />
        <RootStack.Screen
          name="ProductDetails"
          options={({route}) => ({
            title: route.params.name,
            headerBackTitleVisible: false,
          })}
          component={ProductDetails}
        />
        <RootStack.Screen
          name="Cart"
          options={{
            headerBackTitleVisible: false,
          }}
          component={Cart}
        />
        <RootStack.Screen
          name="Checkout"
          options={{
            headerBackTitleVisible: false,
          }}
          component={Checkout}
        />
        <RootStack.Screen
          name="UpdateProfile"
          options={{
            headerBackTitleVisible: false,
            headerTitle: 'Update Profile',
          }}
          component={UpdateProfile}
        />
        <RootStack.Screen
          name="OrderDetails"
          options={({route}) => ({
            title: 'Order ID : ' + route.params.id,
            headerBackTitleVisible: false,
          })}
          component={OrderDetails}
        />
        <RootStack.Screen
          name="ChangePassword"
          options={() => ({
            headerBackTitleVisible: false,
            headerTitle: '',
          })}
          component={ChangePassword}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
