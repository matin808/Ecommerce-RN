/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../assets/colors/Colors';
import {Text} from 'react-native-paper';
import {EditCartItems, ListcartItems} from '../../Redux/Cart/CartSlice';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {userToken} from '../../Redux/Users/userSlice';
import Toast from 'react-native-simple-toast';
import {Swipeable} from 'react-native-gesture-handler';
import IconComponent from '../Custom/Icon';
import {baseUrl} from '../../utils/constants';
import axios from 'axios';

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
  // const [state, setState] = useState(false); // for rendering
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
    const quantity = --qnty; // 72.3
    const data = {quantity, id};
    dispatch(EditCartItems(data));
  };

  useEffect(() => {
    dispatch(ListcartItems(token));
  }, [updatedCartDetails]);

  const handleDelete = async (id: number) => {
    console.log('asas', id);
    const formData = new FormData();
    formData.append('product_id', id);
    try {
      const res = await axios.post(`${baseUrl}/deleteCart`, formData, {
        headers: {
          access_token: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      // setState(true);
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
          <TouchableOpacity style={styles.delContainer}>
            <IconComponent
              handlePress={() => handleDelete(id)}
              name="delete"
              color={'red'}
              size={35}
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
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => increment(item.quantity)}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    margin: 5,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderColor: colors.ACTIONCOLOR,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    //
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productCost: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Roboto-Bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: colors.ACTIONCOLOR,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  quantity: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  delContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    backgroundColor: 'grqy',
  },
});

export default CartItems;
