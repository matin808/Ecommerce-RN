import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {colors} from '../../assets/colors/Colors';
import {baseUrl} from '../../utils/constants';
import axios from 'axios';
import {useAppSelector} from '../../Redux/store';
import {userToken} from '../../Redux/Users/userSlice';

interface FooterProps {
  total: number;
}

const CartFooter = ({total}: FooterProps) => {
  const [loader, setLoader] = useState(false);
  const token = useAppSelector(userToken);
  const placeOrder = async () => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append(
        'address',
        'The Ruby, 29-Senapati Bapat Marg, Dadar (West)',
      );
      await axios.post(`${baseUrl}/order`, formData, {
        headers: {
          access_token: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoader(false);
    } catch (err) {
      console.log('From order', err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.totalCtn}>
        <Text style={styles.textStyle}>Total is : </Text>
        <Text style={styles.textStyle}>
          {' '}
          ₹{total && total.toLocaleString()}
        </Text>
      </View>
      <Button
        textColor="#fff"
        mode="outlined"
        style={styles.btn}
        onPress={placeOrder}
        loading={loader}>
        Place Order
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    //
    borderWidth: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  totalCtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },

  textStyle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'darkgreen',
  },
  btn: {backgroundColor: colors.ACTIONCOLOR, margin: 20},
});

export default CartFooter;
