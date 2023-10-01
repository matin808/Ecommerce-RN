import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useAppSelector} from '../../Redux/store';
import {userToken, usrSelectedAddress} from '../../Redux/Users/userSlice';
import Address from '../../Container/Checkout/Address';
import {PaperProvider} from 'react-native-paper';
import UserInfo from '../../Container/Checkout/UserInfo';
import {CheckoutNavigationProps} from '../../Navigation/types';
import Toast from 'react-native-simple-toast';
import CartInfo from '../../Container/Checkout/CartInfo';
import {placeOrder} from '../../utils/API/PlaceOrder';

/**
 * @author Matin kadri
 * @param Navigation to navigate to Home Page after successful placing order
 * @description contains details of user, and address for ordering purposes.
 * @returns
 */

const Checkout = ({navigation}: CheckoutNavigationProps) => {
  const cartData = useAppSelector(state => state.cart.cart);
  const usrAddress = useAppSelector(usrSelectedAddress);
  const {count, total} = cartData;
  const token = useAppSelector(userToken);
  const [loading, setLoading] = useState(false);
  const {address, city, state, zipCode} = usrAddress;
  const merge = address + ' ' + city + ' ' + state + ' ' + zipCode;

  const handlePlaceOrder = async () => {
    setLoading(true);
    const res = await placeOrder(merge, token);
    if (res === 200) {
      setLoading(false);
      Toast.show('Order Placed Successfully', Toast.SHORT);
      navigation.navigate('Home');
    } else {
      setLoading(false);
      Toast.show('Something went wrong', Toast.SHORT);
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
            onPress={handlePlaceOrder}
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
