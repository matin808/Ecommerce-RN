import {View} from 'react-native';
import React from 'react';
import CustomText from '../Custom/Text';
import {Button} from 'react-native-paper';
import {styles} from './UserInfo';
import {colors} from '../../assets/colors/Colors';

interface ICartProps {
  count: number;
  total: number;
  onPress: () => void;
  loading: boolean;
}

const CartInfo = (props: ICartProps) => {
  const {count, total, onPress, loading} = props;

  return (
    <View>
      <CustomText title="Cart Details" style={styles.textStyle} />
      <View style={styles.container}>
        <View style={styles.main}>
          <CustomText style={styles.label} title="Total Products" />
          <CustomText style={styles.text} title={count} />
        </View>
        <View style={styles.main}>
          <CustomText style={styles.label} title="Amount" />
          <CustomText style={styles.text} title={'₹' + total} />
        </View>
        <View style={styles.main}>
          <CustomText style={styles.label} title="Delivery Charge" />
          <CustomText style={styles.text} title={+40} />
        </View>
        <View style={styles.main}>
          <CustomText style={styles.label} title="Discount Applied" />
          <CustomText style={styles.text} title={-40} />
        </View>
        <View style={styles.main}>
          <CustomText style={styles.label} title="Total Amount" />
          <CustomText style={styles.text} title={'₹' + total} />
        </View>
      </View>
      <Button
        loading={loading}
        textColor="#fff"
        buttonColor={colors.ACTIONCOLOR}
        style={styles.btn}
        mode="outlined"
        onPress={onPress}>
        Place Order
      </Button>
    </View>
  );
};

export default CartInfo;
