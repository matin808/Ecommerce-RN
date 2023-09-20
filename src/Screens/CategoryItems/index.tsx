/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchProductsById} from '../../Redux/Products/ProductSlice';
import {getIdForSpecificProducts} from '../../utils/getIdForProducts';
import ProductList, {
  SingleProduct,
} from '../../Container/CategoryItems/ProductList';
import {useAppDispatch} from '../../Redux/store';
import {CategoryItemsScreenNavigationProps} from '../../Navigation/types';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../assets/colors/Colors';

const CategoryItems = ({route}: CategoryItemsScreenNavigationProps) => {
  const [loading, setLoading] = useState<boolean>();
  const routeNum: number = getIdForSpecificProducts(route.params.name);
  const [productData, setProductData] = useState<SingleProduct[]>();

  const dispatch = useAppDispatch();

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const data = await dispatch(fetchProductsById(routeNum)).unwrap();
      console.log('sss', data);
      setProductData(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator
          size="large"
          animating={true}
          color={colors.ACTIONCOLOR}
        />
      ) : (
        <FlatList
          data={productData}
          renderItem={({item}) => <ProductList item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default CategoryItems;
