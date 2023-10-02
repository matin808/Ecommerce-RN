import {View, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {Button} from 'react-native-paper';
import CustomText from '../../Container/Custom/Text';
import {OrderCompletedScreensNavigationProps} from '../../Navigation/types';

/**
 *
 * @param navigation for navigate to home screen
 * @description This will render after order is successfully completed to show success msg
 * @returns
 */

const OrderCompleted = ({navigation}: OrderCompletedScreensNavigationProps) => {
  return (
    <View style={styles.ctn}>
      <LottieView
        style={styles.svg}
        autoPlay
        source={require('../../assets/animation/check.json')}
      />
      <View style={styles.TextCtn}>
        <CustomText
          style={styles.header}
          title="Your Order has been accepted"
        />
        <CustomText
          style={styles.desc}
          title="Your item has been placed and is on it's way to being processed"
        />
      </View>
      <Button
        style={styles.Btn}
        buttonColor="green"
        onPress={() => navigation.navigate('Home')}
        textColor="#fff">
        Back To Home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  ctn: {
    flex: 1,
    marginTop: 80,
  },
  svg: {
    height: 130,
  },

  TextCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 27,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    textAlign: 'center',
  },
  desc: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
    textAlign: 'center',
    width: '90%',
    marginTop: 10,
  },
  Btn: {width: '70%', alignSelf: 'center'},
});

export default OrderCompleted;
