/* eslint-disable react-hooks/exhaustive-deps */
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../Container/Home/Header';
import {colors} from '../../assets/colors/Colors';
import {getAllUsers} from '../../Redux/Users/userSlice';
import Carousel from '../../Container/Home/Carousel';
import Category from '../../Container/Home/Category';
import {useAppSelector} from '../../Redux/store';

const Home = () => {
  const userData = useAppSelector(getAllUsers);

  useEffect(() => {
    if (userData) {
      console.log('fromhome111', userData);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
