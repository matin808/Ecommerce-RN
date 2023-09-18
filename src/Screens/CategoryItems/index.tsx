/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchProductsById} from '../../Redux/Products/ProductSlice';
import {getIdForSpecificProducts} from '../../utils/getIdForProducts';
import ProductList, {
  SingleProduct,
} from '../../Container/CategoryItems/ProductList';
import {useAppDispatch} from '../../Redux/store';
import {CategoryItemsScreenNavigationProps} from '../../Navigation/types';

const CategoryItems = ({route}: CategoryItemsScreenNavigationProps) => {
  const routeNum: number = getIdForSpecificProducts(route.params.name);
  const [productData, setProductData] = useState<SingleProduct[]>();

  const dispatch = useAppDispatch();

  const fetchProduct = async () => {
    try {
      const data = await dispatch(fetchProductsById(routeNum)).unwrap();
      console.log('sss', data);

      setProductData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={productData}
        renderItem={({item}) => <ProductList item={item} />}
      />
    </SafeAreaView>
  );
};

export default CategoryItems;
