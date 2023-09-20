import {View, StyleSheet} from 'react-native';
import React from 'react';
import ProductList, {SingleProduct} from '../CategoryItems/ProductList';
import CustomText from '../Custom/Text';

interface ISMProps {
  data: SingleProduct[];
}

const SimilarProducts = (props: ISMProps) => {
  const {data} = props;
  return (
    <View style={styles.container}>
      <CustomText style={styles.Text} title="Similar Products you may like" />

      {data.map((d, index) => (
        <View key={index}>
          <ProductList item={d} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },

  Text: {
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 19,
    marginVertical: 15,
  },
});
export default SimilarProducts;
