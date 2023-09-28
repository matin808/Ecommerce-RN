/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {userToken} from '../../Redux/Users/userSlice';
import {ListcartItems} from '../../Redux/Cart/CartSlice';
import CartItems from '../../Container/Cart/CartItems';
import {ActivityIndicator, Text} from 'react-native-paper';
import CartFooter from '../../Container/Cart/CartFooter';
import {styles} from '../Orders';

/**
 * @author Matin Kadri
 * @description This will render products in Cart
 * @returns
 */

const Cart = () => {
  const token: any = useAppSelector(userToken);
  const [loading, setLoading] = useState<boolean>();
  const data: any = useAppSelector(state => state.cart.cart);
  // const data: any = useAppSelector(state => state.cart.updatedCart);
  console.log('daaasad', data);
  const total: number = data?.total;
  const cartData = data?.data;
  const dispatch = useAppDispatch();
  console.log('@@@@', data.count);

  const fetch = async () => {
    setLoading(true);
    await dispatch(ListcartItems(token));
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          {data.count > 0 ? (
            <FlatList
              data={cartData}
              alwaysBounceVertical={false}
              renderItem={({item}) => <CartItems item={item} />}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={() => <CartFooter total={total} />}
            />
          ) : (
            <>
              <View style={styles.noOrdersContainer}>
                <Text style={styles.noOrdersText}>No product in cart</Text>
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

// const styles = StyleSheet.create({});

export default Cart;
