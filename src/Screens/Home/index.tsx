/* eslint-disable react-hooks/exhaustive-deps */
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../Container/Home/Header';
import {colors} from '../../assets/colors/Colors';
import {getUserData, userToken} from '../../Redux/Users/userSlice';
import Carousel from '../../Container/Home/Carousel';
import Category from '../../Container/Home/Category';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {HomeScreenNavigationProps} from '../../Navigation/types';
import {ListcartItems} from '../../Redux/Cart/CartSlice';

/**
 * @author Matin kadri
 * @param navigation for routing user to category pages
 * @description It will contain all categories
 * @returns
 */

const Home = ({navigation}: HomeScreenNavigationProps) => {
  const token = useAppSelector(userToken);
  const userData = useAppSelector(getUserData);
  console.log(userData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ListcartItems(token));
    if (token) {
      console.log('fromhome111', token);
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
