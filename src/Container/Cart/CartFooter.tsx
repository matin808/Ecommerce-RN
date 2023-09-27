import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Button, Text} from 'react-native-paper';
import {colors} from '../../assets/colors/Colors';
import {useNavigation} from '@react-navigation/native';
import {MyNavigationProp} from '../../Navigation/types';

interface FooterProps {
  total: number;
}

const CartFooter = ({total}: FooterProps) => {
  const navigation: MyNavigationProp = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.totalCtn}>
        <Text style={styles.textStyle}>Total is : </Text>
        <Text style={styles.textStyle}>
          {' '}
          ₹ {total && total.toLocaleString()}
        </Text>
      </View>
      <Button
        textColor="#fff"
        mode="outlined"
        style={styles.btn}
        onPress={() => navigation.navigate('Checkout')}>
        Proceed to Checkout
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    borderWidth: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  totalCtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },

  textStyle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Black',
    fontWeight: 'bold',
    color: colors.BTN,
  },
  btn: {backgroundColor: colors.BTN, margin: 20},
});

export default CartFooter;
