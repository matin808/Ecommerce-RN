/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, FlatList, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {userToken} from '../../Redux/Users/userSlice';
import {ListcartItems} from '../../Redux/Cart/CartSlice';
import CartItems from '../../Container/Cart/CartItems';
import CartFooter from '../../Container/Cart/CartFooter';
import Loader from '../../Container/Custom/Loader';

/**
 * @author Matin Kadri
 * @description This will render products in Cart
 * @returns
 */

const Cart = () => {
  const token: any = useAppSelector(userToken);
  const [loading, setLoading] = useState<boolean>();
  const data: any = useAppSelector(state => state.cart.cart);
  console.log('daaasad', data);
  const total: number = data?.total;
  const cartData = data?.data;
  const dispatch = useAppDispatch();
  console.log('@@@@', data.count);

  const fetch = async () => {
    await dispatch(ListcartItems(token));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetch();
  }, []);

  return (
    <>
      {data.count > 0 ? (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <FlatList
                data={cartData}
                alwaysBounceVertical={false}
                renderItem={({item}) => <CartItems item={item} />}
                keyExtractor={item => item.id.toString()}
                ListFooterComponent={() => <CartFooter total={total} />}
              />
            </>
          )}
        </>
      ) : (
        <>
          {!loading && (
            <View style={styles.ImgCtn}>
              <Image
                style={styles.Img}
                source={{
                  uri: 'https://i.pinimg.com/736x/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.jpg',
                }}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  ImgCtn: {backgroundColor: '#fff', flex: 1},
  Img: {
    width: '80%',
    height: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Cart;
