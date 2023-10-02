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
import LottieView from 'lottie-react-native';

/**
 * @author Matin kadri
 * @param Navigation to navigate to Home Page after successful placing order
 * @description contains details of user, and address for ordering purposes.
 * @returns
 */

const Checkout = ({navigation}: CheckoutNavigationProps) => {
  const cartData = useAppSelector(state => state.cart.cart);
  const usrAddress = useAppSelector(usrSelectedAddress);
  const [Orderloading, setOrderLoading] = useState(false);
  const {count, total} = cartData;
  const token = useAppSelector(userToken);
  const [loading, setLoading] = useState(false);

  const merge =
    usrAddress?.address +
    ' ' +
    usrAddress?.city +
    ' ' +
    usrAddress?.state +
    ' ' +
    usrAddress?.zipCode;

  console.log('1', usrAddress);

  const handlePlaceOrder = async () => {
    if (usrAddress === undefined) {
      Toast.show('Please select an address', Toast.LONG);
      return;
    }
    setOrderLoading(true);
    setLoading(true);
    const res = await placeOrder(merge, token);

    if (res === 200) {
      setLoading(false);
      // Toast.show('Order Placed Successfully', Toast.SHORT);

      setOrderLoading(false);
      navigation.navigate('OrderCompleted');
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

      {Orderloading ? (
        <View
          style={{
            backgroundColor: 'black',
            opacity: 0.6,
            justifyContent: 'center',
            alignContent: 'center',
            width: '100%',
            position: 'absolute',
            height: '100%',
          }}>
          <LottieView
            style={{height: 200}}
            source={require('../../assets/animation/scanner.json')}
            speed={3}
            autoPlay
          />
        </View>
      ) : (
        <></>
      )}
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
