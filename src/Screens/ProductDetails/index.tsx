/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {baseUrl, getDetail} from '../../utils/constants';
import axios from 'axios';
import {ProductDetailsNavigationProps} from '../../Navigation/types';
import ImageComponent from '../../Container/ProductDetails/ImageComponent';
import {Rating} from 'react-native-ratings';
import {colors} from '../../assets/colors/Colors';
import IconComponent from '../../Container/Custom/Icon';
import {Button} from 'react-native-paper';
import ProductList from '../../Container/CategoryItems/ProductList';

interface IProductData {
  cost: number;
  created: string;
  description: string;
  id: number;
  modified: string;
  name: string;
  producer: string;
  product_category_id: number;
  product_images: {
    created: string;
    id: number;
    image: string;
    modified: string;
    product_id: number;
  }[];
  rating: number;
  view_count: number;
}

const ProductDetails = ({route}: ProductDetailsNavigationProps) => {
  const {id} = route.params;
  const [productDetails, setProductDetails] = useState<IProductData>();

  const fetchProductDetails = async () => {
    try {
      let res = await axios.get(`${baseUrl}/${getDetail}?product_id=${id}`);
      setProductDetails(res.data.data);
      console.log('aaaaaaaa', res.data.data);
    } catch (err: any) {
      console.log('singin err', err);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>{productDetails?.name}</Text>
          <Text style={styles.producer}>
            Producer : {productDetails?.producer}
          </Text>
        </View>

        <Rating
          imageSize={17}
          readonly={true}
          ratingImage="custom"
          startingValue={productDetails?.rating}
        />
      </View>

      <View style={styles.detail}>
        <View style={styles.ImageContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.Ruppee}>
              Rs. {productDetails?.cost.toLocaleString()}
            </Text>
            <IconComponent name="share" size={35} color="gray" />
          </View>

          <ImageComponent images={productDetails?.product_images as any} />
        </View>
        <View style={styles.DescContainer}>
          <Text style={styles.DescStyle}>{productDetails?.description}</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            //   icon="camera"
            mode="outlined"
            //   buttonColor="green"
            textColor="#000"
            style={{width: '47%'}}
            onPress={() => console.log('Pressed')}>
            Buy Now
          </Button>

          <Button
            //   icon="camera"
            textColor="#000"
            //   buttonColor="green"
            mode="outlined"
            style={{width: '47%'}}
            onPress={() => console.log('Pressed')}>
            Rate
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.UIBG,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  producer: {
    color: 'gray',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  detail: {
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 7,
    borderRadius: 15,
    paddingBottom: 20,
  },

  ImageContainer: {
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  Ruppee: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 19,
    color: 'green',
  },

  DescContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },

  DescStyle: {color: 'gray', fontSize: 18},
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 30,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default ProductDetails;
