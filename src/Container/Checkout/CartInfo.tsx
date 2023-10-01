import {View} from 'react-native';
import React from 'react';
import CustomText from '../Custom/Text';
import {Button, Text} from 'react-native-paper';
import {styles} from './UserInfo';

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
          <Text style={styles.label}>Total Products</Text>
          <Text style={styles.text}>{count}</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.text}>₹{total}</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.label}>Delivery Charge</Text>
          <Text style={styles.text}>+40</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.label}>Discount Applied</Text>
          <Text style={styles.text}>-40</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.label}>Total Amount</Text>
          <Text style={styles.text}>₹{total}</Text>
        </View>
      </View>
      <Button
        loading={loading}
        textColor="#fff"
        buttonColor="green"
        style={styles.btn}
        mode="outlined"
        onPress={onPress}>
        Place Order
      </Button>
    </View>
  );
};

export default CartInfo;
