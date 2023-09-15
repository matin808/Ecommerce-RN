import React, {useEffect} from 'react';
import RootNavigation from './src/Navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';
// import {useSelector} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  return <RootNavigation />;
};

export default App;
