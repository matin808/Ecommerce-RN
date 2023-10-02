/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import OrderHeader from '../../Container/Order/OrderHeader';
import {OrderNavigationProps} from '../../Navigation/types';
import {useAppSelector} from '../../Redux/store';
import {userToken} from '../../Redux/Users/userSlice';
import {fetchOrders} from '../../utils/API/FetchOrders';
import OrderList from '../../Container/Order/OrderList';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../Container/Custom/Loader';
import {Text} from 'react-native-paper';

/**
 * @author Matin Kadri
 * @param navigation is used to navigate to order Details page
 * @description This component will render order which user has placed
 * @returns
 */

const Order = ({navigation}: OrderNavigationProps) => {
  const token: string = useAppSelector(userToken);
  const [orderdData, setOrderData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchHandler = async () => {
    const data = await fetchOrders(token);
    setOrderData(data);
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchHandler();
    }, []),
  );

  const handlePress = (id: number) => {
    console.log('33sidd', id);
    navigation.navigate('OrderDetails', {id, token});
  };
  return (
    <SafeAreaView style={styles.main}>
      <OrderHeader />
      {orderdData?.length < 1 ? (
        <>
          <View style={styles.noOrdersContainer}>
            <Text style={styles.noOrdersText}>No orders yet</Text>
          </View>
        </>
      ) : (
        <>
          {loading && <Loader />}
          <FlatList
            data={orderdData}
            renderItem={({item}) => (
              <OrderList item={item} onPress={() => handlePress(item.id)} />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#f4f4f4',
  },
  noOrdersContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  noOrdersText: {
    fontSize: 18,
    color: '#555',
  },
});

export default Order;
