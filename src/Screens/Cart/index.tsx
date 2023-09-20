/* eslint-disable react-hooks/exhaustive-deps */
import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {getUserData} from '../../Redux/Users/userSlice';
import {ListcartItems} from '../../Redux/Cart/CartSlice';
import CartItems from '../../Container/Cart/CartItems';
import {ActivityIndicator} from 'react-native-paper';

const Cart = () => {
  const userData: any = useAppSelector(getUserData);
  const [cartData, setCartData] = useState();
  const [loading, setLoading] = useState<boolean>();
  const token = userData[0].access_token;
  console.log('fromcarttt', token);
  const dispatch = useAppDispatch();

  const getCartdata = async () => {
    setLoading(true);
    try {
      let data = await dispatch(ListcartItems(token)).unwrap();
      console.log('cartdetails, data', data);
      setCartData(data);
      setLoading(false);
    } catch (err) {
      console.log('erfromcart', err);
    }
  };

  useEffect(() => {
    getCartdata();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          {/* <CustomText title="Your cart Items" /> */}
          <FlatList
            data={cartData}
            renderItem={({item}) => <CartItems item={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </>
      )}
    </View>
  );
};

// const styles = StyleSheet.create({});

export default Cart;
