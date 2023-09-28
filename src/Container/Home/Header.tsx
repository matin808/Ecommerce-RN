import {View, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from '../Custom/Text';
import IconComponent from '../Custom/Icon';
import {colors} from '../../assets/colors/Colors';

interface IHeaderProps {
  handlePress: () => void;
}
const Header: React.FC<IHeaderProps> = ({handlePress}) => {
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
          handlePress={handlePress}
          size={28}
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
    marginLeft: 15,
    alignItems: 'center',
  },

  TextContainer: {flexDirection: 'row'},

  TextStyle_one: {
    color: colors.TEXTDARK,
    fontSize: 30,
    fontFamily: 'Montserrat-Regular',
  },
  TextStyle_two: {
    color: colors.TEXTDARK,
    fontSize: 30,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default Header;
