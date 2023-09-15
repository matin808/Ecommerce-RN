import {SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../Container/Home/Header';
import {colors} from '../../assets/colors/Colors';
import {useSelector} from 'react-redux';
import {getAllUsers} from '../../Redux/Users/userSlice';
import Carousel from '../../Container/Home/Carousel';
import Category from '../../Container/Home/Category';
const Home = ({navigation}) => {
  const userData = useSelector(getAllUsers);

  useEffect(() => {
    if (userData) {
      console.log('fromhome111', userData);
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.UIBG}}>
      <Header />
      <Carousel />
      <Category />
    </SafeAreaView>
  );
};

export default Home;
