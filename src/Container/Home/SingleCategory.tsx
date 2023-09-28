import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {MyNavigationProp} from '../../Navigation/types';

interface ICategoryProps {
  name: String;
  imageUrl: any;
}

// type MyNavigationProp = NavigationProp<ParamListBase>;

const SingleCategory = (props: ICategoryProps) => {
  const {name, imageUrl} = props;
  const navigation: MyNavigationProp = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CategoryItems', {name})}
      style={styles.category}>
      <Text style={styles.categoryTitle}>{name}</Text>
      {/* <Image tintColor={colors.ACTIONCOLOR} source={imageUrl} /> */}
      <Image tintColor="#2B1700" source={imageUrl} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryTitle: {
    color: '#000',
    fontSize: 17,
    alignSelf: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },

  category: {
    alignItems: 'center',
    flex: 1,
    borderColor: '#fff',
    borderWidth: 2,
    marginVertical: 8,

    // backgroundColor: '#fff',
    backgroundColor: '#FEF9E7',
    // backgroundColor: colors.ACTIONCOLOR,
    padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    // alignSelf: 'center',

    gap: 10,
    borderRadius: 15,
    //
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default SingleCategory;
