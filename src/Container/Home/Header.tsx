import {View, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from '../Custom/Text';
import IconComponent from '../Custom/Icon';
import {colors} from '../../assets/colors/Colors';
import {useAppSelector} from '../../Redux/store';
import {cartItemDetails} from '../../Redux/Cart/CartSlice';

interface IHeaderProps {
  handlePress: () => void;
}
const Header: React.FC<IHeaderProps> = ({handlePress}) => {
  const cartDetais = useAppSelector(cartItemDetails);
  console.log('112233aa', cartDetais);
  return (
    <>
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
            size={32}
            color={colors.ACTIONCOLOR}
          />
        </View>
      </View>

      {cartDetais?.count > 0 && (
        <View style={styles.CartCount}>
          <CustomText style={styles.CountStyle} title={cartDetais?.count} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 20,
    marginBottom: 2,
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
  CartCount: {
    position: 'absolute',
    right: 5,
    top: 10,
    fontFamily: 'Montserrat-SemiBold',
    backgroundColor: 'brown',
    borderRadius: 15,
    paddingVertical: 1,
    paddingHorizontal: 5,
  },
  CountStyle: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Header;
