/* eslint-disable react-hooks/exhaustive-deps */
import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {userToken} from '../../Redux/Users/userSlice';
import {ListcartItems} from '../../Redux/Cart/CartSlice';
import CartItems from '../../Container/Cart/CartItems';
import {ActivityIndicator} from 'react-native-paper';
import CartFooter from '../../Container/Cart/CartFooter';

// const;

const Cart = () => {
  const token: any = useAppSelector(userToken);
  const [cartData, setCartData] = useState();
  const [loading, setLoading] = useState<boolean>();
  const [total, setTotal] = useState();

  // const total = fdata.cart.total;
  const dispatch = useAppDispatch();

  const getCartdata = async () => {
    setLoading(true);
    try {
      let data = await dispatch(ListcartItems(token)).unwrap();
      console.log('cartdetails, data', data);
      setCartData(data.data);
      setTotal(data.total);
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
            ListFooterComponent={() => <CartFooter total={total} />}
          />
        </>
      )}
    </View>
  );
};

// const styles = StyleSheet.create({});

export default Cart;
