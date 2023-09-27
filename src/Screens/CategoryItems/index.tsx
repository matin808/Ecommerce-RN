/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchProductsById} from '../../Redux/Products/ProductSlice';
import {getIdForSpecificProducts} from '../../utils/getIdForProducts';
import ProductList from '../../Container/CategoryItems/ProductList';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {CategoryItemsScreenNavigationProps} from '../../Navigation/types';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../../assets/colors/Colors';

/**
 * @author Matin Kadri
 * @param route for different category id for fetching
 * @returns
 */

const CategoryItems = ({route}: CategoryItemsScreenNavigationProps) => {
  const [loading, setLoading] = useState<boolean>();
  const routeNum: number = getIdForSpecificProducts(route.params.name);

  const dispatch = useAppDispatch();
  const mydata = useAppSelector(state => state.products.products);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      await dispatch(fetchProductsById(routeNum));
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
          data={mydata}
          renderItem={({item}) => <ProductList item={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default CategoryItems;
