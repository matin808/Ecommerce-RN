/* eslint-disable react-hooks/exhaustive-deps */
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {baseUrl, getDetail} from '../../utils/constants';
import axios from 'axios';
import {ProductDetailsNavigationProps} from '../../Navigation/types';
import {useAppSelector} from '../../Redux/store';
import {getProductLists} from '../../Redux/Products/ProductSlice';
import SimilarProducts from '../../Container/ProductDetails/SimilarProducts';
import ProductDetailsHeader from '../../Container/ProductDetails/Header';
import Details from '../../Container/ProductDetails/Details';

export interface IProductData {
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

const ProductDetails = ({route, navigation}: ProductDetailsNavigationProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {id} = route.params;
  const [productDetails, setProductDetails] = useState<IProductData>();
  const similarCategoryData = useAppSelector(getProductLists).filter(
    item => item.id !== id,
  );
  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      let res = await axios.get(`${baseUrl}/${getDetail}?product_id=${id}`);
      setProductDetails(res.data.data);
      setLoading(false);
    } catch (err: any) {
      console.log('singin err', err);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);
  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <ProductDetailsHeader
              name={productDetails?.name}
              rating={productDetails?.rating}
              producer={productDetails?.producer}
            />

            <Details
              id={id}
              handlePress={() => navigation.navigate('Cart')}
              product_images={productDetails?.product_images}
              cost={productDetails?.cost.toLocaleString()}
              description={productDetails?.description}
            />

            <SimilarProducts data={similarCategoryData} />
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProductDetails;
