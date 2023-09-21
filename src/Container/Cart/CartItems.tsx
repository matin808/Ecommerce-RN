import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../assets/colors/Colors';
import {Text} from 'react-native-paper';

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
  console.log('myisd', item);
  //   const dispatch = useAppDispatch();
  const handleQuantity = (quantity: any, id: any) => {
    //     console.log(quantity, 'Sss', id);
    //     dispatch(EditCartItems(quantity, id));
  };

  return (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.product.product_images}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.productName}>{item.product.name}</Text>
        <Text style={styles.productCost}>₹ {item.product.cost}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => handleQuantity(item.quantity - 1, item.product.id)}
          style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => handleQuantity(item.quantity + 1, item.product.id)}
          style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
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
});

export default CartItems;
