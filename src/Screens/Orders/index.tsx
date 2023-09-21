import {FlatList, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderHeader from '../../Container/Order/OrderHeader';
import {OrderNavigationProps} from '../../Navigation/types';
import axios from 'axios';
import {baseUrl} from '../../utils/constants';
import {useAppSelector} from '../../Redux/store';
import {userToken} from '../../Redux/Users/userSlice';
import {Text} from 'react-native-paper';

const Order = ({navigation}: OrderNavigationProps) => {
  const token = useAppSelector(userToken);
  const [orderdData, setOrderData] = useState();

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${baseUrl}/orderList`, {
        headers: {
          access_token: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data.data);
      if (res.status === 200) {
        setOrderData(res.data.data);
      }
    } catch (err) {
      console.log('Something Went Wrong');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <SafeAreaView>
      <OrderHeader />
      <FlatList
        data={orderdData}
        renderItem={({item}) => <Text>{item.cost}</Text>}
      />
    </SafeAreaView>
  );
};

export default Order;
