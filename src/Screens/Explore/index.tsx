import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductList from '../../Container/CategoryItems/ProductList';
import {ActivityIndicator} from 'react-native-paper';
import CustomText from '../../Container/Custom/Text';
import {fetchProductsUsingId} from '../../utils/API/fetchProductsById';

const Explore = () => {
  const [allProducts, setALlProducts] = useState();
  const [loading, setLoading] = useState<boolean>();

  const fetchHandler = async () => {
    const p1 = await fetchProductsUsingId(2);
    const p2 = await fetchProductsUsingId(1);
    const p3 = await fetchProductsUsingId(3);
    const p4 = await fetchProductsUsingId(4);
    let main: any = [...p1, ...p2, ...p3, ...p4];
    main.sort((a: any, b: any) => a.name.localeCompare(b.name));
    setALlProducts(main);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchHandler();
  }, []);
  return (
    <SafeAreaView style={styles.ctn}>
      <CustomText title="Explore" />
      {loading ? (
        <View style={[styles.ctn, styles.middleCtn]}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          <FlatList
            data={allProducts}
            renderItem={({item}) => <ProductList item={item} />}
          />
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  ctn: {
    flex: 1,
  },
  middleCtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Explore;
