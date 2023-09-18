import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
// import Toast from 'react-native-simple-toast';
import {colors} from '../../assets/colors/Colors';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import {MyNavigationProp} from '../../Navigation/types';
// import IconComponent from '../Custom/Icon';

export interface SingleProduct {
  id: number;
  product_category_id: number;
  name: string;
  producer: string;
  description: string;
  cost: number;
  rating: number;
  view_count: number;
  created: string;
  modified: string;
  product_images: string;
}

export interface IProductListProps {
  item: SingleProduct;
}

const ProductList = ({item}: IProductListProps) => {
  console.log('from product list', item);
  const {id, name} = item;
  const navigation: MyNavigationProp = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', {id, name})}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.product_images}}
            height={120}
            width={120}
            resizeMode="contain"
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.brandName}>{item.producer}</Text>
          <Text style={styles.name}>{item.name}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{item.cost.toLocaleString()}</Text>
            <Rating
              // showRating={true}
              imageSize={20}
              readonly={true}
              ratingImage="custom"
              startingValue={item.rating}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.UIBG,
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    borderRadius: 12,
    //
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  imageContainer: {
    flex: 0.3,
  },

  details: {
    flex: 0.7,
    marginLeft: 10,
  },
  brandName: {
    // color: '#9B9B9B',
    color: '#000',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  name: {
    fontSize: 18,
    color: colors.TEXT,
    fontFamily: 'Montserrat-regular',
    marginVertical: 5,
  },

  desc: {
    fontSize: 13,
    color: colors.TEXT,
    fontFamily: 'Montserrat-SemiBold',
  },

  countContainer: {
    flexDirection: 'row',
    gap: 4,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
});

export default ProductList;