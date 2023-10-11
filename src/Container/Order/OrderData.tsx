import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

interface IOrderDataProps {
  item: {
    id: number;
    order_id: number;
    prod_cat_name: string;
    prod_image: string;
    prod_name: string;
    product_id: number;
    quantity: number;
    total: number;
  };
}

const OrderData = ({item}: IOrderDataProps) => {
  console.log('1111', item);
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{uri: item.prod_image}}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{item.prod_name}</Text>
        <Text style={styles.productCategory}>({item.prod_cat_name})</Text>
        <View style={styles.itemQtyContainer}>
          <Text style={styles.qty}>Qty: {item.quantity}</Text>
          <Text style={styles.price}> ₹ {item.total}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 12,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 17,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: 'bold',
    color: '#000',
  },
  productCategory: {
    fontSize: 16,
    marginTop: 5,
    color: '#888',
    fontFamily: 'Poppins-Light',
  },
  itemQtyContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  qty: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  price: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
});

export default OrderData;
