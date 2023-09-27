import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useAppSelector} from '../../Redux/store';
import {userToken} from '../../Redux/Users/userSlice';
import Address from '../../Container/Checkout/Address';
import {PaperProvider} from 'react-native-paper';
import UserInfo from '../../Container/Checkout/UserInfo';
import axios from 'axios';
import {baseUrl} from '../../utils/constants';
import {CheckoutNavigationProps} from '../../Navigation/types';
import Toast from 'react-native-simple-toast';
import CartInfo from '../../Container/Checkout/CartInfo';

/**
 * @author Matin kadri
 * @param Navigation to navigate to Home Page after successful placing order
 * @description contains details of user, and address for ordering purposes.
 * @returns
 */

const Checkout = ({navigation}: CheckoutNavigationProps) => {
  const cartData = useAppSelector(state => state.cart.cart);
  const {count, total} = cartData;
  const token = useAppSelector(userToken);
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        'address',
        'The Ruby, 29-Senapati Bapat Marg, Dadar (West)',
      );
      await axios.post(`${baseUrl}/order`, formData, {
        headers: {
          access_token: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      Toast.show('Order Placed Successfully', Toast.SHORT);
      navigation.navigate('Home');
    } catch (err) {
      console.log('From order', err);
    }
  };

  return (
    <PaperProvider>
      <ScrollView>
        <View style={styles.container}>
          <Address />
          <UserInfo />
          <CartInfo
            count={count}
            total={total}
            onPress={placeOrder}
            loading={loading}
          />
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
});

export default Checkout;
