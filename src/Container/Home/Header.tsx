import {View, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from '../Custom/Text';
import IconComponent from '../Custom/Icon';
import {colors} from '../../assets/colors/Colors';

const Header = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.TextContainer}>
        <CustomText style={styles.TextStyle_one} title="Neo" />
        <CustomText style={styles.TextStyle_two} title="STORE" />
      </View>
      <View>
        <IconComponent
          use="AntDesign"
          name="shoppingcart"
          size={33}
          color={colors.ACTIONCOLOR}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },

  TextContainer: {flexDirection: 'row'},

  TextStyle_one: {
    color: colors.ACTIONCOLOR,
    fontSize: 30,
    fontFamily: 'Roboto-Blod',
  },
  TextStyle_two: {
    color: colors.ACTIONCOLOR,
    fontSize: 30,
    fontFamily: 'Roboto-Black',
  },
});

export default Header;
