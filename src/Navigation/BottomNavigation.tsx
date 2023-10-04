/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Settings from '../Screens/Settings';
import Home from '../Screens/Home';
import IconComponent from '../Container/Custom/Icon';
import Order from '../Screens/Orders';
import Explore from '../Screens/Explore';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      activeColor="brown"
      inactiveColor="gray"
      theme={{colors: {secondaryContainer: 'transparent'}}}
      barStyle={{
        backgroundColor: '#fefefe',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
      }}

      // Set the background color of active tab to transparent
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',

          tabBarIcon: ({color}) => (
            <IconComponent name="home" color={color} size={26} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
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
        name="Settings"
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
