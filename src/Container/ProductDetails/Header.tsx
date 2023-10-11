import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Rating} from 'react-native-ratings';
import {colors} from '../../assets/colors/Colors';

interface IPDHeader {
  name?: string;
  rating?: number;
  producer?: string;
}

const ProductDetailsHeader = (props: IPDHeader) => {
  const {name, rating, producer} = props;
  return (
    <View style={styles.header}>
      <View style={styles.div_one}>
        <Text style={styles.headerText}>{name}</Text>
        <Text style={styles.producer}>Producer : {producer}</Text>
      </View>
      <View style={styles.div_two}>
        <Rating
          imageSize={17}
          readonly={true}
          ratingImage="custom"
          startingValue={rating}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.UIBG,
    padding: 20,
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },
  producer: {
    color: 'gray',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
  div_one: {flex: 0.8},
  div_two: {flex: 0.3},
});

export default ProductDetailsHeader;
