/* eslint-disable react-hooks/exhaustive-deps */
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../Container/Home/Header';
import {colors} from '../../assets/colors/Colors';
import {getUserData} from '../../Redux/Users/userSlice';
import Carousel from '../../Container/Home/Carousel';
import Category from '../../Container/Home/Category';
import {useAppSelector} from '../../Redux/store';
import {HomeScreenNavigationProps} from '../../Navigation/types';

const Home = ({navigation}: HomeScreenNavigationProps) => {
  const userData = useAppSelector(getUserData);

  useEffect(() => {
    if (userData) {
      console.log('fromhome111', userData);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header handlePress={() => navigation.navigate('Cart')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousel />
        <Category />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.UIBG},
});

export default Home;
