import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from '../Custom/Text';
import {colors} from '../../assets/colors/Colors';

const OrderHeader = () => {
  return (
    <View style={styles.container}>
      <CustomText title="My Orders" style={styles.Text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
    paddingLeft: 10,
  },

  Text: {
    fontSize: 21,
    color: colors.TEXT,
    marginVertical: 10,
    marginLeft: 10,
    fontWeight: '500',
  },
});

export default OrderHeader;
