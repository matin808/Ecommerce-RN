/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Text} from 'react-native-paper';
import {EditCartItems, ListcartItems} from '../../Redux/Cart/CartSlice';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {userToken} from '../../Redux/Users/userSlice';
import Toast from 'react-native-simple-toast';
import {Swipeable} from 'react-native-gesture-handler';
import IconComponent from '../Custom/Icon';
import {baseUrl} from '../../utils/constants';
import axios from 'axios';
import CustomText from '../Custom/Text';

interface IcartProps {
  item: {
    id: number;
    product: {
      cost: number;
      id: number;
      name: string;
      product_category: string;
      product_images: string;
      sub_total: number;
    };
    product_id: number;
    quantity: number;
  };
}

const CartItems = ({item}: IcartProps) => {
  const {id} = item.product;
  const dispatch = useAppDispatch();
  const token = useAppSelector(userToken);
  const updatedCartDetails = useAppSelector(state => state.cart.updatedCart);
  const increment = (qnty: number) => {
    if (qnty === 8) {
      Toast.show('REACHED MAX LIMIT', Toast.SHORT);
      return;
    }
    const quantity = ++qnty;
    const data = {quantity, id};
    dispatch(EditCartItems(data));
  };
  const decrement = (qnty: number) => {
    if (qnty === 1) {
      Toast.show('Cannot be reduced more', Toast.SHORT);
      return;
    }
    const quantity = --qnty;
    const data = {quantity, id};
    dispatch(EditCartItems(data));
  };

  useEffect(() => {
    dispatch(ListcartItems(token));
  }, [updatedCartDetails]);

  const handleDelete = async (id: number) => {
    const formData = new FormData();
    formData.append('product_id', id);
    try {
      const res = await axios.post(`${baseUrl}/deleteCart`, formData, {
        headers: {
          access_token: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      Toast.show('Product Deleted', Toast.SHORT);
      await dispatch(ListcartItems(token));
      console.log(res.data);
    } catch (err) {
      console.log('Something went wrong');
    }
  };

  const renderRightActions = (id: number) => {
    console.log(id);
    return (
      <>
        <View>
          <TouchableOpacity
            onPress={() => handleDelete(id)}
            style={styles.delContainer}>
            <CustomText
              onPress={() => handleDelete(id)}
              style={styles.delText}
              title="delete"
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <Swipeable renderRightActions={() => renderRightActions(item.product.id)}>
      <View style={styles.itemContainer}>
        <Image
          source={{uri: item.product.product_images}}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{item.product.name}</Text>
          <Text style={styles.productCost}>₹ {item.product.cost}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => decrement(item.quantity)}
            style={styles.quantityButton}>
            <IconComponent
              color="#6C3C40"
              size={23}
              name={'minuscircleo'}
              use="AntDesign"
            />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => increment(item.quantity)}
            style={styles.quantityButton}>
            <IconComponent
              color="#6C3C40"
              size={23}
              name={'pluscircleo'}
              use="AntDesign"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: '#6C3C40',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 15,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  textContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
  },
  productCost: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins-Bold',
    marginTop: 6,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    marginHorizontal: 8,
  },

  quantity: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  delContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginVertical: 12,
    marginRight: 5,
    borderRadius: 7,
    backgroundColor: 'red',
  },

  delText: {fontSize: 18, fontFamily: 'Roboto-Bold', color: '#fff'},
});

export default CartItems;
