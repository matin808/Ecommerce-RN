/* eslint-disable react/react-in-jsx-scope */
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Settings from '../Screens/Settings';
import Home from '../Screens/Home';
import IconComponent from '../Container/Custom/Icon';
import Order from '../Screens/Orders';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      activeColor="#67C4A7"
      inactiveColor="#000"
      // activeColor={colors.UIBG}
      barStyle={{
        backgroundColor: '#fefefe',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',

          tabBarIcon: ({color}) => (
            <IconComponent name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Settings}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color}) => (
            <IconComponent
              use="IonIcons"
              name="search"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Order}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({color}) => (
            <IconComponent
              use="IonIcons"
              name="bag-check"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settidngs"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <IconComponent
              use="IonIcons"
              name="settings"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
