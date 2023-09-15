import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import CustomText from '../Custom/Text';
import {colors} from '../../assets/colors/Colors';

const Category = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title} title="Category" />
      <View style={styles.CategoryContainer}>
        <View style={styles.category}>
          <Text>Tables</Text>
          <Image
            source={require('../../assets/images/sofa.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.category}>
          <Text>Sofa</Text>
          <Image
            source={require('../../assets/images/table.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.category}>
          <Text>Chairs</Text>
          <Image
            source={require('../../assets/images/chair.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.category}>
          <Text>Cupboards</Text>
          <Image
            source={require('../../assets/images/sofa.png')}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginLeft: 15,
    backgroundColor: colors.ACTIONCOLOR,
    flex: 1,
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Roboto-regular',
  },
  CategoryContainer: {
    backgroundColor: colors.ACTIONCOLOR,
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    height: 60,
    width: 80,
    // color: 'green',
  },
  category: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
});

export default Category;
