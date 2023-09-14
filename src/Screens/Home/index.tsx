import {SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../Container/Home/Header';
import {colors} from '../../assets/colors/Colors';

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.UIBG}}>
      <Header />
    </SafeAreaView>
  );
};

export default Home;
