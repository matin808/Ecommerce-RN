/* eslint-disable react/no-unstable-nested-components */
import {Image, StyleSheet} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {OnboardingScreenNavigationProps} from '../../Navigation/types';
import Ionicons from 'react-native-vector-icons/Ionicons';

type doneProps = {
  handlePress: (arg: any) => void;
};

const DoneComponent = ({handlePress}: doneProps) => (
  <Ionicons
    style={styles.IconStyle}
    onPress={handlePress}
    color="#fff"
    name="checkmark-done"
    size={35}
  />
);

const OnboardingScreen = ({navigation}: OnboardingScreenNavigationProps) => {
  const handlePress = () => {
    navigation.replace('Home');
  };
  return (
    <>
      <Onboarding
        onSkip={() => navigation.replace('Home')}
        onDone={() => navigation.replace('Home')}
        DoneButtonComponent={() => <DoneComponent handlePress={handlePress} />}
        bottomBarColor="#67C4A7"
        titleStyles={styles.onboardingTitleStyle}
        subTitleStyles={styles.onboardingSubStyle}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                style={styles.ImageStyle}
                source={{
                  uri: 'https://previews.123rf.com/images/irfanfirdaus/irfanfirdaus2003/irfanfirdaus200300016/143492365-vector-illustration-mobile-online-shopping-women-shop-online-with-smartphone-mobile-shopping-concept.jpg',
                }}
              />
            ),
            title: 'Happy Shopping',
            subtitle: 'Get variety of products with just few clicks',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                style={styles.ImageStyle}
                source={{
                  uri: 'https://cdn.dribbble.com/users/1458982/screenshots/4291206/sign-in-dribble.png?compress=1&resize=400x300&vertical=top',
                }}
              />
            ),
            title: 'All you need in One Place',
            subtitle: 'All type of furniture and tables available',
          },
          {
            backgroundColor: '#fff',

            image: (
              <Image
                style={styles.ImageStyle}
                source={{
                  uri: 'https://thumbs.dreamstime.com/b/woman-shopping-sales-happy-young-holding-paper-bags-enjoying-126694001.jpg',
                }}
              />
            ),
            title: 'Happy sale, Happy customer',
            subtitle:
              'Be the part of our family with more than 5k+ happy customers',
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  IconStyle: {
    marginRight: 15,
  },
  onboardingTitleStyle: {
    color: '#67C4A7',
    fontFamily: 'Roboto-Regular',
  },
  onboardingSubStyle: {
    color: 'gray',
    fontFamily: 'Roboto-light',
    fontSize: 18,
  },
  ImageStyle: {width: 200, height: 250},
});

export default OnboardingScreen;
