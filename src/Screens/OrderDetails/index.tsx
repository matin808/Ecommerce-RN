/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OrderDetailsNavigationProps} from '../../Navigation/types';
import {fetchOrderDetail} from '../../utils/API/fetchOrderDetails';
import {ActivityIndicator} from 'react-native-paper';
import OrderData from '../../Container/Order/OrderData';

/**
 * @author Matin kadri
 * @param route will contain the order Id for fetching order details
 * @description It will render the order details
 * @returns
 */

const OrderDetails = ({route}: OrderDetailsNavigationProps) => {
  const {id, token} = route.params;
  const [orderData, setOrderData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  console.log('Id and route', id, token);

  const fetchHandler = async () => {
    setLoading(true);
    const data = await fetchOrderDetail(id, token);
    console.log(data.data.cost);
    setOrderData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <View style={styles.main}>
      {loading ? (
        <>
          <ActivityIndicator size={'large'} />
        </>
      ) : (
        <View style={styles.container}>
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
              data={orderData?.data.order_details}
              renderItem={({item}) => <OrderData item={item} />}
            />
          </View>
          <View style={styles.costContainer}>
            <Text style={styles.textStyle}>Total : </Text>
            <Text style={styles.textStyle}>
              ₹ {orderData?.data.cost.toLocaleString()}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 45,
  },

  container: {
    flex: 1,
  },

  costContainer: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },

  textStyle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
});

export default OrderDetails;
