import {createDrawerNavigator} from '@react-navigation/drawer';
import Settings from '../Screens/Settings';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Settings} />
      <Drawer.Screen name="Article" component={Settings} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
