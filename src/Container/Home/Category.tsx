import {View, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from '../Custom/Text';
import SingleCategory from './SingleCategory';
import {colors} from '../../assets/colors/Colors';

const Category = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title} title="Category" />
      <View style={styles.CategoryContainer}>
        <View>
          <SingleCategory
            name="Sofa"
            imageUrl={require('../../assets/images/sofa.png')}
          />
          <SingleCategory
            name="Tables"
            imageUrl={require('../../assets/images/table.png')}
          />
        </View>
        <View>
          <SingleCategory
            name="Chairs"
            imageUrl={require('../../assets/images/chair.png')}
          />
          <SingleCategory
            name="Cupboards"
            imageUrl={require('../../assets/images/cupboard.png')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginLeft: 15,
    backgroundColor: colors.UIBG,
    flex: 1,
  },
  title: {
    color: '#000',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 12,
    fontFamily: 'Montserrat-Bold',
  },
  CategoryContainer: {
    // backgroundColor: colors.ACTIONCOLOR,
    flexDirection: 'row',
    flex: 1,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default Category;
