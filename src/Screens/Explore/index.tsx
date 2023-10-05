import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductList, {
  SingleProduct,
} from '../../Container/CategoryItems/ProductList';
import {fetchProductsUsingId} from '../../utils/API/fetchProductsById';
import IconComponent from '../../Container/Custom/Icon';
import Loader from '../../Container/Custom/Loader';

/**
 * @description this screen will contain all products list and a search bar for user to search for products
 * @returns
 */

const Explore = () => {
  const [allProducts, setALlProducts] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const [query, setQuery] = useState<string>();

  const fetchHandler = async () => {
    const p1 = await fetchProductsUsingId(2);
    const p2 = await fetchProductsUsingId(1);
    const p3 = await fetchProductsUsingId(3);
    const p4 = await fetchProductsUsingId(4);
    let main: any = [...p1, ...p2, ...p3, ...p4];

    main.sort((a: SingleProduct, b: SingleProduct) =>
      a.name.localeCompare(b.name),
    );
    setALlProducts(main);
    console.log('11223311', main);

    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchHandler();
  }, []);

  const handleSearch = (text: string) => {
    console.log(text);
    const formattedQuery = text.toLowerCase().trim();
    const mainText = allProducts.filter((p: any) => {
      return p.name.toLowerCase().trim().indexOf(formattedQuery) > -1;
    });
    setQuery(mainText);
  };
  return (
    <SafeAreaView style={styles.ctn}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.searchCtn}>
            <IconComponent
              size={25}
              style={styles.Icon}
              name="search1"
              use="AntDesign"
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              onChangeText={queryText => handleSearch(queryText)}
              placeholder="Search"
              style={styles.Input}
            />
          </View>

          <FlatList
            style={styles.ctn}
            data={query ? query : allProducts}
            renderItem={({item}: any) => <ProductList item={item} />}
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

  searchCtn: {
    backgroundColor: '#fff',
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgray',

    paddingHorizontal: 15,
    margin: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 50,
  },
  Icon: {flex: 0.1},
  Input: {
    backgroundColor: '#fff',
    marginLeft: 5,
    flex: 0.9,
    alignSelf: 'center',
    fontSize: 17,
  },
});

export default Explore;
